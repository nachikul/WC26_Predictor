# I Built a Live AI World Cup Predictor to Learn a New Development Methodology — Here's What I Found

*FIFA World Cup 2026 is finally here. 48 nations, three host countries, the biggest football tournament in history. And like any self-respecting engineer, my first instinct wasn't to buy a jersey — it was to build something.*

---

## The Setup

Every four years, the World Cup turns otherwise rational people into armchair tacticians. Who starts? Will Mbappe have a good tournament? Can Argentina really defend the title? I found myself wanting answers to exactly these questions — but I also had a learning goal that had been sitting on my backlog for a while: **Spec Driven Development (SDD)**.

The plan formed quickly. Build a live AI match predictor for WC2026. Use it as the vehicle to properly understand SDD. Keep it cheap (I'm not sponsored). Have fun.

What followed was a weekend project that turned into a genuinely interesting exploration of how AI, schema-first design, and modern deployment tooling can come together in a surprisingly clean way.

---

## What Is Spec Driven Development?

SDD is a methodology where you write your data contracts — your *specs* — before you write any logic. The idea sounds simple, but it changes everything about how you build.

In traditional development, you might define a TypeScript interface, then separately write runtime validation, then write documentation, and keep all three in sync as things evolve. SDD collapses all three into one artefact.

For this project, I used **Zod** — a TypeScript-first schema library. Here's what a player rating spec looks like:

```typescript
// specs/prediction.schema.ts
export const PlayerRatingSchema = z.object({
  playerName: z.string(),
  rating: z.number().min(0).max(10),
  shortReasoning: z.string(),
  formFactor: z.enum(['in-form', 'average', 'out-of-form']),
  matchupAdvantage: z.enum(['favourable', 'neutral', 'difficult']),
  keyFactors: z.array(z.string()).max(3),
  subScores: z.object({
    form: z.number().min(0).max(10),
    condition: z.number().min(0).max(10),
    opposition: z.number().min(0).max(10),
  }),
})
```

This single schema does three jobs simultaneously:
1. **It's the spec.** Any engineer on the team knows exactly what a player rating contains.
2. **It's the runtime validator.** When Claude returns a JSON response, I call `PlayerRatingSchema.safeParse(response)` — if the AI hallucinates an extra field or returns a number out of range, it's caught before it ever reaches the UI.
3. **It's the TypeScript type.** `z.infer<typeof PlayerRatingSchema>` gives me the full type automatically. No separate interface file. No drift.

The `specs/` directory became the contract layer for the entire application. The AI output contract, the API request/response shapes, the football data model — all lived there, all in sync.

---

## The Architecture

The predictor has three main parts:

**1. Data ingestion** — football-data.org has a generous free tier that exposes WC2026 fixtures, results, and squad rosters. I built a thin adapter (`football-api.ts`) that fetches live match data, maps it to my `Match` schema, and falls back to built-in mock fixtures if the API is unreachable. The football-data.org competition code for the World Cup is `WC` — the API is clean and well-documented for what's available on the free plan.

**2. AI prediction engine** — This is where it gets interesting. I used **Claude Sonnet** (Anthropic's API) as the primary model. The prompt is built from the live match data: both team lineups, recent form, head-to-head history, and the current tournament stage. Claude returns structured JSON — player ratings, scoreline prediction, goalscorer probabilities, tactical analysis — all validated against the Zod schema before the response is sent.

The AI prompt includes a fallback instruction: if the live API only returns player names without stats (which happens on free-tier squad endpoints), I tell Claude to "draw on your training knowledge of each player's real-world form." The AI genuinely knows who's in form, who just transferred clubs, who's carrying an injury. It's a surprisingly effective way to fill data gaps.

**3. Budget-aware fallback** — Claude isn't free. I set a $5 hard budget cap. When spend approaches $4.50, the system automatically switches to **Groq** (which provides free inference on Llama 3.3 70B). At $5.00 exactly, the API returns a 429. The entire cost state lives in a single `data/cost.json` file on a persistent volume — simple, no database required.

```
Claude spend < $4.50  →  Claude Sonnet (best quality)
Claude spend ≥ $4.50  →  Groq / Llama 3.3 70B (free fallback)
Claude spend ≥ $5.00  →  Hard stop
```

---

## What the App Actually Shows

When you open the predictor and select a match, you get:

- **Formation view** — an interactive pitch with 4-4-2 / 4-3-3 layout, where each player dot is colour-coded green/amber/red by their AI rating
- **Per-player cards** — each player gets a rating out of 10, a one-line reasoning ("strong aerial threat against a high defensive line"), form badge (in-form / average / out-of-form), matchup indicator, and three sub-scores: form, condition, and opposition quality
- **Scoreline prediction** — a large score display with a confidence percentage, reasoning paragraph, alternative scoreline probabilities (e.g. "30% chance of 2-1, 20% chance of 1-0"), and goalscorer probability bars
- **Cost badge** — a header indicator showing which model is active (Claude or Groq) and the current spend bar

---

## The Deployment Story

Deploying a Next.js app that makes long-running AI API calls is not trivial. Vercel's free tier cuts off function execution at 10 seconds — Claude can take 15–20 seconds to generate a full match prediction with 22 player ratings.

I landed on **Fly.io**, which runs full Docker containers with no function timeout. The Docker build is multi-stage: a `deps` layer for npm install, a `builder` layer for `next build --output standalone`, and a lean `runner` layer that starts the standalone server. Total image size ends up around 200MB.

One nuance worth documenting: Fly.io expects apps to listen on **port 8080** internally. Next.js defaults to 3000. The fix is setting `PORT=8080` and `HOSTNAME=0.0.0.0` in both the Dockerfile and `fly.toml`. Miss either and you get a cryptic "not listening on expected address" warning at deploy time with no process showing in the socket list.

Predictions are cached for one hour in `data/predictions/` on a persistent Fly.io volume. This means if two people predict the same match within an hour, the second request is instant and costs nothing. The volume also persists the cost tracker across redeploys, so the $5 budget survives container restarts.

---

## What I Learned About SDD

The methodology paid off in ways I didn't expect.

**The schemas become conversation starters.** When I was building the AI prompt, I referenced `MatchPredictionSchema` directly. When I was building the UI components, I typed the props against the same schema. When I was writing tests (even informal ones), I used `safeParse()` to check outputs. The schema wasn't documentation I wrote and forgot — it was code I ran continuously.

**AI output validation is non-negotiable.** Without the Zod validation layer, a model hallucinating `rating: "eight out of ten"` instead of `rating: 8` would crash the UI. With it, I get an error I can handle gracefully (retry, fallback, show an error state). The schema-first approach made this not an afterthought but a structural guarantee.

**Specs surface ambiguity early.** When I was writing `ScorelinePredictionSchema`, I had to decide: does `confidence` go from 0 to 1 or 0 to 100? Does `alternativeScorelines` include the primary prediction or only alternatives? Does `goalscorers` include defenders? Answering these before writing logic meant I never had to fix mismatched assumptions across the codebase.

---

## The Stack (All Free or Near-Free)

| Component | Service | Cost |
|---|---|---|
| AI predictions | Anthropic Claude API | ~$0.01–0.05 per match |
| AI fallback | Groq (Llama 3.3 70B) | Free |
| Match data | football-data.org | Free tier |
| Hosting | Fly.io | Free tier (shared CPU, 512MB) |
| Framework | Next.js 15 | Free (open source) |

Total spend for a weekend of testing: under $2.

---

## What's Next

The World Cup is live. The app is live. I'm watching the scores come in and occasionally checking what Claude thinks about the tactical matchups.

Next improvements on my list:
- Add live score updates via polling during in-play matches
- Connect real player stats from a paid API tier as the tournament progresses
- Add a "prediction accuracy" tracker — did the AI scoreline match the result?
- Potentially open-source the whole thing (it's almost there)

If you're looking for a side project that combines sports, AI, and a real learning goal, building something around a major tournament is a surprisingly effective forcing function. The World Cup ends in July. The deadline is real. Ship fast.

---

*The app is live at https://wc26-predictor.fly.dev. The code is on GitHub at github.com/nachikul/WC26_Predictor.*

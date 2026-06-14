# WC 2026 AI Predictor

Live AI-powered match predictions for FIFA World Cup 2026 — player ratings (0–10) with per-player reasoning, scoreline predictions, tactical analysis, and a cost-aware Claude → Groq fallback engine.

> Built as a personal project to explore **Spec Driven Development (SDD)** while having fun during football season.

**Live app:** https://wc26-predictor.fly.dev

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) + TypeScript |
| Styling | Tailwind CSS |
| Primary AI | Claude Sonnet (Anthropic API) |
| Fallback AI | Llama 3.3 70B via Groq (free) |
| Match Data | football-data.org v4 API (free tier) |
| Hosting | Fly.io (Docker, persistent volume) |
| Methodology | Spec Driven Development (Zod schemas as specs) |

---

## Local Development

### Option A — npm

```bash
# 1. Install dependencies
npm install

# 2. Create your environment file
cp .env.example .env.local   # or create manually — see vars below

# 3. Start dev server
npm run dev
```

Open http://localhost:3000

### Option B — Docker

```bash
# Dev mode (hot reload)
./docker.sh dev

# Production image locally
./docker.sh prod
```

---

## Environment Variables

Create `.env.local` in the project root:

```bash
# AI — Primary model (Claude Sonnet)
ANTHROPIC_API_KEY=sk-ant-...

# AI — Free fallback (Groq, used when Claude spend hits threshold)
GROQ_API_KEY=gsk_...

# Match data (football-data.org free tier)
FOOTBALL_API_KEY=your_key_here

# Budget controls
CLAUDE_BUDGET_USD=5.00
CLAUDE_FALLBACK_THRESHOLD_USD=4.50

# Data source: "live" fetches from football-data.org, "mock" uses built-in fixtures
FOOTBALL_DATA_SOURCE=live
```

> **Never commit `.env.local`** — it is in `.gitignore`. For Fly.io, secrets are pushed via `deploy-fly.sh`.

---

## Fly.io Deployment

### First-time setup

```bash
# 1. Install flyctl
brew install flyctl        # macOS
# or: curl -L https://fly.io/install.sh | sh

# 2. Log in (creates a free account if you don't have one)
fly auth login

# 3. Register the app on Fly.io (run once — reads fly.toml)
fly launch --no-deploy
```

> `fly launch --no-deploy` registers the app name and region without building. Skip if the app already exists on Fly.io.

### Deploy

```bash
# Sets secrets from .env.local, creates the persistent volume, then deploys
./deploy-fly.sh
```

What the script does step-by-step:
1. Reads `.env.local` and pushes `ANTHROPIC_API_KEY`, `GROQ_API_KEY`, `FOOTBALL_API_KEY`, `CLAUDE_BUDGET_USD`, `CLAUDE_FALLBACK_THRESHOLD_USD` as Fly.io encrypted secrets
2. Creates the `wc26_data` persistent volume (1 GB, `syd` region) if it doesn't exist — this stores `data/cost.json` and `data/predictions/` across redeploys
3. Runs `fly deploy --remote-only` — Fly.io's build servers build the Docker image, so no local Docker needed

### Subsequent deploys

```bash
./deploy-fly.sh
```

That's it — secrets are already set, volume already exists, the script detects both and skips re-creation.

### Useful commands

```bash
# Tail live logs
fly logs --app wc26-predictor

# SSH into the running machine
fly ssh console --app wc26-predictor

# Check machine status
fly status --app wc26-predictor

# View / update secrets
fly secrets list --app wc26-predictor
fly secrets set ANTHROPIC_API_KEY=new_key --app wc26-predictor

# Scale memory if predictions are slow
fly scale memory 1024 --app wc26-predictor

# Destroy and start fresh (destructive!)
fly apps destroy wc26-predictor
```

### Port configuration

The app listens on **port 8080** (Fly.io's required internal port). This is set in three places — they must stay in sync:

| File | Setting |
|---|---|
| `Dockerfile` | `ENV PORT=8080` / `EXPOSE 8080` |
| `fly.toml [env]` | `PORT = '8080'` |
| `fly.toml [http_service]` | `internal_port = 8080` |

---

## Architecture — Spec Driven Development

The `specs/` directory is the single source of truth. Every schema is a Zod object that simultaneously acts as:
- **Specification** — documents the shape of data
- **Runtime validator** — `safeParse()` validates AI output before the API responds
- **TypeScript type** — `z.infer<typeof Schema>` eliminates a separate type layer

```
specs/
  data.schema.ts        ← Team, Player, Match, FormEntry (core data model)
  prediction.schema.ts  ← PlayerRating (0-10), ScorelinePrediction, MatchPrediction
  api.spec.ts           ← GetMatchesResponse, PredictRequest/Response, CostStatus

src/
  lib/
    football-api.ts     ← football-data.org v4 adapter → falls back to mock on error
    mock-data.ts        ← 4 WC2026 Group Stage fixtures (Brazil, France, England, Spain)
    predictor.ts        ← Claude primary → Groq fallback AI engine
    cost-tracker.ts     ← data/cost.json read/write; auto-switch at $4.50 threshold
    prediction-cache.ts ← file cache (data/predictions/*.json, 1h TTL)
    prompt-builder.ts   ← builds AI prompt; detects sparse data and adapts instructions
  app/
    api/matches/        ← GET /api/matches
    api/predict/        ← POST /api/predict (checks cache → calls AI → caches result)
    api/cost/           ← GET /api/cost (budget status for header badge)
    page.tsx            ← main interactive page
  components/
    MatchCard           ← fixture selector in sidebar
    PlayerRatingCard    ← SVG ring dial, form badge, 3 sub-score bars
    ScorelinePrediction ← large score display, confidence, goalscorer probabilities
    FormationView       ← 4-3-3 / 4-4-2 pitch layout, colour-coded by rating
    CostBadge           ← polls /api/cost every 15s; shows model + spend bar
```

### AI cost model

```
Claude Sonnet:   $3.00 / 1M input tokens   +   $15.00 / 1M output tokens
Groq (free):     $0.00

Thresholds (configurable via env):
  < $4.50  →  Claude (primary)
  ≥ $4.50  →  Groq auto-fallback
  ≥ $5.00  →  hard stop, returns 429
```

---

## Data Flow

```
Browser
  └─ POST /api/predict {matchId}
       └─ prediction-cache.ts    check data/predictions/{matchId}.json (1h TTL)
            └─ football-api.ts   fetch match + squads from football-data.org
                 └─ prompt-builder.ts   build prompt (adapts for sparse live data)
                      └─ predictor.ts
                           ├─ cost-tracker.ts   check budget → pick model
                           ├─ Claude Sonnet     → validate with MatchPredictionSchema
                           └─ Groq fallback     → validate with MatchPredictionSchema
```

---

## Live Data Notes

football-data.org free tier limits:
- 10 requests / minute
- Competition code: `WC` (not `WC2026`)
- Squad data available but may lack per-player stats → the prompt adapts by instructing the AI to use its training knowledge

The app falls back to mock fixtures automatically if the live API is unreachable or returns an empty squad.

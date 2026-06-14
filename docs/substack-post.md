# I Built an AI World Cup Predictor Because My Fantasy Team Was Embarrassing Me

How many of you play Fantasy Football? 🤡

You know the ritual. You spend 45 minutes agonising over your starting XI. You bench Mbappe because "he looked tired in training." You captain a guy who immediately pulls a hamstring in the warm-up. You finish 74,218th in your mini-league and tell everyone it's because of injuries.

That's me. Every. Single. Tournament.

So when World Cup 2026 kicked off, I had two problems: my Fantasy team was already a disaster, and I had a learning goal that had been sitting on my to-do list for months — **Spec Driven Development**. The solution? Build a live AI match predictor and pretend it's practical.

(Please don't judge me for being a nerd. Just trying to stay relevant. 🤭)

---

## The Idea

The World Cup is the perfect forcing function for a side project. There's a real deadline (it ends in July — no extensions, no "I'll ship it next sprint"). There's real data. There's genuine emotional investment. And critically, there are enough matches that you'll actually use the thing you build.

The pitch I sold myself: what if I had an AI that could rate every player in an upcoming match out of 10, predict the scoreline, identify the likely goalscorers, and explain its reasoning — before kickoff?

Less "I'm going to blindly captain Mbappe again" and more "the AI gave Mbappe a 7.8 citing fatigue from the PSG fixture, maybe I should think about this."

I built it. It's live. And honestly it's more fun than I expected.

---

## What It Actually Does

You open the app, pick an upcoming match (Netherlands vs Japan, Morocco vs Portugal, whatever's on), hit predict, and wait about 15-20 seconds while the AI does its thing.

What comes back:

- A **scoreline prediction** with confidence percentage and reasoning ("Netherlands 3-1 Japan, 62% confidence — Dutch superior across the pitch, Japan organised but outgunned")
- **Player ratings for all 22 starters**, 0-10, each with a one-line explanation. Van Dijk gets an 8.2 with the note "dominates aerially and will control Japan's attacking transitions." Timber gets 7.9. Japan's Itakura gets 7.3.
- **Likely goalscorers** with probability bars (Van Dijk at 28% — apparently even the AI knows set-piece threats matter)
- **Alternative scorelines** if you want a probability spread
- A live **cost badge** in the corner showing whether it's running on Claude or the free fallback, and how much of my $5 budget I've burned

That last one is important. More on it shortly.

---

## Why I Actually Built This (The Real Reason)

Okay, beyond Fantasy Football revenge, I genuinely wanted to learn **Spec Driven Development**.

SDD is a methodology where you write your *data contracts first* — before any logic, before any UI. But here's the thing that makes it actually powerful: the contracts aren't documentation. They're executable schemas that do three jobs at once.

I used **Zod** (a TypeScript schema library). Here's what a player rating schema looks like in practice — and I promise this is the only bit of code in this post:

The schema *is* the spec. It *is* the runtime validator. It *is* the TypeScript type. 

One definition. Three jobs. The whole codebase can't drift out of sync because there's only one source of truth.

The "aha moment" for me was when the AI returned a player rating with 5 bullet points instead of the 3 I asked for. Because I had a schema, the app caught it automatically and truncated — rather than crashing or silently showing garbage. That's the contract doing its job.

---

## The "Keep It Free" Architecture

I'm not getting sponsored for this. My budget: five dollars. Literally, $5 hard cap.

Here's how I made it work:

**Match data** — football-data.org has a generous free tier. Live WC2026 fixtures, results, squad rosters. Free. Done.

**AI predictions** — I used the **Anthropic (Claude) API** as the primary model. Claude Sonnet is genuinely good at football analysis — it knows who's in form, who just transferred clubs, who has a hamstring history. The predictions feel considered, not random. When my $4.50 threshold hits, the system automatically switches to **Groq** (which runs Llama 3.3 70B for free). At exactly $5.00, the API returns a hard stop. I built the budget cap into the code itself because I do not trust myself to notice a bill until it's too late.

Total spend for a weekend of testing: under $2.

**Hosting** — **Fly.io** was genuinely a joy. You give it a Dockerfile, it handles the rest. The AI calls can take 15-20 seconds which would timeout on Vercel's free tier — Fly.io doesn't have that problem. Crazy easy, crazy fun. 🤑

---

## The Honest Part

I used AI heavily to build this. I'm not great at Next.js (mostly a backend person), so I leaned on Claude to scaffold the frontend. The irony of using Claude to build a Claude-powered app was not lost on me.

There were frustrating parts. The deployment to Fly.io took longer than expected because of a port configuration quirk — turns out Fly.io expects your app on port 8080, not 3000, and the error message is cryptic. The AI schema kept getting violated because Claude would return 4 alternative scorelines when I'd asked for 3. Small things, but they added up to a full evening of debugging before it all clicked.

That's the thing about side projects with real data and real deadlines. The frustrating parts are where the learning actually happens. If everything worked first try, you'd learn nothing.

---

## Try It / Fork It

The app is live at **https://wc26-predictor.fly.dev**. It's using real WC2026 data. If the machine is asleep (free tier scales to zero), first load takes about 3 seconds to wake up.

Code is on GitHub: **github.com/nachikul/WC26_Predictor**

Feel free to fork it and do whatever the fork you want with it. 🤓

If you're a developer who's been meaning to learn something new — pick a tournament, pick a dataset, give yourself a deadline. The World Cup ends in July. You have time.

---

*And if your Fantasy team is also suffering — we're in this together. The AI predicts Netherlands beat Japan 3-1. I'm not telling you who to captain. That's on you.*

---

**What tournaments or events have you used as side-project forcing functions? Drop it in the comments — would love to see what others have built.**

#SoftwareEngineering #WorldCup2026 #SideProject #AI #SpecDrivenDevelopment #Anthropic

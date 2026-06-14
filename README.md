# WC 2026 AI Predictor

Live AI-powered match predictions for FIFA World Cup 2026 — player ratings out of 10, reasoning per player, scoreline predictions, and tactical analysis.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Architecture (Spec Driven Development)

```
specs/
  data.schema.ts        ← Match, Team, Player types (Zod)
  prediction.schema.ts  ← PlayerRating, MatchPrediction, Scoreline types
  api.spec.ts           ← API route contracts

src/
  lib/
    mock-data.ts        ← WC2026 Group Stage fixtures with squads
    predictor.ts        ← Claude (primary) → Groq (fallback) AI engine
    cost-tracker.ts     ← $5 budget enforcement + Claude→Groq auto-fallback
    prediction-cache.ts ← 1-hour prediction caching
    football-api.ts     ← Data adapter (mock/live toggle)
    prompt-builder.ts   ← AI prompt construction
  app/api/
    matches/route.ts    ← GET /api/matches
    predict/route.ts    ← POST /api/predict
    cost/route.ts       ← GET /api/cost
  components/
    MatchCard           ← Fixture selector card
    PlayerRatingCard    ← Rating ring + reasoning + sub-scores
    ScorelinePrediction ← Score, confidence, goalscorers, tactical analysis
    FormationView       ← Pitch layout with colour-coded ratings
    CostBadge           ← Live budget indicator in header
```

## Environment Variables (already set in `.env.local`)

| Variable | Purpose |
|---|---|
| `ANTHROPIC_API_KEY` | Claude API — primary prediction model |
| `GROQ_API_KEY` | Groq fallback — used when Claude spend ≥ $4.50 |
| `CLAUDE_BUDGET_USD` | Hard budget cap (default $5.00) |
| `CLAUDE_FALLBACK_THRESHOLD_USD` | Switch to Groq at this spend level ($4.50) |
| `FOOTBALL_API_KEY` | Your StatsAPI key (configure once provider confirmed) |
| `FOOTBALL_DATA_SOURCE` | `mock` (default) or `live` |

## Live Data

The app currently uses realistic mock fixtures. To connect live data:
1. Confirm which provider your `fapi_...` key is from
2. Implement the adapter in `src/lib/football-api.ts`
3. Set `FOOTBALL_DATA_SOURCE=live` in `.env.local`

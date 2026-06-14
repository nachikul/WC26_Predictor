import { z } from 'zod'

// ─── Player Rating ──────────────────────────────────────────────────────────

export const PlayerRatingSchema = z.object({
  playerId: z.string(),
  playerName: z.string(),
  position: z.enum(['GK', 'DEF', 'MID', 'FWD']),
  shirtNumber: z.number(),
  team: z.string(),
  rating: z.number().min(0).max(10),
  shortReasoning: z.string(),    // 1–2 sentences shown in card
  keyFactors: z.array(z.string()).min(1).max(5).transform(a => a.slice(0, 3)),
  formFactor: z.enum(['excellent', 'good', 'average', 'poor']),
  matchupAdvantage: z.enum(['strong', 'neutral', 'tough']),
  // contextual sub-ratings
  formScore: z.number().min(0).max(10),
  conditionScore: z.number().min(0).max(10),
  oppositionScore: z.number().min(0).max(10),
})

// ─── Scoreline Prediction ───────────────────────────────────────────────────

export const LikelyScorerSchema = z.object({
  playerName: z.string(),
  team: z.string(),
  probability: z.number().min(0).max(100),
})

export const ScorelinePredictionSchema = z.object({
  homeGoals: z.number().min(0).max(20),
  awayGoals: z.number().min(0).max(20),
  confidence: z.number().min(0).max(100),
  scorlineReasoning: z.string(),     // 2–3 sentences
  likelyScorers: z.array(LikelyScorerSchema).max(5),
  keyMatchupInsight: z.string(),     // decisive head-to-head
  tacticalAnalysis: z.string(),      // 3–4 sentences
  alternativeScorelines: z.array(
    z.object({ home: z.number(), away: z.number(), probability: z.number() })
  ).max(8).transform(a => a.slice(0, 3)),
})

// ─── Full Match Prediction ──────────────────────────────────────────────────

export const MatchPredictionSchema = z.object({
  matchId: z.string(),
  homePlayerRatings: z.array(PlayerRatingSchema),
  awayPlayerRatings: z.array(PlayerRatingSchema),
  scoreline: ScorelinePredictionSchema,
  overallMatchRating: z.object({
    excitement: z.number().min(1).max(10),
    competitiveness: z.number().min(1).max(10),
    qualityOfFootball: z.number().min(1).max(10),
  }),
  generatedAt: z.string(),    // ISO string
  modelUsed: z.string(),      // "claude-sonnet-4-6" | "llama-3.3-70b-versatile"
  tokensUsed: z.number().optional(),
  costUsd: z.number().optional(),
})

// ─── Exported Types ─────────────────────────────────────────────────────────

export type PlayerRating = z.infer<typeof PlayerRatingSchema>
export type ScorelinePrediction = z.infer<typeof ScorelinePredictionSchema>
export type MatchPrediction = z.infer<typeof MatchPredictionSchema>
export type LikelyScorer = z.infer<typeof LikelyScorerSchema>

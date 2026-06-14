/**
 * API Contract Specifications
 *
 * These schemas define the exact request/response shapes for every API route.
 * Both the route handler and the client must type against these — never diverge.
 */
import { z } from 'zod'
import { MatchSummarySchema } from './data.schema'
import { MatchPredictionSchema } from './prediction.schema'

// ─── GET /api/matches ───────────────────────────────────────────────────────

export const GetMatchesResponseSchema = z.object({
  matches: z.array(MatchSummarySchema),
  dataSource: z.enum(['mock', 'live']),
  lastUpdated: z.string(),
})
export type GetMatchesResponse = z.infer<typeof GetMatchesResponseSchema>

// ─── POST /api/predict ──────────────────────────────────────────────────────

export const PredictRequestSchema = z.object({
  matchId: z.string(),
  forceRefresh: z.boolean().optional().default(false),
})
export type PredictRequest = z.infer<typeof PredictRequestSchema>

export const PredictResponseSchema = z.object({
  prediction: MatchPredictionSchema,
  cached: z.boolean(),
  cacheAge: z.number().optional(),  // seconds since last prediction
})
export type PredictResponse = z.infer<typeof PredictResponseSchema>

// ─── GET /api/cost ──────────────────────────────────────────────────────────

export const CostStatusSchema = z.object({
  claudeSpentUsd: z.number(),
  groqRequestCount: z.number(),
  budgetUsd: z.number(),
  fallbackThresholdUsd: z.number(),
  percentUsed: z.number(),
  activeModel: z.enum(['claude', 'groq']),
  totalPredictions: z.number(),
  avgCostPerPrediction: z.number(),
})
export type CostStatus = z.infer<typeof CostStatusSchema>

// ─── Error envelope ─────────────────────────────────────────────────────────

export const ApiErrorSchema = z.object({
  error: z.string(),
  detail: z.string().optional(),
  code: z.number(),
})
export type ApiError = z.infer<typeof ApiErrorSchema>

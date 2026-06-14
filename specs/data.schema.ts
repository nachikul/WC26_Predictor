import { z } from 'zod'

// ─── Core Entities ─────────────────────────────────────────────────────────

export const TeamSchema = z.object({
  id: z.string(),
  name: z.string(),
  shortName: z.string(),
  flag: z.string(), // emoji flag
  group: z.string().optional(),
  fifaRanking: z.number().optional(),
})

export const FormEntrySchema = z.object({
  opponent: z.string(),
  result: z.enum(['W', 'D', 'L']),
  score: z.string(), // e.g. "2-1"
  rating: z.number().min(1).max(10), // player rating in that match
  goals: z.number().default(0),
  assists: z.number().default(0),
  minutesPlayed: z.number(),
  competition: z.string(),
})

export const TournamentStatsSchema = z.object({
  appearances: z.number(),
  goals: z.number(),
  assists: z.number(),
  avgRating: z.number(),
  yellowCards: z.number().default(0),
  redCards: z.number().default(0),
})

export const PlayerSchema = z.object({
  id: z.string(),
  name: z.string(),
  position: z.enum(['GK', 'DEF', 'MID', 'FWD']),
  shirtNumber: z.number(),
  teamId: z.string(),
  age: z.number(),
  club: z.string(),
  recentForm: z.array(FormEntrySchema).max(5),
  tournamentStats: TournamentStatsSchema,
  injuryStatus: z.enum(['fit', 'doubt', 'injured']).default('fit'),
  keyStrengths: z.array(z.string()).max(4),
  isStarter: z.boolean().default(true),
})

export const WeatherSchema = z.object({
  condition: z.string(),   // "Clear", "Partly Cloudy", "Rain", etc.
  tempC: z.number(),
  humidity: z.number(),
  windKph: z.number(),
})

export const MatchSchema = z.object({
  id: z.string(),
  homeTeam: TeamSchema,
  awayTeam: TeamSchema,
  stage: z.string(),        // "Group Stage – Group A", "Round of 16", etc.
  venue: z.string(),
  city: z.string(),
  country: z.string(),
  dateUtc: z.string(),      // ISO string
  status: z.enum(['scheduled', 'live', 'finished']),
  score: z
    .object({ home: z.number().nullable(), away: z.number().nullable() })
    .optional(),
  weather: WeatherSchema.optional(),
  homeSquad: z.array(PlayerSchema),
  awaySquad: z.array(PlayerSchema),
})

// ─── Exported Types (TypeScript = the spec) ────────────────────────────────

export type Team = z.infer<typeof TeamSchema>
export type FormEntry = z.infer<typeof FormEntrySchema>
export type Player = z.infer<typeof PlayerSchema>
export type Weather = z.infer<typeof WeatherSchema>
export type Match = z.infer<typeof MatchSchema>
export type TournamentStats = z.infer<typeof TournamentStatsSchema>

// ─── Match Summary (for listing, no squads) ────────────────────────────────

export const MatchSummarySchema = MatchSchema.omit({
  homeSquad: true,
  awaySquad: true,
  weather: true,
})
export type MatchSummary = z.infer<typeof MatchSummarySchema>

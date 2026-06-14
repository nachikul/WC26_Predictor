/**
 * football-data.org v4 adapter.
 *
 * Free tier covers WC2026 fixtures, scores, and team rosters.
 * Falls back to mock data if the API is unreachable or returns no squad.
 *
 * Rate limit: 10 requests/minute on free tier.
 * We use a simple in-process cache to stay well within that.
 */
import type { Match, MatchSummary, Player, Team } from '../../specs/data.schema'
import { getMatchById as getMockMatch, getMatchSummaries as getMockSummaries } from './mock-data'

const BASE_URL = 'https://api.football-data.org/v4'
const WC_CODE = 'WC'

// ─── In-process cache ──────────────────────────────────────────────────────

const _cache = new Map<string, { data: unknown; expiresAt: number }>()

function fromCache<T>(key: string): T | null {
  const entry = _cache.get(key)
  if (!entry || Date.now() > entry.expiresAt) return null
  return entry.data as T
}

function toCache(key: string, data: unknown, ttlSeconds: number) {
  _cache.set(key, { data, expiresAt: Date.now() + ttlSeconds * 1000 })
}

async function fetchFD<T>(path: string, ttlSeconds = 60): Promise<T> {
  const cached = fromCache<T>(path)
  if (cached) return cached

  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'X-Auth-Token': process.env.FOOTBALL_API_KEY ?? '' },
  })

  if (!res.ok) {
    throw new Error(`football-data.org ${res.status} on ${path}`)
  }

  const data = (await res.json()) as T
  toCache(path, data, ttlSeconds)
  return data
}

// ─── Mapping helpers ────────────────────────────────────────────────────────

const FLAG_MAP: Record<string, string> = {
  ARG: '🇦🇷', AUS: '🇦🇺', BEL: '🇧🇪', BOL: '🇧🇴', BRA: '🇧🇷',
  CAN: '🇨🇦', CHI: '🇨🇱', CMR: '🇨🇲', COD: '🇨🇩', COL: '🇨🇴',
  CRC: '🇨🇷', CRO: '🇭🇷', DEN: '🇩🇰', ECU: '🇪🇨', EGY: '🇪🇬',
  ENG: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', ESP: '🇪🇸', FRA: '🇫🇷', GER: '🇩🇪', GHA: '🇬🇭',
  HON: '🇭🇳', HUN: '🇭🇺', IDN: '🇮🇩', IRI: '🇮🇷', ITA: '🇮🇹',
  JPN: '🇯🇵', KOR: '🇰🇷', KSA: '🇸🇦', MAR: '🇲🇦', MEX: '🇲🇽',
  MLI: '🇲🇱', NED: '🇳🇱', NGA: '🇳🇬', NZL: '🇳🇿', PAN: '🇵🇦',
  PAR: '🇵🇾', PER: '🇵🇪', POL: '🇵🇱', POR: '🇵🇹', QAT: '🇶🇦',
  RSA: '🇿🇦', SEN: '🇸🇳', SLV: '🇸🇻', SRB: '🇷🇸', SUI: '🇨🇭',
  TUN: '🇹🇳', TUR: '🇹🇷', UKR: '🇺🇦', URU: '🇺🇾', USA: '🇺🇸',
  VEN: '🇻🇪', WAL: '🏴󠁧󠁢󠁷󠁬󠁳󠁿', ZAM: '🇿🇲', ALG: '🇩🇿', CIV: '🇨🇮',
}

function flagFor(tla: string): string {
  return FLAG_MAP[tla] ?? '🏳️'
}

function mapStatus(s: string): Match['status'] {
  if (s === 'IN_PLAY' || s === 'PAUSED' || s === 'HALFTIME') return 'live'
  if (s === 'FINISHED' || s === 'AWARDED') return 'finished'
  return 'scheduled'
}

function mapStage(stage: string, group?: string | null): string {
  const groupLabel = group
    ? ` – ${group.replace('GROUP_', 'Group ')}`
    : ''

  const stageMap: Record<string, string> = {
    GROUP_STAGE: `Group Stage${groupLabel}`,
    ROUND_OF_16: 'Round of 16',
    QUARTER_FINALS: 'Quarter-Final',
    SEMI_FINALS: 'Semi-Final',
    THIRD_PLACE: 'Third Place Play-off',
    FINAL: 'Final',
  }

  return stageMap[stage] ?? stage
}

function mapPosition(pos: string | null): Player['position'] {
  if (!pos) return 'MID'
  const p = pos.toLowerCase()
  if (p.includes('goalkeeper') || p === 'gk') return 'GK'
  if (p.includes('defence') || p.includes('defender') || p === 'def') return 'DEF'
  if (p.includes('offence') || p.includes('forward') || p.includes('striker') || p === 'fwd') return 'FWD'
  return 'MID'
}

function ageFromDob(dob: string | null): number {
  if (!dob) return 25
  const birth = new Date(dob)
  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()
  if (today < new Date(today.getFullYear(), birth.getMonth(), birth.getDate())) age--
  return age
}

// ─── API response types (minimal, only what we use) ─────────────────────────

interface FDTeam {
  id: number
  name: string
  shortName: string
  tla: string
}

interface FDScore {
  winner: string | null
  fullTime: { home: number | null; away: number | null }
}

interface FDMatch {
  id: number
  utcDate: string
  status: string
  stage: string
  group: string | null
  homeTeam: FDTeam
  awayTeam: FDTeam
  score: FDScore
  venue: string | null
}

interface FDMatchesResponse {
  matches: FDMatch[]
}

interface FDSquadPlayer {
  id: number
  name: string
  position: string | null
  dateOfBirth: string | null
  nationality: string | null
  shirtNumber?: number | null
}

interface FDTeamDetail extends FDTeam {
  squad: FDSquadPlayer[]
  venue: string | null
  area?: { name: string }
}

interface FDTeamsResponse {
  teams: FDTeamDetail[]
}

// ─── Team squad cache (keyed by team id) ────────────────────────────────────

let _squadsById: Map<number, FDTeamDetail> | null = null

async function getSquadsMap(): Promise<Map<number, FDTeamDetail>> {
  if (_squadsById) return _squadsById

  const data = await fetchFD<FDTeamsResponse>(
    `/competitions/${WC_CODE}/teams`,
    3600  // cache 1 hour
  )

  _squadsById = new Map(data.teams.map(t => [t.id, t]))
  return _squadsById
}

// ─── Mapping ─────────────────────────────────────────────────────────────────

function fdTeamToTeam(t: FDTeam, group?: string | null): Team {
  return {
    id: String(t.id),
    name: t.name,
    shortName: t.tla,
    flag: flagFor(t.tla),
    group: group ? group.replace('GROUP_', 'Group ') : undefined,
  }
}

function fdPlayerToPlayer(p: FDSquadPlayer, teamId: string): Player {
  return {
    id: String(p.id),
    name: p.name,
    position: mapPosition(p.position),
    shirtNumber: p.shirtNumber ?? 0,
    teamId,
    age: ageFromDob(p.dateOfBirth),
    club: '',            // free tier doesn't include current club
    recentForm: [],      // not available on free tier — AI uses its own knowledge
    tournamentStats: {
      appearances: 0, goals: 0, assists: 0, avgRating: 0, yellowCards: 0, redCards: 0,
    },
    injuryStatus: 'fit',
    keyStrengths: [],
    isStarter: true,
  }
}

function fdMatchToSummary(m: FDMatch): MatchSummary {
  return {
    id: String(m.id),
    homeTeam: fdTeamToTeam(m.homeTeam, m.group),
    awayTeam: fdTeamToTeam(m.awayTeam, m.group),
    stage: mapStage(m.stage, m.group),
    venue: m.venue ?? 'TBD',
    city: '',
    country: 'USA',
    dateUtc: m.utcDate,
    status: mapStatus(m.status),
    score:
      m.score.fullTime.home !== null
        ? { home: m.score.fullTime.home, away: m.score.fullTime.away }
        : undefined,
  }
}

// ─── Public API ──────────────────────────────────────────────────────────────

const IS_LIVE = process.env.FOOTBALL_DATA_SOURCE === 'live'

export async function getMatchSummaries(): Promise<MatchSummary[]> {
  if (!IS_LIVE) return getMockSummaries()

  try {
    const data = await fetchFD<FDMatchesResponse>(
      `/competitions/${WC_CODE}/matches`,
      60  // refresh every minute for live scores
    )
    return data.matches.map(fdMatchToSummary)
  } catch (e) {
    console.warn('[football-api] falling back to mock:', e)
    return getMockSummaries()
  }
}

export async function getMatch(id: string): Promise<Match | null> {
  if (!IS_LIVE) return getMockMatch(id) ?? null

  try {
    // Get match list to find the fixture
    const data = await fetchFD<FDMatchesResponse>(
      `/competitions/${WC_CODE}/matches`,
      60
    )
    const fdMatch = data.matches.find(m => String(m.id) === id)
    if (!fdMatch) return null

    const summary = fdMatchToSummary(fdMatch)

    // Get squad data for both teams
    const squadsMap = await getSquadsMap()
    const homeDetail = squadsMap.get(fdMatch.homeTeam.id)
    const awayDetail = squadsMap.get(fdMatch.awayTeam.id)

    const buildSquad = (detail: FDTeamDetail | undefined, teamId: string): Player[] => {
      if (!detail?.squad?.length) {
        // Fall back to mock squad if API returned nothing
        const mock = getMockMatch(id)
        if (mock) {
          return teamId === String(fdMatch.homeTeam.id) ? mock.homeSquad : mock.awaySquad
        }
        return []
      }
      // Only starters (first 11) or all if squad is small
      return detail.squad
        .slice(0, Math.min(detail.squad.length, 23))
        .map(p => fdPlayerToPlayer(p, teamId))
    }

    return {
      ...summary,
      homeSquad: buildSquad(homeDetail, String(fdMatch.homeTeam.id)),
      awaySquad: buildSquad(awayDetail, String(fdMatch.awayTeam.id)),
    }
  } catch (e) {
    console.warn('[football-api] falling back to mock for match', id, e)
    return getMockMatch(id) ?? null
  }
}

export async function getLiveMatches(): Promise<MatchSummary[]> {
  const summaries = await getMatchSummaries()
  return summaries.filter(m => m.status === 'live')
}

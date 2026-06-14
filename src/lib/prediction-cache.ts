import { promises as fs } from 'fs'
import path from 'path'
import type { MatchPrediction } from '../../specs/prediction.schema'

const CACHE_DIR = path.join(process.cwd(), 'data', 'predictions')
const CACHE_TTL_SECONDS = 3600  // 1 hour for scheduled/live matches

interface CacheEntry {
  prediction: MatchPrediction
  cachedAt: string
}

async function ensureCacheDir() {
  await fs.mkdir(CACHE_DIR, { recursive: true })
}

function cacheFile(matchId: string) {
  return path.join(CACHE_DIR, `${matchId}.json`)
}

export async function getCached(matchId: string): Promise<{ prediction: MatchPrediction; age: number } | null> {
  try {
    const raw = await fs.readFile(cacheFile(matchId), 'utf-8')
    const entry = JSON.parse(raw) as CacheEntry
    const ageSeconds = (Date.now() - new Date(entry.cachedAt).getTime()) / 1000

    if (ageSeconds > CACHE_TTL_SECONDS) return null
    return { prediction: entry.prediction, age: Math.round(ageSeconds) }
  } catch {
    return null
  }
}

export async function setCached(matchId: string, prediction: MatchPrediction): Promise<void> {
  await ensureCacheDir()
  const entry: CacheEntry = { prediction, cachedAt: new Date().toISOString() }
  await fs.writeFile(cacheFile(matchId), JSON.stringify(entry, null, 2))
}

export async function invalidate(matchId: string): Promise<void> {
  try {
    await fs.unlink(cacheFile(matchId))
  } catch {}
}

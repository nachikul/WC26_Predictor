import { NextResponse } from 'next/server'
import { getMatchSummaries } from '@/lib/football-api'

export async function GET() {
  try {
    const matches = await getMatchSummaries()
    return NextResponse.json({
      matches,
      dataSource: process.env.FOOTBALL_DATA_SOURCE ?? 'mock',
      lastUpdated: new Date().toISOString(),
    })
  } catch (err) {
    console.error('[/api/matches]', err)
    return NextResponse.json({ error: 'Failed to fetch matches', code: 500 }, { status: 500 })
  }
}

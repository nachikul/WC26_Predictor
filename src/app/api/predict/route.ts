import { NextRequest, NextResponse } from 'next/server'
import { getMatch } from '@/lib/football-api'
import { generatePrediction } from '@/lib/predictor'
import { getCached, setCached } from '@/lib/prediction-cache'
import { PredictRequestSchema } from '../../../../specs/api.spec'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { matchId, forceRefresh } = PredictRequestSchema.parse(body)

    // Check cache first (skip if forceRefresh)
    if (!forceRefresh) {
      const cached = await getCached(matchId)
      if (cached) {
        return NextResponse.json({
          prediction: cached.prediction,
          cached: true,
          cacheAge: cached.age,
        })
      }
    }

    // Load match data
    const match = await getMatch(matchId)
    if (!match) {
      return NextResponse.json({ error: `Match ${matchId} not found`, code: 404 }, { status: 404 })
    }

    // Generate prediction via AI
    const prediction = await generatePrediction(match)

    // Cache for future requests
    await setCached(matchId, prediction)

    return NextResponse.json({ prediction, cached: false })
  } catch (err) {
    console.error('[/api/predict]', err)
    const message = err instanceof Error ? err.message : 'Prediction failed'
    return NextResponse.json({ error: message, code: 500 }, { status: 500 })
  }
}

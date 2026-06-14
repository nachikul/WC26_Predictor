import { NextResponse } from 'next/server'
import { getCostStatus } from '@/lib/cost-tracker'

export async function GET() {
  try {
    const status = await getCostStatus()
    return NextResponse.json(status)
  } catch (err) {
    console.error('[/api/cost]', err)
    return NextResponse.json({ error: 'Failed to read cost data', code: 500 }, { status: 500 })
  }
}

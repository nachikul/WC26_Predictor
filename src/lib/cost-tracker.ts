import { promises as fs } from 'fs'
import path from 'path'

const COST_FILE = path.join(process.cwd(), 'data', 'cost.json')

const CLAUDE_INPUT_COST_PER_TOKEN = 3.0 / 1_000_000   // $3 per MTok
const CLAUDE_OUTPUT_COST_PER_TOKEN = 15.0 / 1_000_000  // $15 per MTok

const BUDGET_USD = parseFloat(process.env.CLAUDE_BUDGET_USD ?? '5.00')
const FALLBACK_USD = parseFloat(process.env.CLAUDE_FALLBACK_THRESHOLD_USD ?? '4.50')

interface CostData {
  claudeSpentUsd: number
  claudeInputTokens: number
  claudeOutputTokens: number
  groqRequestCount: number
  totalPredictions: number
  lastUpdated: string
}

const DEFAULT_DATA: CostData = {
  claudeSpentUsd: 0,
  claudeInputTokens: 0,
  claudeOutputTokens: 0,
  groqRequestCount: 0,
  totalPredictions: 0,
  lastUpdated: new Date().toISOString(),
}

async function ensureDataDir() {
  try {
    await fs.mkdir(path.join(process.cwd(), 'data'), { recursive: true })
  } catch {}
}

async function readCostData(): Promise<CostData> {
  try {
    const raw = await fs.readFile(COST_FILE, 'utf-8')
    return JSON.parse(raw) as CostData
  } catch {
    return { ...DEFAULT_DATA }
  }
}

async function writeCostData(data: CostData): Promise<void> {
  await ensureDataDir()
  await fs.writeFile(COST_FILE, JSON.stringify(data, null, 2))
}

export async function getActiveModel(): Promise<'claude' | 'groq'> {
  const data = await readCostData()
  return data.claudeSpentUsd >= FALLBACK_USD ? 'groq' : 'claude'
}

export async function checkBudget(): Promise<{ allowed: boolean; reason?: string; model: 'claude' | 'groq' }> {
  const data = await readCostData()

  if (data.claudeSpentUsd >= BUDGET_USD) {
    // Hard limit: only allow groq
    return { allowed: true, model: 'groq' }
  }

  if (data.claudeSpentUsd >= FALLBACK_USD) {
    return { allowed: true, model: 'groq' }
  }

  return { allowed: true, model: 'claude' }
}

export async function recordClaudeUsage(inputTokens: number, outputTokens: number): Promise<void> {
  const data = await readCostData()
  const cost = inputTokens * CLAUDE_INPUT_COST_PER_TOKEN + outputTokens * CLAUDE_OUTPUT_COST_PER_TOKEN

  data.claudeInputTokens += inputTokens
  data.claudeOutputTokens += outputTokens
  data.claudeSpentUsd += cost
  data.totalPredictions += 1
  data.lastUpdated = new Date().toISOString()

  await writeCostData(data)
}

export async function recordGroqUsage(): Promise<void> {
  const data = await readCostData()
  data.groqRequestCount += 1
  data.totalPredictions += 1
  data.lastUpdated = new Date().toISOString()
  await writeCostData(data)
}

export async function getCostStatus() {
  const data = await readCostData()
  const model = data.claudeSpentUsd >= FALLBACK_USD ? 'groq' : 'claude'
  const avgCost = data.totalPredictions > 0 ? data.claudeSpentUsd / data.totalPredictions : 0

  return {
    claudeSpentUsd: Math.round(data.claudeSpentUsd * 10000) / 10000,
    groqRequestCount: data.groqRequestCount,
    budgetUsd: BUDGET_USD,
    fallbackThresholdUsd: FALLBACK_USD,
    percentUsed: Math.min(100, Math.round((data.claudeSpentUsd / BUDGET_USD) * 100)),
    activeModel: model as 'claude' | 'groq',
    totalPredictions: data.totalPredictions,
    avgCostPerPrediction: Math.round(avgCost * 10000) / 10000,
  }
}

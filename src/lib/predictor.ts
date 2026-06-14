import Anthropic from '@anthropic-ai/sdk'
import Groq from 'groq-sdk'
import { MatchPredictionSchema } from '../../specs/prediction.schema'
import type { Match } from '../../specs/data.schema'
import type { MatchPrediction } from '../../specs/prediction.schema'
import { buildPredictionPrompt } from './prompt-builder'
import { checkBudget, recordClaudeUsage, recordGroqUsage } from './cost-tracker'

const CLAUDE_MODEL = 'claude-sonnet-4-6'
const GROQ_MODEL = 'llama-3.3-70b-versatile'

async function callClaude(prompt: string): Promise<{ raw: string; inputTokens: number; outputTokens: number }> {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

  const response = await client.messages.create({
    model: CLAUDE_MODEL,
    max_tokens: 6000,
    messages: [{ role: 'user', content: prompt }],
    system: 'You are a football analytics AI. Respond ONLY with the exact JSON structure requested. No markdown fences, no preamble, no trailing text.',
  })

  const text = response.content.find(b => b.type === 'text')?.text ?? ''
  return {
    raw: text,
    inputTokens: response.usage.input_tokens,
    outputTokens: response.usage.output_tokens,
  }
}

async function callGroq(prompt: string): Promise<{ raw: string }> {
  const client = new Groq({ apiKey: process.env.GROQ_API_KEY })

  const response = await client.chat.completions.create({
    model: GROQ_MODEL,
    max_tokens: 6000,
    response_format: { type: 'json_object' },
    messages: [
      {
        role: 'system',
        content: 'You are a football analytics AI. Respond ONLY with the exact JSON structure requested. No markdown fences, no preamble, no trailing text.',
      },
      { role: 'user', content: prompt },
    ],
  })

  return { raw: response.choices[0]?.message?.content ?? '{}' }
}

function parseAndValidate(raw: string, model: string): MatchPrediction {
  // Strip any accidental markdown fences
  const clean = raw.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim()

  let parsed: unknown
  try {
    parsed = JSON.parse(clean)
  } catch (e) {
    throw new Error(`AI returned invalid JSON. Raw: ${raw.slice(0, 300)}`)
  }

  // Inject current timestamp and model if AI omitted them
  if (typeof parsed === 'object' && parsed !== null) {
    const obj = parsed as Record<string, unknown>
    if (!obj.generatedAt) obj.generatedAt = new Date().toISOString()
    if (!obj.modelUsed) obj.modelUsed = model
  }

  const result = MatchPredictionSchema.safeParse(parsed)
  if (!result.success) {
    console.error('Validation errors:', result.error.issues)
    throw new Error(`Prediction failed schema validation: ${result.error.issues[0]?.message}`)
  }

  return result.data
}

export async function generatePrediction(match: Match): Promise<MatchPrediction> {
  const { model } = await checkBudget()
  const prompt = buildPredictionPrompt(match)

  if (model === 'claude') {
    const { raw, inputTokens, outputTokens } = await callClaude(prompt)
    const prediction = parseAndValidate(raw, CLAUDE_MODEL)
    await recordClaudeUsage(inputTokens, outputTokens)
    return {
      ...prediction,
      tokensUsed: inputTokens + outputTokens,
      costUsd: Math.round((inputTokens * 3 / 1_000_000 + outputTokens * 15 / 1_000_000) * 10000) / 10000,
      modelUsed: CLAUDE_MODEL,
    }
  } else {
    const { raw } = await callGroq(prompt)
    const prediction = parseAndValidate(raw, GROQ_MODEL)
    await recordGroqUsage()
    return { ...prediction, modelUsed: GROQ_MODEL }
  }
}

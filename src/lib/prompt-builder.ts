import type { Match, Player } from '../../specs/data.schema'

function formatPlayer(p: Player): string {
  const hasStats = p.tournamentStats.appearances > 0
  const hasForm = p.recentForm.length > 0
  const hasStrengths = p.keyStrengths.length > 0

  const formSummary = hasForm
    ? p.recentForm
        .map(f => `${f.competition}: ${f.result} vs ${f.opponent} (Rating ${f.rating}/10, ${f.goals}G ${f.assists}A)`)
        .join('; ')
    : null

  const clubStr = p.club ? `, ${p.club}` : ''
  const shirtStr = p.shirtNumber ? `#${p.shirtNumber} ` : ''

  const lines = [
    `  ${shirtStr}${p.name} (${p.position}, Age ${p.age}${clubStr})`,
  ]

  if (hasStats) {
    lines.push(
      `  Tournament: ${p.tournamentStats.appearances} apps, ${p.tournamentStats.goals}G, ${p.tournamentStats.assists}A, avg rating ${p.tournamentStats.avgRating}`
    )
  }

  if (formSummary) {
    lines.push(`  Recent form: ${formSummary}`)
  }

  if (hasStrengths) {
    lines.push(`  Key strengths: ${p.keyStrengths.join(', ')}`)
  }

  return lines.join('\n')
}

// Whether the prompt should ask the AI to draw on its own training knowledge
function hasLimitedData(players: Player[]): boolean {
  return players.every(p => p.recentForm.length === 0 && p.tournamentStats.appearances === 0)
}

export function buildPredictionPrompt(match: Match): string {
  const homeStarters = match.homeSquad.filter(p => p.isStarter).slice(0, 11)
  const awayStarters = match.awaySquad.filter(p => p.isStarter).slice(0, 11)

  // If we got live API data with no stats, tell the AI to use its own knowledge
  const sparseData = hasLimitedData([...homeStarters, ...awayStarters])
  const knowledgeNote = sparseData
    ? `\nNOTE: Detailed match stats are not available for these players. Draw on your training knowledge of each player's real-world form, playing style, club performances, and capabilities as of mid-2026 to inform your ratings.\n`
    : ''

  const weatherInfo = match.weather
    ? `Weather: ${match.weather.condition}, ${match.weather.tempC}°C, ${match.weather.humidity}% humidity, ${match.weather.windKph}km/h wind`
    : 'Weather: Not available'

  return `You are an expert football analyst covering the 2026 FIFA World Cup.
${knowledgeNote}
Analyse this upcoming match and produce a detailed prediction. Base each player rating on their SPECIFIC ROLE in this match: their form, their physical condition, the opposition they face directly, and the pressure of this stage.

=== MATCH DETAILS ===
${match.homeTeam.name} vs ${match.awayTeam.name}
Stage: ${match.stage}
Venue: ${match.venue}, ${match.city}
${weatherInfo}
FIFA Rankings: ${match.homeTeam.name} #${match.homeTeam.fifaRanking ?? 'N/A'} vs ${match.awayTeam.name} #${match.awayTeam.fifaRanking ?? 'N/A'}

=== HOME TEAM: ${match.homeTeam.name.toUpperCase()} ===
${homeStarters.map(formatPlayer).join('\n\n')}

=== AWAY TEAM: ${match.awayTeam.name.toUpperCase()} ===
${awayStarters.map(formatPlayer).join('\n\n')}

=== YOUR TASK ===
Return ONLY a JSON object with this EXACT structure (no markdown, no preamble):
{
  "matchId": "${match.id}",
  "homePlayerRatings": [
    {
      "playerId": "<player id from above>",
      "playerName": "<full name>",
      "position": "<GK|DEF|MID|FWD>",
      "shirtNumber": <number>,
      "team": "${match.homeTeam.name}",
      "rating": <0.0-10.0, one decimal>,
      "shortReasoning": "<1-2 sentences explaining the rating in context of THIS match>",
      "keyFactors": ["<factor 1>", "<factor 2>", "<factor 3>"],
      "formFactor": "<excellent|good|average|poor>",
      "matchupAdvantage": "<strong|neutral|tough>",
      "formScore": <0.0-10.0>,
      "conditionScore": <0.0-10.0>,
      "oppositionScore": <0.0-10.0>
    }
    // ... one entry per home starter
  ],
  "awayPlayerRatings": [ /* same shape, for away team */ ],
  "scoreline": {
    "homeGoals": <integer>,
    "awayGoals": <integer>,
    "confidence": <0-100>,
    "scorlineReasoning": "<2-3 sentences on why this scoreline>",
    "likelyScorers": [
      { "playerName": "<name>", "team": "<team name>", "probability": <0-100> }
    ],
    "keyMatchupInsight": "<the decisive head-to-head battle in this match>",
    "tacticalAnalysis": "<3-4 sentences on how both teams will set up>",
    "alternativeScorelines": [
      { "home": <int>, "away": <int>, "probability": <0-100> }
    ]
  },
  "overallMatchRating": {
    "excitement": <1-10>,
    "competitiveness": <1-10>,
    "qualityOfFootball": <1-10>
  },
  "generatedAt": "<ISO timestamp>",
  "modelUsed": "<model name>"
}`
}

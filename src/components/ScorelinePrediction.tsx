'use client'
import type { ScorelinePrediction } from '../../specs/prediction.schema'
import type { Team } from '../../specs/data.schema'

interface Props {
  scoreline: ScorelinePrediction
  homeTeam: Team
  awayTeam: Team
}

export default function ScorelinePrediction({ scoreline, homeTeam, awayTeam }: Props) {
  return (
    <div className="rounded-2xl border border-[#1e3052] bg-[#0f1a2e] overflow-hidden">
      {/* Main scoreline */}
      <div className="relative bg-gradient-to-r from-[#0a0f1e] via-[#0f1a2e] to-[#0a0f1e] p-8">
        <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.4%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')]" />

        <div className="relative flex items-center justify-between gap-4">
          {/* Home team */}
          <div className="flex-1 text-center">
            <div className="text-4xl mb-2">{homeTeam.flag}</div>
            <div className="font-bold text-white text-lg">{homeTeam.name}</div>
            <div className="text-slate-400 text-sm">{homeTeam.shortName}</div>
          </div>

          {/* Score */}
          <div className="flex items-center gap-3">
            <span className="text-7xl font-black text-white tabular-nums">{scoreline.homeGoals}</span>
            <span className="text-4xl text-slate-500 font-light">–</span>
            <span className="text-7xl font-black text-white tabular-nums">{scoreline.awayGoals}</span>
          </div>

          {/* Away team */}
          <div className="flex-1 text-center">
            <div className="text-4xl mb-2">{awayTeam.flag}</div>
            <div className="font-bold text-white text-lg">{awayTeam.name}</div>
            <div className="text-slate-400 text-sm">{awayTeam.shortName}</div>
          </div>
        </div>

        {/* Confidence */}
        <div className="relative mt-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#162135] border border-[#1e3052]">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm text-slate-300">Confidence: </span>
            <span className="font-bold text-emerald-400">{scoreline.confidence}%</span>
          </div>
        </div>
      </div>

      {/* Analysis */}
      <div className="p-6 space-y-5">
        {/* Scoreline reasoning */}
        <div>
          <h3 className="text-xs font-semibold text-emerald-500 uppercase tracking-wider mb-2">Prediction Reasoning</h3>
          <p className="text-slate-300 text-sm leading-relaxed">{scoreline.scorlineReasoning}</p>
        </div>

        {/* Key matchup */}
        <div className="rounded-lg bg-[#162135] border border-[#1e3052] p-4">
          <h3 className="text-xs font-semibold text-amber-500 uppercase tracking-wider mb-2">Key Matchup</h3>
          <p className="text-slate-300 text-sm leading-relaxed">{scoreline.keyMatchupInsight}</p>
        </div>

        {/* Tactical analysis */}
        <div>
          <h3 className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2">Tactical Analysis</h3>
          <p className="text-slate-300 text-sm leading-relaxed">{scoreline.tacticalAnalysis}</p>
        </div>

        {/* Likely scorers */}
        {scoreline.likelyScorers.length > 0 && (
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Likely Goalscorers</h3>
            <div className="space-y-2">
              {scoreline.likelyScorers.map((s, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-lg">⚽</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-white">{s.playerName}</span>
                      <span className="text-xs text-slate-400">{s.team}</span>
                    </div>
                    <div className="h-1.5 bg-[#1e3052] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-emerald-500 transition-all duration-700"
                        style={{ width: `${s.probability}%` }}
                      />
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">{s.probability}% probability</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Alternative scorelines */}
        {scoreline.alternativeScorelines.length > 0 && (
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Other Possible Scorelines</h3>
            <div className="flex gap-3 flex-wrap">
              {scoreline.alternativeScorelines.map((alt, i) => (
                <div key={i} className="flex-1 min-w-[80px] text-center rounded-lg bg-[#162135] border border-[#1e3052] p-3">
                  <div className="font-bold text-white text-lg">{alt.home}–{alt.away}</div>
                  <div className="text-xs text-slate-400 mt-1">{alt.probability}%</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

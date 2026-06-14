'use client'
import type { PlayerRating } from '../../specs/prediction.schema'

interface Props {
  rating: PlayerRating
}

function ratingColor(r: number) {
  if (r >= 8) return { ring: '#10b981', bg: 'rgba(16,185,129,0.15)', text: '#10b981' }
  if (r >= 6.5) return { ring: '#f59e0b', bg: 'rgba(245,158,11,0.15)', text: '#f59e0b' }
  return { ring: '#ef4444', bg: 'rgba(239,68,68,0.15)', text: '#ef4444' }
}

function formBadge(f: PlayerRating['formFactor']) {
  const map = {
    excellent: { label: 'Excellent Form', cls: 'bg-emerald-900/50 text-emerald-400 border-emerald-700' },
    good: { label: 'Good Form', cls: 'bg-blue-900/50 text-blue-400 border-blue-700' },
    average: { label: 'Average Form', cls: 'bg-yellow-900/50 text-yellow-400 border-yellow-700' },
    poor: { label: 'Poor Form', cls: 'bg-red-900/50 text-red-400 border-red-700' },
  }
  return map[f]
}

function matchupBadge(m: PlayerRating['matchupAdvantage']) {
  const map = {
    strong: { label: '↑ Strong Matchup', cls: 'text-emerald-400' },
    neutral: { label: '→ Neutral Matchup', cls: 'text-slate-400' },
    tough: { label: '↓ Tough Matchup', cls: 'text-red-400' },
  }
  return map[m]
}

function RatingRing({ rating }: { rating: number }) {
  const { ring, bg, text } = ratingColor(rating)
  const circumference = 2 * Math.PI * 20
  const progress = (rating / 10) * circumference

  return (
    <div className="relative flex-shrink-0 w-14 h-14 flex items-center justify-center">
      <svg width="56" height="56" className="-rotate-90">
        <circle cx="28" cy="28" r="20" fill="none" stroke="#1e3052" strokeWidth="4" />
        <circle
          cx="28" cy="28" r="20" fill="none"
          stroke={ring} strokeWidth="4"
          strokeDasharray={`${progress} ${circumference}`}
          strokeLinecap="round"
          style={{ transition: 'stroke-dasharray 0.8s ease' }}
        />
      </svg>
      <span className="absolute text-sm font-bold" style={{ color: text }}>
        {rating.toFixed(1)}
      </span>
      <div className="absolute inset-0 rounded-full opacity-20" style={{ background: bg }} />
    </div>
  )
}

const positionColors: Record<string, string> = {
  GK: 'bg-yellow-900/60 text-yellow-400',
  DEF: 'bg-blue-900/60 text-blue-400',
  MID: 'bg-emerald-900/60 text-emerald-400',
  FWD: 'bg-red-900/60 text-red-400',
}

export default function PlayerRatingCard({ rating }: Props) {
  const form = formBadge(rating.formFactor)
  const matchup = matchupBadge(rating.matchupAdvantage)

  return (
    <div className="rounded-xl border border-[#1e3052] bg-[#0f1a2e] hover:bg-[#162135] transition-colors p-4">
      <div className="flex items-start gap-3">
        <RatingRing rating={rating.rating} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="font-semibold text-white truncate">{rating.playerName}</span>
            <span className={`text-xs px-1.5 py-0.5 rounded font-mono font-bold ${positionColors[rating.position]}`}>
              {rating.position}
            </span>
            <span className="text-xs text-slate-500">#{rating.shirtNumber}</span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed mb-2">{rating.shortReasoning}</p>

          <div className="flex flex-wrap gap-2 mb-2">
            <span className={`text-xs px-2 py-0.5 rounded-full border ${form.cls}`}>{form.label}</span>
            <span className={`text-xs font-medium ${matchup.cls}`}>{matchup.label}</span>
          </div>

          <ul className="space-y-0.5">
            {rating.keyFactors.map((f, i) => (
              <li key={i} className="text-xs text-slate-400 flex items-start gap-1">
                <span className="text-emerald-500 mt-0.5">•</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>

          {/* Sub-scores */}
          <div className="mt-3 grid grid-cols-3 gap-2">
            {[
              { label: 'Form', val: rating.formScore },
              { label: 'Condition', val: rating.conditionScore },
              { label: 'vs Opp', val: rating.oppositionScore },
            ].map(({ label, val }) => (
              <div key={label} className="text-center">
                <div className="text-xs text-slate-500 mb-1">{label}</div>
                <div className="h-1.5 bg-[#1e3052] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${(val / 10) * 100}%`, backgroundColor: ratingColor(val).ring }}
                  />
                </div>
                <div className="text-xs mt-0.5" style={{ color: ratingColor(val).text }}>{val.toFixed(1)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

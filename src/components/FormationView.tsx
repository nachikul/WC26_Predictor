'use client'
import type { PlayerRating } from '../../specs/prediction.schema'
import type { Team } from '../../specs/data.schema'

interface Props {
  playerRatings: PlayerRating[]
  team: Team
  flipped?: boolean
}

function ratingColor(r: number) {
  if (r >= 8) return '#10b981'
  if (r >= 6.5) return '#f59e0b'
  return '#ef4444'
}

function groupByPosition(ratings: PlayerRating[]): Record<string, PlayerRating[]> {
  return ratings.reduce<Record<string, PlayerRating[]>>((acc, r) => {
    acc[r.position] = acc[r.position] ? [...acc[r.position], r] : [r]
    return acc
  }, {})
}

function PlayerDot({ rating }: { rating: PlayerRating }) {
  const color = ratingColor(rating.rating)
  const lastName = rating.playerName.split(' ').pop() ?? rating.playerName

  return (
    <div className="flex flex-col items-center gap-1 group cursor-default select-none">
      <div
        className="w-11 h-11 rounded-full border-2 flex items-center justify-center transition-transform duration-150 group-hover:scale-110"
        style={{
          borderColor: color,
          background: 'rgba(0,0,0,0.55)',
          boxShadow: `0 0 10px ${color}55, 0 2px 6px rgba(0,0,0,0.7)`,
        }}
        title={`${rating.playerName}: ${rating.rating}/10 — ${rating.shortReasoning}`}
      >
        <span className="text-[11px] font-bold" style={{ color }}>
          {rating.rating.toFixed(1)}
        </span>
      </div>
      <span
        className="text-[10px] font-semibold leading-tight text-center max-w-[52px] truncate"
        style={{ color: 'rgba(255,255,255,0.88)', textShadow: '0 1px 3px rgba(0,0,0,0.9)' }}
      >
        {lastName}
      </span>
    </div>
  )
}

export default function FormationView({ playerRatings, team, flipped = false }: Props) {
  const grouped = groupByPosition(playerRatings)
  const avgRating =
    playerRatings.reduce((s, r) => s + r.rating, 0) / (playerRatings.length || 1)

  // Vertical position of each row as % from top of pitch area.
  // Normal:  GK attacks upward → GK near bottom, FWD near top.
  // Flipped: GK near top (used when showing away team attacking downward).
  const rowY: Record<string, number> = flipped
    ? { GK: 12, DEF: 30, MID: 52, FWD: 73 }
    : { GK: 81, DEF: 63, MID: 41, FWD: 20 }

  return (
    <div className="rounded-xl border border-[#1e3052] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#0f1a2e] border-b border-[#1e3052]">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{team.flag}</span>
          <span className="font-bold text-white">{team.name}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-slate-400">Team avg</span>
          <span className="text-sm font-bold" style={{ color: ratingColor(avgRating) }}>
            {avgRating.toFixed(1)}
          </span>
        </div>
      </div>

      {/* Pitch */}
      <div className="relative" style={{ height: 420 }}>
        {/* Grass stripes */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'repeating-linear-gradient(to bottom, #1b4d1b 0px, #1b4d1b 28px, #1e5520 28px, #1e5520 56px)',
          }}
        />

        {/* Pitch line markings */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 320 420"
          preserveAspectRatio="none"
          fill="none"
          stroke="rgba(255,255,255,0.30)"
          strokeWidth="1.5"
        >
          {/* Outer boundary */}
          <rect x="18" y="10" width="284" height="400" />

          {/* Halfway line */}
          <line x1="18" y1="210" x2="302" y2="210" />

          {/* Centre circle + spot */}
          <circle cx="160" cy="210" r="44" />
          <circle cx="160" cy="210" r="2.5" fill="rgba(255,255,255,0.30)" stroke="none" />

          {/* ── Top (opponent) end ── */}
          {/* Penalty area */}
          <rect x="80" y="10" width="160" height="68" />
          {/* Goal area */}
          <rect x="116" y="10" width="88" height="28" />
          {/* Goal box */}
          <rect x="128" y="4" width="64" height="14" strokeWidth="2" stroke="rgba(255,255,255,0.45)" />
          {/* Penalty spot */}
          <circle cx="160" cy="52" r="2.5" fill="rgba(255,255,255,0.30)" stroke="none" />
          {/* Penalty arc */}
          <path d="M 122 78 A 42 42 0 0 1 198 78" />

          {/* ── Bottom (home) end ── */}
          {/* Penalty area */}
          <rect x="80" y="342" width="160" height="68" />
          {/* Goal area */}
          <rect x="116" y="382" width="88" height="28" />
          {/* Goal box */}
          <rect x="128" y="402" width="64" height="14" strokeWidth="2" stroke="rgba(255,255,255,0.45)" />
          {/* Penalty spot */}
          <circle cx="160" cy="368" r="2.5" fill="rgba(255,255,255,0.30)" stroke="none" />
          {/* Penalty arc */}
          <path d="M 122 342 A 42 42 0 0 0 198 342" />

          {/* Corner arcs */}
          <path d="M 18 22 A 10 10 0 0 1 28 10" />
          <path d="M 292 10 A 10 10 0 0 1 302 22" />
          <path d="M 18 398 A 10 10 0 0 0 28 410" />
          <path d="M 302 398 A 10 10 0 0 1 292 410" />
        </svg>

        {/* Player rows — absolutely positioned */}
        {(['GK', 'DEF', 'MID', 'FWD'] as const).map(pos => {
          const players = grouped[pos] ?? []
          if (players.length === 0) return null
          return (
            <div
              key={pos}
              className="absolute left-0 right-0 flex justify-around items-center px-5"
              style={{ top: `${rowY[pos]}%`, transform: 'translateY(-50%)' }}
            >
              {players.map(p => (
                <PlayerDot key={p.playerId} rating={p} />
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}

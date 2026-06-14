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

const POSITION_ROWS: Record<string, number> = { GK: 4, DEF: 3, MID: 2, FWD: 1 }

function groupByPosition(ratings: PlayerRating[]): Record<string, PlayerRating[]> {
  return ratings.reduce<Record<string, PlayerRating[]>>((acc, r) => {
    const key = r.position
    acc[key] = acc[key] ? [...acc[key], r] : [r]
    return acc
  }, {})
}

function PlayerDot({ rating, small }: { rating: PlayerRating; small?: boolean }) {
  const color = ratingColor(rating.rating)
  const size = small ? 'w-12 h-12' : 'w-14 h-14'

  return (
    <div className="flex flex-col items-center gap-1 group">
      <div
        className={`${size} rounded-full border-2 flex items-center justify-center cursor-default
                   transition-transform group-hover:scale-110 bg-[#0a0f1e]`}
        style={{ borderColor: color, boxShadow: `0 0 12px ${color}40` }}
        title={`${rating.playerName}: ${rating.rating}/10`}
      >
        <span className="text-xs font-bold" style={{ color }}>{rating.rating.toFixed(1)}</span>
      </div>
      <span className="text-[10px] text-slate-400 text-center leading-tight max-w-[56px] truncate">
        {rating.playerName.split(' ').pop()}
      </span>
    </div>
  )
}

export default function FormationView({ playerRatings, team, flipped = false }: Props) {
  const grouped = groupByPosition(playerRatings)
  const rows = flipped
    ? ['FWD', 'MID', 'DEF', 'GK']
    : ['GK', 'DEF', 'MID', 'FWD']

  const avgRating = playerRatings.reduce((s, r) => s + r.rating, 0) / (playerRatings.length || 1)

  return (
    <div className="rounded-xl border border-[#1e3052] bg-[#0a0f1e] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#1e3052] bg-[#0f1a2e]">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{team.flag}</span>
          <span className="font-bold text-white">{team.name}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-slate-400">Avg</span>
          <span className="text-sm font-bold" style={{ color: ratingColor(avgRating) }}>
            {avgRating.toFixed(1)}
          </span>
        </div>
      </div>

      {/* Pitch */}
      <div
        className="relative p-4 min-h-[280px] flex flex-col justify-between"
        style={{
          background: 'repeating-linear-gradient(0deg, #0a0f1e 0px, #0a0f1e 35px, #0d1423 35px, #0d1423 36px)',
        }}
      >
        {/* Center line decoration */}
        <div className="absolute left-4 right-4 top-1/2 border-t border-[#1e3052]/50 border-dashed" />

        {rows.map(pos => {
          const players = grouped[pos] ?? []
          if (players.length === 0) return null
          return (
            <div key={pos} className="relative z-10 flex justify-around items-center py-2">
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

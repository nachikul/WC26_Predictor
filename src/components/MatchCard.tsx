'use client'
import type { MatchSummary } from '../../specs/data.schema'

interface Props {
  match: MatchSummary
  selected: boolean
  onSelect: () => void
}

const stageShort = (stage: string) => stage.replace('Group Stage – ', '')

function StatusPill({ status }: { status: MatchSummary['status'] }) {
  if (status === 'live') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-bold bg-red-900/60 text-red-400 border border-red-700">
        <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
        LIVE
      </span>
    )
  }
  if (status === 'finished') {
    return <span className="text-xs text-slate-500 font-medium">FT</span>
  }
  return null
}

export default function MatchCard({ match, selected, onSelect }: Props) {
  const date = new Date(match.dateUtc)
  const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  const timeStr = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' })

  return (
    <button
      onClick={onSelect}
      className={`w-full text-left rounded-xl border p-4 transition-all ${
        selected
          ? 'border-emerald-600 bg-emerald-900/20 shadow-lg shadow-emerald-900/20'
          : 'border-[#1e3052] bg-[#0f1a2e] hover:bg-[#162135] hover:border-[#2a4070]'
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-slate-500 font-medium">{stageShort(match.stage)}</span>
        <StatusPill status={match.status} />
      </div>

      <div className="flex items-center gap-3">
        {/* Home */}
        <div className="flex-1 text-right">
          <div className="text-2xl mb-1">{match.homeTeam.flag}</div>
          <div className="font-bold text-white text-sm">{match.homeTeam.shortName}</div>
          {match.score && (
            <div className="text-xl font-black text-white mt-1">{match.score.home ?? '-'}</div>
          )}
        </div>

        <div className="flex flex-col items-center">
          <span className="text-slate-600 text-lg font-light">vs</span>
          <span className="text-xs text-slate-500 mt-1">{dateStr}</span>
          <span className="text-xs text-slate-600">{timeStr}</span>
        </div>

        {/* Away */}
        <div className="flex-1 text-left">
          <div className="text-2xl mb-1">{match.awayTeam.flag}</div>
          <div className="font-bold text-white text-sm">{match.awayTeam.shortName}</div>
          {match.score && (
            <div className="text-xl font-black text-white mt-1">{match.score.away ?? '-'}</div>
          )}
        </div>
      </div>

      <div className="mt-3 text-xs text-slate-500 text-center truncate">
        {match.venue !== 'TBD' ? match.venue : ''}
        {match.city ? `, ${match.city}` : ''}
      </div>
    </button>
  )
}

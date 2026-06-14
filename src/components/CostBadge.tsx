'use client'
import { useEffect, useState } from 'react'
import type { CostStatus } from '../../specs/api.spec'

export default function CostBadge() {
  const [status, setStatus] = useState<CostStatus | null>(null)

  useEffect(() => {
    const load = () =>
      fetch('/api/cost')
        .then(r => r.json())
        .then(setStatus)
        .catch(() => {})

    load()
    const t = setInterval(load, 15000)  // refresh every 15s
    return () => clearInterval(t)
  }, [])

  if (!status) return null

  const isGroq = status.activeModel === 'groq'
  const pct = status.percentUsed

  return (
    <div className="flex items-center gap-3 px-3 py-1.5 rounded-lg border border-[#1e3052] bg-[#0f1a2e] text-xs">
      {/* Model indicator */}
      <div className="flex items-center gap-1.5">
        <div className={`w-2 h-2 rounded-full ${isGroq ? 'bg-amber-400' : 'bg-emerald-400'}`} />
        <span className={isGroq ? 'text-amber-400 font-medium' : 'text-emerald-400 font-medium'}>
          {isGroq ? 'Groq' : 'Claude'}
        </span>
      </div>

      <div className="w-px h-3 bg-[#1e3052]" />

      {/* Budget bar */}
      <div className="flex items-center gap-2">
        <span className="text-slate-400">${status.claudeSpentUsd.toFixed(3)}</span>
        <div className="w-16 h-1.5 bg-[#1e3052] rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${
              pct > 90 ? 'bg-red-500' : pct > 70 ? 'bg-amber-500' : 'bg-emerald-500'
            }`}
            style={{ width: `${pct}%` }}
          />
        </div>
        <span className="text-slate-500">/ ${status.budgetUsd}</span>
      </div>

      <div className="w-px h-3 bg-[#1e3052]" />
      <span className="text-slate-500">{status.totalPredictions} predictions</span>
    </div>
  )
}

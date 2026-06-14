'use client'
import { useState, useEffect } from 'react'
import type { MatchSummary } from '../../specs/data.schema'
import type { MatchPrediction } from '../../specs/prediction.schema'
import MatchCard from '@/components/MatchCard'
import PlayerRatingCard from '@/components/PlayerRatingCard'
import ScorelinePrediction from '@/components/ScorelinePrediction'
import FormationView from '@/components/FormationView'
import CostBadge from '@/components/CostBadge'

type Tab = 'overview' | 'home' | 'away' | 'formations'

function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-[#1e3052]" />
        <div className="absolute inset-0 rounded-full border-4 border-t-emerald-500 animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center text-2xl">⚽</div>
      </div>
      <p className="text-slate-400 text-sm">AI is analysing the match...</p>
      <p className="text-slate-600 text-xs">Rating all 22 players, building tactical analysis</p>
    </div>
  )
}

function MatchRatingBar({
  label,
  value,
  color,
}: { label: string; value: number; color: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-slate-400 w-28">{label}</span>
      <div className="flex-1 h-2 bg-[#1e3052] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${(value / 10) * 100}%`, backgroundColor: color }}
        />
      </div>
      <span className="text-xs font-bold w-8 text-right" style={{ color }}>{value}/10</span>
    </div>
  )
}

export default function Home() {
  const [matches, setMatches] = useState<MatchSummary[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [prediction, setPrediction] = useState<MatchPrediction | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isCached, setIsCached] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<Tab>('overview')
  const [loadingMatches, setLoadingMatches] = useState(true)

  useEffect(() => {
    fetch('/api/matches')
      .then(r => r.json())
      .then(d => setMatches(d.matches ?? []))
      .catch(() => setError('Failed to load fixtures'))
      .finally(() => setLoadingMatches(false))
  }, [])

  async function handleMatchSelect(id: string) {
    if (id === selectedId && prediction) return
    setSelectedId(id)
    setPrediction(null)
    setError(null)
    setIsLoading(true)
    setActiveTab('overview')

    try {
      const res = await fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ matchId: id }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Prediction failed')
      setPrediction(data.prediction)
      setIsCached(data.cached)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unknown error')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleRefresh() {
    if (!selectedId) return
    setPrediction(null)
    setError(null)
    setIsLoading(true)

    try {
      const res = await fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ matchId: selectedId, forceRefresh: true }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Prediction failed')
      setPrediction(data.prediction)
      setIsCached(false)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unknown error')
    } finally {
      setIsLoading(false)
    }
  }

  const selectedMatch = matches.find(m => m.id === selectedId)

  const TABS: { key: Tab; label: string }[] = [
    { key: 'overview', label: 'Match Overview' },
    { key: 'formations', label: 'Formations' },
    { key: 'home', label: `${selectedMatch?.homeTeam.shortName ?? 'Home'} Players` },
    { key: 'away', label: `${selectedMatch?.awayTeam.shortName ?? 'Away'} Players` },
  ]

  return (
    <div className="min-h-screen bg-[#070d1f]">
      {/* Header */}
      <header className="border-b border-[#1e3052] bg-[#0a0f1e]/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🏆</span>
            <div>
              <h1 className="font-black text-white text-lg leading-none">WC 2026 AI Predictor</h1>
              <p className="text-xs text-slate-500">Powered by Claude · Live Tournament Analysis</p>
            </div>
          </div>
          <CostBadge />
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6">
        {/* Sidebar: Match Selector */}
        <aside className="w-72 flex-shrink-0">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
            Fixtures
          </h2>

          {loadingMatches ? (
            <div className="space-y-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="rounded-xl h-32 skeleton" />
              ))}
            </div>
          ) : (
            <div className="space-y-3 overflow-y-auto max-h-[calc(100vh-8rem)] scrollbar-thin pr-1">
              {matches.map(m => (
                <MatchCard
                  key={m.id}
                  match={m}
                  selected={m.id === selectedId}
                  onSelect={() => handleMatchSelect(m.id)}
                />
              ))}
            </div>
          )}
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">
          {/* Empty state */}
          {!selectedId && !isLoading && (
            <div className="flex flex-col items-center justify-center h-96 text-center">
              <div className="text-6xl mb-4">⚽</div>
              <h2 className="text-2xl font-bold text-white mb-2">Select a Match</h2>
              <p className="text-slate-400 max-w-sm">
                Choose a fixture from the sidebar. The AI will analyse all 22 players and generate a detailed prediction.
              </p>
            </div>
          )}

          {/* Loading */}
          {isLoading && <LoadingSpinner />}

          {/* Error */}
          {error && !isLoading && (
            <div className="rounded-xl border border-red-800 bg-red-950/30 p-6 text-center">
              <div className="text-3xl mb-3">⚠️</div>
              <p className="text-red-400 font-medium">{error}</p>
              <button
                onClick={handleRefresh}
                className="mt-4 px-4 py-2 rounded-lg bg-red-900/50 text-red-300 text-sm hover:bg-red-900/80 transition-colors"
              >
                Retry
              </button>
            </div>
          )}

          {/* Prediction panel */}
          {prediction && selectedMatch && !isLoading && (
            <div className="space-y-6">
              {/* Match title + refresh */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">
                    {selectedMatch.homeTeam.name} vs {selectedMatch.awayTeam.name}
                  </h2>
                  <p className="text-sm text-slate-400">
                    {selectedMatch.stage}
                    {selectedMatch.venue !== 'TBD' && ` · ${selectedMatch.venue}`}
                    {selectedMatch.city && `, ${selectedMatch.city}`}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  {isCached && (
                    <span className="text-xs text-amber-400 bg-amber-900/30 px-2 py-1 rounded border border-amber-700">
                      Cached
                    </span>
                  )}
                  <span className="text-xs text-slate-500">
                    via {prediction.modelUsed.includes('claude') ? '🤖 Claude' : '⚡ Groq'}
                    {prediction.costUsd && ` · $${prediction.costUsd.toFixed(4)}`}
                  </span>
                  <button
                    onClick={handleRefresh}
                    className="text-xs px-3 py-1.5 rounded-lg border border-[#1e3052] text-slate-400
                               hover:border-emerald-700 hover:text-emerald-400 transition-colors"
                  >
                    ↻ Refresh
                  </button>
                </div>
              </div>

              {/* Overall match ratings */}
              <div className="rounded-xl border border-[#1e3052] bg-[#0f1a2e] p-5">
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
                  Match Rating
                </h3>
                <div className="space-y-3">
                  <MatchRatingBar label="Excitement" value={prediction.overallMatchRating.excitement} color="#f59e0b" />
                  <MatchRatingBar label="Competitiveness" value={prediction.overallMatchRating.competitiveness} color="#3b82f6" />
                  <MatchRatingBar label="Quality of Football" value={prediction.overallMatchRating.qualityOfFootball} color="#10b981" />
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b border-[#1e3052]">
                <div className="flex gap-1">
                  {TABS.map(t => (
                    <button
                      key={t.key}
                      onClick={() => setActiveTab(t.key)}
                      className={`px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors ${
                        activeTab === t.key
                          ? 'bg-[#0f1a2e] border border-b-[#0f1a2e] border-[#1e3052] text-white -mb-px'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab content */}
              <div className="space-y-6">
                {activeTab === 'overview' && (
                  <ScorelinePrediction
                    scoreline={prediction.scoreline}
                    homeTeam={selectedMatch.homeTeam}
                    awayTeam={selectedMatch.awayTeam}
                  />
                )}

                {activeTab === 'formations' && (
                  <div className="grid grid-cols-2 gap-6">
                    <FormationView
                      playerRatings={prediction.homePlayerRatings}
                      team={selectedMatch.homeTeam}
                    />
                    <FormationView
                      playerRatings={prediction.awayPlayerRatings}
                      team={selectedMatch.awayTeam}
                      flipped
                    />
                  </div>
                )}

                {activeTab === 'home' && (
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl">{selectedMatch.homeTeam.flag}</span>
                      <h3 className="font-bold text-white text-lg">{selectedMatch.homeTeam.name}</h3>
                      <span className="text-sm text-slate-400">
                        Avg: {(prediction.homePlayerRatings.reduce((s, r) => s + r.rating, 0) / prediction.homePlayerRatings.length).toFixed(1)}/10
                      </span>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                      {['GK', 'DEF', 'MID', 'FWD'].map(pos =>
                        prediction.homePlayerRatings
                          .filter(r => r.position === pos)
                          .map(r => <PlayerRatingCard key={r.playerId} rating={r} />)
                      )}
                    </div>
                  </div>
                )}

                {activeTab === 'away' && (
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl">{selectedMatch.awayTeam.flag}</span>
                      <h3 className="font-bold text-white text-lg">{selectedMatch.awayTeam.name}</h3>
                      <span className="text-sm text-slate-400">
                        Avg: {(prediction.awayPlayerRatings.reduce((s, r) => s + r.rating, 0) / prediction.awayPlayerRatings.length).toFixed(1)}/10
                      </span>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                      {['GK', 'DEF', 'MID', 'FWD'].map(pos =>
                        prediction.awayPlayerRatings
                          .filter(r => r.position === pos)
                          .map(r => <PlayerRatingCard key={r.playerId} rating={r} />)
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

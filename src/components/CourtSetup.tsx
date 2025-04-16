import { useState } from 'react'
import { CourtSetupProps, Player } from '../types'

export default function CourtSetup({
  numCourts,
  setNumCourts,
  players,
  currentRound,
  setCurrentRound,
  setMatches,
  onGenerateMatches
}: CourtSetupProps) {
  const [sittingOut, setSittingOut] = useState<Player[]>([])

  const activePlayers = players.filter(p => !sittingOut.includes(p))
  const maxPossibleCourts = Math.floor(activePlayers.length / 4)

  const handleCourtChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    setNumCourts(value)
  }

  const handleGenerateMatches = () => {
    if (activePlayers.length < 4) {
      alert('Need at least 4 active players to generate matches')
      return
    }

    const shuffledPlayers = [...activePlayers].sort(() => Math.random() - 0.5)
    const newMatches = []

    for (let i = 0; i < numCourts; i++) {
      const startIdx = i * 4
      if (startIdx + 4 > shuffledPlayers.length) break

      const team1 = shuffledPlayers.slice(startIdx, startIdx + 2)
      const team2 = shuffledPlayers.slice(startIdx + 2, startIdx + 4)

      newMatches.push({
        court: i + 1,
        team1,
        team2
      })
    }

    setMatches(newMatches)
    setCurrentRound(currentRound + 1)
    onGenerateMatches()
  }

  const toggleSittingOut = (player: Player) => {
    setSittingOut(prev =>
      prev.includes(player)
        ? prev.filter(p => p.id !== player.id)
        : [...prev, player]
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        Court Setup
      </h2>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Number of Courts
        </label>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="1"
              max={maxPossibleCourts}
              value={numCourts}
              onChange={(e) => {
                const value = Math.min(Math.max(1, parseInt(e.target.value) || 1), maxPossibleCourts);
                setNumCourts(value);
              }}
              className="w-20 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800"
            />
            <div className="flex flex-col gap-1">
              <button
                onClick={() => setNumCourts(Math.min(numCourts + 1, maxPossibleCourts))}
                className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                disabled={numCourts >= maxPossibleCourts}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </button>
              <button
                onClick={() => setNumCourts(Math.max(1, numCourts - 1))}
                className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                disabled={numCourts <= 1}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Maximum possible courts: {maxPossibleCourts}
        </p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Round {currentRound + 1}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Active Players: {activePlayers.length} | Required: {numCourts * 4}
        </p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Select Players Sitting Out (Round {currentRound + 1})
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Click on players to mark them as sitting out for this round
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {players.map(player => (
            <div
              key={player.id}
              onClick={() => toggleSittingOut(player)}
              className={`p-3 rounded-lg cursor-pointer transition-colors ${sittingOut.includes(player)
                ? 'bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100'
                : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
            >
              {player.name}
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleGenerateMatches}
        disabled={activePlayers.length < numCourts * 4}
        className={`btn btn-primary w-full ${activePlayers.length < numCourts * 4 ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        Generate New Round
      </button>

      {activePlayers.length < numCourts * 4 && (
        <p className="mt-2 text-sm text-red-500">
          Not enough active players for the selected number of courts
        </p>
      )}
    </div>
  )
} 
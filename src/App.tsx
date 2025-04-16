import { useState, useEffect } from 'react'
import PlayerManagement from './components/PlayerManagement'
import CourtSetup from './components/CourtSetup'
import MatchDisplay from './components/MatchDisplay'
import TabNavigation from './components/TabNavigation'
import { Player } from './types'

type Tab = 'players' | 'courts' | 'matches'

// Local storage keys
const STORAGE_KEYS = {
  PLAYERS: 'badromizer_players',
  COURTS: 'badromizer_courts',
  ROUND: 'badromizer_round',
  MATCHES: 'badromizer_matches',
  ACTIVE_TAB: 'badromizer_active_tab'
}

function App() {
  // Load initial state from localStorage
  const [players, setPlayers] = useState<Player[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PLAYERS)
    return saved ? JSON.parse(saved) : []
  })

  const [numCourts, setNumCourts] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.COURTS)
    return saved ? parseInt(saved) : 1
  })

  const [currentRound, setCurrentRound] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ROUND)
    return saved ? parseInt(saved) : 0
  })

  const [matches, setMatches] = useState<Array<{
    court: number
    team1: Player[]
    team2: Player[]
  }>>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.MATCHES)
    return saved ? JSON.parse(saved) : []
  })

  const [activeTab, setActiveTab] = useState<Tab>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ACTIVE_TAB)
    return (saved as Tab) || 'players'
  })

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PLAYERS, JSON.stringify(players))
  }, [players])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COURTS, numCourts.toString())
  }, [numCourts])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ROUND, currentRound.toString())
  }, [currentRound])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MATCHES, JSON.stringify(matches))
  }, [matches])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_TAB, activeTab)
  }, [activeTab])

  const generateNewRound = (fromTab: 'courts' | 'matches') => {
    const activePlayers = players.filter(p => !p.isSittingOut)
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
    setCurrentRound(prev => prev + 1)

    // Switch to matches tab if called from courts tab
    if (fromTab === 'courts') {
      setActiveTab('matches')
      // Scroll to top of the page
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // Update matches when players are removed
  useEffect(() => {
    if (matches.length > 0) {
      const updatedMatches = matches.filter(match => {
        const allPlayersExist = [...match.team1, ...match.team2].every(player =>
          players.some(p => p.id === player.id)
        )
        return allPlayersExist
      })

      if (updatedMatches.length !== matches.length) {
        setMatches(updatedMatches)
      }
    }
  }, [players, matches])

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all data? This will remove all players, matches, and reset the round counter.')) {
      setPlayers([])
      setNumCourts(1)
      setCurrentRound(0)
      setMatches([])
      setActiveTab('players')
      // Clear all local storage
      Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key))
    }
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'players':
        return (
          <div className="mb-20">
            <PlayerManagement
              players={players}
              setPlayers={setPlayers}
            />
          </div>
        )
      case 'courts':
        return (
          <div className="mb-20">
            <CourtSetup
              numCourts={numCourts}
              setNumCourts={setNumCourts}
              players={players}
              currentRound={currentRound}
              setCurrentRound={setCurrentRound}
              matches={matches}
              setMatches={setMatches}
              onGenerateMatches={() => generateNewRound('courts')}
            />
          </div>
        )
      case 'matches':
        return (
          <div className="mb-20">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Current Round: {currentRound}
              </h2>
              <button
                onClick={() => generateNewRound('matches')}
                className="btn btn-primary bg-blue-500 hover:bg-blue-600 text-white"
                disabled={players.length < 4}
              >
                Generate New Round
              </button>
            </div>
            <MatchDisplay matches={matches} />
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Badromizer
          </h1>
          {(players.length > 0 || matches.length > 0) && (
            <button
              onClick={handleReset}
              className="btn btn-secondary bg-red-500 hover:bg-red-600 text-white"
            >
              Reset All
            </button>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {renderActiveTab()}
      </main>

      <TabNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        hasMatches={matches.length > 0}
      />
    </div>
  )
}

export default App

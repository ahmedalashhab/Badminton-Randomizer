import { useState } from 'react'
import { Player, PlayerManagementProps } from '../types'

export default function PlayerManagement({ players, setPlayers }: PlayerManagementProps) {
  const [newPlayerName, setNewPlayerName] = useState('')

  const addPlayer = () => {
    if (newPlayerName.trim()) {
      const newPlayer: Player = {
        id: crypto.randomUUID(),
        name: newPlayerName.trim(),
        isSittingOut: false,
        matchesPlayed: 0,
        partners: []
      }
      setPlayers([...players, newPlayer])
      setNewPlayerName('')
    }
  }

  const toggleSittingOut = (playerId: string) => {
    setPlayers(players.map(player =>
      player.id === playerId
        ? { ...player, isSittingOut: !player.isSittingOut }
        : player
    ))
  }

  const removePlayer = (playerId: string) => {
    setPlayers(players.filter(player => player.id !== playerId))
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        Player Management
      </h2>

      <div className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newPlayerName}
            onChange={(e) => setNewPlayerName(e.target.value)}
            placeholder="Enter player name"
            className="input"
            onKeyDown={(e) => e.key === 'Enter' && addPlayer()}
          />
          <button
            onClick={addPlayer}
            className="btn btn-primary whitespace-nowrap"
          >
            Add Player
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {players.map(player => (
          <div
            key={player.id}
            className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded-lg"
          >
            <span className={`${player.isSittingOut ? 'text-gray-400 dark:text-gray-500' : 'text-gray-900 dark:text-white'}`}>
              {player.name}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => toggleSittingOut(player.id)}
                className={`btn btn-secondary text-sm ${player.isSittingOut ? 'bg-green-500 hover:bg-green-600' : ''
                  }`}
              >
                {player.isSittingOut ? 'Playing' : 'Sit Out'}
              </button>
              <button
                onClick={() => removePlayer(player.id)}
                className="btn btn-secondary text-sm bg-red-500 hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        Total Players: {players.length} | Active: {players.filter(p => !p.isSittingOut).length}
      </div>
    </div>
  )
} 
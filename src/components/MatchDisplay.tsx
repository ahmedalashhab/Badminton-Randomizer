import { MatchDisplayProps } from '../types'

export default function MatchDisplay({ matches }: MatchDisplayProps) {
  if (matches.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 dark:text-gray-400">
          No matches generated yet. Go to the Courts tab to generate matches.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {matches.map(match => (
        <div
          key={match.court}
          className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
        >
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            Court {match.court}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Team 1
              </h4>
              {match.team1.map(player => (
                <div
                  key={player.id}
                  className="p-2 bg-gray-50 dark:bg-gray-700 rounded"
                >
                  {player.name}
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Team 2
              </h4>
              {match.team2.map(player => (
                <div
                  key={player.id}
                  className="p-2 bg-gray-50 dark:bg-gray-700 rounded"
                >
                  {player.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
} 
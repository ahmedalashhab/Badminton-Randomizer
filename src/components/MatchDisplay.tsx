import { MatchDisplayProps } from '../types'

export default function MatchDisplay({ matches }: MatchDisplayProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        Current Round Matches
      </h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {matches.map(match => (
          <div
            key={match.court}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
          >
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Court {match.court}
            </h3>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  Team 1
                </h4>
                <div className="space-y-1">
                  {match.team1.map(player => (
                    <div
                      key={player.id}
                      className="bg-gray-50 dark:bg-gray-700 rounded px-3 py-2 text-gray-900 dark:text-white"
                    >
                      {player.name}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  Team 2
                </h4>
                <div className="space-y-1">
                  {match.team2.map(player => (
                    <div
                      key={player.id}
                      className="bg-gray-50 dark:bg-gray-700 rounded px-3 py-2 text-gray-900 dark:text-white"
                    >
                      {player.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 
import { Tab } from '../types'

interface TabNavigationProps {
  activeTab: Tab
  onTabChange: (tab: Tab) => void
  hasMatches: boolean
}

export default function TabNavigation({ activeTab, onTabChange, hasMatches }: TabNavigationProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-around">
          <button
            onClick={() => onTabChange('players')}
            className={`flex flex-col items-center py-2 px-4 ${activeTab === 'players'
              ? 'text-blue-500 dark:text-blue-400'
              : 'text-gray-500 dark:text-gray-400'
              }`}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span className="text-xs mt-1">Players</span>
          </button>

          <button
            onClick={() => onTabChange('courts')}
            className={`flex flex-col items-center py-2 px-4 ${activeTab === 'courts'
              ? 'text-blue-500 dark:text-blue-400'
              : 'text-gray-500 dark:text-gray-400'
              }`}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            <span className="text-xs mt-1">Courts</span>
          </button>

          <button
            onClick={() => onTabChange('matches')}
            disabled={!hasMatches}
            className={`flex flex-col items-center py-2 px-4 ${activeTab === 'matches'
              ? 'text-blue-500 dark:text-blue-400'
              : 'text-gray-500 dark:text-gray-400'
              } ${!hasMatches ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <span className="text-xs mt-1">Matches</span>
          </button>
        </div>
      </div>
    </nav>
  )
} 
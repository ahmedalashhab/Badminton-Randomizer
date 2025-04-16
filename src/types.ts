export interface Player {
  id: string
  name: string
  isSittingOut: boolean
  matchesPlayed: number
  partners: string[] // Array of player IDs
}

export interface Match {
  court: number
  team1: Player[]
  team2: Player[]
}

export interface CourtSetupProps {
  numCourts: number
  setNumCourts: (num: number) => void
  players: Player[]
  currentRound: number
  setCurrentRound: (round: number) => void
  matches: Match[]
  setMatches: (matches: Match[]) => void
}

export interface PlayerManagementProps {
  players: Player[]
  setPlayers: (players: Player[]) => void
}

export interface MatchDisplayProps {
  matches: Match[]
} 
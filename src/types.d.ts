export interface Player {
  id: string;
  name: string;
  isSittingOut?: boolean;
  matchesPlayed: number;
  partners: string[];
}

export interface Match {
  id: string;
  court: number;
  round: number;
  players: Player[];
}

export type Tab = 'players' | 'courts' | 'matches'; 
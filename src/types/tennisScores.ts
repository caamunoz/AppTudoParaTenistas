export type MatchStatus = 'Terminado' | 'Ao Vivo' | 'Agendado' | 'Intervalo';

export interface SetScore {
  p1: number;
  p2: number;
  tiebreak?: string;
}

export interface Player {
  name: string;
  country: string;
  flagUrl: string;
  ranking?: number;
  seed?: number;
  partnerName?: string; // para duplas
  partnerCountry?: string;
  partnerFlagUrl?: string;
}

export interface MatchStats {
  aces: [number, number];
  doubleFaults: [number, number];
  firstServePercentage: [number, number];
  firstServeWonPercentage: [number, number];
  breakPointsWon: [string, string];
  totalPointsWon: [number, number];
  maxSpeedKmh?: [number, number];
}

export interface TennisMatch {
  id: string;
  tournamentId: string;
  time: string;
  date: string;
  status: MatchStatus;
  statusDetail?: string; // ex: "2º Set - 4:3 (40-15)"
  isLive: boolean;
  court: string;
  round: string;
  surface: 'Dura' | 'Saibro' | 'Grama';
  isDoubles?: boolean;
  player1: Player;
  player2: Player;
  scoreSets: [number, number]; // ex: [2, 0]
  sets: SetScore[]; // ex: [{p1: 6, p2: 4}, {p1: 7, p2: 6, tiebreak: '7-3'}]
  currentGame?: {
    servingPlayer: 1 | 2;
    p1Points: string; // '0', '15', '30', '40', 'AD'
    p2Points: string;
  };
  stats?: MatchStats;
  h2h?: {
    p1Wins: number;
    p2Wins: number;
    lastMatches: string[];
  };
}

export interface TournamentGroup {
  id: string;
  name: string;
  category: 'ATP' | 'WTA' | 'Grand Slam' | 'Challenger' | 'Finals';
  country: string;
  flagUrl: string;
  isDoubles?: boolean;
  matches: TennisMatch[];
}

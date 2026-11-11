export type MatchFormat = 'best_of_3' | 'best_of_5' | 'single_pro_set' | 'short_sets';

export interface SetScore {
  p1Games: number;
  p2Games: number;
  p1TiebreakPoints?: number;
  p2TiebreakPoints?: number;
  winner?: 1 | 2;
  isCompleted: boolean;
}

export type GamePoint = '0' | '15' | '30' | '40' | 'AD';

export interface PlayerStats {
  aces: number;
  firstServesIn: number;
  totalFirstServes: number;
  doubleFaults: number;
  firstServePointsWon: number;
  firstServePointsPlayed: number;
  secondServePointsWon: number;
  secondServePointsPlayed: number;
  totalPointsWon: number;
  receivingPointsWon: number;
  receivingPointsPlayed: number;
  winners: number;
  forcedErrors: number;
  unforcedErrors: number;
  breakPointsOpportunities: number;
  breakPointsConverted: number;
}

export interface SetStats {
  setNumber: number;
  p1: PlayerStats;
  p2: PlayerStats;
}

export interface PointHistoryAction {
  playerNumber: 1 | 2;
  actionType: 'point' | 'ace' | 'fault' | 'double_fault' | 'winner' | 'forced_error' | 'unforced_error';
  p1Points: GamePoint | number;
  p2Points: GamePoint | number;
  isTiebreak: boolean;
  sets: SetScore[];
  currentSetIndex: number;
  server: 1 | 2;
  breakPointStatus?: string;
}

export interface ScoreboardMatch {
  id: string;
  player1Name: string;
  player2Name: string;
  date: string;
  time: string;
  durationSeconds: number;
  format: MatchFormat;
  advancedStatsEnabled: boolean;
  hasAd: boolean; // false = No-Ad
  server: 1 | 2;
  firstServer: 1 | 2;
  currentSetIndex: number;
  sets: SetScore[];
  p1CurrentPoints: GamePoint | number; // number if tiebreak
  p2CurrentPoints: GamePoint | number;
  isTiebreak: boolean;
  status: 'in_progress' | 'finished' | 'retired';
  winner?: 1 | 2;
  retiredPlayer?: 1 | 2;
  stats: {
    match: { p1: PlayerStats; p2: PlayerStats };
    bySet: SetStats[];
  };
  changeoverAlert?: boolean;
  breakPointBanner?: string;
}

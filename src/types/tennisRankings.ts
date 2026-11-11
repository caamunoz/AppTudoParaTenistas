export interface RankingLadderPlayer {
  id: string;
  position: number;
  name: string;
  photoUrl: string;
  daysWithoutPlaying: number;
  points: number;
  games: number;
  wins: number;
  losses: number;
  isCurrentUser?: boolean;
  level?: string;
}

export interface RankingRules {
  login: string;
  password: string;
  maxSets: number;
  periodicity: string;
  maxChallenges: number;
  challengeAbove: number;
  challengeBelow: number;
  pointsWinner: number;
  pointsLoser: number;
  pointsWOLoss: number;
  registeredCount: number;
}

export interface RankingCompetition {
  id: string;
  name: string;
  clubPhotoUrl: string;
  currentUserPosition: number;
  totalGames: number;
  wins: number;
  losses: number;
  points: number;
  players: RankingLadderPlayer[];
  rules: RankingRules;
}

export interface EnrolledTournament {
  id: string;
  name: string;
  photoUrl: string;
  admin: string;
  date: string;
  location: string;
  obsPrice: string;
  registeredCount: number;
  status: 'disputando' | 'inscrito' | 'finalizado';
  bracketReady: boolean;
}

export interface BracketPlayer {
  name: string;
  photoUrl?: string;
  score?: number;
  isWinner?: boolean;
  isChampion?: boolean;
}

export interface BracketMatch {
  id: number;
  round: 'r16' | 'quarters' | 'semis' | 'final';
  roundLabel: string;
  player1: BracketPlayer;
  player2: BracketPlayer;
  status: 'finished' | 'playing' | 'pending';
}

export interface RankingChallenge {
  id: number;
  rankingId: string;
  rankingName: string;
  player1: {
    name: string;
    photoUrl: string;
    position: number;
    points: number;
    score?: number;
    isCurrentUser: boolean;
  };
  player2: {
    name: string;
    photoUrl: string;
    position: number;
    points: number;
    score?: number;
    isCurrentUser: boolean;
  };
  status: 'pending' | 'finished';
  winner?: string;
}

export interface H2HPlayerComparison {
  player1Name: string;
  player1Photo: string;
  player2Name: string;
  player2Photo: string;
  totalMatches: number;
  player1Wins: number;
  player2Wins: number;
  player1SetsWon: number;
  player2SetsWon: number;
  player1GamesWon: number;
  player2GamesWon: number;
  recentEncounters: {
    date: string;
    tournament: string;
    score: string;
    winner: string;
  }[];
}

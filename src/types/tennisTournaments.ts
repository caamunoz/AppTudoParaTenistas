export type TournamentStatus = 'open' | 'closing_soon' | 'in_progress' | 'finished';

export interface TournamentCategory {
  name: string;
  gender: 'Masculino' | 'Feminino' | 'Misto';
  level: 'Especial' | 'A' | 'B' | 'C' | 'Iniciante' | 'Master 40+' | 'Master 50+';
  entryFee: number;
  championPrize: string;
  runnerUpPrize: string;
}

export interface TennisTournament {
  id: string;
  name: string;
  edition?: string;
  logoUrl: string;
  bannerUrl: string;
  city: string;
  state: string;
  venueName: string;
  venueAddress: string;
  venueCep: string;
  startDate: string; // Ex: '12/11/2026'
  endDate: string; // Ex: '15/11/2026'
  dateDisplay: string; // Ex: '12 a 15 de Novembro'
  registrationDeadline: string; // Ex: '10/11/2026'
  registrationDeadlineDisplay: string; // Ex: 'Até 10 de Novembro'
  status: TournamentStatus;
  gameTimesInfo: string; // Ex: 'Jogos dias 12 e 13 após 17h. Dias 14 e 15 das 8h às 22h'
  categoriesSummary: string; // Ex: 'Especial, A, B, C e Iniciante'
  categories: TournamentCategory[];
  totalPrizeDisplay: string; // Ex: 'R$ 7.500 em Prêmios + Troféus'
  regulationsText: string;
  organizerName: string;
  organizerPhone: string;
  organizerWhatsapp: string;
  organizerEmail: string;
  minPlayersPerCategory?: number;
  rulesNotes?: string;
}

export interface TournamentRegistrationFormData {
  tournamentId: string;
  playerName: string;
  playerCpf?: string;
  playerWhatsapp: string;
  playerEmail: string;
  categoryName: string;
  tshirtSize: 'P' | 'M' | 'G' | 'GG';
  clubOrCity: string;
}

export interface NewTournamentSuggestionData {
  name: string;
  city: string;
  state: string;
  venueName: string;
  venueAddress: string;
  startDate: string;
  endDate: string;
  registrationDeadline: string;
  categories: string;
  entryFee: string;
  prizes: string;
  organizerName: string;
  organizerWhatsapp: string;
  additionalNotes?: string;
}

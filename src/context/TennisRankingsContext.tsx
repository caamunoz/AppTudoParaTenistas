import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  RankingCompetition,
  EnrolledTournament,
  RankingChallenge,
  BracketMatch,
  H2HPlayerComparison,
  RankingLadderPlayer,
} from '../types/tennisRankings';
import {
  INITIAL_RANKING_COMPETITION,
  INITIAL_ENROLLED_TOURNAMENTS,
  INITIAL_CHALLENGES,
  INITIAL_BRACKET_MATCHES,
  MOCK_H2H_COMPARISON,
} from '../data/mockTennisRankings';

interface TennisRankingsContextType {
  ranking: RankingCompetition;
  tournaments: EnrolledTournament[];
  challenges: RankingChallenge[];
  bracketMatches: BracketMatch[];
  h2h: H2HPlayerComparison;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  enrollInTournament: (tournament: {
    id: string;
    name: string;
    date: string;
    location: string;
    photoUrl: string;
    admin?: string;
    obsPrice?: string;
  }) => void;
  createChallenge: (opponent: RankingLadderPlayer) => void;
  confirmChallengeResult: (challengeId: number, scoreP1: number, scoreP2: number) => void;
  joinCompetitionWithCredentials: (login: string, pass: string) => { success: boolean; message: string };
  sendDirectMessage: (recipient: string, text: string) => void;
}

const TennisRankingsContext = createContext<TennisRankingsContextType | undefined>(undefined);

export const TennisRankingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ranking, setRanking] = useState<RankingCompetition>(() => {
    const saved = localStorage.getItem('tpt_ranking_competition');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_RANKING_COMPETITION;
  });

  const [tournaments, setTournaments] = useState<EnrolledTournament[]>(() => {
    const saved = localStorage.getItem('tpt_enrolled_tournaments');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_ENROLLED_TOURNAMENTS;
  });

  const [challenges, setChallenges] = useState<RankingChallenge[]>(() => {
    const saved = localStorage.getItem('tpt_ranking_challenges');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_CHALLENGES;
  });

  const [bracketMatches] = useState<BracketMatch[]>(INITIAL_BRACKET_MATCHES);
  const [h2h] = useState<H2HPlayerComparison>(MOCK_H2H_COMPARISON);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('tpt_ranking_competition', JSON.stringify(ranking));
  }, [ranking]);

  useEffect(() => {
    localStorage.setItem('tpt_enrolled_tournaments', JSON.stringify(tournaments));
  }, [tournaments]);

  useEffect(() => {
    localStorage.setItem('tpt_ranking_challenges', JSON.stringify(challenges));
  }, [challenges]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4500);
  };

  const enrollInTournament = (t: {
    id: string;
    name: string;
    date: string;
    location: string;
    photoUrl: string;
    admin?: string;
    obsPrice?: string;
  }) => {
    setTournaments((prev) => {
      if (prev.some((item) => item.id === t.id || item.name === t.name)) {
        return prev;
      }
      const newEntry: EnrolledTournament = {
        id: t.id,
        name: t.name,
        photoUrl: t.photoUrl || 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=600&q=80',
        admin: t.admin || 'Organização do Torneio',
        date: t.date,
        location: t.location,
        obsPrice: t.obsPrice || 'inscrição confirmada',
        registeredCount: 32,
        status: 'disputando',
        bracketReady: true,
      };
      return [newEntry, ...prev];
    });
    showToast(`Inscrição aprovada! O torneio "${t.name}" já está em andamento.`);
  };

  const createChallenge = (opponent: RankingLadderPlayer) => {
    const newChallenge: RankingChallenge = {
      id: Math.floor(250 + Math.random() * 500),
      rankingId: ranking.id,
      rankingName: ranking.name,
      player1: {
        name: 'Carlos Silva (Você)',
        photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
        position: ranking.currentUserPosition,
        points: ranking.points,
        score: undefined,
        isCurrentUser: true,
      },
      player2: {
        name: opponent.name,
        photoUrl: opponent.photoUrl,
        position: opponent.position,
        points: opponent.points,
        score: undefined,
        isCurrentUser: false,
      },
      status: 'pending',
    };

    setChallenges((prev) => [newChallenge, ...prev]);
    showToast(`Desafio criado contra ${opponent.name}! Notificação enviada.`);
  };

  const confirmChallengeResult = (challengeId: number, scoreP1: number, scoreP2: number) => {
    setChallenges((prev) =>
      prev.map((ch) => {
        if (ch.id === challengeId) {
          const winner = scoreP1 > scoreP2 ? ch.player1.name : ch.player2.name;
          return {
            ...ch,
            player1: { ...ch.player1, score: scoreP1 },
            player2: { ...ch.player2, score: scoreP2 },
            status: 'finished',
            winner,
          };
        }
        return ch;
      })
    );

    // Atualiza pontuação do ranking
    const p1Won = scoreP1 > scoreP2;
    const gainedPoints = p1Won ? ranking.rules.pointsWinner : ranking.rules.pointsLoser;

    setRanking((prev) => {
      const newPoints = prev.points + gainedPoints;
      const newWins = p1Won ? prev.wins + 1 : prev.wins;
      const newLosses = p1Won ? prev.losses : prev.losses + 1;
      const newGames = prev.totalGames + 1;
      // Recalcula posição
      const newPosition = p1Won && prev.currentUserPosition > 1 ? prev.currentUserPosition - 1 : prev.currentUserPosition;

      const updatedPlayers = prev.players.map((p) => {
        if (p.isCurrentUser) {
          return {
            ...p,
            points: newPoints,
            wins: newWins,
            losses: newLosses,
            games: newGames,
            position: newPosition,
          };
        }
        return p;
      });

      return {
        ...prev,
        currentUserPosition: newPosition,
        points: newPoints,
        wins: newWins,
        losses: newLosses,
        totalGames: newGames,
        players: updatedPlayers,
      };
    });

    showToast(`Resultado confirmado: ${scoreP1} x ${scoreP2}! +${gainedPoints} pontos computados no ranking.`);
  };

  const joinCompetitionWithCredentials = (login: string, pass: string) => {
    const cleanLogin = login.trim().toLowerCase();
    const cleanPass = pass.trim();

    if (
      (cleanLogin === 'parceiros' && cleanPass === '1234') ||
      (cleanLogin === 'amigos' && cleanPass === '1234')
    ) {
      showToast('Acesso autorizado! Você foi inserido com sucesso.');
      return { success: true, message: 'Sucesso ao ingressar no Ranking/Torneio!' };
    }

    // Se inseriu qualquer outro dado, aceita com boas-vindas demo
    if (cleanLogin.length >= 3 && cleanPass.length >= 3) {
      showToast(`Bem-vindo ao ranking/torneio "${cleanLogin}"!`);
      return { success: true, message: 'Ingresso confirmado!' };
    }

    return {
      success: false,
      message: 'Login ou senha inválidos. Dica: login "parceiros" e senha "1234".',
    };
  };

  const sendDirectMessage = (recipient: string, text: string) => {
    showToast(`Mensagem enviada com sucesso para ${recipient}: "${text}"`);
  };

  return (
    <TennisRankingsContext.Provider
      value={{
        ranking,
        tournaments,
        challenges,
        bracketMatches,
        h2h,
        toastMessage,
        showToast,
        enrollInTournament,
        createChallenge,
        confirmChallengeResult,
        joinCompetitionWithCredentials,
        sendDirectMessage,
      }}
    >
      {children}
    </TennisRankingsContext.Provider>
  );
};

export const useTennisRankings = () => {
  const context = useContext(TennisRankingsContext);
  if (!context) {
    throw new Error('useTennisRankings must be used within a TennisRankingsProvider');
  }
  return context;
};

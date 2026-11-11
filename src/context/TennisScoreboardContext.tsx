import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import {
  ScoreboardMatch,
  MatchFormat,
  GamePoint,
  SetScore,
  PlayerStats,
} from '../types/tennisScoreboard';
import { INITIAL_SAVED_MATCHES, DEFAULT_ACTIVE_MATCH } from '../data/mockScoreboardMatches';

interface TennisScoreboardContextType {
  savedMatches: ScoreboardMatch[];
  activeMatch: ScoreboardMatch;
  undoStackLength: number;
  redoStackLength: number;
  isTimerRunning: boolean;
  changeoverModalOpen: boolean;
  setChangeoverModalOpen: (open: boolean) => void;
  startNewMatch: (config: {
    player1Name: string;
    player2Name: string;
    format: MatchFormat;
    firstServer: 1 | 2;
    advancedStatsEnabled: boolean;
    hasAd: boolean;
  }) => void;
  recordPoint: (
    player: 1 | 2,
    actionType?: 'point' | 'ace' | 'fault' | 'winner' | 'forced_error' | 'unforced_error'
  ) => void;
  undo: () => void;
  redo: () => void;
  toggleTimer: () => void;
  resetTimer: () => void;
  manualChangeover: () => void;
  updatePlayerNames: (p1Name: string, p2Name: string) => void;
  retirePlayer: (player: 1 | 2) => void;
  finishAndSaveMatch: () => void;
  deleteMatch: (matchId: string) => void;
  clearAllSavedMatches: () => void;
  loadMatchForScoring: (match: ScoreboardMatch) => void;
  formatDuration: (seconds: number) => string;
  getWhatsAppShareText: (match: ScoreboardMatch) => string;
}

const TennisScoreboardContext = createContext<TennisScoreboardContextType | undefined>(undefined);

export const TennisScoreboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [savedMatches, setSavedMatches] = useState<ScoreboardMatch[]>(() => {
    const stored = localStorage.getItem('tpt_saved_matches_v2');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_SAVED_MATCHES;
  });

  const [activeMatch, setActiveMatch] = useState<ScoreboardMatch>(() => {
    const stored = localStorage.getItem('tpt_active_match_v2');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error(e);
      }
    }
    return DEFAULT_ACTIVE_MATCH;
  });

  const [undoStack, setUndoStack] = useState<ScoreboardMatch[]>([]);
  const [redoStack, setRedoStack] = useState<ScoreboardMatch[]>([]);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);
  const [changeoverModalOpen, setChangeoverModalOpen] = useState<boolean>(false);
  const secondFaultPendingRef = useRef<boolean>(false);

  // Persistência no LocalStorage
  useEffect(() => {
    localStorage.setItem('tpt_saved_matches_v2', JSON.stringify(savedMatches));
  }, [savedMatches]);

  useEffect(() => {
    localStorage.setItem('tpt_active_match_v2', JSON.stringify(activeMatch));
  }, [activeMatch]);

  // Cronômetro da partida ao vivo
  useEffect(() => {
    if (!isTimerRunning || activeMatch.status !== 'in_progress') return;

    const interval = setInterval(() => {
      setActiveMatch((prev) => ({
        ...prev,
        durationSeconds: prev.durationSeconds + 1,
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimerRunning, activeMatch.status]);

  const formatDuration = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    if (hours > 0) {
      return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const pushSnapshot = (matchToSave: ScoreboardMatch) => {
    setUndoStack((prev) => [...prev.slice(-25), JSON.parse(JSON.stringify(matchToSave))]);
    setRedoStack([]); // limpa redo após nova ação
  };

  const toggleTimer = () => {
    setIsTimerRunning((prev) => !prev);
  };

  const resetTimer = () => {
    setActiveMatch((prev) => ({ ...prev, durationSeconds: 0 }));
  };

  const manualChangeover = () => {
    setChangeoverModalOpen(true);
  };

  // Iniciar nova partida
  const startNewMatch = (config: {
    player1Name: string;
    player2Name: string;
    format: MatchFormat;
    firstServer: 1 | 2;
    advancedStatsEnabled: boolean;
    hasAd: boolean;
  }) => {
    const now = new Date();
    const dateStr = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()}`;
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    const newMatch: ScoreboardMatch = {
      id: `match-${Date.now()}`,
      player1Name: config.player1Name.trim() || 'Jogador 1',
      player2Name: config.player2Name.trim() || 'Jogador 2',
      date: dateStr,
      time: timeStr,
      durationSeconds: 0,
      format: config.format,
      advancedStatsEnabled: config.advancedStatsEnabled,
      hasAd: config.hasAd,
      server: config.firstServer,
      firstServer: config.firstServer,
      currentSetIndex: 0,
      sets: [{ p1Games: 0, p2Games: 0, isCompleted: false }],
      p1CurrentPoints: '0',
      p2CurrentPoints: '0',
      isTiebreak: false,
      status: 'in_progress',
      stats: {
        match: {
          p1: {
            aces: 0,
            firstServesIn: 0,
            totalFirstServes: 0,
            doubleFaults: 0,
            firstServePointsWon: 0,
            firstServePointsPlayed: 0,
            secondServePointsWon: 0,
            secondServePointsPlayed: 0,
            totalPointsWon: 0,
            receivingPointsWon: 0,
            receivingPointsPlayed: 0,
            winners: 0,
            forcedErrors: 0,
            unforcedErrors: 0,
            breakPointsOpportunities: 0,
            breakPointsConverted: 0,
          },
          p2: {
            aces: 0,
            firstServesIn: 0,
            totalFirstServes: 0,
            doubleFaults: 0,
            firstServePointsWon: 0,
            firstServePointsPlayed: 0,
            secondServePointsWon: 0,
            secondServePointsPlayed: 0,
            totalPointsWon: 0,
            receivingPointsWon: 0,
            receivingPointsPlayed: 0,
            winners: 0,
            forcedErrors: 0,
            unforcedErrors: 0,
            breakPointsOpportunities: 0,
            breakPointsConverted: 0,
          },
        },
        bySet: [],
      },
    };

    setUndoStack([]);
    setRedoStack([]);
    secondFaultPendingRef.current = false;
    setActiveMatch(newMatch);
    setIsTimerRunning(true);
  };

  // Motor Oficial de Pontuação de Tênis (Games, Sets, Tiebreak, Troca de lados)
  const recordPoint = (
    winningPlayer: 1 | 2,
    actionType: 'point' | 'ace' | 'fault' | 'winner' | 'forced_error' | 'unforced_error' = 'point'
  ) => {
    if (activeMatch.status !== 'in_progress') return;

    // Trata Falta (1º e 2º saque)
    if (actionType === 'fault') {
      if (!secondFaultPendingRef.current) {
        // Primeiro saque fora
        secondFaultPendingRef.current = true;
        // Não pontua ainda, apenas registra primeiro saque falho
        return;
      } else {
        // Dupla Falta! O adversário do sacador ganha o ponto
        secondFaultPendingRef.current = false;
        const opponent: 1 | 2 = activeMatch.server === 1 ? 2 : 1;
        executePointAward(opponent, 'double_fault');
        return;
      }
    }

    secondFaultPendingRef.current = false;
    executePointAward(winningPlayer, actionType);
  };

  const executePointAward = (
    winningPlayer: 1 | 2,
    actionType: 'point' | 'ace' | 'double_fault' | 'winner' | 'forced_error' | 'unforced_error'
  ) => {
    pushSnapshot(activeMatch);

    const match: ScoreboardMatch = JSON.parse(JSON.stringify(activeMatch));
    const losingPlayer: 1 | 2 = winningPlayer === 1 ? 2 : 1;

    // Atualiza estatísticas detalhadas
    updateMatchStats(match, winningPlayer, losingPlayer, actionType);

    if (match.isTiebreak) {
      // PONTUAÇÃO NO TIEBREAK (1, 2, 3...)
      const p1Pts = (typeof match.p1CurrentPoints === 'number' ? match.p1CurrentPoints : 0) + (winningPlayer === 1 ? 1 : 0);
      const p2Pts = (typeof match.p2CurrentPoints === 'number' ? match.p2CurrentPoints : 0) + (winningPlayer === 2 ? 1 : 0);

      match.p1CurrentPoints = p1Pts;
      match.p2CurrentPoints = p2Pts;

      const totalTiebreakPoints = p1Pts + p2Pts;

      // Troca de lados no tiebreak a cada 6 pontos
      if (totalTiebreakPoints % 6 === 0) {
        setChangeoverModalOpen(true);
      }

      // Rotação de saque no tiebreak: 1º ponto saca A, depois a cada 2 pontos alterna
      const cycle = Math.floor((totalTiebreakPoints - 1) / 2);
      if (totalTiebreakPoints % 2 === 1) {
        match.server = match.server === 1 ? 2 : 1;
      }

      // Verifica vitória no Tiebreak (mínimo 7 pontos com 2 de vantagem)
      const targetPts = 7;
      if (
        (p1Pts >= targetPts && p1Pts - p2Pts >= 2) ||
        (p2Pts >= targetPts && p2Pts - p1Pts >= 2)
      ) {
        const setWinner: 1 | 2 = p1Pts > p2Pts ? 1 : 2;
        finishSetWithTiebreak(match, setWinner, p1Pts, p2Pts);
      }
    } else {
      // PONTUAÇÃO REGULAR DE GAME (0 -> 15 -> 30 -> 40 -> AD / VENCE)
      const p1 = match.p1CurrentPoints as GamePoint;
      const p2 = match.p2CurrentPoints as GamePoint;

      let nextP1: GamePoint = p1;
      let nextP2: GamePoint = p2;
      let gameWonBy: 1 | 2 | null = null;

      if (winningPlayer === 1) {
        if (p1 === '0') nextP1 = '15';
        else if (p1 === '15') nextP1 = '30';
        else if (p1 === '30') nextP1 = '40';
        else if (p1 === '40') {
          if (p2 === '40') {
            if (match.hasAd) {
              nextP1 = 'AD';
            } else {
              gameWonBy = 1; // No-Ad ponto decisivo!
            }
          } else if (p2 === 'AD') {
            nextP2 = '40'; // Volta para iguais
          } else {
            gameWonBy = 1;
          }
        } else if (p1 === 'AD') {
          gameWonBy = 1;
        }
      } else {
        // Player 2 venceu o ponto
        if (p2 === '0') nextP2 = '15';
        else if (p2 === '15') nextP2 = '30';
        else if (p2 === '30') nextP2 = '40';
        else if (p2 === '40') {
          if (p1 === '40') {
            if (match.hasAd) {
              nextP2 = 'AD';
            } else {
              gameWonBy = 2; // No-Ad ponto decisivo!
            }
          } else if (p1 === 'AD') {
            nextP1 = '40'; // Volta para iguais
          } else {
            gameWonBy = 2;
          }
        } else if (p2 === 'AD') {
          gameWonBy = 2;
        }
      }

      if (gameWonBy) {
        // Game vencido!
        awardGame(match, gameWonBy);
      } else {
        match.p1CurrentPoints = nextP1;
        match.p2CurrentPoints = nextP2;

        // Atualiza banner de Break Point se aplicável
        updateBreakPointBanner(match, nextP1, nextP2);
      }
    }

    setActiveMatch(match);
  };

  const updateBreakPointBanner = (match: ScoreboardMatch, p1: GamePoint, p2: GamePoint) => {
    match.breakPointBanner = undefined;
    const server = match.server;
    const receiver = server === 1 ? 2 : 1;

    if (receiver === 1) {
      if (p1 === '40' && (p2 === '0' || p2 === '15' || p2 === '30')) {
        const breakPts = p2 === '0' ? 3 : p2 === '15' ? 2 : 1;
        match.breakPointBanner = `${breakPts} Break Point${breakPts > 1 ? 's' : ''}`;
      } else if (p1 === 'AD') {
        match.breakPointBanner = 'Break Point';
      }
    } else {
      if (p2 === '40' && (p1 === '0' || p1 === '15' || p1 === '30')) {
        const breakPts = p1 === '0' ? 3 : p1 === '15' ? 2 : 1;
        match.breakPointBanner = `${breakPts} Break Point${breakPts > 1 ? 's' : ''}`;
      } else if (p2 === 'AD') {
        match.breakPointBanner = 'Break Point';
      }
    }
  };

  const awardGame = (match: ScoreboardMatch, gameWinner: 1 | 2) => {
    match.p1CurrentPoints = '0';
    match.p2CurrentPoints = '0';
    match.breakPointBanner = undefined;

    const currentSet = match.sets[match.currentSetIndex];
    if (gameWinner === 1) currentSet.p1Games += 1;
    else currentSet.p2Games += 1;

    // Alterna sacador do game
    match.server = match.server === 1 ? 2 : 1;

    const totalGames = currentSet.p1Games + currentSet.p2Games;

    // Notificação de troca de lado nos games ímpares (1, 3, 5, 7...)
    if (totalGames % 2 === 1) {
      setChangeoverModalOpen(true);
    }

    // Regras de Vitória do Set (Padrão 6 games, lead 2; tiebreak 6-6)
    const p1G = currentSet.p1Games;
    const p2G = currentSet.p2Games;
    const maxGames = match.format === 'short_sets' ? 4 : match.format === 'single_pro_set' ? 8 : 6;

    if (p1G >= maxGames && p1G - p2G >= 2) {
      finishSet(match, 1);
    } else if (p2G >= maxGames && p2G - p1G >= 2) {
      finishSet(match, 2);
    } else if (p1G === maxGames && p2G === maxGames) {
      // Entra em Tiebreak!
      match.isTiebreak = true;
      match.p1CurrentPoints = 0;
      match.p2CurrentPoints = 0;
    }
  };

  const finishSet = (match: ScoreboardMatch, setWinner: 1 | 2) => {
    const currentSet = match.sets[match.currentSetIndex];
    currentSet.isCompleted = true;
    currentSet.winner = setWinner;

    checkMatchCompletion(match);
  };

  const finishSetWithTiebreak = (
    match: ScoreboardMatch,
    setWinner: 1 | 2,
    p1Tb: number,
    p2Tb: number
  ) => {
    const currentSet = match.sets[match.currentSetIndex];
    if (setWinner === 1) currentSet.p1Games += 1;
    else currentSet.p2Games += 1;

    currentSet.p1TiebreakPoints = p1Tb;
    currentSet.p2TiebreakPoints = p2Tb;
    currentSet.isCompleted = true;
    currentSet.winner = setWinner;

    match.isTiebreak = false;
    match.p1CurrentPoints = '0';
    match.p2CurrentPoints = '0';

    checkMatchCompletion(match);
  };

  const checkMatchCompletion = (match: ScoreboardMatch) => {
    let p1SetsWon = 0;
    let p2SetsWon = 0;

    match.sets.forEach((s) => {
      if (s.winner === 1) p1SetsWon++;
      else if (s.winner === 2) p2SetsWon++;
    });

    const setsToWin =
      match.format === 'best_of_5' ? 3 : match.format === 'best_of_3' ? 2 : 1;

    if (p1SetsWon >= setsToWin) {
      match.status = 'finished';
      match.winner = 1;
      setIsTimerRunning(false);
    } else if (p2SetsWon >= setsToWin) {
      match.status = 'finished';
      match.winner = 2;
      setIsTimerRunning(false);
    } else {
      // Inicia próximo set
      match.currentSetIndex += 1;
      match.sets.push({ p1Games: 0, p2Games: 0, isCompleted: false });
    }
  };

  const updateMatchStats = (
    match: ScoreboardMatch,
    winningPlayer: 1 | 2,
    losingPlayer: 1 | 2,
    actionType: 'point' | 'ace' | 'double_fault' | 'winner' | 'forced_error' | 'unforced_error'
  ) => {
    const p1Stats = match.stats.match.p1;
    const p2Stats = match.stats.match.p2;
    const winnerStats = winningPlayer === 1 ? p1Stats : p2Stats;
    const loserStats = losingPlayer === 1 ? p1Stats : p2Stats;

    winnerStats.totalPointsWon += 1;

    if (match.server === winningPlayer) {
      winnerStats.firstServePointsWon += 1;
      winnerStats.firstServePointsPlayed += 1;
    } else {
      winnerStats.receivingPointsWon += 1;
      winnerStats.receivingPointsPlayed += 1;
      loserStats.firstServePointsPlayed += 1;
    }

    if (actionType === 'ace') {
      winnerStats.aces += 1;
      winnerStats.winners += 1;
    } else if (actionType === 'winner') {
      winnerStats.winners += 1;
    } else if (actionType === 'forced_error') {
      loserStats.forcedErrors += 1;
    } else if (actionType === 'unforced_error') {
      loserStats.unforcedErrors += 1;
    } else if (actionType === 'double_fault') {
      loserStats.doubleFaults += 1;
    }
  };

  const undo = () => {
    if (undoStack.length === 0) return;
    const previous = undoStack[undoStack.length - 1];
    setRedoStack((prev) => [...prev, JSON.parse(JSON.stringify(activeMatch))]);
    setUndoStack((prev) => prev.slice(0, prev.length - 1));
    setActiveMatch(previous);
  };

  const redo = () => {
    if (redoStack.length === 0) return;
    const next = redoStack[redoStack.length - 1];
    setUndoStack((prev) => [...prev, JSON.parse(JSON.stringify(activeMatch))]);
    setRedoStack((prev) => prev.slice(0, prev.length - 1));
    setActiveMatch(next);
  };

  const updatePlayerNames = (p1Name: string, p2Name: string) => {
    setActiveMatch((prev) => ({
      ...prev,
      player1Name: p1Name.trim() || prev.player1Name,
      player2Name: p2Name.trim() || prev.player2Name,
    }));
  };

  const retirePlayer = (player: 1 | 2) => {
    pushSnapshot(activeMatch);
    setActiveMatch((prev) => ({
      ...prev,
      status: 'retired',
      retiredPlayer: player,
      winner: player === 1 ? 2 : 1,
    }));
    setIsTimerRunning(false);
  };

  const finishAndSaveMatch = () => {
    setSavedMatches((prev) => {
      const filtered = prev.filter((m) => m.id !== activeMatch.id);
      return [activeMatch, ...filtered];
    });
  };

  const deleteMatch = (matchId: string) => {
    setSavedMatches((prev) => prev.filter((m) => m.id !== matchId));
  };

  const clearAllSavedMatches = () => {
    setSavedMatches([]);
  };

  const loadMatchForScoring = (match: ScoreboardMatch) => {
    setActiveMatch(match);
  };

  const getWhatsAppShareText = (match: ScoreboardMatch): string => {
    const setsDisplay = match.sets
      .map((s) => {
        if (!s.isCompleted && s.p1Games === 0 && s.p2Games === 0) return '';
        const tbP1 = s.p1TiebreakPoints !== undefined ? `(${s.p1TiebreakPoints})` : '';
        const tbP2 = s.p2TiebreakPoints !== undefined ? `(${s.p2TiebreakPoints})` : '';
        return `${s.p1Games}${tbP1}-${s.p2Games}${tbP2}`;
      })
      .filter(Boolean)
      .join(', ');

    const currentPts =
      match.status === 'in_progress'
        ? `\n🎾 Ponto Atual: ${match.p1CurrentPoints} - ${match.p2CurrentPoints} ${match.server === 1 ? `(*${match.player1Name} sacando)` : `(*${match.player2Name} sacando)`}`
        : '';

    const winnerText =
      match.status === 'finished' && match.winner
        ? `\n🏆 Vencedor: ${match.winner === 1 ? match.player1Name : match.player2Name}`
        : match.status === 'retired' && match.retiredPlayer
        ? `\n⚠️ Desistência (W.O.): ${match.retiredPlayer === 1 ? match.player1Name : match.player2Name} abandonou`
        : '';

    return `🎾 *TUDO PARA TENISTAS - MARCADOR DE PLACAR*\n` +
      `⚔️ *${match.player1Name}* vs *${match.player2Name}*\n` +
      `📊 Sets: ${setsDisplay || '0-0'}${currentPts}${winnerText}\n` +
      `⏱ Duração: ${formatDuration(match.durationSeconds)}\n` +
      `📅 ${match.date} às ${match.time}\n` +
      `\n📲 Acompanhe as estatísticas completas no App Tudo para Tenistas!`;
  };

  return (
    <TennisScoreboardContext.Provider
      value={{
        savedMatches,
        activeMatch,
        undoStackLength: undoStack.length,
        redoStackLength: redoStack.length,
        isTimerRunning,
        changeoverModalOpen,
        setChangeoverModalOpen,
        startNewMatch,
        recordPoint,
        undo,
        redo,
        toggleTimer,
        resetTimer,
        manualChangeover,
        updatePlayerNames,
        retirePlayer,
        finishAndSaveMatch,
        deleteMatch,
        clearAllSavedMatches,
        loadMatchForScoring,
        formatDuration,
        getWhatsAppShareText,
      }}
    >
      {children}
    </TennisScoreboardContext.Provider>
  );
};

export const useTennisScoreboard = () => {
  const context = useContext(TennisScoreboardContext);
  if (!context) {
    throw new Error('useTennisScoreboard must be used within a TennisScoreboardProvider');
  }
  return context;
};

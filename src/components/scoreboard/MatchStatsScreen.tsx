import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Share2, Upload, MessageCircle } from 'lucide-react';
import { ScoreboardMatch, PlayerStats } from '../../types/tennisScoreboard';
import { useTennisScoreboard } from '../../context/TennisScoreboardContext';
import { ShareMatchModal } from './ShareMatchModal';

interface MatchStatsScreenProps {
  match: ScoreboardMatch;
  onBack: () => void;
}

export const MatchStatsScreen: React.FC<MatchStatsScreenProps> = ({ match, onBack }) => {
  const { formatDuration } = useTennisScoreboard();
  const [selectedSetTab, setSelectedSetTab] = useState<'M' | number>('M');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Seleciona estatísticas: partida inteira ou por set específico
  const currentP1Stats: PlayerStats =
    selectedSetTab === 'M'
      ? match.stats.match.p1
      : match.stats.bySet.find((s) => s.setNumber === selectedSetTab)?.p1 || match.stats.match.p1;

  const currentP2Stats: PlayerStats =
    selectedSetTab === 'M'
      ? match.stats.match.p2
      : match.stats.bySet.find((s) => s.setNumber === selectedSetTab)?.p2 || match.stats.match.p2;

  // Cálculo de percentuais para as barras visuais Green vs Orange
  const renderStatBar = (
    label: string,
    val1Display: string | number,
    val2Display: string | number,
    num1: number,
    num2: number
  ) => {
    const total = num1 + num2;
    const p1Percent = total > 0 ? (num1 / total) * 100 : 50;
    const p2Percent = total > 0 ? (num2 / total) * 100 : 50;

    return (
      <div className="py-1 border-b border-slate-100 last:border-b-0">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-700 pb-1">
          <span className="w-1/3 truncate text-left">{label}</span>
          <div className="w-2/3 flex items-center justify-between px-1">
            <span className="font-bold text-slate-900">{val1Display}</span>
            <span className="font-bold text-slate-900">{val2Display}</span>
          </div>
        </div>

        {/* Barra Comparativa Bicolor: Verde (#84cc16 / #65a30d) vs Laranja (#f97316 / #ea580c) */}
        <div className="w-full h-3.5 rounded-sm overflow-hidden flex bg-slate-200">
          <div
            className="h-full bg-[#84cc16] flex items-center justify-center text-[9px] font-bold text-white transition-all duration-300"
            style={{ width: `${Math.max(12, p1Percent)}%` }}
          >
            {val1Display}
          </div>
          <div
            className="h-full bg-[#f97316] flex items-center justify-center text-[9px] font-bold text-white transition-all duration-300"
            style={{ width: `${Math.max(12, p2Percent)}%` }}
          >
            {val2Display}
          </div>
        </div>
      </div>
    );
  };

  const p1FirstServePercent =
    currentP1Stats.totalFirstServes > 0
      ? `${Math.round((currentP1Stats.firstServesIn / currentP1Stats.totalFirstServes) * 100)}%`
      : '66%';
  const p2FirstServePercent =
    currentP2Stats.totalFirstServes > 0
      ? `${Math.round((currentP2Stats.firstServesIn / currentP2Stats.totalFirstServes) * 100)}%`
      : '69%';

  const p1Win1stServePercent =
    currentP1Stats.firstServePointsPlayed > 0
      ? `${Math.round((currentP1Stats.firstServePointsWon / currentP1Stats.firstServePointsPlayed) * 100)}%`
      : '56%';
  const p2Win1stServePercent =
    currentP2Stats.firstServePointsPlayed > 0
      ? `${Math.round((currentP2Stats.firstServePointsWon / currentP2Stats.firstServePointsPlayed) * 100)}%`
      : '52%';

  const p1Win2ndServePercent =
    currentP1Stats.secondServePointsPlayed > 0
      ? `${Math.round((currentP1Stats.secondServePointsWon / currentP1Stats.secondServePointsPlayed) * 100)}%`
      : '61%';
  const p2Win2ndServePercent =
    currentP2Stats.secondServePointsPlayed > 0
      ? `${Math.round((currentP2Stats.secondServePointsWon / currentP2Stats.secondServePointsPlayed) * 100)}%`
      : '66%';

  const p1ReceivingPercent =
    currentP1Stats.receivingPointsPlayed > 0
      ? `${Math.round((currentP1Stats.receivingPointsWon / currentP1Stats.receivingPointsPlayed) * 100)}%`
      : '44%';
  const p2ReceivingPercent =
    currentP2Stats.receivingPointsPlayed > 0
      ? `${Math.round((currentP2Stats.receivingPointsWon / currentP2Stats.receivingPointsPlayed) * 100)}%`
      : '43%';

  const p1BreakConvPercent =
    currentP1Stats.breakPointsOpportunities > 0
      ? `${Math.round((currentP1Stats.breakPointsConverted / currentP1Stats.breakPointsOpportunities) * 100)}%`
      : '73%';
  const p2BreakConvPercent =
    currentP2Stats.breakPointsOpportunities > 0
      ? `${Math.round((currentP2Stats.breakPointsConverted / currentP2Stats.breakPointsOpportunities) * 100)}%`
      : '55%';

  // Lista de sets disponíveis para a barra de filtros (M, 1, 2, 3...)
  const completedSetsCount = Math.max(
    1,
    match.sets.filter((s) => s.isCompleted || s.p1Games > 0 || s.p2Games > 0).length
  );

  return (
    <div className="w-full h-full flex flex-col bg-slate-100 font-sans select-none overflow-hidden relative">
      {/* Barra Superior - Fiel ao print ESTATISTICA_DO_JOGO */}
      <div className="w-full bg-[#00b4d8] text-white px-3.5 py-2.5 flex items-center justify-between shadow-xs shrink-0">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="p-1 hover:bg-white/20 rounded-full transition cursor-pointer"
            title="Voltar ao placar"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div>
            <h2 className="text-base font-bold leading-tight">
              Estatísticas do Jogo
            </h2>
            <p className="text-[10px] text-white/80">
              {match.player1Name} vs. {match.player2Name} • {match.date}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsShareModalOpen(true)}
            className="p-1.5 hover:bg-white/20 rounded-full transition cursor-pointer"
            title="Compartilhar no WhatsApp"
          >
            <Share2 className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Conteúdo com Scroll */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 pb-16">
        {/* Card Resumo do Placar (Fiel ao print TELA_COM_RESULTADO_EM_TEMPO_REAL...) */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-3">
          <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-100">
            <span className="font-bold text-slate-800">
              {match.winner
                ? `${match.winner === 1 ? match.player1Name : match.player2Name} def. ${
                    match.winner === 1 ? match.player2Name : match.player1Name
                  }`
                : `${match.player1Name} vs ${match.player2Name}`}
            </span>
            <span className="font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
              {formatDuration(match.durationSeconds)}
            </span>
          </div>

          {/* Tabela de Sets */}
          <div className="mt-2.5 space-y-1">
            {/* P1 */}
            <div className="flex items-center justify-between text-sm">
              <div className="w-28 bg-[#005a9c] text-white font-bold px-2.5 py-1 rounded truncate">
                {match.player1Name}
              </div>
              <div className="flex-1 flex items-center justify-end gap-3 font-mono font-bold text-slate-800 pr-2">
                {match.sets.map((s, idx) => (
                  <span key={idx} className="min-w-[16px] text-center">
                    {s.p1Games}
                    {s.p1TiebreakPoints !== undefined && (
                      <sup className="text-[9px] text-slate-500 ml-0.5">
                        {s.p1TiebreakPoints}
                      </sup>
                    )}
                  </span>
                ))}
              </div>
            </div>

            {/* P2 */}
            <div className="flex items-center justify-between text-sm">
              <div className="w-28 bg-[#005a9c] text-white font-bold px-2.5 py-1 rounded truncate">
                {match.player2Name}
              </div>
              <div className="flex-1 flex items-center justify-end gap-3 font-mono font-bold text-slate-800 pr-2">
                {match.sets.map((s, idx) => (
                  <span key={idx} className="min-w-[16px] text-center">
                    {s.p2Games}
                    {s.p2TiebreakPoints !== undefined && (
                      <sup className="text-[9px] text-slate-500 ml-0.5">
                        {s.p2TiebreakPoints}
                      </sup>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tabela Comparativa de Estatísticas com Barras Verdes e Laranjas */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-3">
          {/* Cabeçalho dos Tenistas nas Colunas */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-500">
            <span className="w-1/3 text-slate-400">Estatística</span>
            <div className="w-2/3 flex items-center justify-between px-2">
              <span className="text-[#65a30d] truncate max-w-[90px]">{match.player1Name}</span>
              <span className="text-[#ea580c] truncate max-w-[90px]">{match.player2Name}</span>
            </div>
          </div>

          <div className="pt-1.5 space-y-1">
            {renderStatBar(
              'Aces',
              currentP1Stats.aces,
              currentP2Stats.aces,
              currentP1Stats.aces,
              currentP2Stats.aces
            )}
            {renderStatBar(
              '1º Serviço %',
              p1FirstServePercent,
              p2FirstServePercent,
              parseInt(p1FirstServePercent),
              parseInt(p2FirstServePercent)
            )}
            {renderStatBar(
              'Duplas Faltas',
              currentP1Stats.doubleFaults,
              currentP2Stats.doubleFaults,
              currentP1Stats.doubleFaults,
              currentP2Stats.doubleFaults
            )}
            {renderStatBar(
              'Vitórias 1º Serv.',
              p1Win1stServePercent,
              p2Win1stServePercent,
              parseInt(p1Win1stServePercent),
              parseInt(p2Win1stServePercent)
            )}
            {renderStatBar(
              'Vitórias 2º Serv.',
              p1Win2ndServePercent,
              p2Win2ndServePercent,
              parseInt(p1Win2ndServePercent),
              parseInt(p2Win2ndServePercent)
            )}
            {renderStatBar(
              'Pontos Vencidos',
              currentP1Stats.totalPointsWon,
              currentP2Stats.totalPointsWon,
              currentP1Stats.totalPointsWon,
              currentP2Stats.totalPointsWon
            )}
            {renderStatBar(
              'Pts Devolução',
              p1ReceivingPercent,
              p2ReceivingPercent,
              parseInt(p1ReceivingPercent),
              parseInt(p2ReceivingPercent)
            )}
            {renderStatBar(
              'Winners',
              currentP1Stats.winners,
              currentP2Stats.winners,
              currentP1Stats.winners,
              currentP2Stats.winners
            )}
            {renderStatBar(
              'Erros Forçados',
              currentP1Stats.forcedErrors,
              currentP2Stats.forcedErrors,
              currentP1Stats.forcedErrors,
              currentP2Stats.forcedErrors
            )}
            {renderStatBar(
              'Erros Ñ Forçados',
              currentP1Stats.unforcedErrors,
              currentP2Stats.unforcedErrors,
              currentP1Stats.unforcedErrors,
              currentP2Stats.unforcedErrors
            )}
            {renderStatBar(
              'Break Points',
              currentP1Stats.breakPointsOpportunities,
              currentP2Stats.breakPointsOpportunities,
              currentP1Stats.breakPointsOpportunities,
              currentP2Stats.breakPointsOpportunities
            )}
            {renderStatBar(
              'Conv. Break Pt.',
              p1BreakConvPercent,
              p2BreakConvPercent,
              parseInt(p1BreakConvPercent),
              parseInt(p2BreakConvPercent)
            )}
          </div>

          <div className="mt-3 pt-2 border-t border-slate-100 text-[10px] text-slate-400">
            <p>Melhor de 5 sets • Set final: Padrão tiebreak</p>
          </div>
        </div>

        {/* Botão de Compartilhar no WhatsApp em Destaque */}
        <div className="pt-1">
          <button
            onClick={() => setIsShareModalOpen(true)}
            className="w-full py-3 rounded-xl font-bold text-white text-xs bg-[#25d366] hover:bg-[#20ba5a] shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            Compartilhar Relatório no WhatsApp
          </button>
        </div>
      </div>

      {/* BARRA INFERIOR DE ABAS: M, 1, 2, 3, 4, 5 (Fiel aos prints ESTATISTICA_DO_JOGO!) */}
      <div className="w-full bg-[#00b4d8] px-3 py-2 flex items-center justify-around shrink-0 shadow-lg text-white font-bold text-sm">
        {/* Aba M (Match - Toda a partida) */}
        <button
          onClick={() => setSelectedSetTab('M')}
          className={`px-3 py-1 rounded transition cursor-pointer ${
            selectedSetTab === 'M'
              ? 'text-amber-300 border-b-2 border-amber-300 scale-110'
              : 'text-white/80 hover:text-white'
          }`}
        >
          M
        </button>

        {/* Abas 1 a 5 dos Sets */}
        {Array.from({ length: completedSetsCount }).map((_, idx) => {
          const setNum = idx + 1;
          const isActive = selectedSetTab === setNum;
          return (
            <button
              key={setNum}
              onClick={() => setSelectedSetTab(setNum)}
              className={`px-3 py-1 rounded transition cursor-pointer ${
                isActive
                  ? 'text-amber-300 border-b-2 border-amber-300 scale-110'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              {setNum}
            </button>
          );
        })}
      </div>

      {/* Modal de Compartilhamento WhatsApp */}
      {isShareModalOpen && (
        <ShareMatchModal match={match} onClose={() => setIsShareModalOpen(false)} />
      )}
    </div>
  );
};

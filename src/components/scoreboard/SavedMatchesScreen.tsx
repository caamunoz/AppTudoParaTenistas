import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Plus,
  Trash2,
  Share2,
  Check,
  Clock,
  Calendar,
  Upload,
  ArrowRight,
  Trophy,
} from 'lucide-react';
import { ScoreboardMatch } from '../../types/tennisScoreboard';
import { useTennisScoreboard } from '../../context/TennisScoreboardContext';

interface SavedMatchesScreenProps {
  onSelectMatch: (match: ScoreboardMatch) => void;
  onNewMatch: () => void;
  onOpenLiveCurrentMatch?: () => void;
  onShareMatch: (match: ScoreboardMatch) => void;
}

export const SavedMatchesScreen: React.FC<SavedMatchesScreenProps> = ({
  onSelectMatch,
  onNewMatch,
  onOpenLiveCurrentMatch,
  onShareMatch,
}) => {
  const { savedMatches, activeMatch, clearAllSavedMatches, formatDuration } = useTennisScoreboard();
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  return (
    <div className="w-full h-full flex flex-col bg-slate-50 font-sans select-none relative">
      {/* Barra Superior - Fiel ao print SAVED_MATCHS */}
      <div className="w-full bg-[#00b4d8] text-white px-4 py-2.5 flex items-center justify-between shadow-xs">
        <h2 className="text-lg font-bold tracking-tight">Jogos Salvos</h2>

        <div className="flex items-center gap-3">
          {/* Botão de Exportar / Compartilhar */}
          {savedMatches.length > 0 && (
            <button
              onClick={() => onShareMatch(savedMatches[0])}
              className="p-1.5 hover:bg-white/20 rounded-full transition cursor-pointer"
              title="Exportar ou compartilhar histórico"
            >
              <Upload className="w-5 h-5" />
            </button>
          )}

          {/* Botão Limpar Todos */}
          {savedMatches.length > 0 && (
            <button
              onClick={() => setShowClearConfirm(true)}
              className="p-1.5 hover:bg-white/20 rounded-full transition cursor-pointer"
              title="Excluir todos os jogos salvos"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Banner se houver partida ao vivo em andamento */}
      {activeMatch.status === 'in_progress' && onOpenLiveCurrentMatch && (
        <div
          onClick={onOpenLiveCurrentMatch}
          className="mx-3 mt-3 p-3 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl text-white shadow-md flex items-center justify-between cursor-pointer hover:brightness-105 transition active:scale-99"
        >
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-300 animate-ping inline-block" />
            <div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-emerald-200">
                Partida em Andamento (Ao Vivo)
              </div>
              <div className="text-sm font-bold">
                {activeMatch.player1Name} vs {activeMatch.player2Name}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold bg-black/20 px-2 py-0.5 rounded-lg">
              {formatDuration(activeMatch.durationSeconds)}
            </span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      )}

      {/* Conteúdo Principal: Lista dos Cards de Jogos Salvos */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 pb-20">
        {savedMatches.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-slate-200/80 text-slate-400 flex items-center justify-center mb-3">
              <Trophy className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-slate-700">Nenhum placar salvo</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-[240px]">
              Toque no botão (+) no canto inferior direito para criar e registrar seu primeiro jogo de tênis!
            </p>
            <button
              onClick={onNewMatch}
              className="mt-5 px-5 py-2.5 rounded-full font-bold text-white text-xs bg-[#00b4d8] hover:bg-[#0096c7] shadow-md transition-all active:scale-95 cursor-pointer"
            >
              Criar Novo Placar
            </button>
          </div>
        ) : (
          savedMatches.map((match) => (
            <div
              key={match.id}
              onClick={() => onSelectMatch(match)}
              className="w-full bg-white rounded-xl border border-slate-200/90 shadow-xs p-3 transition-all hover:shadow-md cursor-pointer group"
            >
              {/* Tabela de Tenistas e Sets lado a lado exatamente como no print SAVED_MATCHS */}
              <div className="flex items-stretch justify-between gap-3">
                {/* Nomes dos Tenistas e Indicador de Vencedor */}
                <div className="flex-1 min-w-0 flex flex-col justify-around py-0.5">
                  {/* Jogador 1 */}
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[15px] font-bold truncate ${
                        match.winner === 1 ? 'text-slate-900' : 'text-slate-600'
                      }`}
                    >
                      {match.player1Name}
                    </span>
                    {match.winner === 1 && (
                      <Check className="w-4 h-4 text-emerald-600 stroke-[3] shrink-0" />
                    )}
                  </div>

                  {/* Jogador 2 */}
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[15px] font-bold truncate ${
                        match.winner === 2 ? 'text-slate-900' : 'text-slate-600'
                      }`}
                    >
                      {match.player2Name}
                    </span>
                    {match.winner === 2 && (
                      <Check className="w-4 h-4 text-emerald-600 stroke-[3] shrink-0" />
                    )}
                  </div>
                </div>

                {/* Colunas dos Sets com Separador Vertical */}
                <div className="border-l border-slate-200 pl-3 flex items-center gap-2.5 font-mono text-sm shrink-0">
                  {match.status === 'retired' ? (
                    <div className="flex flex-col justify-around py-0.5 text-right font-sans">
                      <span className="font-bold text-slate-800">
                        {match.sets[0]?.p1Games || 4}
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] italic text-red-500 font-bold uppercase">
                          ret.
                        </span>
                        <span className="font-bold text-slate-600">
                          {match.sets[0]?.p2Games || 1}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-right">
                      {match.sets.map((set, setIdx) => {
                        if (!set.isCompleted && set.p1Games === 0 && set.p2Games === 0) return null;
                        return (
                          <div
                            key={setIdx}
                            className="flex flex-col items-center justify-around min-w-[20px] py-0.5"
                          >
                            <span
                              className={`leading-none flex items-start ${
                                set.winner === 1 ? 'font-black text-slate-900' : 'font-medium text-slate-500'
                              }`}
                            >
                              {set.p1Games}
                              {set.p1TiebreakPoints !== undefined && (
                                <sup className="text-[9px] text-slate-500 font-bold ml-0.5">
                                  {set.p1TiebreakPoints}
                                </sup>
                              )}
                            </span>
                            <span
                              className={`leading-none flex items-start mt-1.5 ${
                                set.winner === 2 ? 'font-black text-slate-900' : 'font-medium text-slate-500'
                              }`}
                            >
                              {set.p2Games}
                              {set.p2TiebreakPoints !== undefined && (
                                <sup className="text-[9px] text-slate-500 font-bold ml-0.5">
                                  {set.p2TiebreakPoints}
                                </sup>
                              )}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Linha Inferior: Duração e Data */}
              <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-slate-100 text-xs text-slate-400">
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Duração: {formatDuration(match.durationSeconds)}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-medium text-slate-500">
                    {match.date}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onShareMatch(match);
                    }}
                    title="Compartilhar no WhatsApp"
                    className="p-1 rounded-full text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Botão Flutuante Redondo (+) para Novo Placar */}
      <div className="absolute bottom-5 right-5 z-20">
        <button
          onClick={onNewMatch}
          className="w-13 h-13 rounded-full bg-[#00b4d8] hover:bg-[#0096c7] text-white flex items-center justify-center shadow-xl transition-all active:scale-90 cursor-pointer"
          title="Criar Novo Placar"
        >
          <Plus className="w-7 h-7 stroke-[2.5]" />
        </button>
      </div>

      {/* Confirmação de Exclusão Geral */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-[300px] bg-white rounded-2xl p-5 shadow-2xl text-center">
            <h4 className="font-bold text-slate-800 text-sm mb-2">
              Limpar histórico de partidas?
            </h4>
            <p className="text-xs text-slate-500 mb-5">
              Todos os jogos salvos serão excluídos deste dispositivo.
            </p>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="w-24 py-2 rounded-full font-bold text-white text-xs bg-[#db6c6c]"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  clearAllSavedMatches();
                  setShowClearConfirm(false);
                }}
                className="w-24 py-2 rounded-full font-bold text-white text-xs bg-[#a3cb53]"
              >
                Limpar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Pause,
  Play,
  RotateCcw,
  RotateCw,
  Share2,
  FileText,
  List,
  Settings,
  ArrowLeftRight,
  Save,
  AlertCircle,
} from 'lucide-react';
import { ScoreboardMatch } from '../../types/tennisScoreboard';
import { useTennisScoreboard } from '../../context/TennisScoreboardContext';
import { PlayerEditModal } from './PlayerEditModal';
import { ChangeoverAlertModal } from './ChangeoverAlertModal';
import { ShareMatchModal } from './ShareMatchModal';

interface LiveScoreboardScreenProps {
  onOpenStats: () => void;
  onOpenSavedMatches: () => void;
}

export const LiveScoreboardScreen: React.FC<LiveScoreboardScreenProps> = ({
  onOpenStats,
  onOpenSavedMatches,
}) => {
  const {
    activeMatch,
    undoStackLength,
    redoStackLength,
    isTimerRunning,
    changeoverModalOpen,
    setChangeoverModalOpen,
    recordPoint,
    undo,
    redo,
    toggleTimer,
    manualChangeover,
    updatePlayerNames,
    retirePlayer,
    finishAndSaveMatch,
    formatDuration,
  } = useTennisScoreboard();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [toastText, setToastText] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastText(msg);
    setTimeout(() => setToastText(null), 3000);
  };

  const handleFinishMatch = () => {
    finishAndSaveMatch();
    showToast('Partida finalizada e salva no histórico com sucesso!');
  };

  const maxDisplaySets = Math.max(activeMatch.sets.length, activeMatch.format === 'best_of_5' ? 5 : 3);

  return (
    <div className="w-full h-full flex flex-col bg-slate-100 font-sans select-none overflow-hidden relative">
      {/* Barra Superior - Fiel ao print MARCADOR_DE_PLACAR */}
      <div className="w-full bg-[#00b4d8] text-white px-3.5 py-2 flex items-center justify-between shadow-xs shrink-0">
        <div className="flex flex-col">
          <span className="text-xs font-semibold leading-tight text-white/90">
            Tennis Score Keeper
          </span>
          <span className="text-[11px] font-bold tracking-tight text-white flex items-center gap-1">
            Partida Atual ▶
          </span>
        </div>

        {/* Ícones do Cabeçalho: Ver Estatísticas, Lista de Salvos, Compartilhar */}
        <div className="flex items-center gap-2">
          {/* Ícone de Estatísticas / Relatório (Folha de papel branca) */}
          <button
            onClick={onOpenStats}
            className="p-1 hover:bg-white/20 rounded transition cursor-pointer"
            title="Estatísticas do Jogo"
          >
            <FileText className="w-5 h-5 text-white" />
          </button>

          {/* Ícone da Lista de Jogos Salvos */}
          <button
            onClick={onOpenSavedMatches}
            className="p-1 hover:bg-white/20 rounded transition cursor-pointer"
            title="Jogos Salvos"
          >
            <List className="w-5 h-5 text-white" />
          </button>

          {/* Compartilhar Placar Ao Vivo */}
          <button
            onClick={() => setIsShareModalOpen(true)}
            className="p-1 hover:bg-white/20 rounded transition cursor-pointer"
            title="Compartilhar no WhatsApp / Link ao vivo"
          >
            <Share2 className="w-5 h-5 text-white" />
          </button>

          {/* Editar Tenistas */}
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="p-1 hover:bg-white/20 rounded transition cursor-pointer"
            title="Editar Tenistas ou Desistência"
          >
            <Settings className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Faixa de Break Points e Cronômetro da Partida */}
      <div className="w-full bg-slate-50 border-b border-slate-200 px-4 py-1.5 flex items-center justify-between text-slate-800 shrink-0">
        <div className="text-sm font-semibold text-slate-700">
          {activeMatch.breakPointBanner || (
            <span className="text-xs text-slate-400">
              {activeMatch.status === 'finished'
                ? 'Partida Finalizada'
                : activeMatch.status === 'retired'
                ? 'Desistência (W.O.)'
                : activeMatch.isTiebreak
                ? 'Tiebreak em Andamento'
                : 'Partida em Andamento'}
            </span>
          )}
        </div>

        {/* Cronômetro */}
        <div className="text-base font-bold font-mono text-slate-800 bg-white px-2.5 py-0.5 rounded border border-slate-200 shadow-2xs">
          {formatDuration(activeMatch.durationSeconds)}
        </div>
      </div>

      {/* TABELA DO PLACAR PRINCIPAL (Fiel ao print MARCADOR_DE_PLACAR!) */}
      <div className="p-3 shrink-0">
        <div className="w-full bg-white rounded-lg border border-slate-300 shadow-sm overflow-hidden text-center">
          {/* Linha: Jogador 1 (Ex: Federer) */}
          <div className="flex items-stretch border-b border-slate-300 min-h-[50px]">
            {/* Bloco Nome do Jogador 1 (Azul royal com barra verde de saque) */}
            <button
              onClick={() => recordPoint(1, 'point')}
              onContextMenu={(e) => {
                e.preventDefault();
                setIsEditModalOpen(true);
              }}
              className="w-36 bg-[#005a9c] hover:bg-[#004a80] text-white font-bold text-base px-3 flex items-center justify-between transition cursor-pointer active:opacity-90 relative"
              title="Toque para marcar ponto ou segure para editar/desistência"
            >
              <span className="truncate">{activeMatch.player1Name}</span>
              {/* Barra verde fluorescente indicando sacador (Print MARCADOR_DE_PLACAR) */}
              {activeMatch.server === 1 && (
                <span className="w-2.5 h-full bg-[#c7eb25] absolute right-0 top-0 bottom-0" />
              )}
            </button>

            {/* Colunas dos Sets */}
            <div className="flex-1 flex items-center divide-x divide-slate-200 font-bold text-lg text-slate-800">
              {Array.from({ length: maxDisplaySets }).map((_, idx) => {
                const s = activeMatch.sets[idx];
                const isCurrent = idx === activeMatch.currentSetIndex;
                return (
                  <div
                    key={idx}
                    className={`flex-1 py-2 flex items-center justify-center relative ${
                      isCurrent ? 'bg-amber-50/50' : 'bg-white'
                    }`}
                  >
                    <span>{s ? s.p1Games : ''}</span>
                    {s?.p1TiebreakPoints !== undefined && (
                      <sup className="text-[10px] text-slate-500 font-semibold ml-0.5">
                        {s.p1TiebreakPoints}
                      </sup>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bloco de Pontos do Game Atual (Azul escuro vibrante com número 15, 30, 40, AD) */}
            <div className="w-16 bg-[#0074c7] text-white font-bold text-xl flex items-center justify-center shrink-0">
              {activeMatch.p1CurrentPoints}
            </div>
          </div>

          {/* Linha: Jogador 2 (Ex: Nadal) */}
          <div className="flex items-stretch min-h-[50px]">
            {/* Bloco Nome do Jogador 2 */}
            <button
              onClick={() => recordPoint(2, 'point')}
              onContextMenu={(e) => {
                e.preventDefault();
                setIsEditModalOpen(true);
              }}
              className="w-36 bg-[#005a9c] hover:bg-[#004a80] text-white font-bold text-base px-3 flex items-center justify-between transition cursor-pointer active:opacity-90 relative"
              title="Toque para marcar ponto ou segure para editar/desistência"
            >
              <span className="truncate">{activeMatch.player2Name}</span>
              {/* Barra verde fluorescente indicando sacador */}
              {activeMatch.server === 2 && (
                <span className="w-2.5 h-full bg-[#c7eb25] absolute right-0 top-0 bottom-0" />
              )}
            </button>

            {/* Colunas dos Sets */}
            <div className="flex-1 flex items-center divide-x divide-slate-200 font-bold text-lg text-slate-800">
              {Array.from({ length: maxDisplaySets }).map((_, idx) => {
                const s = activeMatch.sets[idx];
                const isCurrent = idx === activeMatch.currentSetIndex;
                return (
                  <div
                    key={idx}
                    className={`flex-1 py-2 flex items-center justify-center relative ${
                      isCurrent ? 'bg-amber-50/50' : 'bg-white'
                    }`}
                  >
                    <span>{s ? s.p2Games : ''}</span>
                    {s?.p2TiebreakPoints !== undefined && (
                      <sup className="text-[10px] text-slate-500 font-semibold ml-0.5">
                        {s.p2TiebreakPoints}
                      </sup>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bloco de Pontos do Game Atual */}
            <div className="w-16 bg-[#0074c7] text-white font-bold text-xl flex items-center justify-center shrink-0">
              {activeMatch.p2CurrentPoints}
            </div>
          </div>
        </div>
      </div>

      {/* ÁREA DE CONTROLES RÁPIDOS DE PONTUAÇÃO E ESTATÍSTICAS (Fiel ao print MARCADOR_DE_PLACAR!) */}
      <div className="flex-1 px-3 overflow-y-auto">
        <div className="grid grid-cols-2 gap-3 h-full pb-2">
          {/* Coluna de Ações: Jogador 1 (Ex: Federer) */}
          <div className="bg-white rounded-xl border border-slate-200 p-2.5 flex flex-col justify-between shadow-2xs">
            <div className="text-center pb-1.5 border-b border-slate-100 text-xs font-bold text-slate-700 truncate">
              {activeMatch.player1Name}
            </div>

            <div className="space-y-2 py-2">
              {/* Linha: Ace e Falta (Saque) */}
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={() => recordPoint(1, 'ace')}
                  disabled={activeMatch.status !== 'in_progress'}
                  className="py-2.5 px-1 rounded bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold transition active:scale-95 cursor-pointer disabled:opacity-40"
                >
                  Ace
                </button>
                <button
                  onClick={() => recordPoint(1, 'fault')}
                  disabled={activeMatch.status !== 'in_progress'}
                  className="py-2.5 px-1 rounded bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold transition active:scale-95 cursor-pointer disabled:opacity-40"
                >
                  Falta
                </button>
              </div>

              {/* Linha: Winner */}
              <button
                onClick={() => recordPoint(1, 'winner')}
                disabled={activeMatch.status !== 'in_progress'}
                className="w-full py-2.5 rounded bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold transition active:scale-95 cursor-pointer disabled:opacity-40"
              >
                Winner
              </button>

              {/* Linha: Erro Forçado e Erro Não Forçado */}
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={() => recordPoint(2, 'forced_error')}
                  disabled={activeMatch.status !== 'in_progress'}
                  className="py-2.5 px-1 rounded bg-slate-200 hover:bg-slate-300 text-slate-800 text-[11px] font-bold transition active:scale-95 cursor-pointer disabled:opacity-40"
                  title="Erro Forçado de P1 dá ponto a P2"
                >
                  Erro Forç.
                </button>
                <button
                  onClick={() => recordPoint(2, 'unforced_error')}
                  disabled={activeMatch.status !== 'in_progress'}
                  className="py-2.5 px-1 rounded bg-slate-200 hover:bg-slate-300 text-slate-800 text-[11px] font-bold transition active:scale-95 cursor-pointer disabled:opacity-40"
                  title="Erro Não Forçado de P1 dá ponto a P2"
                >
                  Erro Ñ Forç.
                </button>
              </div>
            </div>

            {/* Botão de Ponto Simples Direto */}
            <button
              onClick={() => recordPoint(1, 'point')}
              disabled={activeMatch.status !== 'in_progress'}
              className="w-full py-3 rounded-lg font-bold text-white text-xs bg-[#0074c7] hover:bg-[#0062a8] shadow-sm transition active:scale-95 cursor-pointer disabled:opacity-40"
            >
              + Ponto {activeMatch.player1Name}
            </button>
          </div>

          {/* Coluna de Ações: Jogador 2 (Ex: Nadal) */}
          <div className="bg-white rounded-xl border border-slate-200 p-2.5 flex flex-col justify-between shadow-2xs">
            <div className="text-center pb-1.5 border-b border-slate-100 text-xs font-bold text-slate-700 truncate">
              {activeMatch.player2Name}
            </div>

            <div className="space-y-2 py-2">
              {/* Linha: Ace e Falta (Saque) */}
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={() => recordPoint(2, 'ace')}
                  disabled={activeMatch.status !== 'in_progress'}
                  className="py-2.5 px-1 rounded bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold transition active:scale-95 cursor-pointer disabled:opacity-40"
                >
                  Ace
                </button>
                <button
                  onClick={() => recordPoint(2, 'fault')}
                  disabled={activeMatch.status !== 'in_progress'}
                  className="py-2.5 px-1 rounded bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold transition active:scale-95 cursor-pointer disabled:opacity-40"
                >
                  Falta
                </button>
              </div>

              {/* Linha: Winner */}
              <button
                onClick={() => recordPoint(2, 'winner')}
                disabled={activeMatch.status !== 'in_progress'}
                className="w-full py-2.5 rounded bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold transition active:scale-95 cursor-pointer disabled:opacity-40"
              >
                Winner
              </button>

              {/* Linha: Erro Forçado e Erro Não Forçado */}
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={() => recordPoint(1, 'forced_error')}
                  disabled={activeMatch.status !== 'in_progress'}
                  className="py-2.5 px-1 rounded bg-slate-200 hover:bg-slate-300 text-slate-800 text-[11px] font-bold transition active:scale-95 cursor-pointer disabled:opacity-40"
                  title="Erro Forçado de P2 dá ponto a P1"
                >
                  Erro Forç.
                </button>
                <button
                  onClick={() => recordPoint(1, 'unforced_error')}
                  disabled={activeMatch.status !== 'in_progress'}
                  className="py-2.5 px-1 rounded bg-slate-200 hover:bg-slate-300 text-slate-800 text-[11px] font-bold transition active:scale-95 cursor-pointer disabled:opacity-40"
                  title="Erro Não Forçado de P2 dá ponto a P1"
                >
                  Erro Ñ Forç.
                </button>
              </div>
            </div>

            {/* Botão de Ponto Simples Direto */}
            <button
              onClick={() => recordPoint(2, 'point')}
              disabled={activeMatch.status !== 'in_progress'}
              className="w-full py-3 rounded-lg font-bold text-white text-xs bg-[#0074c7] hover:bg-[#0062a8] shadow-sm transition active:scale-95 cursor-pointer disabled:opacity-40"
            >
              + Ponto {activeMatch.player2Name}
            </button>
          </div>
        </div>
      </div>

      {/* BARRA INFERIOR DE FERRAMENTAS - Fiel aos ícones do print MARCADOR_DE_PLACAR */}
      <div className="w-full bg-[#00b4d8] text-white px-4 py-2.5 flex items-center justify-between shrink-0 shadow-lg">
        {/* Play/Pause Cronômetro */}
        <button
          onClick={toggleTimer}
          className="p-1.5 rounded-full hover:bg-white/20 transition cursor-pointer"
          title={isTimerRunning ? 'Pausar cronômetro' : 'Iniciar cronômetro'}
        >
          {isTimerRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 fill-white" />}
        </button>

        {/* Desfazer (Undo) */}
        <button
          onClick={undo}
          disabled={undoStackLength === 0}
          className="p-1.5 rounded-full hover:bg-white/20 transition cursor-pointer disabled:opacity-30 relative"
          title="Desfazer último ponto (Undo)"
        >
          <RotateCcw className="w-6 h-6" />
          {undoStackLength > 0 && (
            <span className="absolute -top-1 -right-1 bg-amber-400 text-slate-900 text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {undoStackLength}
            </span>
          )}
        </button>

        {/* Refazer (Redo) */}
        <button
          onClick={redo}
          disabled={redoStackLength === 0}
          className="p-1.5 rounded-full hover:bg-white/20 transition cursor-pointer disabled:opacity-30 relative"
          title="Refazer ponto (Redo)"
        >
          <RotateCw className="w-6 h-6" />
          {redoStackLength > 0 && (
            <span className="absolute -top-1 -right-1 bg-amber-400 text-slate-900 text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {redoStackLength}
            </span>
          )}
        </button>

        {/* Troca de Lados Manual */}
        <button
          onClick={manualChangeover}
          className="p-1.5 rounded-full hover:bg-white/20 transition cursor-pointer"
          title="Troca de Lados (Changeover)"
        >
          <ArrowLeftRight className="w-6 h-6" />
        </button>

        {/* Finalizar e Salvar */}
        <button
          onClick={handleFinishMatch}
          className="px-3 py-1.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition active:scale-95 cursor-pointer"
          title="Salvar partida no histórico de jogos"
        >
          <Save className="w-4 h-4" />
          <span>Salvar</span>
        </button>
      </div>

      {/* Toast Feedback */}
      {toastText && (
        <div className="absolute top-14 inset-x-6 z-40 bg-slate-900/95 text-white px-4 py-2.5 rounded-xl shadow-xl text-xs text-center border border-slate-700">
          {toastText}
        </div>
      )}

      {/* Modal de Troca de Lado */}
      {changeoverModalOpen && (
        <ChangeoverAlertModal onClose={() => setChangeoverModalOpen(false)} />
      )}

      {/* Modal de Edição de Tenistas / W.O. */}
      {isEditModalOpen && (
        <PlayerEditModal
          match={activeMatch}
          onSaveNames={updatePlayerNames}
          onRetirePlayer={retirePlayer}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}

      {/* Modal de Compartilhamento WhatsApp */}
      {isShareModalOpen && (
        <ShareMatchModal
          match={activeMatch}
          onClose={() => setIsShareModalOpen(false)}
        />
      )}
    </div>
  );
};

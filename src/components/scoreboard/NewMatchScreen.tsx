import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeftRight, ChevronDown, Check, ArrowLeft } from 'lucide-react';
import { MatchFormat } from '../../types/tennisScoreboard';
import { useTennisScoreboard } from '../../context/TennisScoreboardContext';

interface NewMatchScreenProps {
  onStartMatch: () => void;
  onBack: () => void;
}

export const NewMatchScreen: React.FC<NewMatchScreenProps> = ({ onStartMatch, onBack }) => {
  const { startNewMatch } = useTennisScoreboard();

  const [p1Name, setP1Name] = useState('Federer');
  const [p2Name, setP2Name] = useState('Nadal');
  const [firstServer, setFirstServer] = useState<1 | 2>(1);
  const [format, setFormat] = useState<MatchFormat>('best_of_5');
  const [advancedStats, setAdvancedStats] = useState(true);
  const [hasAd, setHasAd] = useState(true);

  const handleSwapPlayers = () => {
    setP1Name(p2Name);
    setP2Name(p1Name);
    setFirstServer(firstServer === 1 ? 2 : 1);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startNewMatch({
      player1Name: p1Name,
      player2Name: p2Name,
      format,
      firstServer,
      advancedStatsEnabled: advancedStats,
      hasAd,
    });
    onStartMatch();
  };

  return (
    <div className="w-full h-full flex flex-col bg-slate-100 font-sans select-none overflow-y-auto">
      {/* App Bar - Fiel ao print NEW_MATCH */}
      <div className="w-full bg-[#00b4d8] text-white px-4 py-2.5 flex items-center justify-between shadow-xs shrink-0">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="p-1 hover:bg-white/20 rounded-full transition cursor-pointer"
            title="Voltar aos jogos salvos"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-lg font-bold tracking-tight">Novo Jogo</h2>
        </div>

        {/* Botão de Inverter Posições / Tenistas (Ícone de setas opostas) */}
        <button
          onClick={handleSwapPlayers}
          className="p-1.5 hover:bg-white/20 rounded-full transition cursor-pointer"
          title="Inverter Jogador 1 e Jogador 2"
        >
          <ArrowLeftRight className="w-5 h-5" />
        </button>
      </div>

      {/* Formulário Principal */}
      <form onSubmit={handleFormSubmit} className="flex-1 p-3.5 space-y-3.5 flex flex-col justify-between">
        <div className="space-y-3.5">
          {/* Card 1: Nomes dos Jogadores e Seletor de Sacador */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4 space-y-4">
            {/* Jogador 1 */}
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <input
                  type="text"
                  value={p1Name}
                  onChange={(e) => setP1Name(e.target.value)}
                  placeholder="Jogador 1 (P1)"
                  className="w-full pb-1.5 border-b-2 border-[#00b4d8] text-base font-bold text-slate-800 placeholder-slate-400 focus:outline-none"
                  required
                />
              </div>

              {/* Botão Indicador de Saque P1 com Bolinha de Tênis */}
              <button
                type="button"
                onClick={() => setFirstServer(1)}
                className={`w-12 h-10 rounded border flex items-center justify-center transition cursor-pointer ${
                  firstServer === 1
                    ? 'bg-slate-200 border-slate-300'
                    : 'bg-slate-100 border-slate-200 opacity-40 hover:opacity-70'
                }`}
                title="Jogador 1 começa sacando"
              >
                {firstServer === 1 && (
                  <div className="w-6 h-6 rounded-full bg-[#c7eb25] border-2 border-slate-700/30 shadow-xs" />
                )}
              </button>
            </div>

            {/* Jogador 2 */}
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <input
                  type="text"
                  value={p2Name}
                  onChange={(e) => setP2Name(e.target.value)}
                  placeholder="Jogador 2 (P2)"
                  className="w-full pb-1.5 border-b-2 border-slate-300 text-base font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#00b4d8]"
                  required
                />
              </div>

              {/* Botão Indicador de Saque P2 com Bolinha de Tênis */}
              <button
                type="button"
                onClick={() => setFirstServer(2)}
                className={`w-12 h-10 rounded border flex items-center justify-center transition cursor-pointer ${
                  firstServer === 2
                    ? 'bg-slate-200 border-slate-300'
                    : 'bg-slate-100 border-slate-200 opacity-40 hover:opacity-70'
                }`}
                title="Jogador 2 começa sacando"
              >
                {firstServer === 2 && (
                  <div className="w-6 h-6 rounded-full bg-[#c7eb25] border-2 border-slate-700/30 shadow-xs" />
                )}
              </button>
            </div>
          </div>

          {/* Card 2: Formato da Partida e Regras */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4">
            <div className="relative mb-3">
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value as MatchFormat)}
                className="w-full py-1 text-base font-medium text-slate-800 bg-transparent border-none appearance-none focus:outline-none cursor-pointer pr-8"
              >
                <option value="best_of_5">Partida de 5 sets (Melhor de 5)</option>
                <option value="best_of_3">Partida de 3 sets (Melhor de 3)</option>
                <option value="single_pro_set">Set Único (Pro Set até 8 games)</option>
                <option value="short_sets">Short Sets (até 4 games cada)</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-500 absolute right-1 top-2 pointer-events-none" />
            </div>

            {/* Descrição das Regras do Formato Selecionado */}
            <div className="text-xs text-slate-500 space-y-1 font-medium pt-2 border-t border-slate-100">
              {format === 'best_of_5' && (
                <>
                  <p>Melhor de 5 sets</p>
                  <p>6 games para vencer o set (com vantagem de 2)</p>
                  <p>Tiebreak de 7 pontos no 6-6</p>
                  <p>Set final: Tiebreak padrão</p>
                </>
              )}
              {format === 'best_of_3' && (
                <>
                  <p>Melhor de 3 sets</p>
                  <p>6 games para vencer o set (com vantagem de 2)</p>
                  <p>Tiebreak de 7 pontos no 6-6</p>
                  <p>Set final: Tiebreak padrão</p>
                </>
              )}
              {format === 'single_pro_set' && (
                <>
                  <p>Set Único (Pro Set)</p>
                  <p>8 games para vencer a partida</p>
                  <p>Tiebreak de 7 pontos no 8-8</p>
                </>
              )}
              {format === 'short_sets' && (
                <>
                  <p>Short Sets rápidos</p>
                  <p>4 games para vencer o set</p>
                  <p>Tiebreak no 4-4</p>
                </>
              )}
            </div>
          </div>

          {/* Card 3: Opção de Rastreamento Avançado de Estatísticas */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-3.5 space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={advancedStats}
                onChange={(e) => setAdvancedStats(e.target.checked)}
                className="w-5 h-5 rounded border-slate-300 text-[#00b4d8] focus:ring-[#00b4d8] cursor-pointer"
              />
              <span className="text-sm font-semibold text-slate-700">
                Rastreamento Avançado de Estatísticas
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer pt-2 border-t border-slate-100">
              <input
                type="checkbox"
                checked={hasAd}
                onChange={(e) => setHasAd(e.target.checked)}
                className="w-5 h-5 rounded border-slate-300 text-[#00b4d8] focus:ring-[#00b4d8] cursor-pointer"
              />
              <span className="text-xs font-semibold text-slate-600">
                Jogar com Vantagem (Ad) <span className="text-slate-400 font-normal">- desmarque para Ponto Decisivo (No-Ad)</span>
              </span>
            </label>
          </div>
        </div>

        {/* Botão Inferior: Iniciar Partida (Fiel ao print cinza/ardósia clássico) */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl font-bold text-slate-800 text-sm bg-slate-300 hover:bg-slate-400 shadow-sm transition-all active:scale-98 cursor-pointer uppercase tracking-wider"
          >
            Iniciar Partida
          </button>
        </div>
      </form>
    </div>
  );
};

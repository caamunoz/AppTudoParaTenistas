import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Clock, Activity, Share2, BarChart2, Users, Info, Flame, Trophy } from 'lucide-react';
import { TennisMatch } from '../../types/tennisScores';

interface MatchDetailModalProps {
  match: TennisMatch;
  tournamentName: string;
  onClose: () => void;
}

export const MatchDetailModal: React.FC<MatchDetailModalProps> = ({
  match,
  tournamentName,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'summary' | 'stats' | 'h2h' | 'info'>('summary');

  return (
    <div className="absolute inset-0 z-50 bg-slate-900 flex flex-col text-white select-none overflow-hidden">
      {/* Header Estilo SofaScore / 365Scores */}
      <div className="bg-[#0074c7] px-4 py-3 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2.5">
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/20 transition cursor-pointer"
            title="Voltar aos Torneios"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div>
            <span className="text-[10px] text-white/80 uppercase font-semibold tracking-wider block">
              {match.round} &bull; {tournamentName}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white">{match.court}</span>
              <span className="text-[10px] bg-white/20 px-1.5 py-0.2 rounded font-medium">
                Piso: {match.surface}
              </span>
            </div>
          </div>
        </div>

        {match.isLive && (
          <div className="flex items-center gap-1.5 bg-red-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm animate-pulse">
            <span className="w-2 h-2 rounded-full bg-white inline-block"></span>
            <span>AO VIVO</span>
          </div>
        )}
      </div>

      {/* Card Principal do Placar */}
      <div className="bg-gradient-to-b from-[#0074c7] via-slate-900 to-slate-900 p-4 border-b border-slate-800">
        <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-4 shadow-xl">
          {/* Status Bar do Jogo */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-3 pb-2 border-b border-slate-700/50">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              <span>{match.status} {match.statusDetail ? `(${match.statusDetail})` : ''}</span>
            </span>
            <span className="text-[11px] text-slate-400">{match.date} &bull; {match.time}</span>
          </div>

          {/* Jogador 1 */}
          <div className="flex items-center justify-between py-2 border-b border-slate-700/40">
            <div className="flex items-center gap-3">
              <img
                src={match.player1.flagUrl}
                alt={match.player1.country}
                className="w-5 h-3.5 object-cover rounded shadow-xs"
              />
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-white">{match.player1.name}</span>
                {match.player1.ranking && (
                  <span className="text-[10px] text-slate-400 font-mono">#{match.player1.ranking}</span>
                )}
                {match.currentGame?.servingPlayer === 1 && (
                  <span className="w-2 h-2 rounded-full bg-lime-400 shadow-sm shadow-lime-400/50" title="Sacando" />
                )}
              </div>
            </div>

            {/* Sets e Game do Jogador 1 */}
            <div className="flex items-center gap-2 font-mono">
              {match.sets.map((s, idx) => (
                <span
                  key={idx}
                  className={`w-6 h-6 flex items-center justify-center rounded text-xs font-bold ${
                    s.p1 > s.p2 ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'text-slate-400'
                  }`}
                >
                  {s.p1}
                </span>
              ))}
              {match.currentGame && (
                <span className="w-7 h-6 flex items-center justify-center rounded bg-lime-500/20 text-lime-400 border border-lime-500/40 font-bold text-xs">
                  {match.currentGame.p1Points}
                </span>
              )}
              <span className="w-7 h-7 flex items-center justify-center rounded-lg bg-amber-500 text-slate-950 font-black text-sm shadow">
                {match.scoreSets[0]}
              </span>
            </div>
          </div>

          {/* Jogador 2 */}
          <div className="flex items-center justify-between py-2 pt-2.5">
            <div className="flex items-center gap-3">
              <img
                src={match.player2.flagUrl}
                alt={match.player2.country}
                className="w-5 h-3.5 object-cover rounded shadow-xs"
              />
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-white">{match.player2.name}</span>
                {match.player2.ranking && (
                  <span className="text-[10px] text-slate-400 font-mono">#{match.player2.ranking}</span>
                )}
                {match.currentGame?.servingPlayer === 2 && (
                  <span className="w-2 h-2 rounded-full bg-lime-400 shadow-sm shadow-lime-400/50" title="Sacando" />
                )}
              </div>
            </div>

            {/* Sets e Game do Jogador 2 */}
            <div className="flex items-center gap-2 font-mono">
              {match.sets.map((s, idx) => (
                <span
                  key={idx}
                  className={`w-6 h-6 flex items-center justify-center rounded text-xs font-bold ${
                    s.p2 > s.p1 ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'text-slate-400'
                  }`}
                >
                  {s.p2}
                </span>
              ))}
              {match.currentGame && (
                <span className="w-7 h-6 flex items-center justify-center rounded bg-lime-500/20 text-lime-400 border border-lime-500/40 font-bold text-xs">
                  {match.currentGame.p2Points}
                </span>
              )}
              <span className="w-7 h-7 flex items-center justify-center rounded-lg bg-amber-500 text-slate-950 font-black text-sm shadow">
                {match.scoreSets[1]}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Abas de Navegação Estilo 365Scores */}
      <div className="flex border-b border-slate-800 bg-slate-900 px-3">
        <button
          onClick={() => setActiveTab('summary')}
          className={`flex-1 py-2.5 text-xs font-bold border-b-2 transition ${
            activeTab === 'summary'
              ? 'border-blue-500 text-blue-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Resumo
        </button>
        <button
          onClick={() => setActiveTab('stats')}
          className={`flex-1 py-2.5 text-xs font-bold border-b-2 transition ${
            activeTab === 'stats'
              ? 'border-blue-500 text-blue-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Estatísticas
        </button>
        <button
          onClick={() => setActiveTab('h2h')}
          className={`flex-1 py-2.5 text-xs font-bold border-b-2 transition ${
            activeTab === 'h2h'
              ? 'border-blue-500 text-blue-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          H2H
        </button>
        <button
          onClick={() => setActiveTab('info')}
          className={`flex-1 py-2.5 text-xs font-bold border-b-2 transition ${
            activeTab === 'info'
              ? 'border-blue-500 text-blue-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Info
        </button>
      </div>

      {/* Conteúdo da Aba */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {activeTab === 'summary' && (
          <div className="space-y-3">
            <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/60">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Histórico de Pontuação por Sets
              </h4>
              {match.sets.length > 0 ? (
                <div className="space-y-2">
                  {match.sets.map((set, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between text-xs py-1.5 px-3 bg-slate-900/60 rounded-lg"
                    >
                      <span className="text-slate-400">{idx + 1}º Set</span>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-white">
                          {set.p1} - {set.p2}
                        </span>
                        {set.tiebreak && (
                          <span className="text-[10px] text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded">
                            {set.tiebreak}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400">Partida ainda não iniciada.</p>
              )}
            </div>

            {/* Destaque Ao Vivo ou Chave */}
            <div className="bg-blue-950/40 border border-blue-500/30 rounded-xl p-3 text-xs text-blue-200">
              <p className="font-semibold mb-1">📡 Transmissão & Dados em Tempo Real</p>
              <p className="text-[11px] text-blue-300/80">
                Os dados desta tela são alimentados diretamente pelo feed de resultados esportivos oficiais (SofaScore / 365Scores API).
              </p>
            </div>
          </div>
        )}

        {activeTab === 'stats' && match.stats && (
          <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700/60 space-y-4">
            <div className="flex justify-between text-xs font-bold text-slate-300 pb-2 border-b border-slate-700">
              <span>{match.player1.name}</span>
              <span className="text-slate-500 uppercase">Estatística</span>
              <span>{match.player2.name}</span>
            </div>

            {/* Aces */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-white">{match.stats.aces[0]}</span>
                <span className="text-slate-400">Aces</span>
                <span className="text-white">{match.stats.aces[1]}</span>
              </div>
              <div className="w-full bg-slate-700 h-1.5 rounded-full flex overflow-hidden">
                <div
                  className="bg-blue-500 h-full"
                  style={{ width: `${(match.stats.aces[0] / (match.stats.aces[0] + match.stats.aces[1] || 1)) * 100}%` }}
                />
                <div className="bg-amber-500 h-full flex-1" />
              </div>
            </div>

            {/* Duplas Faltas */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-white">{match.stats.doubleFaults[0]}</span>
                <span className="text-slate-400">Duplas Faltas</span>
                <span className="text-white">{match.stats.doubleFaults[1]}</span>
              </div>
            </div>

            {/* 1º Serviço % */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-white">{match.stats.firstServePercentage[0]}%</span>
                <span className="text-slate-400">1º Serviço</span>
                <span className="text-white">{match.stats.firstServePercentage[1]}%</span>
              </div>
            </div>

            {/* Pontos de Break Convertidos */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-white">{match.stats.breakPointsWon[0]}</span>
                <span className="text-slate-400">Break Points</span>
                <span className="text-white">{match.stats.breakPointsWon[1]}</span>
              </div>
            </div>

            {/* Total de Pontos */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-white">{match.stats.totalPointsWon[0]}</span>
                <span className="text-slate-400">Total de Pontos Ganhos</span>
                <span className="text-white">{match.stats.totalPointsWon[1]}</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'h2h' && match.h2h && (
          <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700/60 space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Confronto Direto (Head to Head)
            </h4>
            <div className="flex items-center justify-around py-3 bg-slate-900/60 rounded-xl">
              <div className="text-center">
                <span className="text-2xl font-black text-blue-400">{match.h2h.p1Wins}</span>
                <p className="text-[10px] text-slate-400 font-semibold mt-0.5">{match.player1.name}</p>
              </div>
              <span className="text-xs text-slate-500 font-bold uppercase">Vitórias</span>
              <div className="text-center">
                <span className="text-2xl font-black text-amber-400">{match.h2h.p2Wins}</span>
                <p className="text-[10px] text-slate-400 font-semibold mt-0.5">{match.player2.name}</p>
              </div>
            </div>

            <div className="pt-2">
              <p className="text-[11px] font-semibold text-slate-400 mb-1.5">Últimos Confrontos:</p>
              <ul className="space-y-1 text-xs text-slate-300">
                {match.h2h.lastMatches.map((m, i) => (
                  <li key={i} className="py-1 px-2.5 bg-slate-900/40 rounded flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-500 inline-block" />
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'info' && (
          <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700/60 space-y-3 text-xs">
            <div className="flex justify-between py-1.5 border-b border-slate-700/40">
              <span className="text-slate-400">Torneio:</span>
              <span className="font-semibold text-white">{tournamentName}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-700/40">
              <span className="text-slate-400">Superfície:</span>
              <span className="font-semibold text-white">{match.surface} (Quadra Coberta / Aberta)</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-700/40">
              <span className="text-slate-400">Local e Quadra:</span>
              <span className="font-semibold text-white">{match.court}</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-slate-400">Fase da Competição:</span>
              <span className="font-semibold text-white">{match.round}</span>
            </div>
          </div>
        )}
      </div>

      {/* Botão de Fechar no Rodapé */}
      <div className="p-3 bg-slate-950 border-t border-slate-800 flex justify-center">
        <button
          onClick={onClose}
          className="w-full max-w-xs py-2.5 rounded-xl bg-[#0074c7] hover:bg-[#0065ad] text-white font-bold text-xs uppercase transition shadow cursor-pointer"
        >
          Voltar à Lista de Jogos
        </button>
      </div>
    </div>
  );
};

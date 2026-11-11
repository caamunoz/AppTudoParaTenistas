import React, { useState } from 'react';
import { Users, Swords, Trophy, Calendar, Award } from 'lucide-react';
import { H2HPlayerComparison, RankingLadderPlayer } from '../../types/tennisRankings';

interface H2HTabProps {
  h2hData: H2HPlayerComparison;
  players: RankingLadderPlayer[];
  onChallengeOpponent: (player: RankingLadderPlayer) => void;
}

export const H2HTab: React.FC<H2HTabProps> = ({
  h2hData,
  players,
  onChallengeOpponent,
}) => {
  const [selectedOpponentName, setSelectedOpponentName] = useState('Robin Mello');

  const selectedOpponent =
    players.find((p) => p.name.includes(selectedOpponentName)) || players[2];

  return (
    <div className="w-full flex-1 flex flex-col overflow-y-auto px-3 py-2">
      {/* Subtítulo */}
      <h3 className="text-center text-slate-700 text-sm font-medium mb-3">
        Histórico e Confronto Direto (H2H)
      </h3>

      {/* Seletor de Adversário */}
      <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-3 mb-3">
        <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1.5">
          Comparar com adversário:
        </label>
        <select
          value={selectedOpponentName}
          onChange={(e) => setSelectedOpponentName(e.target.value)}
          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs font-semibold focus:outline-none focus:border-[#0074c7]"
        >
          {players
            .filter((p) => !p.isCurrentUser)
            .map((p) => (
              <option key={p.id} value={p.name}>
                Pos #{p.position} - {p.name} ({p.points} pts)
              </option>
            ))}
        </select>
      </div>

      {/* Card Principal de Confronto */}
      <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-md p-4 mb-4">
        {/* Avatares e Placar H2H */}
        <div className="flex items-center justify-between gap-2 mb-4">
          {/* Você */}
          <div className="flex flex-col items-center flex-1">
            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 border-2 border-[#0074c7] shadow-sm mb-1.5">
              <img
                src={h2hData.player1Photo}
                alt={h2hData.player1Name}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xs font-bold text-slate-800 text-center">Você</span>
            <span className="text-[10px] text-slate-400">Carlos Silva</span>
          </div>

          {/* Placar Central H2H */}
          <div className="flex flex-col items-center justify-center px-2">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-black text-[#0074c7]">
                {h2hData.player1Wins}
              </span>
              <span className="text-sm font-bold text-slate-300">x</span>
              <span className="text-3xl font-black text-[#f5a623]">
                {h2hData.player2Wins}
              </span>
            </div>
            <span className="text-[9px] font-bold tracking-widest uppercase text-slate-400 mt-1">
              Vitórias H2H
            </span>
          </div>

          {/* Adversário */}
          <div className="flex flex-col items-center flex-1">
            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 border-2 border-[#f5a623] shadow-sm mb-1.5">
              <img
                src={selectedOpponent?.photoUrl || h2hData.player2Photo}
                alt={selectedOpponent?.name || h2hData.player2Name}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xs font-bold text-slate-800 text-center truncate max-w-[100px]">
              {selectedOpponent?.name.split(' ')[0] || 'Robin'}
            </span>
            <span className="text-[10px] text-slate-400">
              Posição #{selectedOpponent?.position || 3}
            </span>
          </div>
        </div>

        {/* Barra de Progresso Comparativa */}
        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden flex mb-4">
          <div
            className="h-full bg-[#0074c7] transition-all"
            style={{
              width: `${(h2hData.player1Wins / h2hData.totalMatches) * 100}%`,
            }}
          />
          <div
            className="h-full bg-[#f5a623] transition-all"
            style={{
              width: `${(h2hData.player2Wins / h2hData.totalMatches) * 100}%`,
            }}
          />
        </div>

        {/* Tabela de Métricas Detalhadas */}
        <div className="space-y-2 text-xs border-t border-slate-100 pt-3">
          <div className="flex items-center justify-between text-slate-600">
            <span className="font-bold text-[#0074c7] w-10 text-left">
              {h2hData.player1SetsWon}
            </span>
            <span className="text-slate-500 font-medium text-[11px]">Sets Ganhos</span>
            <span className="font-bold text-[#f5a623] w-10 text-right">
              {h2hData.player2SetsWon}
            </span>
          </div>

          <div className="flex items-center justify-between text-slate-600">
            <span className="font-bold text-[#0074c7] w-10 text-left">
              {h2hData.player1GamesWon}
            </span>
            <span className="text-slate-500 font-medium text-[11px]">Games Ganhos</span>
            <span className="font-bold text-[#f5a623] w-10 text-right">
              {h2hData.player2GamesWon}
            </span>
          </div>

          <div className="flex items-center justify-between text-slate-600">
            <span className="font-bold text-[#0074c7] w-10 text-left">33%</span>
            <span className="text-slate-500 font-medium text-[11px]">Aproveitamento</span>
            <span className="font-bold text-[#f5a623] w-10 text-right">67%</span>
          </div>
        </div>

        {/* Botão para Lançar Novo Desafio */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          <button
            onClick={() => selectedOpponent && onChallengeOpponent(selectedOpponent)}
            className="w-full py-2.5 rounded-full font-bold text-white text-xs bg-[#f5a623] hover:bg-[#e09615] shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Swords className="w-4 h-4" />
            Desafiar {selectedOpponent?.name.split(' ')[0]} Novamente
          </button>
        </div>
      </div>

      {/* Histórico dos Últimos Confrontos */}
      <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-md p-4 mb-4">
        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide mb-3 flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-slate-500" />
          Últimos Confrontos Registrados
        </h4>

        <div className="space-y-2.5">
          {h2hData.recentEncounters.map((enc, idx) => (
            <div
              key={idx}
              className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs flex items-center justify-between"
            >
              <div>
                <div className="font-bold text-slate-800">{enc.tournament}</div>
                <div className="text-[10px] text-slate-400">{enc.date}</div>
              </div>
              <div className="text-right">
                <span className="font-black text-slate-800 text-xs bg-white px-2 py-0.5 rounded border border-slate-200 inline-block mb-0.5">
                  {enc.score}
                </span>
                <div className="text-[9px] font-semibold text-emerald-600 flex items-center gap-1 justify-end">
                  <Award className="w-3 h-3 text-amber-500" />
                  Vitória: {enc.winner.split(' ')[0]}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

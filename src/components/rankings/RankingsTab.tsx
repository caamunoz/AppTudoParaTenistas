import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp, UserPlus } from 'lucide-react';
import { RankingCompetition, RankingLadderPlayer } from '../../types/tennisRankings';

interface RankingsTabProps {
  ranking: RankingCompetition;
  onChallengePlayer: (opponent: RankingLadderPlayer) => void;
}

export const RankingsTab: React.FC<RankingsTabProps> = ({
  ranking,
  onChallengePlayer,
}) => {
  // O accordion começa aberto para exibir a lista completa de acordo com o print I_RANK_LIST_ABRE
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);

  return (
    <div className="w-full flex-1 flex flex-col overflow-y-auto px-3 py-2">
      {/* Subtítulo exato do print H_RANK_LIST */}
      <h3 className="text-center text-slate-700 text-sm font-medium mb-3">
        Rankings que você está participando
      </h3>

      {/* Card Principal do Ranking com Sombra e Borda Macia */}
      <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden transition-all mb-4">
        {/* Cabeçalho do Card: Foto, Posição Atual e Métricas */}
        <div className="p-3">
          <div className="flex items-center justify-between gap-2">
            {/* Foto da Quadra do Clube com Cantos Arredondados */}
            <div className="w-24 h-20 rounded-xl overflow-hidden shrink-0 border border-slate-200 shadow-2xs">
              <img
                src={ranking.clubPhotoUrl}
                alt={ranking.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Posição Atual do Usuário */}
            <div className="flex flex-col items-center justify-center">
              <span className="text-3xl font-extrabold text-slate-700 leading-none">
                {ranking.currentUserPosition}
              </span>
              <span className="text-[10px] text-slate-500 font-medium mt-0.5">
                Sua atual
              </span>
              <span className="mt-1 text-[10px] font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-[#f5a623] text-white shadow-xs">
                POSIÇÃO
              </span>
            </div>

            {/* Colunas de Indicadores com Ícones e Badges */}
            <div className="flex items-center gap-2">
              {/* Jogos */}
              <div className="flex flex-col items-center">
                {/* Ícone 2 tenistas com raquete */}
                <svg
                  className="w-5 h-5 text-slate-500 mb-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <circle cx="7" cy="5" r="2.5" />
                  <path d="M7 10v7m-2 4h4" />
                  <circle cx="17" cy="5" r="2.5" />
                  <path d="M17 10v7m-2 4h4" />
                  <path d="M7 12h10" />
                </svg>
                <span className="text-[10px] text-slate-500 font-medium">Jogos</span>
                <span className="mt-1 w-7 py-0.5 rounded text-center text-white text-[10px] font-bold bg-[#0074c7] shadow-xs">
                  {ranking.totalGames}
                </span>
              </div>

              {/* Vitórias */}
              <div className="flex flex-col items-center">
                {/* Ícone tenista comemorando */}
                <svg
                  className="w-5 h-5 text-slate-500 mb-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <circle cx="12" cy="5" r="2.5" />
                  <path d="M12 10v7m-3 4h6" />
                  <path d="M8 8l4 3 4-3" />
                </svg>
                <span className="text-[10px] text-slate-500 font-medium">Vitórias</span>
                <span className="mt-1 w-7 py-0.5 rounded text-center text-white text-[10px] font-bold bg-[#a3cb53] shadow-xs">
                  {ranking.wins}
                </span>
              </div>

              {/* Derrotas */}
              <div className="flex flex-col items-center">
                {/* Ícone tenista cabisbaixo */}
                <svg
                  className="w-5 h-5 text-slate-500 mb-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <circle cx="12" cy="6" r="2.5" />
                  <path d="M12 11v8" />
                  <path d="M9 13l3 2 3-2" />
                </svg>
                <span className="text-[10px] text-slate-500 font-medium">Derrotas</span>
                <span className="mt-1 w-7 py-0.5 rounded text-center text-white text-[10px] font-bold bg-[#db6c6c] shadow-xs">
                  {ranking.losses}
                </span>
              </div>

              {/* Pontos */}
              <div className="flex flex-col items-center">
                {/* Ícone gráfico */}
                <svg
                  className="w-5 h-5 text-slate-500 mb-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M3 3v18h18" />
                  <path d="M7 14l4-4 4 4 5-7" />
                </svg>
                <span className="text-[10px] text-slate-500 font-medium">Pontos</span>
                <span className="mt-1 px-1.5 py-0.5 rounded text-center text-white text-[10px] font-bold bg-[#334155] shadow-xs">
                  {ranking.points}
                </span>
              </div>
            </div>
          </div>

          {/* Linha Inferior com Nome do Ranking e Botão Chevron Accordion */}
          <div
            onClick={() => setIsAccordionOpen((prev) => !prev)}
            className="flex items-center justify-between pt-2.5 mt-2 border-t border-slate-100 cursor-pointer select-none"
          >
            <span className="text-xs font-bold text-slate-700 tracking-wide uppercase">
              RANKING: {ranking.name}
            </span>
            <button className="text-slate-500 hover:text-slate-800 p-0.5 transition">
              {isAccordionOpen ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Lista Ladder Aberta (Accordion) conforme print I_RANK_LIST_ABRE */}
        <AnimatePresence>
          {isAccordionOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-slate-200 bg-white divide-y divide-slate-100"
            >
              {ranking.players.map((player) => (
                <div
                  key={player.id}
                  className={`p-3 flex items-center justify-between gap-2 transition-colors ${
                    player.isCurrentUser ? 'bg-amber-50/50' : 'hover:bg-slate-50/80'
                  }`}
                >
                  {/* Posição com Badge Amarelo */}
                  <div className="flex flex-col items-center justify-center w-12 shrink-0">
                    <span className="text-2xl font-extrabold text-slate-700 leading-none">
                      {player.position}
                    </span>
                    <span className="mt-1 text-[9px] font-bold tracking-wider px-2 py-0.2 rounded-full bg-[#f5a623] text-white shadow-2xs">
                      POSIÇÃO
                    </span>
                  </div>

                  {/* Foto do Jogador */}
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0 shadow-2xs">
                    <img
                      src={player.photoUrl}
                      alt={player.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Nome, Dias sem jogar e Pontos */}
                  <div className="flex-1 min-w-0 pr-1">
                    <h4 className="text-xs font-bold text-slate-800 truncate">
                      {player.name}
                    </h4>
                    <p className="text-[10px] text-slate-400 font-medium">
                      {player.daysWithoutPlaying === 0
                        ? '(Jogou hoje)'
                        : `(${player.daysWithoutPlaying} dias sem jogar)`}
                    </p>
                    <div className="mt-1 inline-flex items-center gap-1">
                      <span className="px-2 py-0.5 rounded text-white text-[10px] font-bold bg-[#334155] shadow-xs">
                        {player.points}
                      </span>
                      <span className="text-[10px] text-slate-500 font-medium">
                        Pontos
                      </span>
                    </div>
                  </div>

                  {/* Badges de Jogos, Vitórias, Derrotas */}
                  <div className="flex flex-col gap-1 text-[10px] text-slate-600 shrink-0">
                    <div className="flex items-center gap-1">
                      <span className="w-5 py-0.2 rounded text-center text-white text-[9px] font-bold bg-[#0074c7]">
                        {player.games}
                      </span>
                      <span className="text-[10px] text-slate-400">Jogos</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-5 py-0.2 rounded text-center text-white text-[9px] font-bold bg-[#a3cb53]">
                        {player.wins}
                      </span>
                      <span className="text-[10px] text-slate-400">Vitórias</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-5 py-0.2 rounded text-center text-white text-[9px] font-bold bg-[#db6c6c]">
                        {player.losses}
                      </span>
                      <span className="text-[10px] text-slate-400">Derrotas</span>
                    </div>
                  </div>

                  {/* Botão de Desafiar [👤+] (Laranja) - Apenas para outros jogadores */}
                  <div className="w-8 flex items-center justify-center shrink-0">
                    {!player.isCurrentUser && (
                      <button
                        onClick={() => onChallengePlayer(player)}
                        title={`Desafiar ${player.name}`}
                        className="w-8 h-8 rounded-full bg-[#f5a623] hover:bg-[#e09615] text-white flex items-center justify-center shadow-sm active:scale-90 transition cursor-pointer"
                      >
                        <UserPlus className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

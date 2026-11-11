import React from 'react';
import { motion } from 'motion/react';
import { RankingLadderPlayer, RankingCompetition } from '../../types/tennisRankings';

interface ChallengeConfirmModalProps {
  opponent: RankingLadderPlayer;
  ranking: RankingCompetition;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ChallengeConfirmModal: React.FC<ChallengeConfirmModalProps> = ({
  opponent,
  ranking,
  onConfirm,
  onCancel,
}) => {
  const currentPoints = ranking.points;
  const pointsLoseGained = ranking.rules.pointsLoser;
  const pointsWinGained = ranking.rules.pointsWinner;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-[340px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200"
      >
        <div className="p-4 pt-5 pb-5">
          {/* Título do Pop-up */}
          <h3 className="text-center font-bold text-slate-800 text-[17px] mb-4">
            Confirma desafiar ?
          </h3>

          {/* Card Resumo do Adversário Selecionado (fiel ao print J_RANK_DESAFIAR) */}
          <div className="flex items-center gap-3 justify-between bg-slate-50/70 p-2.5 rounded-xl border border-slate-100">
            {/* Foto do Tenista */}
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-200 shrink-0 border border-slate-200 shadow-xs">
              <img
                src={opponent.photoUrl}
                alt={opponent.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Posição no Ranking */}
            <div className="flex flex-col items-center">
              <span className="text-3xl font-extrabold text-slate-700 leading-none">
                {opponent.position}
              </span>
              <span className="mt-1 text-[10px] font-bold tracking-wider px-3 py-0.5 rounded-full bg-[#f5a623] text-white shadow-xs">
                POSIÇÃO
              </span>
            </div>

            {/* Badges de Estatísticas */}
            <div className="flex flex-col gap-1 text-[11px] font-semibold text-slate-600">
              <div className="flex items-center gap-1.5">
                <span className="w-6 py-0.5 rounded text-center text-white text-[10px] font-bold bg-[#0074c7]">
                  {opponent.games}
                </span>
                <span className="text-[11px] font-medium text-slate-500">Jogos</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-6 py-0.5 rounded text-center text-white text-[10px] font-bold bg-[#a3cb53]">
                  {opponent.wins}
                </span>
                <span className="text-[11px] font-medium text-slate-500">Vitórias</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-6 py-0.5 rounded text-center text-white text-[10px] font-bold bg-[#db6c6c]">
                  {opponent.losses}
                </span>
                <span className="text-[11px] font-medium text-slate-500">Derrotas</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-6 py-0.5 rounded text-center text-white text-[10px] font-bold bg-[#334155]">
                  {opponent.points}
                </span>
                <span className="text-[11px] font-medium text-slate-500">Pontos</span>
              </div>
            </div>
          </div>

          {/* Divisor */}
          <hr className="my-4 border-slate-200" />

          {/* Seção: Possíveis Resultados */}
          <div className="text-center">
            <h4 className="text-[12px] font-bold text-slate-500 tracking-wider uppercase mb-3">
              Possíveis Resultados
            </h4>

            <div className="grid grid-cols-2 divide-x divide-slate-200 text-left">
              {/* Coluna: Você Perdendo */}
              <div className="pr-3">
                <div className="text-[11px] font-bold text-slate-600 mb-2">
                  VOCÊ PERDENDO:
                </div>
                <div className="space-y-1.5 text-[11px] text-slate-600 font-medium">
                  <div className="flex items-center justify-between">
                    <span>Pontos atuais</span>
                    <span className="px-2 py-0.5 rounded bg-[#334155] text-white font-bold text-[10px]">
                      {currentPoints}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Pontos ganhará</span>
                    <span className="px-2 py-0.5 rounded bg-[#a3cb53] text-white font-bold text-[10px]">
                      {pointsLoseGained}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Pontos após</span>
                    <span className="px-2 py-0.5 rounded bg-[#334155] text-white font-bold text-[10px]">
                      {currentPoints + pointsLoseGained}
                    </span>
                  </div>
                </div>
              </div>

              {/* Coluna: Você Ganhando */}
              <div className="pl-3">
                <div className="text-[11px] font-bold text-slate-600 mb-2">
                  VOCÊ GANHANDO:
                </div>
                <div className="space-y-1.5 text-[11px] text-slate-600 font-medium">
                  <div className="flex items-center justify-between">
                    <span className="text-right">Pontos atuais</span>
                    <span className="px-2 py-0.5 rounded bg-[#334155] text-white font-bold text-[10px]">
                      {currentPoints}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Pontos ganhará</span>
                    <span className="px-2 py-0.5 rounded bg-[#a3cb53] text-white font-bold text-[10px]">
                      {pointsWinGained}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Pontos após</span>
                    <span className="px-2 py-0.5 rounded bg-[#334155] text-white font-bold text-[10px]">
                      {currentPoints + pointsWinGained}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Botões Não e Sim (Fiel aos botões do print: rounded-full, salmon e lime) */}
          <div className="flex items-center justify-center gap-6 mt-6">
            <button
              onClick={onCancel}
              className="w-24 py-2 rounded-full font-bold text-white text-[13px] bg-[#db6c6c] hover:bg-[#c95b5b] shadow-md transition-all active:scale-95 cursor-pointer"
            >
              Não
            </button>
            <button
              onClick={onConfirm}
              className="w-24 py-2 rounded-full font-bold text-white text-[13px] bg-[#a3cb53] hover:bg-[#8eb840] shadow-md transition-all active:scale-95 cursor-pointer"
            >
              Sim
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

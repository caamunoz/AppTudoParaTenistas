import React, { useState } from 'react';
import { motion } from 'motion/react';
import { RankingChallenge } from '../../types/tennisRankings';

interface ConfirmScoreModalProps {
  challenge: RankingChallenge;
  onConfirm: (score1: number, score2: number) => void;
  onCancel: () => void;
}

export const ConfirmScoreModal: React.FC<ConfirmScoreModalProps> = ({
  challenge,
  onConfirm,
  onCancel,
}) => {
  const [score1, setScore1] = useState<number>(challenge.player1.score ?? 6);
  const [score2, setScore2] = useState<number>(challenge.player2.score ?? 4);

  const handleSave = () => {
    onConfirm(score1, score2);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-[320px] bg-white rounded-2xl shadow-2xl p-5 border border-slate-200"
      >
        <h3 className="text-slate-800 text-[16px] font-bold text-center mb-1">
          Confirmar resultado de jogo
        </h3>

        <div className="text-center mb-4">
          <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
            RANKING
          </span>
          <div className="text-xs font-semibold text-slate-600">
            {challenge.rankingName}
          </div>
        </div>

        {/* Confronto e Fotos com "X" central */}
        <div className="flex items-center justify-center gap-4 my-3">
          {/* Jogador 1 */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shadow-xs mb-2">
              <img
                src={challenge.player1.photoUrl}
                alt={challenge.player1.name}
                className="w-full h-full object-cover"
              />
            </div>
            <input
              type="number"
              min={0}
              max={20}
              value={score1}
              onChange={(e) => setScore1(parseInt(e.target.value) || 0)}
              className="w-14 h-9 rounded-lg border border-slate-300 text-center font-bold text-slate-800 text-base focus:outline-none focus:border-[#0074c7]"
            />
          </div>

          <span className="text-xl font-bold text-slate-500 pb-8">X</span>

          {/* Jogador 2 */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shadow-xs mb-2">
              <img
                src={challenge.player2.photoUrl}
                alt={challenge.player2.name}
                className="w-full h-full object-cover"
              />
            </div>
            <input
              type="number"
              min={0}
              max={20}
              value={score2}
              onChange={(e) => setScore2(parseInt(e.target.value) || 0)}
              className="w-14 h-9 rounded-lg border border-slate-300 text-center font-bold text-slate-800 text-base focus:outline-none focus:border-[#0074c7]"
            />
          </div>
        </div>

        {/* Botões [Não] e [Sim] */}
        <div className="flex items-center justify-center gap-6 mt-6">
          <button
            onClick={onCancel}
            className="w-24 py-2 rounded-full font-bold text-white text-[13px] bg-[#db6c6c] hover:bg-[#c95b5b] shadow-md transition-all active:scale-95 cursor-pointer"
          >
            Não
          </button>
          <button
            onClick={handleSave}
            className="w-24 py-2 rounded-full font-bold text-white text-[13px] bg-[#a3cb53] hover:bg-[#8eb840] shadow-md transition-all active:scale-95 cursor-pointer"
          >
            Sim
          </button>
        </div>
      </motion.div>
    </div>
  );
};

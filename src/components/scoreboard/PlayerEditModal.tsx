import React, { useState } from 'react';
import { motion } from 'motion/react';
import { UserCheck, AlertTriangle, X } from 'lucide-react';
import { ScoreboardMatch } from '../../types/tennisScoreboard';

interface PlayerEditModalProps {
  match: ScoreboardMatch;
  onSaveNames: (p1Name: string, p2Name: string) => void;
  onRetirePlayer: (player: 1 | 2) => void;
  onClose: () => void;
}

export const PlayerEditModal: React.FC<PlayerEditModalProps> = ({
  match,
  onSaveNames,
  onRetirePlayer,
  onClose,
}) => {
  const [p1, setP1] = useState(match.player1Name);
  const [p2, setP2] = useState(match.player2Name);
  const [showRetireConfirm, setShowRetireConfirm] = useState<1 | 2 | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveNames(p1, p2);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-[340px] bg-white rounded-2xl shadow-2xl p-5 border border-slate-200"
      >
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2 text-slate-800 font-bold text-base">
            <UserCheck className="w-5 h-5 text-[#0074c7]" />
            <span>Editar Tenistas / W.O.</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {showRetireConfirm ? (
          <div className="text-center py-2">
            <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-2">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-800 text-sm mb-1">
              Confirmar Desistência (W.O.)?
            </h4>
            <p className="text-xs text-slate-600 mb-4">
              Registrar abandono de{' '}
              <strong>
                {showRetireConfirm === 1 ? match.player1Name : match.player2Name}
              </strong>
              ? A vitória será concedida ao adversário.
            </p>
            <div className="flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => setShowRetireConfirm(null)}
                className="w-24 py-2 rounded-full font-bold text-white text-xs bg-[#db6c6c] hover:bg-[#c95b5b] shadow-md transition"
              >
                Voltar
              </button>
              <button
                type="button"
                onClick={() => {
                  onRetirePlayer(showRetireConfirm);
                  onClose();
                }}
                className="w-24 py-2 rounded-full font-bold text-white text-xs bg-[#a3cb53] hover:bg-[#8eb840] shadow-md transition"
              >
                Confirmar
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Nome do Jogador 1 (P1)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={p1}
                  onChange={(e) => setP1(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg border border-slate-300 text-sm text-slate-800 focus:outline-none focus:border-[#0074c7]"
                />
                <button
                  type="button"
                  onClick={() => setShowRetireConfirm(1)}
                  className="px-2.5 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-lg text-[10px] font-bold transition whitespace-nowrap cursor-pointer"
                  title="Declarar desistência"
                >
                  W.O. / Retire
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Nome do Jogador 2 (P2)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={p2}
                  onChange={(e) => setP2(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg border border-slate-300 text-sm text-slate-800 focus:outline-none focus:border-[#0074c7]"
                />
                <button
                  type="button"
                  onClick={() => setShowRetireConfirm(2)}
                  className="px-2.5 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-lg text-[10px] font-bold transition whitespace-nowrap cursor-pointer"
                  title="Declarar desistência"
                >
                  W.O. / Retire
                </button>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="w-24 py-2 rounded-full font-bold text-white text-xs bg-[#db6c6c] hover:bg-[#c95b5b] shadow-md transition"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="w-24 py-2 rounded-full font-bold text-white text-xs bg-[#a3cb53] hover:bg-[#8eb840] shadow-md transition"
              >
                Salvar
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};

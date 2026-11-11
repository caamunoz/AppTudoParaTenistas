import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeftRight, Check } from 'lucide-react';

interface ChangeoverAlertModalProps {
  onClose: () => void;
}

export const ChangeoverAlertModal: React.FC<ChangeoverAlertModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="w-full max-w-[300px] bg-white rounded-2xl shadow-2xl p-5 border-2 border-[#0074c7] text-center"
      >
        <div className="w-14 h-14 rounded-full bg-blue-50 text-[#0074c7] flex items-center justify-center mx-auto mb-3 border border-blue-200 shadow-inner">
          <ArrowLeftRight className="w-7 h-7" />
        </div>

        <h3 className="text-base font-extrabold text-slate-800 mb-1">
          Troca de Lados!
        </h3>
        <p className="text-xs text-slate-500 mb-5 leading-relaxed">
          Game ímpar concluído. Os tenistas devem trocar de quadra antes de iniciar o próximo game.
        </p>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-full font-bold text-white text-xs bg-[#a3cb53] hover:bg-[#8eb840] shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Check className="w-4 h-4 stroke-[3]" />
          Continuar Partida
        </button>
      </motion.div>
    </div>
  );
};

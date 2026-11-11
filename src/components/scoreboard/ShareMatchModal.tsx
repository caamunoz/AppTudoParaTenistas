import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Share2, Copy, Check, MessageCircle } from 'lucide-react';
import { ScoreboardMatch } from '../../types/tennisScoreboard';
import { useTennisScoreboard } from '../../context/TennisScoreboardContext';

interface ShareMatchModalProps {
  match: ScoreboardMatch;
  onClose: () => void;
}

export const ShareMatchModal: React.FC<ShareMatchModalProps> = ({ match, onClose }) => {
  const { getWhatsAppShareText } = useTennisScoreboard();
  const [copied, setCopied] = useState(false);

  const shareText = getWhatsAppShareText(match);

  const handleShareWhatsApp = () => {
    const encoded = encodeURIComponent(shareText);
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encoded}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCopyText = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-[340px] bg-white rounded-2xl shadow-2xl p-5 border border-slate-200"
      >
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2 text-slate-800 font-bold text-base">
            <Share2 className="w-5 h-5 text-[#0074c7]" />
            <span>Compartilhar Placar</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-slate-500 text-xs mt-2.5 mb-3 leading-relaxed">
          Envie o link do placar e estatísticas em tempo real para pessoas ou grupos de WhatsApp acompanharem a partida:
        </p>

        {/* Pré-visualização da mensagem */}
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 font-mono whitespace-pre-wrap max-h-48 overflow-y-auto mb-4 select-all">
          {shareText}
        </div>

        {/* Botões de Ação */}
        <div className="space-y-2">
          {/* Botão WhatsApp */}
          <button
            onClick={handleShareWhatsApp}
            className="w-full py-2.5 px-4 rounded-xl font-bold text-white text-xs bg-[#25d366] hover:bg-[#20ba5a] shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            Enviar no WhatsApp
          </button>

          {/* Botão Copiar */}
          <button
            onClick={handleCopyText}
            className="w-full py-2.5 px-4 rounded-xl font-bold text-slate-700 text-xs bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700">Copiado para Área de Transferência!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-500" />
                Copiar Texto / Link do Placar
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

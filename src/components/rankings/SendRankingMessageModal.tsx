import React, { useState } from 'react';
import { motion } from 'motion/react';

interface SendRankingMessageModalProps {
  recipientName: string;
  onSend: (message: string) => void;
  onClose: () => void;
}

export const SendRankingMessageModal: React.FC<SendRankingMessageModalProps> = ({
  recipientName,
  onSend,
  onClose,
}) => {
  const [messageText, setMessageText] = useState('');

  const handleSend = () => {
    if (!messageText.trim()) return;
    onSend(messageText);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-[320px] bg-white rounded-2xl shadow-2xl p-5 border border-slate-200"
      >
        <h3 className="text-slate-800 text-lg font-bold mb-1 text-center">
          Enviar Mensagem
        </h3>
        <p className="text-slate-600 text-xs text-center mb-4">
          para: <span className="font-semibold text-slate-800">{recipientName}</span>
        </p>

        <div className="mb-6">
          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Digite sua mensagem"
            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-800 text-sm focus:outline-none focus:border-[#0074c7] focus:ring-1 focus:ring-[#0074c7]"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
          />
        </div>

        {/* Botões alinhados à direita em azul exatamente como no print N_MSG */}
        <div className="flex items-center justify-end gap-5">
          <button
            onClick={onClose}
            className="text-[#0074c7] font-bold text-xs uppercase tracking-wider hover:opacity-80 transition cursor-pointer"
          >
            FECHAR
          </button>
          <button
            onClick={handleSend}
            disabled={!messageText.trim()}
            className="text-[#0074c7] font-bold text-xs uppercase tracking-wider hover:opacity-80 transition disabled:opacity-40 cursor-pointer"
          >
            ENVIAR
          </button>
        </div>
      </motion.div>
    </div>
  );
};

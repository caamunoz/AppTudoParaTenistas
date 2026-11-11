import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Sparkles, ChevronRight, Smartphone } from 'lucide-react';

interface SplashScreenProps {
  onContinue?: () => void;
  autoAdvance?: boolean;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onContinue,
  autoAdvance = false,
}) => {
  const [pulseBalls, setPulseBalls] = useState(true);

  useEffect(() => {
    if (autoAdvance) {
      const timer = setTimeout(() => {
        if (onContinue) onContinue();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [autoAdvance, onContinue]);

  return (
    <div className="relative w-full h-full min-h-screen bg-slate-950 flex flex-col items-center justify-center p-0 md:p-6 select-none overflow-hidden font-sans">
      {/* Background ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#0070c0]/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#0099ff]/20 rounded-full blur-3xl" />
      </div>

      {/* Mobile Screen Container Frame */}
      <div className="relative w-full max-w-[430px] h-[92vh] max-h-[880px] rounded-[36px] overflow-hidden shadow-2xl border-4 border-slate-800 bg-[#0074c7] flex flex-col justify-between">
        {/* Subtle iOS/Android status bar simulator */}
        <div className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center px-6 pt-3 text-white/80 text-xs font-semibold tracking-wider">
          <span>9:41</span>
          <div className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded-full bg-white/70 inline-block" />
            <span className="w-4 h-2 rounded-sm border border-white/70 inline-block" />
          </div>
        </div>

        {/* The Exact Splash Screen Image from user */}
        <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
          <img
            src="/assets/aistudio/01-intro-tela_1a3ab30e.png"
            alt="Tudo Para Tenistas - Tela de Abertura"
            className="w-full h-full object-cover object-center"
          />

          {/* Dynamic interactive glow overlay to bring the court to life */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />

          {/* Action button overlay at bottom */}
          <div className="absolute bottom-8 left-0 right-0 px-6 flex flex-col items-center gap-3 z-20">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onContinue}
              className="w-full py-4 px-6 rounded-2xl bg-white text-[#006bb3] font-bold text-lg shadow-xl shadow-black/30 hover:bg-slate-50 transition-all flex items-center justify-center gap-2 cursor-pointer group"
            >
              <span>Entrar no Aplicativo</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <p className="text-white/80 text-xs tracking-wide uppercase font-medium">
              Tudo Para Tenistas &bull; Versão Reconstruída
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

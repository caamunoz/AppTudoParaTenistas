import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  User,
  Settings,
  Shield,
  HelpCircle,
  Share2,
  ChevronRight,
  Trophy,
  Newspaper,
  GraduationCap,
  ShoppingBag,
  Building2,
  Users,
  MapPin,
  Calendar,
  Medal,
  Activity,
  LogOut,
} from 'lucide-react';
import { TENNIS_MENU_OPTIONS, TennisOption } from '../types/tennisMenu';

interface DrawerMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectOption: (option: TennisOption) => void;
}

export const DrawerMenu: React.FC<DrawerMenuProps> = ({
  isOpen,
  onClose,
  onSelectOption,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="absolute inset-0 z-50 overflow-hidden select-none">
          {/* Backdrop escurecido */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
          />

          {/* Painel Lateral */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 280 }}
            className="absolute top-0 bottom-0 left-0 w-[82%] max-w-[320px] bg-slate-900 text-slate-100 shadow-2xl flex flex-col border-r border-slate-800"
          >
            {/* Cabeçalho do Drawer */}
            <div className="bg-[#0074c7] p-5 pt-8 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/20 border-2 border-white flex items-center justify-center font-bold text-lg text-white">
                  TT
                </div>
                <div>
                  <h2 className="font-bold text-base leading-tight">Tudo para Tenistas</h2>
                  <p className="text-xs text-white/80">Menu Principal</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-white/20 transition-colors text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Lista com as 10 Opções do App */}
            <div className="flex-1 overflow-y-auto p-4 space-y-1">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-3 py-1">
                Serviços e Prática
              </p>

              {TENNIS_MENU_OPTIONS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectOption(item);
                    onClose();
                  }}
                  className="w-full px-3 py-2.5 rounded-xl hover:bg-slate-800/80 transition-colors flex items-center justify-between group cursor-pointer text-left"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-2.5 h-2.5 rounded-full inline-block"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-xs font-medium text-slate-200 group-hover:text-white">
                      {item.title.replace('\n', ' ')}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition-transform group-hover:translate-x-0.5" />
                </button>
              ))}

              <div className="pt-3 pb-1">
                <div className="border-t border-slate-800 my-2" />
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-3 py-1">
                  Conta & Configurações
                </p>
              </div>

              <button
                onClick={onClose}
                className="w-full px-3 py-2.5 rounded-xl hover:bg-slate-800 transition-colors flex items-center gap-3 text-xs text-slate-300"
              >
                <User className="w-4 h-4 text-slate-400" />
                <span>Meu Perfil de Tenista</span>
              </button>

              <button
                onClick={onClose}
                className="w-full px-3 py-2.5 rounded-xl hover:bg-slate-800 transition-colors flex items-center gap-3 text-xs text-slate-300"
              >
                <Settings className="w-4 h-4 text-slate-400" />
                <span>Preferências do Aplicativo</span>
              </button>

              <button
                onClick={onClose}
                className="w-full px-3 py-2.5 rounded-xl hover:bg-slate-800 transition-colors flex items-center gap-3 text-xs text-slate-300"
              >
                <Share2 className="w-4 h-4 text-slate-400" />
                <span>Compartilhar o App</span>
              </button>
            </div>

            {/* Rodapé da Gaveta */}
            <div className="p-4 border-t border-slate-800 bg-slate-950/60 text-center">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">
                Tudo para Tenistas &bull; v2.0
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

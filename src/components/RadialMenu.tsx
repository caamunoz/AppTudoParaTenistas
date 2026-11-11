import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell } from 'lucide-react';
import { TennisBall } from './TennisBall';
import { MenuIcon } from './MenuIcons';
import { TENNIS_MENU_OPTIONS, TennisOption } from '../types/tennisMenu';

interface RadialMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  onSelectOption: (option: TennisOption) => void;
  onOpenNotifications?: () => void;
}

export const RadialMenu: React.FC<RadialMenuProps> = ({
  isOpen,
  onToggle,
  onSelectOption,
  onOpenNotifications,
}) => {
  // Raio do círculo do menu radial (distância da bola aos botões)
  const radius = 138;
  const buttonDiameter = 64;

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between bg-white rounded-[26px] shadow-sm overflow-hidden select-none">
      {/* Notificação no canto superior direito do card branco conforme print */}
      <div className="w-full flex justify-end p-5 z-20">
        <button
          onClick={onOpenNotifications}
          className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
          title="Notificações"
        >
          <Bell className="w-6 h-6 fill-slate-400/30 stroke-[2.2]" />
        </button>
      </div>

      {/* Área Central Interativa com a Bola e os 10 itens radiais */}
      <div className="relative w-full flex-1 flex items-center justify-center -mt-6">
        {/* Itens do Menu Radial */}
        <AnimatePresence>
          {isOpen && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {TENNIS_MENU_OPTIONS.map((item, index) => {
                // Ângulo em graus: 0 no topo (-90° padrão cartesiano), incrementos de 36° (360/10)
                const angleDeg = index * 36 - 90;
                const angleRad = (angleDeg * Math.PI) / 180;
                const targetX = Math.round(Math.cos(angleRad) * radius);
                const targetY = Math.round(Math.sin(angleRad) * radius);

                return (
                  <motion.div
                    key={item.id}
                    initial={{
                      x: 0,
                      y: 0,
                      scale: 0.1,
                      opacity: 0,
                      rotate: -120,
                    }}
                    animate={{
                      x: targetX,
                      y: targetY,
                      scale: 1,
                      opacity: 1,
                      rotate: 0,
                    }}
                    exit={{
                      x: 0,
                      y: 0,
                      scale: 0.1,
                      opacity: 0,
                      rotate: 120,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 260,
                      damping: 20,
                      delay: index * 0.025,
                    }}
                    className="absolute pointer-events-auto z-30"
                  >
                    <motion.button
                      whileHover={{ scale: 1.12, zIndex: 40 }}
                      whileTap={{ scale: 0.94 }}
                      onClick={() => onSelectOption(item)}
                      style={{
                        width: `${buttonDiameter}px`,
                        height: `${buttonDiameter}px`,
                      }}
                      className="rounded-full bg-white shadow-[0_5px_15px_rgba(0,0,0,0.16)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.22)] border border-slate-100/60 flex flex-col items-center justify-center p-1 cursor-pointer transition-shadow"
                      title={item.title.replace('\n', ' ')}
                    >
                      <div className="w-6 h-6 flex items-center justify-center mb-0.5">
                        <MenuIcon type={item.iconType} color={item.color} className="w-5 h-5" />
                      </div>
                      <span className="text-[7.5px] leading-[8.5px] font-bold text-center tracking-tight text-[#444444] whitespace-pre-line uppercase font-sans">
                        {item.title}
                      </span>
                    </motion.button>
                  </motion.div>
                );
              })}
            </div>
          )}
        </AnimatePresence>

        {/* Bola de Tênis Central */}
        <div className="z-10">
          <TennisBall
            isOpen={isOpen}
            onClick={onToggle}
            size={144}
          />
        </div>
      </div>

      {/* Dica / Rodapé sutil de ajuda ao usuário */}
      <div className="w-full pb-6 px-4 text-center z-10">
        <p className="text-xs text-slate-400 font-medium transition-opacity">
          {isOpen
            ? 'Toque na opção desejada ou na bola para fechar'
            : 'Toque na bola de tênis para abrir as opções'}
        </p>
      </div>
    </div>
  );
};

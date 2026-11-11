import React from 'react';
import { motion } from 'motion/react';

interface TennisBallProps {
  isOpen: boolean;
  onClick: () => void;
  size?: number;
}

export const TENNIS_BALL_IMG_URL = '/assets/aistudio/BOLINHA_MENU_e757ff25.png';

export const TennisBall: React.FC<TennisBallProps> = ({ isOpen, onClick, size = 180 }) => {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      animate={{
        rotate: isOpen ? 360 : 0,
        scale: isOpen ? 0.94 : 1,
      }}
      transition={{
        type: 'spring',
        stiffness: 240,
        damping: 18,
      }}
      whileHover={{ scale: isOpen ? 0.96 : 1.05 }}
      whileTap={{ scale: 0.92 }}
      className="relative rounded-full focus:outline-none cursor-pointer select-none group flex items-center justify-center"
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
      title={isOpen ? 'Fechar Menu' : 'Abrir Menu Tudo para Tenistas'}
    >
      {/* Imagem Oficial PNG da Bola de Tênis enviada pelo usuário com fundo transparente */}
      <img
        src={TENNIS_BALL_IMG_URL}
        alt="Bola de Tênis - Menu Principal"
        className="w-full h-full object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.22)] select-none pointer-events-none"
        draggable={false}
      />
    </motion.button>
  );
};

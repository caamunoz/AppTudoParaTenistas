import React from 'react';

interface HomeTennisBallButtonProps {
  onClick?: () => void;
  className?: string;
  size?: number;
  title?: string;
}

export const TENNIS_BALL_IMG_URL = '/assets/aistudio/BOLINHA_MENU_e757ff25.png';

export const HomeTennisBallButton: React.FC<HomeTennisBallButtonProps> = ({
  onClick,
  className = 'w-8 h-8',
  title = 'Voltar para a tela inicial (Menu Bola)',
}) => {
  return (
    <button
      onClick={onClick}
      className={`${className} rounded-full flex items-center justify-center transition active:scale-95 cursor-pointer hover:brightness-105 shrink-0 select-none`}
      title={title}
    >
      <img
        src={TENNIS_BALL_IMG_URL}
        alt="Voltar para Menu Bola"
        className="w-full h-full object-contain drop-shadow-sm select-none pointer-events-none"
        draggable={false}
      />
    </button>
  );
};

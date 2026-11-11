import React from 'react';

interface CourtPinIconProps {
  className?: string;
  isCovered?: boolean;
}

export const CourtPinIcon: React.FC<CourtPinIconProps> = ({
  className = 'w-11 h-12',
}) => {
  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      {/* Quadra de Tênis Isométrica 3D Azul Flutuando no Topo (Exata ao Print 9E) */}
      <div className="relative z-10 w-11 h-6.5 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]">
        <svg
          viewBox="0 0 100 55"
          className="w-full h-full overflow-visible"
        >
          {/* Base da Quadra em Perspectiva Isométrica (Piso Azul Hard Court) */}
          <polygon
            points="50,2 96,24 50,52 4,28"
            fill="#0f52ba"
            stroke="#0a3c8a"
            strokeWidth="2.5"
          />

          {/* Margens Externas / Área de Escape (Tom azul mais escuro) */}
          <polygon
            points="50,7 88,25 50,47 12,28"
            fill="#1565c0"
          />

          {/* Linhas Brancas da Quadra de Tênis */}
          {/* Linha de Base e Laterais de Duplas */}
          <polygon
            points="50,11 82,26 50,43 18,28"
            fill="#1e88e5"
            stroke="#ffffff"
            strokeWidth="1.8"
          />

          {/* Linha de Simples */}
          <polygon
            points="50,14 76,26 50,40 24,28"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.2"
            opacity="0.9"
          />

          {/* Linha da Rede (Central) */}
          <line
            x1="32"
            y1="34"
            x2="68"
            y2="19"
            stroke="#ffffff"
            strokeWidth="2.4"
          />
          {/* Detalhe da Rede em Perspectiva */}
          <line
            x1="32"
            y1="33"
            x2="68"
            y2="18"
            stroke="#000000"
            strokeWidth="0.8"
            strokeDasharray="1.5,1"
          />

          {/* Linhas de Saque e Centro */}
          <line
            x1="41"
            y1="23"
            x2="59"
            y2="31"
            stroke="#ffffff"
            strokeWidth="1.2"
          />
        </svg>
      </div>

      {/* Pin Vermelho Apontando para o Ponto Exato do Mapa (Abaixo da Quadra) */}
      <div className="-mt-3.5 z-0 flex flex-col items-center">
        <svg
          viewBox="0 0 32 38"
          className="w-7 h-8 drop-shadow-md"
        >
          <path
            d="M16,0 C7.16,0 0,7.16 0,16 C0,25 16,38 16,38 C16,38 32,25 32,16 C32,7.16 24.84,0 16,0 Z"
            fill="#cc1111"
          />
          <circle cx="16" cy="14" r="5" fill="#880000" opacity="0.6" />
        </svg>

        {/* Sombra no Chão */}
        <div className="w-4 h-1.5 bg-black/35 rounded-full blur-[0.8px] -mt-1" />
      </div>
    </div>
  );
};

export const UserCourtLocationPin: React.FC = () => {
  return (
    <div className="relative flex flex-col items-center select-none w-9 h-11">
      {/* Marcador Vermelho com Bolinha de Tênis Verde Dentro (Exato ao Print 9E) */}
      <svg
        viewBox="0 0 36 44"
        className="w-full h-full drop-shadow-lg"
      >
        {/* Formato do Marcador Gota */}
        <path
          d="M18,0 C8.06,0 0,8.06 0,18 C0,28.5 18,44 18,44 C18,44 36,28.5 36,18 C36,8.06 27.94,0 18,0 Z"
          fill="#b71c1c"
          stroke="#ffffff"
          strokeWidth="1.5"
        />

        {/* Bolinha de Tênis Verde Amarelada no Centro */}
        <circle cx="18" cy="17" r="11" fill="#b8d234" />

        {/* Costuras Brancas da Bola de Tênis */}
        <path
          d="M 14 9 C 11 14 11 20 14 25"
          stroke="#ffffff"
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 22 9 C 25 14 25 20 22 25"
          stroke="#ffffff"
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      {/* Sombra no Chão */}
      <div className="w-3.5 h-1.5 bg-black/30 rounded-full blur-[0.8px] -mt-0.5" />
    </div>
  );
};

import React from 'react';

interface IconProps {
  color: string;
  className?: string;
}

export const MenuIcon: React.FC<{ type: string; color: string; className?: string }> = ({
  type,
  color,
  className = 'w-6 h-6',
}) => {
  switch (type) {
    case 'torneios_atp':
      // Troféu
      return (
        <svg viewBox="0 0 48 48" className={className} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 8h20v14a10 10 0 0 1-20 0V8z" />
          <path d="M14 12H7a4 4 0 0 0-4 4v2a8 8 0 0 0 8 8h3" />
          <path d="M34 12h7a4 4 0 0 1 4 4v2a8 8 0 0 1-8 8h-3" />
          <path d="M24 32v8" />
          <path d="M16 40h16" />
        </svg>
      );

    case 'noticias':
      // Jornal com NEWS e linhas
      return (
        <svg viewBox="0 0 48 48" className={className} fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <rect x="6" y="8" width="36" height="32" rx="2" />
          <rect x="12" y="14" width="24" height="7" rx="1" fill={color} fillOpacity="0.1" />
          <text x="24" y="19.5" fill={color} fontSize="6" fontWeight="bold" textAnchor="middle" stroke="none" fontFamily="sans-serif">
            NEWS
          </text>
          <line x1="12" y1="26" x2="36" y2="26" />
          <line x1="12" y1="31" x2="36" y2="31" />
          <line x1="12" y1="36" x2="26" y2="36" />
        </svg>
      );

    case 'professores':
      // Dois tenistas com raquete (professor e aluno)
      return (
        <svg viewBox="0 0 48 48" className={className} fill="none" stroke={color} strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
          {/* Pessoa 1 */}
          <circle cx="15" cy="11" r="3.5" />
          <path d="M15 15v11" />
          <path d="M10 18l5 3 5-3" />
          <path d="M15 26l-4 11" />
          <path d="M15 26l4 11" />
          <circle cx="23" cy="13" r="2.5" />
          <line x1="20" y1="15" x2="19" y2="18" />

          {/* Pessoa 2 */}
          <circle cx="33" cy="11" r="3.5" />
          <path d="M33 15v11" />
          <path d="M28 18l5 3 5-3" />
          <path d="M33 26l-4 11" />
          <path d="M33 26l4 11" />
          <circle cx="39" cy="27" r="2.5" />
          <line x1="37" y1="25" x2="36" y2="21" />
        </svg>
      );

    case 'lojas':
      // Carrinho de compras com raquete de tênis
      return (
        <svg viewBox="0 0 48 48" className={className} fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          {/* Carrinho */}
          <path d="M6 10h6l4 18h20l4-14H14" />
          <circle cx="19" cy="34" r="2.5" fill={color} />
          <circle cx="33" cy="34" r="2.5" fill={color} />
          {/* Raquete dentro */}
          <ellipse cx="29" cy="15" rx="5" ry="6" transform="rotate(25 29 15)" />
          <line x1="25" y1="20" x2="21" y2="26" />
        </svg>
      );

    case 'hoteis':
      // Edifício hotel + quadra em perspectiva
      return (
        <svg viewBox="0 0 48 48" className={className} fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          {/* Prédio com janelas em grade */}
          <rect x="11" y="9" width="26" height="18" rx="1" />
          <line x1="16" y1="14" x2="19" y2="14" />
          <line x1="23" y1="14" x2="26" y2="14" />
          <line x1="29" y1="14" x2="32" y2="14" />
          <line x1="16" y1="19" x2="19" y2="19" />
          <line x1="23" y1="19" x2="26" y2="19" />
          <line x1="29" y1="19" x2="32" y2="19" />
          <line x1="16" y1="24" x2="19" y2="24" />
          <line x1="23" y1="24" x2="26" y2="24" />
          <line x1="29" y1="24" x2="32" y2="24" />
          {/* Quadra em perspectiva abaixo */}
          <path d="M7 39l5-10h24l5 10H7z" />
          <line x1="24" y1="29" x2="24" y2="39" />
          <line x1="13" y1="34" x2="35" y2="34" />
        </svg>
      );

    case 'encontrar_tenista':
      // Dois tenistas se cumprimentando com raquetes
      return (
        <svg viewBox="0 0 48 48" className={className} fill="none" stroke={color} strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
          {/* Tenista Esquerda */}
          <circle cx="16" cy="12" r="3.5" />
          <path d="M16 16v11" />
          <path d="M16 27l-4 12" />
          <path d="M16 27l4 12" />
          <path d="M16 18l8 5" /> {/* Braço aperto de mão */}
          <path d="M16 18l-5 4" />
          <circle cx="9" cy="24" r="2.5" />

          {/* Tenista Direita */}
          <circle cx="32" cy="12" r="3.5" />
          <path d="M32 16v11" />
          <path d="M32 27l-4 12" />
          <path d="M32 27l4 12" />
          <path d="M32 18l-8 5" /> {/* Braço aperto de mão */}
          <path d="M32 18l5 4" />
          <circle cx="39" cy="24" r="2.5" />
        </svg>
      );

    case 'encontrar_quadras':
      // Pino de localização com bolinha de tênis e quadra
      return (
        <svg viewBox="0 0 48 48" className={className} fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          {/* Pino com bola */}
          <path d="M24 7c-4.4 0-8 3.6-8 8 0 6 8 13 8 13s8-7 8-13c0-4.4-3.6-8-8-8z" />
          <circle cx="24" cy="15" r="3" />
          {/* Quadra em perspectiva */}
          <path d="M8 41l6-11h20l6 11H8z" />
          <line x1="24" y1="30" x2="24" y2="41" />
          <line x1="14" y1="35.5" x2="34" y2="35.5" />
        </svg>
      );

    case 'encontrar_torneios':
      // Calendário com lupa e troféu dentro
      return (
        <svg viewBox="0 0 48 48" className={className} fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          {/* Calendário */}
          <rect x="9" y="10" width="30" height="28" rx="2" />
          <line x1="9" y1="17" x2="39" y2="17" />
          <line x1="16" y1="7" x2="16" y2="12" />
          <line x1="24" y1="7" x2="24" y2="12" />
          <line x1="32" y1="7" x2="32" y2="12" />
          {/* Grade dias */}
          <line x1="16" y1="23" x2="18" y2="23" />
          <line x1="23" y1="23" x2="25" y2="23" />
          <line x1="30" y1="23" x2="32" y2="23" />
          <line x1="30" y1="28" x2="32" y2="28" />
          <line x1="30" y1="33" x2="32" y2="33" />
          {/* Lupa sobreposta com troféu */}
          <circle cx="21" cy="28" r="7" fill="white" />
          <circle cx="21" cy="28" r="7" />
          <line x1="16" y1="33" x2="12" y2="37" strokeWidth="3" />
          {/* Mini troféu na lupa */}
          <path d="M19 25h4v3a2 2 0 0 1-4 0v-3z" strokeWidth="1.8" />
          <line x1="21" y1="30" x2="21" y2="32" strokeWidth="1.8" />
        </svg>
      );

    case 'rankings':
      // Pódio 3 posições com pessoas erguendo troféu
      return (
        <svg viewBox="0 0 48 48" className={className} fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          {/* Pódio */}
          <rect x="18" y="22" width="12" height="19" />
          <rect x="7" y="28" width="11" height="13" />
          <rect x="30" y="31" width="11" height="10" />
          {/* Vencedor 1 (centro) */}
          <circle cx="24" cy="9" r="2.8" />
          <path d="M24 12v6" />
          <path d="M20 14l4 2 4-2" />
          <circle cx="24" cy="7" r="1.5" fill={color} />
          {/* 2º lugar (esquerda) */}
          <circle cx="12.5" cy="15" r="2.5" />
          <path d="M12.5 18v6" />
          <path d="M9 20l3.5 2 3.5-2" />
          {/* 3º lugar (direita) */}
          <circle cx="35.5" cy="18" r="2.5" />
          <path d="M35.5 21v6" />
          <path d="M32 23l3.5 2 3.5-2" />
        </svg>
      );

    case 'marcador':
      // Placar digital com 4 quadrantes (1 SET / 15 GAME / 0 / 40)
      return (
        <svg viewBox="0 0 48 48" className={className} fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="8" y="9" width="32" height="30" rx="2" />
          <line x1="24" y1="9" x2="24" y2="39" />
          <line x1="8" y1="24" x2="40" y2="24" />
          {/* Valores estilizados no placar */}
          <text x="16" y="18" fill={color} fontSize="7" fontWeight="bold" textAnchor="middle" stroke="none" fontFamily="monospace">
            1
          </text>
          <text x="16" y="22" fill={color} fontSize="3" textAnchor="middle" stroke="none" fontFamily="sans-serif">
            SET
          </text>
          <text x="32" y="18" fill={color} fontSize="6" fontWeight="bold" textAnchor="middle" stroke="none" fontFamily="monospace">
            15
          </text>
          <text x="32" y="22" fill={color} fontSize="3" textAnchor="middle" stroke="none" fontFamily="sans-serif">
            GAME
          </text>
          <text x="16" y="34" fill={color} fontSize="7" fontWeight="bold" textAnchor="middle" stroke="none" fontFamily="monospace">
            0
          </text>
          <text x="32" y="34" fill={color} fontSize="7" fontWeight="bold" textAnchor="middle" stroke="none" fontFamily="monospace">
            40
          </text>
        </svg>
      );

    default:
      return null;
  }
};

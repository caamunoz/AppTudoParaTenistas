import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { NotificationsModal } from './common/NotificationsModal';
import { HomeTennisBallButton } from './common/HomeTennisBallButton';

interface HeaderProps {
  onToggleDrawer?: () => void;
  onGoHome?: () => void;
  title?: string;
  unreadCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleDrawer,
  onGoHome,
  title = 'Tudo para Tenistas',
  unreadCount = 3,
}) => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  return (
    <>
      <div className="w-full bg-[#0074c7] select-none">
        {/* Android Status Bar */}
        <div className="w-full px-3.5 pt-1.5 pb-1 flex justify-between items-center text-white text-[11px] font-medium tracking-tight">
          <div className="flex items-center gap-1.5">
            <span>17:37</span>
            <span className="text-[10px]">💬</span>
            <span className="text-[10px]">📍</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="flex items-end gap-[1.5px] h-2.5">
              <span className="w-[2px] h-1 bg-white inline-block"></span>
              <span className="w-[2px] h-1.5 bg-white inline-block"></span>
              <span className="w-[2px] h-2 bg-white inline-block"></span>
              <span className="w-[2px] h-2.5 bg-white inline-block"></span>
            </div>
            <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 4C7.31 4 3.07 5.9 0 8.98L12 21 24 8.98C20.93 5.9 16.69 4 12 4zm0 3.5c3.67 0 7.02 1.34 9.61 3.56L12 19.34 2.39 11.06C4.98 8.84 8.33 7.5 12 7.5z" />
            </svg>
            <div className="w-4 h-2 border border-white rounded-[2px] p-[1px] flex items-center relative">
              <div className="w-full h-full bg-white rounded-[1px]"></div>
            </div>
          </div>
        </div>

        {/* Main App Bar */}
        <div className="w-full px-4 py-2.5 flex items-center justify-between">
          {/* Hambúrguer amarelo */}
          <button
            onClick={onToggleDrawer}
            className="p-1 rounded hover:bg-white/10 transition flex flex-col gap-[4px] cursor-pointer focus:outline-none"
            title="Menu Principal"
          >
            <span className="w-6 h-[3.5px] bg-[#ffb703] rounded-full inline-block shadow-xs"></span>
            <span className="w-6 h-[3.5px] bg-[#ffb703] rounded-full inline-block shadow-xs"></span>
            <span className="w-6 h-[3.5px] bg-[#ffb703] rounded-full inline-block shadow-xs"></span>
          </button>

          {/* Título Central */}
          <h1 className="text-white font-medium text-[17px] tracking-wide text-center truncate max-w-[210px]">
            {title}
          </h1>

          {/* Lado Direito: Sino com Badge (no lugar das raquetes cruzadas) + Bolinha de Tênis */}
          <div className="flex items-center gap-2.5">
            {/* Ícone de Sino com Badge de Notificação */}
            <button
              onClick={() => setIsNotificationsOpen(true)}
              className="relative p-1.5 text-white hover:bg-white/15 rounded-full transition cursor-pointer"
              title="Notificações e Avisos"
            >
              <Bell className="w-5 h-5 fill-white/20 stroke-[2.2]" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white font-black text-[9px] rounded-full flex items-center justify-center border-2 border-[#0074c7] shadow-sm animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Bolinha de Tênis PNG (Volta para a Tela Inicial / Bola Grande) */}
            <HomeTennisBallButton onClick={onGoHome} className="w-7 h-7" />
          </div>
        </div>
      </div>

      {/* Modal de Notificações com Badge */}
      {isNotificationsOpen && (
        <NotificationsModal onClose={() => setIsNotificationsOpen(false)} />
      )}
    </>
  );
};

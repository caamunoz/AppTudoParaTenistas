import React from 'react';
import { motion } from 'motion/react';
import { X, Bell, MessageSquare, Trophy, CheckCircle2, ShieldAlert, Calendar } from 'lucide-react';

export interface AppNotification {
  id: string;
  type: 'chat' | 'challenge' | 'system' | 'match_confirm';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

interface NotificationsModalProps {
  onClose: () => void;
  onOpenChatWithPlayer?: (playerName: string) => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  onClose,
  onOpenChatWithPlayer,
}) => {
  const notifications: AppNotification[] = [
    {
      id: 'notif-1',
      type: 'chat',
      title: 'Convite para Jogar!',
      message: 'Robin Mello enviou uma mensagem: "E aí, tudo bem? Vi que você joga por aqui, topa bater uma bola neste sábado?"',
      time: 'Há 5 minutos',
      read: false,
    },
    {
      id: 'notif-2',
      type: 'challenge',
      title: 'Desafio de Ranking!',
      message: 'Carlos Eduardo te desafiou pelo Ranking da Zona Leste. Aceitar o confronto?',
      time: 'Há 1 hora',
      read: false,
    },
    {
      id: 'notif-3',
      type: 'match_confirm',
      title: 'Placar a Confirmar',
      message: 'Jogo de ontem contra Marcos Silva registrado como 6/4 7/5. Clique para validar o resultado.',
      time: 'Hoje às 09:30',
      read: false,
    },
    {
      id: 'notif-4',
      type: 'system',
      title: 'Novidades do Tudo para Tenistas',
      message: 'Novas quadras de saibro e professores foram adicionados na sua região!',
      time: 'Ontem',
      read: true,
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'chat':
        return <MessageSquare className="w-4 h-4 text-emerald-500" />;
      case 'challenge':
        return <Trophy className="w-4 h-4 text-amber-500" />;
      case 'match_confirm':
        return <CheckCircle2 className="w-4 h-4 text-blue-500" />;
      default:
        return <Bell className="w-4 h-4 text-purple-500" />;
    }
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-xs select-none">
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 15 }}
        className="w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[82vh]"
      >
        {/* Header com Azul */}
        <div className="bg-[#0074c7] px-4 py-3.5 flex items-center justify-between text-white shadow-xs">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
              <Bell className="w-4 h-4 fill-white" />
            </div>
            <div>
              <h3 className="font-bold text-sm tracking-wide">Notificações</h3>
              <p className="text-[10px] text-white/80">Mensagens, desafios e avisos</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/20 transition text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Lista de Notificações */}
        <div className="p-3 divide-y divide-slate-100 overflow-y-auto flex-1">
          {notifications.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                if (item.type === 'chat' && onOpenChatWithPlayer) {
                  onOpenChatWithPlayer('Robin Mello');
                  onClose();
                }
              }}
              className={`p-3 rounded-xl transition cursor-pointer flex gap-3 items-start ${
                !item.read ? 'bg-blue-50/50 hover:bg-blue-50' : 'hover:bg-slate-50'
              }`}
            >
              <div className="p-2 rounded-xl bg-white shadow-2xs border border-slate-100 shrink-0 mt-0.5">
                {getIcon(item.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-1 mb-0.5">
                  <h4 className="text-xs font-bold text-slate-800 leading-tight">
                    {item.title}
                  </h4>
                  <span className="text-[10px] text-slate-400 whitespace-nowrap font-medium">
                    {item.time}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 leading-snug line-clamp-2">
                  {item.message}
                </p>
                {!item.read && (
                  <span className="inline-block mt-1 w-1.5 h-1.5 rounded-full bg-blue-600" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Rodapé */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
          <button
            onClick={onClose}
            className="text-xs text-[#0074c7] font-bold hover:underline cursor-pointer"
          >
            Fechar Notificações
          </button>
        </div>
      </motion.div>
    </div>
  );
};

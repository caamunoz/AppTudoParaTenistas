import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Trophy,
  Calendar,
  Clock,
  GitBranch,
  RefreshCw,
  Search,
  Bell,
} from 'lucide-react';
import { INITIAL_TOURNAMENTS } from '../../data/mockTennisScores';
import { TennisMatch, TournamentGroup } from '../../types/tennisScores';
import { MatchDetailModal } from './MatchDetailModal';
import { NotificationsModal } from '../common/NotificationsModal';
import { HomeTennisBallButton } from '../common/HomeTennisBallButton';

interface AtpWtaScreenProps {
  onBackToMenu: () => void;
  onToggleDrawer?: () => void;
}

export const AtpWtaScreen: React.FC<AtpWtaScreenProps> = ({
  onBackToMenu,
  onToggleDrawer,
}) => {
  const [tournaments, setTournaments] = useState<TournamentGroup[]>(INITIAL_TOURNAMENTS);
  const [isLiveOnly, setIsLiveOnly] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string>('12/11/2019');
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);
  const [selectedMatch, setSelectedMatch] = useState<{
    match: TennisMatch;
    tournamentName: string;
  } | null>(null);

  // Filtragem
  const filteredTournaments = tournaments
    .map((t) => {
      const matches = t.matches.filter((m) => {
        if (isLiveOnly) return m.isLive;
        return true;
      });
      return { ...t, matches };
    })
    .filter((t) => t.matches.length > 0);

  const handleNextDate = () => {
    setSelectedDate((prev) => (prev === '12/11/2019' ? 'Hoje (Ao Vivo)' : '12/11/2019'));
  };

  const handlePrevDate = () => {
    setSelectedDate((prev) => (prev === '12/11/2019' ? '11/11/2019' : '12/11/2019'));
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-[#0074c7] select-none overflow-hidden">
      {/* Android Status Bar */}
      <div className="w-full bg-[#0074c7] px-3.5 pt-1.5 pb-1 flex justify-between items-center text-white text-[11px] font-medium tracking-tight">
        <div className="flex items-center gap-1.5">
          <span>17:39</span>
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
        </div>
      </div>

      {/* App Bar Principal */}
      <div className="w-full bg-[#0074c7] px-4 py-2 flex items-center justify-between">
        {/* Hambúrguer amarelo */}
        <button
          onClick={onToggleDrawer || onBackToMenu}
          className="p-1 rounded hover:bg-white/10 transition flex flex-col gap-[4px] cursor-pointer"
          title="Menu"
        >
          <span className="w-6 h-[3.5px] bg-[#ffb703] rounded-full inline-block"></span>
          <span className="w-6 h-[3.5px] bg-[#ffb703] rounded-full inline-block"></span>
          <span className="w-6 h-[3.5px] bg-[#ffb703] rounded-full inline-block"></span>
        </button>

        {/* Título */}
        <h1 className="text-white font-medium text-[17px] tracking-wide">
          Torneios ATP/WTA
        </h1>

        {/* Sino com Badge de Notificação + Bolinha de Tênis Verde */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsNotificationsOpen(true)}
            className="relative p-1.5 text-white hover:bg-white/15 rounded-full transition cursor-pointer"
            title="Notificações e Avisos"
          >
            <Bell className="w-5 h-5 fill-white/20 stroke-[2.2]" />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white font-black text-[9px] rounded-full flex items-center justify-center border-2 border-[#0074c7] shadow-sm animate-pulse">
              3
            </span>
          </button>

          <HomeTennisBallButton onClick={onBackToMenu} className="w-7 h-7" />
        </div>
      </div>

      {/* Card Branco Central com Rolagem */}
      <div className="flex-1 p-2 pt-0 pb-2.5 flex flex-col overflow-hidden bg-gradient-to-b from-[#0074c7] to-[#0094f7]">
        <div className="w-full h-full bg-white rounded-[24px] shadow-sm overflow-hidden flex flex-col relative">
          
          {/* Barra Amarela Superior com Controles e Filtros do Print */}
          <div className="w-full bg-[#f4b600] px-3 py-2 flex items-center justify-between shadow-xs z-10">
            {/* Ícone de bola / filtro à esquerda */}
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#cadb38] border border-white/80 flex items-center justify-center shadow-xs">
                <span className="w-3 h-3 rounded-full border border-white/90"></span>
              </div>

              {/* Toggle Switch "Ao Vivo" com Switch visual */}
              <div
                onClick={() => setIsLiveOnly(!isLiveOnly)}
                className="flex items-center gap-1.5 cursor-pointer bg-[#e0a400] px-2 py-1 rounded-md"
              >
                <div
                  className={`w-8 h-4 rounded-full p-0.5 transition-colors flex items-center ${
                    isLiveOnly ? 'bg-red-500 justify-end' : 'bg-slate-300 justify-start'
                  }`}
                >
                  <motion.div layout className="w-3 h-3 rounded-full bg-white shadow-xs" />
                </div>
                <span className="text-white text-xs font-bold tracking-tight">Ao Vivo</span>
              </div>
            </div>

            {/* Ícone de Troféu Branco */}
            <button
              onClick={() => setIsLiveOnly(false)}
              className="w-7 h-7 bg-white rounded-md flex items-center justify-center text-[#f4b600] shadow-xs hover:bg-slate-50 transition cursor-pointer"
              title="Todos os Torneios"
            >
              <Trophy className="w-4 h-4 text-[#f4b600] stroke-[2.4]" />
            </button>

            {/* Seletor de Data com Setas */}
            <div className="flex items-center bg-white rounded-md px-2 py-1 shadow-xs text-[#333333] text-xs font-bold gap-1.5">
              <button
                onClick={handlePrevDate}
                className="hover:text-amber-600 transition cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5 stroke-[3]" />
              </button>
              <span className="text-[11px] font-mono tracking-tight">{selectedDate}</span>
              <button
                onClick={handleNextDate}
                className="hover:text-amber-600 transition cursor-pointer"
              >
                <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
              </button>
              <ChevronDown className="w-3.5 h-3.5 text-white fill-white ml-0.5" />
            </div>
          </div>

          {/* Lista com os Torneios e Jogos */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {filteredTournaments.length === 0 ? (
              <div className="p-8 text-center text-slate-400">
                <Trophy className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                <p className="text-sm font-semibold">Nenhuma partida ao vivo no momento.</p>
                <button
                  onClick={() => setIsLiveOnly(false)}
                  className="mt-3 px-4 py-1.5 bg-[#0074c7] text-white text-xs rounded-full font-bold cursor-pointer"
                >
                  Ver Todas as Partidas
                </button>
              </div>
            ) : (
              filteredTournaments.map((tournament) => (
                <div key={tournament.id} className="w-full">
                  {/* Cabeçalho do Torneio (Barra Verde-Oliva Claro / Verde-Limão #adc93f) */}
                  <div className="bg-[#adc93f] px-3 py-2 flex items-center justify-between text-[#243508]">
                    <div className="flex items-center gap-2 overflow-hidden">
                      {/* Bandeira do País */}
                      <img
                        src={tournament.flagUrl}
                        alt={tournament.country}
                        className="w-6 h-4 object-cover border border-white/60 shadow-xs rounded-[2px]"
                      />

                      {/* Ícone Redondo Azul de Simples / Duplas */}
                      <div className="w-5 h-5 rounded-full bg-[#0074c7] text-white flex items-center justify-center shrink-0">
                        {tournament.isDoubles ? (
                          <span className="text-[9px] font-bold">👥</span>
                        ) : (
                          <span className="text-[9px] font-bold">👤</span>
                        )}
                      </div>

                      {/* Nome do Torneio */}
                      <h3 className="font-bold text-xs truncate tracking-tight text-[#1e2f03]">
                        {tournament.name}
                      </h3>
                    </div>

                    {/* Ícone de Calendário / Chaveamento à Direita */}
                    <div className="w-6 h-6 rounded-md border border-white/80 flex items-center justify-center bg-white/20 text-white shrink-0">
                      {tournament.category === 'Challenger' ? (
                        <GitBranch className="w-3.5 h-3.5" />
                      ) : (
                        <Calendar className="w-3.5 h-3.5" />
                      )}
                    </div>
                  </div>

                  {/* Partidas deste Torneio */}
                  <div className="divide-y divide-slate-100 bg-white">
                    {tournament.matches.map((match) => (
                      <div
                        key={match.id}
                        onClick={() => setSelectedMatch({ match, tournamentName: tournament.name })}
                        className="p-3 hover:bg-slate-50 transition cursor-pointer group"
                      >
                        {/* Linha Superior: Horário + Status + Rótulo "Set" */}
                        <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1.5 font-medium">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-slate-400 font-semibold">{match.time}</span>
                            <span
                              className={`font-semibold ${
                                match.isLive
                                  ? 'text-red-600 bg-red-50 px-1.5 py-0.5 rounded font-bold animate-pulse'
                                  : 'text-slate-600'
                              }`}
                            >
                              {match.status}
                            </span>
                          </div>
                          <span className="text-[11px] text-slate-400 font-semibold mr-1">Set</span>
                        </div>

                        {/* Jogador 1 */}
                        <div className="flex items-center justify-between py-1">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={match.player1.flagUrl}
                              alt={match.player1.country}
                              className="w-5 h-3.5 object-cover rounded-[1px] shadow-xs"
                            />
                            <span className="text-[13px] font-bold text-slate-800 tracking-tight group-hover:text-blue-700 transition-colors">
                              {match.player1.name}
                            </span>
                          </div>

                          {/* Placar em Set */}
                          <div
                            className={`w-6 h-5 rounded flex items-center justify-center text-xs font-bold ${
                              match.scoreSets[0] > match.scoreSets[1]
                                ? 'bg-[#f49e0b] text-white shadow-xs'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {match.scoreSets[0]}
                          </div>
                        </div>

                        {/* Jogador 2 */}
                        <div className="flex items-center justify-between py-1">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={match.player2.flagUrl}
                              alt={match.player2.country}
                              className="w-5 h-3.5 object-cover rounded-[1px] shadow-xs"
                            />
                            <span className="text-[13px] font-bold text-slate-800 tracking-tight group-hover:text-blue-700 transition-colors">
                              {match.player2.name}
                            </span>
                          </div>

                          {/* Placar em Set */}
                          <div
                            className={`w-6 h-5 rounded flex items-center justify-center text-xs font-bold ${
                              match.scoreSets[1] > match.scoreSets[0]
                                ? 'bg-[#f49e0b] text-white shadow-xs'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {match.scoreSets[1]}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Banner de Livescore no Rodapé do Print */}
          <div className="w-full bg-slate-900 text-white p-2.5 flex items-center justify-between border-t border-slate-200">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-red-600 flex items-center justify-center font-black text-sm text-white">
                E
              </div>
              <div>
                <p className="text-[11px] font-bold leading-tight">The ultimate livescore experience</p>
                <p className="text-[9px] text-slate-400">Toque em qualquer partida para ver detalhes e estatísticas</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedDate('Hoje (Ao Vivo)')}
              className="text-[10px] bg-blue-600 hover:bg-blue-500 text-white font-bold px-2 py-1 rounded cursor-pointer"
            >
              Ao Vivo
            </button>
          </div>

          {/* Modal de Detalhes da Partida ao Clicar (SofaScore / 365Scores) */}
          <AnimatePresence>
            {selectedMatch && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                className="absolute inset-0 z-50"
              >
                <MatchDetailModal
                  match={selectedMatch.match}
                  tournamentName={selectedMatch.tournamentName}
                  onClose={() => setSelectedMatch(null)}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Modal de Notificações com Badge */}
          {isNotificationsOpen && (
            <NotificationsModal onClose={() => setIsNotificationsOpen(false)} />
          )}
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { useTennisScoreboard } from '../../context/TennisScoreboardContext';
import { SavedMatchesScreen } from './SavedMatchesScreen';
import { NewMatchScreen } from './NewMatchScreen';
import { LiveScoreboardScreen } from './LiveScoreboardScreen';
import { MatchStatsScreen } from './MatchStatsScreen';
import { ShareMatchModal } from './ShareMatchModal';
import { NotificationsModal } from '../common/NotificationsModal';
import { HomeTennisBallButton } from '../common/HomeTennisBallButton';
import { ScoreboardMatch } from '../../types/tennisScoreboard';

type ScoreboardSubView = 'saved_matches' | 'new_match' | 'live_scoring' | 'match_stats';

interface ScoreboardMainScreenProps {
  onBackToMenu: () => void;
  onToggleDrawer?: () => void;
}

export const ScoreboardMainScreen: React.FC<ScoreboardMainScreenProps> = ({
  onBackToMenu,
  onToggleDrawer,
}) => {
  const { activeMatch, loadMatchForScoring } = useTennisScoreboard();
  const [subView, setSubView] = useState<ScoreboardSubView>('saved_matches');
  const [selectedMatchForStats, setSelectedMatchForStats] = useState<ScoreboardMatch>(activeMatch);
  const [sharingMatch, setSharingMatch] = useState<ScoreboardMatch | null>(null);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const handleSelectSavedMatch = (match: ScoreboardMatch) => {
    setSelectedMatchForStats(match);
    setSubView('match_stats');
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-[#0074c7] select-none overflow-hidden font-sans">
      {/* Android Status Bar */}
      <div className="w-full bg-[#0074c7] px-3.5 pt-1.5 pb-1 flex justify-between items-center text-white text-[11px] font-medium tracking-tight shrink-0">
        <div className="flex items-center gap-1.5">
          <span>10:08</span>
          <span className="text-[10px]">💬</span>
          <span className="text-[10px]">📍</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px]">✈</span>
          <span className="text-[10px]">🔋</span>
          <span className="text-[10px]">100%</span>
        </div>
      </div>

      {/* App Bar Principal Unificado - Segue o padrão de todo o aplicativo Tudo para Tenistas */}
      <div className="w-full bg-[#0074c7] px-4 py-2 flex items-center justify-between shrink-0">
        {/* Hambúrguer amarelo */}
        <button
          onClick={onToggleDrawer || onBackToMenu}
          className="p-1 rounded hover:bg-white/10 transition flex flex-col gap-[4px] cursor-pointer"
          title="Menu Principal"
        >
          <span className="w-6 h-[3.5px] bg-[#ffb703] rounded-full inline-block"></span>
          <span className="w-6 h-[3.5px] bg-[#ffb703] rounded-full inline-block"></span>
          <span className="w-6 h-[3.5px] bg-[#ffb703] rounded-full inline-block"></span>
        </button>

        {/* Título Central */}
        <h1 className="text-white text-base font-medium tracking-tight">
          Marcador de Placar
        </h1>

        {/* Lado Direito: Sino com Badge + Bolinha de Tênis (Home) */}
        <div className="flex items-center gap-3">
          {/* Sino com Badge de Notificação */}
          <button
            onClick={() => setIsNotificationsOpen(true)}
            className="relative p-1 text-white hover:text-amber-200 transition cursor-pointer"
            title="Notificações"
          >
            <Bell className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-[#0074c7]">
              3
            </span>
          </button>

          {/* Bolinha de Tênis PNG (Home) */}
          <HomeTennisBallButton onClick={onBackToMenu} className="w-8 h-8" />
        </div>
      </div>

      {/* Barra de Navegação Rápida entre Telas do Marcador */}
      <div className="w-full bg-[#0062a8] px-2 py-1 flex items-center justify-between gap-1 text-[11px] font-bold shrink-0">
        <button
          onClick={() => setSubView('saved_matches')}
          className={`flex-1 py-1 rounded transition text-center cursor-pointer ${
            subView === 'saved_matches'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-white/80 hover:text-white'
          }`}
        >
          Jogos Salvos
        </button>
        <button
          onClick={() => setSubView('new_match')}
          className={`flex-1 py-1 rounded transition text-center cursor-pointer ${
            subView === 'new_match'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-white/80 hover:text-white'
          }`}
        >
          Novo Jogo
        </button>
        <button
          onClick={() => setSubView('live_scoring')}
          className={`flex-1 py-1 rounded transition text-center cursor-pointer ${
            subView === 'live_scoring'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-white/80 hover:text-white'
          }`}
        >
          Marcador Ao Vivo
        </button>
        <button
          onClick={() => {
            setSelectedMatchForStats(activeMatch);
            setSubView('match_stats');
          }}
          className={`flex-1 py-1 rounded transition text-center cursor-pointer ${
            subView === 'match_stats'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-white/80 hover:text-white'
          }`}
        >
          Estatísticas
        </button>
      </div>

      {/* Área de Visualização com Cantos Arredondados */}
      <div className="flex-1 bg-white rounded-t-2xl shadow-inner flex flex-col overflow-hidden relative">
        {subView === 'saved_matches' && (
          <SavedMatchesScreen
            onSelectMatch={handleSelectSavedMatch}
            onNewMatch={() => setSubView('new_match')}
            onOpenLiveCurrentMatch={() => setSubView('live_scoring')}
            onShareMatch={(match) => setSharingMatch(match)}
          />
        )}

        {subView === 'new_match' && (
          <NewMatchScreen
            onStartMatch={() => setSubView('live_scoring')}
            onBack={() => setSubView('saved_matches')}
          />
        )}

        {subView === 'live_scoring' && (
          <LiveScoreboardScreen
            onOpenStats={() => {
              setSelectedMatchForStats(activeMatch);
              setSubView('match_stats');
            }}
            onOpenSavedMatches={() => setSubView('saved_matches')}
          />
        )}

        {subView === 'match_stats' && (
          <MatchStatsScreen
            match={selectedMatchForStats}
            onBack={() => setSubView('live_scoring')}
          />
        )}
      </div>

      {/* Modal de Compartilhamento Direto */}
      {sharingMatch && (
        <ShareMatchModal
          match={sharingMatch}
          onClose={() => setSharingMatch(null)}
        />
      )}

      {/* Modal de Notificações do Sistema */}
      {isNotificationsOpen && (
        <NotificationsModal onClose={() => setIsNotificationsOpen(false)} />
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { LoginScreen } from './components/LoginScreen';
import { HomeScreen } from './components/HomeScreen';
import { AtpWtaScreen } from './components/scores/AtpWtaScreen';
import { NewsScreen } from './components/news/NewsScreen';
import { AcademiesScreen } from './components/academies/AcademiesScreen';
import { StoresScreen } from './components/stores/StoresScreen';
import { HotelsScreen } from './components/hotels/HotelsScreen';
import { FindPlayersMapScreen } from './components/players/FindPlayersMapScreen';
import { FindCourtsMapScreen } from './components/courts/FindCourtsMapScreen';
import { TournamentsScreen } from './components/tournaments/TournamentsScreen';
import { RankingsTorneiosScreen } from './components/rankings/RankingsTorneiosScreen';
import { ScoreboardMainScreen } from './components/scoreboard/ScoreboardMainScreen';
import { TennisRankingsProvider } from './context/TennisRankingsContext';
import { TennisScoreboardProvider } from './context/TennisScoreboardContext';
import { Layers, Smartphone, Sparkles, CheckCircle2 } from 'lucide-react';
import { PWAInstallButton } from './components/common/PWAInstallButton';
import { usePWAInstall } from './hooks/usePWAInstall';

export type ScreenView =
  | 'splash'
  | 'login'
  | 'home'
  | 'atp-wta'
  | 'news'
  | 'academies'
  | 'stores'
  | 'hotels'
  | 'players'
  | 'courts'
  | 'tournaments'
  | 'rankings'
  | 'scoreboard';

export default function App() {
  const [currentView, setCurrentView] = useState<ScreenView>('scoreboard');
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const { isInstalled } = usePWAInstall();
  const [showDevToolbar, setShowDevToolbar] = useState(!isInstalled);

  const handleSplashContinue = () => {
    setCurrentView('login');
  };

  const handleLoginSuccess = (email: string) => {
    setUserEmail(email);
    setCurrentView('home');
  };

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans select-none">
      {/* Top Bar com Navegador Rápido e Botão PWA (ocultável se instalado) */}
      {showDevToolbar ? (
        <header className="w-full border-b border-slate-800 bg-slate-900/90 backdrop-blur px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 z-30">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#0074c7] flex items-center justify-center font-bold text-white shadow">
              T
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-sm tracking-tight text-white">
                  TUDO PARA TENISTAS
                </h1>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-semibold">
                  PWA Standalone
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Plataforma Completa para Praticantes de Tênis</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Botão de Instalar PWA */}
            <PWAInstallButton variant="button" />

            {/* Seletor de Telas para alternar com 1 clique */}
            <div className="flex items-center gap-1.5 bg-slate-800/80 p-1 rounded-xl border border-slate-700/60 overflow-x-auto">
          <button
            onClick={() => setCurrentView('splash')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
              currentView === 'splash'
                ? 'bg-[#0074c7] text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            01. Abertura
          </button>
          <button
            onClick={() => setCurrentView('login')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
              currentView === 'login'
                ? 'bg-[#0074c7] text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            02. Login
          </button>
          <button
            onClick={() => setCurrentView('home')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
              currentView === 'home'
                ? 'bg-[#0074c7] text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            03. Início & Menu Bola
          </button>
          <button
            onClick={() => setCurrentView('atp-wta')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
              currentView === 'atp-wta'
                ? 'bg-[#00a896] text-white shadow-sm'
                : 'text-emerald-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            04. Torneios ATP/WTA
          </button>
          <button
            onClick={() => setCurrentView('news')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
              currentView === 'news'
                ? 'bg-[#8cb316] text-white shadow-sm'
                : 'text-lime-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            05. Notícias
          </button>
          <button
            onClick={() => setCurrentView('academies')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
              currentView === 'academies'
                ? 'bg-[#8b3d9c] text-white shadow-sm'
                : 'text-purple-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            06. Professores & Academias
          </button>
          <button
            onClick={() => setCurrentView('stores')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
              currentView === 'stores'
                ? 'bg-[#e63946] text-white shadow-sm'
                : 'text-red-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            07. Lojas e Serviços
          </button>
          <button
            onClick={() => setCurrentView('hotels')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
              currentView === 'hotels'
                ? 'bg-[#00a86b] text-white shadow-sm'
                : 'text-emerald-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            08. Hotéis c/ Quadras
          </button>
          <button
            onClick={() => setCurrentView('players')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
              currentView === 'players'
                ? 'bg-[#00b4d8] text-white shadow-sm'
                : 'text-cyan-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            09. Encontrar Tenistas
          </button>
          <button
            onClick={() => setCurrentView('courts')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
              currentView === 'courts'
                ? 'bg-[#e01e5a] text-white shadow-sm'
                : 'text-pink-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            10. Encontrar Quadras
          </button>
          <button
            onClick={() => setCurrentView('tournaments')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
              currentView === 'tournaments'
                ? 'bg-[#1d4ed8] text-white shadow-sm'
                : 'text-blue-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            11. Encontrar Torneios
          </button>
          <button
            onClick={() => setCurrentView('rankings')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
              currentView === 'rankings'
                ? 'bg-[#eab308] text-slate-900 shadow-sm'
                : 'text-amber-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            12. Rankings & Torneios
          </button>
          <button
            onClick={() => setCurrentView('scoreboard')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
              currentView === 'scoreboard'
                ? 'bg-[#d946ef] text-white shadow-sm'
                : 'text-fuchsia-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            13. Marcador de Placar
          </button>
        </div>
      </div>
    </header>
  ) : (
    <button
      onClick={() => setShowDevToolbar(true)}
      className="fixed top-2 right-2 z-50 p-1.5 rounded-full bg-slate-900/80 border border-slate-700 text-slate-400 hover:text-white shadow-lg cursor-pointer"
      title="Alternar Telas"
    >
      <Layers className="w-3.5 h-3.5" />
    </button>
  )}

      {/* Área Central com Container de Visualização Mobile Responsivo */}
      <TennisRankingsProvider>
        <TennisScoreboardProvider>
          <main className="flex-1 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-radial from-slate-900 to-slate-950">
            {currentView === 'splash' && (
              <SplashScreen onContinue={handleSplashContinue} />
            )}

            {currentView === 'login' && (
              <LoginScreen
                onLoginSuccess={handleLoginSuccess}
                onSkip={() => setCurrentView('home')}
              />
            )}

            {currentView === 'home' && (
              <HomeScreen initialOpen={false} />
            )}

            {currentView === 'atp-wta' && (
              <div className="relative w-full max-w-[430px] h-[92vh] max-h-[880px] rounded-[36px] overflow-hidden shadow-2xl border-4 border-slate-800 bg-[#0074c7] flex flex-col select-none">
                <AtpWtaScreen onBackToMenu={() => setCurrentView('home')} />
              </div>
            )}

            {currentView === 'news' && (
              <div className="relative w-full max-w-[430px] h-[92vh] max-h-[880px] rounded-[36px] overflow-hidden shadow-2xl border-4 border-slate-800 bg-[#0074c7] flex flex-col select-none">
                <NewsScreen onBackToMenu={() => setCurrentView('home')} />
              </div>
            )}

            {currentView === 'academies' && (
              <div className="relative w-full max-w-[430px] h-[92vh] max-h-[880px] rounded-[36px] overflow-hidden shadow-2xl border-4 border-slate-800 bg-[#0074c7] flex flex-col select-none">
                <AcademiesScreen onBackToMenu={() => setCurrentView('home')} />
              </div>
            )}

            {currentView === 'stores' && (
              <div className="relative w-full max-w-[430px] h-[92vh] max-h-[880px] rounded-[36px] overflow-hidden shadow-2xl border-4 border-slate-800 bg-[#0074c7] flex flex-col select-none">
                <StoresScreen onBackToMenu={() => setCurrentView('home')} />
              </div>
            )}

            {currentView === 'hotels' && (
              <div className="relative w-full max-w-[430px] h-[92vh] max-h-[880px] rounded-[36px] overflow-hidden shadow-2xl border-4 border-slate-800 bg-[#0074c7] flex flex-col select-none">
                <HotelsScreen onBackToMenu={() => setCurrentView('home')} />
              </div>
            )}

            {currentView === 'players' && (
              <div className="relative w-full max-w-[430px] h-[92vh] max-h-[880px] rounded-[36px] overflow-hidden shadow-2xl border-4 border-slate-800 bg-[#0074c7] flex flex-col select-none">
                <FindPlayersMapScreen onBackToMenu={() => setCurrentView('home')} />
              </div>
            )}

            {currentView === 'courts' && (
              <div className="relative w-full max-w-[430px] h-[92vh] max-h-[880px] rounded-[36px] overflow-hidden shadow-2xl border-4 border-slate-800 bg-[#0074c7] flex flex-col select-none">
                <FindCourtsMapScreen onBackToMenu={() => setCurrentView('home')} />
              </div>
            )}

            {currentView === 'tournaments' && (
              <div className="relative w-full max-w-[430px] h-[92vh] max-h-[880px] rounded-[36px] overflow-hidden shadow-2xl border-4 border-slate-800 bg-[#0074c7] flex flex-col select-none">
                <TournamentsScreen onBackToMenu={() => setCurrentView('home')} />
              </div>
            )}

            {currentView === 'rankings' && (
              <div className="relative w-full max-w-[430px] h-[92vh] max-h-[880px] rounded-[36px] overflow-hidden shadow-2xl border-4 border-slate-800 bg-[#0074c7] flex flex-col select-none">
                <RankingsTorneiosScreen
                  onBackToMenu={() => setCurrentView('home')}
                  onNavigateToTournaments={() => setCurrentView('tournaments')}
                />
              </div>
            )}

            {currentView === 'scoreboard' && (
              <div className="relative w-full max-w-[430px] h-[92vh] max-h-[880px] rounded-[36px] overflow-hidden shadow-2xl border-4 border-slate-800 bg-[#0074c7] flex flex-col select-none">
                <ScoreboardMainScreen
                  onBackToMenu={() => setCurrentView('home')}
                />
              </div>
            )}
          </main>
        </TennisScoreboardProvider>
      </TennisRankingsProvider>
    </div>
  );
}

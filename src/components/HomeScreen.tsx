import React, { useState } from 'react';
import { Header } from './Header';
import { RadialMenu } from './RadialMenu';
import { DrawerMenu } from './DrawerMenu';
import { OptionDetail } from './OptionDetail';
import { AtpWtaScreen } from './scores/AtpWtaScreen';
import { NewsScreen } from './news/NewsScreen';
import { AcademiesScreen } from './academies/AcademiesScreen';
import { StoresScreen } from './stores/StoresScreen';
import { HotelsScreen } from './hotels/HotelsScreen';
import { FindPlayersMapScreen } from './players/FindPlayersMapScreen';
import { FindCourtsMapScreen } from './courts/FindCourtsMapScreen';
import { TournamentsScreen } from './tournaments/TournamentsScreen';
import { RankingsTorneiosScreen } from './rankings/RankingsTorneiosScreen';
import { ScoreboardMainScreen } from './scoreboard/ScoreboardMainScreen';
import { TennisOption } from '../types/tennisMenu';

interface HomeScreenProps {
  initialOpen?: boolean;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ initialOpen = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(initialOpen);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<TennisOption | null>(null);

  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleSelectOption = (option: TennisOption) => {
    setSelectedOption(option);
  };

  return (
    <div className="relative w-full max-w-[430px] h-[92vh] max-h-[880px] rounded-[36px] overflow-hidden shadow-2xl border-4 border-slate-800 bg-[#0074c7] flex flex-col select-none">
      {/* Se houver uma tela dedicada ativa, renderiza-a em tela cheia no aparelho sem duplicar cabeçalhos */}
      {selectedOption?.id === 'torneios-atp' ? (
        <AtpWtaScreen
          onBackToMenu={() => setSelectedOption(null)}
          onToggleDrawer={() => setIsDrawerOpen(true)}
        />
      ) : selectedOption?.id === 'noticias' ? (
        <NewsScreen
          onBackToMenu={() => setSelectedOption(null)}
          onToggleDrawer={() => setIsDrawerOpen(true)}
        />
      ) : selectedOption?.id === 'professores' ? (
        <AcademiesScreen
          onBackToMenu={() => setSelectedOption(null)}
          onToggleDrawer={() => setIsDrawerOpen(true)}
        />
      ) : selectedOption?.id === 'lojas' ? (
        <StoresScreen
          onBackToMenu={() => setSelectedOption(null)}
          onToggleDrawer={() => setIsDrawerOpen(true)}
        />
      ) : selectedOption?.id === 'hoteis' ? (
        <HotelsScreen
          onBackToMenu={() => setSelectedOption(null)}
          onToggleDrawer={() => setIsDrawerOpen(true)}
        />
      ) : selectedOption?.id === 'encontrar-tenista' ? (
        <FindPlayersMapScreen
          onBackToMenu={() => setSelectedOption(null)}
          onToggleDrawer={() => setIsDrawerOpen(true)}
        />
      ) : selectedOption?.id === 'encontrar-quadras' ? (
        <FindCourtsMapScreen
          onBackToMenu={() => setSelectedOption(null)}
          onToggleDrawer={() => setIsDrawerOpen(true)}
        />
      ) : selectedOption?.id === 'encontrar-torneios' ? (
        <TournamentsScreen
          onBackToMenu={() => setSelectedOption(null)}
          onToggleDrawer={() => setIsDrawerOpen(true)}
        />
      ) : selectedOption?.id === 'rankings' ? (
        <RankingsTorneiosScreen
          onBackToMenu={() => setSelectedOption(null)}
          onToggleDrawer={() => setIsDrawerOpen(true)}
          onNavigateToTournaments={() => {
            const torneiosOpt = {
              id: 'encontrar-torneios',
              title: 'ENCONTRAR\nTORNEIOS',
              color: '#1d4ed8',
              iconType: 'encontrar_torneios' as const,
            };
            setSelectedOption(torneiosOpt);
          }}
        />
      ) : selectedOption?.id === 'marcador' ? (
        <ScoreboardMainScreen
          onBackToMenu={() => setSelectedOption(null)}
          onToggleDrawer={() => setIsDrawerOpen(true)}
        />
      ) : (
        <>
          {/* Header com Status Bar Android e App Bar */}
          <Header
            onToggleDrawer={() => setIsDrawerOpen(true)}
            onGoHome={() => setSelectedOption(null)}
            title={selectedOption ? selectedOption.title.replace('\n', ' ') : 'Tudo para Tenistas'}
          />

          {/* Conteúdo Principal com o Card Branco Arredondado */}
          <div className="flex-1 p-2 pt-0 pb-2.5 flex flex-col overflow-hidden bg-gradient-to-b from-[#0074c7] to-[#0094f7]">
            <div className="w-full h-full bg-white rounded-[24px] shadow-sm overflow-hidden relative flex flex-col">
              {selectedOption ? (
                <OptionDetail
                  option={selectedOption}
                  onBack={() => setSelectedOption(null)}
                />
              ) : (
                <RadialMenu
                  isOpen={isMenuOpen}
                  onToggle={handleToggleMenu}
                  onSelectOption={handleSelectOption}
                />
              )}
            </div>
          </div>
        </>
      )}

      {/* Drawer Lateral */}
      <DrawerMenu
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onSelectOption={(option) => {
          setSelectedOption(option);
        }}
      />
    </div>
  );
};

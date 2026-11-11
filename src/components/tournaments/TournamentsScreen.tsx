import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Trophy,
  Calendar,
  Clock,
  MapPin,
  Search,
  ChevronDown,
  PlusCircle,
  MoreVertical,
  CheckCircle2,
  Sparkles,
  Bell,
  Award,
} from 'lucide-react';
import { INITIAL_TOURNAMENTS } from '../../data/mockTennisTournaments';
import { TennisTournament } from '../../types/tennisTournaments';
import { TournamentDetailModal } from './TournamentDetailModal';
import { TournamentRegisterAthleteModal } from './TournamentRegisterAthleteModal';
import { RegisterTournamentModal } from './RegisterTournamentModal';
import { NotificationsModal } from '../common/NotificationsModal';
import { HomeTennisBallButton } from '../common/HomeTennisBallButton';

import { useTennisRankings } from '../../context/TennisRankingsContext';

interface TournamentsScreenProps {
  onBackToMenu: () => void;
  onToggleDrawer?: () => void;
}

export const TournamentsScreen: React.FC<TournamentsScreenProps> = ({
  onBackToMenu,
  onToggleDrawer,
}) => {
  const { enrollInTournament } = useTennisRankings();
  const [tournamentsList, setTournamentsList] = useState<TennisTournament[]>(INITIAL_TOURNAMENTS);
  const [selectedCity, setSelectedCity] = useState<string>('Todas as Cidades');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('Todos');
  const [expandRadius, setExpandRadius] = useState<boolean>(false);
  const [selectedTournament, setSelectedTournament] = useState<TennisTournament | null>(null);
  const [registeringTournament, setRegisteringTournament] = useState<TennisTournament | null>(null);
  const [isNewTournamentModalOpen, setIsNewTournamentModalOpen] = useState<boolean>(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const cities = [
    'Todas as Cidades',
    'Marília',
    'São Paulo',
    'Campinas',
    'Taubaté',
    'Santos',
    'Ribeirão Preto',
    'São José dos Campos',
  ];

  const handleAddNewTournament = (newTournament: TennisTournament) => {
    setTournamentsList((prev) => [newTournament, ...prev]);
    setToastMessage(`Torneio "${newTournament.name}" cadastrado! Enviado para revisão do administrador.`);
    setTimeout(() => setToastMessage(null), 5000);
  };

  const handleAthleteRegistrationSuccess = () => {
    if (registeringTournament) {
      const fee = registeringTournament.categories[0]?.entryFee || 100;
      enrollInTournament({
        id: registeringTournament.id,
        name: registeringTournament.name,
        date: registeringTournament.dateDisplay || `${registeringTournament.startDate} a ${registeringTournament.endDate}`,
        location: `${registeringTournament.venueName}, ${registeringTournament.city}`,
        photoUrl: registeringTournament.bannerUrl,
        admin: registeringTournament.organizerName || 'Federação / Clube Local',
        obsPrice: `Inscrição R$ ${fee.toFixed(2)}`,
      });
    }
    setToastMessage('Inscrição aprovada! O torneio foi adicionado à aba "Torneios" em Rankings e Torneios.');
    setTimeout(() => setToastMessage(null), 5000);
  };

  // Filtragem de torneios por cidade, busca e status
  const filteredTournaments = tournamentsList.filter((item) => {
    const matchCity =
      expandRadius ||
      selectedCity === 'Todas as Cidades' ||
      item.city.toLowerCase() === selectedCity.toLowerCase();

    const matchSearch =
      !searchQuery.trim() ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.venueName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.categoriesSummary.toLowerCase().includes(searchQuery.toLowerCase());

    const matchStatus =
      statusFilter === 'Todos' ||
      (statusFilter === 'Abertas' && item.status !== 'finished') ||
      (statusFilter === 'Urgente' && item.status === 'closing_soon');

    return matchCity && matchSearch && matchStatus;
  });

  return (
    <div className="relative w-full h-full flex flex-col bg-[#0074c7] select-none overflow-hidden font-sans">
      {/* Android Status Bar */}
      <div className="w-full bg-[#0074c7] px-3.5 pt-1.5 pb-1 flex justify-between items-center text-white text-[11px] font-medium tracking-tight">
        <div className="flex items-center gap-1.5">
          <span>17:41</span>
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

        {/* Título Atualizado */}
        <h1 className="text-white font-medium text-[17px] tracking-wide text-center">
          Encontrar Torneios
        </h1>

        {/* Notificações (Sino com badge) e bolinha verde para Home */}
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

      {/* Card Branco Central com Rolagem (Modelo Telas 06, 07, 08) */}
      <div className="flex-1 p-2 pt-0 pb-2.5 flex flex-col overflow-hidden bg-gradient-to-b from-[#0074c7] to-[#0094f7]">
        <div className="w-full h-full bg-white rounded-[24px] shadow-sm overflow-hidden flex flex-col relative">
          
          {/* BANNER CTA PERSUASIVO PARA ORGANIZADORES */}
          <div className="bg-gradient-to-r from-[#1d4ed8] to-[#2563eb] text-white p-3 shadow-xs border-b border-blue-400/40">
            <div className="flex items-center justify-between gap-2">
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-black tracking-tight flex items-center gap-1.5 text-amber-300">
                  <span>🏆</span>
                  <span>Organiza Torneios de Tênis?</span>
                </p>
                <p className="text-[10px] text-blue-100 leading-tight mt-0.5 truncate">
                  Divulgue sua competição para milhares de tenistas!
                </p>
              </div>

              <button
                onClick={() => setIsNewTournamentModalOpen(true)}
                className="px-3 py-1.5 rounded-full bg-[#a3cb53] hover:bg-[#92b944] text-white text-[11px] font-bold shadow-md transition active:scale-95 flex items-center gap-1 shrink-0 cursor-pointer border border-white/30"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Cadastrar Torneio</span>
              </button>
            </div>
          </div>

          {/* BARRA DE FILTROS: CIDADE + BUSCA POR NOME */}
          <div className="p-2.5 bg-slate-50 border-b border-slate-200 space-y-2">
            <div className="flex items-center gap-2">
              {/* Dropdown de Cidade */}
              <div className="relative flex-1">
                <div className="flex items-center gap-1 px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-800 text-[11px] font-medium shadow-2xs">
                  <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <select
                    value={selectedCity}
                    onChange={(e) => {
                      setSelectedCity(e.target.value);
                      setExpandRadius(false);
                    }}
                    className="w-full bg-transparent focus:outline-none cursor-pointer pr-4 appearance-none text-[11px] font-medium text-slate-700"
                  >
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 pointer-events-none" />
                </div>
              </div>

              {/* Input de Busca */}
              <div className="relative flex-1">
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-800 text-[11px] shadow-2xs">
                  <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <input
                    type="text"
                    placeholder="Buscar torneio..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent focus:outline-none placeholder:text-slate-400 text-[11px]"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      &times;
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Chips de Status Rápido */}
            <div className="flex items-center gap-1.5 text-[10px]">
              <button
                onClick={() => setStatusFilter('Todos')}
                className={`px-2 py-0.5 rounded-full font-bold transition cursor-pointer ${
                  statusFilter === 'Todos'
                    ? 'bg-[#1d4ed8] text-white shadow-2xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => setStatusFilter('Abertas')}
                className={`px-2 py-0.5 rounded-full font-bold transition cursor-pointer ${
                  statusFilter === 'Abertas'
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                Inscrições Abertas
              </button>
              <button
                onClick={() => setStatusFilter('Urgente')}
                className={`px-2 py-0.5 rounded-full font-bold transition cursor-pointer ${
                  statusFilter === 'Urgente'
                    ? 'bg-amber-500 text-white shadow-2xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                Últimos Dias
              </button>
              <span className="text-[10px] text-slate-400 font-medium ml-auto pr-1">
                {filteredTournaments.length} {filteredTournaments.length === 1 ? 'torneio' : 'torneios'}
              </span>
            </div>
          </div>

          {/* LISTA DE CARDS DE TORNEIOS (Modelo idêntico às telas 06, 07, 08) */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3.5 bg-slate-100/60">
            {filteredTournaments.map((tournament) => (
              <motion.div
                key={tournament.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setSelectedTournament(tournament)}
                className="bg-white rounded-[20px] p-3 shadow-[0_2px_10px_rgba(0,0,0,0.06)] border border-slate-200/80 flex flex-col gap-2.5 transition-all cursor-pointer hover:shadow-md relative overflow-hidden"
              >
                {/* Cabeçalho do Card: Logo + Dados Resumidos */}
                <div className="flex items-start gap-3">
                  {/* Logo do Torneio */}
                  <div className="w-18 h-18 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200 shadow-xs relative">
                    <img
                      src={tournament.logoUrl}
                      alt={tournament.name}
                      className="w-full h-full object-cover"
                    />
                    {tournament.status === 'closing_soon' && (
                      <span className="absolute bottom-0 inset-x-0 bg-amber-500 text-white text-[8px] font-black text-center py-0.5 uppercase tracking-tighter">
                        Últimos dias
                      </span>
                    )}
                  </div>

                  {/* Informações Resumidas Obrigatórias */}
                  <div className="flex-1 min-w-0 pr-6">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span
                        className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                          tournament.status === 'closing_soon'
                            ? 'bg-amber-100 text-amber-800 border border-amber-300'
                            : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        }`}
                      >
                        {tournament.status === 'closing_soon' ? 'Inscrições no Fim' : 'Inscrições Abertas'}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400">
                        • {tournament.edition || 'Edição 2026'}
                      </span>
                    </div>

                    <h3 className="font-bold text-[13px] text-slate-900 leading-tight mt-1 line-clamp-1">
                      {tournament.name}
                    </h3>

                    {/* Data do Torneio (Início e Fim) */}
                    <p className="text-[11px] font-semibold text-slate-700 flex items-center gap-1.5 mt-1">
                      <Calendar className="w-3.5 h-3.5 text-[#0074c7] shrink-0" />
                      <span>{tournament.dateDisplay}</span>
                    </p>

                    {/* Datas Início e Fim das Inscrições */}
                    <p className="text-[10px] text-amber-700 font-bold flex items-center gap-1.5 mt-0.5">
                      <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>{tournament.registrationDeadlineDisplay}</span>
                    </p>

                    {/* Cidade e Estado */}
                    <p className="text-[10px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                      <span>{tournament.venueName} &bull; <strong>{tournament.city} - {tournament.state}</strong></span>
                    </p>
                  </div>

                  {/* Menu Três Pontinhos */}
                  <div className="absolute top-3 right-3 text-slate-400">
                    <MoreVertical className="w-4 h-4" />
                  </div>
                </div>

                {/* Rodapé do Card com Premiação e Botão Inscreva-se Direto */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1 text-[10px] text-amber-700 font-bold truncate">
                    <Trophy className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span className="truncate">{tournament.totalPrizeDisplay}</span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setRegisteringTournament(tournament);
                    }}
                    className="py-1 px-3.5 rounded-full bg-[#a3cb53] hover:bg-[#92b944] text-white text-[10px] font-black uppercase tracking-wider shadow-xs transition active:scale-95 cursor-pointer shrink-0"
                  >
                    Inscreva-se
                  </button>
                </div>
              </motion.div>
            ))}

            {filteredTournaments.length === 0 && (
              <div className="py-12 text-center text-slate-500 text-xs space-y-2">
                <p className="font-semibold">Nenhum torneio encontrado para o filtro selecionado.</p>
                <p className="text-[11px] text-slate-400">
                  Tente alterar a cidade ou clique no botão abaixo para buscar em outras regiões.
                </p>
              </div>
            )}

            {/* BOTÃO OTIMIZADO CONFORME PADRÃO ESTABELECIDO: [ 📍 BUSCAR EM OUTRAS CIDADES ] */}
            <div className="pt-2 pb-5 flex flex-col items-center">
              <button
                onClick={() => {
                  setExpandRadius(true);
                  setSelectedCity('Todas as Cidades');
                  setToastMessage('Exibindo torneios em todas as regiões cadastradas!');
                  setTimeout(() => setToastMessage(null), 4000);
                }}
                className="w-full max-w-[280px] py-2.5 px-4 rounded-full bg-[#f5a623] hover:bg-[#e09418] text-white font-bold text-xs shadow-md transition active:scale-95 cursor-pointer flex items-center justify-center gap-1.5 uppercase tracking-wide"
              >
                <span>📍</span>
                <span>BUSCAR EM OUTRAS CIDADES</span>
              </button>
            </div>
          </div>

          {/* Toast Notification */}
          <AnimatePresence>
            {toastMessage && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute bottom-4 left-4 right-4 bg-slate-900 text-white text-xs py-2.5 px-4 rounded-xl shadow-lg flex items-center justify-between z-50 border border-slate-700"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#a3cb53] shrink-0" />
                  <span>{toastMessage}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Modal de Detalhes do Torneio (Ao Clicar no Card) */}
          <AnimatePresence>
            {selectedTournament && (
              <TournamentDetailModal
                tournament={selectedTournament}
                onClose={() => setSelectedTournament(null)}
                onOpenRegistration={() => {
                  setRegisteringTournament(selectedTournament);
                  setSelectedTournament(null);
                }}
              />
            )}
          </AnimatePresence>

          {/* Modal de Inscrição do Atleta */}
          <AnimatePresence>
            {registeringTournament && (
              <TournamentRegisterAthleteModal
                tournament={registeringTournament}
                onClose={() => setRegisteringTournament(null)}
                onSuccess={handleAthleteRegistrationSuccess}
              />
            )}
          </AnimatePresence>

          {/* Modal de Cadastro de Novo Torneio */}
          <AnimatePresence>
            {isNewTournamentModalOpen && (
              <RegisterTournamentModal
                onClose={() => setIsNewTournamentModalOpen(false)}
                onSubmitSuccess={handleAddNewTournament}
              />
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

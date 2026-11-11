import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MapPin,
  MoreVertical,
  Search,
  PlusCircle,
  Hotel,
  Sparkles,
  CheckCircle2,
  Bell,
} from 'lucide-react';
import { INITIAL_HOTELS } from '../../data/mockTennisHotels';
import { TennisHotel, HotelType } from '../../types/tennisHotels';
import { AdvertiserTier } from '../../types/tennisAcademies';
import { WhatsAppIcon, LandlinePhoneIcon } from '../common/ContactIcons';
import { HotelDetailModal } from './HotelDetailModal';
import { RegisterHotelModal } from './RegisterHotelModal';
import { NotificationsModal } from '../common/NotificationsModal';
import { HomeTennisBallButton } from '../common/HomeTennisBallButton';

interface HotelsScreenProps {
  onBackToMenu: () => void;
  onToggleDrawer?: () => void;
}

export const HotelsScreen: React.FC<HotelsScreenProps> = ({
  onBackToMenu,
  onToggleDrawer,
}) => {
  const [hotelsList, setHotelsList] = useState<TennisHotel[]>(INITIAL_HOTELS);
  const [selectedCity, setSelectedCity] = useState<string>('Todas as Cidades');
  const [selectedType, setSelectedType] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandRadius, setExpandRadius] = useState<boolean>(false);
  const [selectedHotel, setSelectedHotel] = useState<TennisHotel | null>(null);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState<boolean>(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const cities = ['Todas as Cidades', 'Campos do Jordão', 'Atibaia', 'Taubaté', 'Ilhabela', 'São Paulo', 'Trancoso'];
  const types = ['Todos', 'Resort & Spa', 'Hotel Fazenda', 'Pousada de Charme', 'Hotel Urbano'];

  // Peso da hierarquia dos planos de anúncios (Diamante > Ouro > Prata > Bronze > Grátis)
  const tierWeight: Record<AdvertiserTier, number> = {
    diamond: 1,
    gold: 2,
    silver: 3,
    bronze: 4,
    free: 5,
  };

  const handleAddNewHotel = (newHotel: TennisHotel) => {
    setHotelsList((prev) => [newHotel, ...prev]);
    setToastMessage(`Hotel "${newHotel.name}" cadastrado! Enviado para revisão do administrador.`);
    setTimeout(() => setToastMessage(null), 4500);
  };

  // Filtragem e ordenação estrita
  const filteredHotels = hotelsList
    .filter((item) => {
      const matchCity =
        selectedCity === 'Todas as Cidades' || item.city.toLowerCase() === selectedCity.toLowerCase();

      const matchType =
        selectedType === 'Todos' || item.typeLabel.toLowerCase() === selectedType.toLowerCase();

      const matchSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.courtSurfaces.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.amenities.some((a) => a.toLowerCase().includes(searchQuery.toLowerCase()));

      if (!expandRadius && selectedCity === 'Todas as Cidades') {
        return (item.distanceKm || 0) < 150 && matchType && matchSearch;
      }

      return matchCity && matchType && matchSearch;
    })
    .sort((a, b) => {
      const tierDiff = tierWeight[a.tier] - tierWeight[b.tier];
      if (tierDiff !== 0) return tierDiff;
      return (a.distanceKm || 0) - (b.distanceKm || 0);
    });

  const getTierBadge = (tier: AdvertiserTier) => {
    switch (tier) {
      case 'diamond':
        return <span className="text-[9px] font-black bg-indigo-500/15 text-indigo-700 border border-indigo-500/30 px-1.5 py-0.5 rounded">💎 DIAMANTE</span>;
      case 'gold':
        return <span className="text-[9px] font-black bg-amber-500/15 text-amber-700 border border-amber-500/30 px-1.5 py-0.5 rounded">🥇 OURO</span>;
      case 'silver':
        return <span className="text-[9px] font-black bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded">🥈 PRATA</span>;
      case 'bronze':
        return <span className="text-[9px] font-black bg-amber-800/10 text-amber-800 px-1.5 py-0.5 rounded">🥉 BRONZE</span>;
      default:
        return null;
    }
  };

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

        {/* Título */}
        <h1 className="text-white font-medium text-[17px] tracking-wide text-center">
          Hotéis c/ Quadras
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

      {/* Card Branco Central com Rolagem */}
      <div className="flex-1 p-2 pt-0 pb-2.5 flex flex-col overflow-hidden bg-gradient-to-b from-[#0074c7] to-[#0094f7]">
        <div className="w-full h-full bg-white rounded-[24px] shadow-sm overflow-hidden flex flex-col relative">
          
          {/* BANNER CTA PERSUASIVO PARA HOTÉIS E POUSADAS */}
          <div className="bg-gradient-to-r from-[#008f5a] to-[#00a86b] text-white p-3 shadow-xs border-b border-emerald-400/40">
            <div className="flex items-center justify-between gap-2">
              <div className="flex-1">
                <p className="text-[12px] font-black tracking-tight flex items-center gap-1.5 text-amber-300">
                  <span>🏨</span>
                  <span>Tem Hotel ou Pousada com Quadras?</span>
                </p>
                <p className="text-[10px] text-emerald-100 leading-tight mt-0.5">
                  Anuncie para tenistas que viajam e buscam onde jogar!
                </p>
              </div>

              {/* Botão CTA Verde Limão Suave da Imagem Anexa (#a3cb53) */}
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setIsRegisterModalOpen(true)}
                className="py-1.5 px-3 rounded-full bg-[#a3cb53] hover:bg-[#92ba42] text-white font-bold text-[11px] shadow-[0_3px_8px_rgba(163,203,83,0.45)] whitespace-nowrap cursor-pointer transition flex items-center gap-1"
              >
                <PlusCircle className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Quero Anunciar</span>
              </motion.button>
            </div>
          </div>

          {/* Filtro de Cidades / Destinos de Tênis */}
          <div className="p-2 bg-slate-50 border-b border-slate-100 flex items-center gap-2">
            <div className="flex-1 flex items-center bg-white border border-slate-200 rounded-lg px-2 py-1 shadow-2xs">
              <MapPin className="w-3.5 h-3.5 text-amber-500 mr-1.5 shrink-0" />
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full bg-transparent text-xs text-slate-700 font-semibold focus:outline-none cursor-pointer"
              >
                {cities.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center bg-white border border-slate-200 rounded-lg px-2 py-1 shadow-2xs w-36">
              <Search className="w-3.5 h-3.5 text-slate-400 mr-1 shrink-0" />
              <input
                type="text"
                placeholder="Buscar hotel..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs text-slate-700 placeholder-slate-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Abas de Tipos de Hospedagem */}
          <div className="px-2.5 py-1.5 border-b border-slate-100 flex items-center gap-1.5 overflow-x-auto bg-white">
            {types.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                className={`px-2.5 py-1 rounded-full text-[10.5px] font-semibold transition whitespace-nowrap cursor-pointer ${
                  selectedType === t
                    ? 'bg-[#00a86b] text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100 bg-slate-50'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Lista de Cards de Hotéis com Quadras */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {filteredHotels.map((item) => {
              const cleanPhone = item.phone.replace(/\D/g, '');
              const cleanWhatsapp = item.whatsapp.replace(/\D/g, '');

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedHotel(item)}
                  className="bg-white rounded-xl border border-slate-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-md transition p-3 flex gap-3 cursor-pointer relative group"
                >
                  {/* Imagem do Hotel à Esquerda */}
                  <div className="w-20 h-20 rounded-md overflow-hidden bg-slate-100 shrink-0 border border-slate-200 shadow-2xs">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Informações à Direita */}
                  <div className="flex-1 flex flex-col justify-between min-h-[80px]">
                    <div>
                      {/* Título com Badge de Plano e Menu */}
                      <div className="flex items-start justify-between gap-1">
                        <div className="flex flex-col">
                          <h3 className="text-[13px] font-bold text-slate-900 leading-tight group-hover:text-emerald-700 transition-colors">
                            {item.name}
                          </h3>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            {getTierBadge(item.tier)}
                            <span className="text-[9px] text-emerald-800 font-bold bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded">
                              🎾 {item.courtsCount} {item.courtsCount === 1 ? 'Quadra' : 'Quadras'} ({item.courtSurfaces[0]})
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedHotel(item);
                          }}
                          className="text-slate-400 hover:text-slate-700 p-0.5 rounded cursor-pointer"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Descrição */}
                      <p className="text-[11px] text-[#555555] leading-snug line-clamp-2 mt-1">
                        {item.description}
                      </p>
                    </div>

                    {/* Localização com Pin Amarelo */}
                    <div className="flex items-center gap-1 text-[11px] text-[#444444] font-medium mt-1.5">
                      <span className="text-amber-500 font-bold">📍</span>
                      <span className="truncate">{item.location}</span>
                    </div>

                    {/* Contatos com WhatsApp Verde Oficial e Telefone Fixo */}
                    <div className="flex items-center gap-3 mt-1.5 pt-1.5 border-t border-slate-100 text-[11px]">
                      {/* WhatsApp Verde */}
                      <a
                        href={`https://wa.me/55${cleanWhatsapp}?text=${encodeURIComponent('Olá! Vi seu hotel no Tudo para Tenistas e gostaria de informações sobre reservas.')}`}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1.5 text-[#128C7E] font-semibold hover:underline"
                        title="Reservas pelo WhatsApp"
                      >
                        <WhatsAppIcon className="w-4 h-4 shrink-0" />
                        <span className="font-mono">{item.whatsapp}</span>
                      </a>

                      {/* Telefone Fixo */}
                      <a
                        href={`tel:${cleanPhone}`}
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1 text-[#d9383a] font-semibold hover:underline"
                        title="Ligar para Recepção"
                      >
                        <LandlinePhoneIcon className="w-3.5 h-3.5 shrink-0" color="#d9383a" />
                        <span className="font-mono">{item.phone}</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Rodapé Simples e Objetivo no final da lista */}
            <div className="pt-3 pb-3 flex flex-col items-center justify-center">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setExpandRadius(true);
                  setSelectedCity('Todas as Cidades');
                }}
                className="py-2.5 px-6 rounded-full bg-[#f5a623] hover:bg-[#e09418] text-white font-bold text-xs shadow-[0_4px_12px_rgba(245,166,35,0.35)] transition cursor-pointer uppercase tracking-wider flex items-center gap-1.5"
                title="Expandir busca para outras cidades"
              >
                <MapPin className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Buscar em Outras Cidades</span>
              </motion.button>
            </div>
          </div>

          {/* Toast Notification */}
          <AnimatePresence>
            {toastMessage && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute bottom-4 left-4 right-4 bg-slate-900 text-white text-xs py-2.5 px-4 rounded-xl shadow-lg flex items-center justify-between z-40 border border-slate-700"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#a3cb53] shrink-0" />
                  <span>{toastMessage}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Modal de Detalhes do Hotel */}
          <AnimatePresence>
            {selectedHotel && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                className="absolute inset-0 z-50"
              >
                <HotelDetailModal
                  hotel={selectedHotel}
                  onClose={() => setSelectedHotel(null)}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Modal de Cadastro de Novo Hotel Anunciante */}
          <AnimatePresence>
            {isRegisterModalOpen && (
              <RegisterHotelModal
                onClose={() => setIsRegisterModalOpen(false)}
                onSubmitSuccess={handleAddNewHotel}
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Modal de Notificações */}
      {isNotificationsOpen && (
        <NotificationsModal onClose={() => setIsNotificationsOpen(false)} />
      )}
    </div>
  );
};

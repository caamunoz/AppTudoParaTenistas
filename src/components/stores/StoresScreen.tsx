import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MapPin,
  MoreVertical,
  Search,
  PlusCircle,
  ShoppingBag,
  Scissors,
  Activity,
  CheckCircle2,
  Sparkles,
  Bell,
} from 'lucide-react';
import { INITIAL_STORES } from '../../data/mockTennisStores';
import { TennisStoreService, StoreCategory } from '../../types/tennisStores';
import { AdvertiserTier } from '../../types/tennisAcademies';
import { WhatsAppIcon, LandlinePhoneIcon } from '../common/ContactIcons';
import { StoreDetailModal } from './StoreDetailModal';
import { RegisterStoreModal } from './RegisterStoreModal';
import { NotificationsModal } from '../common/NotificationsModal';
import { HomeTennisBallButton } from '../common/HomeTennisBallButton';

interface StoresScreenProps {
  onBackToMenu: () => void;
  onToggleDrawer?: () => void;
}

export const StoresScreen: React.FC<StoresScreenProps> = ({
  onBackToMenu,
  onToggleDrawer,
}) => {
  const [storesList, setStoresList] = useState<TennisStoreService[]>(INITIAL_STORES);
  const [selectedCity, setSelectedCity] = useState<string>('Todas as Cidades');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandRadius, setExpandRadius] = useState<boolean>(false);
  const [selectedStore, setSelectedStore] = useState<TennisStoreService | null>(null);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState<boolean>(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const cities = ['Todas as Cidades', 'Taubaté', 'São Paulo', 'Ferraz de Vasconcelos', 'Rio de Janeiro'];
  const categories = ['Todas', 'Lojas e Artigos', 'Encordoamento', 'Customização', 'Fisioterapia'];

  // Peso de ordenação por plano
  const tierWeight: Record<AdvertiserTier, number> = {
    diamond: 1,
    gold: 2,
    silver: 3,
    bronze: 4,
    free: 5,
  };

  const handleAddNewStore = (newStore: TennisStoreService) => {
    setStoresList((prev) => [newStore, ...prev]);
    setToastMessage(`Loja/Serviço "${newStore.name}" cadastrado! Enviado para revisão do administrador.`);
    setTimeout(() => setToastMessage(null), 4500);
  };

  // Filtragem e ordenação estrita
  const filteredStores = storesList
    .filter((item) => {
      const matchCity =
        selectedCity === 'Todas as Cidades' || item.city.toLowerCase() === selectedCity.toLowerCase();

      const matchCategory =
        selectedCategory === 'Todas' ||
        (selectedCategory === 'Lojas e Artigos' && item.category === 'loja') ||
        (selectedCategory === 'Encordoamento' && item.category === 'encordoamento') ||
        (selectedCategory === 'Customização' && item.category === 'customizacao') ||
        (selectedCategory === 'Fisioterapia' && item.category === 'fisioterapia');

      const matchSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.catalog.some((c) => c.name.toLowerCase().includes(searchQuery.toLowerCase()));

      if (!expandRadius && selectedCity === 'Todas as Cidades') {
        return (item.distanceKm || 0) < 30 && matchCategory && matchSearch;
      }

      return matchCity && matchCategory && matchSearch;
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

      {/* App Bar Principal com o novo título solicitado: "Lojas e Serviços" */}
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
          Lojas e Serviços
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
          
          {/* BANNER CTA PERSUASIVO PARA LOJISTAS E PRESTADORES */}
          <div className="bg-gradient-to-r from-[#c92a2a] to-[#e63946] text-white p-3 shadow-xs border-b border-red-400/40">
            <div className="flex items-center justify-between gap-2">
              <div className="flex-1">
                <p className="text-[12px] font-black tracking-tight flex items-center gap-1.5 text-amber-300">
                  <span>🛍️</span>
                  <span>Tem Loja ou Presta Serviços de Tênis?</span>
                </p>
                <p className="text-[10px] text-red-100 leading-tight mt-0.5">
                  Anuncie raquetes, cordas e serviços direto para tenistas!
                </p>
              </div>

              {/* Botão CTA Verde Limão Suave da Referência (#a3cb53) */}
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

          {/* Filtro de Cidades e Busca */}
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
                placeholder="Buscar produto..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs text-slate-700 placeholder-slate-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Abas de Categorias de Lojas e Serviços */}
          <div className="px-2.5 py-1.5 border-b border-slate-100 flex items-center gap-1.5 overflow-x-auto bg-white">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-full text-[10.5px] font-semibold transition whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#e63946] text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100 bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Lista de Cards de Lojas e Serviços */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {filteredStores.map((item) => {
              const cleanPhone = item.phone.replace(/\D/g, '');
              const cleanWhatsapp = item.whatsapp.replace(/\D/g, '');

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedStore(item)}
                  className="bg-white rounded-xl border border-slate-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-md transition p-3 flex gap-3 cursor-pointer relative group"
                >
                  {/* Imagem da Loja à Esquerda */}
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
                          <h3 className="text-[13px] font-bold text-slate-900 leading-tight group-hover:text-red-700 transition-colors">
                            {item.name}
                          </h3>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            {getTierBadge(item.tier)}
                            <span className="text-[9px] text-slate-500 font-semibold bg-slate-100 px-1 py-0.2 rounded">
                              {item.categoryLabel}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedStore(item);
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

                    {/* Localização */}
                    <div className="flex items-center gap-1 text-[11px] text-[#444444] font-medium mt-1.5">
                      <span className="text-amber-500 font-bold">📍</span>
                      <span className="truncate">{item.location}</span>
                    </div>

                    {/* Contatos com WhatsApp Verde Oficial e Telefone Fixo */}
                    <div className="flex items-center gap-3 mt-1.5 pt-1.5 border-t border-slate-100 text-[11px]">
                      {/* WhatsApp Verde */}
                      <a
                        href={`https://wa.me/55${cleanWhatsapp}?text=${encodeURIComponent('Olá! Vi sua loja no Tudo para Tenistas.')}`}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1.5 text-[#128C7E] font-semibold hover:underline"
                        title="Conversar no WhatsApp"
                      >
                        <WhatsAppIcon className="w-4 h-4 shrink-0" />
                        <span className="font-mono">{item.whatsapp}</span>
                      </a>

                      {/* Telefone Fixo */}
                      <a
                        href={`tel:${cleanPhone}`}
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1 text-[#d9383a] font-semibold hover:underline"
                        title="Ligar para Telefone Fixo"
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

          {/* Modal de Detalhes da Loja */}
          <AnimatePresence>
            {selectedStore && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                className="absolute inset-0 z-50"
              >
                <StoreDetailModal
                  store={selectedStore}
                  onClose={() => setSelectedStore(null)}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Modal de Cadastro de Nova Loja / Serviço */}
          <AnimatePresence>
            {isRegisterModalOpen && (
              <RegisterStoreModal
                onClose={() => setIsRegisterModalOpen(false)}
                onSubmitSuccess={handleAddNewStore}
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

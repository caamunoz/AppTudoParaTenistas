import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Plus,
  Minus,
  X,
  Search,
  MapPin,
  ChevronDown,
  Star,
  PlusCircle,
  Bell,
  Layers,
  CheckCircle2,
  Phone,
} from 'lucide-react';
import { INITIAL_MAP_COURTS } from '../../data/mockCourtsMap';
import { TennisCourtMarker, CourtSurface } from '../../types/tennisCourtsMap';
import { CourtPinIcon, UserCourtLocationPin } from './CourtPinIcon';
import { CourtDetailModal } from './CourtDetailModal';
import { SuggestCourtModal, CourtSuggestionData } from '../players/SuggestCourtModal';
import { NotificationsModal } from '../common/NotificationsModal';
import { WhatsAppIcon } from '../common/ContactIcons';
import { HomeTennisBallButton } from '../common/HomeTennisBallButton';

interface FindCourtsMapScreenProps {
  onBackToMenu: () => void;
  onToggleDrawer?: () => void;
}

export const FindCourtsMapScreen: React.FC<FindCourtsMapScreenProps> = ({
  onBackToMenu,
  onToggleDrawer,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [showUserLocationPopup, setShowUserLocationPopup] = useState<boolean>(true);
  const [selectedCourt, setSelectedCourt] = useState<TennisCourtMarker | null>(null);
  const [fullDetailCourt, setFullDetailCourt] = useState<TennisCourtMarker | null>(null);
  const [isSuggestCourtOpen, setIsSuggestCourtOpen] = useState<boolean>(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);
  const [selectedCity, setSelectedCity] = useState<string>('Todas as Cidades');
  const [selectedSurface, setSelectedSurface] = useState<string>('Todas');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [courtList, setCourtList] = useState<TennisCourtMarker[]>(INITIAL_MAP_COURTS);

  const cities = [
    'Todas as Cidades',
    'São Paulo',
    'Guarulhos',
    'Itaquaquecetuba',
    'Ferraz de Vasconcelos',
    'Poá',
    'Suzano',
    'Mogi das Cruzes',
    'Arujá',
    'Ribeirão Pires',
  ];

  const surfaceFilters = ['Todas', 'Saibro', 'Rápida', 'Cobertas', 'Públicas'];

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.15, 1.45));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.15, 0.85));
  };

  const handleAddNewCourtSuggestion = (newCourt: CourtSuggestionData) => {
    const newCourtMarker: TennisCourtMarker = {
      id: `suggested-${Date.now()}`,
      name: newCourt.placeName,
      courtType: (newCourt.courtType.includes('Saibro') ? 'Saibro' : 'Rápida') as CourtSurface,
      courtCount: newCourt.courtCount,
      isCovered: newCourt.isCovered,
      isPublic: newCourt.isPublic,
      pricePerHour: newCourt.isPublic ? 'Gratuita (Pública)' : 'A consultar',
      address: newCourt.streetAddress,
      neighborhood: newCourt.neighborhood,
      city: newCourt.city,
      state: newCourt.state,
      cep: newCourt.cep,
      whatsapp: newCourt.suggesterWhatsapp.replace(/\D/g, ''),
      photoUrl: newCourt.photoUrls[0] || 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=600&q=80',
      rating: 5.0,
      reviewsCount: 1,
      distanceKm: 2.5,
      hasLighting: true,
      hasParking: true,
      hasLockerRooms: true,
      hasCanteen: false,
      openingHours: '07:00 às 22:00',
      xPercent: 38,
      yPercent: 52,
    };

    setCourtList((prev) => [newCourtMarker, ...prev]);
    setToastMessage(`Quadra "${newCourt.placeName}" sugerida com sucesso! Enviada para moderação.`);
    setTimeout(() => setToastMessage(null), 5000);
  };

  // Filtragem de quadras por cidade, tipo de piso e busca
  const filteredCourts = courtList.filter((court) => {
    const matchCity =
      selectedCity === 'Todas as Cidades' ||
      court.city.toLowerCase() === selectedCity.toLowerCase() ||
      (selectedCity === 'São Paulo' &&
        (court.neighborhood.toLowerCase().includes('itaquera') ||
          court.neighborhood.toLowerCase().includes('mateus') ||
          court.city.toLowerCase().includes('são paulo')));

    const matchSurface =
      selectedSurface === 'Todas' ||
      (selectedSurface === 'Saibro' && court.courtType === 'Saibro') ||
      (selectedSurface === 'Rápida' && court.courtType === 'Rápida') ||
      (selectedSurface === 'Cobertas' && court.isCovered) ||
      (selectedSurface === 'Públicas' && court.isPublic);

    const matchSearch =
      !searchQuery.trim() ||
      court.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      court.neighborhood.toLowerCase().includes(searchQuery.toLowerCase()) ||
      court.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      court.courtType.toLowerCase().includes(searchQuery.toLowerCase());

    return matchCity && matchSurface && matchSearch;
  });

  return (
    <div className="relative w-full h-full flex flex-col bg-[#0074c7] select-none overflow-hidden font-sans">
      {/* Android Status Bar (Idêntico ao print 9E_Quadras_tela_85e5e837.png: 15.42) */}
      <div className="w-full bg-[#0074c7] px-3.5 pt-1.5 pb-1 flex justify-between items-center text-white text-[11px] font-medium tracking-tight">
        <div className="flex items-center gap-1.5">
          <span>15.42</span>
          <span className="w-2.5 h-2.5 rounded-full border border-white inline-block"></span>
          <span className="w-2.5 h-2.5 rounded-full border border-white inline-block"></span>
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

        {/* Título Central conforme o print: "Quadras na Região" */}
        <h1 className="text-white font-medium text-[17px] tracking-wide text-center">
          Quadras na Região
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

      {/* Card Branco Central com o Mapa */}
      <div className="flex-1 p-2 pt-0 pb-2.5 flex flex-col overflow-hidden bg-gradient-to-b from-[#0074c7] to-[#0094f7]">
        <div className="w-full h-full bg-[#f4f3f0] rounded-[24px] shadow-sm overflow-hidden relative flex flex-col border border-slate-200">
          
          {/* BANNER VERDE CTA: "Conhece uma Quadra?" + BOTÃO "+ Sugerir Quadra" */}
          <div className="bg-gradient-to-r from-[#009b4d] to-[#007f3e] text-white px-3 py-2.5 flex items-center justify-between gap-2 shadow-xs shrink-0 z-20">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-xl shrink-0">🏟️</span>
              <div className="min-w-0">
                <h3 className="text-[12px] font-black text-amber-300 leading-tight truncate">
                  Conhece alguma Quadra?
                </h3>
                <p className="text-[10px] text-white/90 leading-tight truncate">
                  Indique novos locais para a comunidade jogar!
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsSuggestCourtOpen(true)}
              className="px-3 py-1.5 rounded-full bg-[#a3cb53] hover:bg-[#92b944] text-white text-[11px] font-bold shadow-md transition active:scale-95 flex items-center gap-1 shrink-0 cursor-pointer border border-white/40"
              title="Sugerir uma nova quadra para o mapa"
            >
              <PlusCircle className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Sugerir Quadra</span>
            </button>
          </div>

          {/* BARRA DE FILTROS: CIDADE + BUSCA */}
          <div className="bg-white px-2.5 py-1.5 border-b border-slate-200 flex flex-col gap-1.5 shrink-0 z-20 shadow-2xs">
            <div className="flex items-center gap-2">
              {/* Seletor de Cidades */}
              <div className="relative flex-1">
                <div className="flex items-center gap-1 px-2 py-1 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 text-[11px] font-medium">
                  <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full bg-transparent focus:outline-none cursor-pointer pr-4 appearance-none text-[11px] text-slate-700 font-medium"
                  >
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-3 h-3 text-slate-400 absolute right-1.5 pointer-events-none" />
                </div>
              </div>

              {/* Busca por Nome de Quadra ou Bairro */}
              <div className="relative flex-1">
                <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 text-[11px]">
                  <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <input
                    type="text"
                    placeholder="Buscar quadra..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent focus:outline-none placeholder:text-slate-400 text-[11px]"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Chips de Superfície da Quadra */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar text-[10px]">
              {surfaceFilters.map((surface) => {
                const isActive = selectedSurface === surface;
                return (
                  <button
                    key={surface}
                    onClick={() => setSelectedSurface(surface)}
                    className={`px-2 py-0.5 rounded-full font-bold transition whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'bg-[#0074c7] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {surface}
                  </button>
                );
              })}
              <span className="text-[10px] text-slate-400 font-medium ml-auto pr-1">
                {filteredCourts.length} {filteredCourts.length === 1 ? 'quadra' : 'quadras'}
              </span>
            </div>
          </div>

          {/* ÁREA DO MAPA */}
          <div className="flex-1 relative overflow-hidden">
            {/* MAPA ESTILIZADO IDÊNTICO AO PRINT 9E_Quadras_tela_85e5e837.png */}
            <div
              className="relative w-full h-full overflow-hidden transition-transform duration-200 origin-center"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              {/* Mapa de Fundo Vetorial com Traçados de Ruas e Rodovias */}
              <svg
                className="w-full h-full object-cover select-none pointer-events-none"
                viewBox="0 0 500 700"
                preserveAspectRatio="xMidYMid slice"
              >
                {/* Fundo do Mapa */}
                <rect width="500" height="700" fill="#f2efe9" />

                {/* Áreas Verdes / Parques de São Paulo e Região Metropolitana */}
                <path d="M 40 180 Q 90 190 120 220 T 130 260 L 30 260 Z" fill="#d8e8c8" />
                <path d="M 330 540 Q 380 550 420 600 T 450 670 L 310 670 Z" fill="#dbeacc" />
                <path d="M 40 480 Q 90 490 110 520 T 120 560 L 50 560 Z" fill="#d8e8c8" />

                {/* Rio Tietê e Afluentes com tom azul suave */}
                <path
                  d="M 20 230 C 80 200, 150 240, 220 220 S 320 260, 420 240 S 480 250, 500 240"
                  fill="none"
                  stroke="#aad3df"
                  strokeWidth="14"
                  strokeLinecap="round"
                />
                <path
                  d="M 120 230 Q 180 280 240 270 T 360 330 T 470 340"
                  fill="none"
                  stroke="#c2e1eb"
                  strokeWidth="6"
                />

                {/* Malha de Rodovias e Avenidas Principais (Traçado Vermelho e Laranja) */}
                <path d="M 10 180 L 490 280" fill="none" stroke="#f28d82" strokeWidth="4" />
                <path d="M 120 380 L 140 680" fill="none" stroke="#fca16e" strokeWidth="4.5" />
                <path d="M 40 400 L 460 380" fill="none" stroke="#ffffff" strokeWidth="6" />
                <path d="M 40 400 L 460 380" fill="none" stroke="#fab565" strokeWidth="3" />
                <path d="M 110 400 L 450 600" fill="none" stroke="#ffffff" strokeWidth="5" />
                <path d="M 110 400 L 450 600" fill="none" stroke="#f68d7f" strokeWidth="2.5" />

                {/* Rodovia SP-021 e SPA-052/031 */}
                <path d="M 360 480 L 450 680" stroke="#f28d82" strokeWidth="3.5" fill="none" />
                <path d="M 120 600 L 480 500" stroke="#fca16e" strokeWidth="3" fill="none" />

                {/* Ruas Secundárias Brancas */}
                <path d="M 30 70 L 470 120" stroke="#ffffff" strokeWidth="3.5" fill="none" />
                <path d="M 40 300 L 460 320" stroke="#ffffff" strokeWidth="3" fill="none" />
                <path d="M 220 50 L 260 680" stroke="#ffffff" strokeWidth="3.5" fill="none" />
                <path d="M 360 80 L 370 650" stroke="#ffffff" strokeWidth="3" fill="none" />
                <path d="M 60 550 L 420 520" stroke="#ffffff" strokeWidth="2.5" fill="none" />

                {/* Textos de Cidades e Bairros conforme o print 9E */}
                <text x="25" y="390" fontSize="13" fill="#333333" fontWeight="bold">Guarulhos</text>
                <text x="310" y="465" fontSize="12" fill="#333333" fontWeight="bold">Itaquaquecetuba</text>
                <text x="360" y="695" fontSize="10" fill="#666666">SP-021</text>
                <text x="270" y="650" fontSize="9" fill="#777777">SPA-052/031</text>
              </svg>

              {/* PIN "VOCÊ ESTÁ AQUI" COM BOLA DE TÊNIS VERDE DENTRO (Exato ao print 9E) */}
              <div
                className="absolute z-20 cursor-pointer"
                style={{ left: '40%', top: '58%' }}
                onClick={() => setShowUserLocationPopup(true)}
              >
                <UserCourtLocationPin />

                {/* Popup "Você está aqui" com fechar (x) */}
                {showUserLocationPopup && (
                  <div
                    className="absolute bottom-11 -left-16 bg-white px-3.5 py-1.5 rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.22)] border border-slate-200/80 flex items-center gap-2 whitespace-nowrap z-30"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span className="text-xs font-bold text-slate-800">Você está aqui</span>
                    <button
                      onClick={() => setShowUserLocationPopup(false)}
                      className="text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              {/* PINS DE QUADRAS COM QUADRA AZUL ISOMÉTRICA NO TOPO DO PIN VERMELHO */}
              {filteredCourts.map((court) => (
                <div
                  key={court.id}
                  className="absolute z-20 cursor-pointer transform -translate-x-1/2 -translate-y-full hover:scale-120 active:scale-95 transition-transform"
                  style={{
                    left: `${court.xPercent}%`,
                    top: `${court.yPercent}%`,
                  }}
                  onClick={() => {
                    setSelectedCourt(court);
                    setShowUserLocationPopup(false);
                  }}
                  title={`${court.name} (${court.courtType})`}
                >
                  <CourtPinIcon isCovered={court.isCovered} />
                </div>
              ))}
            </div>

            {/* CONTROLES DE ZOOM [+] E [-] (Canto Superior Esquerdo do Print 9E) */}
            <div className="absolute top-3 left-3 z-30 flex flex-col bg-white rounded-lg shadow-md border border-slate-200 overflow-hidden">
              <button
                onClick={handleZoomIn}
                className="w-8 h-8 flex items-center justify-center text-slate-700 hover:bg-slate-100 font-bold border-b border-slate-200 transition cursor-pointer"
                title="Aumentar Zoom"
              >
                <Plus className="w-4 h-4 stroke-[2.8]" />
              </button>
              <button
                onClick={handleZoomOut}
                className="w-8 h-8 flex items-center justify-center text-slate-700 hover:bg-slate-100 font-bold transition cursor-pointer"
                title="Diminuir Zoom"
              >
                <Minus className="w-4 h-4 stroke-[2.8]" />
              </button>
            </div>

            {/* POPUP DA QUADRA AO CLICAR NO PIN */}
            <AnimatePresence>
              {selectedCourt && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 15 }}
                  className="absolute inset-x-4 top-4 z-40 max-w-[290px] mx-auto bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.3)] border border-slate-200 p-3 select-none"
                >
                  {/* Botão Fechar */}
                  <button
                    onClick={() => setSelectedCourt(null)}
                    className="absolute top-2 right-2 p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer z-10"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  {/* Foto da Quadra */}
                  <div className="w-full h-28 rounded-xl overflow-hidden bg-slate-100 mb-2 relative">
                    <img
                      src={selectedCourt.photoUrl}
                      alt={selectedCourt.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-[#0074c7] text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow-xs">
                      {selectedCourt.courtType}
                    </div>
                    <div className="absolute bottom-1 right-1 bg-black/60 text-white text-[9px] px-1.5 py-0.5 rounded font-bold">
                      📍 {selectedCourt.distanceKm} km
                    </div>
                  </div>

                  {/* Dados da Quadra */}
                  <div className="text-center px-1">
                    <h3 className="font-bold text-xs text-slate-900 leading-tight">
                      {selectedCourt.name}
                    </h3>
                    <div className="mt-1 space-y-0.5 text-[10px] text-slate-600">
                      <p>
                        Piso: <strong className="text-slate-800">{selectedCourt.courtType}</strong> • {selectedCourt.courtCount} {selectedCourt.courtCount === 1 ? 'quadra' : 'quadras'}
                      </p>
                      <p className="text-slate-700 font-medium">
                        {selectedCourt.address}, {selectedCourt.neighborhood}
                      </p>
                      <p className="font-black text-[#0074c7] text-[11px] pt-0.5">
                        {selectedCourt.pricePerHour}
                      </p>
                    </div>

                    {/* Botões de Ação */}
                    <div className="mt-2.5 space-y-1.5">
                      <button
                        onClick={() => {
                          setFullDetailCourt(selectedCourt);
                          setSelectedCourt(null);
                        }}
                        className="w-full py-2 px-3 rounded-full bg-[#f5a623] hover:bg-[#e09418] text-white font-bold text-[11px] shadow-sm transition active:scale-95 cursor-pointer uppercase tracking-wider"
                      >
                        Ver Detalhes & Reservar
                      </button>

                      {selectedCourt.whatsapp && (
                        <a
                          href={`https://wa.me/55${selectedCourt.whatsapp}?text=${encodeURIComponent(
                            `Olá! Encontrei a quadra "${selectedCourt.name}" no app Tudo para Tenistas e gostaria de consultar horários disponíveis.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-1.5 px-3 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-[10px] shadow-xs flex items-center justify-center gap-1.5 transition active:scale-95 cursor-pointer uppercase tracking-wider"
                        >
                          <WhatsAppIcon className="w-3.5 h-3.5 fill-white" />
                          <span>WhatsApp da Quadra</span>
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Rodapé Leaflet | Map data © OpenStreetMap (Exato ao Print 9E) */}
          <div className="absolute bottom-1 right-2 z-10 text-[9px] text-slate-500 bg-white/70 backdrop-blur-xs px-1.5 py-0.5 rounded shadow-2xs">
            <span className="text-[#0074c7] font-semibold">Leaflet</span> | Map data © OpenStreetMap
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
        </div>
      </div>

      {/* Modal de Detalhes Completos da Quadra */}
      <AnimatePresence>
        {fullDetailCourt && (
          <CourtDetailModal
            court={fullDetailCourt}
            onClose={() => setFullDetailCourt(null)}
            onOpenSuggestCourt={() => setIsSuggestCourtOpen(true)}
          />
        )}
      </AnimatePresence>

      {/* Modal de Sugerir Nova Quadra */}
      <AnimatePresence>
        {isSuggestCourtOpen && (
          <SuggestCourtModal
            onClose={() => setIsSuggestCourtOpen(false)}
            onSubmitSuccess={handleAddNewCourtSuggestion}
          />
        )}
      </AnimatePresence>

      {/* Modal de Notificações com Badge */}
      {isNotificationsOpen && (
        <NotificationsModal onClose={() => setIsNotificationsOpen(false)} />
      )}
    </div>
  );
};

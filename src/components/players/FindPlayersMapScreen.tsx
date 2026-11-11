import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Plus,
  Minus,
  X,
  Send,
  MessageSquare,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  ChevronRight,
  Smile,
  Bell,
  Search,
  ChevronDown,
} from 'lucide-react';
import { INITIAL_MAP_PLAYERS } from '../../data/mockPlayersMap';
import { TennisPlayerMarker, PlayerChatMessage } from '../../types/tennisPlayersMap';
import { NotificationsModal } from '../common/NotificationsModal';
import { HomeTennisBallButton } from '../common/HomeTennisBallButton';

interface FindPlayersMapScreenProps {
  onBackToMenu: () => void;
  onToggleDrawer?: () => void;
  onOpenNotifications?: () => void;
}

export const FindPlayersMapScreen: React.FC<FindPlayersMapScreenProps> = ({
  onBackToMenu,
  onToggleDrawer,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [showUserLocationPopup, setShowUserLocationPopup] = useState<boolean>(true);
  const [selectedPlayer, setSelectedPlayer] = useState<TennisPlayerMarker | null>(null);
  const [isSendMessageOpen, setIsSendMessageOpen] = useState<boolean>(false);
  const [messageText, setMessageText] = useState<string>('');
  const [chatOpenWithPlayer, setChatOpenWithPlayer] = useState<TennisPlayerMarker | null>(null);
  const [chatMessages, setChatMessages] = useState<PlayerChatMessage[]>([
    {
      id: 'm1',
      sender: 'player',
      text: 'Opa, tudo bem? Costumo jogar no fim de semana de manhã. Bora marcar?',
      time: '09:15',
    },
  ]);
  const [newChatInput, setNewChatInput] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);
  const [selectedCity, setSelectedCity] = useState<string>('Todas as Cidades');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const cities = [
    'Todas as Cidades',
    'São Paulo',
    'Guarulhos',
    'Taubaté',
    'Ferraz de Vasconcelos',
    'Itaquera',
    'São Miguel Paulista',
    'Mogi das Cruzes',
  ];

  // Filtragem de tenistas no mapa por cidade e busca
  const filteredPlayers = INITIAL_MAP_PLAYERS.filter((player) => {
    const matchCity =
      selectedCity === 'Todas as Cidades' ||
      player.city.toLowerCase().includes(selectedCity.toLowerCase()) ||
      player.neighborhood.toLowerCase().includes(selectedCity.toLowerCase()) ||
      (selectedCity === 'São Paulo' &&
        (player.neighborhood.includes('Itaquera') ||
          player.neighborhood.includes('São Miguel') ||
          player.neighborhood.includes('Paulista')));
    const matchSearch =
      !searchQuery.trim() ||
      player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      player.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      player.neighborhood.toLowerCase().includes(searchQuery.toLowerCase()) ||
      player.placesPlaying.toLowerCase().includes(searchQuery.toLowerCase()) ||
      player.level.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCity && matchSearch;
  });

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.15, 1.45));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.15, 0.85));
  };

  const handleSendInitialInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() || !selectedPlayer) return;

    const sentText = messageText;
    setMessageText('');
    setIsSendMessageOpen(false);

    // Adiciona a mensagem enviada ao chat
    setChatMessages((prev) => [
      ...prev,
      {
        id: `msg-${Date.now()}`,
        sender: 'me',
        text: sentText,
        time: 'Agora',
      },
    ]);

    setToastMessage(`Convite enviado para ${selectedPlayer.name}! Notificação enviada.`);
    setTimeout(() => setToastMessage(null), 4000);

    // Abre o chat interativo com o tenista
    setChatOpenWithPlayer(selectedPlayer);
    setSelectedPlayer(null);
  };

  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChatInput.trim()) return;

    const userMsg = newChatInput;
    setNewChatInput('');

    setChatMessages((prev) => [
      ...prev,
      {
        id: `msg-${Date.now()}`,
        sender: 'me',
        text: userMsg,
        time: 'Agora',
      },
    ]);

    // Resposta automática simulada do tenista após 2 segundos
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          id: `msg-reply-${Date.now()}`,
          sender: 'player',
          text: 'Fechado! Conheço uma quadra de saibro ótima aqui perto. Te vejo lá!',
          time: 'Agora',
        },
      ]);
    }, 1800);
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-[#0074c7] select-none overflow-hidden font-sans">
      {/* Android Status Bar */}
      <div className="w-full bg-[#0074c7] px-3.5 pt-1.5 pb-1 flex justify-between items-center text-white text-[11px] font-medium tracking-tight">
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

        {/* Título Central */}
        <h1 className="text-white font-medium text-[17px] tracking-wide text-center">
          Encontre Tenistas
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

      {/* Card Branco Central com o Mapa Interativo dos Prints */}
      <div className="flex-1 p-2 pt-0 pb-2.5 flex flex-col overflow-hidden bg-gradient-to-b from-[#0074c7] to-[#0094f7]">
        <div className="w-full h-full bg-[#f4f3f0] rounded-[24px] shadow-sm overflow-hidden relative flex flex-col border border-slate-200">
          
          {/* BARRA DE FILTRO: CIDADE + BUSCA POR NOME DE TENISTA */}
          <div className="bg-white px-2.5 py-2 border-b border-slate-200 flex items-center gap-2 shrink-0 z-20 shadow-2xs">
            {/* Seletor de Cidades */}
            <div className="relative flex-1">
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 text-[11px] font-medium">
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
                <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 pointer-events-none" />
              </div>
            </div>

            {/* Busca por Nome de Tenista */}
            <div className="relative flex-1">
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 text-[11px]">
                <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Buscar por nome de tenista..."
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

          {/* ÁREA DO MAPA */}
          <div className="flex-1 relative overflow-hidden">
            {/* MAPA ESTILIZADO IDÊNTICO AO PRINT OPENSTREETMAP / LEAFLET */}
            <div
              className="relative w-full h-full overflow-hidden transition-transform duration-200 origin-center"
              style={{ transform: `scale(${zoomLevel})` }}
            >
            {/* Mapa de Fundo Vetorial com Ruas, Bairros e Rios de São Paulo / ZL */}
            <svg
              className="w-full h-full object-cover select-none pointer-events-none"
              viewBox="0 0 500 700"
              preserveAspectRatio="xMidYMid slice"
            >
              {/* Fundo do Mapa */}
              <rect width="500" height="700" fill="#f2efe9" />

              {/* Áreas Verdes / Parques */}
              <path d="M 60 480 Q 90 490 110 520 T 120 560 L 50 560 Z" fill="#d8e8c8" />
              <text x="80" y="525" fontSize="11" fill="#4d724d" fontWeight="bold">Parque do Carmo</text>

              <path d="M 330 540 Q 380 550 420 600 T 450 670 L 310 670 Z" fill="#dbeacc" />
              <text x="350" y="615" fontSize="10" fill="#557755">Bairro dos Ferreira</text>

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

              {/* Ruas Secundárias Brancas */}
              <path d="M 30 70 L 470 120" stroke="#ffffff" strokeWidth="3.5" fill="none" />
              <path d="M 40 300 L 460 320" stroke="#ffffff" strokeWidth="3" fill="none" />
              <path d="M 220 50 L 260 680" stroke="#ffffff" strokeWidth="3.5" fill="none" />
              <path d="M 360 80 L 370 650" stroke="#ffffff" strokeWidth="3" fill="none" />
              <path d="M 60 550 L 420 520" stroke="#ffffff" strokeWidth="2.5" fill="none" />
              <path d="M 80 120 Q 150 160 210 140" stroke="#ffffff" strokeWidth="2" fill="none" />
              <path d="M 320 280 Q 380 340 430 320" stroke="#ffffff" strokeWidth="2.5" fill="none" />

              {/* Textos dos Bairros Idênticos ao Print OpenStreetMap */}
              <text x="210" y="80" fontSize="11" fill="#444444" fontWeight="600">Jardim Nova Cidade</text>
              <text x="140" y="60" fontSize="11" fill="#555555">Vila Maria Dirce</text>
              <text x="100" y="100" fontSize="11" fill="#555555">Jardim Cumbica</text>
              <text x="210" y="145" fontSize="12" fill="#777777" fontStyle="italic">Pimentas</text>
              <text x="160" y="175" fontSize="11" fill="#555555">Vila Pires</text>
              <text x="260" y="180" fontSize="11" fill="#555555">Jardim Maria Alice</text>
              <text x="180" y="250" fontSize="12" fill="#444444" fontWeight="600">Jardim Helena</text>
              <text x="410" y="200" fontSize="16" fill="#333333" fontWeight="bold">Itaquaquecetuba</text>
              <text x="70" y="295" fontSize="14" fill="#333333" fontWeight="bold">São Miguel</text>
              <text x="280" y="305" fontSize="11" fill="#444444" fontWeight="bold">Santa Margarida Paulista</text>
              <text x="140" y="370" fontSize="12" fill="#444444" fontWeight="600">Parada XV de Novembro</text>
              <text x="240" y="380" fontSize="11" fill="#555555">Lajeado</text>
              <text x="315" y="415" fontSize="17" fill="#2d3748" fontWeight="black">Ferraz de Vasconcelos</text>
              <text x="310" y="435" fontSize="11" fill="#555555">Santo Antônio Paulista</text>
              <text x="120" y="505" fontSize="12" fill="#444444" fontWeight="bold">José Bonifácio</text>
              <text x="410" y="480" fontSize="11" fill="#555555">Jardim San Carlos</text>
              <text x="180" y="650" fontSize="12" fill="#444444">Iguatemi</text>
            </svg>

            {/* MARCADOR DO USUÁRIO ("Você está aqui") */}
            <div
              className="absolute z-20 cursor-pointer"
              style={{ left: '33%', top: '48%' }}
              onClick={() => setShowUserLocationPopup(true)}
            >
              {/* Pin Vermelho de Localização do Usuário */}
              <div className="relative flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-red-600 border-2 border-white shadow-lg flex items-center justify-center text-white text-xs font-black animate-bounce">
                  📍
                </div>
                <div className="w-2.5 h-1.5 bg-black/30 rounded-full blur-[1px] mt-0.5" />
              </div>

              {/* Popup "Você está aqui" (Print 9A) */}
              {showUserLocationPopup && (
                <div
                  className="absolute bottom-10 -left-16 bg-white px-3.5 py-1.5 rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.22)] border border-slate-200/80 flex items-center gap-2 whitespace-nowrap z-30"
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

            {/* PINS DOS TENISTAS FILTRADOS (Pinos Azuis em Gota com Bolinha de Tênis dentro) */}
            {filteredPlayers.map((player) => (
              <div
                key={player.id}
                className="absolute z-20 cursor-pointer transform -translate-x-1/2 -translate-y-full hover:scale-115 active:scale-95 transition-transform"
                style={{
                  left: `${player.xPercent}%`,
                  top: `${player.yPercent}%`,
                }}
                onClick={() => {
                  setSelectedPlayer(player);
                  setShowUserLocationPopup(false);
                }}
                title={`${player.name} - ${player.level}`}
              >
                {/* Marcador Gota Azul com Bolinha de Tênis Verde idêntica aos prints 9A e 9B */}
                <div className="relative w-8 h-10 flex flex-col items-center">
                  <svg viewBox="0 0 32 40" className="w-full h-full drop-shadow-md">
                    {/* Formato de gota/marcador azul com ponta para baixo */}
                    <path
                      d="M16 0 C7.16 0 0 7.16 0 16 C0 25.5 16 40 16 40 C16 40 32 25.5 32 16 C32 7.16 24.84 0 16 0 Z"
                      fill="#0099ff"
                    />
                    {/* Bolinha de tênis verde dentro da cabeça do pin */}
                    <circle cx="16" cy="15" r="11" fill="#b8d234" />
                    {/* Linha curva da bolinha */}
                    <path
                      d="M 12 7 C 9 12 9 18 12 23"
                      stroke="#ffffff"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      fill="none"
                    />
                    <path
                      d="M 20 7 C 23 12 23 18 20 23"
                      stroke="#ffffff"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </svg>
                  {/* Sombra suave no chão */}
                  <div className="w-3 h-1 bg-black/25 rounded-full blur-[0.5px] -mt-1" />
                </div>
              </div>
            ))}

          </div>

          {/* CONTROLES DE ZOOM [+] E [-] (Canto Superior Esquerdo do Print) */}
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

          {/* POPUP DO TENISTA AO CLICAR NO PIN (Print 9B_MapaOutro_tela.png) */}
          <AnimatePresence>
            {selectedPlayer && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 15 }}
                className="absolute inset-x-5 top-12 z-40 max-w-[270px] mx-auto bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.25)] border border-slate-200 p-3 select-none"
              >
                {/* Botão de Fechar no Topo Direito */}
                <button
                  onClick={() => setSelectedPlayer(null)}
                  className="absolute top-2 right-2 p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer z-10"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Foto do Jogador jogando na quadra */}
                <div className="w-full h-32 rounded-xl overflow-hidden bg-slate-100 mb-2 relative">
                  <img
                    src={selectedPlayer.photoUrl}
                    alt={selectedPlayer.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-1 right-1 bg-black/50 text-white text-[9px] px-1.5 py-0.2 rounded font-bold">
                    📍 {selectedPlayer.distanceKm} km
                  </div>
                </div>

                {/* Dados do Tenista (Exatos ao Print 9B) */}
                <div className="text-center px-1">
                  <h3 className="font-bold text-sm text-slate-900 leading-tight">
                    {selectedPlayer.name}
                  </h3>
                  <div className="mt-1 space-y-0.5 text-[11px] text-[#555555]">
                    <p>Nível: <strong className="text-slate-700">{selectedPlayer.level}</strong></p>
                    <p>Anos que joga: <strong className="text-slate-700">{selectedPlayer.yearsPlaying}</strong></p>
                    <p>Lugares onde joga: <strong className="text-slate-700">{selectedPlayer.placesPlaying}</strong></p>
                  </div>

                  {/* BOTÃO CONVIDAR PARA JOGAR (Substituindo MARCAR JOGO conforme instrução) */}
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      setIsSendMessageOpen(true);
                    }}
                    className="mt-3 w-full py-2.5 px-4 rounded-full bg-[#f5a623] hover:bg-[#e09418] text-white font-bold text-xs shadow-[0_4px_12px_rgba(245,166,35,0.4)] transition cursor-pointer uppercase tracking-wider"
                  >
                    CONVIDAR PARA JOGAR
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>



          {/* POPUP DE ENVIAR MENSAGEM (Print 9C_MapaMsg_tela.png) */}
          <AnimatePresence>
            {isSendMessageOpen && selectedPlayer && (
              <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
                <motion.div
                  initial={{ opacity: 0, scale: 0.92, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: 10 }}
                  className="w-full max-w-xs bg-white rounded-2xl shadow-2xl p-5 select-none border border-slate-100"
                >
                  <form onSubmit={handleSendInitialInvite}>
                    <h3 className="text-base font-bold text-slate-800 text-center mb-1">
                      Enviar Mensagem
                    </h3>
                    <p className="text-xs text-slate-500 text-center mb-4 font-medium">
                      para: <strong className="text-slate-700">{selectedPlayer.name}</strong>
                    </p>

                    <input
                      type="text"
                      autoFocus
                      required
                      placeholder="Digite sua mensagem"
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 placeholder-slate-400 focus:border-[#0074c7] focus:ring-1 focus:ring-[#0074c7] outline-none mb-5"
                    />

                    <div className="flex items-center justify-end gap-3 text-xs font-bold uppercase tracking-wider">
                      <button
                        type="button"
                        onClick={() => setIsSendMessageOpen(false)}
                        className="px-3 py-1.5 text-slate-500 hover:text-slate-800 transition cursor-pointer"
                      >
                        FECHAR
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-1.5 rounded-lg bg-[#0074c7] hover:bg-[#0063a8] text-white shadow transition cursor-pointer"
                      >
                        ENVIAR
                      </button>
                    </div>
                  </form>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* CHAT INTERNO ENTRE TENISTAS PARA COMBINAR O JOGO */}
          <AnimatePresence>
            {chatOpenWithPlayer && (
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 26, stiffness: 260 }}
                className="absolute inset-0 z-50 bg-white flex flex-col"
              >
                {/* Header do Chat */}
                <div className="bg-[#0074c7] px-4 py-3 flex items-center justify-between text-white shadow-sm">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-white/20 border border-white">
                      <img
                        src={chatOpenWithPlayer.photoUrl}
                        alt={chatOpenWithPlayer.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs">{chatOpenWithPlayer.name}</h4>
                      <p className="text-[10px] text-white/80">{chatOpenWithPlayer.level} &bull; Online</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setToastMessage(`Partida com ${chatOpenWithPlayer.name} agendada! Notificação salva.`);
                        setTimeout(() => setToastMessage(null), 4000);
                      }}
                      className="text-[10px] bg-[#a3cb53] hover:bg-[#92ba42] text-white font-bold px-2.5 py-1 rounded-full shadow-xs cursor-pointer flex items-center gap-1"
                    >
                      <Calendar className="w-3 h-3" />
                      <span>Agendar Jogo</span>
                    </button>
                    <button
                      onClick={() => setChatOpenWithPlayer(null)}
                      className="p-1 rounded-full hover:bg-white/20 text-white cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Área de Mensagens */}
                <div className="flex-1 p-3 overflow-y-auto space-y-2 bg-slate-50">
                  <div className="text-center my-2">
                    <span className="text-[10px] bg-slate-200/80 text-slate-600 px-2.5 py-0.5 rounded-full font-medium">
                      Início da conversa para agendar partida
                    </span>
                  </div>

                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${
                        msg.sender === 'me' ? 'items-end' : 'items-start'
                      }`}
                    >
                      <div
                        className={`max-w-[78%] px-3 py-2 rounded-2xl text-xs leading-relaxed shadow-2xs ${
                          msg.sender === 'me'
                            ? 'bg-[#0074c7] text-white rounded-br-xs'
                            : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs'
                        }`}
                      >
                        {msg.text}
                      </div>
                      <span className="text-[9px] text-slate-400 mt-0.5 px-1 font-mono">
                        {msg.time}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Input do Chat */}
                <form
                  onSubmit={handleSendChatMessage}
                  className="p-2.5 bg-white border-t border-slate-200 flex items-center gap-2"
                >
                  <input
                    type="text"
                    placeholder="Escreva uma mensagem..."
                    value={newChatInput}
                    onChange={(e) => setNewChatInput(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl bg-slate-100 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#0074c7]"
                  />
                  <button
                    type="submit"
                    className="p-2 rounded-xl bg-[#0074c7] text-white hover:bg-[#0063a8] transition cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
          </div>

          {/* Rodapé Leaflet | Map data © OpenStreetMap (Exato ao Print) */}
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

      {/* Modal de Notificações com Badge */}
      {isNotificationsOpen && (
        <NotificationsModal onClose={() => setIsNotificationsOpen(false)} />
      )}
    </div>
  );
};

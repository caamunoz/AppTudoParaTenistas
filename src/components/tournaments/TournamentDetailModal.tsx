import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Trophy,
  Calendar,
  Clock,
  MapPin,
  FileText,
  DollarSign,
  Users,
  Award,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Share2,
} from 'lucide-react';
import { TennisTournament } from '../../types/tennisTournaments';
import { WhatsAppIcon, LandlinePhoneIcon } from '../common/ContactIcons';

interface TournamentDetailModalProps {
  tournament: TennisTournament;
  onClose: () => void;
  onOpenRegistration: () => void;
}

export const TournamentDetailModal: React.FC<TournamentDetailModalProps> = ({
  tournament,
  onClose,
  onOpenRegistration,
}) => {
  const [showRegulations, setShowRegulations] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: tournament.name,
        text: `Confira o ${tournament.name} em ${tournament.city}! Inscrições abertas no app Tudo para Tenistas.`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Olá! Vi o "${tournament.name}" no aplicativo Tudo para Tenistas e gostaria de mais informações sobre o torneio e inscrições.`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-xs font-sans">
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 12 }}
        className="relative w-full max-w-[420px] max-h-[92vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-100"
      >
        {/* Banner com Foto / Logo e Ações */}
        <div className="relative w-full h-44 bg-slate-900 shrink-0">
          <img
            src={tournament.bannerUrl}
            alt={tournament.name}
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

          {/* Botões do Topo */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
            <button
              onClick={handleShare}
              className="w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition cursor-pointer backdrop-blur-xs"
              title="Compartilhar Torneio"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition cursor-pointer backdrop-blur-xs"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Badges de Status e Local */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
            <span
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm ${
                tournament.status === 'closing_soon'
                  ? 'bg-amber-500 text-white animate-pulse'
                  : 'bg-emerald-600 text-white'
              }`}
            >
              {tournament.status === 'closing_soon' ? 'Últimos Dias de Inscrição' : 'Inscrições Abertas'}
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/20 text-white backdrop-blur-xs border border-white/30">
              📍 {tournament.city} - {tournament.state}
            </span>
          </div>

          {/* Logo e Nome do Torneio */}
          <div className="absolute bottom-3 left-3 right-3 flex items-end gap-3 text-white">
            <div className="w-13 h-13 rounded-2xl overflow-hidden border-2 border-white bg-white shrink-0 shadow-md">
              <img
                src={tournament.logoUrl}
                alt={tournament.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              {tournament.edition && (
                <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider">
                  {tournament.edition}
                </span>
              )}
              <h2 className="text-base font-black leading-tight drop-shadow-sm truncate">
                {tournament.name}
              </h2>
              <p className="text-[11px] text-slate-200 truncate mt-0.5">
                {tournament.venueName}
              </p>
            </div>
          </div>
        </div>

        {copiedLink && (
          <div className="bg-emerald-600 text-white text-[11px] py-1 text-center font-bold">
            Link do torneio copiado para a área de transferência!
          </div>
        )}

        {/* Conteúdo com Rolagem - Baseado na imagem 02c767d6 */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-slate-800 text-xs">
          
          {/* Card Principal: Datas e Inscrições */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 space-y-2.5 shadow-2xs">
            <div className="flex items-start gap-2.5">
              <Calendar className="w-4 h-4 text-[#0074c7] shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                  Data de Realização
                </span>
                <p className="font-bold text-slate-900 text-xs leading-tight">
                  {tournament.dateDisplay}
                </p>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  {tournament.gameTimesInfo}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 pt-2 border-t border-slate-200/80">
              <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                  Prazo Limite de Inscrições
                </span>
                <p className="font-bold text-amber-800 text-xs">
                  {tournament.registrationDeadlineDisplay}
                </p>
              </div>
            </div>
          </div>

          {/* Valores de Inscrição */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5">
            <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs mb-2">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              <span>Valores de Inscrição</span>
            </div>
            <div className="space-y-1.5 pl-5.5 text-[11px]">
              {tournament.categories.some((c) => c.level === 'Especial') && (
                <div className="flex justify-between items-center py-0.5 border-b border-slate-200/60">
                  <span className="text-slate-600 font-medium">Categoria Especial:</span>
                  <span className="font-black text-slate-900">R$ 120,00</span>
                </div>
              )}
              <div className="flex justify-between items-center py-0.5">
                <span className="text-slate-600 font-medium">Demais categorias:</span>
                <span className="font-black text-slate-900">R$ 100,00</span>
              </div>
            </div>
          </div>

          {/* Categorias Disponíveis */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5">
            <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs mb-2">
              <Users className="w-4 h-4 text-[#0074c7]" />
              <span>Categorias em Disputa</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="p-2 bg-white rounded-xl border border-slate-200">
                <span className="font-bold text-blue-800 block text-[10px] uppercase">
                  Masculina
                </span>
                <p className="text-slate-700 mt-0.5 font-medium leading-relaxed">
                  Especial, A, B, C e Iniciante
                </p>
              </div>

              <div className="p-2 bg-white rounded-xl border border-slate-200">
                <span className="font-bold text-purple-800 block text-[10px] uppercase">
                  Feminina
                </span>
                <p className="text-slate-700 mt-0.5 font-medium leading-relaxed">
                  A, B e Iniciante
                </p>
              </div>
            </div>

            {tournament.minPlayersPerCategory && (
              <p className="text-[10px] text-slate-500 italic mt-2">
                * Mínimo de {tournament.minPlayersPerCategory} jogadores para realização da categoria.
              </p>
            )}
          </div>

          {/* Quadro de Premiação Extraído da Imagem 02c767d6 */}
          <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-3.5 space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-amber-950 text-xs">
              <Trophy className="w-4 h-4 text-amber-600 fill-amber-300" />
              <span>Premiação por Categoria</span>
            </div>

            <div className="space-y-2 pt-1 text-[11px]">
              {tournament.categories.map((cat, idx) => (
                <div
                  key={idx}
                  className="bg-white/80 p-2 rounded-xl border border-amber-100 flex items-center justify-between gap-2"
                >
                  <div>
                    <span className="font-bold text-slate-900 text-[11px] block">
                      {cat.name}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      Vice: {cat.runnerUpPrize}
                    </span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[10px] uppercase font-bold text-amber-700 block">
                      Campeão
                    </span>
                    <span className="font-black text-emerald-700 text-xs">
                      {cat.championPrize}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {tournament.rulesNotes && (
              <p className="text-[10px] text-amber-900 italic pt-1">
                ** {tournament.rulesNotes}
              </p>
            )}
          </div>

          {/* Local e Endereço Completo */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs">
                <MapPin className="w-4 h-4 text-red-500" />
                <span>Local dos Jogos</span>
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  `${tournament.venueName}, ${tournament.venueAddress}, ${tournament.city} - ${tournament.state}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-bold text-[#0074c7] hover:underline flex items-center gap-0.5"
              >
                <span>Abrir no Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <p className="text-slate-800 font-bold text-xs pl-5.5">
              {tournament.venueName}
            </p>
            <p className="text-slate-600 text-[11px] pl-5.5">
              {tournament.venueAddress} &bull; {tournament.city} - {tournament.state}
            </p>
            <p className="text-slate-500 text-[10px] pl-5.5">
              CEP: {tournament.venueCep}
            </p>
          </div>

          {/* Botão de Regulamento */}
          <div>
            <button
              onClick={() => setShowRegulations(!showRegulations)}
              className="w-full py-2.5 px-4 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center justify-between transition cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-slate-500" />
                <span>Regulamento Oficial do Torneio</span>
              </div>
              <ChevronRight
                className={`w-4 h-4 text-slate-400 transition-transform ${
                  showRegulations ? 'rotate-90' : ''
                }`}
              />
            </button>

            {showRegulations && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-2 p-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-700 whitespace-pre-line leading-relaxed font-mono"
              >
                {tournament.regulationsText}
              </motion.div>
            )}
          </div>

          {/* BOTÃO PRINCIPAL DE INSCRIÇÃO (Em destaque solicitado) */}
          <div className="pt-2 space-y-2">
            <button
              onClick={onOpenRegistration}
              className="w-full py-3.5 px-4 rounded-full bg-[#a3cb53] hover:bg-[#92b944] text-white font-black text-sm shadow-[0_4px_16px_rgba(163,203,83,0.4)] transition active:scale-95 cursor-pointer uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <Trophy className="w-4 h-4 fill-white" />
              <span>INSCREVA-SE AGORA</span>
            </button>

            {/* Contato via WhatsApp com Organização */}
            {tournament.organizerWhatsapp && (
              <a
                href={`https://wa.me/55${tournament.organizerWhatsapp}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs shadow-xs flex items-center justify-center gap-2 transition active:scale-95 cursor-pointer uppercase tracking-wider"
              >
                <WhatsAppIcon className="w-4 h-4 fill-white" />
                <span>Falar com a Organização</span>
              </a>
            )}

            <button
              onClick={onClose}
              className="w-full py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs transition cursor-pointer"
            >
              Voltar à Lista de Torneios
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

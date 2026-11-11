import React from 'react';
import { motion } from 'motion/react';
import {
  X,
  MapPin,
  Star,
  Clock,
  Layers,
  CheckCircle2,
  Car,
  Lightbulb,
  ShowerHead,
  Coffee,
  ShieldCheck,
  Calendar,
} from 'lucide-react';
import { TennisCourtMarker } from '../../types/tennisCourtsMap';
import { WhatsAppIcon, LandlinePhoneIcon } from '../common/ContactIcons';

interface CourtDetailModalProps {
  court: TennisCourtMarker;
  onClose: () => void;
  onOpenSuggestCourt?: () => void;
}

export const CourtDetailModal: React.FC<CourtDetailModalProps> = ({
  court,
  onClose,
  onOpenSuggestCourt,
}) => {
  const getSurfaceColor = (surface: string) => {
    switch (surface) {
      case 'Saibro':
        return 'bg-amber-600 text-white';
      case 'Rápida':
        return 'bg-blue-600 text-white';
      case 'Grama Sintética':
      case 'Grama Natural':
        return 'bg-emerald-600 text-white';
      default:
        return 'bg-purple-600 text-white';
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Olá! Vi a quadra "${court.name}" no aplicativo Tudo para Tenistas e gostaria de consultar horários disponíveis e valores para locação/jogo.`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-xs font-sans">
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 12 }}
        className="relative w-full max-w-[410px] max-h-[92vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-100"
      >
        {/* Banner com Foto da Quadra */}
        <div className="relative w-full h-44 bg-slate-900 shrink-0">
          <img
            src={court.photoUrl}
            alt={court.name}
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Botão Fechar no Topo Direito */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition cursor-pointer backdrop-blur-xs"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badges de Superfície e Distância */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
            <span
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm ${getSurfaceColor(
                court.courtType
              )}`}
            >
              {court.courtType}
            </span>
            {court.isCovered && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-600 text-white shadow-sm">
                Coberta
              </span>
            )}
            {court.isPublic && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500 text-white shadow-sm">
                Pública / Gratuita
              </span>
            )}
          </div>

          {/* Nome e Avaliação sobre o Banner */}
          <div className="absolute bottom-3 left-3 right-3 text-white">
            <h2 className="text-base font-black leading-tight drop-shadow-sm">
              {court.name}
            </h2>
            <div className="flex items-center gap-2 mt-1 text-xs text-slate-200">
              <span className="flex items-center gap-1 font-bold text-amber-300">
                <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                {court.rating.toFixed(1)}
              </span>
              <span>&bull;</span>
              <span>{court.reviewsCount} avaliações</span>
              <span>&bull;</span>
              <span>📍 {court.distanceKm} km daqui</span>
            </div>
          </div>
        </div>

        {/* Conteúdo com Rolagem */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-slate-800 text-xs">
          {/* Card de Preço e Capacidade */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200 shadow-2xs">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                Valor da Locação
              </span>
              <p className="text-base font-black text-[#0074c7]">{court.pricePerHour}</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                Estrutura
              </span>
              <p className="text-xs font-bold text-slate-800 flex items-center justify-end gap-1">
                <Layers className="w-3.5 h-3.5 text-slate-600" />
                {court.courtCount} {court.courtCount === 1 ? 'quadra' : 'quadras'}
              </p>
            </div>
          </div>

          {/* Endereço Completo */}
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="flex items-center gap-1.5 text-slate-700 font-bold text-[11px]">
              <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Localização e Endereço</span>
            </div>
            <p className="text-slate-800 font-medium pl-5.5">
              {court.address} - {court.neighborhood}
            </p>
            <p className="text-slate-500 text-[11px] pl-5.5">
              {court.city} - {court.state} &bull; CEP: {court.cep}
            </p>
          </div>

          {/* Comodidades e Estrutura */}
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block mb-2">
              Comodidades da Quadra
            </span>
            <div className="grid grid-cols-2 gap-2">
              <div
                className={`flex items-center gap-2 p-2 rounded-xl border text-[11px] ${
                  court.hasLighting
                    ? 'bg-amber-50/60 border-amber-200 text-amber-900 font-medium'
                    : 'bg-slate-50 border-slate-200 text-slate-400 line-through'
                }`}
              >
                <Lightbulb className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Iluminação Noturna</span>
              </div>

              <div
                className={`flex items-center gap-2 p-2 rounded-xl border text-[11px] ${
                  court.hasParking
                    ? 'bg-blue-50/60 border-blue-200 text-blue-900 font-medium'
                    : 'bg-slate-50 border-slate-200 text-slate-400 line-through'
                }`}
              >
                <Car className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>Estacionamento</span>
              </div>

              <div
                className={`flex items-center gap-2 p-2 rounded-xl border text-[11px] ${
                  court.hasLockerRooms
                    ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900 font-medium'
                    : 'bg-slate-50 border-slate-200 text-slate-400 line-through'
                }`}
              >
                <ShowerHead className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Vestiários c/ Ducha</span>
              </div>

              <div
                className={`flex items-center gap-2 p-2 rounded-xl border text-[11px] ${
                  court.hasCanteen
                    ? 'bg-purple-50/60 border-purple-200 text-purple-900 font-medium'
                    : 'bg-slate-50 border-slate-200 text-slate-400 line-through'
                }`}
              >
                <Coffee className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                <span>Bar / Lanchonete</span>
              </div>
            </div>
          </div>

          {/* Horário de Funcionamento */}
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px]">
            <Clock className="w-4 h-4 text-slate-500 shrink-0" />
            <span className="text-slate-600">Funcionamento:</span>
            <span className="font-bold text-slate-800">{court.openingHours}</span>
          </div>

          {/* Botões de Ação com Estilo image_51d9645a.png */}
          <div className="pt-2 space-y-2">
            {court.whatsapp && (
              <a
                href={`https://wa.me/55${court.whatsapp}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition active:scale-95 cursor-pointer uppercase tracking-wider"
              >
                <WhatsAppIcon className="w-4 h-4 fill-white" />
                <span>Agendar Horário pelo WhatsApp</span>
              </a>
            )}

            {court.phone && (
              <a
                href={`tel:${court.phone.replace(/\D/g, '')}`}
                className="w-full py-2.5 px-4 rounded-full bg-[#0074c7] hover:bg-[#0063a8] text-white font-bold text-xs shadow-sm flex items-center justify-center gap-2 transition active:scale-95 cursor-pointer uppercase tracking-wider"
              >
                <LandlinePhoneIcon className="w-4 h-4 text-white" />
                <span>Ligar para a Recepção: {court.phone}</span>
              </a>
            )}

            <button
              onClick={onClose}
              className="w-full py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs transition cursor-pointer"
            >
              Voltar ao Mapa
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

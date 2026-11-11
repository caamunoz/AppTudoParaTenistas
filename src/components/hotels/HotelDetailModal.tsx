import React from 'react';
import { ArrowLeft, MapPin, CheckCircle2, Star, Clock, Sparkles } from 'lucide-react';
import { WhatsAppIcon, LandlinePhoneIcon } from '../common/ContactIcons';
import { TennisHotel } from '../../types/tennisHotels';

interface HotelDetailModalProps {
  hotel: TennisHotel;
  onClose: () => void;
}

export const HotelDetailModal: React.FC<HotelDetailModalProps> = ({ hotel, onClose }) => {
  const getTierBadge = (tier: string) => {
    switch (tier) {
      case 'diamond':
        return { label: '💎 HOTEL DIAMANTE', bg: 'bg-indigo-600', text: 'text-white' };
      case 'gold':
        return { label: '🥇 HOTEL OURO', bg: 'bg-amber-500', text: 'text-slate-950' };
      case 'silver':
        return { label: '🥈 HOTEL PRATA', bg: 'bg-slate-300', text: 'text-slate-900' };
      case 'bronze':
        return { label: '🥉 HOTEL BRONZE', bg: 'bg-amber-700', text: 'text-white' };
      default:
        return { label: '⚪ ANUNCIANTE GRÁTIS', bg: 'bg-slate-200', text: 'text-slate-700' };
    }
  };

  const badge = getTierBadge(hotel.tier);
  const cleanPhone = hotel.phone.replace(/\D/g, '');
  const cleanWhatsapp = hotel.whatsapp.replace(/\D/g, '');

  return (
    <div className="absolute inset-0 z-50 bg-white flex flex-col text-slate-800 select-none overflow-hidden font-sans">
      {/* Header */}
      <div className="bg-[#0074c7] px-4 py-3 flex items-center justify-between text-white shadow-md">
        <div className="flex items-center gap-2">
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/20 transition cursor-pointer"
            title="Voltar"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <span className="text-sm font-bold tracking-wide truncate max-w-[240px]">
            {hotel.name}
          </span>
        </div>
        <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-xs ${badge.bg} ${badge.text}`}>
          {badge.label}
        </span>
      </div>

      {/* Conteúdo com Scroll */}
      <div className="flex-1 overflow-y-auto">
        {/* Foto de Capa */}
        <div className="w-full h-48 relative bg-slate-100 overflow-hidden">
          <img
            src={hotel.imageUrl}
            alt={hotel.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
            <span className="text-xs font-semibold bg-black/40 backdrop-blur px-2.5 py-1 rounded-full">
              📍 {hotel.city}, {hotel.state}
            </span>
            {hotel.rating && (
              <div className="flex items-center gap-1 bg-amber-500 text-slate-950 font-black text-xs px-2.5 py-1 rounded-full shadow-sm">
                <Star className="w-3.5 h-3.5 fill-slate-950" />
                <span>{hotel.rating.toFixed(1)}</span>
                <span className="text-[10px] opacity-80 font-normal">({hotel.reviewsCount})</span>
              </div>
            )}
          </div>
        </div>

        {/* Informações do Hotel */}
        <div className="p-5 space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full uppercase">
                {hotel.typeLabel}
              </span>
              <span className="text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
                🎾 {hotel.courtsCount} {hotel.courtsCount === 1 ? 'Quadra' : 'Quadras'}
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 leading-tight">
              {hotel.name}
            </h2>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              <span>{hotel.location}</span>
              {hotel.distanceKm !== undefined && (
                <span className="text-blue-600 font-semibold font-mono">({hotel.distanceKm} km)</span>
              )}
            </div>
          </div>

          {/* Destaque das Quadras */}
          <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl">
            <p className="text-[11px] font-bold text-emerald-900 uppercase tracking-wider mb-1.5">
              Pisos e Estrutura de Tênis:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {hotel.courtSurfaces.map((surface, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-white text-emerald-800 border border-emerald-300 shadow-2xs"
                >
                  {surface}
                </span>
              ))}
            </div>
          </div>

          {/* Descrição */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
            <p className="text-xs text-slate-700 leading-relaxed font-normal">
              {hotel.description}
            </p>
          </div>

          {/* Comodidades & Lazer */}
          {hotel.amenities && hotel.amenities.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Diferenciais para o Tenista
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {hotel.amenities.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Preços Estimados */}
          {hotel.priceRange && (
            <div className="flex items-center justify-between p-3 bg-amber-50 rounded-xl border border-amber-200/80 text-amber-950">
              <span className="text-xs font-semibold">Tarifário Estimado:</span>
              <span className="text-xs font-black text-amber-700">{hotel.priceRange}</span>
            </div>
          )}

          {/* Botões de Ação (WhatsApp Oficial e Telefone Fixo) */}
          <div className="space-y-2.5 pt-2">
            <a
              href={`https://wa.me/55${cleanWhatsapp}?text=${encodeURIComponent(
                `Olá! Encontrei o ${hotel.name} no app Tudo para Tenistas e gostaria de consultar disponibilidade de hospedagem e uso das quadras de tênis.`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2.5 transition cursor-pointer"
            >
              <WhatsAppIcon className="w-5 h-5 fill-white shrink-0" />
              <span>Consultar Reservas / WhatsApp</span>
              <span className="text-xs opacity-90 font-mono">({hotel.whatsapp})</span>
            </a>

            <a
              href={`tel:${cleanPhone}`}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer border border-slate-300/80"
            >
              <LandlinePhoneIcon className="w-4 h-4 shrink-0" color="#d9383a" />
              <span>Ligar para Recepção ({hotel.phone})</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

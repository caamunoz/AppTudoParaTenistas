import React from 'react';
import { ArrowLeft, MapPin, CheckCircle2, Star, Share2, Sparkles, ShieldCheck } from 'lucide-react';
import { WhatsAppIcon, LandlinePhoneIcon } from '../common/ContactIcons';
import { TennisCoachAcademy } from '../../types/tennisAcademies';

interface AcademyDetailModalProps {
  academy: TennisCoachAcademy;
  onClose: () => void;
}

export const AcademyDetailModal: React.FC<AcademyDetailModalProps> = ({ academy, onClose }) => {
  const getTierBadge = (tier: string) => {
    switch (tier) {
      case 'diamond':
        return { label: '💎 ANUNCIANTE DIAMANTE', bg: 'bg-indigo-600', text: 'text-white' };
      case 'gold':
        return { label: '🥇 ANUNCIANTE OURO', bg: 'bg-amber-500', text: 'text-slate-950' };
      case 'silver':
        return { label: '🥈 ANUNCIANTE PRATA', bg: 'bg-slate-300', text: 'text-slate-900' };
      case 'bronze':
        return { label: '🥉 ANUNCIANTE BRONZE', bg: 'bg-amber-700', text: 'text-white' };
      default:
        return { label: '⚪ ANUNCIANTE GRÁTIS', bg: 'bg-slate-200', text: 'text-slate-700' };
    }
  };

  const badge = getTierBadge(academy.tier);
  const cleanPhone = academy.phone.replace(/\D/g, '');
  const cleanWhatsapp = academy.whatsapp.replace(/\D/g, '');

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
            {academy.name}
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
            src={academy.imageUrl}
            alt={academy.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
            <span className="text-xs font-semibold bg-black/40 backdrop-blur px-2.5 py-1 rounded-full">
              📍 {academy.city}, {academy.state}
            </span>
            {academy.rating && (
              <div className="flex items-center gap-1 bg-amber-500 text-slate-950 font-black text-xs px-2.5 py-1 rounded-full shadow-sm">
                <Star className="w-3.5 h-3.5 fill-slate-950" />
                <span>{academy.rating.toFixed(1)}</span>
                <span className="text-[10px] opacity-80 font-normal">({academy.reviewsCount})</span>
              </div>
            )}
          </div>
        </div>

        {/* Informações do Anunciante */}
        <div className="p-5 space-y-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 leading-tight">
              {academy.name}
            </h2>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              <span>{academy.location}</span>
              {academy.distanceKm !== undefined && (
                <span className="text-blue-600 font-semibold font-mono">({academy.distanceKm} km)</span>
              )}
            </div>
          </div>

          {/* Descrição */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
            <p className="text-xs text-slate-700 leading-relaxed font-normal">
              {academy.description}
            </p>
          </div>

          {/* Serviços Oferecidos */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Serviços e Especialidades
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {academy.services.map((srv, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{srv}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Valores Médios */}
          {academy.hourlyRate && (
            <div className="flex items-center justify-between p-3 bg-amber-50 rounded-xl border border-amber-200/80 text-amber-950">
              <span className="text-xs font-semibold">Valor / Preço Estimado:</span>
              <span className="text-xs font-black text-amber-700">{academy.hourlyRate}</span>
            </div>
          )}

          {/* Botões de Ação Imediata (WhatsApp e Telefone) */}
          <div className="space-y-2.5 pt-2">
            <a
              href={`https://wa.me/55${cleanWhatsapp}?text=${encodeURIComponent(
                `Olá! Encontrei seu anúncio no app Tudo para Tenistas e gostaria de informações sobre aulas e treinos.`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2.5 transition cursor-pointer"
            >
              <WhatsAppIcon className="w-5 h-5 fill-white shrink-0" />
              <span>Conversar pelo WhatsApp</span>
              <span className="text-xs opacity-90 font-mono">({academy.whatsapp})</span>
            </a>

            <a
              href={`tel:${cleanPhone}`}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer border border-slate-300/80"
            >
              <LandlinePhoneIcon className="w-4 h-4 shrink-0" color="#d9383a" />
              <span>Ligar para Telefone Fixo ({academy.phone})</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

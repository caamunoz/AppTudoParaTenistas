import React from 'react';
import { ArrowLeft, MapPin, CheckCircle2, Star, Clock, Globe, Tag } from 'lucide-react';
import { WhatsAppIcon, LandlinePhoneIcon } from '../common/ContactIcons';
import { TennisStoreService } from '../../types/tennisStores';

interface StoreDetailModalProps {
  store: TennisStoreService;
  onClose: () => void;
}

export const StoreDetailModal: React.FC<StoreDetailModalProps> = ({ store, onClose }) => {
  const getTierBadge = (tier: string) => {
    switch (tier) {
      case 'diamond':
        return { label: '💎 LOJA DIAMANTE', bg: 'bg-indigo-600', text: 'text-white' };
      case 'gold':
        return { label: '🥇 LOJA OURO', bg: 'bg-amber-500', text: 'text-slate-950' };
      case 'silver':
        return { label: '🥈 LOJA PRATA', bg: 'bg-slate-300', text: 'text-slate-900' };
      case 'bronze':
        return { label: '🥉 LOJA BRONZE', bg: 'bg-amber-700', text: 'text-white' };
      default:
        return { label: '⚪ ANUNCIANTE GRÁTIS', bg: 'bg-slate-200', text: 'text-slate-700' };
    }
  };

  const badge = getTierBadge(store.tier);
  const cleanPhone = store.phone.replace(/\D/g, '');
  const cleanWhatsapp = store.whatsapp.replace(/\D/g, '');

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
            {store.name}
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
            src={store.imageUrl}
            alt={store.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
            <span className="text-xs font-semibold bg-black/40 backdrop-blur px-2.5 py-1 rounded-full">
              📍 {store.city}, {store.state}
            </span>
            {store.rating && (
              <div className="flex items-center gap-1 bg-amber-500 text-slate-950 font-black text-xs px-2.5 py-1 rounded-full shadow-sm">
                <Star className="w-3.5 h-3.5 fill-slate-950" />
                <span>{store.rating.toFixed(1)}</span>
                <span className="text-[10px] opacity-80 font-normal">({store.reviewsCount})</span>
              </div>
            )}
          </div>
        </div>

        {/* Informações da Loja */}
        <div className="p-5 space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full uppercase">
                {store.categoryLabel}
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 leading-tight">
              {store.name}
            </h2>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              <span>{store.location}</span>
              {store.distanceKm !== undefined && (
                <span className="text-blue-600 font-semibold font-mono">({store.distanceKm} km)</span>
              )}
            </div>
          </div>

          {/* Descrição */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
            <p className="text-xs text-slate-700 leading-relaxed font-normal">
              {store.description}
            </p>
          </div>

          {/* Horário de Funcionamento */}
          {store.openingHours && (
            <div className="flex items-center gap-2 p-2.5 bg-blue-50/60 rounded-xl border border-blue-200/60 text-xs text-blue-900 font-medium">
              <Clock className="w-4 h-4 text-blue-600 shrink-0" />
              <span>{store.openingHours}</span>
            </div>
          )}

          {/* Marcas Representadas */}
          {store.brands && store.brands.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Marcas com que Trabalha
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {store.brands.map((b, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Catálogo de Produtos / Serviços em Destaque */}
          {store.catalog && store.catalog.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Principais Produtos & Serviços
              </h3>
              <div className="space-y-2">
                {store.catalog.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between text-xs"
                  >
                    <span className="font-medium text-slate-800 pr-2">{item.name}</span>
                    {item.price && (
                      <span className="font-bold text-[#e63946] whitespace-nowrap bg-red-50 px-2 py-0.5 rounded">
                        {item.price}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Botões de Ação Imediata (WhatsApp e Telefone Fixo) */}
          <div className="space-y-2.5 pt-2">
            <a
              href={`https://wa.me/55${cleanWhatsapp}?text=${encodeURIComponent(
                `Olá! Encontrei a ${store.name} no app Tudo para Tenistas e gostaria de informações sobre produtos e serviços.`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2.5 transition cursor-pointer"
            >
              <WhatsAppIcon className="w-5 h-5 fill-white shrink-0" />
              <span>Fazer Pedido / WhatsApp</span>
              <span className="text-xs opacity-90 font-mono">({store.whatsapp})</span>
            </a>

            <a
              href={`tel:${cleanPhone}`}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer border border-slate-300/80"
            >
              <LandlinePhoneIcon className="w-4 h-4 shrink-0" color="#d9383a" />
              <span>Ligar para Telefone Fixo ({store.phone})</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

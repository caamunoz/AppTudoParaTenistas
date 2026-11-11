import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  X,
  Trophy,
  User,
  Mail,
  Shirt,
  Building,
  CheckCircle2,
  AlertCircle,
  Calendar,
  CreditCard,
} from 'lucide-react';
import { TennisTournament, TournamentRegistrationFormData } from '../../types/tennisTournaments';
import { WhatsAppIcon } from '../common/ContactIcons';

interface TournamentRegisterAthleteModalProps {
  tournament: TennisTournament;
  onClose: () => void;
  onSuccess: (data: TournamentRegistrationFormData) => void;
}

export const TournamentRegisterAthleteModal: React.FC<TournamentRegisterAthleteModalProps> = ({
  tournament,
  onClose,
  onSuccess,
}) => {
  const [formData, setFormData] = useState<TournamentRegistrationFormData>({
    tournamentId: tournament.id,
    playerName: '',
    playerWhatsapp: '',
    playerEmail: '',
    categoryName: tournament.categories[0]?.name || 'Masculina B',
    tshirtSize: 'M',
    clubOrCity: 'São Paulo',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const selectedCategoryObj = tournament.categories.find(
    (c) => c.name === formData.categoryName
  );
  const currentFee = selectedCategoryObj ? selectedCategoryObj.entryFee : 100;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.playerName.trim()) errs.playerName = 'Nome completo é obrigatório';
    if (!formData.playerWhatsapp.trim() || formData.playerWhatsapp.replace(/\D/g, '').length < 10) {
      errs.playerWhatsapp = 'WhatsApp válido com DDD é obrigatório';
    }
    if (!formData.playerEmail.trim() || !formData.playerEmail.includes('@')) {
      errs.playerEmail = 'E-mail válido é obrigatório para confirmação';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsDone(true);
      setTimeout(() => {
        onSuccess(formData);
        onClose();
      }, 1600);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-xs font-sans">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 12 }}
        className="relative w-full max-w-[400px] max-h-[92vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-100"
      >
        {/* Header do Modal */}
        <div className="bg-[#1d4ed8] px-4 py-3.5 flex items-center justify-between text-white shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white">
              <Trophy className="w-4 h-4 fill-amber-300 text-amber-300" />
            </div>
            <div>
              <h2 className="text-sm font-bold leading-tight">Inscrição no Torneio</h2>
              <p className="text-[11px] text-blue-100 truncate max-w-[240px]">
                {tournament.name}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-white/15 flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Conteúdo com Rolagem */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-slate-800 text-xs">
          {isDone ? (
            <div className="py-10 flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Inscrição Pré-Confirmada!</h3>
              <p className="text-xs text-slate-600 max-w-[280px]">
                Sua solicitação de inscrição para <strong>{formData.categoryName}</strong> foi enviada
                para a organização do torneio. Você receberá a confirmação e chave de jogos no WhatsApp.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Card de Resumo do Torneio */}
              <div className="p-3 bg-blue-50/60 border border-blue-200/80 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                    {tournament.dateDisplay}
                  </span>
                  <p className="text-xs font-black text-slate-800 leading-tight">
                    {tournament.venueName}
                  </p>
                  <p className="text-[10px] text-slate-500">
                    {tournament.city} - {tournament.state}
                  </p>
                </div>
                <div className="text-right pl-2">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Taxa</span>
                  <span className="text-base font-black text-[#1d4ed8]">
                    R$ {currentFee.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>

              {/* Categoria */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Selecione sua Categoria <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.categoryName}
                  onChange={(e) => setFormData({ ...formData, categoryName: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1d4ed8] bg-white font-medium"
                >
                  {tournament.categories.map((cat) => (
                    <option key={cat.name} value={cat.name}>
                      {cat.name} ({cat.gender}) — R$ {cat.entryFee.toFixed(2).replace('.', ',')}
                    </option>
                  ))}
                </select>
                {selectedCategoryObj && (
                  <p className="text-[10px] text-emerald-700 font-semibold mt-1 flex items-center gap-1">
                    <span>🏆 Premiação:</span>
                    <span>1º {selectedCategoryObj.championPrize}</span>
                  </p>
                )}
              </div>

              {/* Nome do Atleta */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Nome Completo do Atleta <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="Seu nome completo"
                    value={formData.playerName}
                    onChange={(e) => setFormData({ ...formData, playerName: e.target.value })}
                    className={`w-full pl-9 pr-3 py-2 text-xs border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1d4ed8] ${
                      errors.playerName ? 'border-red-400 bg-red-50' : 'border-slate-300'
                    }`}
                  />
                </div>
                {errors.playerName && (
                  <p className="text-[10px] text-red-500 mt-0.5">{errors.playerName}</p>
                )}
              </div>

              {/* WhatsApp e E-mail */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                      <WhatsAppIcon className="w-4 h-4" />
                    </div>
                    <input
                      type="tel"
                      required
                      placeholder="(11) 99999-9999"
                      value={formData.playerWhatsapp}
                      onChange={(e) => setFormData({ ...formData, playerWhatsapp: e.target.value })}
                      className={`w-full pl-9 pr-3 py-2 text-xs border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1d4ed8] ${
                        errors.playerWhatsapp ? 'border-red-400 bg-red-50' : 'border-slate-300'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    E-mail <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      required
                      placeholder="seu@email.com"
                      value={formData.playerEmail}
                      onChange={(e) => setFormData({ ...formData, playerEmail: e.target.value })}
                      className={`w-full pl-9 pr-3 py-2 text-xs border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1d4ed8] ${
                        errors.playerEmail ? 'border-red-400 bg-red-50' : 'border-slate-300'
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Camiseta e Clube/Cidade */}
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Tamanho da Camiseta
                  </label>
                  <select
                    value={formData.tshirtSize}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        tshirtSize: e.target.value as TournamentRegistrationFormData['tshirtSize'],
                      })
                    }
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1d4ed8] bg-white font-medium"
                  >
                    <option value="P">P (Pequeno)</option>
                    <option value="M">M (Médio)</option>
                    <option value="G">G (Grande)</option>
                    <option value="GG">GG (Extra Grande)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Clube / Cidade
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Paulistano / SP"
                    value={formData.clubOrCity}
                    onChange={(e) => setFormData({ ...formData, clubOrCity: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1d4ed8]"
                  />
                </div>
              </div>

              {/* Box de Informações de Pagamento */}
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-[11px] text-amber-900 leading-relaxed">
                  A confirmação oficial e o chaveamento serão enviados no seu WhatsApp. A chave e
                  horários de estreia saem até 24h antes do início do torneio.
                </p>
              </div>

              {/* Botões de Ação estilo image_51d9645a.png */}
              <div className="pt-2 flex items-center justify-between gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-2.5 px-4 rounded-full text-white font-bold text-xs bg-[#db6c6c] hover:bg-[#c95959] shadow-sm transition active:scale-95 cursor-pointer text-center"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-2.5 px-4 rounded-full text-white font-bold text-xs bg-[#a3cb53] hover:bg-[#92b944] shadow-md transition active:scale-95 cursor-pointer text-center disabled:opacity-50"
                >
                  {isSubmitting ? 'Processando...' : 'Confirmar Inscrição'}
                </button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  X,
  Trophy,
  Calendar,
  MapPin,
  Building,
  DollarSign,
  User,
  CheckCircle2,
  AlertCircle,
  FileCheck,
} from 'lucide-react';
import { NewTournamentSuggestionData, TennisTournament } from '../../types/tennisTournaments';
import { WhatsAppIcon } from '../common/ContactIcons';

interface RegisterTournamentModalProps {
  onClose: () => void;
  onSubmitSuccess: (newTournament: TennisTournament) => void;
}

export const RegisterTournamentModal: React.FC<RegisterTournamentModalProps> = ({
  onClose,
  onSubmitSuccess,
}) => {
  const [formData, setFormData] = useState<NewTournamentSuggestionData>({
    name: '',
    city: 'São Paulo',
    state: 'SP',
    venueName: '',
    venueAddress: '',
    startDate: '',
    endDate: '',
    registrationDeadline: '',
    categories: 'Masculino (A, B, C) e Feminino (A, B)',
    entryFee: 'R$ 100,00',
    prizes: 'Troféus + Premiação em Dinheiro',
    organizerName: '',
    organizerWhatsapp: '',
    additionalNotes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Nome do torneio é obrigatório';
    if (!formData.venueName.trim()) errs.venueName = 'Local/Clube é obrigatório';
    if (!formData.venueAddress.trim()) errs.venueAddress = 'Endereço é obrigatório';
    if (!formData.city.trim()) errs.city = 'Cidade é obrigatória';
    if (!formData.startDate.trim()) errs.startDate = 'Data de início é obrigatória';
    if (!formData.endDate.trim()) errs.endDate = 'Data de término é obrigatória';
    if (!formData.registrationDeadline.trim()) errs.registrationDeadline = 'Prazo de inscrições é obrigatório';
    if (!formData.organizerName.trim()) errs.organizerName = 'Seu nome é obrigatório';
    if (!formData.organizerWhatsapp.trim() || formData.organizerWhatsapp.replace(/\D/g, '').length < 10) {
      errs.organizerWhatsapp = 'WhatsApp válido com DDD é obrigatório';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const newTournament: TennisTournament = {
      id: `tournament-${Date.now()}`,
      name: formData.name,
      edition: 'Edição 2026',
      logoUrl: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=300&q=80',
      bannerUrl: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=800&q=80',
      city: formData.city,
      state: formData.state,
      venueName: formData.venueName,
      venueAddress: formData.venueAddress,
      venueCep: '01000-000',
      startDate: formData.startDate,
      endDate: formData.endDate,
      dateDisplay: `${formData.startDate} a ${formData.endDate}`,
      registrationDeadline: formData.registrationDeadline,
      registrationDeadlineDisplay: `Até ${formData.registrationDeadline}`,
      status: 'open',
      gameTimesInfo: 'Horários a serem divulgados na tabela oficial.',
      categoriesSummary: formData.categories,
      totalPrizeDisplay: formData.prizes,
      regulationsText: `Regulamento submetido por ${formData.organizerName}. Em processo de validação pela administração do Tudo Para Tenistas.`,
      organizerName: formData.organizerName,
      organizerPhone: formData.organizerWhatsapp,
      organizerWhatsapp: formData.organizerWhatsapp.replace(/\D/g, ''),
      organizerEmail: 'organizador@torneio.com.br',
      categories: [
        {
          name: 'Categoria Principal A',
          gender: 'Masculino',
          level: 'A',
          entryFee: 120,
          championPrize: 'Troféu + Premiação Oficial',
          runnerUpPrize: 'Troféu + Premiação',
        },
        {
          name: 'Categoria B',
          gender: 'Masculino',
          level: 'B',
          entryFee: 100,
          championPrize: 'Troféu + Premiação',
          runnerUpPrize: 'Troféu',
        },
      ],
    };

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        onSubmitSuccess(newTournament);
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
        className="relative w-full max-w-[420px] max-h-[92vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-100"
      >
        {/* Header do Modal */}
        <div className="bg-[#1d4ed8] px-4 py-3.5 flex items-center justify-between text-white shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white">
              <Trophy className="w-4 h-4 fill-amber-300 text-amber-300" />
            </div>
            <div>
              <h2 className="text-sm font-bold leading-tight">Cadastrar Novo Torneio</h2>
              <p className="text-[11px] text-blue-100">Divulgue sua competição para tenistas</p>
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
          {isSuccess ? (
            <div className="py-10 flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Torneio Cadastrado com Sucesso!</h3>
              <p className="text-xs text-slate-600 max-w-[280px]">
                As informações foram enviadas para revisão e aprovação do administrador. Em breve
                estará visível para todos os tenistas do app!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-[11px] text-amber-900 leading-relaxed">
                  Cadastre as informações da sua competição. O torneio será validado pela equipe do
                  Tudo para Tenistas antes de aparecer na lista pública.
                </p>
              </div>

              {/* Nome do Torneio */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Nome do Torneio / Campeonato <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: 2° Open de Tênis de Verão"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-3 py-2 text-xs border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1d4ed8] ${
                    errors.name ? 'border-red-400 bg-red-50' : 'border-slate-300'
                  }`}
                />
                {errors.name && <p className="text-[10px] text-red-500 mt-0.5">{errors.name}</p>}
              </div>

              {/* Local dos Jogos */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Clube / Academia sede <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Smash Academy"
                    value={formData.venueName}
                    onChange={(e) => setFormData({ ...formData, venueName: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1d4ed8]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Cidade e Estado <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      required
                      placeholder="Cidade"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1d4ed8]"
                    />
                    <input
                      type="text"
                      required
                      maxLength={2}
                      placeholder="UF"
                      value={formData.state}
                      onChange={(e) =>
                        setFormData({ ...formData, state: e.target.value.toUpperCase() })
                      }
                      className="w-14 px-2 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1d4ed8] text-center font-bold"
                    />
                  </div>
                </div>
              </div>

              {/* Endereço */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Endereço do Local dos Jogos <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Rua, número e bairro"
                  value={formData.venueAddress}
                  onChange={(e) => setFormData({ ...formData, venueAddress: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1d4ed8]"
                />
              </div>

              {/* Datas */}
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[10px] font-semibold text-slate-700 mb-1">
                    Início Jogos <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="DD/MM/AAAA"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full px-2 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1d4ed8] text-center"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-slate-700 mb-1">
                    Término <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="DD/MM/AAAA"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full px-2 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1d4ed8] text-center"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-slate-700 mb-1">
                    Fim Inscrição <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="DD/MM/AAAA"
                    value={formData.registrationDeadline}
                    onChange={(e) =>
                      setFormData({ ...formData, registrationDeadline: e.target.value })
                    }
                    className="w-full px-2 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1d4ed8] text-center"
                  />
                </div>
              </div>

              {/* Categorias e Premiação */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Categorias em Disputa
                </label>
                <input
                  type="text"
                  placeholder="Ex: Masculino Especial, A, B, C; Feminino A, B"
                  value={formData.categories}
                  onChange={(e) => setFormData({ ...formData, categories: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1d4ed8]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Premiação Oferecida
                </label>
                <input
                  type="text"
                  placeholder="Ex: Troféus + R$ 3.000 em dinheiro + Brindes"
                  value={formData.prizes}
                  onChange={(e) => setFormData({ ...formData, prizes: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1d4ed8]"
                />
              </div>

              {/* Dados do Organizador */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Nome do Organizador <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Seu nome ou federação"
                    value={formData.organizerName}
                    onChange={(e) => setFormData({ ...formData, organizerName: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1d4ed8]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    WhatsApp para Contato <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                      <WhatsAppIcon className="w-4 h-4" />
                    </div>
                    <input
                      type="tel"
                      required
                      placeholder="(11) 99999-9999"
                      value={formData.organizerWhatsapp}
                      onChange={(e) =>
                        setFormData({ ...formData, organizerWhatsapp: e.target.value })
                      }
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1d4ed8]"
                    />
                  </div>
                </div>
              </div>

              {/* Botões do Formulário estilo image_51d9645a.png */}
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
                  {isSubmitting ? 'Enviando...' : 'Enviar para Revisão'}
                </button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};

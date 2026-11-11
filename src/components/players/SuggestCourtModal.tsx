import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  X,
  MapPin,
  Camera,
  Upload,
  CheckCircle2,
  Building2,
  Layers,
  Hash,
  User,
  Phone,
  AlertCircle,
  FileCheck,
} from 'lucide-react';
import { WhatsAppIcon } from '../common/ContactIcons';

export interface CourtSuggestionData {
  placeName: string;
  courtType: 'Saibro' | 'Rápida (Hard)' | 'Grama Natural' | 'Grama Sintética' | 'Mista / Várias';
  courtCount: number;
  isCovered: boolean;
  isPublic: boolean; // Pública ou Privada / Paga
  streetAddress: string;
  neighborhood: string;
  cep: string;
  city: string;
  state: string;
  photoUrls: string[];
  suggesterName: string;
  suggesterWhatsapp: string;
  additionalNotes?: string;
}

interface SuggestCourtModalProps {
  onClose: () => void;
  onSubmitSuccess: (data: CourtSuggestionData) => void;
}

export const SuggestCourtModal: React.FC<SuggestCourtModalProps> = ({
  onClose,
  onSubmitSuccess,
}) => {
  const [formData, setFormData] = useState<CourtSuggestionData>({
    placeName: '',
    courtType: 'Saibro',
    courtCount: 2,
    isCovered: false,
    isPublic: false,
    streetAddress: '',
    neighborhood: '',
    cep: '',
    city: 'São Paulo',
    state: 'SP',
    photoUrls: [
      'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=400&q=80',
    ],
    suggesterName: '',
    suggesterWhatsapp: '',
    additionalNotes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedDone, setSubmittedDone] = useState(false);

  const sampleCourtPhotos = [
    {
      label: 'Quadra de Saibro Aberta',
      url: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=400&q=80',
    },
    {
      label: 'Quadra Rápida / Coberta',
      url: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=400&q=80',
    },
    {
      label: 'Clube com Múltiplas Quadras',
      url: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&w=400&q=80',
    },
  ];

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.placeName.trim()) errs.placeName = 'Nome do local é obrigatório';
    if (!formData.streetAddress.trim()) errs.streetAddress = 'Endereço completo é obrigatório';
    if (!formData.neighborhood.trim()) errs.neighborhood = 'Bairro é obrigatório';
    if (!formData.city.trim()) errs.city = 'Cidade é obrigatória';
    if (!formData.state.trim()) errs.state = 'Estado (UF) é obrigatório';
    if (!formData.cep.trim()) errs.cep = 'CEP é obrigatório';
    if (!formData.suggesterName.trim()) errs.suggesterName = 'Seu nome é obrigatório';
    if (!formData.suggesterWhatsapp.trim() || formData.suggesterWhatsapp.replace(/\D/g, '').length < 10) {
      errs.suggesterWhatsapp = 'WhatsApp válido com DDD é obrigatório para confirmação';
    }
    if (formData.photoUrls.length === 0) {
      errs.photos = 'É obrigatório anexar ao menos 1 foto que comprove a existência';
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
      setSubmittedDone(true);
      setTimeout(() => {
        onSubmitSuccess(formData);
        onClose();
      }, 1500);
    }, 800);
  };

  const handleToggleSamplePhoto = (url: string) => {
    setFormData((prev) => {
      const exists = prev.photoUrls.includes(url);
      if (exists) {
        if (prev.photoUrls.length === 1) return prev; // keep at least 1
        return { ...prev, photoUrls: prev.photoUrls.filter((u) => u !== url) };
      }
      return { ...prev, photoUrls: [...prev.photoUrls, url] };
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-xs font-sans">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="relative w-full max-w-[420px] max-h-[92vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-100"
      >
        {/* Header do Modal */}
        <div className="bg-[#0074c7] px-4 py-3 flex items-center justify-between text-white shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-lg">
              🎾
            </div>
            <div>
              <h2 className="text-base font-bold leading-tight">Sugerir Nova Quadra</h2>
              <p className="text-[11px] text-blue-100">Ajude a mapear quadras na sua região</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-white/15 flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Formulário com rolagem suave */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-slate-800 text-xs">
          {submittedDone ? (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Sugestão Enviada com Sucesso!</h3>
              <p className="text-xs text-slate-600 max-w-[280px]">
                Obrigado por ajudar a comunidade de tenistas! Os dados e fotos foram enviados para
                nossa moderação e em breve o local estará visível no mapa.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Box de Instrução */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex gap-2.5 items-start">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-[11px] text-amber-800 leading-relaxed">
                  Para garantir a veracidade, é <strong>obrigatório</strong> informar endereço
                  completo, fotos da quadra e seu WhatsApp para eventual confirmação do cadastro.
                </p>
              </div>

              {/* Seção 1: Dados do Local */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-1.5 pb-1 border-b border-slate-100">
                  <Building2 className="w-4 h-4 text-[#0074c7]" />
                  <span className="font-bold text-slate-900 uppercase tracking-wider text-[10px]">
                    1. Identificação do Local
                  </span>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Nome do Local / Academia / Clube / Parque <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Tennis Park Paulistano, Parque Ibirapuera, Clube Pinheiros..."
                    value={formData.placeName}
                    onChange={(e) => setFormData({ ...formData, placeName: e.target.value })}
                    className={`w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0074c7] ${
                      errors.placeName ? 'border-red-400 bg-red-50' : 'border-slate-300'
                    }`}
                  />
                  {errors.placeName && (
                    <p className="text-[10px] text-red-500 mt-0.5">{errors.placeName}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Piso Principal <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.courtType}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          courtType: e.target.value as CourtSuggestionData['courtType'],
                        })
                      }
                      className="w-full px-2.5 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0074c7] bg-white"
                    >
                      <option value="Saibro">Saibro (Clay)</option>
                      <option value="Rápida (Hard)">Rápida (Hard Court)</option>
                      <option value="Grama Natural">Grama Natural</option>
                      <option value="Grama Sintética">Grama Sintética</option>
                      <option value="Mista / Várias">Mista / Várias opções</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Qtd. Quadras <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.courtCount}
                      onChange={(e) =>
                        setFormData({ ...formData, courtCount: Number(e.target.value) })
                      }
                      className="w-full px-2.5 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0074c7] bg-white"
                    >
                      <option value={1}>1 quadra</option>
                      <option value={2}>2 quadras</option>
                      <option value={3}>3 quadras</option>
                      <option value={4}>4 quadras</option>
                      <option value={5}>5 a 8 quadras</option>
                      <option value={10}>Mais de 8 quadras</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <label className="flex items-center gap-2 p-2 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-100 transition">
                    <input
                      type="checkbox"
                      checked={formData.isCovered}
                      onChange={(e) => setFormData({ ...formData, isCovered: e.target.checked })}
                      className="accent-[#0074c7] w-4 h-4 rounded"
                    />
                    <span className="text-[11px] text-slate-700 font-medium">Tem quadra coberta</span>
                  </label>

                  <label className="flex items-center gap-2 p-2 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-100 transition">
                    <input
                      type="checkbox"
                      checked={formData.isPublic}
                      onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
                      className="accent-[#0074c7] w-4 h-4 rounded"
                    />
                    <span className="text-[11px] text-slate-700 font-medium">É pública / gratuita</span>
                  </label>
                </div>
              </div>

              {/* Seção 2: Localização e Endereço */}
              <div className="space-y-2.5 pt-2">
                <div className="flex items-center gap-1.5 pb-1 border-b border-slate-100">
                  <MapPin className="w-4 h-4 text-[#0074c7]" />
                  <span className="font-bold text-slate-900 uppercase tracking-wider text-[10px]">
                    2. Endereço e Localização
                  </span>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Endereço Completo (Rua/Av., nº) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Av. Brigadeiro Faria Lima, 2100"
                    value={formData.streetAddress}
                    onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })}
                    className={`w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0074c7] ${
                      errors.streetAddress ? 'border-red-400 bg-red-50' : 'border-slate-300'
                    }`}
                  />
                  {errors.streetAddress && (
                    <p className="text-[10px] text-red-500 mt-0.5">{errors.streetAddress}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Bairro <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Jardim Paulistano"
                      value={formData.neighborhood}
                      onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                      className={`w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0074c7] ${
                        errors.neighborhood ? 'border-red-400 bg-red-50' : 'border-slate-300'
                      }`}
                    />
                    {errors.neighborhood && (
                      <p className="text-[10px] text-red-500 mt-0.5">{errors.neighborhood}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      CEP <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="00000-000"
                      value={formData.cep}
                      onChange={(e) => setFormData({ ...formData, cep: e.target.value })}
                      className={`w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0074c7] ${
                        errors.cep ? 'border-red-400 bg-red-50' : 'border-slate-300'
                      }`}
                    />
                    {errors.cep && (
                      <p className="text-[10px] text-red-500 mt-0.5">{errors.cep}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2.5">
                  <div className="col-span-2">
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Cidade <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="São Paulo, Guarulhos, etc."
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className={`w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0074c7] ${
                        errors.city ? 'border-red-400 bg-red-50' : 'border-slate-300'
                      }`}
                    />
                    {errors.city && (
                      <p className="text-[10px] text-red-500 mt-0.5">{errors.city}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      UF <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={2}
                      placeholder="SP"
                      value={formData.state}
                      onChange={(e) =>
                        setFormData({ ...formData, state: e.target.value.toUpperCase() })
                      }
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0074c7] text-center uppercase"
                    />
                  </div>
                </div>
              </div>

              {/* Seção 3: Fotos Comprobatórias */}
              <div className="space-y-2.5 pt-2">
                <div className="flex items-center gap-1.5 pb-1 border-b border-slate-100">
                  <Camera className="w-4 h-4 text-[#0074c7]" />
                  <span className="font-bold text-slate-900 uppercase tracking-wider text-[10px]">
                    3. Fotos Comprobatórias da Existência <span className="text-red-500">*</span>
                  </span>
                </div>

                <p className="text-[11px] text-slate-600">
                  Selecione fotos reais das quadras para validar com a administração:
                </p>

                <div className="grid grid-cols-3 gap-2">
                  {sampleCourtPhotos.map((photo, idx) => {
                    const isSelected = formData.photoUrls.includes(photo.url);
                    return (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => handleToggleSamplePhoto(photo.url)}
                        className={`relative rounded-lg overflow-hidden border-2 transition text-left group ${
                          isSelected
                            ? 'border-[#0074c7] ring-2 ring-blue-300'
                            : 'border-slate-200 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={photo.url}
                          alt={photo.label}
                          className="w-full h-16 object-cover"
                        />
                        <div className="p-1 bg-white">
                          <p className="text-[9px] font-medium text-slate-700 line-clamp-1">
                            {photo.label}
                          </p>
                        </div>
                        {isSelected && (
                          <div className="absolute top-1 right-1 bg-[#0074c7] text-white rounded-full p-0.5 shadow-sm">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                {errors.photos && (
                  <p className="text-[10px] text-red-500 mt-0.5">{errors.photos}</p>
                )}
              </div>

              {/* Seção 4: Dados de Quem Indica (Para confirmação do admin) */}
              <div className="space-y-2.5 pt-2">
                <div className="flex items-center gap-1.5 pb-1 border-b border-slate-100">
                  <User className="w-4 h-4 text-[#0074c7]" />
                  <span className="font-bold text-slate-900 uppercase tracking-wider text-[10px]">
                    4. Seus Dados para Confirmação
                  </span>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Seu Nome Completo <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Seu nome"
                    value={formData.suggesterName}
                    onChange={(e) => setFormData({ ...formData, suggesterName: e.target.value })}
                    className={`w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0074c7] ${
                      errors.suggesterName ? 'border-red-400 bg-red-50' : 'border-slate-300'
                    }`}
                  />
                  {errors.suggesterName && (
                    <p className="text-[10px] text-red-500 mt-0.5">{errors.suggesterName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Seu WhatsApp (com DDD) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                      <WhatsAppIcon className="w-4 h-4" />
                    </div>
                    <input
                      type="tel"
                      required
                      placeholder="(11) 99999-9999"
                      value={formData.suggesterWhatsapp}
                      onChange={(e) =>
                        setFormData({ ...formData, suggesterWhatsapp: e.target.value })
                      }
                      className={`w-full pl-9 pr-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0074c7] ${
                        errors.suggesterWhatsapp ? 'border-red-400 bg-red-50' : 'border-slate-300'
                      }`}
                    />
                  </div>
                  {errors.suggesterWhatsapp && (
                    <p className="text-[10px] text-red-500 mt-0.5">{errors.suggesterWhatsapp}</p>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Informações Adicionais (opcional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Valores, horários de funcionamento, se precisa agendar pelo WhatsApp..."
                    value={formData.additionalNotes}
                    onChange={(e) =>
                      setFormData({ ...formData, additionalNotes: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0074c7]"
                  />
                </div>
              </div>

              {/* Botões do Formulário Estilo image_51d9645a.png */}
              <div className="pt-3 flex items-center justify-between gap-3 border-t border-slate-100">
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
                  {isSubmitting ? 'Enviando...' : 'Enviar Sugestão'}
                </button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};

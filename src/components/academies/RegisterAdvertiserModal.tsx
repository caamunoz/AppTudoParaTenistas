import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, CheckCircle2, AlertCircle, Sparkles, Building2, User, Phone, MapPin, Mail, Award } from 'lucide-react';
import { AdvertiserTier } from '../../types/tennisAcademies';

interface RegisterAdvertiserModalProps {
  onClose: () => void;
  onSubmitSuccess: (newAdvertiser: any) => void;
}

export const RegisterAdvertiserModal: React.FC<RegisterAdvertiserModalProps> = ({
  onClose,
  onSubmitSuccess,
}) => {
  const [name, setName] = useState('');
  const [type, setType] = useState<'professor' | 'academia' | 'rebatedor' | 'encordoamento'>('professor');
  const [city, setCity] = useState('');
  const [state, setState] = useState('SP');
  const [neighborhood, setNeighborhood] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<AdvertiserTier>('gold');
  const [hourlyRate, setHourlyRate] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !city || !whatsapp) {
      alert('Por favor, preencha os campos obrigatórios (Nome, Cidade e WhatsApp).');
      return;
    }

    const newAd = {
      id: `coach-${Date.now()}`,
      name,
      type,
      tier: selectedPlan,
      description: description || 'Aulas e treinamento de tênis para todos os níveis.',
      location: `${neighborhood ? `${neighborhood} ` : ''}${city} ${state}`,
      city,
      state,
      distanceKm: 2.5,
      whatsapp: whatsapp || '11 99999-9999',
      phone: phone || whatsapp || '11 99999-9999',
      imageUrl: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=300&q=80',
      services: ['Aulas Individuais e Grupos', 'Iniciante ao Avançado', 'Treino Tático e Físico'],
      hourlyRate: hourlyRate ? `R$ ${hourlyRate}/hora` : 'A combinar',
      rating: 5.0,
      reviewsCount: 1,
      featured: selectedPlan === 'diamond' || selectedPlan === 'gold',
    };

    setIsSubmitted(true);
    setTimeout(() => {
      onSubmitSuccess(newAd);
      onClose();
    }, 2200);
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-xs select-none overflow-y-auto">
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 20 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 my-auto"
      >
        {/* Header com Azul Característico */}
        <div className="bg-[#0074c7] px-5 py-3.5 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
              🎾
            </div>
            <div>
              <h2 className="font-bold text-sm tracking-wide">
                Cadastrar Aulas ou Academia
              </h2>
              <p className="text-[10px] text-white/80">Divulgue seus serviços no Tudo para Tenistas</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/20 transition text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#a3cb53]/20 border-2 border-[#a3cb53] flex items-center justify-center mx-auto text-[#6b9a1e]">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">
              Cadastro Enviado com Sucesso!
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed max-w-xs mx-auto">
              Seus dados foram enviados para o administrador para revisão e aprovação. Seu anúncio aparecerá na lista para tenistas da sua região!
            </p>
            <div className="text-[11px] bg-slate-50 text-slate-500 p-3 rounded-xl border border-slate-200">
              📧 E-mail de notificação encaminhado para a administração.
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-3.5 max-h-[75vh] overflow-y-auto">
            {/* Escolha do Tipo em Botões Pílula */}
            <div>
              <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-1.5">
                Tipo de Anúncio:
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { id: 'professor', label: '👤 Professor' },
                  { id: 'academia', label: '🏢 Academia / Clube' },
                  { id: 'rebatedor', label: '🎾 Rebatedor' },
                  { id: 'encordoamento', label: '🧵 Encordoamento' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setType(item.id as any)}
                    className={`py-2 px-2.5 rounded-full text-xs font-bold transition shadow-xs cursor-pointer ${
                      type === item.id
                        ? 'bg-[#0074c7] text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Nome Completo / Academia */}
            <div>
              <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-1">
                Nome do Professor ou Academia *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Prof. Carlos Silva ou Academia Harmonia"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 focus:border-[#0074c7] focus:ring-1 focus:ring-[#0074c7] outline-none"
              />
            </div>

            {/* Localização: Cidade, Estado e Bairro */}
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2">
                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-1">
                  Cidade *
                </label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Ex: Taubaté, São Paulo"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 focus:border-[#0074c7] outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-1">
                  UF
                </label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-2 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 bg-white focus:border-[#0074c7] outline-none"
                >
                  <option value="SP">SP</option>
                  <option value="RJ">RJ</option>
                  <option value="MG">MG</option>
                  <option value="PR">PR</option>
                  <option value="SC">SC</option>
                  <option value="RS">RS</option>
                  <option value="DF">DF</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-1">
                Bairro / Região
              </label>
              <input
                type="text"
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
                placeholder="Ex: Quiririm, Itaquera, Morumbi, Centro"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 focus:border-[#0074c7] outline-none"
              />
            </div>

            {/* Contatos WhatsApp e Telefone */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-1">
                  WhatsApp (Alunos) *
                </label>
                <input
                  type="tel"
                  required
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="11 99999-8888"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 focus:border-[#0074c7] outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-1">
                  Telefone Fixo / Outro
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="11 3333-4444"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 focus:border-[#0074c7] outline-none"
                />
              </div>
            </div>

            {/* Descrição dos Serviços */}
            <div>
              <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-1">
                Descrição dos Serviços & Diferenciais
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ex: Aulas VIP, grupos para iniciantes, quadra coberta de saibro, etc."
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 focus:border-[#0074c7] outline-none resize-none"
              />
            </div>

            {/* Seleção do Plano de Anúncio */}
            <div>
              <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-1.5">
                Plano de Anúncio Desejado:
              </label>
              <div className="grid grid-cols-5 gap-1 text-center">
                {[
                  { tier: 'diamond', label: 'Diamante', badge: '💎', color: 'bg-indigo-600' },
                  { tier: 'gold', label: 'Ouro', badge: '🥇', color: 'bg-amber-500' },
                  { tier: 'silver', label: 'Prata', badge: '🥈', color: 'bg-slate-400' },
                  { tier: 'bronze', label: 'Bronze', badge: '🥉', color: 'bg-amber-800' },
                  { tier: 'free', label: 'Grátis', badge: '⚪', color: 'bg-slate-500' },
                ].map((p) => (
                  <button
                    key={p.tier}
                    type="button"
                    onClick={() => setSelectedPlan(p.tier as any)}
                    className={`p-1.5 rounded-xl border text-[10px] font-bold flex flex-col items-center justify-center transition cursor-pointer ${
                      selectedPlan === p.tier
                        ? 'border-[#0074c7] bg-blue-50 text-[#0074c7] ring-2 ring-[#0074c7]/30'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-base">{p.badge}</span>
                    <span className="mt-0.5">{p.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Botões com o Padrão Visual Exato da Imagem Anexa (Verde "Sim" e Salmão "Não") */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
              {/* Botão Não / Cancelar (Salmão / Coral `#d96969`) */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 px-4 rounded-full bg-[#db6c6c] hover:bg-[#cf5f5f] text-white font-bold text-sm shadow-[0_4px_10px_rgba(219,108,108,0.4)] transition cursor-pointer"
              >
                Não / Cancelar
              </motion.button>

              {/* Botão Sim / Confirmar Cadastro (Verde Limão Suave `#a3cb53`) */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="flex-1 py-2.5 px-4 rounded-full bg-[#a3cb53] hover:bg-[#94bd45] text-white font-bold text-sm shadow-[0_4px_10px_rgba(163,203,83,0.4)] transition cursor-pointer"
              >
                Sim / Cadastrar
              </motion.button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};

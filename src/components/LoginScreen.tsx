import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, CheckCircle2, Mail, Lock, User, AlertCircle, X } from 'lucide-react';

interface LoginScreenProps {
  onLoginSuccess: (userEmail: string) => void;
  onSkip?: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess, onSkip }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeModal, setActiveModal] = useState<'create' | 'forgot' | 'resend' | null>(null);
  const [modalEmail, setModalEmail] = useState('');
  const [modalName, setModalName] = useState('');
  const [modalPass, setModalPass] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      showToast('Por favor, informe seu email');
      return;
    }
    onLoginSuccess(email);
  };

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalEmail || !modalName) {
      showToast('Preencha os campos obrigatórios');
      return;
    }
    showToast('Conta criada com sucesso! Verifique seu email.');
    setActiveModal(null);
    setEmail(modalEmail);
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalEmail) {
      showToast('Digite seu e-mail para receber as instruções');
      return;
    }
    showToast(`Instruções de redefinição enviadas para ${modalEmail}`);
    setActiveModal(null);
  };

  const handleResendConfirmation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalEmail) {
      showToast('Digite seu e-mail para reenviar');
      return;
    }
    showToast(`E-mail de confirmação reenviado para ${modalEmail}`);
    setActiveModal(null);
  };

  return (
    <div className="relative w-full max-w-[430px] h-[92vh] max-h-[880px] rounded-[36px] overflow-hidden shadow-2xl border-4 border-slate-800 bg-[#0074c7] flex flex-col select-none font-sans">
      {/* Android Status Bar */}
      <div className="w-full bg-[#0074c7] px-4 pt-2 pb-1 flex justify-between items-center text-white text-[12px] font-medium tracking-tight">
        <div className="flex items-center gap-1.5">
          <span>17:15</span>
          <span className="text-[10px] opacity-90">📍</span>
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
          <div className="w-4 h-2 border border-white rounded-[2px] p-[1px] flex items-center relative">
            <div className="w-full h-full bg-white rounded-[1px]"></div>
          </div>
        </div>
      </div>

      {/* App Bar "Login" */}
      <div className="w-full bg-[#0074c7] px-4 py-3 flex items-center justify-center relative">
        {onSkip && (
          <button
            onClick={onSkip}
            className="absolute left-4 text-white/80 hover:text-white text-xs font-semibold"
          >
            Pular
          </button>
        )}
        <h1 className="text-white font-medium text-lg tracking-wide">
          Login
        </h1>
      </div>

      {/* Card Branco Central com Borda Arredondada Exata do Print */}
      <div className="flex-1 p-2 pt-0 pb-2.5 flex flex-col overflow-hidden bg-gradient-to-b from-[#0074c7] to-[#0094f7]">
        <div className="w-full h-full bg-white rounded-[24px] shadow-sm overflow-y-auto px-6 py-8 flex flex-col justify-between relative">
          
          <form onSubmit={handleLogin} className="w-full flex flex-col items-center">
            {/* Título e Subtítulo */}
            <h2 className="text-[21px] font-normal text-[#3a3a3a] mb-1.5 tracking-tight text-center">
              Entre com sua conta
            </h2>
            <p className="text-[13px] text-[#6d6d6d] font-normal mb-8 text-center tracking-tight">
              Necessário para ter acesso a todas funções
            </p>

            {/* Inputs com bordas arredondadas idênticos ao print */}
            <div className="w-full space-y-3.5 mb-8">
              <div className="w-full">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full px-4 py-3 rounded-[14px] border border-[#a1a1a1] text-[#333333] text-[15px] placeholder-[#808080] focus:outline-none focus:border-[#0074c7] focus:ring-1 focus:ring-[#0074c7] transition"
                />
              </div>

              <div className="w-full">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Senha"
                  className="w-full px-4 py-3 rounded-[14px] border border-[#a1a1a1] text-[#333333] text-[15px] placeholder-[#808080] focus:outline-none focus:border-[#0074c7] focus:ring-1 focus:ring-[#0074c7] transition"
                />
              </div>
            </div>

            {/* Os 4 Botões Pílula com Sombra Projetada */}
            <div className="w-full flex flex-col items-center gap-3.5 max-w-[280px]">
              {/* 1. ENTRAR (Âmbar / Amarelo Dourado da imagem anexa #f5a623) */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-2.5 px-6 rounded-full bg-[#f5a623] hover:bg-[#e09418] text-white font-bold text-[14px] tracking-wider uppercase shadow-[0_4px_10px_rgba(245,166,35,0.4)] transition cursor-pointer"
              >
                ENTRAR
              </motion.button>

              {/* 2. CRIAR CONTA (Verde Limão Suave da imagem anexa #a3cb53) */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => {
                  setModalEmail(email);
                  setActiveModal('create');
                }}
                className="w-full py-2.5 px-6 rounded-full bg-[#a3cb53] hover:bg-[#92ba42] text-white font-bold text-[14px] tracking-wider uppercase shadow-[0_4px_10px_rgba(163,203,83,0.4)] transition cursor-pointer"
              >
                CRIAR CONTA
              </motion.button>

              {/* 3. ESQUECEU A SENHA (Salmão / Coral da imagem anexa #db6c6c) */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => {
                  setModalEmail(email);
                  setActiveModal('forgot');
                }}
                className="w-full py-2.5 px-6 rounded-full bg-[#db6c6c] hover:bg-[#cf5f5f] text-white font-bold text-[14px] tracking-wider uppercase shadow-[0_4px_10px_rgba(219,108,108,0.4)] transition cursor-pointer"
              >
                ESQUECEU A SENHA
              </motion.button>

              {/* 4. EMAIL DE CONFIRMAÇÃO (Salmão / Coral da imagem anexa #db6c6c) */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => {
                  setModalEmail(email);
                  setActiveModal('resend');
                }}
                className="w-full py-2.5 px-6 rounded-full bg-[#db6c6c] hover:bg-[#cf5f5f] text-white font-bold text-[14px] tracking-wider uppercase shadow-[0_4px_10px_rgba(219,108,108,0.4)] transition cursor-pointer"
              >
                EMAIL DE CONFIRMAÇÃO
              </motion.button>
            </div>
          </form>

          {/* Dica de teste rápido no rodapé */}
          <div className="w-full pt-4 text-center">
            <button
              type="button"
              onClick={() => onLoginSuccess('tenista@tudoparatenistas.com.br')}
              className="text-xs text-[#0074c7] hover:underline font-semibold cursor-pointer"
            >
              Entrar como convidado (demo rápida) &rarr;
            </button>
          </div>

          {/* Toast Notification */}
          <AnimatePresence>
            {toastMessage && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute bottom-4 left-4 right-4 bg-slate-900 text-white text-xs py-2.5 px-4 rounded-xl shadow-lg flex items-center justify-between z-40"
              >
                <span>{toastMessage}</span>
                <button onClick={() => setToastMessage(null)} className="ml-2 text-slate-400 hover:text-white">
                  <X className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Modais de Fluxos: Criar Conta, Esqueci Senha, Confirmar Email */}
      <AnimatePresence>
        {activeModal && (
          <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-sm bg-white rounded-2xl p-6 shadow-2xl relative"
            >
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>

              {activeModal === 'create' && (
                <form onSubmit={handleCreateAccount} className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-lg font-bold text-slate-800">Criar Nova Conta</h3>
                    <p className="text-xs text-slate-500">Junte-se à comunidade Tudo para Tenistas</p>
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="Seu Nome Completo"
                    value={modalName}
                    onChange={(e) => setModalName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-[#0074c7] outline-none"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Seu Email"
                    value={modalEmail}
                    onChange={(e) => setModalEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-[#0074c7] outline-none"
                  />
                  <input
                    type="password"
                    required
                    placeholder="Crie uma Senha"
                    value={modalPass}
                    onChange={(e) => setModalPass(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-[#0074c7] outline-none"
                  />
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-full bg-[#a3c743] hover:bg-[#94b834] text-white font-bold text-sm uppercase shadow transition"
                  >
                    Confirmar Cadastro
                  </button>
                </form>
              )}

              {activeModal === 'forgot' && (
                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-lg font-bold text-slate-800">Esqueceu a Senha?</h3>
                    <p className="text-xs text-slate-500">Enviaremos um link de recuperação para seu email</p>
                  </div>
                  <input
                    type="email"
                    required
                    placeholder="Seu Email cadastrado"
                    value={modalEmail}
                    onChange={(e) => setModalEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-[#0074c7] outline-none"
                  />
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-full bg-[#d66f6f] hover:bg-[#c95f5f] text-white font-bold text-sm uppercase shadow transition"
                  >
                    Enviar Link de Redefinição
                  </button>
                </form>
              )}

              {activeModal === 'resend' && (
                <form onSubmit={handleResendConfirmation} className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-lg font-bold text-slate-800">Reenviar Confirmação</h3>
                    <p className="text-xs text-slate-500">Informe o email para reenviar a ativação da conta</p>
                  </div>
                  <input
                    type="email"
                    required
                    placeholder="Seu Email cadastrado"
                    value={modalEmail}
                    onChange={(e) => setModalEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-[#0074c7] outline-none"
                  />
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-full bg-[#d66f6f] hover:bg-[#c95f5f] text-white font-bold text-sm uppercase shadow transition"
                  >
                    Reenviar Email de Ativação
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

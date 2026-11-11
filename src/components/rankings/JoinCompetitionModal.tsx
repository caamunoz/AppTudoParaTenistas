import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Trophy, KeyRound, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface JoinCompetitionModalProps {
  onJoin: (login: string, pass: string) => { success: boolean; message: string };
  onClose: () => void;
  onNavigateToTournaments?: () => void;
}

export const JoinCompetitionModal: React.FC<JoinCompetitionModalProps> = ({
  onJoin,
  onClose,
  onNavigateToTournaments,
}) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!login.trim() || !password.trim()) {
      setError('Por favor informe o Login e a Senha de acesso.');
      return;
    }
    const result = onJoin(login, password);
    if (result.success) {
      onClose();
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-[340px] bg-white rounded-2xl shadow-2xl p-5 border border-slate-200"
      >
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 text-amber-600 mx-auto mb-3">
          <KeyRound className="w-6 h-6" />
        </div>

        <h3 className="text-slate-800 text-[17px] font-bold text-center mb-1">
          Participar de Competição
        </h3>
        <p className="text-slate-500 text-xs text-center mb-4">
          Insira o login e senha fornecidos pelo administrador do ranking ou torneio.
        </p>

        {error && (
          <div className="mb-3 p-2 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 shrink-0 text-red-500" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
              Login do Ranking / Torneio
            </label>
            <input
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              placeholder="Ex: parceiros"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-800 text-sm focus:outline-none focus:border-[#0074c7]"
            />
            <span className="text-[10px] text-slate-400">Dica demo: use login "parceiros"</span>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
              Senha de Acesso
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ex: 1234"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-800 text-sm focus:outline-none focus:border-[#0074c7]"
            />
            <span className="text-[10px] text-slate-400">Dica demo: senha "1234"</span>
          </div>

          {/* Atalho para Encontrar Torneios */}
          {onNavigateToTournaments && (
            <div className="pt-1">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onNavigateToTournaments();
                }}
                className="w-full py-1.5 px-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-[11px] font-medium flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <Trophy className="w-3.5 h-3.5 text-blue-600" />
                Buscar novos torneios em "Encontrar Torneios"
              </button>
            </div>
          )}

          {/* Botões Não / Sim */}
          <div className="flex items-center justify-center gap-4 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="w-24 py-2 rounded-full font-bold text-white text-[13px] bg-[#db6c6c] hover:bg-[#c95b5b] shadow-md transition-all active:scale-95 cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="w-24 py-2 rounded-full font-bold text-white text-[13px] bg-[#a3cb53] hover:bg-[#8eb840] shadow-md transition-all active:scale-95 cursor-pointer"
            >
              Entrar
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

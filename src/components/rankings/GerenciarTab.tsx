import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Clock, Edit3, Calculator, Share2, CheckCircle2, ChevronRight } from 'lucide-react';
import { RankingCompetition, EnrolledTournament } from '../../types/tennisRankings';

interface GerenciarTabProps {
  ranking: RankingCompetition;
  tournaments: EnrolledTournament[];
  onOpenBracket: (tournament: EnrolledTournament) => void;
  onEditRules?: () => void;
  onRecalculate?: () => void;
  onShareCredentials?: () => void;
}

export const GerenciarTab: React.FC<GerenciarTabProps> = ({
  ranking,
  tournaments,
  onOpenBracket,
  onEditRules,
  onRecalculate,
  onShareCredentials,
}) => {
  const [showActions, setShowActions] = useState(false);
  const [toastFeedback, setToastFeedback] = useState<string | null>(null);

  const handleActionClick = (actionName: string) => {
    if (actionName === 'edit' && onEditRules) {
      onEditRules();
    } else if (actionName === 'recalc') {
      if (onRecalculate) onRecalculate();
      setToastFeedback('Pontuações e posições do ranking recalculadas com sucesso!');
      setTimeout(() => setToastFeedback(null), 3000);
    } else if (actionName === 'share') {
      if (onShareCredentials) onShareCredentials();
      if (navigator.clipboard) {
        navigator.clipboard.writeText(
          `Acesse o Ranking "${ranking.name}" no app Tudo para Tenistas! Login: ${ranking.rules.login} | Senha: ${ranking.rules.password}`
        );
      }
      setToastFeedback('Convite copiado para a área de transferência!');
      setTimeout(() => setToastFeedback(null), 3000);
    }
  };

  return (
    <div className="w-full flex-1 flex flex-col overflow-y-auto px-3 py-2">
      {/* Subtítulo exato do print U_ABA_GERENCIAR */}
      <h3 className="text-center text-slate-700 text-sm font-medium mb-3">
        Rankings e Torneios
      </h3>

      {toastFeedback && (
        <div className="mb-3 p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2 shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{toastFeedback}</span>
        </div>
      )}

      {/* CARD 1: Gerenciar Ranking Parceiros do Clube (fiel aos prints U_ABA_GERENCIAR_A e Z) */}
      <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden mb-4 transition-all">
        <div className="flex items-stretch">
          {/* Conteúdo Principal do Ranking */}
          <div className="flex-1 p-3">
            {/* Header: Nome do Ranking e Inscritos */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                RANKING: {ranking.name}
              </span>
              <span className="text-[11px] font-semibold text-slate-500 uppercase">
                INSCRITOS: <strong className="text-slate-800">{ranking.rules.registeredCount}</strong>
              </span>
            </div>

            {/* Grid em 3 colunas: Regras da Esquerda | Foto da Quadra | Regras da Direita */}
            <div className="grid grid-cols-3 gap-2 items-center pt-2.5">
              {/* Coluna da Esquerda */}
              <div className="text-[10px] space-y-1 text-slate-600 leading-tight">
                <div>
                  <span className="text-slate-400">Login: </span>
                  <strong className="text-slate-700">{ranking.rules.login}</strong>
                </div>
                <div>
                  <span className="text-slate-400">Senha: </span>
                  <strong className="text-slate-700">{ranking.rules.password}</strong>
                </div>
                <div>
                  <span className="text-slate-400">Máx. de Sets: </span>
                  <strong className="text-slate-700">{ranking.rules.maxSets}</strong>
                </div>
                <div>
                  <span className="text-slate-400">Periodicidade: </span>
                  <strong className="text-slate-700">{ranking.rules.periodicity}</strong>
                </div>
                <div>
                  <span className="text-slate-400">Max. Desafios: </span>
                  <strong className="text-slate-700">{ranking.rules.maxChallenges}</strong>
                </div>
              </div>

              {/* Coluna Central: Foto da Quadra */}
              <div className="h-20 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shadow-xs">
                <img
                  src={ranking.clubPhotoUrl}
                  alt={ranking.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Coluna da Direita: Regras de Pontos e Desafio */}
              <div className="text-[10px] space-y-1 text-slate-600 leading-tight pl-1">
                <div>
                  <span className="text-slate-400">Desafio acima: </span>
                  <strong className="text-slate-700">{ranking.rules.challengeAbove}</strong>
                </div>
                <div>
                  <span className="text-slate-400">Desafio abaixo: </span>
                  <strong className="text-slate-700">{ranking.rules.challengeBelow}</strong>
                </div>
                <div>
                  <span className="text-slate-400">Ptos Vencedor: </span>
                  <strong className="text-slate-700">{ranking.rules.pointsWinner}</strong>
                </div>
                <div>
                  <span className="text-slate-400">Ptos Perdedor: </span>
                  <strong className="text-slate-700">{ranking.rules.pointsLoser}</strong>
                </div>
                <div>
                  <span className="text-slate-400">WO Perde: </span>
                  <strong className="text-slate-700">{ranking.rules.pointsWOLoss}</strong>
                </div>
              </div>
            </div>

            {/* Dica para exibir / ocultar botões de ação estilo swipe */}
            <div
              onClick={() => setShowActions((prev) => !prev)}
              className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-semibold text-slate-400 hover:text-slate-700 cursor-pointer select-none"
            >
              <span>{showActions ? 'Ocultar ações do administrador' : 'Arraste ou clique para opções do administrador'}</span>
              <ChevronRight
                className={`w-3.5 h-3.5 transition-transform ${showActions ? 'rotate-90' : ''}`}
              />
            </div>
          </div>

          {/* Botões de Ação estilo Swipe (Print Z): Azul ✏️, Amarelo 🧮, Verde 🔗 */}
          {showActions && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 140, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="flex items-stretch shrink-0 overflow-hidden"
            >
              {/* Botão Editar (Azul ardósia) */}
              <button
                onClick={() => handleActionClick('edit')}
                title="Editar regras do ranking"
                className="flex-1 bg-[#64748b] hover:bg-[#475569] text-white flex items-center justify-center transition active:scale-95 cursor-pointer"
              >
                <Edit3 className="w-5 h-5" />
              </button>

              {/* Botão Calcular Pontos (Amarelo Ocre / Dourado) */}
              <button
                onClick={() => handleActionClick('recalc')}
                title="Calcular e atualizar ranking"
                className="flex-1 bg-[#d4af37] hover:bg-[#b89628] text-white flex items-center justify-center transition active:scale-95 cursor-pointer"
              >
                <Calculator className="w-5 h-5" />
              </button>

              {/* Botão Compartilhar Convite (Verde Oliva) */}
              <button
                onClick={() => handleActionClick('share')}
                title="Compartilhar login e senha"
                className="flex-1 bg-[#7ea04d] hover:bg-[#6b8b3d] text-white flex items-center justify-center transition active:scale-95 cursor-pointer"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </motion.div>
          )}
        </div>
      </div>

      {/* CARD 2: Gerenciar Torneio Amigos do Tênis */}
      {tournaments.map((tournament) => (
        <div
          key={`manage-${tournament.id}`}
          className="w-full bg-white rounded-2xl border border-slate-200 shadow-md p-3 mb-4 transition-all"
        >
          {/* Header do Card */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              TORNEIO: {tournament.name}
            </span>
            <span className="text-[11px] font-semibold text-slate-500 uppercase">
              INSCRITOS: <strong className="text-slate-800">{tournament.registeredCount}</strong>
            </span>
          </div>

          {/* Conteúdo */}
          <div className="flex items-center justify-between gap-3 pt-3">
            {/* Foto da Quadra */}
            <div className="w-24 h-20 rounded-xl overflow-hidden shrink-0 border border-slate-200 shadow-xs">
              <img
                src={tournament.photoUrl}
                alt={tournament.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Informações detalhadas */}
            <div className="flex-1 min-w-0 text-[11px] space-y-0.5 text-slate-600">
              <div>
                <span className="text-slate-400">Admin: </span>
                <strong className="text-slate-700">{tournament.admin}</strong>
              </div>
              <div>
                <span className="text-slate-400">Data: </span>
                <strong className="text-slate-700">{tournament.date}</strong>
              </div>
              <div>
                <span className="text-slate-400">Local: </span>
                <strong className="text-slate-700 truncate">{tournament.location}</strong>
              </div>
              <div>
                <span className="text-slate-400">Obs: </span>
                <span className="text-slate-600">{tournament.obsPrice}</span>
              </div>
            </div>

            {/* Coluna da Direita: Status e Botão Chaves */}
            <div className="flex flex-col items-center justify-between h-20 shrink-0 pl-1">
              <div className="flex flex-col items-center">
                <Clock className="w-4 h-4 text-red-500" />
                <span className="text-[10px] italic text-red-600 font-semibold mt-0.5">
                  ...disputando
                </span>
              </div>

              <button
                onClick={() => onOpenBracket(tournament)}
                title="Ver Chaves do Torneio"
                className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition active:scale-95 cursor-pointer shadow-2xs group"
              >
                <svg
                  className="w-5 h-5 text-slate-600 group-hover:text-[#0074c7] transition"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                >
                  <path d="M4 6h4v4H4z" />
                  <path d="M4 14h4v4H4z" />
                  <path d="M8 8h4v8H8" />
                  <path d="M12 12h4" />
                  <path d="M16 10h4v4h-4z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

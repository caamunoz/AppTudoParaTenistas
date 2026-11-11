import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Bell,
  Plus,
  X,
  Trophy,
  BarChart3,
  CheckCircle2,
} from 'lucide-react';
import { useTennisRankings } from '../../context/TennisRankingsContext';
import { RankingsTab } from './RankingsTab';
import { TorneiosTab } from './TorneiosTab';
import { DesafiosTab } from './DesafiosTab';
import { H2HTab } from './H2HTab';
import { GerenciarTab } from './GerenciarTab';
import { ChallengeConfirmModal } from './ChallengeConfirmModal';
import { TournamentBracketsModal } from './TournamentBracketsModal';
import { SendRankingMessageModal } from './SendRankingMessageModal';
import { ConfirmScoreModal } from './ConfirmScoreModal';
import { JoinCompetitionModal } from './JoinCompetitionModal';
import { NotificationsModal } from '../common/NotificationsModal';
import { HomeTennisBallButton } from '../common/HomeTennisBallButton';
import {
  RankingLadderPlayer,
  EnrolledTournament,
  RankingChallenge,
} from '../../types/tennisRankings';

type ActiveTab = 'rankings' | 'torneios' | 'desafios' | 'h2h' | 'gerenciar';

interface RankingsTorneiosScreenProps {
  onBackToMenu: () => void;
  onToggleDrawer?: () => void;
  onNavigateToTournaments?: () => void;
}

export const RankingsTorneiosScreen: React.FC<RankingsTorneiosScreenProps> = ({
  onBackToMenu,
  onToggleDrawer,
  onNavigateToTournaments,
}) => {
  const {
    ranking,
    tournaments,
    challenges,
    bracketMatches,
    h2h,
    toastMessage,
    showToast,
    createChallenge,
    confirmChallengeResult,
    joinCompetitionWithCredentials,
    sendDirectMessage,
  } = useTennisRankings();

  const [activeTab, setActiveTab] = useState<ActiveTab>('rankings');
  const [isFabExpanded, setIsFabExpanded] = useState<boolean>(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);

  // Estados dos Modais
  const [challengingPlayer, setChallengingPlayer] = useState<RankingLadderPlayer | null>(null);
  const [activeBracketTournament, setActiveBracketTournament] = useState<EnrolledTournament | null>(null);
  const [messagingChallenge, setMessagingChallenge] = useState<RankingChallenge | null>(null);
  const [scoreConfirmChallenge, setScoreConfirmChallenge] = useState<RankingChallenge | null>(null);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState<boolean>(false);

  const handleFabClick = () => {
    if (activeTab === 'gerenciar') {
      setIsFabExpanded((prev) => !prev);
    } else {
      setIsJoinModalOpen(true);
    }
  };

  const handleCreateNewRanking = () => {
    setIsFabExpanded(false);
    showToast('Formulário de criação de novo Ranking de Clube aberto para configuração.');
  };

  const handleCreateNewTournament = () => {
    setIsFabExpanded(false);
    showToast('Formulário de criação de novo Torneio de Tênis aberto para configuração.');
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-[#0074c7] select-none overflow-hidden font-sans">
      {/* Android Status Bar */}
      <div className="w-full bg-[#0074c7] px-3.5 pt-1.5 pb-1 flex justify-between items-center text-white text-[11px] font-medium tracking-tight">
        <div className="flex items-center gap-1.5">
          <span>20:31</span>
          <span className="text-[10px]">💬</span>
          <span className="text-[10px]">📍</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px]">⏰</span>
          <span className="text-[10px]">📶</span>
          <span className="text-[10px]">🔋</span>
        </div>
      </div>

      {/* App Bar Principal - Conforme prints F_RANK, H_RANK_LIST, etc. */}
      <div className="w-full bg-[#0074c7] px-4 py-2 flex items-center justify-between">
        {/* Hambúrguer amarelo */}
        <button
          onClick={onToggleDrawer || onBackToMenu}
          className="p-1 rounded hover:bg-white/10 transition flex flex-col gap-[4px] cursor-pointer"
          title="Menu Principal"
        >
          <span className="w-6 h-[3.5px] bg-[#ffb703] rounded-full inline-block"></span>
          <span className="w-6 h-[3.5px] bg-[#ffb703] rounded-full inline-block"></span>
          <span className="w-6 h-[3.5px] bg-[#ffb703] rounded-full inline-block"></span>
        </button>

        {/* Título Central */}
        <h1 className="text-white text-base font-medium tracking-tight">
          Rankings e Torneios
        </h1>

        {/* Lado Direito: Sino com Badge + Bolinha de Tênis (Home) */}
        <div className="flex items-center gap-3">
          {/* Sino com Badge de Notificação */}
          <button
            onClick={() => setIsNotificationsOpen(true)}
            className="relative p-1 text-white hover:text-amber-200 transition cursor-pointer"
            title="Notificações"
          >
            <Bell className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-[#0074c7]">
              3
            </span>
          </button>

          {/* Bolinha de Tênis PNG (Home) */}
          <HomeTennisBallButton onClick={onBackToMenu} className="w-8 h-8" />
        </div>
      </div>

      {/* Abas Superiores exatamente como nas telas de referência */}
      <div className="w-full bg-[#0074c7] px-2 pt-1 flex items-end justify-between gap-1 overflow-x-auto no-scrollbar">
        {/* Aba: Rankings */}
        <button
          onClick={() => setActiveTab('rankings')}
          className={`flex-1 py-1.5 px-2 text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap text-center ${
            activeTab === 'rankings'
              ? 'bg-white text-slate-800 rounded-t-xl shadow-xs'
              : 'text-white/90 hover:text-white bg-[#005fa3] rounded-t-lg border-t border-x border-white/20'
          }`}
        >
          Rankings
        </button>

        {/* Aba: Torneios */}
        <button
          onClick={() => setActiveTab('torneios')}
          className={`flex-1 py-1.5 px-2 text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap text-center ${
            activeTab === 'torneios'
              ? 'bg-white text-slate-800 rounded-t-xl shadow-xs'
              : 'text-white/90 hover:text-white bg-[#005fa3] rounded-t-lg border-t border-x border-white/20'
          }`}
        >
          Torneios
        </button>

        {/* Aba: Desafios */}
        <button
          onClick={() => setActiveTab('desafios')}
          className={`flex-1 py-1.5 px-2 text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap text-center ${
            activeTab === 'desafios'
              ? 'bg-white text-slate-800 rounded-t-xl shadow-xs'
              : 'text-white/90 hover:text-white bg-[#005fa3] rounded-t-lg border-t border-x border-white/20'
          }`}
        >
          Desafios
        </button>

        {/* Aba: H2H */}
        <button
          onClick={() => setActiveTab('h2h')}
          className={`flex-1 py-1.5 px-2 text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap text-center ${
            activeTab === 'h2h'
              ? 'bg-white text-slate-800 rounded-t-xl shadow-xs'
              : 'text-white/90 hover:text-white bg-[#005fa3] rounded-t-lg border-t border-x border-white/20'
          }`}
        >
          H2H
        </button>

        {/* Aba: Gerenciar */}
        <button
          onClick={() => setActiveTab('gerenciar')}
          className={`flex-1 py-1.5 px-2 text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap text-center ${
            activeTab === 'gerenciar'
              ? 'bg-white text-slate-800 rounded-t-xl shadow-xs'
              : 'text-white/90 hover:text-white bg-[#005fa3] rounded-t-lg border-t border-x border-white/20'
          }`}
        >
          Gerenciar
        </button>
      </div>

      {/* Conteúdo Principal Branco Arredondado */}
      <div className="flex-1 bg-white rounded-t-2xl shadow-inner flex flex-col overflow-hidden relative">
        {/* Toast Notificação */}
        {toastMessage && (
          <div className="absolute top-2 inset-x-4 z-40 bg-slate-900/90 text-white px-3.5 py-2.5 rounded-xl shadow-lg border border-slate-700 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="leading-snug">{toastMessage}</span>
          </div>
        )}

        {/* Renderização Condicional da Aba Ativa */}
        {activeTab === 'rankings' && (
          <RankingsTab
            ranking={ranking}
            onChallengePlayer={(player) => setChallengingPlayer(player)}
          />
        )}

        {activeTab === 'torneios' && (
          <TorneiosTab
            tournaments={tournaments}
            onOpenBracket={(t) => setActiveBracketTournament(t)}
            onExploreTournaments={onNavigateToTournaments}
          />
        )}

        {activeTab === 'desafios' && (
          <DesafiosTab
            challenges={challenges}
            onOpenMessageModal={(ch) => setMessagingChallenge(ch)}
            onOpenConfirmScoreModal={(ch) => setScoreConfirmChallenge(ch)}
          />
        )}

        {activeTab === 'h2h' && (
          <H2HTab
            h2hData={h2h}
            players={ranking.players}
            onChallengeOpponent={(player) => setChallengingPlayer(player)}
          />
        )}

        {activeTab === 'gerenciar' && (
          <GerenciarTab
            ranking={ranking}
            tournaments={tournaments}
            onOpenBracket={(t) => setActiveBracketTournament(t)}
            onEditRules={() => showToast('Painel de edição de regras do ranking aberto.')}
            onRecalculate={() => showToast('Ranking recalculado!')}
            onShareCredentials={() => showToast('Convite compartilhado!')}
          />
        )}

        {/* Botão Flutuante Inferior (+) - Conforme prints F_RANK e U_ABA_GERENCIAR_B */}
        <div className="absolute bottom-5 right-5 flex flex-col items-end gap-2.5 z-30">
          {/* Opções expandidas no modo Gerenciar (Print U_ABA_GERENCIAR_B) */}
          <AnimatePresence>
            {isFabExpanded && activeTab === 'gerenciar' && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                className="flex flex-col items-end gap-2.5 mb-1"
              >
                {/* Opção: Novo Torneio */}
                <div className="flex items-center gap-2.5">
                  <span className="px-3 py-1.5 rounded-lg bg-slate-800/90 text-white text-xs font-semibold shadow-md">
                    Novo Torneio
                  </span>
                  <button
                    onClick={handleCreateNewTournament}
                    className="w-11 h-11 rounded-full bg-[#a855f7] hover:bg-[#9333ea] text-white flex items-center justify-center shadow-lg transition active:scale-95 cursor-pointer"
                  >
                    <Trophy className="w-5 h-5" />
                  </button>
                </div>

                {/* Opção: Novo Ranking */}
                <div className="flex items-center gap-2.5">
                  <span className="px-3 py-1.5 rounded-lg bg-slate-800/90 text-white text-xs font-semibold shadow-md">
                    Novo Ranking
                  </span>
                  <button
                    onClick={handleCreateNewRanking}
                    className="w-11 h-11 rounded-full bg-[#22c55e] hover:bg-[#16a34a] text-white flex items-center justify-center shadow-lg transition active:scale-95 cursor-pointer"
                  >
                    <BarChart3 className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Botão Redondo Principal Vermelho (+) / (X) */}
          <button
            onClick={handleFabClick}
            className="w-12 h-12 rounded-full bg-[#c0392b] hover:bg-[#a93226] text-white flex items-center justify-center shadow-xl transition active:scale-90 cursor-pointer"
            title={
              activeTab === 'gerenciar'
                ? isFabExpanded
                  ? 'Fechar menu'
                  : 'Criar novo Torneio ou Ranking'
                : 'Participar de Torneio ou Ranking com Login/Senha'
            }
          >
            {isFabExpanded && activeTab === 'gerenciar' ? (
              <X className="w-6 h-6 stroke-[2.5]" />
            ) : (
              <Plus className="w-6 h-6 stroke-[2.5]" />
            )}
          </button>
        </div>
      </div>

      {/* MODAL 1: Confirmar Desafio (J_RANK_DESAFIAR) */}
      {challengingPlayer && (
        <ChallengeConfirmModal
          opponent={challengingPlayer}
          ranking={ranking}
          onConfirm={() => {
            createChallenge(challengingPlayer);
            setChallengingPlayer(null);
            setActiveTab('desafios');
          }}
          onCancel={() => setChallengingPlayer(null)}
        />
      )}

      {/* MODAL 2: Chaves do Torneio (T_CHAVES) */}
      {activeBracketTournament && (
        <TournamentBracketsModal
          tournamentTitle={activeBracketTournament.name}
          matches={bracketMatches}
          onClose={() => setActiveBracketTournament(null)}
        />
      )}

      {/* MODAL 3: Enviar Mensagem (N_MSG) */}
      {messagingChallenge && (
        <SendRankingMessageModal
          recipientName={messagingChallenge.player2.name}
          onSend={(msg) => {
            sendDirectMessage(messagingChallenge.player2.name, msg);
          }}
          onClose={() => setMessagingChallenge(null)}
        />
      )}

      {/* MODAL 4: Confirmar Placar (N_RESULT) */}
      {scoreConfirmChallenge && (
        <ConfirmScoreModal
          challenge={scoreConfirmChallenge}
          onConfirm={(s1, s2) => {
            confirmChallengeResult(scoreConfirmChallenge.id, s1, s2);
            setScoreConfirmChallenge(null);
          }}
          onCancel={() => setScoreConfirmChallenge(null)}
        />
      )}

      {/* MODAL 5: Entrar em Competição com Login e Senha */}
      {isJoinModalOpen && (
        <JoinCompetitionModal
          onJoin={joinCompetitionWithCredentials}
          onClose={() => setIsJoinModalOpen(false)}
          onNavigateToTournaments={onNavigateToTournaments}
        />
      )}

      {/* MODAL 6: Notificações do Sistema */}
      {isNotificationsOpen && (
        <NotificationsModal
          onClose={() => setIsNotificationsOpen(false)}
        />
      )}
    </div>
  );
};

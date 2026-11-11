import React, { useState } from 'react';
import { MessageSquare, Check, HelpCircle, Trophy } from 'lucide-react';
import { RankingChallenge } from '../../types/tennisRankings';

interface DesafiosTabProps {
  challenges: RankingChallenge[];
  onOpenMessageModal: (challenge: RankingChallenge) => void;
  onOpenConfirmScoreModal: (challenge: RankingChallenge) => void;
}

export const DesafiosTab: React.FC<DesafiosTabProps> = ({
  challenges,
  onOpenMessageModal,
  onOpenConfirmScoreModal,
}) => {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <div className="w-full flex-1 flex flex-col overflow-y-auto px-3 py-2 relative">
      {/* Subtítulo exato do print L_ABA_DESAFIO */}
      <h3 className="text-center text-slate-700 text-sm font-medium mb-3">
        Seus Desafios
      </h3>

      {challenges.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center bg-white rounded-2xl border border-slate-200">
          <Trophy className="w-12 h-12 text-slate-300 mb-2" />
          <h4 className="text-sm font-bold text-slate-700">Nenhum desafio pendente</h4>
          <p className="text-xs text-slate-500 mt-1 max-w-[260px]">
            Vá até a aba "Rankings" e clique no ícone de desafiar ao lado de um tenista para iniciar uma disputa!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {challenges.map((challenge) => (
            <div
              key={challenge.id}
              className="w-full bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden transition-all"
            >
              <div className="flex items-stretch">
                {/* Parte Principal do Desafio com Fotos e Posições */}
                <div className="flex-1 p-3">
                  {/* Linha Superior: Nome do Ranking e Jogo ID */}
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-xs">
                    <span className="font-bold text-slate-800 uppercase tracking-wide truncate max-w-[170px]">
                      RANKING: {challenge.rankingName}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500">
                      Jogo ID: <strong className="text-slate-800">{challenge.id}</strong>
                    </span>
                  </div>

                  {/* Detalhes do Confronto entre os Tenistas */}
                  <div className="flex items-center justify-between gap-1 pt-2">
                    {/* Jogador 1 (Você) */}
                    <div className="flex flex-col items-center w-24">
                      <div className="text-[10px] font-bold text-slate-700 truncate max-w-[90px] mb-1">
                        {challenge.player1.isCurrentUser ? 'Você' : challenge.player1.name}
                      </div>

                      <div className="flex items-center gap-1.5 mb-1.5">
                        <div className="flex flex-col items-center">
                          <span className="w-6 py-0.2 rounded text-center text-white text-[9px] font-bold bg-[#f5a623]">
                            {challenge.player1.position}
                          </span>
                          <span className="text-[8px] text-slate-400">Posição</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="px-1.5 py-0.2 rounded text-center text-white text-[9px] font-bold bg-[#334155]">
                            {challenge.player1.points}
                          </span>
                          <span className="text-[8px] text-slate-400">Pontos</span>
                        </div>
                      </div>

                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shadow-xs mb-1.5">
                        <img
                          src={challenge.player1.photoUrl}
                          alt={challenge.player1.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="w-12 h-6 rounded border border-slate-300 flex items-center justify-center font-bold text-slate-700 text-xs bg-slate-50">
                        {challenge.player1.score ?? '-'}
                      </div>
                    </div>

                    {/* "X" Central de Confronto */}
                    <div className="flex flex-col items-center justify-center text-lg font-bold text-slate-400 px-1">
                      <span>X</span>
                    </div>

                    {/* Jogador 2 (Desafiado) */}
                    <div className="flex flex-col items-center w-24">
                      <div className="text-[10px] font-bold text-slate-700 truncate max-w-[90px] mb-1">
                        {challenge.player2.name.split(' ')[0]}
                      </div>

                      <div className="flex items-center gap-1.5 mb-1.5">
                        <div className="flex flex-col items-center">
                          <span className="w-6 py-0.2 rounded text-center text-white text-[9px] font-bold bg-[#f5a623]">
                            {challenge.player2.position}
                          </span>
                          <span className="text-[8px] text-slate-400">Posição</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="px-1.5 py-0.2 rounded text-center text-white text-[9px] font-bold bg-[#334155]">
                            {challenge.player2.points}
                          </span>
                          <span className="text-[8px] text-slate-400">Pontos</span>
                        </div>
                      </div>

                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shadow-xs mb-1.5">
                        <img
                          src={challenge.player2.photoUrl}
                          alt={challenge.player2.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="w-12 h-6 rounded border border-slate-300 flex items-center justify-center font-bold text-slate-700 text-xs bg-slate-50">
                        {challenge.player2.score ?? '-'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Botões de Ação na Direita (Exatamente como no print M_ARRASTANDO: Azul 💬 e Verde ✅) */}
                <div className="flex flex-col w-20 shrink-0 border-l border-slate-200">
                  {/* Botão de Mensagem / Chat (Azul) */}
                  <button
                    onClick={() => onOpenMessageModal(challenge)}
                    title="Conversar com o tenista"
                    className="flex-1 bg-[#0074c7] hover:bg-[#0062a8] text-white flex items-center justify-center transition active:opacity-90 cursor-pointer"
                  >
                    <MessageSquare className="w-6 h-6" />
                  </button>

                  {/* Botão de Confirmar Resultado (Verde) */}
                  <button
                    onClick={() => onOpenConfirmScoreModal(challenge)}
                    title="Confirmar resultado da partida"
                    className="flex-1 bg-[#43a047] hover:bg-[#388e3c] text-white flex items-center justify-center transition active:opacity-90 cursor-pointer"
                  >
                    <Check className="w-6 h-6 stroke-[3]" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal / Tooltip de Ajuda ao Clicar no "?" */}
      {showHelp && (
        <div className="absolute inset-x-4 bottom-16 bg-slate-900/95 text-white p-4 rounded-2xl shadow-2xl border border-slate-700 text-xs z-30">
          <div className="flex items-center justify-between font-bold text-sm mb-1 text-lime-400">
            <span>Como funcionam os Desafios?</span>
            <button
              onClick={() => setShowHelp(false)}
              className="text-slate-400 hover:text-white"
            >
              ✕
            </button>
          </div>
          <p className="text-slate-300 leading-relaxed">
            1. Use o botão azul 💬 para combinar data, horário e quadra com seu adversário.
            <br />
            2. Após o jogo, use o botão verde ✅ para inserir e validar o placar final.
            <br />
            3. A pontuação e posição do ranking serão atualizadas automaticamente para ambos!
          </p>
        </div>
      )}

      {/* Botão Flutuante de Ajuda "?" (Verde Claro como no print L_ABA_DESAFIO) */}
      <button
        onClick={() => setShowHelp((prev) => !prev)}
        className="fixed bottom-6 right-6 w-10 h-10 rounded-full bg-[#a3cb53] hover:bg-[#8eb840] text-white flex items-center justify-center shadow-lg font-bold text-base transition active:scale-95 cursor-pointer z-20"
        title="Ajuda sobre Desafios"
      >
        <HelpCircle className="w-5 h-5" />
      </button>
    </div>
  );
};

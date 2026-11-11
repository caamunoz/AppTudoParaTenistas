import React from 'react';
import { motion } from 'motion/react';
import { X, Trophy } from 'lucide-react';
import { BracketMatch } from '../../types/tennisRankings';

interface TournamentBracketsModalProps {
  tournamentTitle?: string;
  matches: BracketMatch[];
  onClose: () => void;
}

export const TournamentBracketsModal: React.FC<TournamentBracketsModalProps> = ({
  tournamentTitle = 'Amigos do Tenis',
  matches,
  onClose,
}) => {
  const r16Matches = matches.filter((m) => m.round === 'r16');
  const quarterMatches = matches.filter((m) => m.round === 'quarters');
  const semiMatches = matches.filter((m) => m.round === 'semis');
  const finalMatch = matches.find((m) => m.round === 'final');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-1 sm:p-2 bg-black/70 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="w-full max-w-[430px] h-[92vh] max-h-[860px] bg-[#0074c7] rounded-[32px] overflow-hidden flex flex-col shadow-2xl border-4 border-slate-800"
      >
        {/* Android Status Bar */}
        <div className="w-full bg-[#0074c7] px-4 pt-1.5 pb-1 flex justify-between items-center text-white text-[11px] font-medium tracking-tight">
          <div className="flex items-center gap-1.5">
            <span>15:42</span>
            <span className="text-[10px]">💬</span>
            <span className="text-[10px]">📍</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px]">📶</span>
            <span className="text-[10px]">🔋</span>
          </div>
        </div>

        {/* Top App Bar - "Chaves" com botão (X) à direita exatamente como no print T_CHAVES */}
        <div className="w-full px-4 py-2.5 flex items-center justify-between text-white border-b border-white/10">
          <div className="w-7"></div>
          <h2 className="text-xl font-bold tracking-wide">Chaves</h2>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center hover:bg-white/20 transition cursor-pointer"
            title="Fechar Chaves"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Container Branco com as Chaves (Scroll Horizontal & Vertical para navegação completa) */}
        <div className="flex-1 m-2 mt-1 bg-white rounded-2xl shadow-inner p-3 overflow-auto">
          <div className="min-w-[620px] py-2 flex flex-col">
            <div className="text-center mb-3">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                {tournamentTitle} • Chave Eliminatória Simples
              </span>
            </div>

            {/* Grid das Rodadas de Chave */}
            <div className="grid grid-cols-4 gap-4 items-center">
              {/* Coluna 1: Oitavas de Final (8 confrontos) */}
              <div className="flex flex-col justify-around gap-2.5">
                <div className="text-[10px] font-bold text-slate-400 uppercase text-center pb-1">
                  Oitavas
                </div>
                {r16Matches.map((m) => (
                  <div
                    key={m.id}
                    className="bg-slate-100/90 rounded border border-slate-200 overflow-hidden shadow-2xs text-[10px]"
                  >
                    <div className="flex items-center justify-between px-1.5 py-0.5 border-b border-slate-200">
                      <div className="flex items-center gap-1 overflow-hidden">
                        <span
                          className={`w-1 h-3 rounded-xs ${
                            m.player1.isWinner ? 'bg-emerald-500' : 'bg-red-400'
                          }`}
                        />
                        <span className="truncate max-w-[85px] font-medium text-slate-800">
                          {m.player1.name}
                        </span>
                      </div>
                      <span className="w-4 text-center font-bold text-slate-700 bg-white rounded-xs">
                        {m.player1.score ?? '-'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between px-1.5 py-0.5">
                      <div className="flex items-center gap-1 overflow-hidden">
                        <span
                          className={`w-1 h-3 rounded-xs ${
                            m.player2.isWinner ? 'bg-emerald-500' : 'bg-red-400'
                          }`}
                        />
                        <span className="truncate max-w-[85px] font-medium text-slate-800">
                          {m.player2.name}
                        </span>
                      </div>
                      <span className="w-4 text-center font-bold text-slate-700 bg-white rounded-xs">
                        {m.player2.score ?? '-'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coluna 2: Quartas de Final (4 confrontos) */}
              <div className="flex flex-col justify-around gap-8">
                <div className="text-[10px] font-bold text-slate-400 uppercase text-center pb-1">
                  Quartas
                </div>
                {quarterMatches.map((m) => (
                  <div
                    key={m.id}
                    className="bg-slate-100/90 rounded border border-slate-200 overflow-hidden shadow-2xs text-[10px]"
                  >
                    <div className="text-[9px] px-1 text-slate-400 font-semibold bg-slate-50 border-b border-slate-200">
                      Jogo ID: {m.id}
                    </div>
                    <div className="flex items-center justify-between px-1.5 py-0.5 border-b border-slate-200">
                      <div className="flex items-center gap-1 overflow-hidden">
                        <span
                          className={`w-1 h-3 rounded-xs ${
                            m.player1.isWinner ? 'bg-emerald-500' : 'bg-red-400'
                          }`}
                        />
                        <span className="truncate max-w-[85px] font-medium text-slate-800">
                          {m.player1.name}
                        </span>
                      </div>
                      <span className="w-4 text-center font-bold text-slate-700 bg-white rounded-xs">
                        {m.player1.score ?? '-'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between px-1.5 py-0.5">
                      <div className="flex items-center gap-1 overflow-hidden">
                        <span
                          className={`w-1 h-3 rounded-xs ${
                            m.player2.isWinner ? 'bg-emerald-500' : 'bg-red-400'
                          }`}
                        />
                        <span className="truncate max-w-[85px] font-medium text-slate-800">
                          {m.player2.name}
                        </span>
                      </div>
                      <span className="w-4 text-center font-bold text-slate-700 bg-white rounded-xs">
                        {m.player2.score ?? '-'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coluna 3: Semifinais (2 confrontos) */}
              <div className="flex flex-col justify-around gap-20">
                <div className="text-[10px] font-bold text-slate-400 uppercase text-center pb-1">
                  Semifinais
                </div>
                {semiMatches.map((m) => (
                  <div
                    key={m.id}
                    className="bg-slate-100/90 rounded border border-slate-200 overflow-hidden shadow-2xs text-[10px]"
                  >
                    <div className="text-[9px] px-1 text-slate-400 font-semibold bg-slate-50 border-b border-slate-200">
                      Jogo ID: {m.id}
                    </div>
                    <div className="flex items-center justify-between px-1.5 py-0.5 border-b border-slate-200">
                      <div className="flex items-center gap-1 overflow-hidden">
                        <span
                          className={`w-1 h-3 rounded-xs ${
                            m.player1.isWinner ? 'bg-emerald-500' : 'bg-red-400'
                          }`}
                        />
                        <span className="truncate max-w-[85px] font-medium text-slate-800">
                          {m.player1.name}
                        </span>
                      </div>
                      <span className="w-4 text-center font-bold text-slate-700 bg-white rounded-xs">
                        {m.player1.score ?? '-'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between px-1.5 py-0.5">
                      <div className="flex items-center gap-1 overflow-hidden">
                        <span
                          className={`w-1 h-3 rounded-xs ${
                            m.player2.isWinner ? 'bg-emerald-500' : 'bg-red-400'
                          }`}
                        />
                        <span className="truncate max-w-[85px] font-medium text-slate-800">
                          {m.player2.name}
                        </span>
                      </div>
                      <span className="w-4 text-center font-bold text-slate-700 bg-white rounded-xs">
                        {m.player2.score ?? '-'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coluna 4: Grande Final (1 confronto) */}
              <div className="flex flex-col justify-center">
                <div className="text-[10px] font-bold text-amber-600 uppercase text-center pb-1 flex items-center justify-center gap-1">
                  <Trophy className="w-3 h-3 text-amber-500" /> Final
                </div>
                {finalMatch && (
                  <div className="bg-amber-50/70 rounded-lg border-2 border-amber-300 overflow-hidden shadow-md text-[11px]">
                    <div className="text-[9px] px-2 py-0.5 text-amber-800 font-bold bg-amber-200/60 border-b border-amber-200 flex items-center justify-between">
                      <span>Jogo ID: {finalMatch.id}</span>
                      <span className="text-[8px] uppercase tracking-wider text-amber-900">
                        Campeão
                      </span>
                    </div>

                    {/* Vencedor com Troféu Dourado */}
                    <div className="flex items-center justify-between px-2 py-1.5 bg-emerald-50/80 border-b border-amber-200">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-4 bg-emerald-500 rounded-xs" />
                        <span className="font-bold text-slate-900 flex items-center gap-1">
                          {finalMatch.player1.name}
                          <span className="text-amber-500">🏆</span>
                        </span>
                      </div>
                      <span className="w-5 py-0.5 text-center font-black text-emerald-800 bg-white rounded border border-emerald-300">
                        {finalMatch.player1.score}
                      </span>
                    </div>

                    {/* Vice-Campeão */}
                    <div className="flex items-center justify-between px-2 py-1.5">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-4 bg-red-400 rounded-xs" />
                        <span className="font-medium text-slate-700">
                          {finalMatch.player2.name}
                        </span>
                      </div>
                      <span className="w-5 py-0.5 text-center font-bold text-slate-600 bg-white rounded border border-slate-200">
                        {finalMatch.player2.score}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

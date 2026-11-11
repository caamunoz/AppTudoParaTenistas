import React from 'react';
import { Clock, Trophy, ArrowRight } from 'lucide-react';
import { EnrolledTournament } from '../../types/tennisRankings';

interface TorneiosTabProps {
  tournaments: EnrolledTournament[];
  onOpenBracket: (tournament: EnrolledTournament) => void;
  onExploreTournaments?: () => void;
}

export const TorneiosTab: React.FC<TorneiosTabProps> = ({
  tournaments,
  onOpenBracket,
  onExploreTournaments,
}) => {
  return (
    <div className="w-full flex-1 flex flex-col overflow-y-auto px-3 py-2">
      {/* Subtítulo exato do print S_ENTROU_TORNEIO */}
      <h3 className="text-center text-slate-700 text-sm font-medium mb-3">
        Torneios que você está participando
      </h3>

      {tournaments.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center bg-white rounded-2xl border border-slate-200">
          <Trophy className="w-12 h-12 text-slate-300 mb-2" />
          <h4 className="text-sm font-bold text-slate-700">Nenhum torneio ativo no momento</h4>
          <p className="text-xs text-slate-500 mt-1 max-w-[260px]">
            Inscreva-se em torneios na opção "Encontrar Torneios" ou ingresse através do código fornecido pelo clube.
          </p>
          {onExploreTournaments && (
            <button
              onClick={onExploreTournaments}
              className="mt-4 px-4 py-2 rounded-full bg-[#1d4ed8] text-white text-xs font-bold shadow-md hover:bg-[#1e40af] transition flex items-center gap-1.5 cursor-pointer"
            >
              Buscar Torneios Abertos
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {tournaments.map((tournament) => (
            <div
              key={tournament.id}
              className="w-full bg-white rounded-2xl border border-slate-200 shadow-md p-3 transition-all hover:shadow-lg"
            >
              {/* Linha de Cabeçalho do Card: Nome e Inscritos */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-800 tracking-wide uppercase">
                  TORNEIO: {tournament.name}
                </span>
                <span className="text-[11px] font-semibold text-slate-500 uppercase">
                  INSCRITOS: <strong className="text-slate-800">{tournament.registeredCount}</strong>
                </span>
              </div>

              {/* Conteúdo Principal do Card */}
              <div className="flex items-center justify-between gap-3 pt-3">
                {/* Foto da Quadra do Torneio */}
                <div className="w-24 h-20 rounded-xl overflow-hidden shrink-0 border border-slate-200 shadow-xs">
                  <img
                    src={tournament.photoUrl}
                    alt={tournament.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Dados Informativos: Admin, Data, Local, Obs */}
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

                {/* Coluna da Direita: Status "...disputando" e Ícone de Chaves */}
                <div className="flex flex-col items-center justify-between h-20 shrink-0 pl-1">
                  {/* Status ...disputando com relógio vermelho */}
                  <div className="flex flex-col items-center">
                    <Clock className="w-4 h-4 text-red-500" />
                    <span className="text-[10px] italic text-red-600 font-semibold mt-0.5">
                      ...disputando
                    </span>
                  </div>

                  {/* Ícone Chaveamento do Torneio (fiel ao ícone de chaves do print) */}
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
      )}
    </div>
  );
};

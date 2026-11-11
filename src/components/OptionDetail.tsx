import React from 'react';
import { ArrowLeft, Share2, Sparkles } from 'lucide-react';
import { TennisOption } from '../types/tennisMenu';
import { MenuIcon } from './MenuIcons';

interface OptionDetailProps {
  option: TennisOption;
  onBack: () => void;
}

export const OptionDetail: React.FC<OptionDetailProps> = ({ option, onBack }) => {
  return (
    <div className="w-full h-full flex flex-col bg-slate-50 text-slate-800 rounded-[26px] overflow-hidden">
      {/* Top Header com a cor do módulo */}
      <div
        className="px-4 py-3.5 flex items-center justify-between text-white shadow-sm"
        style={{ backgroundColor: option.color }}
      >
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="p-1 rounded-full hover:bg-white/20 transition-colors cursor-pointer"
            title="Voltar"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center p-1">
            <MenuIcon type={option.iconType} color="#ffffff" className="w-5 h-5" />
          </div>
          <h2 className="font-bold text-sm tracking-wide">
            {option.title.replace('\n', ' ')}
          </h2>
        </div>

        <button
          onClick={onBack}
          className="text-xs font-semibold bg-white/20 hover:bg-white/30 px-2.5 py-1 rounded-full transition-colors cursor-pointer"
        >
          Menu
        </button>
      </div>

      {/* Conteúdo do Módulo */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col items-center justify-center text-center">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center p-3 mb-4 shadow-sm"
          style={{ backgroundColor: `${option.color}20`, border: `2px solid ${option.color}40` }}
        >
          <MenuIcon type={option.iconType} color={option.color} className="w-10 h-10" />
        </div>

        <h3 className="text-lg font-bold text-slate-800 mb-1">
          {option.title.replace('\n', ' ')}
        </h3>

        <p className="text-xs text-slate-500 max-w-xs mb-6">
          Esta é a seção de <strong className="text-slate-700">{option.title.replace('\n', ' ')}</strong>. Conforme você enviar os prints específicos dessa tela antiga, ela será reconstruída exatamente com todos os seus recursos, listagens e filtros!
        </p>

        <div className="w-full max-w-xs bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs text-left mb-6">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 text-xs">
            <span className="font-semibold text-slate-600">Status do Módulo</span>
            <span
              className="px-2 py-0.5 rounded-full text-[10px] font-bold text-white"
              style={{ backgroundColor: option.color }}
            >
              Mapeado no Menu
            </span>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Pode enviar os prints correspondentes a esta seção para visualizarmos a interface original de formulários, listas, placar ou torneios.
          </p>
        </div>

        <button
          onClick={onBack}
          className="px-5 py-2.5 rounded-xl font-bold text-xs text-white shadow-md transition hover:opacity-90 cursor-pointer"
          style={{ backgroundColor: option.color }}
        >
          Voltar ao Menu Principal
        </button>
      </div>
    </div>
  );
};

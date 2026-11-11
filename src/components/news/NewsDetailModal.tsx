import React from 'react';
import { ArrowLeft, Share2, ExternalLink, Bookmark, Clock, User, Tag } from 'lucide-react';
import { TennisNewsArticle } from '../../types/tennisNews';

interface NewsDetailModalProps {
  article: TennisNewsArticle;
  onClose: () => void;
}

export const NewsDetailModal: React.FC<NewsDetailModalProps> = ({ article, onClose }) => {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.lead,
        url: window.location.href,
      }).catch(() => {});
    }
  };

  return (
    <div className="absolute inset-0 z-50 bg-white flex flex-col text-slate-800 select-none overflow-hidden font-sans">
      {/* Top App Bar */}
      <div className="bg-[#0074c7] px-4 py-3 flex items-center justify-between text-white shadow-md">
        <div className="flex items-center gap-2">
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/20 transition cursor-pointer"
            title="Voltar às Notícias"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <span className="text-xs font-bold tracking-wide uppercase bg-white/20 px-2.5 py-0.5 rounded-full">
            {article.source}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="p-1.5 rounded-full hover:bg-white/20 transition text-white cursor-pointer"
            title="Compartilhar Notícia"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Conteúdo com Rolagem da Notícia */}
      <div className="flex-1 overflow-y-auto">
        {/* Imagem de Capa */}
        <div className="w-full h-48 sm:h-56 relative bg-slate-100 overflow-hidden">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-3 left-4 right-4 text-white">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-[#0074c7] px-2 py-0.5 rounded shadow-sm">
              {article.category}
            </span>
          </div>
        </div>

        {/* Corpo da Notícia */}
        <div className="p-5 space-y-4">
          {/* Título Principal */}
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
            {article.title}
          </h1>

          {/* Metadados: Data, Horário e Autor */}
          <div className="flex flex-wrap items-center gap-3 py-2 border-y border-slate-100 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{article.date} às {article.time}</span>
            </span>
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-slate-400" />
              <span>Por {article.author}</span>
            </span>
          </div>

          {/* Lead / Resumo em Destaque */}
          <div className="bg-slate-50 border-l-4 border-[#0074c7] p-3 rounded-r-xl">
            <p className="text-sm font-semibold text-slate-700 italic leading-snug">
              {article.lead}
            </p>
          </div>

          {/* Parágrafos da Notícia */}
          <div className="space-y-3.5 text-sm text-slate-700 leading-relaxed">
            {article.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          {/* Tags */}
          <div className="pt-3 border-t border-slate-100">
            <div className="flex items-center gap-2 flex-wrap">
              <Tag className="w-3.5 h-3.5 text-slate-400" />
              {article.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-[11px] bg-slate-100 hover:bg-slate-200 text-slate-600 px-2.5 py-1 rounded-full font-medium transition cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Fonte / Créditos API */}
          <div className="bg-blue-50 border border-blue-200/80 rounded-xl p-3.5 flex items-center justify-between text-xs text-blue-900">
            <div>
              <p className="font-bold">Notícia fornecida via API esportiva</p>
              <p className="text-[11px] text-blue-700">Fonte original: {article.source}</p>
            </div>
            {article.sourceUrl && (
              <a
                href={article.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 font-bold text-[#0074c7] hover:underline"
              >
                <span>Ver no site</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Botão no Rodapé */}
      <div className="p-3 bg-slate-50 border-t border-slate-200 flex justify-center">
        <button
          onClick={onClose}
          className="w-full max-w-xs py-2.5 rounded-xl bg-[#0074c7] hover:bg-[#0065ad] text-white font-bold text-xs uppercase transition shadow cursor-pointer"
        >
          Voltar às Notícias
        </button>
      </div>
    </div>
  );
};

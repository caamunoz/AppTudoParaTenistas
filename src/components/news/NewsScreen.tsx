import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, RefreshCw, Bell } from 'lucide-react';
import { INITIAL_NEWS } from '../../data/mockTennisNews';
import { TennisNewsArticle } from '../../types/tennisNews';
import { NewsDetailModal } from './NewsDetailModal';
import { NotificationsModal } from '../common/NotificationsModal';
import { HomeTennisBallButton } from '../common/HomeTennisBallButton';

interface NewsScreenProps {
  onBackToMenu: () => void;
  onToggleDrawer?: () => void;
}

export const NewsScreen: React.FC<NewsScreenProps> = ({
  onBackToMenu,
  onToggleDrawer,
}) => {
  const [newsList, setNewsList] = useState<TennisNewsArticle[]>(INITIAL_NEWS);
  const [selectedArticle, setSelectedArticle] = useState<TennisNewsArticle | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);

  const categories = ['Todas', 'ATP', 'WTA', 'Rio Open', 'Circuito Brasileiro'];

  const filteredNews = newsList.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.lead.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'Todas' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="relative w-full h-full flex flex-col bg-[#0074c7] select-none overflow-hidden font-sans">
      {/* Android Status Bar Idêntica ao Print */}
      <div className="w-full bg-[#0074c7] px-3.5 pt-1.5 pb-1 flex justify-between items-center text-white text-[11px] font-medium tracking-tight">
        <div className="flex items-center gap-1.5">
          <span>15.42</span>
          <div className="w-2.5 h-2.5 rounded-full border border-white flex items-center justify-center text-[7px]"></div>
          <div className="w-2.5 h-2.5 rounded-full border border-white"></div>
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

      {/* App Bar Principal */}
      <div className="w-full bg-[#0074c7] px-4 py-2.5 flex items-center justify-between">
        {/* Hamburguer Icon Amarelo */}
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
        <h1 className="text-white font-medium text-[18px] tracking-wide text-center">
          Notícias
        </h1>

        {/* Sino com Badge de Notificação + Bolinha de Tênis Verde */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsNotificationsOpen(true)}
            className="relative p-1.5 text-white hover:bg-white/15 rounded-full transition cursor-pointer"
            title="Notificações e Avisos"
          >
            <Bell className="w-5 h-5 fill-white/20 stroke-[2.2]" />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white font-black text-[9px] rounded-full flex items-center justify-center border-2 border-[#0074c7] shadow-sm animate-pulse">
              3
            </span>
          </button>

          <HomeTennisBallButton onClick={onBackToMenu} className="w-7 h-7" />
        </div>
      </div>

      {/* Card Branco Central com a Lista de Notícias */}
      <div className="flex-1 p-2 pt-0 pb-2.5 flex flex-col overflow-hidden bg-gradient-to-b from-[#0074c7] to-[#0094f7]">
        <div className="w-full h-full bg-white rounded-[24px] shadow-sm overflow-hidden flex flex-col relative">
          
          {/* Barra de Filtro de Categorias Sutil */}
          <div className="px-3 pt-2.5 pb-1.5 border-b border-slate-100 flex items-center gap-1.5 overflow-x-auto bg-slate-50/70">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#0074c7] text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-200/70'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Lista de Notícias (Exata ao Print 7_NOTICIAS) */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {filteredNews.map((article) => (
              <div
                key={article.id}
                onClick={() => setSelectedArticle(article)}
                className="p-3.5 flex gap-3.5 items-start hover:bg-slate-50 transition cursor-pointer group"
              >
                {/* Imagem Retangular à Esquerda */}
                <div className="w-[72px] h-[72px] rounded-sm overflow-hidden bg-slate-100 shrink-0 border border-slate-200/60 shadow-xs">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>

                {/* Texto da Notícia à Direita */}
                <div className="flex-1 flex flex-col justify-between min-h-[72px]">
                  {/* Título em Azul Característico do Print */}
                  <h3 className="text-[13px] font-medium leading-[18px] text-[#0064a8] group-hover:text-[#004e85] transition-colors line-clamp-3">
                    {article.title}
                  </h3>

                  {/* Data e Hora em Cinza */}
                  <div className="mt-1 flex items-center justify-between text-[11px] text-[#9a9a9a]">
                    <span>
                      {article.date} &nbsp; {article.time}
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                      Ler &rarr;
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Rodapé Informativo */}
          <div className="w-full bg-slate-50 px-3 py-2 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-500">
            <span>Fontes: ESPN Tênis &bull; TênisNews</span>
            <button
              onClick={() => {
                setNewsList(INITIAL_NEWS);
                setSelectedCategory('Todas');
              }}
              className="text-[#0074c7] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Atualizar feed</span>
            </button>
          </div>

          {/* Modal de Notícia Completa ao Clicar */}
          <AnimatePresence>
            {selectedArticle && (
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                className="absolute inset-0 z-50"
              >
                <NewsDetailModal
                  article={selectedArticle}
                  onClose={() => setSelectedArticle(null)}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Modal de Notificações com Badge */}
          {isNotificationsOpen && (
            <NotificationsModal onClose={() => setIsNotificationsOpen(false)} />
          )}
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Download, Share2, PlusSquare, X, CheckCircle2 } from 'lucide-react';
import { usePWAInstall } from '../../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  variant?: 'button' | 'menu-item' | 'banner';
  className?: string;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  variant = 'button',
  className = '',
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSModal, setShowIOSModal] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);

  // Se já está instalado e rodando em modo standalone, oculta o botão
  if (isInstalled) {
    return null;
  }

  const handleInstallClick = async () => {
    if (isInstallable) {
      setIsInstalling(true);
      try {
        await install();
      } finally {
        setIsInstalling(false);
      }
    } else if (isIOS) {
      setShowIOSModal(true);
    } else {
      // Instrução padrão se o navegador ainda não disparou beforeinstallprompt
      setShowIOSModal(true);
    }
  };

  return (
    <>
      {variant === 'menu-item' ? (
        <button
          onClick={handleInstallClick}
          disabled={isInstalling}
          className={`w-full px-3 py-2.5 rounded-xl bg-linear-to-r from-emerald-600/20 to-teal-600/20 border border-emerald-500/40 hover:bg-emerald-600/30 transition-colors flex items-center justify-between text-xs font-semibold text-emerald-300 ${className}`}
        >
          <div className="flex items-center gap-3">
            <Download className="w-4 h-4 text-emerald-400" />
            <span>Instalar Aplicativo (PWA)</span>
          </div>
          <span className="text-[10px] bg-emerald-500 text-slate-900 px-1.5 py-0.5 rounded-full font-bold">
            Grátis
          </span>
        </button>
      ) : variant === 'banner' ? (
        <div
          className={`bg-linear-to-r from-blue-700 to-indigo-800 text-white px-3 py-2 rounded-xl shadow-lg border border-blue-400/30 flex items-center justify-between gap-2 text-xs ${className}`}
        >
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-white/20 p-1 flex items-center justify-center shrink-0">
              <img
                src="/pwa-192x192.png"
                alt="App Icon"
                className="w-full h-full object-contain rounded-sm"
              />
            </div>
            <div>
              <p className="font-bold leading-tight">Instale no seu Celular</p>
              <p className="text-[10px] text-blue-200">Abra em tela cheia sem barras</p>
            </div>
          </div>
          <button
            onClick={handleInstallClick}
            className="bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold px-3 py-1 rounded-lg text-xs shadow transition active:scale-95 whitespace-nowrap cursor-pointer"
          >
            Instalar
          </button>
        </div>
      ) : (
        <button
          onClick={handleInstallClick}
          disabled={isInstalling}
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition active:scale-95 cursor-pointer ${className}`}
          title="Instalar no celular ou computador"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Instalar PWA</span>
        </button>
      )}

      {/* Modal de Instruções para iOS / Safari ou Navegadores Manuais */}
      {showIOSModal && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4 animate-fade-in">
          <div className="w-full max-w-sm rounded-2xl bg-slate-900 border border-slate-700 p-5 text-slate-100 shadow-2xl relative">
            <button
              onClick={() => setShowIOSModal(false)}
              className="absolute top-3 right-3 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#0074c7] p-1.5 flex items-center justify-center shadow-md">
                <img
                  src="/pwa-192x192.png"
                  alt="Tudo Para Tenistas"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Instalar Tudo Para Tenistas</h3>
                <p className="text-xs text-slate-400">Direto na tela inicial do seu aparelho</p>
              </div>
            </div>

            <div className="space-y-3 text-xs bg-slate-800/70 p-3.5 rounded-xl border border-slate-700/60">
              <p className="font-semibold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                Vantagens do PWA:
              </p>
              <ul className="list-disc list-inside text-slate-300 space-y-1 pl-1">
                <li>Tela cheia sem a barra de endereços do navegador</li>
                <li>Acesso rápido com 1 toque na sua tela inicial</li>
                <li>Carregamento ultrarrápido com dados salvos em cache</li>
              </ul>
            </div>

            <div className="mt-4 space-y-2 text-xs text-slate-300">
              <p className="font-semibold text-white">Como instalar no iPhone / iPad:</p>
              <div className="flex items-start gap-2 bg-slate-800/50 p-2 rounded-lg">
                <span className="font-bold text-emerald-400">1.</span>
                <span>
                  No Safari, toque no botão <strong>Compartilhar</strong> (<Share2 className="w-3.5 h-3.5 inline mx-0.5 text-blue-400" /> na barra inferior).
                </span>
              </div>
              <div className="flex items-start gap-2 bg-slate-800/50 p-2 rounded-lg">
                <span className="font-bold text-emerald-400">2.</span>
                <span>
                  Role a lista e selecione <strong>Adicionar à Tela de Início</strong> (<PlusSquare className="w-3.5 h-3.5 inline mx-0.5 text-emerald-400" />).
                </span>
              </div>
              <div className="flex items-start gap-2 bg-slate-800/50 p-2 rounded-lg">
                <span className="font-bold text-emerald-400">3.</span>
                <span>
                  Toque em <strong>Adicionar</strong> no canto superior direito para concluir.
                </span>
              </div>
            </div>

            <button
              onClick={() => setShowIOSModal(false)}
              className="mt-5 w-full rounded-xl bg-blue-600 hover:bg-blue-500 py-2.5 text-xs font-bold text-white transition active:scale-95 shadow-md cursor-pointer"
            >
              Entendi, fechar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

import React, { useState } from 'react';
import { Sparkles, Copy, Check, ArrowRight, Zap } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const MarqueeBanner: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const { addToast } = useStore();

  const copyCoupon = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    addToast({
      type: 'success',
      title: '¡Código copiado al portapapeles!',
      description: `Usa ${code} al finalizar tu compra para obtener un 20% de descuento.`,
    });
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-violet-950 via-slate-900 to-teal-950 border-b border-white/10 text-xs py-2 text-slate-200 select-none">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4">
        {/* Left Badge */}
        <div className="hidden md:flex items-center gap-2 text-brand-400 font-medium tracking-wide">
          <Zap className="w-3.5 h-3.5 text-brand-400 animate-pulse" />
          <span className="uppercase tracking-wider text-[11px] font-bold">AURA CLOUD STORE</span>
          <span className="text-white/20">|</span>
          <span className="text-slate-300">Arquitectura Headless Next-Gen</span>
        </div>

        {/* Center Promotion Ticker */}
        <div className="flex items-center gap-3 mx-auto md:mx-0">
          <span className="flex items-center gap-1.5 text-amber-300 font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            20% OFF de Inauguración
          </span>
          <span className="hidden sm:inline text-slate-400">•</span>
          <button
            onClick={() => copyCoupon('MODERNA20')}
            className="group inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-all cursor-pointer font-mono text-[11px] text-white"
          >
            <span>Cupón:</span>
            <span className="font-bold text-brand-300 tracking-wider">MODERNA20</span>
            {copied ? (
              <Check className="w-3 h-3 text-emerald-400" />
            ) : (
              <Copy className="w-3 h-3 text-slate-400 group-hover:text-white transition-colors" />
            )}
          </button>
        </div>

        {/* Right Info */}
        <div className="hidden lg:flex items-center gap-3 text-slate-300">
          <span className="text-emerald-400 font-medium">⚡ 3 y 6 Cuotas Sin Interés</span>
          <span className="text-white/20">•</span>
          <span>Envíos gratis a todo el país desde $250.000</span>
        </div>
      </div>
    </div>
  );
};

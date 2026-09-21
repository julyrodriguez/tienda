import React, { useState } from 'react';
import { Sparkles, Copy, Check, Zap } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const MarqueeBanner: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const { settings, formatPrice, addToast } = useStore();

  const couponCode = (settings.announcementCoupon || 'MODERNA20').trim();

  const copyCoupon = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    addToast({
      type: 'success',
      title: '¡Cupón copiado!',
      description: `Usa ${code} al finalizar para ${settings.announcementDiscount || 20}% OFF.`,
    });
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="relative overflow-hidden bg-[#F4ECE0] border-b border-[#E8E1D5] text-xs py-2 text-[#44403C] select-none">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-3 sm:px-6">
        {/* Left Badge - Desktop */}
        <div className="hidden md:flex items-center gap-2 text-[#78350F] font-medium tracking-wide">
          <Zap className="w-3.5 h-3.5 text-[#C25E38] animate-pulse" />
          <span className="uppercase tracking-wider text-[11px] font-bold">{settings.storeName} STUDIO</span>
          <span className="text-[#D8D0C5]">|</span>
          <span className="text-[#57534E]">{settings.storeTagline}</span>
        </div>

        {/* Center Promotion Ticker */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mx-auto md:mx-0 text-center w-full md:w-auto">
          <span className="flex items-center gap-1.5 text-[#9A6B3D] font-bold text-[11px] sm:text-xs">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#C25E38]" />
            {settings.announcementText}
          </span>
          <span className="text-[#D8D0C5]">•</span>
          <button
            onClick={() => copyCoupon(couponCode)}
            className="group inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/80 hover:bg-white border border-[#D8D0C5] transition-all cursor-pointer font-mono text-[11px] text-[#1C1917] shadow-xs"
          >
            <span className="text-[#78716C] text-[10px]">CUPÓN:</span>
            <span className="font-bold text-[#C25E38] tracking-wider">{couponCode}</span>
            {copied ? (
              <Check className="w-3 h-3 text-[#0F766E]" />
            ) : (
              <Copy className="w-3 h-3 text-[#A8A29E] group-hover:text-[#1C1917] transition-colors" />
            )}
          </button>
        </div>

        {/* Right Info - Desktop */}
        <div className="hidden lg:flex items-center gap-3 text-[#57534E] text-xs">
          <span className="text-[#0F766E] font-bold">3 & 6 Cuotas Sin Interés</span>
          <span className="text-[#D8D0C5]">•</span>
          <span>Envío gratis desde {formatPrice(settings.freeShippingThreshold)}</span>
        </div>
      </div>
    </div>
  );
};

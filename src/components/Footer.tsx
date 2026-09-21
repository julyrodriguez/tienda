import React, { useState } from 'react';
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  Send,
  Lock,
  Scale,
  FileText,
  AlertCircle,
  ExternalLink,
  QrCode
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CategoryFilter } from '../types/store';
import { TIENDA_API } from '../config/api';

export const Footer: React.FC = () => {
  const {
    settings,
    addToast,
    setIsLegalModalOpen,
    setLegalTab,
    setCurrentView,
    setSelectedCategory
  } = useStore();
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@') || isSubscribing) return;

    setIsSubscribing(true);
    try {
      const res = await fetch(TIENDA_API.newsletter, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();
      if (data.success) {
        addToast({
          type: 'success',
          title: '¡Suscripción confirmada! 🎁',
          description: `Te enviamos el cupón ${data.coupon || 'AURA10'} a ${email.trim()}`,
        });
        setEmail('');
      } else {
        addToast({
          type: 'error',
          title: 'Error al suscribirse',
          description: data.error || 'Por favor intenta nuevamente.',
        });
      }
    } catch (err) {
      addToast({
        type: 'success',
        title: '¡Suscripción confirmada!',
        description: `Te enviamos el cupón de 10% OFF a ${email.trim()}`,
      });
      setEmail('');
    } finally {
      setIsSubscribing(false);
    }
  };

  const openLegal = (tab: 'terms' | 'privacy' | 'consumer' | 'regret') => {
    setLegalTab(tab);
    setIsLegalModalOpen(true);
  };

  const navigateCategory = (cat: CategoryFilter) => {
    setSelectedCategory(cat);
    setCurrentView('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#F4ECE0] border-t border-[#E8E1D5] text-[#57534E] text-xs overflow-hidden">
      {/* Upper features strip */}
      <div className="border-b border-[#E8E1D5] py-6 sm:py-10 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          <div className="flex items-center gap-3 p-3 sm:p-4 rounded-2xl bg-[#FFFFFF] border border-[#E8E1D5] shadow-xs">
            <div className="p-2 sm:p-2.5 rounded-xl bg-[#FAF7F2] text-[#0F766E] border border-[#E8E1D5]">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-[#1C1917] text-xs sm:text-sm">Envíos a Todo el País</h4>
              <p className="text-[#78716C] text-[11px]">Gratis en compras desde $250.000</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 sm:p-4 rounded-2xl bg-[#FFFFFF] border border-[#E8E1D5] shadow-xs">
            <div className="p-2 sm:p-2.5 rounded-xl bg-[#FAF7F2] text-[#78350F] border border-[#E8E1D5]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-[#1C1917] text-xs sm:text-sm">Garantía Oficial 2 Años</h4>
              <p className="text-[#78716C] text-[11px]">Cobertura directa con repuestos originales</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 sm:p-4 rounded-2xl bg-[#FFFFFF] border border-[#E8E1D5] shadow-xs">
            <div className="p-2 sm:p-2.5 rounded-xl bg-[#FAF7F2] text-[#C25E38] border border-[#E8E1D5]">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-[#1C1917] text-xs sm:text-sm">30 Días de Prueba</h4>
              <p className="text-[#78716C] text-[11px]">Cambio inmediato o devolución sin costo</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 sm:p-4 rounded-2xl bg-[#FFFFFF] border border-[#E8E1D5] shadow-xs">
            <div className="p-2 sm:p-2.5 rounded-xl bg-[#FAF7F2] text-[#0284C7] border border-[#E8E1D5]">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-[#1C1917] text-xs sm:text-sm">Soporte Humano 24/7</h4>
              <p className="text-[#78716C] text-[11px]">Atención vía WhatsApp y correo</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10">
        
        {/* Brand Col */}
        <div className="lg:col-span-2 space-y-3 sm:space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#1C1917] flex items-center justify-center text-[#FAF7F2] font-black text-lg">
              {settings.storeName.charAt(0)}
            </div>
            <span className="font-display font-extrabold text-xl sm:text-2xl text-[#1C1917]">
              {settings.storeName}<span className="text-[#C25E38]">.</span>
            </span>
          </div>

          <p className="text-xs text-[#78716C] leading-relaxed max-w-sm">
            {settings.storeTagline}
          </p>

          {/* Newsletter */}
          <form onSubmit={handleSubscribe} className="pt-2 max-w-sm">
            <label className="text-[11px] font-bold text-[#1C1917] block mb-1.5 uppercase tracking-wider">
              Acceso a Drops Exclusivos & Promociones:
            </label>
            <div className="flex gap-2">
              <input
                type="email"
                required
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-[#FFFFFF] border border-[#E8E1D5] rounded-xl px-3.5 py-2 text-xs text-[#1C1917] placeholder-[#A8A29E] focus:outline-none focus:border-[#BA9971]"
              />
              <button
                type="submit"
                disabled={isSubscribing}
                className="px-4 py-2 rounded-xl bg-[#1C1917] hover:bg-[#292524] text-[#FAF7F2] font-bold text-xs transition-colors cursor-pointer flex items-center gap-1.5 shrink-0 disabled:opacity-50"
              >
                <span>{isSubscribing ? 'Enviando...' : 'Suscribirme'}</span>
                <Send className="w-3.5 h-3.5 text-[#DEC9AE]" />
              </button>
            </div>
          </form>
        </div>

        {/* Col 2: Categories */}
        <div className="space-y-2.5 sm:space-y-3">
          <h4 className="font-bold text-[#1C1917] text-xs uppercase tracking-wider">Ecosistemas</h4>
          <ul className="space-y-2 text-[#78716C]">
            <li>
              <button onClick={() => navigateCategory('all')} className="hover:text-[#1C1917] transition-colors cursor-pointer text-left">
                Ver Catálogo Completo
              </button>
            </li>
            <li>
              <button onClick={() => navigateCategory('audio')} className="hover:text-[#1C1917] transition-colors cursor-pointer text-left">
                Audio Hi-Fi & ANC
              </button>
            </li>
            <li>
              <button onClick={() => navigateCategory('wearables')} className="hover:text-[#1C1917] transition-colors cursor-pointer text-left">
                Smart Watches & Rings
              </button>
            </li>
            <li>
              <button onClick={() => navigateCategory('gaming')} className="hover:text-[#1C1917] transition-colors cursor-pointer text-left">
                Teclados Custom & Gaming
              </button>
            </li>
            <li>
              <button onClick={() => navigateCategory('workstation')} className="hover:text-[#1C1917] transition-colors cursor-pointer text-left">
                Docks & Productividad
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Legal & Consumer Protection (Argentine E-commerce Standards) */}
        <div className="space-y-2.5 sm:space-y-3">
          <h4 className="font-bold text-[#1C1917] text-xs uppercase tracking-wider">Soporte Legal</h4>
          <ul className="space-y-2 text-[#78716C]">
            <li>
              <button
                onClick={() => openLegal('terms')}
                className="hover:text-[#1C1917] transition-colors flex items-center gap-1.5 cursor-pointer text-left"
              >
                <FileText className="w-3.5 h-3.5 text-[#C25E38]" />
                <span>Términos y Condiciones</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => openLegal('privacy')}
                className="hover:text-[#1C1917] transition-colors flex items-center gap-1.5 cursor-pointer text-left"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#0F766E]" />
                <span>Políticas de Privacidad</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => openLegal('consumer')}
                className="hover:text-[#1C1917] transition-colors flex items-center gap-1.5 cursor-pointer text-left"
              >
                <Scale className="w-3.5 h-3.5 text-[#78350F]" />
                <span>Defensa del Consumidor</span>
              </button>
            </li>
            
            {/* Regulatory Arrepentimiento Button (Res. 424/2020) */}
            <li className="pt-1">
              <button
                onClick={() => openLegal('regret')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FFFFFF] border border-[#DEC9AE] text-[#C25E38] hover:bg-[#FAF7F2] font-bold text-[11px] shadow-xs cursor-pointer transition-colors"
                title="Botón de Arrepentimiento reglamentario según Resolución 424/2020"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Botón de Arrepentimiento</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Col 4: Payments & Data Fiscal */}
        <div className="space-y-2.5 sm:space-y-3">
          <h4 className="font-bold text-[#1C1917] text-xs uppercase tracking-wider">Medios de Pago & Seguridad</h4>
          <p className="text-[11px] text-[#78716C]">
            Aceptamos Mercado Pago, tarjetas de débito/crédito bancarias y transferencias con descuento.
          </p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            <span className="px-2 py-1 rounded-lg bg-[#FFFFFF] border border-[#E8E1D5] text-[10px] font-bold text-[#1C1917]">Mercado Pago</span>
            <span className="px-2 py-1 rounded-lg bg-[#FFFFFF] border border-[#E8E1D5] text-[10px] font-bold text-[#1C1917]">Visa</span>
            <span className="px-2 py-1 rounded-lg bg-[#FFFFFF] border border-[#E8E1D5] text-[10px] font-bold text-[#1C1917]">Mastercard</span>
            <span className="px-2 py-1 rounded-lg bg-[#EADBC8] border border-[#DEC9AE] text-[10px] font-bold text-[#78350F]">Transferencia 15% OFF</span>
          </div>

          {/* AFIP / ARCA Data Fiscal Formulario 960/D Mockup */}
          <div className="pt-2 flex items-center gap-2.5 p-2 rounded-xl bg-[#FFFFFF] border border-[#E8E1D5]">
            <div className="p-1 rounded-lg bg-[#FAF7F2] border border-[#E8E1D5] text-[#1C1917]">
              <QrCode className="w-7 h-7" />
            </div>
            <div className="text-[10px] leading-tight text-[#78716C]">
              <p className="font-bold text-[#1C1917]">DATA FISCAL</p>
              <p>Formulario 960/D</p>
              <p className="text-[9px] text-[#0F766E] font-semibold">Comercio Verificado</p>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Legal bar (Clean without tech stack mentions) */}
      <div className="border-t border-[#E8E1D5] py-4 sm:py-6 bg-[#EADBC8]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#78716C] text-center sm:text-left">
          <p>© 2026 {settings.storeName}™ S.R.L. Todos los derechos reservados. Venta oficial y garantía directa de fábrica.</p>
          <div className="flex flex-wrap items-center justify-center gap-3 font-medium">
            <button onClick={() => openLegal('terms')} className="hover:text-[#1C1917] cursor-pointer">
              Términos
            </button>
            <span>•</span>
            <button onClick={() => openLegal('privacy')} className="hover:text-[#1C1917] cursor-pointer">
              Privacidad
            </button>
            <span>•</span>
            <button onClick={() => openLegal('consumer')} className="hover:text-[#1C1917] cursor-pointer">
              Defensa del Consumidor
            </button>
            <span>•</span>
            <button onClick={() => openLegal('regret')} className="hover:text-[#C25E38] text-[#C25E38] font-bold cursor-pointer">
              Arrepentimiento
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

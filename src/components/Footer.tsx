import React, { useState } from 'react';
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  Send,
  Lock,
  BookOpen,
  SlidersHorizontal
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Footer: React.FC = () => {
  const { addToast, setIsDocsOpen, setIsAdminOpen } = useStore();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;

    addToast({
      type: 'success',
      title: '¡Suscripción confirmada!',
      description: 'Te enviamos un cupón de 10% OFF para tu primera compra.',
    });
    setEmail('');
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
              <p className="text-[#78716C] text-[11px]">Gratis desde $250.000</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 sm:p-4 rounded-2xl bg-[#FFFFFF] border border-[#E8E1D5] shadow-xs">
            <div className="p-2 sm:p-2.5 rounded-xl bg-[#FAF7F2] text-[#78350F] border border-[#E8E1D5]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-[#1C1917] text-xs sm:text-sm">Garantía Oficial 2 Años</h4>
              <p className="text-[#78716C] text-[11px]">Cobertura directa de fábrica</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 sm:p-4 rounded-2xl bg-[#FFFFFF] border border-[#E8E1D5] shadow-xs">
            <div className="p-2 sm:p-2.5 rounded-xl bg-[#FAF7F2] text-[#C25E38] border border-[#E8E1D5]">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-[#1C1917] text-xs sm:text-sm">30 Días de Prueba</h4>
              <p className="text-[#78716C] text-[11px]">Devolución o cambio sin costo</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 sm:p-4 rounded-2xl bg-[#FFFFFF] border border-[#E8E1D5] shadow-xs">
            <div className="p-2 sm:p-2.5 rounded-xl bg-[#FAF7F2] text-[#0284C7] border border-[#E8E1D5]">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-[#1C1917] text-xs sm:text-sm">Soporte 24/7</h4>
              <p className="text-[#78716C] text-[11px]">Asistencia humana vía WhatsApp</p>
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
              A
            </div>
            <span className="font-display font-extrabold text-xl sm:text-2xl text-[#1C1917]">
              AURA<span className="text-[#C25E38]">.</span>
            </span>
          </div>

          <p className="text-xs text-[#78716C] leading-relaxed max-w-sm">
            E-commerce de diseño y tecnología contemporánea. Creado con arquitectura Headless para ofrecer la máxima velocidad, fluidez y estética minimalista.
          </p>

          {/* Newsletter */}
          <form onSubmit={handleSubscribe} className="pt-2 max-w-sm">
            <label className="text-[11px] font-bold text-[#1C1917] block mb-1.5 uppercase tracking-wider">
              Acceso a Novedades & Descuentos:
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
                className="px-4 py-2 rounded-xl bg-[#1C1917] hover:bg-[#292524] text-[#FAF7F2] font-bold text-xs transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>Unirme</span>
                <Send className="w-3.5 h-3.5 text-[#DEC9AE]" />
              </button>
            </div>
          </form>
        </div>

        {/* Col 2: Categories */}
        <div className="space-y-2.5 sm:space-y-3">
          <h4 className="font-bold text-[#1C1917] text-xs uppercase tracking-wider">Categorías</h4>
          <ul className="space-y-2 text-[#78716C]">
            <li><a href="#catalogo" className="hover:text-[#1C1917] transition-colors">Todos los Productos</a></li>
            <li><a href="#catalogo" className="hover:text-[#1C1917] transition-colors">Audio Hi-Fi</a></li>
            <li><a href="#catalogo" className="hover:text-[#1C1917] transition-colors">Smart Watches & Rings</a></li>
            <li><a href="#catalogo" className="hover:text-[#1C1917] transition-colors">Teclados Custom</a></li>
            <li><a href="#catalogo" className="hover:text-[#1C1917] transition-colors">Mochilas & Accesorios</a></li>
          </ul>
        </div>

        {/* Col 3: Admin & Tech */}
        <div className="space-y-2.5 sm:space-y-3">
          <h4 className="font-bold text-[#1C1917] text-xs uppercase tracking-wider">Herramientas</h4>
          <ul className="space-y-2 text-[#78716C]">
            <li>
              <button
                onClick={() => setIsDocsOpen(true)}
                className="hover:text-[#1C1917] transition-colors flex items-center gap-1.5 text-left"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#C25E38]" />
                <span>Doc Tiendanube</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setIsAdminOpen(true)}
                className="hover:text-[#1C1917] transition-colors flex items-center gap-1.5 text-left"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#C25E38]" />
                <span>Panel Admin Cloud</span>
              </button>
            </li>
            <li><span className="text-[#A8A29E]">API Nuvemshop v1</span></li>
            <li><span className="text-[#A8A29E]">Checkout Mercado Pago</span></li>
          </ul>
        </div>

        {/* Col 4: Payments */}
        <div className="space-y-2.5 sm:space-y-3">
          <h4 className="font-bold text-[#1C1917] text-xs uppercase tracking-wider">Medios de Pago</h4>
          <p className="text-[11px] text-[#78716C]">
            Aceptamos todas las tarjetas de crédito, débito y transferencias bancarias.
          </p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            <span className="px-2 py-1 rounded-lg bg-[#FFFFFF] border border-[#E8E1D5] text-[10px] font-bold text-[#1C1917]">Mercado Pago</span>
            <span className="px-2 py-1 rounded-lg bg-[#FFFFFF] border border-[#E8E1D5] text-[10px] font-bold text-[#1C1917]">Visa</span>
            <span className="px-2 py-1 rounded-lg bg-[#FFFFFF] border border-[#E8E1D5] text-[10px] font-bold text-[#1C1917]">Mastercard</span>
            <span className="px-2 py-1 rounded-lg bg-[#FFFFFF] border border-[#E8E1D5] text-[10px] font-bold text-[#1C1917]">MODO</span>
            <span className="px-2 py-1 rounded-lg bg-[#EADBC8] border border-[#DEC9AE] text-[10px] font-bold text-[#78350F]">Transferencia 15% OFF</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-[#0F766E] pt-1 font-semibold">
            <Lock className="w-3.5 h-3.5" />
            <span>Encriptación bancaria TLS 1.3 / SSL</span>
          </div>
        </div>

      </div>

      {/* Bottom Legal bar */}
      <div className="border-t border-[#E8E1D5] py-4 sm:py-6 bg-[#EADBC8]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#78716C] text-center sm:text-left">
          <p>© 2026 AURA™ Cloud Store. Todos los derechos reservados. Desarrollado con React 18, Vite y Framer Motion.</p>
          <div className="flex items-center justify-center gap-3">
            <span className="hover:text-[#1C1917] cursor-pointer">Términos</span>
            <span>•</span>
            <span className="hover:text-[#1C1917] cursor-pointer">Privacidad</span>
            <span>•</span>
            <span className="hover:text-[#1C1917] cursor-pointer">Defensa del Consumidor</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

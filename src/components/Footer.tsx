import React, { useState } from 'react';
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  Send,
  Sparkles,
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
      title: '¡Suscripción exitosa!',
      description: 'Recibirás acceso anticipado a nuestros drops y un cupón de 10% OFF.',
    });
    setEmail('');
  };

  return (
    <footer className="relative bg-[#06070B] border-t border-white/[0.08] text-slate-400 text-xs overflow-hidden">
      {/* Upper features strip */}
      <div className="border-b border-white/[0.06] py-10 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="p-3 rounded-xl bg-brand-500/10 text-brand-400">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Envíos a Todo el País</h4>
              <p className="text-slate-400 text-xs">Gratis en compras superiores a $250.000</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="p-3 rounded-xl bg-violet-500/10 text-violet-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Garantía Oficial 2 Años</h4>
              <p className="text-slate-400 text-xs">Cobertura total contra fallas de fábrica</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">30 Días de Devolución</h4>
              <p className="text-slate-400 text-xs">Prueba tu producto sin riesgos de compra</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Soporte Humano 24/7</h4>
              <p className="text-slate-400 text-xs">Asistencia por WhatsApp y videollamada</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        
        {/* Brand Col */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-600 to-teal-400 flex items-center justify-center text-slate-950 font-black text-lg">
              A
            </div>
            <span className="font-display font-extrabold text-2xl text-white">
              AURA<span className="text-brand-400">.</span>
            </span>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
            E-commerce de próxima generación creado para los entusiastas del diseño industrial, audio audiófilo y periféricos de alto desempeño.
          </p>

          {/* Newsletter input */}
          <form onSubmit={handleSubscribe} className="pt-2 max-w-sm">
            <label className="text-[11px] font-bold text-slate-300 block mb-1.5 uppercase tracking-wider">
              Accede a Drops Secretos & Descuentos:
            </label>
            <div className="flex gap-2">
              <input
                type="email"
                required
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-400"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>Unirme</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        </div>

        {/* Col 2: Navigation */}
        <div className="space-y-3">
          <h4 className="font-bold text-white text-xs uppercase tracking-wider">Ecosistema</h4>
          <ul className="space-y-2 text-slate-400">
            <li><a href="#catalogo" className="hover:text-white transition-colors">Catálogo Completo</a></li>
            <li><a href="#catalogo" className="hover:text-white transition-colors">Audio Hi-Fi Pro</a></li>
            <li><a href="#catalogo" className="hover:text-white transition-colors">Relojes & Smart Rings</a></li>
            <li><a href="#catalogo" className="hover:text-white transition-colors">Teclados Custom Hall Effect</a></li>
            <li><a href="#catalogo" className="hover:text-white transition-colors">Mochilas & EDC</a></li>
          </ul>
        </div>

        {/* Col 3: Architecture & Tools */}
        <div className="space-y-3">
          <h4 className="font-bold text-white text-xs uppercase tracking-wider">Herramientas Pro</h4>
          <ul className="space-y-2 text-slate-400">
            <li>
              <button
                onClick={() => setIsDocsOpen(true)}
                className="hover:text-brand-300 transition-colors flex items-center gap-1.5 text-left"
              >
                <BookOpen className="w-3.5 h-3.5 text-brand-400" />
                <span>Documentación Tiendanube</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setIsAdminOpen(true)}
                className="hover:text-brand-300 transition-colors flex items-center gap-1.5 text-left"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-brand-400" />
                <span>Consola Admin Cloud</span>
              </button>
            </li>
            <li><span className="text-slate-500">API Webhooks Nuvemshop v1</span></li>
            <li><span className="text-slate-500">Checkout Transparente MP</span></li>
          </ul>
        </div>

        {/* Col 4: Seguridad y Medios de Pago */}
        <div className="space-y-3">
          <h4 className="font-bold text-white text-xs uppercase tracking-wider">Medios de Pago & Seguridad</h4>
          <p className="text-[11px] text-slate-400">
            Aceptamos todas las tarjetas de crédito, débito y transferencias con acreditación inmediata.
          </p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-bold text-slate-300">Mercado Pago</span>
            <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-bold text-slate-300">Visa</span>
            <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-bold text-slate-300">Mastercard</span>
            <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-bold text-slate-300">MODO</span>
            <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-bold text-slate-300">Transferencia 15% OFF</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 pt-2 font-medium">
            <Lock className="w-3.5 h-3.5" />
            <span>Encriptación bancaria TLS 1.3 / SSL</span>
          </div>
        </div>

      </div>

      {/* Bottom Legal bar */}
      <div className="border-t border-white/[0.06] py-6 bg-black/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© 2026 AURA™ Cloud Store. Todos los derechos reservados. Desarrollado con estándar Headless React & Tailwind.</p>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">Términos de Servicio</span>
            <span>•</span>
            <span className="text-slate-400">Política de Privacidad</span>
            <span>•</span>
            <span className="text-slate-400">Defensa del Consumidor</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

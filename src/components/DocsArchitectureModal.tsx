import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  BookOpen,
  Server,
  Layers,
  Cpu,
  Database,
  ArrowRight,
  Code2,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Globe2
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const DocsArchitectureModal: React.FC = () => {
  const { isDocsOpen, setIsDocsOpen } = useStore();
  const [activeSection, setActiveSection] = useState<'tiendanube' | 'headless' | 'data-model' | 'checkout-pipeline'>('tiendanube');

  if (!isDocsOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsDocsOpen(false)}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative z-10 w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#0B0D16] border border-brand-500/40 shadow-2xl p-6 sm:p-8"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-brand-500/10 text-brand-400 border border-brand-500/30">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-display font-black text-2xl text-white">
                  Investigación y Arquitectura: Tiendanube vs Headless Web
                </h2>
                <p className="text-xs text-slate-400">
                  Análisis exhaustivo de documentación, flujo de datos, APIs y mejores prácticas 2026.
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsDocsOpen(false)}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Sub-tabs */}
          <div className="flex gap-2 pt-4 pb-6 border-b border-white/10 overflow-x-auto text-xs font-bold">
            <button
              onClick={() => setActiveSection('tiendanube')}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
                activeSection === 'tiendanube'
                  ? 'bg-brand-500 text-slate-950 font-black'
                  : 'bg-white/5 text-slate-300 hover:text-white'
              }`}
            >
              1. Ecosistema Tiendanube (Nuvemshop)
            </button>
            <button
              onClick={() => setActiveSection('headless')}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
                activeSection === 'headless'
                  ? 'bg-brand-500 text-slate-950 font-black'
                  : 'bg-white/5 text-slate-300 hover:text-white'
              }`}
            >
              2. Frontend Headless & Animaciones
            </button>
            <button
              onClick={() => setActiveSection('data-model')}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
                activeSection === 'data-model'
                  ? 'bg-brand-500 text-slate-950 font-black'
                  : 'bg-white/5 text-slate-300 hover:text-white'
              }`}
            >
              3. Modelo de Datos (Products & SKUs)
            </button>
            <button
              onClick={() => setActiveSection('checkout-pipeline')}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
                activeSection === 'checkout-pipeline'
                  ? 'bg-brand-500 text-slate-950 font-black'
                  : 'bg-white/5 text-slate-300 hover:text-white'
              }`}
            >
              4. Pasarelas de Pago & Logística
            </button>
          </div>

          {/* Content Sections */}
          <div className="py-4 space-y-6 text-xs text-slate-300 leading-relaxed">
            
            {activeSection === 'tiendanube' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                  <h3 className="font-bold text-sm text-white flex items-center gap-2">
                    <Server className="w-4 h-4 text-brand-400" />
                    ¿Cómo funciona Tiendanube por dentro?
                  </h3>
                  <p>
                    Tiendanube (líder de e-commerce en Argentina, Brasil y Latinoamérica) opera bajo una arquitectura de <strong>Plataforma SaaS Multinquilino (Multi-tenant)</strong>.
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-slate-400">
                    <li><strong>API REST JSON con OAuth 2.0:</strong> Expone endpoints en <code>api.tiendanube.com/v1/{'{store_id}'}</code> con alcances específicos (<code>read_products</code>, <code>write_orders</code>, <code>write_shipping</code>).</li>
                    <li><strong>Motor de Plantillas Tradicional:</strong> Históricamente utiliza un motor basado en <em>Liquid / Twig</em> renderizado en servidor.</li>
                    <li><strong>Webhooks Asíncronos:</strong> Dispara eventos en tiempo real hacia ERPs, CRMs y sistemas de facturación automática (AFIP / Factura Electrónica) ante <code>order/created</code>, <code>order/paid</code>, <code>product/updated</code>.</li>
                    <li><strong>Ecosistema de Aplicaciones:</strong> Permite inyectar scripts, pasarelas de pago externas (Mercado Pago, Modo, Ualá Bis, Payway) y transportistas (Correo Argentino, Andreani, Envíos Nube).</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-brand-500/5 border border-brand-500/20 space-y-2">
                  <h4 className="font-bold text-white text-xs flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-brand-400" />
                    Limitaciones tradicionales de Tiendanube y Shopify monolítico:
                  </h4>
                  <p className="text-slate-400">
                    Las tiendas estándar suelen sufrir de recargas completas de página entre categorías, animaciones rígidas o lentas, y dependencia de plugins de terceros que degradan los Core Web Vitals. Por eso, las marcas líderes mundiales migran a arquitecturas <strong>Headless Commerce</strong> como la de este prototipo.
                  </p>
                </div>
              </div>
            )}

            {activeSection === 'headless' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                  <h3 className="font-bold text-sm text-white flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-electric-cyan" />
                    La Revolución Headless: React + Framer Motion
                  </h3>
                  <p>
                    En este prototipo desacoplamos completamente la interfaz del backend:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                    <div className="p-3 rounded-xl bg-slate-900 border border-white/10 space-y-1">
                      <span className="font-bold text-brand-300">Física de Resortes (Spring Physics)</span>
                      <p className="text-[11px] text-slate-400">Animaciones orgánicas en drawers, cards con efecto 3D hover y modales sin caídas de framerate (60-120 FPS fluidos).</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-white/10 space-y-1">
                      <span className="font-bold text-brand-300">Instant Navigation (Zero Reload)</span>
                      <p className="text-[11px] text-slate-400">Búsqueda reactiva instantánea, filtros en milisegundos y feedback háptico/visual continuo.</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-white/10 space-y-1">
                      <span className="font-bold text-brand-300">Microinteracciones de Conversión</span>
                      <p className="text-[11px] text-slate-400">Barra de progreso de envío gratis dinámica, contador de unidades restantes, confetti al comprar y popups de prueba social.</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-white/10 space-y-1">
                      <span className="font-bold text-brand-300">Optimización Móvil First</span>
                      <p className="text-[11px] text-slate-400">Cajones deslizables táctiles y checkout optimizado con auto-rellenado para reducir la fricción.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'data-model' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                  <h3 className="font-bold text-sm text-white flex items-center gap-2">
                    <Database className="w-4 h-4 text-amber-400" />
                    Modelo de Datos E-Commerce de Alto Rendimiento
                  </h3>
                  <p>
                    La estructura de entidades utilizada en este proyecto refleja fielmente las especificaciones de Tiendanube y Shopify:
                  </p>
                  <pre className="p-3 rounded-xl bg-slate-950 font-mono text-[11px] text-emerald-400 overflow-x-auto border border-white/10">
{`interface Product {
  id: string;
  title: string;
  price: number;
  promoPrice?: number;
  category: string;
  stock: number;
  variants?: ProductVariant[]; // SKUs con talle, color, stock individual
  features: string[];
  installmentsMax: number;     // Configuración de cuotas sin interés
  freeShipping?: boolean;      // Regla de envío
}

interface Order {
  id: string;
  orderNumber: string;
  customer: OrderCustomer;
  items: CartItem[];
  paymentMethod: 'credit_card' | 'mercado_pago' | 'bank_transfer';
  shippingCost: number;
  discount: number;
  total: number;
  status: 'paid' | 'pending' | 'shipped';
}`}
                  </pre>
                </div>
              </div>
            )}

            {activeSection === 'checkout-pipeline' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                  <h3 className="font-bold text-sm text-white flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    Pasarelas de Pago & Logística en Argentina y Latam
                  </h3>
                  <p>
                    Para maximizar la tasa de conversión en la región, las tiendas modernas deben ofrecer:
                  </p>
                  <div className="space-y-2 pt-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5" />
                      <div>
                        <strong>Planes en Cuotas Sin Interés:</strong> En Argentina, el 78% de las compras de ticket medio/alto se cierran en 3, 6 o 12 cuotas. El cálculo transparente en la ficha de producto dispara la conversión en un +34%.
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5" />
                      <div>
                        <strong>Incentivo por Transferencia (10-15% OFF):</strong> Reduce comisiones de pasarela de pago (que rondan el 4% al 8% + IVA) y ofrece liquidez inmediata al comercio.
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5" />
                      <div>
                        <strong>Cotización por Código Postal:</strong> Integración con APIs de Correo Argentino y Andreani que calculan peso volumétrico y zona tarifaria en tiempo real.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Footer CTA */}
          <div className="pt-6 border-t border-white/10 flex justify-end">
            <button
              onClick={() => setIsDocsOpen(false)}
              className="px-6 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-400 text-slate-950 font-bold text-xs shadow-md transition-colors cursor-pointer"
            >
              Entendido, volver a la tienda
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

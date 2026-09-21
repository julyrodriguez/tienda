import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  BookOpen,
  Server,
  Cpu,
  Database,
  CheckCircle2,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const DocsArchitectureModal: React.FC = () => {
  const { isDocsOpen, setIsDocsOpen } = useStore();
  const [activeSection, setActiveSection] = useState<'tiendanube' | 'headless' | 'data-model' | 'checkout-pipeline'>('tiendanube');

  if (!isDocsOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsDocsOpen(false)}
          className="fixed inset-0 bg-[#1C1917]/60 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative z-10 w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#FFFFFF] border border-[#E8E1D5] shadow-2xl p-4 sm:p-6 md:p-8 text-[#1C1917]"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 sm:pb-6 border-b border-[#E8E1D5]">
            <div className="flex items-center gap-3">
              <div className="p-2.5 sm:p-3 rounded-2xl bg-[#EADBC8] text-[#78350F] border border-[#DEC9AE]">
                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <h2 className="font-display font-black text-lg sm:text-2xl text-[#1C1917]">
                  Arquitectura: Tiendanube vs Headless
                </h2>
                <p className="text-[11px] sm:text-xs text-[#78716C]">
                  Investigación técnica, modelos de datos, APIs y mejores prácticas.
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsDocsOpen(false)}
              className="p-2 rounded-xl bg-[#FAF7F2] hover:bg-[#F4ECE0] text-[#78716C] hover:text-[#1C1917] transition-colors cursor-pointer border border-[#E8E1D5]"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Sub-tabs */}
          <div className="flex gap-1.5 sm:gap-2 pt-3 pb-4 sm:pb-6 border-b border-[#E8E1D5] overflow-x-auto text-xs font-bold scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
            <button
              onClick={() => setActiveSection('tiendanube')}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                activeSection === 'tiendanube'
                  ? 'bg-[#1C1917] text-white'
                  : 'bg-[#FAF7F2] text-[#57534E] hover:text-[#1C1917] border border-[#E8E1D5]'
              }`}
            >
              1. Ecosistema Tiendanube
            </button>
            <button
              onClick={() => setActiveSection('headless')}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                activeSection === 'headless'
                  ? 'bg-[#1C1917] text-white'
                  : 'bg-[#FAF7F2] text-[#57534E] hover:text-[#1C1917] border border-[#E8E1D5]'
              }`}
            >
              2. Frontend Headless
            </button>
            <button
              onClick={() => setActiveSection('data-model')}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                activeSection === 'data-model'
                  ? 'bg-[#1C1917] text-white'
                  : 'bg-[#FAF7F2] text-[#57534E] hover:text-[#1C1917] border border-[#E8E1D5]'
              }`}
            >
              3. Modelo de Datos
            </button>
            <button
              onClick={() => setActiveSection('checkout-pipeline')}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                activeSection === 'checkout-pipeline'
                  ? 'bg-[#1C1917] text-white'
                  : 'bg-[#FAF7F2] text-[#57534E] hover:text-[#1C1917] border border-[#E8E1D5]'
              }`}
            >
              4. Pagos & Logística
            </button>
          </div>

          {/* Content */}
          <div className="py-4 space-y-4 text-xs text-[#57534E] leading-relaxed">
            
            {activeSection === 'tiendanube' && (
              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8E1D5] space-y-2">
                  <h3 className="font-bold text-sm text-[#1C1917] flex items-center gap-2">
                    <Server className="w-4 h-4 text-[#C25E38]" />
                    ¿Cómo funciona Tiendanube por dentro?
                  </h3>
                  <p>
                    Tiendanube es una plataforma SaaS multinquilino líder en América Latina.
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-[#78716C]">
                    <li><strong>API REST JSON con OAuth 2.0:</strong> Expone endpoints en <code>api.tiendanube.com/v1/{'{store_id}'}</code> con scopes granulares.</li>
                    <li><strong>Motor de Plantillas:</strong> Tradicionalmente basado en plantillas <em>Liquid</em> renderizadas por servidor.</li>
                    <li><strong>Webhooks Asíncronos:</strong> Dispara notificaciones a ERPs y AFIP ante <code>order/created</code>, <code>order/paid</code>, <code>product/updated</code>.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-[#F4ECE0] border border-[#DEC9AE] space-y-1.5">
                  <h4 className="font-bold text-[#78350F] text-xs flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-[#C25E38]" />
                    Por qué migrar hacia Headless Commerce:
                  </h4>
                  <p className="text-[#57534E]">
                    Las tiendas tradicionales sufren recargas completas entre categorías y páginas. Con Headless logramos transiciones sin latencia, físicas fluidas y un diseño visual de máximo nivel.
                  </p>
                </div>
              </div>
            )}

            {activeSection === 'headless' && (
              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8E1D5] space-y-2">
                  <h3 className="font-bold text-sm text-[#1C1917] flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-[#78350F]" />
                    Frontend Headless: React + Framer Motion
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-2">
                    <div className="p-3 rounded-xl bg-[#FFFFFF] border border-[#E8E1D5] space-y-1">
                      <span className="font-bold text-[#1C1917]">Físicas de Resortes (Spring)</span>
                      <p className="text-[11px] text-[#78716C]">Drawers y modales animados orgánicamente a 60–120 FPS sin caídas de rendimiento.</p>
                    </div>
                    <div className="p-3 rounded-xl bg-[#FFFFFF] border border-[#E8E1D5] space-y-1">
                      <span className="font-bold text-[#1C1917]">Navegación Instantánea</span>
                      <p className="text-[11px] text-[#78716C]">Búsqueda en tiempo real y filtrado en milisegundos sin refrescar la página.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'data-model' && (
              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8E1D5] space-y-2">
                  <h3 className="font-bold text-sm text-[#1C1917] flex items-center gap-2">
                    <Database className="w-4 h-4 text-[#C25E38]" />
                    Modelo de Datos E-Commerce
                  </h3>
                  <pre className="p-3 rounded-xl bg-[#1C1917] font-mono text-[11px] text-[#DEC9AE] overflow-x-auto">
{`interface Product {
  id: string;
  title: string;
  price: number;
  promoPrice?: number;
  category: string;
  stock: number;
  variants?: ProductVariant[]; // SKUs con talle, color, stock
  features: string[];
  installmentsMax: number;     // Cuotas sin interés
  freeShipping?: boolean;      // Regla de envío gratis
}`}
                  </pre>
                </div>
              </div>
            )}

            {activeSection === 'checkout-pipeline' && (
              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8E1D5] space-y-2">
                  <h3 className="font-bold text-sm text-[#1C1917] flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#0F766E]" />
                    Pasarelas de Pago & Logística
                  </h3>
                  <div className="space-y-2 pt-1">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#0F766E] mt-0.5 shrink-0" />
                      <div>
                        <strong>Cuotas Sin Interés:</strong> En Argentina, el 78% de compras de ticket medio/alto se cierran en 3 o 6 cuotas.
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#0F766E] mt-0.5 shrink-0" />
                      <div>
                        <strong>Descuento por Transferencia (15% OFF):</strong> Ahorro directo en comisiones de pasarela de pago.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Footer */}
          <div className="pt-4 sm:pt-6 border-t border-[#E8E1D5] flex justify-end">
            <button
              onClick={() => setIsDocsOpen(false)}
              className="px-5 py-2.5 rounded-xl bg-[#1C1917] hover:bg-[#292524] text-[#FAF7F2] font-bold text-xs shadow-md transition-colors cursor-pointer"
            >
              Volver a la tienda
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

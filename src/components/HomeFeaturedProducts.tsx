import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';

export const HomeFeaturedProducts: React.FC = () => {
  const { products, setCurrentView } = useStore();

  // Show first 4 products (curated selection for home page)
  const featured = products.slice(0, 4);

  return (
    <section className="py-10 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EADBC8]/60 text-[#78350F] text-[11px] font-bold border border-[#DEC9AE] mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-[#C25E38]" />
            <span>Selección Curada 2026</span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#1C1917] tracking-tight">
            Novedades Destacadas
          </h2>
          <p className="text-xs sm:text-sm text-[#78716C] mt-1 max-w-xl">
            Una muestra exclusiva de nuestra ingeniería acústica y diseño ergonómico.
          </p>
        </div>

        {/* View all catalog CTA button */}
        <button
          onClick={() => {
            setCurrentView('catalog');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#1C1917] hover:bg-[#292524] text-[#FAF7F2] font-bold text-xs shadow-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shrink-0 self-start sm:self-auto"
        >
          <span>Ver Catálogo Completo</span>
          <ArrowRight className="w-4 h-4 text-[#DEC9AE]" />
        </button>
      </div>

      {/* Grid of 4 featured products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {featured.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>

      {/* Bottom Banner to jump to full Catalog with filters */}
      <div className="mt-10 sm:mt-14 rounded-3xl p-6 sm:p-10 border border-[#E8E1D5] bg-gradient-to-br from-[#FFFFFF] via-[#FAF7F2] to-[#F4ECE0] shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FAF7F2] text-[#0F766E] border border-[#E8E1D5] text-[11px] font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Garantía Oficial 2 Años • 12 Cuotas sin Interés</span>
          </div>
          <h3 className="font-display font-black text-xl sm:text-2xl text-[#1C1917]">
            ¿Buscás más modelos o especificaciones?
          </h3>
          <p className="text-xs sm:text-sm text-[#78716C] max-w-lg">
            Explorá todo nuestro inventario con filtros por categoría, precios, compatibilidad y stock en tiempo real.
          </p>
        </div>

        <button
          onClick={() => {
            setCurrentView('catalog');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-[#1C1917] hover:bg-[#292524] text-[#FAF7F2] font-bold text-xs sm:text-sm shadow-md transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shrink-0"
        >
          <span>Ir a la Página de Catálogo</span>
          <ArrowRight className="w-4 h-4 text-[#DEC9AE]" />
        </button>
      </div>
    </section>
  );
};

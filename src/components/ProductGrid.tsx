import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, ArrowUpDown, Check, RefreshCw } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { useStore } from '../context/StoreContext';

export const ProductGrid: React.FC = () => {
  const {
    filteredProducts,
    sortBy,
    setSortBy,
    inStockOnly,
    setInStockOnly,
    searchQuery,
    setSearchQuery,
    setSelectedCategory
  } = useStore();

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setInStockOnly(false);
    setSortBy('featured');
  };

  return (
    <section id="catalogo" className="py-8 sm:py-12 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 sm:pb-8 mb-6 sm:mb-8 border-b border-[#E8E1D5]">
        <div>
          <h2 className="font-display font-extrabold text-xl sm:text-2xl text-[#1C1917] tracking-tight">
            {searchQuery ? `Resultados para "${searchQuery}"` : 'Catálogo Principal'}
          </h2>
          <p className="text-xs text-[#78716C] mt-0.5">
            Mostrando <span className="text-[#C25E38] font-bold">{filteredProducts.length}</span> modelos disponibles
          </p>
        </div>

        {/* Filter and Sort controls */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          
          {/* Stock Toggle Switch */}
          <button
            onClick={() => setInStockOnly(!inStockOnly)}
            className={`flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
              inStockOnly
                ? 'bg-[#EADBC8] border-[#DEC9AE] text-[#78350F]'
                : 'bg-[#FFFFFF] border-[#E8E1D5] text-[#78716C] hover:text-[#1C1917]'
            }`}
          >
            <div className={`w-3 h-3 rounded-full flex items-center justify-center border ${inStockOnly ? 'bg-[#0F766E] border-[#0F766E]' : 'border-[#A8A29E]'}`}>
              {inStockOnly && <Check className="w-2 h-2 text-white stroke-[3]" />}
            </div>
            <span>En stock</span>
          </button>

          {/* Sort Selector Dropdown */}
          <div className="flex items-center gap-2 bg-[#FFFFFF] border border-[#E8E1D5] rounded-xl px-2.5 sm:px-3 py-1.5 text-xs text-[#57534E] shadow-xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#C25E38]" />
            <span className="text-[#78716C] hidden sm:inline">Ordenar:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-[#1C1917] font-bold focus:outline-none cursor-pointer text-xs"
            >
              <option value="featured">Destacados</option>
              <option value="price-asc">Menor Precio</option>
              <option value="price-desc">Mayor Precio</option>
              <option value="discount">Mayor Descuento</option>
              <option value="rating">Mejor Valorados</option>
            </select>
          </div>

        </div>
      </div>

      {/* Grid or Empty State */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center rounded-3xl border border-[#E8E1D5] bg-[#FFFFFF] p-6 sm:p-8 max-w-md mx-auto space-y-3 shadow-xs">
          <div className="w-12 h-12 rounded-full bg-[#F4ECE0] border border-[#E8E1D5] mx-auto flex items-center justify-center text-[#78716C]">
            <SlidersHorizontal className="w-6 h-6 text-[#C25E38]" />
          </div>
          <h3 className="font-display font-bold text-lg text-[#1C1917]">Sin resultados</h3>
          <p className="text-xs text-[#78716C]">
            No encontramos productos con los filtros o término de búsqueda ingresado.
          </p>
          <button
            onClick={resetFilters}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1C1917] hover:bg-[#292524] text-[#FAF7F2] font-bold text-xs shadow-md transition-all cursor-pointer"
          >
            <RefreshCw className="w-3 h-3 text-[#DEC9AE]" />
            <span>Restablecer Filtros</span>
          </button>
        </div>
      )}
    </section>
  );
};

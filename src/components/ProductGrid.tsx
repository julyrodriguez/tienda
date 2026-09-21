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
    selectedCategory,
    setSelectedCategory
  } = useStore();

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setInStockOnly(false);
    setSortBy('featured');
  };

  return (
    <section id="catalogo" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Controls Bar: Results Count, Sort, Stock Toggle */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 mb-8 border-b border-white/[0.08]">
        <div>
          <h2 className="font-display font-extrabold text-2xl text-white tracking-tight">
            {searchQuery ? `Resultados para "${searchQuery}"` : 'Catálogo de Productos'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Mostrando <span className="text-brand-400 font-bold">{filteredProducts.length}</span> modelos de última generación
          </p>
        </div>

        {/* Filter and Sort controls */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Stock Toggle Switch */}
          <button
            onClick={() => setInStockOnly(!inStockOnly)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
              inStockOnly
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
            }`}
          >
            <div className={`w-3 h-3 rounded-full flex items-center justify-center border ${inStockOnly ? 'bg-emerald-400 border-emerald-300' : 'border-slate-500'}`}>
              {inStockOnly && <Check className="w-2.5 h-2.5 text-slate-950 stroke-[3]" />}
            </div>
            <span>Solo en stock</span>
          </button>

          {/* Sort Selector Dropdown */}
          <div className="flex items-center gap-2 bg-slate-900/90 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-slate-300">
            <ArrowUpDown className="w-3.5 h-3.5 text-brand-400" />
            <span className="text-slate-400">Ordenar por:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-slate-100 font-bold focus:outline-none cursor-pointer"
            >
              <option value="featured" className="bg-slate-900 text-slate-200">Destacados</option>
              <option value="price-asc" className="bg-slate-900 text-slate-200">Menor Precio</option>
              <option value="price-desc" className="bg-slate-900 text-slate-200">Mayor Precio</option>
              <option value="discount" className="bg-slate-900 text-slate-200">Mayor Descuento</option>
              <option value="rating" className="bg-slate-900 text-slate-200">Mejor Valorados</option>
            </select>
          </div>

        </div>
      </div>

      {/* Grid or Empty State */}
      {filteredProducts.length > 0 ? (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="py-20 text-center glass-panel rounded-3xl border border-white/10 p-8 max-w-lg mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 mx-auto flex items-center justify-center text-slate-400">
            <SlidersHorizontal className="w-8 h-8 text-brand-400" />
          </div>
          <h3 className="font-display font-bold text-xl text-white">No encontramos productos</h3>
          <p className="text-xs text-slate-400">
            No hay productos que coincidan con los filtros aplicados o tu término de búsqueda.
          </p>
          <button
            onClick={resetFilters}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-400 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Restablecer Filtros</span>
          </button>
        </div>
      )}
    </section>
  );
};

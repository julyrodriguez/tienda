import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SlidersHorizontal,
  ArrowUpDown,
  Search,
  X,
  Check,
  RotateCcw,
  Sparkles,
  Headphones,
  Watch,
  Gamepad2,
  Laptop,
  Layers,
  ChevronRight,
  ArrowLeft,
  Truck,
  Zap
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { CategoryFilter } from '../types/store';

const CATEGORY_OPTIONS: { id: CategoryFilter; label: string; icon: React.FC<{ className?: string }> }[] = [
  { id: 'all', label: 'Todos los Ecosistemas', icon: Sparkles },
  { id: 'audio', label: 'Audio Hi-Fi', icon: Headphones },
  { id: 'wearables', label: 'Wearables & Smart Rings', icon: Watch },
  { id: 'gaming', label: 'Gaming & Hall Effect', icon: Gamepad2 },
  { id: 'workstation', label: 'Workstation & Hubs', icon: Laptop },
  { id: 'lifestyle', label: 'Lifestyle & EDC', icon: Layers },
];

export const CatalogView: React.FC = () => {
  const {
    products,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    inStockOnly,
    setInStockOnly,
    setCurrentView,
    formatPrice
  } = useStore();

  const [priceRange, setPriceRange] = useState<'all' | 'under200' | '200to350' | 'above350'>('all');
  const [onlyFreeShipping, setOnlyFreeShipping] = useState(false);
  const [onlyBestsellers, setOnlyBestsellers] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Filtered & Sorted products computation
  const catalogProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategory !== 'all' && p.category !== selectedCategory) {
          return false;
        }
        // Stock filter
        if (inStockOnly && p.stock <= 0) {
          return false;
        }
        // Free shipping filter
        if (onlyFreeShipping && !p.freeShipping) {
          return false;
        }
        // Bestseller filter
        if (onlyBestsellers && !p.isBestSeller) {
          return false;
        }
        // Price range filter
        const price = p.promoPrice || p.price;
        if (priceRange === 'under200' && price >= 200000) return false;
        if (priceRange === '200to350' && (price < 200000 || price > 350000)) return false;
        if (priceRange === 'above350' && price <= 350000) return false;

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = p.title.toLowerCase().includes(q);
          const matchSub = p.subtitle.toLowerCase().includes(q);
          const matchTags = p.tags.some(t => t.toLowerCase().includes(q));
          if (!matchTitle && !matchSub && !matchTags) return false;
        }
        return true;
      })
      .sort((a, b) => {
        const priceA = a.promoPrice || a.price;
        const priceB = b.promoPrice || b.price;
        if (sortBy === 'price-asc') return priceA - priceB;
        if (sortBy === 'price-desc') return priceB - priceA;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'discount') {
          const discA = a.promoPrice ? (a.price - a.promoPrice) : 0;
          const discB = b.promoPrice ? (b.price - b.promoPrice) : 0;
          return discB - discA;
        }
        // Default: featured
        return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
      });
  }, [products, selectedCategory, inStockOnly, onlyFreeShipping, onlyBestsellers, priceRange, searchQuery, sortBy]);

  const resetAllFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSortBy('featured');
    setInStockOnly(false);
    setPriceRange('all');
    setOnlyFreeShipping(false);
    setOnlyBestsellers(false);
  };

  const hasActiveFilters = selectedCategory !== 'all' || inStockOnly || onlyFreeShipping || onlyBestsellers || priceRange !== 'all' || searchQuery.trim() !== '';

  return (
    <div className="py-6 sm:py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Breadcrumbs & Header */}
      <div className="mb-6 sm:mb-8 pb-4 sm:pb-6 border-b border-[#E8E1D5]">
        <div className="flex items-center gap-2 text-xs text-[#78716C] mb-2">
          <button
            onClick={() => setCurrentView('home')}
            className="hover:text-[#1C1917] transition-colors flex items-center gap-1 font-semibold cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Inicio</span>
          </button>
          <span>/</span>
          <span className="text-[#1C1917] font-bold">Catálogo Completo</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="font-display font-extrabold text-2xl sm:text-4xl text-[#1C1917] tracking-tight">
              Catálogo de Precisión
            </h1>
            <p className="text-xs sm:text-sm text-[#78716C] mt-1">
              Explorá todos nuestros dispositivos y accesorios con tecnología de punta.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#EADBC8] text-[#78350F] text-xs font-bold border border-[#DEC9AE]">
              {catalogProducts.length} productos encontrados
            </span>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1C1917] text-[#FAF7F2] text-xs font-bold cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filtros</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        
        {/* ========================================================= */}
        {/* DESKTOP SIDEBAR (Menú Lateral)                            */}
        {/* ========================================================= */}
        <aside className="hidden lg:block lg:col-span-3 space-y-6 sticky top-24">
          <div className="p-5 rounded-3xl bg-[#FFFFFF] border border-[#E8E1D5] shadow-xs space-y-6">
            
            {/* Sidebar Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E1D5]">
              <div className="flex items-center gap-2 text-[#1C1917] font-display font-bold text-sm">
                <SlidersHorizontal className="w-4 h-4 text-[#C25E38]" />
                <span>Filtros y Categorías</span>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={resetAllFilters}
                  className="text-[11px] font-bold text-[#C25E38] hover:underline cursor-pointer"
                >
                  Limpiar
                </button>
              )}
            </div>

            {/* 1. Categorías */}
            <div className="space-y-2">
              <span className="text-[11px] uppercase tracking-wider font-extrabold text-[#78716C] block">
                Categoría
              </span>
              <div className="space-y-1">
                {CATEGORY_OPTIONS.map((cat) => {
                  const Icon = cat.icon;
                  const isSelected = selectedCategory === cat.id;
                  const count = cat.id === 'all' 
                    ? products.length 
                    : products.filter(p => p.category === cat.id).length;

                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#1C1917] text-[#FAF7F2] font-bold shadow-xs'
                          : 'text-[#57534E] hover:bg-[#FAF7F2] hover:text-[#1C1917]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-[#DEC9AE]' : 'text-[#78350F]'}`} />
                        <span>{cat.label}</span>
                      </div>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                        isSelected ? 'bg-white/20 text-[#FAF7F2]' : 'bg-[#F4ECE0] text-[#78716C]'
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Rango de Precios */}
            <div className="space-y-2 pt-3 border-t border-[#E8E1D5]">
              <span className="text-[11px] uppercase tracking-wider font-extrabold text-[#78716C] block">
                Rango de Precio
              </span>
              <div className="space-y-1 text-xs">
                {[
                  { id: 'all', label: 'Cualquier precio' },
                  { id: 'under200', label: 'Hasta $200.000' },
                  { id: '200to350', label: '$200.000 - $350.000' },
                  { id: 'above350', label: 'Más de $350.000' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setPriceRange(opt.id as any)}
                    className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left transition-colors cursor-pointer ${
                      priceRange === opt.id
                        ? 'text-[#1C1917] font-bold bg-[#EADBC8]/50'
                        : 'text-[#78716C] hover:text-[#1C1917]'
                    }`}
                  >
                    <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                      priceRange === opt.id ? 'border-[#C25E38] bg-[#C25E38]' : 'border-[#A8A29E]'
                    }`}>
                      {priceRange === opt.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <span>{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Filtros rápidos (Stock, Envío gratis, Top) */}
            <div className="space-y-2.5 pt-3 border-t border-[#E8E1D5]">
              <span className="text-[11px] uppercase tracking-wider font-extrabold text-[#78716C] block">
                Disponibilidad & Ventajas
              </span>

              {/* In stock toggle */}
              <label className="flex items-center justify-between text-xs text-[#1C1917] cursor-pointer">
                <span>Solo disponibles en stock</span>
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded border-[#E8E1D5] text-[#C25E38] focus:ring-[#C25E38] cursor-pointer"
                />
              </label>

              {/* Free shipping toggle */}
              <label className="flex items-center justify-between text-xs text-[#1C1917] cursor-pointer">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#0F766E]" />
                  <span>Envío Gratis</span>
                </span>
                <input
                  type="checkbox"
                  checked={onlyFreeShipping}
                  onChange={(e) => setOnlyFreeShipping(e.target.checked)}
                  className="rounded border-[#E8E1D5] text-[#C25E38] focus:ring-[#C25E38] cursor-pointer"
                />
              </label>

              {/* Bestseller toggle */}
              <label className="flex items-center justify-between text-xs text-[#1C1917] cursor-pointer">
                <span className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-[#C25E38]" />
                  <span>Más Vendidos</span>
                </span>
                <input
                  type="checkbox"
                  checked={onlyBestsellers}
                  onChange={(e) => setOnlyBestsellers(e.target.checked)}
                  className="rounded border-[#E8E1D5] text-[#C25E38] focus:ring-[#C25E38] cursor-pointer"
                />
              </label>
            </div>

          </div>
        </aside>

        {/* ========================================================= */}
        {/* MAIN PRODUCT GRID & TOOLBAR                               */}
        {/* ========================================================= */}
        <main className="lg:col-span-9 space-y-6">
          
          {/* Controls Bar: Search & Sort */}
          <div className="p-3 sm:p-4 rounded-2xl bg-[#FFFFFF] border border-[#E8E1D5] shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#A8A29E] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por nombre, modelo o palabra clave..."
                className="w-full bg-[#FAF7F2] border border-[#E8E1D5] rounded-xl py-2 pl-9 pr-8 text-xs text-[#1C1917] placeholder-[#A8A29E] focus:outline-none focus:border-[#BA9971]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-1 text-[#A8A29E] absolute right-2.5 top-1/2 -translate-y-1/2 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs text-[#78716C] font-semibold hidden md:inline">Ordenar por:</span>
              <div className="flex items-center gap-1.5 bg-[#FAF7F2] border border-[#E8E1D5] rounded-xl px-3 py-1.5 text-xs text-[#1C1917]">
                <ArrowUpDown className="w-3.5 h-3.5 text-[#C25E38]" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent font-bold focus:outline-none cursor-pointer text-xs"
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

          {/* Active Filters Pill list */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-[#78716C] font-semibold mr-1">Filtros aplicados:</span>
              {selectedCategory !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#EADBC8] text-[#78350F] text-[11px] font-bold">
                  {CATEGORY_OPTIONS.find(c => c.id === selectedCategory)?.label}
                  <button onClick={() => setSelectedCategory('all')} className="hover:text-red-700 cursor-pointer">×</button>
                </span>
              )}
              {priceRange !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#EADBC8] text-[#78350F] text-[11px] font-bold">
                  Precio filtrado
                  <button onClick={() => setPriceRange('all')} className="hover:text-red-700 cursor-pointer">×</button>
                </span>
              )}
              {inStockOnly && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#EADBC8] text-[#78350F] text-[11px] font-bold">
                  En Stock
                  <button onClick={() => setInStockOnly(false)} className="hover:text-red-700 cursor-pointer">×</button>
                </span>
              )}
              {onlyFreeShipping && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#EADBC8] text-[#78350F] text-[11px] font-bold">
                  Envío Gratis
                  <button onClick={() => setOnlyFreeShipping(false)} className="hover:text-red-700 cursor-pointer">×</button>
                </span>
              )}
              {onlyBestsellers && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#EADBC8] text-[#78350F] text-[11px] font-bold">
                  Más Vendidos
                  <button onClick={() => setOnlyBestsellers(false)} className="hover:text-red-700 cursor-pointer">×</button>
                </span>
              )}
              <button
                onClick={resetAllFilters}
                className="text-[11px] text-[#C25E38] font-bold hover:underline cursor-pointer ml-1"
              >
                Limpiar todo
              </button>
            </div>
          )}

          {/* Products Grid */}
          {catalogProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {catalogProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center rounded-3xl border border-[#E8E1D5] bg-[#FFFFFF] p-6 sm:p-8 max-w-md mx-auto space-y-3 shadow-xs">
              <div className="w-12 h-12 rounded-full bg-[#FAF7F2] border border-[#E8E1D5] mx-auto flex items-center justify-center text-[#78716C]">
                <SlidersHorizontal className="w-6 h-6 text-[#C25E38]" />
              </div>
              <h3 className="font-display font-bold text-lg text-[#1C1917]">Sin productos encontrados</h3>
              <p className="text-xs text-[#78716C]">
                No encontramos productos que coincidan con la combinación de filtros seleccionada.
              </p>
              <button
                onClick={resetAllFilters}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1C1917] hover:bg-[#292524] text-[#FAF7F2] font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#DEC9AE]" />
                <span>Restablecer Filtros</span>
              </button>
            </div>
          )}

        </main>
      </div>

      {/* ========================================================= */}
      {/* MOBILE FILTERS MODAL                                      */}
      {/* ========================================================= */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFiltersOpen(false)}
              className="fixed inset-0 bg-[#1C1917]/50"
            />

            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.25 }}
              className="relative z-10 w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-[#FFFFFF] border border-[#E8E1D5] shadow-2xl p-5 text-[#1C1917] space-y-5"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#E8E1D5]">
                <div className="flex items-center gap-2 font-display font-black text-base">
                  <SlidersHorizontal className="w-4 h-4 text-[#C25E38]" />
                  <span>Filtros y Categorías</span>
                </div>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-1.5 rounded-xl bg-[#FAF7F2] text-[#78716C]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Mobile Category options */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#78716C]">Categoría</span>
                <div className="grid grid-cols-2 gap-1.5">
                  {CATEGORY_OPTIONS.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.id);
                      }}
                      className={`p-2 rounded-xl text-xs font-semibold text-left transition-colors ${
                        selectedCategory === cat.id
                          ? 'bg-[#1C1917] text-white font-bold'
                          : 'bg-[#FAF7F2] text-[#57534E] border border-[#E8E1D5]'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Price options */}
              <div className="space-y-2 pt-2 border-t border-[#E8E1D5]">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#78716C]">Precio</span>
                <div className="grid grid-cols-2 gap-1.5 text-xs">
                  {[
                    { id: 'all', label: 'Cualquier precio' },
                    { id: 'under200', label: 'Hasta $200.000' },
                    { id: '200to350', label: '$200k - $350k' },
                    { id: 'above350', label: 'Más de $350k' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setPriceRange(opt.id as any)}
                      className={`p-2 rounded-xl text-left border text-xs ${
                        priceRange === opt.id
                          ? 'bg-[#EADBC8] border-[#DEC9AE] text-[#78350F] font-bold'
                          : 'bg-[#FAF7F2] border-[#E8E1D5] text-[#78716C]'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Quick Toggles */}
              <div className="space-y-2 pt-2 border-t border-[#E8E1D5] text-xs">
                <label className="flex items-center justify-between p-2 rounded-xl bg-[#FAF7F2]">
                  <span>Solo en stock</span>
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="rounded text-[#C25E38]"
                  />
                </label>
                <label className="flex items-center justify-between p-2 rounded-xl bg-[#FAF7F2]">
                  <span>Envío gratis</span>
                  <input
                    type="checkbox"
                    checked={onlyFreeShipping}
                    onChange={(e) => setOnlyFreeShipping(e.target.checked)}
                    className="rounded text-[#C25E38]"
                  />
                </label>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  onClick={resetAllFilters}
                  className="flex-1 py-3 rounded-2xl bg-[#FAF7F2] border border-[#E8E1D5] text-xs font-bold text-[#78716C]"
                >
                  Limpiar Todo
                </button>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="flex-1 py-3 rounded-2xl bg-[#1C1917] text-white text-xs font-bold"
                >
                  Ver Resultados ({catalogProducts.length})
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

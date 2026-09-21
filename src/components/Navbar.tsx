import React, { useState, useRef, useEffect } from 'react';
import {
  ShoppingBag,
  Heart,
  Search,
  SlidersHorizontal,
  X,
  Menu,
  Sparkles,
  Scale
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    cartCount,
    setIsCartOpen,
    wishlist,
    setIsWishlistModalOpen,
    setIsAdminOpen,
    setIsLegalModalOpen,
    searchQuery,
    setSearchQuery,
    currency,
    setCurrency,
  } = useStore();

  const [isSearchActive, setIsSearchActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchActive(true);
        setTimeout(() => searchInputRef.current?.focus(), 50);
      }
      if (e.key === 'Escape' && isSearchActive) {
        setIsSearchActive(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchActive]);

  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="bg-[#FAF7F2] border-b border-[#E8E1D5] shadow-xs">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3 sm:gap-6 shrink-0">
            <button
              onClick={() => {
                setCurrentView('home');
                setSearchQuery('');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2.5 sm:gap-3 group text-left cursor-pointer"
            >
              <div className="relative flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-[#292524] via-[#44403C] to-[#C25E38] shadow-md shadow-stone-900/10 group-hover:scale-105 transition-all duration-300">
                <span className="font-display font-black text-[#FAF7F2] text-xl sm:text-2xl tracking-tighter">A</span>
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#0F766E] border-2 border-[#FAF7F2]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-extrabold text-xl sm:text-2xl tracking-tight text-[#1C1917] group-hover:text-[#C25E38] transition-colors">
                    AURA<span className="text-[#C25E38]">.</span>
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-bold tracking-widest px-2 py-0.5 rounded-full bg-[#EADBC8] text-[#78350F] uppercase">
                    STUDIO
                  </span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-[#78716C] tracking-wide font-medium hidden sm:block">
                  Tienda Minimalista & Tech
                </p>
              </div>
            </button>

            {/* Desktop Navigation Links - Clean and Focused */}
            <nav className="hidden lg:flex items-center gap-1.5 ml-4 pl-4 border-l border-[#E8E1D5] text-xs font-semibold text-[#57534E]">
              <button
                onClick={() => {
                  setCurrentView('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                  currentView === 'home'
                    ? 'text-[#1C1917] bg-[#EADBC8] font-bold shadow-xs'
                    : 'hover:text-[#1C1917] hover:bg-[#F4ECE0]'
                }`}
              >
                Inicio
              </button>
              <button
                onClick={() => {
                  setCurrentView('catalog');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                  currentView === 'catalog'
                    ? 'text-[#1C1917] bg-[#EADBC8] font-bold shadow-xs'
                    : 'hover:text-[#1C1917] hover:bg-[#F4ECE0]'
                }`}
              >
                Catálogo
              </button>
            </nav>
          </div>

          {/* Search Bar - Desktop */}
          <div className="flex-1 max-w-sm hidden md:block">
            <div className="relative group">
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar modelo, tag, categoría... (⌘K)"
                className="w-full bg-[#FFFFFF] border border-[#E8E1D5] focus:border-[#BA9971] rounded-full py-2 pl-9 pr-8 text-xs text-[#1C1917] placeholder-[#A8A29E] focus:outline-none focus:ring-2 focus:ring-[#BA9971]/20 transition-all shadow-xs"
              />
              <Search className="w-3.5 h-3.5 text-[#A8A29E] absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-[#78350F] transition-colors" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-1 text-[#A8A29E] hover:text-[#1C1917] absolute right-2.5 top-1/2 -translate-y-1/2"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            
            {/* Search Trigger for Mobile */}
            <button
              onClick={() => setIsSearchActive(!isSearchActive)}
              className="md:hidden p-2 rounded-xl text-[#57534E] hover:text-[#1C1917] hover:bg-[#F4ECE0] transition-colors"
              aria-label="Buscar"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Currency Selector */}
            <div className="hidden sm:flex items-center bg-[#F4ECE0] p-1 rounded-xl border border-[#E8E1D5] text-[11px] font-bold">
              <button
                onClick={() => setCurrency('ARS')}
                className={`px-2 py-0.5 rounded-lg transition-all ${
                  currency === 'ARS'
                    ? 'bg-[#FFFFFF] text-[#1C1917] shadow-xs'
                    : 'text-[#78716C] hover:text-[#1C1917]'
                }`}
              >
                ARS
              </button>
              <button
                onClick={() => setCurrency('USD')}
                className={`px-2 py-0.5 rounded-lg transition-all ${
                  currency === 'USD'
                    ? 'bg-[#FFFFFF] text-[#1C1917] shadow-xs'
                    : 'text-[#78716C] hover:text-[#1C1917]'
                }`}
              >
                USD
              </button>
            </div>

            {/* Admin Cloud Button */}
            <button
              onClick={() => setIsAdminOpen(true)}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-bold text-[#78350F] bg-[#F4ECE0] hover:bg-[#EADBC8] border border-[#DEC9AE] transition-all cursor-pointer shadow-xs"
              title="Panel de Administrador"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#C25E38]" />
              <span className="hidden sm:inline">Admin Cloud</span>
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => setIsWishlistModalOpen(true)}
              className="relative p-2 sm:p-2.5 rounded-xl text-[#57534E] hover:text-rose-600 hover:bg-rose-50 transition-all cursor-pointer"
              aria-label="Favoritos"
            >
              <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${wishlist.length > 0 ? 'text-rose-600 fill-rose-500' : ''}`} />
              {wishlist.length > 0 && (
                <span className="absolute 0 top-0.5 right-0.5 w-4 h-4 flex items-center justify-center rounded-full bg-rose-500 text-white text-[9px] font-bold">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Drawer Trigger */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl bg-[#1C1917] hover:bg-[#292524] text-[#FAF7F2] font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer shrink-0"
              aria-label="Abrir carrito"
            >
              <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#DEC9AE]" />
              <span className="hidden sm:inline text-xs font-bold tracking-wide">Bolsa</span>
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    key="cart-badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-[#C25E38] text-white text-[10px] font-black"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Mobile Menu Burger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-[#57534E] hover:text-[#1C1917] hover:bg-[#F4ECE0]"
              aria-label="Menú"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Expandable Bar */}
        <AnimatePresence>
          {isSearchActive && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="md:hidden overflow-hidden border-t border-[#E8E1D5] bg-[#FAF7F2]"
            >
              <div className="px-3 py-2.5">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar en el catálogo..."
                    className="w-full bg-[#FFFFFF] border border-[#E8E1D5] rounded-xl py-2 pl-8 pr-8 text-xs text-[#1C1917] placeholder-[#A8A29E] focus:outline-none focus:border-[#BA9971]"
                  />
                  <Search className="w-3.5 h-3.5 text-[#A8A29E] absolute left-2.5 top-1/2 -translate-y-1/2" />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="p-1 text-[#A8A29E] absolute right-2 top-1/2 -translate-y-1/2"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden overflow-hidden border-t border-[#E8E1D5] bg-[#FAF7F2]"
            >
              <div className="px-4 py-4 space-y-3">
                {/* Main Navigation Links */}
                <div className="space-y-1.5">
                  <button
                    onClick={() => {
                      setCurrentView('home');
                      setMobileMenuOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`w-full flex items-center justify-between p-3 rounded-2xl text-xs font-bold transition-all ${
                      currentView === 'home'
                        ? 'bg-[#1C1917] text-[#FAF7F2] shadow-sm'
                        : 'bg-[#FFFFFF] text-[#1C1917] border border-[#E8E1D5]'
                    }`}
                  >
                    <span>Inicio</span>
                    <span className="text-[10px] text-[#A8A29E]">Portada</span>
                  </button>

                  <button
                    onClick={() => {
                      setCurrentView('catalog');
                      setMobileMenuOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`w-full flex items-center justify-between p-3 rounded-2xl text-xs font-bold transition-all ${
                      currentView === 'catalog'
                        ? 'bg-[#1C1917] text-[#FAF7F2] shadow-sm'
                        : 'bg-[#FFFFFF] text-[#1C1917] border border-[#E8E1D5]'
                    }`}
                  >
                    <span>Explorar Catálogo Completo</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#EADBC8] text-[#78350F] text-[10px] font-bold">Filtros</span>
                  </button>
                </div>

                {/* Currency selector */}
                <div className="pt-2 border-t border-[#E8E1D5] flex items-center justify-between">
                  <span className="text-xs text-[#78716C] font-medium">Moneda:</span>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => setCurrency('ARS')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold ${currency === 'ARS' ? 'bg-[#1C1917] text-white' : 'bg-[#FFFFFF] text-[#57534E] border border-[#E8E1D5]'}`}
                    >
                      ARS ($)
                    </button>
                    <button
                      onClick={() => setCurrency('USD')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold ${currency === 'USD' ? 'bg-[#1C1917] text-white' : 'bg-[#FFFFFF] text-[#57534E] border border-[#E8E1D5]'}`}
                    >
                      USD ($)
                    </button>
                  </div>
                </div>

                {/* Legal Shortcut */}
                <div className="pt-2 flex flex-col gap-2">
                  <button
                    onClick={() => {
                      setIsLegalModalOpen(true);
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl bg-[#FFFFFF] border border-[#E8E1D5] text-[#1C1917] text-xs font-bold shadow-xs cursor-pointer"
                  >
                    <Scale className="w-4 h-4 text-[#C25E38]" />
                    <span>Términos, Privacidad & Defensa al Consumidor</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

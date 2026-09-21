import React, { useState, useRef, useEffect } from 'react';
import {
  ShoppingBag,
  Heart,
  Search,
  SlidersHorizontal,
  Layers,
  BookOpen,
  DollarSign,
  X,
  Menu,
  Sparkles,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
  const {
    cartCount,
    setIsCartOpen,
    wishlist,
    setIsWishlistModalOpen,
    setIsAdminOpen,
    setIsDocsOpen,
    searchQuery,
    setSearchQuery,
    currency,
    setCurrency,
    selectedCategory,
    setSelectedCategory,
    filteredProducts
  } = useStore();

  const [isSearchActive, setIsSearchActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut CMD+K or / to search
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
    <header className="sticky top-0 z-40 w-full transition-all">
      <div className="glass-panel border-b border-white/[0.08] backdrop-blur-xl bg-[#08090E]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-3 group text-left cursor-pointer"
            >
              <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-tr from-brand-600 via-brand-400 to-electric-cyan shadow-lg shadow-brand-500/20 group-hover:scale-105 group-hover:shadow-brand-500/40 transition-all duration-300">
                <span className="font-display font-black text-slate-950 text-2xl tracking-tighter">A</span>
                <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#08090E] animate-ping" />
                <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#08090E]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-extrabold text-2xl tracking-tight text-white group-hover:text-brand-300 transition-colors">
                    AURA<span className="text-brand-400 text-lg">.</span>
                  </span>
                  <span className="text-[10px] font-semibold tracking-widest px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-300 border border-brand-500/20 uppercase">
                    PRO
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 tracking-wide font-medium hidden sm:block">
                  Tienda Cloud & Tech Design
                </p>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 ml-4 pl-4 border-l border-white/10 text-sm font-medium text-slate-300">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  selectedCategory === 'all'
                    ? 'text-white bg-white/10 font-semibold'
                    : 'hover:text-white hover:bg-white/5'
                }`}
              >
                Catálogo
              </button>
              <button
                onClick={() => setSelectedCategory('audio')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  selectedCategory === 'audio'
                    ? 'text-white bg-white/10 font-semibold'
                    : 'hover:text-white hover:bg-white/5'
                }`}
              >
                Audio Hi-Fi
              </button>
              <button
                onClick={() => setSelectedCategory('wearables')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  selectedCategory === 'wearables'
                    ? 'text-white bg-white/10 font-semibold'
                    : 'hover:text-white hover:bg-white/5'
                }`}
              >
                Wearables
              </button>
              <button
                onClick={() => setSelectedCategory('gaming')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  selectedCategory === 'gaming'
                    ? 'text-white bg-white/10 font-semibold'
                    : 'hover:text-white hover:bg-white/5'
                }`}
              >
                Gaming
              </button>
            </nav>
          </div>

          {/* Search Bar - Desktop */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative group">
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar productos, variantes, tags... (ej: titanio, anc, 75%)"
                className="w-full bg-slate-900/80 border border-white/10 focus:border-brand-400/80 rounded-full py-2 pl-10 pr-24 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-400/20 transition-all shadow-inner"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 group-focus-within:text-brand-400 transition-colors" />
              <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                {searchQuery ? (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="p-1 text-slate-400 hover:text-white rounded-full transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <span className="text-[10px] font-mono bg-white/5 border border-white/10 text-slate-400 px-1.5 py-0.5 rounded">
                    ⌘K
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Right Action Icons & Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Search Trigger for Mobile */}
            <button
              onClick={() => setIsSearchActive(!isSearchActive)}
              className="md:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
              aria-label="Buscar"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Currency Selector */}
            <div className="hidden sm:flex items-center bg-white/5 p-1 rounded-xl border border-white/10 text-xs font-semibold">
              <button
                onClick={() => setCurrency('ARS')}
                className={`px-2 py-1 rounded-lg transition-all ${
                  currency === 'ARS'
                    ? 'bg-brand-500 text-slate-950 shadow-md font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                ARS
              </button>
              <button
                onClick={() => setCurrency('USD')}
                className={`px-2 py-1 rounded-lg transition-all ${
                  currency === 'USD'
                    ? 'bg-brand-500 text-slate-950 shadow-md font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                USD
              </button>
            </div>

            {/* Architecture & Docs Modal Trigger */}
            <button
              onClick={() => setIsDocsOpen(true)}
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-brand-500/40 transition-all cursor-pointer shadow-sm group"
              title="Ver análisis de arquitectura Tiendanube / E-commerce"
            >
              <BookOpen className="w-3.5 h-3.5 text-brand-400 group-hover:scale-110 transition-transform" />
              <span>Doc Arquitectura</span>
            </button>

            {/* Admin Cloud Panel Trigger */}
            <button
              onClick={() => setIsAdminOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-brand-300 bg-brand-500/10 hover:bg-brand-500/20 border border-brand-500/30 transition-all cursor-pointer shadow-sm group"
              title="Panel de Administrador de la Tienda"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-brand-400 group-hover:rotate-45 transition-transform" />
              <span className="hidden sm:inline">Admin Cloud</span>
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => setIsWishlistModalOpen(true)}
              className="relative p-2.5 rounded-xl text-slate-300 hover:text-rose-400 hover:bg-rose-500/10 transition-all cursor-pointer border border-transparent hover:border-rose-500/20"
              aria-label="Favoritos"
            >
              <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'text-rose-400 fill-rose-500' : ''}`} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center rounded-full bg-rose-500 text-white text-[10px] font-bold shadow-md">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Drawer Trigger */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-gradient-to-r from-brand-500 to-teal-400 hover:from-brand-400 hover:to-teal-300 text-slate-950 font-bold text-sm shadow-lg shadow-brand-500/20 transition-all cursor-pointer"
              aria-label="Abrir carrito"
            >
              <ShoppingBag className="w-4 h-4 text-slate-950" />
              <span className="hidden md:inline text-xs font-extrabold uppercase tracking-wider">Carrito</span>
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    key="cart-badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="flex items-center justify-center w-5 h-5 rounded-full bg-slate-950 text-brand-300 text-[11px] font-black"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Mobile Menu Burger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/5"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
              className="md:hidden px-4 pb-3 border-t border-white/5 overflow-hidden"
            >
              <div className="relative mt-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar productos, marcas o tags..."
                  className="w-full bg-slate-900 border border-white/10 rounded-xl py-2 pl-9 pr-8 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-400/20"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="p-1 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
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
              className="lg:hidden px-4 py-4 border-t border-white/10 bg-slate-950/95 space-y-3"
            >
              <div className="grid grid-cols-2 gap-2 text-sm font-medium">
                {['all', 'audio', 'wearables', 'gaming', 'workstation', 'lifestyle'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat as any);
                      setMobileMenuOpen(false);
                    }}
                    className={`p-2.5 rounded-xl text-left capitalize transition-colors ${
                      selectedCategory === cat
                        ? 'bg-brand-500/20 text-brand-300 font-bold border border-brand-500/30'
                        : 'bg-white/5 text-slate-300'
                    }`}
                  >
                    {cat === 'all' ? 'Ver Todo' : cat}
                  </button>
                ))}
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-slate-400">Moneda:</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrency('ARS')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold ${currency === 'ARS' ? 'bg-brand-500 text-black' : 'bg-white/10 text-slate-300'}`}
                  >
                    ARS
                  </button>
                  <button
                    onClick={() => setCurrency('USD')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold ${currency === 'USD' ? 'bg-brand-500 text-black' : 'bg-white/10 text-slate-300'}`}
                  >
                    USD
                  </button>
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setIsDocsOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl bg-white/5 text-slate-200 text-sm font-semibold"
                >
                  <BookOpen className="w-4 h-4 text-brand-400" />
                  <span>Documentación Arquitectura</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

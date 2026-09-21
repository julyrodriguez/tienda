import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  CreditCard,
  Sparkles,
  Zap,
  Star,
  Layers,
  ChevronRight
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const HeroSection: React.FC = () => {
  const { products, setQuickViewProduct, addToCart, formatPrice } = useStore();
  const heroProduct = products[0]; // Aura Sound ANC Pro

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24 border-b border-white/[0.06]">
      {/* Background ambient lighting effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-brand-500/20 via-electric-violet/20 to-transparent blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-cyan-500/10 blur-[100px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 -left-20 w-96 h-96 bg-violet-600/10 blur-[100px] pointer-events-none rounded-full" />

      {/* Grid Pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Description & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Pill Tag */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/30 text-xs font-semibold text-brand-300 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-400 animate-spin" style={{ animationDuration: '8s' }} />
              <span>Nueva Colección 2026 • Sonido & Wearables de Cero Compromiso</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display font-extrabold text-4xl sm:text-6xl lg:text-6xl tracking-tight leading-[1.1]"
            >
              Tecnología de élite,{' '}
              <span className="text-gradient">
                diseñada para trascender.
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal"
            >
              Arquitectura de e-commerce ultrarrápida inspirada en los estándares de Tiendanube y Shopify Headless. Experiencias inmersivas, checkout optimizado en 3 pasos y envíos prioritarios en 24 horas.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <a
                href="#catalogo"
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl bg-gradient-to-r from-brand-500 via-teal-400 to-cyan-400 hover:from-brand-400 hover:to-cyan-300 text-slate-950 font-bold text-sm shadow-xl shadow-brand-500/25 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
              >
                <span>Explorar Catálogo</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              {heroProduct && (
                <button
                  onClick={() => setQuickViewProduct(heroProduct)}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-white/10 hover:border-white/20 font-semibold text-sm transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                >
                  <span>Ver Producto Estrella</span>
                  <ChevronRight className="w-4 h-4 text-brand-400" />
                </button>
              )}
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="pt-6 grid grid-cols-3 gap-3 border-t border-white/10 max-w-lg mx-auto lg:mx-0"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-brand-500/10 text-brand-400">
                  <Truck className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-white">Envío Flash 24h</p>
                  <p className="text-[11px] text-slate-400">Todo el país</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-violet-500/10 text-violet-400">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-white">Hasta 12 Cuotas</p>
                  <p className="text-[11px] text-slate-400">Tarjetas y MP</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-white">Garantía 2 Años</p>
                  <p className="text-[11px] text-slate-400">Oficial Aura</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Hero Product Interactive 3D Card */}
          <div className="lg:col-span-5 relative">
            {heroProduct && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="relative mx-auto max-w-md group"
              >
                {/* Glowing Outer Card aura */}
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-brand-500 via-electric-violet to-cyan-500 opacity-30 group-hover:opacity-60 blur-xl transition duration-700" />

                <div className="relative glass-panel rounded-3xl p-6 sm:p-7 overflow-hidden border border-white/15 bg-gradient-to-b from-[#131625]/90 to-[#0c0d16]/95">
                  
                  {/* Top Product Badges */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                      <Zap className="w-3 h-3 fill-emerald-300" />
                      DROP EXCLUSIVO
                    </span>
                    <div className="flex items-center gap-1 text-amber-400 text-xs font-bold bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20">
                      <Star className="w-3 h-3 fill-amber-400" />
                      <span>{heroProduct.rating}</span>
                      <span className="text-slate-400 font-normal">({heroProduct.reviewCount})</span>
                    </div>
                  </div>

                  {/* Main Product Image with subtle floating animation */}
                  <div className="relative aspect-square rounded-2xl overflow-hidden mb-6 bg-slate-950/40 p-4 flex items-center justify-center">
                    <motion.img
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                      src={heroProduct.images[0]}
                      alt={heroProduct.title}
                      className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Floating Floating tag */}
                    <div className="absolute bottom-3 left-3 bg-[#08090E]/80 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-xl text-[11px] font-medium text-slate-200 shadow-lg">
                      🎧 Berilio Puro 40mm • LDAC 990kbps
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-xl font-bold font-display text-white group-hover:text-brand-300 transition-colors">
                        {heroProduct.title}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                        {heroProduct.subtitle}
                      </p>
                    </div>

                    {/* Price and Cuotas */}
                    <div className="flex items-baseline justify-between pt-2 border-t border-white/10">
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-black font-display text-white">
                            {formatPrice(heroProduct.promoPrice || heroProduct.price)}
                          </span>
                          {heroProduct.promoPrice && (
                            <span className="text-xs text-slate-400 line-through">
                              {formatPrice(heroProduct.price)}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] font-semibold text-emerald-400">
                          6 cuotas sin interés de {formatPrice((heroProduct.promoPrice || heroProduct.price) / 6)}
                        </p>
                      </div>

                      {/* Quick Add CTA */}
                      <button
                        onClick={() => addToCart(heroProduct)}
                        className="px-4 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-400 text-slate-950 font-bold text-xs shadow-md transition-transform active:scale-95 cursor-pointer"
                      >
                        Comprar Ya
                      </button>
                    </div>
                  </div>

                </div>
              </motion.div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

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
  ChevronRight
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const HeroSection: React.FC = () => {
  const { products, setQuickViewProduct, addToCart, formatPrice, setCurrentView } = useStore();
  const heroProduct = products[0]; // Aura Sound ANC Pro

  return (
    <section className="relative overflow-hidden pt-6 pb-12 sm:pt-12 sm:pb-20 border-b border-[#E8E1D5] bg-[#FAF7F2]">
      {/* High-performance CSS radial ambient gradients (Zero blur lag) */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] pointer-events-none rounded-full"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(234, 219, 200, 0.55) 0%, rgba(244, 236, 224, 0.25) 45%, rgba(250, 247, 242, 0) 75%)'
        }}
      />

      {/* Grid Pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #1C1917 1px, transparent 0)`,
          backgroundSize: '28px 28px'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-center lg:text-left">
            
            {/* Pill Tag */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-[#F4ECE0] border border-[#E8E1D5] text-[11px] sm:text-xs font-bold text-[#78350F] shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C25E38]" />
              <span>Colección Minimalista 2026 • Sonido & Wearables de Precisión</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
              className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.15] text-[#1C1917]"
            >
              Tecnología de élite,{' '}
              <span className="text-gradient-warm">
                en su expresión más pura.
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
              className="text-[#57534E] text-sm sm:text-base lg:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal"
            >
              Tu tienda de electrónica de vanguardia 100% personalizada. Dispositivos de audio Hi-Fi, wearables y periféricos premium configurados a tu medida, con atención exclusiva, garantía oficial y envíos prioritarios a todo el país.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-1 sm:pt-2"
            >
              <button
                onClick={() => {
                  setCurrentView('catalog');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 sm:py-4 rounded-2xl bg-[#1C1917] hover:bg-[#292524] text-[#FAF7F2] font-bold text-xs sm:text-sm shadow-md transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <span>Explorar Catálogo</span>
                <ArrowRight className="w-4 h-4 text-[#DEC9AE]" />
              </button>

              {heroProduct && (
                <button
                  onClick={() => setQuickViewProduct(heroProduct)}
                  className="flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 sm:py-4 rounded-2xl bg-[#FFFFFF] hover:bg-[#F4ECE0] text-[#1C1917] border border-[#E8E1D5] font-bold text-xs sm:text-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shadow-xs"
                >
                  <span>Ver Producto Estrella</span>
                  <ChevronRight className="w-4 h-4 text-[#C25E38]" />
                </button>
              )}
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
              className="pt-4 sm:pt-6 grid grid-cols-3 gap-2 sm:gap-3 border-t border-[#E8E1D5] max-w-lg mx-auto lg:mx-0"
            >
              <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-1.5 sm:gap-2.5">
                <div className="p-2 rounded-xl bg-[#F4ECE0] text-[#0F766E] border border-[#E8E1D5]">
                  <Truck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div>
                  <p className="text-[11px] sm:text-xs font-bold text-[#1C1917]">Envío 24h</p>
                  <p className="text-[10px] sm:text-[11px] text-[#78716C]">A todo el país</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-1.5 sm:gap-2.5">
                <div className="p-2 rounded-xl bg-[#F4ECE0] text-[#78350F] border border-[#E8E1D5]">
                  <CreditCard className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div>
                  <p className="text-[11px] sm:text-xs font-bold text-[#1C1917]">Hasta 12 Cuotas</p>
                  <p className="text-[10px] sm:text-[11px] text-[#78716C]">Tarjetas & MP</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-1.5 sm:gap-2.5">
                <div className="p-2 rounded-xl bg-[#F4ECE0] text-[#C25E38] border border-[#E8E1D5]">
                  <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div>
                  <p className="text-[11px] sm:text-xs font-bold text-[#1C1917]">Garantía 2 Años</p>
                  <p className="text-[10px] sm:text-[11px] text-[#78716C]">Oficial Aura</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Hero Spotlight Card with Compositor CSS Floating */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            {heroProduct && (
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 25 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
                className="relative mx-auto max-w-sm sm:max-w-md group gpu-layer"
              >
                {/* Subtle soft glow */}
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#EADBC8] via-[#DEC9AE] to-[#C25E38]/20 opacity-40 group-hover:opacity-70 blur-md transition duration-500 pointer-events-none" />

                <div className="relative rounded-3xl p-5 sm:p-7 overflow-hidden border border-[#E8E1D5] bg-[#FFFFFF] shadow-lg transition-all duration-300 hover:shadow-xl">
                  
                  {/* Top Product Badges */}
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#EADBC8]/60 text-[#78350F] text-[10px] sm:text-xs font-black uppercase tracking-wider border border-[#DEC9AE]">
                      <Zap className="w-3 h-3 text-[#C25E38]" />
                      DROP EXCLUSIVO
                    </span>
                    <div className="flex items-center gap-1 text-[#78350F] text-xs font-bold bg-[#FAF7F2] px-2.5 py-1 rounded-full border border-[#E8E1D5]">
                      <Star className="w-3 h-3 fill-[#D97706] text-[#D97706]" />
                      <span>{heroProduct.rating}</span>
                      <span className="text-[#A8A29E] font-normal">({heroProduct.reviewCount})</span>
                    </div>
                  </div>

                  {/* Main Product Image with subtle float */}
                  <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 sm:mb-6 bg-[#FAF7F2] p-3 flex items-center justify-center border border-[#E8E1D5]/60">
                    <motion.img
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                      src={heroProduct.images[0]}
                      alt={heroProduct.title}
                      decoding="async"
                      className="w-full h-full object-cover rounded-xl group-hover:scale-103 transition-transform duration-300 ease-out"
                    />
                    
                    <div className="absolute bottom-3 left-3 bg-[#FFFFFF] border border-[#E8E1D5] px-2.5 py-1 rounded-xl text-[10px] sm:text-[11px] font-semibold text-[#1C1917] shadow-xs">
                      🎧 Berilio Puro 40mm • LDAC Lossless
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="space-y-2 sm:space-y-3">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold font-display text-[#1C1917] group-hover:text-[#C25E38] transition-colors">
                        {heroProduct.title}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-[#78716C] line-clamp-1 mt-0.5">
                        {heroProduct.subtitle}
                      </p>
                    </div>

                    {/* Price and Cuotas */}
                    <div className="flex items-baseline justify-between pt-2 border-t border-[#E8E1D5]">
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl sm:text-2xl font-black font-display text-[#1C1917]">
                            {formatPrice(heroProduct.promoPrice || heroProduct.price)}
                          </span>
                          {heroProduct.promoPrice && (
                            <span className="text-xs text-[#A8A29E] line-through">
                              {formatPrice(heroProduct.price)}
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] sm:text-[11px] font-bold text-[#0F766E]">
                          6 cuotas sin interés de {formatPrice((heroProduct.promoPrice || heroProduct.price) / 6)}
                        </p>
                      </div>

                      <button
                        onClick={() => addToCart(heroProduct)}
                        className="px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-[#1C1917] hover:bg-[#292524] text-[#FAF7F2] font-bold text-xs shadow-xs transition-transform active:scale-95 cursor-pointer"
                      >
                        Comprar
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

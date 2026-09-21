import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Star,
  Truck,
  ShieldCheck,
  CreditCard,
  Check,
  ShoppingBag,
  Heart,
  Share2,
  MapPin,
  ChevronRight,
  Zap,
  Info
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductVariant } from '../types/store';

export const ProductQuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    formatPrice,
    isWishlisted,
    toggleWishlist,
    addToast
  } = useStore();

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);
  const [postalCode, setPostalCode] = useState('');
  const [shippingCalculation, setShippingCalculation] = useState<{
    calculated: boolean;
    locationName?: string;
    options?: { name: string; time: string; price: number; free: boolean }[];
  }>({ calculated: false });

  // Update selected variant when product changes
  React.useEffect(() => {
    if (quickViewProduct?.variants && quickViewProduct.variants.length > 0) {
      setSelectedVariant(quickViewProduct.variants[0]);
    } else {
      setSelectedVariant(undefined);
    }
    setActiveImageIdx(0);
    setQuantity(1);
    setShippingCalculation({ calculated: false });
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const currentPrice = selectedVariant?.promoPrice ?? selectedVariant?.price ?? quickViewProduct.promoPrice ?? quickViewProduct.price;
  const originalPrice = selectedVariant?.price ?? quickViewProduct.price;
  const hasDiscount = Boolean(quickViewProduct.promoPrice || (selectedVariant && selectedVariant.promoPrice));
  const isFavorite = isWishlisted(quickViewProduct.id);

  // Postal code simulation
  const handleCalculateShipping = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postalCode.trim()) return;

    let loc = 'Buenos Aires & Gran Buenos Aires';
    const num = parseInt(postalCode);
    if (num >= 5000 && num < 6000) loc = 'Córdoba y Región Centro';
    else if (num >= 2000 && num < 3000) loc = 'Santa Fe y Rosario';
    else if (num >= 8000) loc = 'Patagonia / Sur';
    else if (num >= 4000) loc = 'NOA / Norte Argentino';

    setShippingCalculation({
      calculated: true,
      locationName: loc,
      options: [
        {
          name: 'Envío Estándar a Domicilio (Correo Argentino)',
          time: 'Llega en 2 a 4 días hábiles',
          price: 4900,
          free: quickViewProduct.freeShipping || currentPrice >= 250000
        },
        {
          name: 'Envío Prioritario Express (Andreani Flash)',
          time: 'Llega mañana antes de las 18:00hs',
          price: 8500,
          free: false
        },
        {
          name: 'Punto de Retiro Oficial AURA (Palermo Soho)',
          time: 'Listo para retirar en 2 horas',
          price: 0,
          free: true
        }
      ]
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: quickViewProduct.title,
        text: quickViewProduct.subtitle,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      addToast({
        type: 'info',
        title: 'Enlace copiado al portapapeles',
        description: 'Compártelo con quien quieras.',
      });
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setQuickViewProduct(null)}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#10121D] border border-white/15 shadow-2xl p-6 sm:p-8"
        >
          {/* Close Button */}
          <button
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer z-20"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left: Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-950/60 border border-white/10 p-2 flex items-center justify-center">
                <img
                  src={selectedVariant?.image || quickViewProduct.images[activeImageIdx] || quickViewProduct.images[0]}
                  alt={quickViewProduct.title}
                  className="w-full h-full object-cover rounded-xl"
                />

                {quickViewProduct.freeShipping && (
                  <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold backdrop-blur-md">
                    <Truck className="w-3.5 h-3.5" />
                    <span>Envío Gratis</span>
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {quickViewProduct.images.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {quickViewProduct.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIdx(idx)}
                      className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                        activeImageIdx === idx ? 'border-brand-400 scale-105' : 'border-white/10 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Features list */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-brand-400" />
                  Especificaciones Clave
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-400">
                  {quickViewProduct.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: Info, Variants, Shipping, CTA */}
            <div className="flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                {/* Rating & Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center text-amber-400 text-xs font-bold bg-amber-400/10 px-2.5 py-1 rounded-full">
                      <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" />
                      <span>{quickViewProduct.rating}</span>
                    </div>
                    <span className="text-xs text-slate-400">({quickViewProduct.reviewCount} opiniones verificadas)</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleWishlist(quickViewProduct.id)}
                      className="p-2 rounded-xl bg-white/5 hover:bg-rose-500/10 text-slate-300 hover:text-rose-400 transition-colors"
                      title="Guardar en favoritos"
                    >
                      <Heart className={`w-4 h-4 ${isFavorite ? 'text-rose-500 fill-rose-500' : ''}`} />
                    </button>
                    <button
                      onClick={handleShare}
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                      title="Compartir enlace"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Title & Subtitle */}
                <div>
                  <span className="text-xs font-bold text-brand-400 uppercase tracking-wider">
                    {quickViewProduct.category}
                  </span>
                  <h2 className="font-display font-black text-2xl text-white mt-1">
                    {quickViewProduct.title}
                  </h2>
                  <p className="text-sm text-slate-400 mt-1 leading-relaxed">
                    {quickViewProduct.description}
                  </p>
                </div>

                {/* Price Display & Installments breakdown */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-950 border border-white/10">
                  <div className="flex items-baseline gap-3">
                    <span className="font-display font-black text-3xl text-white">
                      {formatPrice(currentPrice)}
                    </span>
                    {hasDiscount && (
                      <span className="text-sm text-slate-400 line-through">
                        {formatPrice(originalPrice)}
                      </span>
                    )}
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-xs font-semibold text-emerald-400">
                    <CreditCard className="w-4 h-4" />
                    <span>6 cuotas sin interés de {formatPrice(currentPrice / 6)}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    o <span className="text-brand-300 font-bold">{formatPrice(currentPrice * 0.85)}</span> (15% OFF) abonando por Transferencia / Depósito
                  </p>
                </div>

                {/* Variants Selector */}
                {quickViewProduct.variants && quickViewProduct.variants.length > 0 && (
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                      Selecciona Modelo / Acabado:
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {quickViewProduct.variants.map((v) => (
                        <button
                          key={v.id}
                          onClick={() => setSelectedVariant(v)}
                          className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer flex items-center justify-between ${
                            selectedVariant?.id === v.id
                              ? 'border-brand-400 bg-brand-500/10 text-white font-bold'
                              : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className="w-3.5 h-3.5 rounded-full border border-white/30"
                              style={{ backgroundColor: v.colorHex || '#94a3b8' }}
                            />
                            <span>{v.name}</span>
                          </div>
                          <span className="text-[10px] text-slate-400">{v.stock} disp.</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Shipping Calculator (Tiendanube style) */}
                <div className="pt-2 border-t border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <span className="font-bold flex items-center gap-1.5">
                      <Truck className="w-4 h-4 text-brand-400" />
                      Calcular Costo y Plazo de Envío
                    </span>
                    <span className="text-[10px] text-slate-500">Ej: 1425, 5000, 2000</span>
                  </div>

                  <form onSubmit={handleCalculateShipping} className="flex gap-2">
                    <div className="relative flex-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Código Postal (CP)"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        className="w-full bg-slate-900 border border-white/10 rounded-xl py-2 pl-8 pr-3 text-xs text-white focus:outline-none focus:border-brand-400"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors cursor-pointer"
                    >
                      Calcular
                    </button>
                  </form>

                  {shippingCalculation.calculated && shippingCalculation.options && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="p-3 rounded-xl bg-slate-900/90 border border-white/10 space-y-2 text-xs"
                    >
                      <p className="font-bold text-brand-300 text-[11px]">
                        Destino: {shippingCalculation.locationName}
                      </p>
                      {shippingCalculation.options.map((opt, i) => (
                        <div key={i} className="flex items-center justify-between border-b border-white/5 pb-1.5 last:border-0 last:pb-0">
                          <div>
                            <p className="font-semibold text-slate-200">{opt.name}</p>
                            <p className="text-[10px] text-slate-400">{opt.time}</p>
                          </div>
                          <span className={`font-bold ${opt.free ? 'text-emerald-400' : 'text-slate-200'}`}>
                            {opt.free ? 'GRATIS' : formatPrice(opt.price)}
                          </span>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Quantity and Add to Cart Button */}
              <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                {/* Quantity selector */}
                <div className="flex items-center bg-slate-900 border border-white/10 rounded-2xl p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-sm font-bold text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    +
                  </button>
                </div>

                {/* Add to cart CTA */}
                <button
                  onClick={() => {
                    addToCart(quickViewProduct, selectedVariant, quantity);
                    setQuickViewProduct(null);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-brand-500 via-teal-400 to-cyan-400 hover:from-brand-400 hover:to-cyan-300 text-slate-950 font-black text-sm shadow-xl shadow-brand-500/20 transition-all cursor-pointer active:scale-98"
                >
                  <ShoppingBag className="w-4 h-4 text-slate-950" />
                  <span>Agregar al Carrito • {formatPrice(currentPrice * quantity)}</span>
                </button>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

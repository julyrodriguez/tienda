import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Star,
  Truck,
  CreditCard,
  Check,
  ShoppingBag,
  Heart,
  Share2,
  MapPin,
  Zap
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

  const handleCalculateShipping = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postalCode.trim()) return;

    let loc = 'Buenos Aires & CABA';
    const num = parseInt(postalCode);
    if (num >= 5000 && num < 6000) loc = 'Córdoba & Centro';
    else if (num >= 2000 && num < 3000) loc = 'Santa Fe & Rosario';
    else if (num >= 8000) loc = 'Patagonia';
    else if (num >= 4000) loc = 'NOA / Norte';

    setShippingCalculation({
      calculated: true,
      locationName: loc,
      options: [
        {
          name: 'Correo Argentino a Domicilio',
          time: '2 a 4 días hábiles',
          price: 4900,
          free: quickViewProduct.freeShipping || currentPrice >= 250000
        },
        {
          name: 'Andreani Flash Prioritario',
          time: 'Llega mañana antes de 18hs',
          price: 8500,
          free: false
        },
        {
          name: 'Punto Pick-up Palermo (Gratis)',
          time: 'Listo en 2 horas',
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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 md:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setQuickViewProduct(null)}
          className="fixed inset-0 bg-[#1C1917]/60 backdrop-blur-sm"
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative z-10 w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#FFFFFF] border border-[#E8E1D5] shadow-2xl p-4 sm:p-6 md:p-8 text-[#1C1917]"
        >
          {/* Close Button */}
          <button
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-[#FAF7F2] hover:bg-[#F4ECE0] text-[#78716C] hover:text-[#1C1917] transition-colors cursor-pointer z-20 border border-[#E8E1D5]"
            aria-label="Cerrar"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Left: Gallery */}
            <div className="space-y-3 sm:space-y-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#FAF7F2] border border-[#E8E1D5] p-2 flex items-center justify-center">
                <img
                  src={selectedVariant?.image || quickViewProduct.images[activeImageIdx] || quickViewProduct.images[0]}
                  alt={quickViewProduct.title}
                  className="w-full h-full object-cover rounded-xl"
                />

                {quickViewProduct.freeShipping && (
                  <div className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FFFFFF]/90 border border-[#E8E1D5] text-[#0F766E] text-[10px] sm:text-xs font-bold backdrop-blur-md">
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
                      className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                        activeImageIdx === idx ? 'border-[#1C1917] scale-105' : 'border-[#E8E1D5] opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Features list */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8E1D5] space-y-2">
                <h4 className="text-[11px] font-extrabold text-[#78350F] uppercase tracking-wider flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-[#C25E38]" />
                  Especificaciones Principales
                </h4>
                <ul className="space-y-1.5 text-xs text-[#57534E]">
                  {quickViewProduct.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#0F766E] mt-0.5 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: Info, Variants, Shipping, CTA */}
            <div className="flex flex-col justify-between space-y-4 sm:space-y-6">
              <div className="space-y-3 sm:space-y-4">
                {/* Rating & Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center text-[#78350F] text-xs font-bold bg-[#FAF7F2] border border-[#E8E1D5] px-2.5 py-1 rounded-full">
                      <Star className="w-3.5 h-3.5 fill-[#D97706] text-[#D97706] mr-1" />
                      <span>{quickViewProduct.rating}</span>
                    </div>
                    <span className="text-[11px] sm:text-xs text-[#78716C]">({quickViewProduct.reviewCount} opiniones)</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => toggleWishlist(quickViewProduct.id)}
                      className="p-2 rounded-xl bg-[#FAF7F2] hover:bg-rose-50 text-[#78716C] hover:text-rose-600 transition-colors border border-[#E8E1D5]"
                      title="Favorito"
                    >
                      <Heart className={`w-4 h-4 ${isFavorite ? 'text-rose-500 fill-rose-500' : ''}`} />
                    </button>
                    <button
                      onClick={handleShare}
                      className="p-2 rounded-xl bg-[#FAF7F2] hover:bg-[#F4ECE0] text-[#78716C] hover:text-[#1C1917] transition-colors border border-[#E8E1D5]"
                      title="Compartir"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Title & Subtitle */}
                <div>
                  <span className="text-[10px] sm:text-xs font-extrabold text-[#C25E38] uppercase tracking-wider">
                    {quickViewProduct.category}
                  </span>
                  <h2 className="font-display font-black text-xl sm:text-2xl text-[#1C1917] mt-0.5">
                    {quickViewProduct.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#57534E] mt-1 leading-relaxed">
                    {quickViewProduct.description}
                  </p>
                </div>

                {/* Price Display */}
                <div className="p-3.5 sm:p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8E1D5]">
                  <div className="flex items-baseline gap-2.5">
                    <span className="font-display font-black text-2xl sm:text-3xl text-[#1C1917]">
                      {formatPrice(currentPrice)}
                    </span>
                    {hasDiscount && (
                      <span className="text-xs sm:text-sm text-[#A8A29E] line-through">
                        {formatPrice(originalPrice)}
                      </span>
                    )}
                  </div>
                  <div className="mt-1.5 flex items-center gap-1.5 text-xs font-bold text-[#0F766E]">
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>6 cuotas sin interés de {formatPrice(currentPrice / 6)}</span>
                  </div>
                  <p className="text-[11px] text-[#78716C] mt-1">
                    o <strong className="text-[#1C1917]">{formatPrice(currentPrice * 0.85)}</strong> (15% OFF) con Transferencia Bancaria
                  </p>
                </div>

                {/* Variants Selector */}
                {quickViewProduct.variants && quickViewProduct.variants.length > 0 && (
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-extrabold text-[#57534E] uppercase tracking-wider block">
                      Selecciona Acabado:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {quickViewProduct.variants.map((v) => (
                        <button
                          key={v.id}
                          onClick={() => setSelectedVariant(v)}
                          className={`p-2.5 sm:p-3 rounded-xl border text-left text-xs transition-all cursor-pointer flex items-center justify-between ${
                            selectedVariant?.id === v.id
                              ? 'border-[#1C1917] bg-[#EADBC8]/40 text-[#1C1917] font-bold'
                              : 'border-[#E8E1D5] bg-[#FFFFFF] text-[#57534E] hover:border-[#BA9971]'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className="w-3 h-3 rounded-full border border-black/10"
                              style={{ backgroundColor: v.colorHex || '#A8A29E' }}
                            />
                            <span>{v.name}</span>
                          </div>
                          <span className="text-[10px] text-[#78716C]">{v.stock} disp.</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Shipping Calculator */}
                <div className="pt-2 border-t border-[#E8E1D5] space-y-2">
                  <div className="flex items-center justify-between text-xs text-[#57534E]">
                    <span className="font-bold flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5 text-[#C25E38]" />
                      Calcular Costo de Envío
                    </span>
                    <span className="text-[10px] text-[#A8A29E]">Ej: 1425, 5000, 2000</span>
                  </div>

                  <form onSubmit={handleCalculateShipping} className="flex gap-2">
                    <div className="relative flex-1">
                      <MapPin className="w-3 h-3 text-[#A8A29E] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Código Postal (CP)"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        className="w-full bg-[#FAF7F2] border border-[#E8E1D5] rounded-xl py-2 pl-8 pr-3 text-xs text-[#1C1917] focus:outline-none focus:border-[#BA9971]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-3.5 py-2 rounded-xl bg-[#FAF7F2] hover:bg-[#F4ECE0] text-[#1C1917] border border-[#E8E1D5] text-xs font-bold transition-colors cursor-pointer"
                    >
                      Calcular
                    </button>
                  </form>

                  {shippingCalculation.calculated && shippingCalculation.options && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E8E1D5] space-y-1.5 text-xs"
                    >
                      <p className="font-bold text-[#78350F] text-[11px]">
                        Destino: {shippingCalculation.locationName}
                      </p>
                      {shippingCalculation.options.map((opt, i) => (
                        <div key={i} className="flex items-center justify-between border-b border-[#E8E1D5]/60 pb-1 last:border-0 last:pb-0">
                          <div>
                            <p className="font-semibold text-[#1C1917] text-[11px]">{opt.name}</p>
                            <p className="text-[10px] text-[#78716C]">{opt.time}</p>
                          </div>
                          <span className={`font-bold text-xs ${opt.free ? 'text-[#0F766E]' : 'text-[#1C1917]'}`}>
                            {opt.free ? 'GRATIS' : formatPrice(opt.price)}
                          </span>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Quantity and Add CTA */}
              <div className="pt-3 border-t border-[#E8E1D5] flex items-center gap-2 sm:gap-3">
                {/* Quantity */}
                <div className="flex items-center bg-[#FAF7F2] border border-[#E8E1D5] rounded-2xl p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-xl flex items-center justify-center text-[#57534E] hover:text-[#1C1917] hover:bg-[#FFFFFF] transition-colors"
                  >
                    -
                  </button>
                  <span className="w-7 text-center text-xs font-bold text-[#1C1917]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-xl flex items-center justify-center text-[#57534E] hover:text-[#1C1917] hover:bg-[#FFFFFF] transition-colors"
                  >
                    +
                  </button>
                </div>

                {/* Add to cart */}
                <button
                  onClick={() => {
                    addToCart(quickViewProduct, selectedVariant, quantity);
                    setQuickViewProduct(null);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-[#1C1917] hover:bg-[#292524] text-[#FAF7F2] font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer active:scale-98"
                >
                  <ShoppingBag className="w-4 h-4 text-[#DEC9AE]" />
                  <span>Agregar • {formatPrice(currentPrice * quantity)}</span>
                </button>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

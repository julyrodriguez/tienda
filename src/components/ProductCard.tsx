import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Heart,
  Eye,
  ShoppingBag,
  Star,
  Check,
  Zap,
  Truck
} from 'lucide-react';
import { Product, ProductVariant } from '../types/store';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    formatPrice,
    addToCart,
    setQuickViewProduct,
    isWishlisted,
    toggleWishlist
  } = useStore();

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product.variants && product.variants.length > 0 ? product.variants[0] : undefined
  );
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const isFavorite = isWishlisted(product.id);
  const currentPrice = selectedVariant?.promoPrice ?? selectedVariant?.price ?? product.promoPrice ?? product.price;
  const originalPrice = selectedVariant?.price ?? product.price;
  const hasDiscount = Boolean(product.promoPrice || (selectedVariant && selectedVariant.promoPrice));
  const discountPercent = hasDiscount ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100) : 0;
  
  const displayImage = selectedVariant?.image || product.images[currentImageIndex] || product.images[0];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="group relative flex flex-col rounded-3xl bg-[#10121D] border border-white/[0.08] hover:border-brand-500/40 shadow-xl hover:shadow-2xl hover:shadow-brand-500/10 transition-all duration-300 overflow-hidden"
    >
      {/* Top Badges & Quick Action Floating Buttons */}
      <div className="relative aspect-square w-full overflow-hidden bg-slate-950/40 p-3 flex items-center justify-center">
        
        {/* Badges container */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
          {hasDiscount && (
            <span className="px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-rose-500 text-white shadow-md">
              -{discountPercent}% OFF
            </span>
          )}
          {product.isBestSeller && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-amber-400 text-slate-950 shadow-md flex items-center gap-1">
              <Zap className="w-3 h-3 fill-slate-950" />
              TOP VENTAS
            </span>
          )}
          {product.isNew && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-brand-500 text-slate-950 shadow-md">
              NUEVO
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <motion.button
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.85 }}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute top-3 right-3 z-10 p-2.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 text-slate-300 hover:text-rose-400 transition-colors cursor-pointer shadow-lg"
          aria-label="Agregar a favoritos"
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'text-rose-500 fill-rose-500' : ''}`} />
        </motion.button>

        {/* Product Image */}
        <img
          src={displayImage}
          alt={product.title}
          className="w-full h-full object-cover rounded-2xl group-hover:scale-108 transition-transform duration-500"
          loading="lazy"
        />

        {/* Quick View Hover Overlay Button */}
        <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setQuickViewProduct(product)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-slate-950 font-bold text-xs shadow-2xl hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <Eye className="w-4 h-4" />
            <span>Vista Rápida</span>
          </motion.button>
        </div>

        {/* Free Shipping Tag bottom */}
        {product.freeShipping && (
          <div className="absolute bottom-2 left-2 z-10 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-950/80 backdrop-blur-md border border-emerald-500/30 text-[10px] font-bold text-emerald-300">
            <Truck className="w-3 h-3 text-emerald-400" />
            <span>Envío Gratis</span>
          </div>
        )}
      </div>

      {/* Product Content Details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Rating and category */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="uppercase tracking-wider font-semibold text-[10px] text-brand-400">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-amber-400 font-bold text-[11px]">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{product.rating}</span>
              <span className="text-slate-500 font-normal">({product.reviewCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3
            onClick={() => setQuickViewProduct(product)}
            className="font-display font-bold text-base text-slate-100 group-hover:text-brand-300 transition-colors cursor-pointer line-clamp-1"
          >
            {product.title}
          </h3>

          <p className="text-xs text-slate-400 line-clamp-2 mt-1 font-normal leading-relaxed">
            {product.subtitle}
          </p>

          {/* Color Variants Pills if available */}
          {product.variants && product.variants.length > 0 && (
            <div className="flex items-center gap-1.5 mt-3 pt-2 border-t border-white/5">
              <span className="text-[10px] font-semibold text-slate-400 mr-1">Versión:</span>
              {product.variants.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVariant(v)}
                  title={v.name}
                  className={`w-4 h-4 rounded-full border-2 transition-all cursor-pointer ${
                    selectedVariant?.id === v.id
                      ? 'border-brand-400 scale-125'
                      : 'border-white/20 hover:border-white/60'
                  }`}
                  style={{ backgroundColor: v.colorHex || '#94a3b8' }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Pricing, Installments and Add Button */}
        <div className="pt-3 border-t border-white/[0.08] space-y-3">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-display font-extrabold text-xl text-white">
                {formatPrice(currentPrice)}
              </span>
              {hasDiscount && (
                <span className="text-xs text-slate-500 line-through">
                  {formatPrice(originalPrice)}
                </span>
              )}
            </div>

            {/* Installments info (Tiendanube style) */}
            <p className="text-[11px] font-semibold text-emerald-400 mt-0.5">
              Hasta {product.installmentsMax} cuotas de {formatPrice(currentPrice / product.installmentsMax)}
            </p>
          </div>

          {/* Urgency Stock indicator */}
          {product.stock <= 5 && product.stock > 0 && (
            <p className="text-[11px] text-amber-400 font-semibold flex items-center gap-1 animate-pulse">
              <Zap className="w-3 h-3" />
              ¡Solo quedan {product.stock} unidades en bodega!
            </p>
          )}

          {/* Add to Cart Button */}
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => addToCart(product, selectedVariant, 1)}
            disabled={product.stock === 0}
            className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl font-bold text-xs tracking-wide transition-all duration-200 cursor-pointer shadow-md ${
              product.stock > 0
                ? 'bg-brand-500 hover:bg-brand-400 text-slate-950 shadow-brand-500/20 hover:shadow-brand-500/30'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{product.stock > 0 ? 'Agregar al Carrito' : 'Agotado Temporal'}</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

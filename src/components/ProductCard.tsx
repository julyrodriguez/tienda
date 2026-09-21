import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Heart,
  Eye,
  ShoppingBag,
  Star,
  Zap,
  Truck
} from 'lucide-react';
import { Product, ProductVariant } from '../types/store';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, index = 0 }) => {
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
  const [currentImageIndex] = useState(0);

  const isFavorite = isWishlisted(product.id);
  const currentPrice = selectedVariant?.promoPrice ?? selectedVariant?.price ?? product.promoPrice ?? product.price;
  const originalPrice = selectedVariant?.price ?? product.price;
  const hasDiscount = Boolean(product.promoPrice || (selectedVariant && selectedVariant.promoPrice));
  const discountPercent = hasDiscount ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100) : 0;
  
  const displayImage = selectedVariant?.image || product.images[currentImageIndex] || product.images[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.45,
        delay: Math.min(index * 0.05, 0.4),
        ease: 'easeOut'
      }}
      className="group relative flex flex-col rounded-3xl bg-[#FFFFFF] border border-[#E8E1D5] hover:border-[#BA9971] shadow-xs hover:shadow-lg transition-all duration-200 ease-out hover:-translate-y-1 overflow-hidden gpu-layer"
    >
      {/* Top Image Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#FAF7F2] p-2 sm:p-3 flex items-center justify-center">
        
        {/* Badges container */}
        <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1 items-start">
          {hasDiscount && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#C25E38] text-white shadow-xs">
              -{discountPercent}% OFF
            </span>
          )}
          {product.isBestSeller && (
            <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider bg-[#EADBC8] text-[#78350F] border border-[#DEC9AE] shadow-xs flex items-center gap-1">
              <Zap className="w-2.5 h-2.5 text-[#C25E38]" />
              TOP
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute top-2.5 right-2.5 z-10 p-2 rounded-full bg-[#FFFFFF] border border-[#E8E1D5] text-[#78716C] hover:text-rose-600 transition-transform active:scale-90 cursor-pointer shadow-xs"
          aria-label="Agregar a favoritos"
        >
          <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isFavorite ? 'text-rose-500 fill-rose-500' : ''}`} />
        </button>

        {/* Product Image */}
        <img
          src={displayImage}
          alt={product.title}
          decoding="async"
          loading="lazy"
          className="w-full h-full object-cover rounded-2xl group-hover:scale-103 transition-transform duration-300 ease-out"
        />

        {/* Quick View Hover Button */}
        <div className="absolute inset-0 bg-[#1C1917]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center p-4">
          <button
            onClick={() => setQuickViewProduct(product)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#FFFFFF] text-[#1C1917] font-bold text-xs shadow-md hover:bg-[#F4ECE0] transition-all transform active:scale-95 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Vista Rápida</span>
          </button>
        </div>

        {/* Free Shipping Tag bottom */}
        {product.freeShipping && (
          <div className="absolute bottom-2 left-2 z-10 flex items-center gap-1 px-2 py-0.5 rounded-lg bg-[#FFFFFF] border border-[#E8E1D5] text-[9px] sm:text-[10px] font-bold text-[#0F766E]">
            <Truck className="w-3 h-3 text-[#0F766E]" />
            <span>Envío Gratis</span>
          </div>
        )}
      </div>

      {/* Product Content Details */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between space-y-2 sm:space-y-3">
        <div>
          {/* Rating and category */}
          <div className="flex items-center justify-between text-xs text-[#78716C] mb-1">
            <span className="uppercase tracking-wider font-extrabold text-[9px] sm:text-[10px] text-[#78350F]">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-[#78350F] font-bold text-[10px] sm:text-[11px]">
              <Star className="w-3 h-3 fill-[#D97706] text-[#D97706]" />
              <span>{product.rating}</span>
              <span className="text-[#A8A29E] font-normal">({product.reviewCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3
            onClick={() => setQuickViewProduct(product)}
            className="font-display font-bold text-sm sm:text-base text-[#1C1917] group-hover:text-[#C25E38] transition-colors cursor-pointer line-clamp-1"
          >
            {product.title}
          </h3>

          <p className="text-[11px] sm:text-xs text-[#78716C] line-clamp-2 mt-0.5 leading-relaxed font-normal">
            {product.subtitle}
          </p>

          {/* Color Variants */}
          {product.variants && product.variants.length > 0 && (
            <div className="flex items-center gap-1.5 mt-2 pt-2 border-t border-[#E8E1D5]/60">
              <span className="text-[10px] font-bold text-[#78716C] mr-0.5">Versión:</span>
              {product.variants.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVariant(v)}
                  title={v.name}
                  className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 transition-all cursor-pointer ${
                    selectedVariant?.id === v.id
                      ? 'border-[#1C1917] scale-120'
                      : 'border-[#D8D0C5] hover:border-[#78716C]'
                  }`}
                  style={{ backgroundColor: v.colorHex || '#A8A29E' }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Pricing, Installments and Add Button */}
        <div className="pt-2 sm:pt-3 border-t border-[#E8E1D5] space-y-2">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-display font-extrabold text-base sm:text-lg text-[#1C1917]">
                {formatPrice(currentPrice)}
              </span>
              {hasDiscount && (
                <span className="text-[11px] sm:text-xs text-[#A8A29E] line-through">
                  {formatPrice(originalPrice)}
                </span>
              )}
            </div>

            <p className="text-[10px] sm:text-[11px] font-bold text-[#0F766E] mt-0.5">
              Hasta {product.installmentsMax} cuotas de {formatPrice(currentPrice / product.installmentsMax)}
            </p>
          </div>

          {/* Urgency Stock indicator */}
          {product.stock <= 5 && product.stock > 0 && (
            <p className="text-[10px] text-[#C25E38] font-bold flex items-center gap-1">
              <Zap className="w-2.5 h-2.5" />
              ¡Últimas {product.stock} unidades disponibles!
            </p>
          )}

          {/* Add to Cart Button */}
          <button
            onClick={() => addToCart(product, selectedVariant, 1)}
            disabled={product.stock === 0}
            className={`w-full flex items-center justify-center gap-1.5 py-2.5 sm:py-3 px-3 rounded-2xl font-bold text-xs tracking-wide transition-all duration-150 active:scale-97 cursor-pointer shadow-xs ${
              product.stock > 0
                ? 'bg-[#1C1917] hover:bg-[#292524] text-[#FAF7F2]'
                : 'bg-[#E8E1D5] text-[#A8A29E] cursor-not-allowed'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#DEC9AE]" />
            <span>{product.stock > 0 ? 'Agregar a Bolsa' : 'Agotado'}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

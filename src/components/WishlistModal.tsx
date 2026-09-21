import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const WishlistModal: React.FC = () => {
  const {
    isWishlistModalOpen,
    setIsWishlistModalOpen,
    wishlist,
    products,
    toggleWishlist,
    addToCart,
    formatPrice
  } = useStore();

  if (!isWishlistModalOpen) return null;

  const favoritedProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsWishlistModalOpen(false)}
          className="fixed inset-0 bg-[#1C1917]/60 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative z-10 w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl bg-[#FFFFFF] border border-[#E8E1D5] shadow-2xl p-4 sm:p-6 md:p-8 text-[#1C1917]"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 sm:pb-6 border-b border-[#E8E1D5]">
            <div className="flex items-center gap-3">
              <div className="p-2.5 sm:p-3 rounded-2xl bg-rose-50 text-rose-600 border border-rose-200">
                <Heart className="w-5 h-5 sm:w-6 sm:h-6 fill-rose-500" />
              </div>
              <div>
                <h2 className="font-display font-black text-lg sm:text-2xl text-[#1C1917]">
                  Lista de Deseos ({favoritedProducts.length})
                </h2>
                <p className="text-[11px] sm:text-xs text-[#78716C]">
                  Tus productos favoritos guardados.
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsWishlistModalOpen(false)}
              className="p-2 rounded-xl bg-[#FAF7F2] hover:bg-[#F4ECE0] text-[#78716C] hover:text-[#1C1917] transition-colors cursor-pointer border border-[#E8E1D5]"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* List */}
          <div className="py-4 space-y-2.5">
            {favoritedProducts.length > 0 ? (
              favoritedProducts.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between p-3 rounded-2xl bg-[#FAF7F2] border border-[#E8E1D5] hover:border-[#BA9971] transition-all"
                >
                  <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                    <img
                      src={p.images[0]}
                      alt={p.title}
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover bg-[#FFFFFF] border border-[#E8E1D5] shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="font-bold text-[#1C1917] text-xs sm:text-sm truncate max-w-[140px] sm:max-w-[240px]">{p.title}</h4>
                      <p className="text-xs text-[#C25E38] font-bold">
                        {formatPrice(p.promoPrice || p.price)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => {
                        addToCart(p);
                        setIsWishlistModalOpen(false);
                      }}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#1C1917] hover:bg-[#292524] text-[#FAF7F2] font-bold text-xs shadow-xs transition-colors"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-[#DEC9AE]" />
                      <span className="hidden sm:inline">Añadir</span>
                    </button>
                    <button
                      onClick={() => toggleWishlist(p.id)}
                      className="p-1.5 rounded-xl text-[#A8A29E] hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Quitar"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-10 text-center text-[#78716C] space-y-2">
                <Heart className="w-10 h-10 text-[#D8D0C5] mx-auto" />
                <p className="text-xs font-bold text-[#1C1917]">Tu lista está vacía</p>
                <p className="text-[11px] text-[#A8A29E]">
                  Pulsa el corazón en los productos del catálogo para guardarlos aquí.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

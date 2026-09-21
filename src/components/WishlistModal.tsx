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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsWishlistModalOpen(false)}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative z-10 w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl bg-[#0F111C] border border-rose-500/30 shadow-2xl p-6 sm:p-8"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
                <Heart className="w-6 h-6 fill-rose-500" />
              </div>
              <div>
                <h2 className="font-display font-black text-2xl text-white">
                  Lista de Deseos ({favoritedProducts.length})
                </h2>
                <p className="text-xs text-slate-400">
                  Tus productos guardados listos para comprar cuando quieras.
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsWishlistModalOpen(false)}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List or Empty State */}
          <div className="py-6 space-y-3">
            {favoritedProducts.length > 0 ? (
              favoritedProducts.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={p.images[0]}
                      alt={p.title}
                      className="w-14 h-14 rounded-xl object-cover bg-slate-900 border border-white/10"
                    />
                    <div>
                      <h4 className="font-bold text-white text-sm">{p.title}</h4>
                      <p className="text-xs text-brand-300 font-bold">
                        {formatPrice(p.promoPrice || p.price)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        addToCart(p);
                        setIsWishlistModalOpen(false);
                      }}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-brand-500 hover:bg-brand-400 text-slate-950 font-bold text-xs shadow-md transition-colors"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Al Carrito</span>
                    </button>
                    <button
                      onClick={() => toggleWishlist(p.id)}
                      className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                      title="Eliminar de favoritos"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-12 text-center text-slate-400 space-y-3">
                <Heart className="w-12 h-12 text-slate-600 mx-auto" />
                <p className="text-sm font-semibold">Tu lista de deseos está vacía</p>
                <p className="text-xs text-slate-500">
                  Explora el catálogo y pulsa el corazón en los productos que más te gusten.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

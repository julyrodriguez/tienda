import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Tag,
  Truck,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useStore } from '../context/StoreContext';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    freeShippingProgress,
    amountToFreeShipping,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    discountAmount,
    formatPrice,
    setIsCheckoutOpen,
    products,
    addToCart
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;

    const res = applyCoupon(couponInput);
    if (res.success) {
      setCouponError('');
      setCouponInput('');
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    } else {
      setCouponError(res.message);
    }
  };

  const finalTotal = Math.max(0, cartSubtotal - discountAmount);
  const upsellCandidates = products.filter(p => !cart.some(ci => ci.productId === p.id)).slice(0, 2);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCartOpen(false)}
          className="fixed inset-0 bg-[#1C1917]/60 backdrop-blur-sm"
        />

        {/* Drawer Panel */}
        <div className="fixed inset-y-0 right-0 max-w-full flex">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="w-screen max-w-md bg-[#FAF7F2] border-l border-[#E8E1D5] shadow-2xl flex flex-col justify-between"
          >
            {/* Drawer Header */}
            <div className="p-4 sm:p-6 border-b border-[#E8E1D5] bg-[#FFFFFF]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#C25E38]" />
                  <h2 className="font-display font-black text-base sm:text-lg text-[#1C1917]">
                    Bolsa de Compras
                  </h2>
                  <span className="px-2 py-0.5 rounded-full bg-[#EADBC8] text-[#78350F] text-xs font-bold border border-[#DEC9AE]">
                    {cart.reduce((a, b) => a + b.quantity, 0)} items
                  </span>
                </div>

                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 rounded-xl bg-[#FAF7F2] hover:bg-[#F4ECE0] text-[#78716C] hover:text-[#1C1917] transition-colors cursor-pointer border border-[#E8E1D5]"
                  aria-label="Cerrar bolsa"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>

              {/* Free Shipping Progress Meter */}
              <div className="mt-3 sm:mt-4 p-3 rounded-2xl bg-[#FAF7F2] border border-[#E8E1D5] space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  {amountToFreeShipping > 0 ? (
                    <span className="text-[#57534E] text-[11px] sm:text-xs">
                      Faltan <strong className="text-[#1C1917]">{formatPrice(amountToFreeShipping)}</strong> para{' '}
                      <span className="text-[#0F766E] font-bold">ENVÍO GRATIS</span>
                    </span>
                  ) : (
                    <span className="text-[#0F766E] font-bold text-[11px] sm:text-xs flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5" />
                      ¡Envío Gratis desbloqueado a todo el país!
                    </span>
                  )}
                  <span className="text-xs font-bold text-[#78716C]">{freeShippingProgress}%</span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 rounded-full bg-[#E8E1D5] overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${freeShippingProgress}%` }}
                    transition={{ duration: 0.5 }}
                    className="h-full rounded-full bg-gradient-to-r from-[#BA9971] via-[#C25E38] to-[#0F766E]"
                  />
                </div>
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 sm:space-y-4">
              {cart.length > 0 ? (
                <div className="space-y-3">
                  <AnimatePresence>
                    {cart.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -40 }}
                        className="flex items-center gap-3 p-3 rounded-2xl bg-[#FFFFFF] border border-[#E8E1D5] shadow-xs"
                      >
                        {/* Thumbnail */}
                        <img
                          src={item.variant?.image || item.product.images[0]}
                          alt={item.product.title}
                          className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover bg-[#FAF7F2] border border-[#E8E1D5] shrink-0"
                        />

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs sm:text-sm font-bold text-[#1C1917] truncate">
                            {item.product.title}
                          </h4>
                          {item.variant && (
                            <p className="text-[10px] sm:text-[11px] text-[#78716C] truncate">
                              {item.variant.name}
                            </p>
                          )}
                          <p className="text-xs font-black text-[#1C1917] mt-0.5">
                            {formatPrice(item.unitPrice * item.quantity)}
                          </p>

                          {/* Stepper */}
                          <div className="flex items-center gap-2 mt-1.5">
                            <div className="flex items-center bg-[#FAF7F2] border border-[#E8E1D5] rounded-lg p-0.5">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-5 h-5 flex items-center justify-center text-[#57534E] hover:text-[#1C1917] transition-colors"
                              >
                                <Minus className="w-2.5 h-2.5" />
                              </button>
                              <span className="w-5 text-center text-xs font-bold text-[#1C1917]">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-5 h-5 flex items-center justify-center text-[#57534E] hover:text-[#1C1917] transition-colors"
                              >
                                <Plus className="w-2.5 h-2.5" />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Remove button */}
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1.5 rounded-xl text-[#A8A29E] hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Eliminar producto"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Upsells */}
                  {upsellCandidates.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-[#E8E1D5]">
                      <p className="text-[10px] font-extrabold text-[#78716C] uppercase tracking-wider mb-2">
                        Completa tu orden:
                      </p>
                      <div className="space-y-2">
                        {upsellCandidates.map((up) => (
                          <div
                            key={up.id}
                            className="flex items-center justify-between p-2 rounded-xl bg-[#FFFFFF] border border-[#E8E1D5]"
                          >
                            <div className="flex items-center gap-2">
                              <img src={up.images[0]} alt="" className="w-8 h-8 rounded-lg object-cover" />
                              <div>
                                <p className="text-xs font-bold text-[#1C1917] line-clamp-1">{up.title}</p>
                                <p className="text-[10px] text-[#78716C] font-semibold">{formatPrice(up.promoPrice || up.price)}</p>
                              </div>
                            </div>
                            <button
                              onClick={() => addToCart(up)}
                              className="px-2 py-1 rounded-lg bg-[#FAF7F2] hover:bg-[#1C1917] hover:text-white border border-[#E8E1D5] text-[#1C1917] font-bold text-[10px] transition-colors"
                            >
                              + Añadir
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                  <div className="w-14 h-14 rounded-2xl bg-[#FFFFFF] border border-[#E8E1D5] flex items-center justify-center text-[#A8A29E] shadow-xs">
                    <ShoppingBag className="w-7 h-7" />
                  </div>
                  <h3 className="font-display font-bold text-base text-[#1C1917]">Tu bolsa está vacía</h3>
                  <p className="text-xs text-[#78716C] max-w-xs">
                    Explora los productos de alta ingeniería y añádelos a tu orden.
                  </p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="px-4 py-2 rounded-xl bg-[#1C1917] text-[#FAF7F2] font-bold text-xs shadow-md hover:bg-[#292524] transition-colors"
                  >
                    Ver Catálogo
                  </button>
                </div>
              )}
            </div>

            {/* Drawer Footer */}
            {cart.length > 0 && (
              <div className="p-4 sm:p-6 border-t border-[#E8E1D5] bg-[#FFFFFF] space-y-3 sm:space-y-4">
                
                {/* Coupon */}
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2 rounded-xl bg-[#F4ECE0] border border-[#DEC9AE] text-xs">
                    <div className="flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-[#C25E38]" />
                      <span className="font-bold text-[#78350F]">{appliedCoupon.code}</span>
                      <span className="text-[#78716C] text-[10px]">({appliedCoupon.description})</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-rose-600 hover:underline text-[10px] font-bold"
                    >
                      Quitar
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="space-y-1">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Cupón (ej: MODERNA20)"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        className="flex-1 bg-[#FAF7F2] border border-[#E8E1D5] rounded-xl px-3 py-1.5 text-xs text-[#1C1917] focus:outline-none focus:border-[#BA9971] uppercase"
                      />
                      <button
                        type="submit"
                        className="px-3 py-1.5 rounded-xl bg-[#FAF7F2] hover:bg-[#F4ECE0] text-[#1C1917] border border-[#E8E1D5] text-xs font-bold transition-colors cursor-pointer"
                      >
                        Aplicar
                      </button>
                    </div>
                    {couponError && <p className="text-[10px] text-rose-600">{couponError}</p>}
                  </form>
                )}

                {/* Subtotal */}
                <div className="space-y-1 text-xs">
                  <div className="flex items-center justify-between text-[#78716C]">
                    <span>Subtotal:</span>
                    <span>{formatPrice(cartSubtotal)}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex items-center justify-between text-[#0F766E] font-semibold">
                      <span>Descuento aplicado:</span>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[#78716C]">
                    <span>Envío estimado:</span>
                    <span className={amountToFreeShipping === 0 ? 'text-[#0F766E] font-bold' : ''}>
                      {amountToFreeShipping === 0 ? '¡GRATIS!' : 'Calculado en checkout'}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-[#E8E1D5] flex items-center justify-between text-sm sm:text-base font-extrabold text-[#1C1917]">
                    <span>Total Final:</span>
                    <span className="font-display font-black text-lg sm:text-xl text-[#1C1917]">
                      {formatPrice(finalTotal)}
                    </span>
                  </div>
                </div>

                {/* Checkout Trigger */}
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setIsCheckoutOpen(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-2xl bg-[#1C1917] hover:bg-[#292524] text-[#FAF7F2] font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer active:scale-98"
                >
                  <span>Iniciar Pago Seguro</span>
                  <ArrowRight className="w-4 h-4 text-[#DEC9AE]" />
                </button>

                <div className="flex items-center justify-center gap-3 text-[10px] text-[#A8A29E]">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-[#0F766E]" />
                    Pago encriptado SSL
                  </span>
                  <span>•</span>
                  <span>30 días de prueba</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};

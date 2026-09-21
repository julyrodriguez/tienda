import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Sparkles,
  Tag,
  Truck,
  ShieldCheck,
  Check
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
    freeShippingThreshold,
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
          className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        />

        {/* Drawer Panel */}
        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="w-screen max-w-md bg-[#0F111C] border-l border-white/10 shadow-2xl flex flex-col justify-between"
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-brand-400" />
                  <h2 className="font-display font-black text-lg text-white">
                    Carrito de Compras
                  </h2>
                  <span className="px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-300 text-xs font-bold border border-brand-500/20">
                    {cart.reduce((a, b) => a + b.quantity, 0)} items
                  </span>
                </div>

                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  aria-label="Cerrar carrito"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Shipping Progress Meter */}
              <div className="mt-4 p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  {amountToFreeShipping > 0 ? (
                    <span className="text-slate-300 font-medium">
                      Te faltan <strong className="text-brand-300">{formatPrice(amountToFreeShipping)}</strong> para{' '}
                      <span className="text-emerald-400 font-bold">ENVÍO GRATIS</span>
                    </span>
                  ) : (
                    <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                      <Truck className="w-4 h-4 text-emerald-400" />
                      ¡Conseguiste Envío Gratis a todo el país!
                    </span>
                  )}
                  <span className="text-xs font-bold text-slate-400">{freeShippingProgress}%</span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${freeShippingProgress}%` }}
                    transition={{ duration: 0.5 }}
                    className={`h-full rounded-full ${
                      freeShippingProgress >= 100
                        ? 'bg-gradient-to-r from-emerald-400 to-teal-300'
                        : 'bg-gradient-to-r from-brand-500 to-electric-cyan'
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length > 0 ? (
                <div className="space-y-3">
                  <AnimatePresence>
                    {cart.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        className="flex items-center gap-4 p-3.5 rounded-2xl bg-white/[0.03] border border-white/10"
                      >
                        {/* Thumbnail */}
                        <img
                          src={item.variant?.image || item.product.images[0]}
                          alt={item.product.title}
                          className="w-16 h-16 rounded-xl object-cover bg-slate-900 border border-white/10 shrink-0"
                        />

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold text-white truncate">
                            {item.product.title}
                          </h4>
                          {item.variant && (
                            <p className="text-[11px] text-slate-400 truncate">
                              {item.variant.name}
                            </p>
                          )}
                          <p className="text-xs font-black text-brand-300 mt-1">
                            {formatPrice(item.unitPrice * item.quantity)}
                          </p>

                          {/* Stepper */}
                          <div className="flex items-center gap-2 mt-2">
                            <div className="flex items-center bg-slate-900 border border-white/10 rounded-lg p-0.5">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-white rounded transition-colors"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-6 text-center text-xs font-bold text-white">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-white rounded transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Remove button */}
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                          title="Eliminar producto"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Upsell recommendation cards */}
                  {upsellCandidates.length > 0 && (
                    <div className="mt-6 pt-4 border-t border-white/10">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                        Completa tu setup:
                      </p>
                      <div className="space-y-2">
                        {upsellCandidates.map((up) => (
                          <div
                            key={up.id}
                            className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-white/5"
                          >
                            <div className="flex items-center gap-2.5">
                              <img src={up.images[0]} alt="" className="w-10 h-10 rounded-lg object-cover" />
                              <div>
                                <p className="text-xs font-bold text-white line-clamp-1">{up.title}</p>
                                <p className="text-[11px] text-brand-300 font-semibold">{formatPrice(up.promoPrice || up.price)}</p>
                              </div>
                            </div>
                            <button
                              onClick={() => addToCart(up)}
                              className="px-2.5 py-1.5 rounded-lg bg-brand-500/20 hover:bg-brand-500 text-brand-300 hover:text-slate-950 font-bold text-[11px] transition-colors"
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
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                  <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-500">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-white">Tu carrito está vacío</h3>
                  <p className="text-xs text-slate-400 max-w-xs">
                    Explora los productos de alta ingeniería y añádelos a tu orden con envíos express.
                  </p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="px-5 py-2.5 rounded-xl bg-brand-500 text-slate-950 font-bold text-xs shadow-md hover:bg-brand-400 transition-colors"
                  >
                    Ver Productos
                  </button>
                </div>
              )}
            </div>

            {/* Drawer Footer with Coupon & Checkout */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-slate-950/60 space-y-4">
                
                {/* Coupon Input or Applied Coupon Badge */}
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-emerald-400" />
                      <span className="font-bold text-emerald-300">{appliedCoupon.code}</span>
                      <span className="text-slate-400 text-[11px]">({appliedCoupon.description})</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-rose-400 hover:underline text-[11px] font-semibold"
                    >
                      Quitar
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="space-y-1">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Código de cupón (ej: MODERNA20)"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        className="flex-1 bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-400 uppercase"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors cursor-pointer"
                      >
                        Aplicar
                      </button>
                    </div>
                    {couponError && <p className="text-[11px] text-rose-400">{couponError}</p>}
                  </form>
                )}

                {/* Subtotal calculations */}
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Subtotal:</span>
                    <span>{formatPrice(cartSubtotal)}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex items-center justify-between text-emerald-400 font-semibold">
                      <span>Descuento aplicado:</span>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-slate-400">
                    <span>Envío estimado:</span>
                    <span className={amountToFreeShipping === 0 ? 'text-emerald-400 font-bold' : ''}>
                      {amountToFreeShipping === 0 ? '¡GRATIS!' : 'Calculado en checkout'}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-base font-extrabold text-white">
                    <span>Total Final:</span>
                    <span className="font-display font-black text-xl text-brand-300">
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
                  className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-gradient-to-r from-brand-500 via-teal-400 to-cyan-400 hover:from-brand-400 hover:to-cyan-300 text-slate-950 font-black text-sm shadow-xl shadow-brand-500/25 transition-all cursor-pointer active:scale-98"
                >
                  <span>Iniciar Pago Seguro</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </button>

                <div className="flex items-center justify-center gap-4 text-[11px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Pago encriptado SSL
                  </span>
                  <span>•</span>
                  <span>Cambio gratis por 30 días</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  CheckCircle,
  Truck,
  CreditCard,
  Building,
  QrCode,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Send,
  Package,
  Receipt,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useStore } from '../context/StoreContext';
import { ShippingOption, OrderCustomer, Order } from '../types/store';

const SHIPPING_OPTIONS: ShippingOption[] = [
  {
    id: 'correo_arg',
    name: 'Correo Argentino a Domicilio',
    carrier: 'Correo Argentino',
    estimatedDays: '2 a 4 días hábiles',
    cost: 4900,
    badge: 'Más Elegido'
  },
  {
    id: 'andreani_exp',
    name: 'Andreani Flash Prioritario',
    carrier: 'Andreani',
    estimatedDays: 'Llega mañana antes de 18hs',
    cost: 8500,
    badge: 'Ultrarrápido'
  },
  {
    id: 'pickup_store',
    name: 'Retiro en Flagship Store AURA',
    carrier: 'Pick-up Palermo Soho',
    estimatedDays: 'Listo en 2 horas',
    cost: 0,
    badge: 'Gratis'
  }
];

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotal,
    discountAmount,
    amountToFreeShipping,
    formatPrice,
    createOrder
  } = useStore();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [customer, setCustomer] = useState<OrderCustomer>({
    fullName: 'Julián Test',
    email: 'julian@ejemplo.com',
    phone: '+54 9 11 5555-4444',
    dni: '40123456',
    address: 'Av. Santa Fe 3200, Piso 4B',
    city: 'Palermo, CABA',
    postalCode: '1425',
    notes: 'Tocar timbre 4B'
  });

  const [selectedShipping, setSelectedShipping] = useState<ShippingOption>(SHIPPING_OPTIONS[0]);
  const [paymentMethod, setPaymentMethod] = useState<'credit_card' | 'mercado_pago' | 'bank_transfer'>('credit_card');
  const [installments, setInstallments] = useState(6);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  if (!isCheckoutOpen) return null;

  // Shipping cost: free if cart subtotal threshold met or pickup
  const actualShippingCost = (amountToFreeShipping === 0 || selectedShipping.id === 'pickup_store')
    ? 0
    : selectedShipping.cost;

  // Extra discount if bank transfer (15%)
  const bankTransferDiscount = paymentMethod === 'bank_transfer'
    ? Math.round((cartSubtotal - discountAmount) * 0.15)
    : 0;

  const finalTotal = Math.max(0, cartSubtotal - discountAmount - bankTransferDiscount + actualShippingCost);

  const handleFinishPurchase = () => {
    const order = createOrder({
      customer,
      items: cart,
      subtotal: cartSubtotal,
      discount: discountAmount + bankTransferDiscount,
      shippingCost: actualShippingCost,
      total: finalTotal,
      paymentMethod,
      installments: paymentMethod === 'credit_card' ? installments : undefined,
      status: paymentMethod === 'bank_transfer' ? 'pending' : 'paid'
    });

    setCompletedOrder(order);
    setStep(4);

    // Trigger celebration confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.5 }
    });
  };

  const handleWhatsAppRedirect = () => {
    if (!completedOrder) return;
    const msg = encodeURIComponent(
      `Hola AURA Store! 👋 Acabo de realizar el pedido #${completedOrder.orderNumber} por un total de ${formatPrice(completedOrder.total)}.
Cliente: ${completedOrder.customer.fullName}
Dirección: ${completedOrder.customer.address}, ${completedOrder.customer.city}
Método de Pago: ${completedOrder.paymentMethod}
¡Muchas gracias!`
    );
    window.open(`https://wa.me/5491122334455?text=${msg}`, '_blank');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            if (step !== 4) setIsCheckoutOpen(false);
          }}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative z-10 w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#0F111C] border border-white/15 shadow-2xl p-6 sm:p-8"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-400">
                Checkout Seguro SSL 256-bit
              </span>
              <h2 className="font-display font-black text-2xl text-white">
                {step === 4 ? '¡Compra Exitosa!' : 'Finalizar Pedido'}
              </h2>
            </div>

            {step !== 4 && (
              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Stepper Progress Indicator */}
          {step !== 4 && (
            <div className="py-5 grid grid-cols-3 gap-2 border-b border-white/10 text-xs">
              <div className={`flex items-center gap-2 ${step >= 1 ? 'text-brand-300 font-bold' : 'text-slate-500'}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 1 ? 'bg-brand-500 text-slate-950 font-black' : 'bg-white/10'}`}>
                  1
                </span>
                <span>Datos Envío</span>
              </div>
              <div className={`flex items-center gap-2 ${step >= 2 ? 'text-brand-300 font-bold' : 'text-slate-500'}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 2 ? 'bg-brand-500 text-slate-950 font-black' : 'bg-white/10'}`}>
                  2
                </span>
                <span>Logística</span>
              </div>
              <div className={`flex items-center gap-2 ${step >= 3 ? 'text-brand-300 font-bold' : 'text-slate-500'}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 3 ? 'bg-brand-500 text-slate-950 font-black' : 'bg-white/10'}`}>
                  3
                </span>
                <span>Pago y Confirmación</span>
              </div>
            </div>
          )}

          {/* Step 1: Customer Data */}
          {step === 1 && (
            <div className="py-6 space-y-4">
              <h3 className="font-display font-bold text-base text-white">
                Información de Entrega y Facturación
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="text-slate-400 font-semibold mb-1 block">Nombre y Apellido</label>
                  <input
                    type="text"
                    value={customer.fullName}
                    onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-brand-400"
                  />
                </div>
                <div>
                  <label className="text-slate-400 font-semibold mb-1 block">Correo Electrónico</label>
                  <input
                    type="email"
                    value={customer.email}
                    onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-brand-400"
                  />
                </div>
                <div>
                  <label className="text-slate-400 font-semibold mb-1 block">Teléfono / WhatsApp</label>
                  <input
                    type="tel"
                    value={customer.phone}
                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-brand-400"
                  />
                </div>
                <div>
                  <label className="text-slate-400 font-semibold mb-1 block">DNI o CUIT (Factura A / B)</label>
                  <input
                    type="text"
                    value={customer.dni}
                    onChange={(e) => setCustomer({ ...customer, dni: e.target.value })}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-brand-400"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-slate-400 font-semibold mb-1 block">Dirección de Entrega</label>
                  <input
                    type="text"
                    value={customer.address}
                    onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-brand-400"
                  />
                </div>
                <div>
                  <label className="text-slate-400 font-semibold mb-1 block">Ciudad y Provincia</label>
                  <input
                    type="text"
                    value={customer.city}
                    onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-brand-400"
                  />
                </div>
                <div>
                  <label className="text-slate-400 font-semibold mb-1 block">Código Postal (CP)</label>
                  <input
                    type="text"
                    value={customer.postalCode}
                    onChange={(e) => setCustomer({ ...customer, postalCode: e.target.value })}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-brand-400"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-400 text-slate-950 font-bold text-xs shadow-lg transition-all cursor-pointer"
                >
                  <span>Continuar a Envío</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Shipping Options */}
          {step === 2 && (
            <div className="py-6 space-y-4">
              <h3 className="font-display font-bold text-base text-white">
                Selecciona la Empresa de Transporte
              </h3>
              <div className="space-y-3">
                {SHIPPING_OPTIONS.map((opt) => {
                  const isFree = amountToFreeShipping === 0 || opt.cost === 0;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => setSelectedShipping(opt)}
                      className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                        selectedShipping.id === opt.id
                          ? 'border-brand-400 bg-brand-500/10 shadow-md'
                          : 'border-white/10 bg-white/[0.03] hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-white/5 text-brand-400">
                          <Truck className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-white">{opt.name}</h4>
                            {opt.badge && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-300">
                                {opt.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-400">{opt.estimatedDays}</p>
                        </div>
                      </div>

                      <span className={`text-sm font-black ${isFree ? 'text-emerald-400' : 'text-white'}`}>
                        {isFree ? '¡GRATIS!' : formatPrice(opt.cost)}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-semibold text-xs transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Atrás</span>
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-400 text-slate-950 font-bold text-xs shadow-lg transition-all cursor-pointer"
                >
                  <span>Continuar a Pago</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Payment Method & Review */}
          {step === 3 && (
            <div className="py-6 space-y-5">
              <h3 className="font-display font-bold text-base text-white">
                Método de Pago y Cuotas
              </h3>

              {/* Payment selector */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={() => setPaymentMethod('credit_card')}
                  className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
                    paymentMethod === 'credit_card'
                      ? 'border-brand-400 bg-brand-500/10 text-white font-bold'
                      : 'border-white/10 bg-white/[0.03] text-slate-400 hover:text-white'
                  }`}
                >
                  <CreditCard className="w-5 h-5 mx-auto mb-1 text-brand-400" />
                  <span className="text-xs block">Tarjeta de Crédito</span>
                  <span className="text-[10px] text-emerald-400 font-semibold">Hasta 6 cuotas s/interés</span>
                </button>

                <button
                  onClick={() => setPaymentMethod('bank_transfer')}
                  className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
                    paymentMethod === 'bank_transfer'
                      ? 'border-brand-400 bg-brand-500/10 text-white font-bold'
                      : 'border-white/10 bg-white/[0.03] text-slate-400 hover:text-white'
                  }`}
                >
                  <Building className="w-5 h-5 mx-auto mb-1 text-emerald-400" />
                  <span className="text-xs block">Transferencia / Depósito</span>
                  <span className="text-[10px] text-emerald-300 font-black">15% OFF Extra</span>
                </button>

                <button
                  onClick={() => setPaymentMethod('mercado_pago')}
                  className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
                    paymentMethod === 'mercado_pago'
                      ? 'border-brand-400 bg-brand-500/10 text-white font-bold'
                      : 'border-white/10 bg-white/[0.03] text-slate-400 hover:text-white'
                  }`}
                >
                  <QrCode className="w-5 h-5 mx-auto mb-1 text-cyan-400" />
                  <span className="text-xs block">Mercado Pago</span>
                  <span className="text-[10px] text-slate-400 font-medium">QR, Dinero en cuenta</span>
                </button>
              </div>

              {/* Installments selector if credit card */}
              {paymentMethod === 'credit_card' && (
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                  <label className="text-xs font-bold text-slate-300 block">
                    Cantidad de Cuotas:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    {[1, 3, 6, 12].map((num) => (
                      <button
                        key={num}
                        onClick={() => setInstallments(num)}
                        className={`p-2 rounded-xl border text-center cursor-pointer transition-all ${
                          installments === num
                            ? 'border-brand-400 bg-brand-500 text-slate-950 font-bold'
                            : 'border-white/10 bg-slate-900 text-slate-300'
                        }`}
                      >
                        <p>{num}x {num <= 6 ? 's/interés' : 'fijas'}</p>
                        <p className="text-[10px] opacity-80">{formatPrice(finalTotal / num)}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Summary table */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-white/10 space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Productos ({cart.length}):</span>
                  <span>{formatPrice(cartSubtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Cupón Aplicado:</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                {bankTransferDiscount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Descuento Transferencia (15%):</span>
                    <span>-{formatPrice(bankTransferDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-400">
                  <span>Envío ({selectedShipping.name}):</span>
                  <span className={actualShippingCost === 0 ? 'text-emerald-400 font-bold' : ''}>
                    {actualShippingCost === 0 ? 'GRATIS' : formatPrice(actualShippingCost)}
                  </span>
                </div>
                <div className="pt-2 border-t border-white/10 flex justify-between text-base font-extrabold text-white">
                  <span>Total a pagar:</span>
                  <span className="text-brand-300 font-display font-black text-xl">
                    {formatPrice(finalTotal)}
                  </span>
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-semibold text-xs transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Atrás</span>
                </button>
                <button
                  onClick={handleFinishPurchase}
                  className="flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/20 transition-all cursor-pointer active:scale-98"
                >
                  <CheckCircle className="w-5 h-5 text-slate-950" />
                  <span>Confirmar y Pagar • {formatPrice(finalTotal)}</span>
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Success Screen */}
          {step === 4 && completedOrder && (
            <div className="py-8 text-center space-y-6">
              <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 mx-auto flex items-center justify-center text-emerald-300">
                <Sparkles className="w-10 h-10 animate-bounce" />
              </div>

              <div>
                <h3 className="font-display font-black text-3xl text-white">
                  ¡Gracias por tu compra, {completedOrder.customer.fullName}!
                </h3>
                <p className="text-sm text-slate-400 mt-2">
                  Orden confirmada: <strong className="text-brand-300 font-mono text-base">{completedOrder.orderNumber}</strong>
                </p>
                <p className="text-xs text-slate-500">
                  Enviamos el comprobante fiscal y los detalles a <strong>{completedOrder.customer.email}</strong>
                </p>
              </div>

              {/* Order Box Details */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-white/10 text-left max-w-md mx-auto space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Código de Seguimiento:</span>
                  <span className="font-mono text-white font-bold">{completedOrder.trackingNumber}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Destino:</span>
                  <span className="text-white">{completedOrder.customer.address}, {completedOrder.customer.city}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Método de Pago:</span>
                  <span className="text-white capitalize">{completedOrder.paymentMethod.replace('_', ' ')}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Total Abonado:</span>
                  <span className="text-emerald-400 font-bold">{formatPrice(completedOrder.total)}</span>
                </div>
              </div>

              {/* WhatsApp notification action */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleWhatsAppRedirect}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] text-slate-950 font-black text-xs shadow-lg transition-transform active:scale-95 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Notificar Pedido por WhatsApp</span>
                </button>

                <button
                  onClick={() => setIsCheckoutOpen(false)}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  Seguir Explorando
                </button>
              </div>
            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

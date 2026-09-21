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
  Send,
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
    name: 'Retiro Oficial Flagship AURA',
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
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isCheckoutOpen) return null;

  const actualShippingCost = (amountToFreeShipping === 0 || selectedShipping.id === 'pickup_store')
    ? 0
    : selectedShipping.cost;

  const bankTransferDiscount = paymentMethod === 'bank_transfer'
    ? Math.round((cartSubtotal - discountAmount) * 0.15)
    : 0;

  const finalTotal = Math.max(0, cartSubtotal - discountAmount - bankTransferDiscount + actualShippingCost);

  const handleFinishPurchase = async () => {
    setIsProcessing(true);
    try {
      const order = await createOrder({
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

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.5 }
      });
    } catch (err) {
      console.error('Error al procesar compra:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleWhatsAppRedirect = () => {
    if (!completedOrder) return;
    const msg = encodeURIComponent(
      `Hola AURA Studio! 👋 Acabo de realizar el pedido #${completedOrder.orderNumber} por un total de ${formatPrice(completedOrder.total)}.
Cliente: ${completedOrder.customer.fullName}
Dirección: ${completedOrder.customer.address}, ${completedOrder.customer.city}
Método de Pago: ${completedOrder.paymentMethod}
¡Muchas gracias!`
    );
    window.open(`https://wa.me/5491122334455?text=${msg}`, '_blank');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            if (step !== 4) setIsCheckoutOpen(false);
          }}
          className="fixed inset-0 bg-[#1C1917]/60 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative z-10 w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#FFFFFF] border border-[#E8E1D5] shadow-2xl p-4 sm:p-6 md:p-8 text-[#1C1917]"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 sm:pb-6 border-b border-[#E8E1D5]">
            <div>
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#C25E38]">
                Checkout Seguro SSL 256-bit
              </span>
              <h2 className="font-display font-black text-xl sm:text-2xl text-[#1C1917]">
                {step === 4 ? '¡Compra Confirmada!' : 'Finalizar Compra'}
              </h2>
            </div>

            {step !== 4 && (
              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="p-2 rounded-xl bg-[#FAF7F2] hover:bg-[#F4ECE0] text-[#78716C] hover:text-[#1C1917] transition-colors cursor-pointer border border-[#E8E1D5]"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            )}
          </div>

          {/* Stepper Progress */}
          {step !== 4 && (
            <div className="py-3 sm:py-4 grid grid-cols-3 gap-1 sm:gap-2 border-b border-[#E8E1D5] text-[11px] sm:text-xs">
              <div className={`flex items-center gap-1.5 sm:gap-2 ${step >= 1 ? 'text-[#1C1917] font-bold' : 'text-[#A8A29E]'}`}>
                <span className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] sm:text-xs ${step >= 1 ? 'bg-[#1C1917] text-white font-black' : 'bg-[#E8E1D5]'}`}>
                  1
                </span>
                <span className="truncate">Datos</span>
              </div>
              <div className={`flex items-center gap-1.5 sm:gap-2 ${step >= 2 ? 'text-[#1C1917] font-bold' : 'text-[#A8A29E]'}`}>
                <span className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] sm:text-xs ${step >= 2 ? 'bg-[#1C1917] text-white font-black' : 'bg-[#E8E1D5]'}`}>
                  2
                </span>
                <span className="truncate">Envío</span>
              </div>
              <div className={`flex items-center gap-1.5 sm:gap-2 ${step >= 3 ? 'text-[#1C1917] font-bold' : 'text-[#A8A29E]'}`}>
                <span className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] sm:text-xs ${step >= 3 ? 'bg-[#1C1917] text-white font-black' : 'bg-[#E8E1D5]'}`}>
                  3
                </span>
                <span className="truncate">Pago</span>
              </div>
            </div>
          )}

          {/* Step 1: Customer Data */}
          {step === 1 && (
            <div className="py-4 sm:py-6 space-y-3 sm:space-y-4">
              <h3 className="font-display font-bold text-sm sm:text-base text-[#1C1917]">
                Información de Contacto y Envío
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-[#57534E] font-bold mb-1 block text-[11px]">Nombre y Apellido</label>
                  <input
                    type="text"
                    value={customer.fullName}
                    onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-[#E8E1D5] rounded-xl px-3 py-2 text-[#1C1917] focus:outline-none focus:border-[#BA9971]"
                  />
                </div>
                <div>
                  <label className="text-[#57534E] font-bold mb-1 block text-[11px]">Correo Electrónico</label>
                  <input
                    type="email"
                    value={customer.email}
                    onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-[#E8E1D5] rounded-xl px-3 py-2 text-[#1C1917] focus:outline-none focus:border-[#BA9971]"
                  />
                </div>
                <div>
                  <label className="text-[#57534E] font-bold mb-1 block text-[11px]">Teléfono / WhatsApp</label>
                  <input
                    type="tel"
                    value={customer.phone}
                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-[#E8E1D5] rounded-xl px-3 py-2 text-[#1C1917] focus:outline-none focus:border-[#BA9971]"
                  />
                </div>
                <div>
                  <label className="text-[#57534E] font-bold mb-1 block text-[11px]">DNI o CUIT (Facturación)</label>
                  <input
                    type="text"
                    value={customer.dni}
                    onChange={(e) => setCustomer({ ...customer, dni: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-[#E8E1D5] rounded-xl px-3 py-2 text-[#1C1917] focus:outline-none focus:border-[#BA9971]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-[#57534E] font-bold mb-1 block text-[11px]">Dirección y Altura</label>
                  <input
                    type="text"
                    value={customer.address}
                    onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-[#E8E1D5] rounded-xl px-3 py-2 text-[#1C1917] focus:outline-none focus:border-[#BA9971]"
                  />
                </div>
                <div>
                  <label className="text-[#57534E] font-bold mb-1 block text-[11px]">Ciudad y Provincia</label>
                  <input
                    type="text"
                    value={customer.city}
                    onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-[#E8E1D5] rounded-xl px-3 py-2 text-[#1C1917] focus:outline-none focus:border-[#BA9971]"
                  />
                </div>
                <div>
                  <label className="text-[#57534E] font-bold mb-1 block text-[11px]">Código Postal (CP)</label>
                  <input
                    type="text"
                    value={customer.postalCode}
                    onChange={(e) => setCustomer({ ...customer, postalCode: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-[#E8E1D5] rounded-xl px-3 py-2 text-[#1C1917] focus:outline-none focus:border-[#BA9971]"
                  />
                </div>
              </div>

              <div className="pt-3 sm:pt-4 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#1C1917] hover:bg-[#292524] text-[#FAF7F2] font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  <span>Continuar a Envío</span>
                  <ArrowRight className="w-4 h-4 text-[#DEC9AE]" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Shipping Options */}
          {step === 2 && (
            <div className="py-4 sm:py-6 space-y-3 sm:space-y-4">
              <h3 className="font-display font-bold text-sm sm:text-base text-[#1C1917]">
                Selecciona Método de Envío
              </h3>
              <div className="space-y-2.5">
                {SHIPPING_OPTIONS.map((opt) => {
                  const isFree = amountToFreeShipping === 0 || opt.cost === 0;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => setSelectedShipping(opt)}
                      className={`w-full p-3 sm:p-4 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                        selectedShipping.id === opt.id
                          ? 'border-[#1C1917] bg-[#EADBC8]/30 shadow-xs'
                          : 'border-[#E8E1D5] bg-[#FAF7F2] hover:border-[#BA9971]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 sm:p-2.5 rounded-xl bg-[#FFFFFF] text-[#C25E38] border border-[#E8E1D5]">
                          <Truck className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs sm:text-sm font-bold text-[#1C1917]">{opt.name}</h4>
                            {opt.badge && (
                              <span className="text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EADBC8] text-[#78350F]">
                                {opt.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] sm:text-xs text-[#78716C]">{opt.estimatedDays}</p>
                        </div>
                      </div>

                      <span className={`text-xs sm:text-sm font-black ${isFree ? 'text-[#0F766E]' : 'text-[#1C1917]'}`}>
                        {isFree ? '¡GRATIS!' : formatPrice(opt.cost)}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="pt-3 sm:pt-4 flex items-center justify-between gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#FAF7F2] hover:bg-[#F4ECE0] text-[#57534E] font-semibold text-xs transition-all border border-[#E8E1D5]"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Atrás</span>
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-[#1C1917] hover:bg-[#292524] text-[#FAF7F2] font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  <span>Continuar a Pago</span>
                  <ArrowRight className="w-4 h-4 text-[#DEC9AE]" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {step === 3 && (
            <div className="py-4 sm:py-6 space-y-4">
              <h3 className="font-display font-bold text-sm sm:text-base text-[#1C1917]">
                Selecciona Medio de Pago
              </h3>

              {/* Payment selector */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <button
                  onClick={() => setPaymentMethod('credit_card')}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                    paymentMethod === 'credit_card'
                      ? 'border-[#1C1917] bg-[#EADBC8]/40 text-[#1C1917] font-bold shadow-xs'
                      : 'border-[#E8E1D5] bg-[#FAF7F2] text-[#57534E] hover:border-[#BA9971]'
                  }`}
                >
                  <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 mx-auto mb-1 text-[#78350F]" />
                  <span className="text-xs block font-bold">Tarjeta de Crédito</span>
                  <span className="text-[10px] text-[#0F766E] font-semibold">Hasta 6 cuotas s/interés</span>
                </button>

                <button
                  onClick={() => setPaymentMethod('bank_transfer')}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                    paymentMethod === 'bank_transfer'
                      ? 'border-[#1C1917] bg-[#EADBC8]/40 text-[#1C1917] font-bold shadow-xs'
                      : 'border-[#E8E1D5] bg-[#FAF7F2] text-[#57534E] hover:border-[#BA9971]'
                  }`}
                >
                  <Building className="w-4 h-4 sm:w-5 sm:h-5 mx-auto mb-1 text-[#0F766E]" />
                  <span className="text-xs block font-bold">Transferencia</span>
                  <span className="text-[10px] text-[#0F766E] font-black">15% OFF Extra</span>
                </button>

                <button
                  onClick={() => setPaymentMethod('mercado_pago')}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                    paymentMethod === 'mercado_pago'
                      ? 'border-[#1C1917] bg-[#EADBC8]/40 text-[#1C1917] font-bold shadow-xs'
                      : 'border-[#E8E1D5] bg-[#FAF7F2] text-[#57534E] hover:border-[#BA9971]'
                  }`}
                >
                  <QrCode className="w-4 h-4 sm:w-5 sm:h-5 mx-auto mb-1 text-[#0284C7]" />
                  <span className="text-xs block font-bold">Mercado Pago</span>
                  <span className="text-[10px] text-[#78716C]">QR o Dinero MP</span>
                </button>
              </div>

              {/* Installments selector */}
              {paymentMethod === 'credit_card' && (
                <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E8E1D5] space-y-2">
                  <label className="text-[11px] font-extrabold text-[#57534E] uppercase tracking-wider block">
                    Cantidad de Cuotas:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    {[1, 3, 6, 12].map((num) => (
                      <button
                        key={num}
                        onClick={() => setInstallments(num)}
                        className={`p-2 rounded-xl border text-center cursor-pointer transition-all ${
                          installments === num
                            ? 'border-[#1C1917] bg-[#1C1917] text-white font-bold'
                            : 'border-[#E8E1D5] bg-[#FFFFFF] text-[#57534E]'
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
              <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E8E1D5] space-y-1.5 text-xs">
                <div className="flex justify-between text-[#78716C]">
                  <span>Subtotal ({cart.length} items):</span>
                  <span>{formatPrice(cartSubtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#0F766E] font-semibold">
                    <span>Cupón Aplicado:</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                {bankTransferDiscount > 0 && (
                  <div className="flex justify-between text-[#0F766E] font-semibold">
                    <span>Descuento Transferencia (15%):</span>
                    <span>-{formatPrice(bankTransferDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#78716C]">
                  <span>Envío ({selectedShipping.name}):</span>
                  <span className={actualShippingCost === 0 ? 'text-[#0F766E] font-bold' : ''}>
                    {actualShippingCost === 0 ? 'GRATIS' : formatPrice(actualShippingCost)}
                  </span>
                </div>
                <div className="pt-2 border-t border-[#E8E1D5] flex justify-between text-sm sm:text-base font-extrabold text-[#1C1917]">
                  <span>Total a pagar:</span>
                  <span className="font-display font-black text-lg sm:text-xl text-[#1C1917]">
                    {formatPrice(finalTotal)}
                  </span>
                </div>
              </div>

              <div className="pt-3 sm:pt-4 flex items-center justify-between gap-3">
                <button
                  onClick={() => setStep(2)}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#FAF7F2] hover:bg-[#F4ECE0] text-[#57534E] font-semibold text-xs transition-all border border-[#E8E1D5]"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Atrás</span>
                </button>
                <button
                  onClick={handleFinishPurchase}
                  disabled={isProcessing}
                  className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 sm:px-8 py-3 rounded-2xl font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer active:scale-98 ${
                    isProcessing
                      ? 'bg-[#BA9971] text-white opacity-80 cursor-wait'
                      : 'bg-[#1C1917] hover:bg-[#292524] text-[#FAF7F2]'
                  }`}
                >
                  <CheckCircle className="w-4 h-4 text-[#DEC9AE]" />
                  <span>{isProcessing ? 'Procesando Pago Seguro...' : `Confirmar y Pagar • ${formatPrice(finalTotal)}`}</span>
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Success Screen */}
          {step === 4 && completedOrder && (
            <div className="py-6 sm:py-8 text-center space-y-4 sm:space-y-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#EADBC8] border-2 border-[#BA9971] mx-auto flex items-center justify-center text-[#78350F]">
                <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 animate-bounce" />
              </div>

              <div>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-[#1C1917]">
                  ¡Gracias por tu compra, {completedOrder.customer.fullName}!
                </h3>
                <p className="text-xs sm:text-sm text-[#57534E] mt-1 sm:mt-2">
                  Orden confirmada: <strong className="text-[#C25E38] font-mono text-sm sm:text-base">{completedOrder.orderNumber}</strong>
                </p>
                <p className="text-[11px] sm:text-xs text-[#78716C] mt-1">
                  Enviamos el comprobante fiscal a <strong>{completedOrder.customer.email}</strong>
                </p>
              </div>

              {/* Order Box Details */}
              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8E1D5] text-left max-w-md mx-auto space-y-2 text-xs">
                <div className="flex justify-between text-[#78716C]">
                  <span>Tracking:</span>
                  <span className="font-mono text-[#1C1917] font-bold">{completedOrder.trackingNumber}</span>
                </div>
                <div className="flex justify-between text-[#78716C]">
                  <span>Destino:</span>
                  <span className="text-[#1C1917] truncate ml-2">{completedOrder.customer.address}, {completedOrder.customer.city}</span>
                </div>
                <div className="flex justify-between text-[#78716C]">
                  <span>Método de Pago:</span>
                  <span className="text-[#1C1917] capitalize">{completedOrder.paymentMethod.replace('_', ' ')}</span>
                </div>
                <div className="flex justify-between text-[#78716C]">
                  <span>Total Abonado:</span>
                  <span className="text-[#0F766E] font-bold">{formatPrice(completedOrder.total)}</span>
                </div>
              </div>

              {/* WhatsApp action */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-2">
                <button
                  onClick={handleWhatsAppRedirect}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] text-[#1C1917] font-black text-xs shadow-md transition-transform active:scale-95 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Notificar Pedido por WhatsApp</span>
                </button>

                <button
                  onClick={() => setIsCheckoutOpen(false)}
                  className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-[#FAF7F2] hover:bg-[#F4ECE0] text-[#1C1917] border border-[#E8E1D5] font-bold text-xs transition-colors cursor-pointer"
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

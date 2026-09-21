import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ShoppingBag, X } from 'lucide-react';
import { SOCIAL_PROOF_EVENTS } from '../data/mockData';
import { useStore } from '../context/StoreContext';

export const LiveSalesToaster: React.FC = () => {
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const { products, setQuickViewProduct } = useStore();

  useEffect(() => {
    // Show toast after 4s, stay for 5s, hide for 10s, loop
    const showTimeout = setTimeout(() => {
      setIsVisible(true);
    }, 3500);

    const interval = setInterval(() => {
      setIsVisible(true);
      setCurrentEventIndex(prev => (prev + 1) % SOCIAL_PROOF_EVENTS.length);

      setTimeout(() => {
        setIsVisible(false);
      }, 5500);
    }, 18000);

    return () => {
      clearTimeout(showTimeout);
      clearInterval(interval);
    };
  }, []);

  const event = SOCIAL_PROOF_EVENTS[currentEventIndex];
  const matchedProduct = products.find(p => p.title.toLowerCase().includes(event.product.toLowerCase().slice(0, 10)));

  return (
    <AnimatePresence>
      {isVisible && event && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="fixed bottom-6 left-6 z-40 max-w-sm p-3.5 rounded-2xl glass-panel border border-brand-500/30 shadow-2xl shadow-brand-500/10 backdrop-blur-xl bg-[#0F111C]/90 flex items-center gap-3.5"
        >
          {/* Avatar or Product thumbnail */}
          <div className="relative w-12 h-12 rounded-xl bg-gradient-to-tr from-brand-600 to-teal-400 p-0.5 shrink-0 overflow-hidden">
            {matchedProduct ? (
              <img src={matchedProduct.images[0]} alt="" className="w-full h-full object-cover rounded-lg" />
            ) : (
              <div className="w-full h-full bg-slate-900 rounded-lg flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-brand-300" />
              </div>
            )}
            <span className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-slate-900" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              <span>Compra Verificada</span>
            </div>
            <p className="text-xs font-bold text-white truncate">
              {event.name}
            </p>
            <p className="text-[11px] text-slate-300 truncate">
              Adquirió <strong>{event.product}</strong>
            </p>
            <p className="text-[10px] text-slate-500">{event.time}</p>
          </div>

          <button
            onClick={() => setIsVisible(false)}
            className="p-1 rounded-lg text-slate-500 hover:text-white transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

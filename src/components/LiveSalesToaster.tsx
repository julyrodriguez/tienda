import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ShoppingBag, X } from 'lucide-react';
import { SOCIAL_PROOF_EVENTS } from '../data/mockData';
import { useStore } from '../context/StoreContext';

export const LiveSalesToaster: React.FC = () => {
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const { products } = useStore();

  useEffect(() => {
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
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="fixed bottom-3 left-3 right-3 sm:right-auto sm:bottom-6 sm:left-6 z-30 sm:max-w-sm p-3 rounded-2xl bg-[#FFFFFF]/95 border border-[#E8E1D5] shadow-xl backdrop-blur-xl flex items-center gap-3 text-[#1C1917]"
        >
          {/* Avatar or Product thumbnail */}
          <div className="relative w-11 h-11 rounded-xl bg-[#FAF7F2] border border-[#E8E1D5] p-0.5 shrink-0 overflow-hidden flex items-center justify-center">
            {matchedProduct ? (
              <img src={matchedProduct.images[0]} alt="" className="w-full h-full object-cover rounded-lg" />
            ) : (
              <ShoppingBag className="w-5 h-5 text-[#C25E38]" />
            )}
            <span className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-[#0F766E]" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1 text-[10px] text-[#0F766E] font-bold uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-[#0F766E]" />
              <span>Compra Verificada</span>
            </div>
            <p className="text-xs font-bold text-[#1C1917] truncate">
              {event.name}
            </p>
            <p className="text-[11px] text-[#57534E] truncate">
              Adquirió <strong>{event.product}</strong>
            </p>
            <p className="text-[10px] text-[#A8A29E]">{event.time}</p>
          </div>

          <button
            onClick={() => setIsVisible(false)}
            className="p-1 rounded-lg text-[#A8A29E] hover:text-[#1C1917] transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

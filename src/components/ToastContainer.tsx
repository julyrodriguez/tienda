import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useStore();

  return (
    <div className="fixed top-18 sm:top-24 right-3 left-3 sm:left-auto sm:right-6 z-50 flex flex-col gap-2 pointer-events-none sm:max-w-sm">
      <AnimatePresence>
        {toasts.map((toast) => {
          let Icon = CheckCircle2;
          let colorClasses = 'border-[#0F766E]/40 text-[#0F766E] bg-[#FFFFFF] shadow-lg';
          if (toast.type === 'error') {
            Icon = AlertCircle;
            colorClasses = 'border-rose-400 text-rose-600 bg-[#FFFFFF] shadow-lg';
          } else if (toast.type === 'info') {
            Icon = Info;
            colorClasses = 'border-[#BA9971]/50 text-[#78350F] bg-[#FFFFFF] shadow-lg';
          }

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className={`pointer-events-auto p-3.5 rounded-2xl border backdrop-blur-xl flex items-start gap-2.5 ${colorClasses}`}
            >
              <Icon className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <h5 className="text-xs font-bold text-[#1C1917]">{toast.title}</h5>
                {toast.description && (
                  <p className="text-[11px] text-[#57534E] mt-0.5 leading-snug">
                    {toast.description}
                  </p>
                )}
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="p-1 rounded-lg text-[#A8A29E] hover:text-[#1C1917] transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

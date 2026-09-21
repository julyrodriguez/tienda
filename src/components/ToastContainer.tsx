import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useStore();

  return (
    <div className="fixed top-24 right-6 z-50 flex flex-col gap-2.5 pointer-events-none max-w-sm w-full">
      <AnimatePresence>
        {toasts.map((toast) => {
          let Icon = CheckCircle2;
          let colorClasses = 'border-emerald-500/40 text-emerald-400 bg-emerald-950/80';
          if (toast.type === 'error') {
            Icon = AlertCircle;
            colorClasses = 'border-rose-500/40 text-rose-400 bg-rose-950/80';
          } else if (toast.type === 'info') {
            Icon = Info;
            colorClasses = 'border-brand-500/40 text-brand-300 bg-slate-900/90';
          }

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 30, scale: 0.95 }}
              className={`pointer-events-auto p-4 rounded-2xl border backdrop-blur-xl shadow-2xl flex items-start gap-3 ${colorClasses}`}
            >
              <Icon className="w-5 h-5 shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <h5 className="text-xs font-bold text-white">{toast.title}</h5>
                {toast.description && (
                  <p className="text-[11px] text-slate-300 mt-0.5 leading-snug">
                    {toast.description}
                  </p>
                )}
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors"
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

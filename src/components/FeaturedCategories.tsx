import React from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Headphones,
  Watch,
  Gamepad2,
  Laptop,
  Layers,
  LucideIcon
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../data/mockData';
import { CategoryFilter } from '../types/store';

const ICON_MAP: Record<string, LucideIcon> = {
  Sparkles,
  Headphones,
  Watch,
  Gamepad2,
  Laptop,
  Layers
};

export const FeaturedCategories: React.FC = () => {
  const { selectedCategory, setSelectedCategory, products } = useStore();

  return (
    <div className="py-6 border-b border-white/[0.06] bg-[#0A0B12]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-sm uppercase tracking-wider font-extrabold text-slate-400">
              Categorías Seleccionadas
            </h2>
            <p className="text-xs text-slate-500">Filtra el catálogo por ecosistema de producto</p>
          </div>
          <span className="text-xs text-brand-400 font-medium">
            {products.length} productos en stock
          </span>
        </div>

        {/* Categories Chips */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const Icon = ICON_MAP[cat.icon] || Sparkles;
            const isSelected = selectedCategory === cat.id;

            return (
              <motion.button
                key={cat.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSelectedCategory(cat.id as CategoryFilter)}
                className={`relative flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'text-slate-950 shadow-lg shadow-brand-500/25'
                    : 'text-slate-300 bg-white/5 hover:bg-white/10 border border-white/5'
                }`}
              >
                {/* Active animated background pill */}
                {isSelected && (
                  <motion.div
                    layoutId="activeCategoryBg"
                    className="absolute inset-0 bg-gradient-to-r from-brand-400 to-teal-300 rounded-2xl z-0"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}

                <span className="relative z-10">
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-slate-950' : 'text-brand-400'}`} />
                </span>
                <span className="relative z-10 font-bold">{cat.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

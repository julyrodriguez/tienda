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
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25, ease: 'easeOut' }}
      className="py-4 sm:py-6 border-b border-[#E8E1D5] bg-[#FAF7F2]"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 mb-3 sm:mb-4">
          <div>
            <h2 className="text-xs uppercase tracking-wider font-extrabold text-[#78716C]">
              Ecosistemas de Producto
            </h2>
            <p className="text-[11px] text-[#A8A29E] hidden sm:block">Selecciona una categoría para filtrar el catálogo</p>
          </div>
          <span className="text-[11px] sm:text-xs text-[#78350F] font-bold">
            {products.length} productos en stock
          </span>
        </div>

        {/* Categories Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none -mx-3 px-3 sm:mx-0 sm:px-0">
          {CATEGORIES.map((cat) => {
            const Icon = ICON_MAP[cat.icon] || Sparkles;
            const isSelected = selectedCategory === cat.id;

            return (
              <motion.button
                key={cat.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSelectedCategory(cat.id as CategoryFilter)}
                className={`relative flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer shrink-0 ${
                  isSelected
                    ? 'text-[#FAF7F2] shadow-md shadow-stone-900/10'
                    : 'text-[#57534E] bg-[#FFFFFF] hover:bg-[#F4ECE0] border border-[#E8E1D5]'
                }`}
              >
                {/* Active animated background pill */}
                {isSelected && (
                  <motion.div
                    layoutId="activeCategoryBg"
                    className="absolute inset-0 bg-[#1C1917] rounded-2xl z-0"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}

                <span className="relative z-10">
                  <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-[#DEC9AE]' : 'text-[#78350F]'}`} />
                </span>
                <span className="relative z-10 font-bold">{cat.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

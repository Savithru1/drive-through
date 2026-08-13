import React from 'react';
import { CATEGORIES } from '../data/menu';
import { useCart } from '../context/CartContext';

export const CategoryNav: React.FC = () => {
  const { selectedCategory, setSelectedCategory } = useCart();

  // Category visual icons/emojis
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'All': return '🍽️';
      case 'Burgers': return '🍔';
      case 'Chicken': return '🍗';
      case 'Fries & Sides': return '🍟';
      case 'Wraps': return '🌯';
      case 'Beverages': return '🥤';
      case 'Desserts': return '🍰';
      case 'Combos': return '🍱';
      default: return '🍔';
    }
  };

  return (
    <div className="w-full bg-cream transition-theme dark:bg-dark-bg border-b border-stone-150 dark:border-stone-850">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-start gap-3 overflow-x-auto py-5 no-scrollbar scroll-smooth">
          {CATEGORIES.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`flex items-center gap-2.5 whitespace-nowrap rounded-2xl px-5 py-3 text-sm font-bold transition-all focus:outline-none focus:ring-2 focus:ring-primary/40 ${
                  isActive
                    ? 'bg-primary text-white shadow-md shadow-primary/20 scale-[1.03]'
                    : 'bg-white text-stone-600 border border-stone-200/80 hover:border-stone-300 hover:bg-stone-50 dark:bg-stone-900 dark:text-stone-300 dark:border-stone-800 dark:hover:bg-stone-800'
                }`}
              >
                <span className="text-base leading-none">{getCategoryIcon(category)}</span>
                <span>{category}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default CategoryNav;

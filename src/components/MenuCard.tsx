import React from 'react';
import type { MenuItem } from '../data/menu';
import { Clock, Plus, Star } from 'lucide-react';

interface MenuCardProps {
  item: MenuItem;
  onSelect: (item: MenuItem) => void;
}

export const MenuCard: React.FC<MenuCardProps> = ({ item, onSelect }) => {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-stone-200/60 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl dark:border-stone-850 dark:bg-stone-900">
      
      {/* Bestseller Badge */}
      {item.isBestseller && (
        <div className="absolute top-4 left-4 z-10 flex items-center gap-1 rounded-xl bg-secondary px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-charcoal shadow-sm">
          <Star className="h-3 w-3 fill-charcoal" />
          Bestseller
        </div>
      )}

      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-stone-100 dark:bg-stone-950">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

        {/* Preparation Time & Veg Indicator */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <div className="flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-xs">
            <Clock className="h-3.5 w-3.5 text-secondary" />
            {item.preparationTime} mins
          </div>
          
          {/* Veg/Non-Veg Badge */}
          <div className={`flex items-center justify-center rounded-md border-2 bg-white p-1 shadow-sm ${
            item.isVegetarian ? 'border-green-600' : 'border-red-600'
          }`}>
            <div className={`h-2.5 w-2.5 rounded-full ${
              item.isVegetarian ? 'bg-green-600' : 'bg-red-600'
            }`} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg font-bold text-charcoal dark:text-stone-100 line-clamp-1 group-hover:text-primary transition-colors">
            {item.name}
          </h3>
        </div>

        <p className="mt-2 text-xs text-stone-500 dark:text-stone-400 line-clamp-2 leading-relaxed">
          {item.description}
        </p>

        {/* Footer info (price + button) */}
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-stone-100 dark:border-stone-850">
          <div>
            <span className="text-[10px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-wider block">Price</span>
            <span className="text-xl font-extrabold text-charcoal dark:text-stone-150">
              ₹{item.price}
            </span>
          </div>

          <button
            onClick={() => onSelect(item)}
            className="flex items-center gap-1.5 rounded-2xl bg-stone-100 hover:bg-primary text-charcoal hover:text-white px-4 py-2.5 text-xs font-bold transition-all hover:shadow-md hover:shadow-primary/10 dark:bg-stone-800 dark:text-stone-200 dark:hover:bg-primary dark:hover:text-white"
          >
            <Plus className="h-4 w-4" />
            <span>Customize</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default MenuCard;

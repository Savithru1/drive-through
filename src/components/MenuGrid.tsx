import React from 'react';
import { useCart } from '../context/CartContext';
import { menuItems } from '../data/menu';
import { MenuCard } from './MenuCard';
import { HelpCircle, RefreshCw } from 'lucide-react';

export const MenuGrid: React.FC = () => {
  const { selectedCategory, searchQuery, setSearchQuery, setSelectedCategory, setSelectedItem } = useCart();

  // Filtering logic
  const filteredItems = menuItems.filter(item => {
    // Category filter
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    
    // Search query filter
    const searchLower = searchQuery.toLowerCase().trim();
    const matchesSearch = !searchLower || 
      item.name.toLowerCase().includes(searchLower) ||
      item.description.toLowerCase().includes(searchLower) ||
      item.category.toLowerCase().includes(searchLower);
      
    return matchesCategory && matchesSearch;
  });

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
  };

  return (
    <section id="menu-section" className="w-full py-10 bg-stone-50/50 transition-theme dark:bg-stone-900/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-display text-2xl font-extrabold text-charcoal dark:text-stone-100 sm:text-3xl">
              {selectedCategory === 'All' ? 'Our Menu' : selectedCategory}
            </h2>
            <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
              {searchQuery 
                ? `Showing results for "${searchQuery}"`
                : `Choose from our delicious premium ${selectedCategory.toLowerCase()}`}
            </p>
          </div>

          <div className="text-xs font-semibold text-stone-400 dark:text-stone-500 bg-white dark:bg-stone-900 px-3 py-1.5 rounded-full border border-stone-200/50 dark:border-stone-850">
            {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'} available
          </div>
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-stone-200 bg-white p-12 text-center transition-theme dark:border-stone-850 dark:bg-stone-900 md:p-16">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-500/10 text-primary mb-5">
              <HelpCircle className="h-8 w-8" />
            </div>
            <h3 className="font-display text-xl font-bold text-charcoal dark:text-stone-100">
              No Food Items Found
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-stone-500 dark:text-stone-400">
              We couldn't find anything matching your search. Try double-checking the spelling or adjusting your category selection.
            </p>
            <button
              onClick={handleClearFilters}
              className="mt-6 flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-primary/20 hover:bg-primary-hover transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              Reset Filters
            </button>
          </div>
        ) : (
          /* Food Cards Grid */
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredItems.map((item) => (
              <MenuCard
                key={item.id}
                item={item}
                onSelect={(selectedItem) => setSelectedItem(selectedItem)}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
export default MenuGrid;

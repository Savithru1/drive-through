import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Sun, Moon, Search, Utensils, X } from 'lucide-react';

interface NavbarProps {
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCart }) => {
  const { theme, toggleTheme, cart, activeView, setActiveView, searchQuery, setSearchQuery } = useCart();
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const cartItemsCount = cart.reduce((count, item) => count + item.quantity, 0);

  const handleLogoClick = () => {
    setActiveView('menu');
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-200/80 bg-cream/90 backdrop-blur-md transition-theme dark:border-dark-border dark:bg-dark-bg/95">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <button
          onClick={handleLogoClick}
          className="flex items-center gap-2 text-left focus:outline-none group"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-md shadow-primary/20 transition-transform group-hover:scale-105">
            <Utensils className="h-5 w-5" />
          </div>
          <div>
            <span className="font-display text-2xl font-extrabold tracking-tight text-charcoal dark:text-stone-100">
              STEWARD
            </span>
            <span className="hidden sm:block text-[10px] font-semibold tracking-widest text-primary uppercase">
              Drive-Through
            </span>
          </div>
        </button>

        {/* Search Bar - Desktop */}
        {activeView === 'menu' && (
          <div className="hidden md:relative md:block md:w-80 lg:w-96">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-stone-400 dark:text-stone-500" />
            </div>
            <input
              type="text"
              placeholder="Search juicy burgers, shakes, wraps..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-stone-200 bg-stone-50 py-2 pl-10 pr-4 text-sm text-charcoal outline-none transition-all placeholder:text-stone-400 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/25 dark:border-stone-800 dark:bg-stone-900/50 dark:text-stone-200 dark:placeholder:text-stone-600 dark:focus:border-primary dark:focus:bg-stone-900"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-stone-400 hover:text-charcoal dark:hover:text-stone-200"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Mobile Search Toggle */}
          {activeView === 'menu' && (
            <button
              onClick={() => setShowMobileSearch(!showMobileSearch)}
              className="flex h-10 w-10 items-center justify-center rounded-xl text-stone-600 transition-colors hover:bg-stone-100 focus:outline-none md:hidden dark:text-stone-400 dark:hover:bg-stone-900"
              aria-label="Search items"
            >
              <Search className="h-5 w-5" />
            </button>
          )}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-stone-600 transition-colors hover:bg-stone-100 focus:outline-none dark:text-stone-400 dark:hover:bg-stone-900"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5 text-charcoal" />
            ) : (
              <Sun className="h-5 w-5 text-secondary" />
            )}
          </button>

          {/* Checkout Nav Link if not on checkout/progress */}
          {activeView === 'menu' && (
            <button
              onClick={onOpenCart}
              className="relative flex h-10 items-center gap-2 rounded-xl bg-primary px-4 font-semibold text-white shadow-md shadow-primary/10 transition-all hover:bg-primary-hover active:scale-95 focus:outline-none"
            >
              <ShoppingBag className="h-5 w-5" />
              <span className="hidden sm:inline text-sm">Cart</span>
              {cartItemsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 animate-cart-bounce items-center justify-center rounded-full bg-secondary text-[11px] font-bold text-charcoal shadow-sm">
                  {cartItemsCount}
                </span>
              )}
            </button>
          )}

          {activeView !== 'menu' && (
            <button
              onClick={() => setActiveView('menu')}
              className="text-sm font-semibold text-stone-600 hover:text-primary dark:text-stone-400 dark:hover:text-stone-200"
            >
              Back to Menu
            </button>
          )}
        </div>
      </div>

      {/* Mobile Search Overlay */}
      {activeView === 'menu' && showMobileSearch && (
        <div className="border-t border-stone-200 bg-cream p-4 transition-theme dark:border-dark-border dark:bg-dark-bg md:hidden">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-stone-400 dark:text-stone-500" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-stone-200 bg-stone-50 py-2 pl-10 pr-10 text-sm text-charcoal outline-none transition-all placeholder:text-stone-400 focus:border-primary focus:bg-white dark:border-stone-800 dark:bg-stone-900 dark:text-stone-200"
            />
            <button
              onClick={() => {
                setSearchQuery('');
                setShowMobileSearch(false);
              }}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-stone-400 hover:text-charcoal dark:hover:text-stone-200"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
export default Navbar;

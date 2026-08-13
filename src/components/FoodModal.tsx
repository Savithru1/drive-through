import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import type { SelectedCustomization } from '../context/CartContext';
import { CustomizationPanel } from './CustomizationPanel';
import { X, Minus, Plus, ShoppingCart, Clock, Shield } from 'lucide-react';

export const FoodModal: React.FC = () => {
  const { selectedItem, setSelectedItem, addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [extraCost, setExtraCost] = useState(0);
  const [customizations, setCustomizations] = useState<SelectedCustomization[]>([]);
  const [isClosing, setIsClosing] = useState(false);

  // Reset states when item changes
  useEffect(() => {
    if (selectedItem) {
      setQuantity(1);
      setExtraCost(0);
      setCustomizations([]);
      setIsClosing(false);
      document.body.style.overflow = 'hidden'; // lock scroll
    } else {
      document.body.style.overflow = ''; // unlock scroll
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedItem]);

  if (!selectedItem) return null;

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedItem(null);
      setIsClosing(false);
    }, 200); // match animation duration
  };

  const handleCustomizationChange = (customList: SelectedCustomization[], cost: number) => {
    setCustomizations(customList);
    setExtraCost(cost);
  };

  const handleAddToCart = () => {
    addToCart(selectedItem, customizations, quantity);
    handleClose();
  };

  const singleItemPrice = selectedItem.price + extraCost;
  const totalPrice = singleItemPrice * quantity;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 md:p-6 ${
      isClosing ? 'animate-fade-out' : 'animate-fade-in'
    }`}>
      {/* Backdrop */}
      <div 
        onClick={handleClose}
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity duration-300 dark:bg-black/80" 
      />

      {/* Modal Container */}
      <div className={`relative flex h-full w-full max-w-4xl flex-col bg-white shadow-2xl transition-all duration-300 dark:bg-stone-950 sm:h-[90vh] sm:rounded-3xl sm:border sm:border-stone-200/50 dark:sm:border-stone-850 overflow-hidden ${
        isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
      }`}>
        
        {/* Header (Absolute close button) */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 dark:bg-stone-900/80 text-stone-600 hover:text-charcoal hover:bg-white dark:text-stone-400 dark:hover:text-stone-200 dark:hover:bg-stone-800 shadow-md backdrop-blur-xs focus:outline-none transition-all"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Inner Content Layout */}
        <div className="flex flex-1 flex-col sm:flex-row overflow-hidden">
          
          {/* Left Column: Image & Basic details */}
          <div className="relative w-full sm:w-1/2 bg-stone-100 dark:bg-stone-900 flex flex-col justify-end overflow-hidden aspect-[16/10] sm:aspect-auto">
            <img
              src={selectedItem.image}
              alt={selectedItem.name}
              className="absolute inset-0 h-full w-full object-cover"
            />
            {/* Visual gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/10 to-transparent" />
            
            {/* Text Overlay for Image */}
            <div className="relative z-10 p-6 text-white hidden sm:block">
              <span className="inline-block rounded-lg bg-primary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">
                {selectedItem.category}
              </span>
              <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight leading-tight">
                {selectedItem.name}
              </h2>
              <p className="mt-2 text-xs text-stone-300 leading-relaxed max-w-sm">
                {selectedItem.description}
              </p>
            </div>
          </div>

          {/* Right Column: Customization & Actions */}
          <div className="flex w-full sm:w-1/2 flex-col overflow-y-auto bg-white dark:bg-stone-950 p-6 md:p-8">
            
            {/* Mobile Title Details */}
            <div className="block sm:hidden mb-4 border-b border-stone-100 dark:border-stone-850 pb-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                {selectedItem.category}
              </span>
              <h2 className="mt-1 font-display text-xl font-bold text-charcoal dark:text-stone-100">
                {selectedItem.name}
              </h2>
              <p className="mt-2 text-xs text-stone-500 dark:text-stone-400">
                {selectedItem.description}
              </p>
            </div>

            {/* Preparation speed pill */}
            <div className="flex items-center gap-4 mb-6 text-xs text-stone-500 dark:text-stone-400">
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-primary" />
                Prep Time: {selectedItem.preparationTime} mins
              </span>
              <span className="flex items-center gap-1">
                <Shield className="h-4 w-4 text-green-600" />
                Freshly Prepared
              </span>
            </div>

            {/* Customization Options */}
            {selectedItem.customization.length > 0 ? (
              <div className="flex-1">
                <CustomizationPanel
                  item={selectedItem}
                  onChange={handleCustomizationChange}
                />
              </div>
            ) : (
              <div className="flex-1 flex flex-col justify-center items-center py-10 text-stone-400">
                <p className="text-sm">No customizations available for this item.</p>
              </div>
            )}

            {/* Action Bar (Sticky at bottom of column) */}
            <div className="mt-8 border-t border-stone-150 dark:border-stone-850 pt-5">
              <div className="flex items-center justify-between gap-4">
                
                {/* Quantity Buttons */}
                <div className="flex items-center rounded-2xl border border-stone-200 bg-stone-50 p-1.5 dark:border-stone-800 dark:bg-stone-900">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-white dark:bg-stone-950 text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 disabled:opacity-40 transition-colors shadow-xs"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-12 text-center text-sm font-bold text-charcoal dark:text-stone-100">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-white dark:bg-stone-950 text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors shadow-xs"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                {/* Add to Cart CTA */}
                <button
                  onClick={handleAddToCart}
                  className="flex flex-1 items-center justify-between rounded-2xl bg-primary hover:bg-primary-hover px-5 py-4 font-bold text-white shadow-lg shadow-primary/10 transition-all hover:shadow-primary/20 active:scale-98"
                >
                  <span className="flex items-center gap-2 text-sm sm:text-base">
                    <ShoppingCart className="h-5 w-5" />
                    Add to Cart
                  </span>
                  <span className="text-base sm:text-lg">
                    ₹{totalPrice}
                  </span>
                </button>

              </div>
            </div>

          </div>
        </div>
      </div>
      
      {/* Inline styles for animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        .animate-fade-in {
          animation: fadeIn 0.2s ease-out forwards;
        }
        .animate-fade-out {
          animation: fadeOut 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};
export default FoodModal;

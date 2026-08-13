import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, Minus, Plus, Trash2, ArrowRight, ShoppingCart } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { cart, updateQuantity, removeFromCart, totals, setActiveView } = useCart();
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300); // matches animation duration
  };

  const handleProceedToCheckout = () => {
    handleClose();
    setActiveView('checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className={`absolute inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity duration-300 dark:bg-black/75 ${
          isClosing ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Slider container */}
      <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
        <div className={`w-screen max-w-md transform bg-white shadow-2xl transition-transform duration-300 dark:bg-stone-950 border-l border-stone-100 dark:border-stone-850 flex flex-col h-full ${
          isClosing ? 'translate-x-full' : 'translate-x-0'
        }`}>
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-stone-150 p-5 dark:border-stone-850">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-primary" />
              <h2 className="font-display text-lg font-bold text-charcoal dark:text-stone-100">
                Your Order
              </h2>
              <span className="rounded-full bg-stone-100 px-2.5 py-0.5 text-xs font-bold text-stone-500 dark:bg-stone-900 dark:text-stone-400">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </div>
            
            <button
              onClick={handleClose}
              className="flex h-9 w-9 items-center justify-center rounded-xl text-stone-500 hover:bg-stone-50 hover:text-charcoal dark:hover:bg-stone-900 dark:hover:text-stone-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto p-5 no-scrollbar">
            {cart.length === 0 ? (
              /* Empty Cart State */
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-stone-100 text-stone-400 mb-4 dark:bg-stone-900 dark:text-stone-600">
                  <ShoppingCart className="h-8 w-8" />
                </div>
                <h3 className="font-display text-lg font-bold text-charcoal dark:text-stone-100">
                  Your cart is empty
                </h3>
                <p className="mt-1 text-xs text-stone-500 dark:text-stone-400 max-w-[240px]">
                  Add some delicious fast food customizations to get started!
                </p>
                <button
                  onClick={handleClose}
                  className="mt-6 rounded-xl bg-primary px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-primary/20 hover:bg-primary-hover transition-colors"
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              /* Cart Item List */
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.cartItemId}
                    className="flex gap-4 rounded-2xl border border-stone-100 bg-white p-4 shadow-xs dark:border-stone-850 dark:bg-stone-900/60"
                  >
                    {/* Item Image */}
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-stone-100 dark:bg-stone-950">
                      <img
                        src={item.menuItem.image}
                        alt={item.menuItem.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-sm font-bold text-charcoal dark:text-stone-200 leading-tight">
                            {item.menuItem.name}
                          </h4>
                          {/* Customizations summary */}
                          {item.selectedCustomizations.length > 0 && (
                            <p className="mt-1 text-[11px] text-stone-400 leading-normal">
                              {item.selectedCustomizations.map((group) => (
                                <span key={group.groupId} className="block">
                                  {group.groupName}: {group.selectedOptions.map(o => o.name).join(', ')}
                                </span>
                              ))}
                            </p>
                          )}
                        </div>
                        
                        <button
                          onClick={() => removeFromCart(item.cartItemId)}
                          className="text-stone-400 hover:text-red-500 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Quantity & Itemized Pricing */}
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center rounded-xl border border-stone-250 bg-stone-50/50 p-1 dark:border-stone-800 dark:bg-stone-950">
                          <button
                            onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                            className="flex h-6 w-6 items-center justify-center rounded-lg hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-500"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-8 text-center text-xs font-bold text-charcoal dark:text-stone-200">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                            className="flex h-6 w-6 items-center justify-center rounded-lg hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-500"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        
                        <span className="text-sm font-bold text-charcoal dark:text-stone-200">
                          ₹{item.totalPrice}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Subtotal & checkout CTAs */}
          {cart.length > 0 && (
            <div className="border-t border-stone-150 p-5 dark:border-stone-850 bg-stone-50/50 dark:bg-stone-900/10">
              <div className="space-y-1.5 pb-4">
                <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
                  <span>Subtotal</span>
                  <span className="font-semibold text-charcoal dark:text-stone-300">₹{totals.subtotal}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
                  <span>Drive-Through Booking Fee</span>
                  <span className="font-semibold text-charcoal dark:text-stone-300">₹{totals.serviceFee}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
                  <span>GST (5%)</span>
                  <span className="font-semibold text-charcoal dark:text-stone-300">₹{totals.tax}</span>
                </div>
                <div className="flex items-center justify-between border-t border-stone-200 dark:border-stone-850 pt-2 text-base font-bold text-charcoal dark:text-stone-100">
                  <span>Total Est.</span>
                  <span className="text-lg text-primary">₹{totals.total}</span>
                </div>
              </div>

              <button
                onClick={handleProceedToCheckout}
                className="flex w-full items-center justify-between rounded-2xl bg-primary hover:bg-primary-hover px-5 py-4 font-bold text-white shadow-lg shadow-primary/10 transition-all hover:shadow-primary/20"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
export default CartDrawer;

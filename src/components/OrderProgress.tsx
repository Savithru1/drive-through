import React from 'react';
import { useCart } from '../context/CartContext';
import { Check, Clock, Car, Gift, RefreshCw, Sparkles, CheckCircle2 } from 'lucide-react';

export const OrderProgress: React.FC = () => {
  const { orderState, resetOrder } = useCart();
  
  if (orderState.status === 'none') {
    return (
      <div className="mx-auto max-w-md py-16 text-center">
        <h2 className="text-xl font-bold text-charcoal dark:text-stone-100">No active order found.</h2>
        <button
          onClick={resetOrder}
          className="mt-4 rounded-xl bg-primary px-6 py-2.5 font-bold text-white"
        >
          Return to Menu
        </button>
      </div>
    );
  }

  // Determine stage levels for classes
  const getStatusIndex = (status: string) => {
    switch (status) {
      case 'confirmed': return 0;
      case 'preparing': return 1;
      case 'ready': return 2;
      case 'pickedup': return 3;
      default: return 0;
    }
  };

  const currentIndex = getStatusIndex(orderState.status);

  const steps = [
    {
      label: 'Order Confirmed',
      description: 'Your order was received',
      icon: Check,
      color: 'bg-emerald-500 text-white'
    },
    {
      label: 'Preparing',
      description: 'Our kitchen is cooking it fresh',
      icon: Clock,
      color: 'bg-amber-500 text-white'
    },
    {
      label: 'Ready for Pickup',
      description: 'Head to the drive-through lane',
      icon: Car,
      color: 'bg-primary text-white'
    },
    {
      label: 'Picked Up',
      description: 'Order collected! Enjoy!',
      icon: Gift,
      color: 'bg-blue-500 text-white'
    }
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8 transition-theme dark:bg-dark-bg">
      <div className="rounded-3xl border border-stone-200/60 bg-white p-6 shadow-sm dark:border-stone-850 dark:bg-stone-900 md:p-10">
        
        {/* Animated Celebration Banner */}
        <div className="text-center pb-8 border-b border-stone-150 dark:border-stone-850">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4 animate-bounce">
            <Sparkles className="h-7 w-7" />
          </div>
          
          <h2 className="font-display text-2xl font-extrabold text-charcoal dark:text-stone-100 sm:text-3xl">
            {orderState.status === 'pickedup' ? 'Hope You Loved Your Meal!' : 'Order Confirmed!'}
          </h2>
          
          <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
            Order ID: <span className="font-mono font-bold text-charcoal dark:text-stone-200">{orderState.orderNumber}</span>
          </p>

          <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Active Drive-Through Queue
          </div>
        </div>

        {/* Timeline Progress Animation */}
        <div className="py-10">
          <div className="relative flex flex-col md:flex-row justify-between gap-8 md:gap-0">
            {/* Background connection line */}
            <div className="absolute left-[27px] top-0 bottom-0 w-1 bg-stone-100 dark:bg-stone-800 md:left-0 md:right-0 md:top-[26px] md:bottom-auto md:h-1 md:w-full" />
            
            {/* Foreground progress line */}
            <div 
              className="absolute left-[27px] top-0 w-1 bg-primary transition-all duration-700 md:left-0 md:top-[26px] md:h-1 md:w-full"
              style={{
                height: window.innerWidth < 768 ? `${(currentIndex / 3) * 100}%` : 'auto',
                width: window.innerWidth >= 768 ? `${(currentIndex / 3) * 100}%` : 'auto'
              }}
            />

            {/* Steps Rendering */}
            {steps.map((step, idx) => {
              const isCompleted = idx < currentIndex;
              const isActive = idx === currentIndex;

              const StepIcon = step.icon;

              return (
                <div key={step.label} className="relative z-10 flex md:flex-col items-center md:items-center text-left md:text-center gap-4 md:gap-2 md:w-1/4">
                  {/* Icon Badge */}
                  <div className={`flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-500 ${
                    isCompleted 
                      ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20 scale-105' 
                      : isActive 
                        ? 'bg-primary text-white shadow-lg shadow-primary/25 scale-110 animate-pulse ring-4 ring-primary/20' 
                        : 'bg-white border-2 border-stone-200 text-stone-400 dark:bg-stone-900 dark:border-stone-850 dark:text-stone-600'
                  }`}>
                    {isCompleted ? (
                      <Check className="h-5 w-5 stroke-[3px]" />
                    ) : (
                      <StepIcon className="h-5 w-5" />
                    )}
                  </div>

                  {/* Step Titles */}
                  <div>
                    <h4 className={`text-sm font-extrabold ${
                      isActive ? 'text-primary' : isCompleted ? 'text-emerald-500' : 'text-stone-400 dark:text-stone-600'
                    }`}>
                      {step.label}
                    </h4>
                    <p className="text-[11px] text-stone-400 dark:text-stone-500 mt-0.5 max-w-[150px] leading-tight">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Details Panel */}
        <div className="grid gap-6 md:grid-cols-2 border-t border-stone-150 dark:border-stone-850 pt-8">
          {/* Pickup info card */}
          <div className="bg-stone-50 rounded-2xl p-5 dark:bg-stone-950 border border-stone-150 dark:border-stone-850">
            <h3 className="font-display text-sm font-bold text-charcoal dark:text-stone-200 mb-3 uppercase tracking-wider">
              Pickup Instructions
            </h3>
            <div className="space-y-2 text-xs leading-relaxed text-stone-500 dark:text-stone-400">
              <div>
                <span className="font-semibold text-stone-400">Customer Name:</span>{' '}
                <span className="font-bold text-charcoal dark:text-stone-200">{orderState.pickupInfo?.name}</span>
              </div>
              <div>
                <span className="font-semibold text-stone-400">Mobile Phone:</span>{' '}
                <span className="font-bold text-charcoal dark:text-stone-200">{orderState.pickupInfo?.phone}</span>
              </div>
              <div>
                <span className="font-semibold text-stone-400">Vehicle Registered Plate:</span>{' '}
                <span className="inline-block bg-stone-200 text-charcoal font-bold px-2 py-0.5 rounded-md font-mono dark:bg-stone-800 dark:text-stone-100">
                  {orderState.pickupInfo?.vehicleNumber}
                </span>
              </div>
              <div>
                <span className="font-semibold text-stone-400">Reserved Pickup Slot:</span>{' '}
                <span className="font-bold text-primary">{orderState.pickupInfo?.pickupSlot}</span>
              </div>
              {orderState.pickupInfo?.specialInstructions && (
                <div>
                  <span className="font-semibold text-stone-400">Special Notes:</span>{' '}
                  <span className="italic">"{orderState.pickupInfo?.specialInstructions}"</span>
                </div>
              )}
            </div>
          </div>

          {/* Checkout items summary */}
          <div className="bg-stone-50 rounded-2xl p-5 dark:bg-stone-950 border border-stone-150 dark:border-stone-850 flex flex-col">
            <h3 className="font-display text-sm font-bold text-charcoal dark:text-stone-200 mb-3 uppercase tracking-wider">
              Ordered Items
            </h3>
            <div className="divide-y divide-stone-100 dark:divide-stone-900 overflow-y-auto max-h-36 pr-1 flex-1 text-xs text-stone-500 dark:text-stone-400">
              {orderState.items.map((item) => (
                <div key={item.cartItemId} className="py-2.5 flex justify-between">
                  <div>
                    <span className="font-bold text-charcoal dark:text-stone-200">{item.menuItem.name}</span>{' '}
                    <span className="text-stone-400">×{item.quantity}</span>
                    {item.selectedCustomizations.length > 0 && (
                      <span className="block text-[10px] text-stone-400 mt-0.5">
                        {item.selectedCustomizations.map(c => c.selectedOptions.map(o => o.name).join(', ')).join(' | ')}
                      </span>
                    )}
                  </div>
                  <span className="font-bold text-charcoal dark:text-stone-250">₹{item.totalPrice}</span>
                </div>
              ))}
            </div>
            
            <div className="pt-3 border-t border-stone-200 dark:border-stone-900 mt-3 flex justify-between text-sm font-bold text-charcoal dark:text-stone-100">
              <span>Total Paid (Simulated)</span>
              <span className="text-primary">₹{orderState.totals.total}</span>
            </div>
          </div>
        </div>

        {/* Demo status alert */}
        <div className="mt-8 rounded-2xl bg-amber-500/10 border border-amber-500/20 p-4 text-center text-xs text-amber-700 dark:text-amber-400">
          <p className="font-semibold leading-relaxed">
            💡 This is a live simulation. The stages update automatically.
            <br />
            {orderState.status === 'confirmed' && 'Next: Preparing starts in 5s...'}
            {orderState.status === 'preparing' && 'Next: Packaging order for drive-through lane in 5s...'}
            {orderState.status === 'ready' && 'Next: Auto-pickup simulation in 7s...'}
            {orderState.status === 'pickedup' && 'Completed! You can reset to make another simulation.'}
          </p>
        </div>

        {/* Reset / Actions */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={resetOrder}
            className="flex items-center gap-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-750 px-6 py-3 font-bold text-sm shadow-xs transition-transform active:scale-95 hover:bg-stone-200/60 dark:hover:bg-stone-700"
          >
            <RefreshCw className="h-4 w-4" />
            Reset Demo & Order Again
          </button>
        </div>

      </div>
    </div>
  );
};
export default OrderProgress;

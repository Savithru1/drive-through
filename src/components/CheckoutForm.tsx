import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { PickupSlots } from './PickupSlots';
import { ChevronLeft, ShoppingBag, CreditCard, ShieldCheck } from 'lucide-react';

export const CheckoutForm: React.FC = () => {
  const { cart, totals, placeOrder, setActiveView } = useCart();
  
  // Local form states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [pickupSlot, setPickupSlot] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  
  // Validation errors state
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const tempErrors: { [key: string]: string } = {};
    if (!name.trim()) {
      tempErrors.name = 'Full name is required';
    }
    if (!phone.trim()) {
      tempErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(phone.trim().replace(/[-\s]/g, ''))) {
      // 10-digit number validation
      tempErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    if (!vehicleNumber.trim()) {
      tempErrors.vehicleNumber = 'Vehicle plate number is required for drive-through identification';
    }
    if (!pickupSlot) {
      tempErrors.pickupSlot = 'Please select a drive-through pickup slot';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      placeOrder({
        name: name.trim(),
        phone: phone.trim(),
        vehicleNumber: vehicleNumber.trim().toUpperCase(),
        pickupSlot,
        specialInstructions: specialInstructions.trim()
      });
    }
  };

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl font-bold text-charcoal dark:text-stone-100">
          Your cart is empty
        </h2>
        <p className="mt-2 text-sm text-stone-500">
          Add items to your cart before proceeding to checkout.
        </p>
        <button
          onClick={() => setActiveView('menu')}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-bold text-white shadow-md hover:bg-primary-hover"
        >
          <ChevronLeft className="h-5 w-5" />
          Back to Menu
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 transition-theme dark:bg-dark-bg">
      {/* Back to menu button */}
      <button
        onClick={() => setActiveView('menu')}
        className="mb-6 flex items-center gap-1.5 text-sm font-bold text-stone-500 hover:text-charcoal dark:text-stone-400 dark:hover:text-stone-200 transition-colors"
      >
        <ChevronLeft className="h-4 w-4" />
        Back to Menu
      </button>

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Left Column: Form & Slots */}
        <form onSubmit={handleSubmit} className="space-y-6 lg:col-span-7">
          <div className="rounded-3xl border border-stone-200/60 bg-white p-6 shadow-sm dark:border-stone-850 dark:bg-stone-900">
            <h2 className="font-display text-xl font-bold text-charcoal dark:text-stone-100 mb-6 border-b border-stone-100 dark:border-stone-850 pb-4">
              Drive-Through Pickup Details
            </h2>

            <div className="space-y-4">
              {/* Customer Name */}
              <div>
                <label className="block text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
                  }}
                  className={`w-full rounded-2xl border bg-stone-50/50 px-4 py-3 text-sm text-charcoal outline-none transition-all dark:bg-stone-950 dark:text-stone-200 ${
                    errors.name
                      ? 'border-red-500 focus:ring-2 focus:ring-red-500/20'
                      : 'border-stone-200 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-stone-800'
                  }`}
                />
                {errors.name && (
                  <p className="mt-1.5 text-xs font-semibold text-red-500">{errors.name}</p>
                )}
              </div>

              {/* Phone & Vehicle Grid */}
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Phone Number */}
                <div>
                  <label className="block text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-2">
                    Mobile Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="9876543210"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }));
                    }}
                    className={`w-full rounded-2xl border bg-stone-50/50 px-4 py-3 text-sm text-charcoal outline-none transition-all dark:bg-stone-950 dark:text-stone-200 ${
                      errors.phone
                        ? 'border-red-500 focus:ring-2 focus:ring-red-500/20'
                        : 'border-stone-200 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-stone-800'
                    }`}
                  />
                  {errors.phone && (
                    <p className="mt-1.5 text-xs font-semibold text-red-500">{errors.phone}</p>
                  )}
                </div>

                {/* Vehicle Number */}
                <div>
                  <label className="block text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-2">
                    Vehicle Number Plate
                  </label>
                  <input
                    type="text"
                    placeholder="KA-01-AB-1234"
                    value={vehicleNumber}
                    onChange={(e) => {
                      setVehicleNumber(e.target.value);
                      if (errors.vehicleNumber) setErrors(prev => ({ ...prev, vehicleNumber: '' }));
                    }}
                    className={`w-full rounded-2xl border bg-stone-50/50 px-4 py-3 text-sm text-charcoal outline-none transition-all dark:bg-stone-950 dark:text-stone-200 ${
                      errors.vehicleNumber
                        ? 'border-red-500 focus:ring-2 focus:ring-red-500/20'
                        : 'border-stone-200 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-stone-800'
                    }`}
                  />
                  {errors.vehicleNumber && (
                    <p className="mt-1.5 text-xs font-semibold text-red-500">{errors.vehicleNumber}</p>
                  )}
                </div>
              </div>

              {/* Pickup slots picker */}
              <div className="pt-4">
                <PickupSlots
                  selectedSlot={pickupSlot}
                  onSelectSlot={(slot) => {
                    setPickupSlot(slot);
                    if (errors.pickupSlot) setErrors(prev => ({ ...prev, pickupSlot: '' }));
                  }}
                />
                {errors.pickupSlot && (
                  <p className="mt-1.5 text-xs font-semibold text-red-500">{errors.pickupSlot}</p>
                )}
              </div>

              {/* Special Instructions */}
              <div className="pt-4">
                <label className="block text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-2">
                  Special Instructions (Optional)
                </label>
                <textarea
                  placeholder="e.g. Extra napkins, sauces in a separate bag, vehicle color details..."
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  rows={3}
                  className="w-full rounded-2xl border border-stone-200 bg-stone-50/50 px-4 py-3 text-sm text-charcoal outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-stone-800 dark:bg-stone-950 dark:text-stone-200 resize-none"
                />
              </div>

            </div>
          </div>
        </form>

        {/* Right Column: Order Summary & Place button */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl border border-stone-200/60 bg-white p-6 shadow-sm dark:border-stone-850 dark:bg-stone-900">
            <h2 className="font-display text-xl font-bold text-charcoal dark:text-stone-100 mb-4 flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-primary" />
              Order Summary
            </h2>

            {/* Itemized Order list */}
            <div className="divide-y divide-stone-100 dark:divide-stone-850 max-h-60 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.cartItemId} className="py-3 flex justify-between gap-3 text-sm">
                  <div>
                    <div className="font-semibold text-charcoal dark:text-stone-200">
                      {item.menuItem.name} <span className="text-xs text-stone-400">×{item.quantity}</span>
                    </div>
                    {item.selectedCustomizations.length > 0 && (
                      <p className="text-[10px] text-stone-400 dark:text-stone-500 mt-0.5 leading-tight">
                        {item.selectedCustomizations.map(c => c.selectedOptions.map(o => o.name).join(', ')).join(' | ')}
                      </p>
                    )}
                  </div>
                  <span className="font-bold text-charcoal dark:text-stone-200">₹{item.totalPrice}</span>
                </div>
              ))}
            </div>

            {/* Calculations Panel */}
            <div className="mt-4 border-t border-stone-150 dark:border-stone-850 pt-4 space-y-2 text-xs text-stone-500 dark:text-stone-400">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-charcoal dark:text-stone-200">₹{totals.subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>GST (5%)</span>
                <span className="font-semibold text-charcoal dark:text-stone-200">₹{totals.tax}</span>
              </div>
              <div className="flex justify-between">
                <span>Drive-Through Packaging & Slot Fee</span>
                <span className="font-semibold text-charcoal dark:text-stone-200">₹{totals.serviceFee}</span>
              </div>
              
              <div className="flex justify-between border-t border-stone-150 dark:border-stone-850 pt-3 text-base font-bold text-charcoal dark:text-stone-100">
                <span>Total Amount</span>
                <span className="text-lg text-primary">₹{totals.total}</span>
              </div>
            </div>

            {/* Security Note */}
            <div className="mt-6 flex gap-2.5 items-start bg-stone-50 p-4 rounded-2xl dark:bg-stone-950 border border-stone-150 dark:border-stone-850 text-[11px] text-stone-400 dark:text-stone-500 leading-normal">
              <ShieldCheck className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-stone-500 dark:text-stone-400">Simulated Payment:</span> No real payment info is collected or processed. Placing the order starts the animated preparation timer!
              </div>
            </div>

            {/* Submit Action */}
            <button
              onClick={handleSubmit}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary hover:bg-primary-hover py-4 font-bold text-white shadow-lg shadow-primary/10 transition-all hover:shadow-primary/20"
            >
              <CreditCard className="h-5 w-5" />
              Place Order (Simulated)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CheckoutForm;

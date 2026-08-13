import React from 'react';
import { Clock } from 'lucide-react';

interface PickupSlotsProps {
  selectedSlot: string;
  onSelectSlot: (slot: string) => void;
}

export const PICKUP_SLOTS = [
  '12:00 PM – 12:10 PM',
  '12:10 PM – 12:20 PM',
  '12:20 PM – 12:30 PM',
  '12:30 PM – 12:40 PM',
  '12:40 PM – 12:50 PM',
  '01:00 PM – 01:10 PM',
  '01:10 PM – 01:20 PM',
  '01:20 PM – 01:30 PM',
  '01:30 PM – 01:40 PM'
];

export const PickupSlots: React.FC<PickupSlotsProps> = ({ selectedSlot, onSelectSlot }) => {
  return (
    <div>
      <h3 className="flex items-center gap-1.5 font-display text-sm font-bold text-charcoal dark:text-stone-200 mb-3">
        <Clock className="h-4 w-4 text-primary" />
        Select Drive-Through Pickup Slot
      </h3>
      
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {PICKUP_SLOTS.map((slot) => {
          const isSelected = selectedSlot === slot;
          return (
            <button
              key={slot}
              type="button"
              onClick={() => onSelectSlot(slot)}
              className={`rounded-2xl border px-3 py-3 text-center text-xs font-bold transition-all focus:outline-none focus:ring-2 focus:ring-primary/25 ${
                isSelected
                  ? 'border-primary bg-primary text-white shadow-md shadow-primary/10'
                  : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50 dark:border-stone-850 dark:bg-stone-900 dark:text-stone-300 dark:hover:bg-stone-800'
              }`}
            >
              {slot}
            </button>
          );
        })}
      </div>
    </div>
  );
};
export default PickupSlots;

import React, { useState, useEffect } from 'react';
import type { MenuItem, CustomizationGroup } from '../data/menu';
import type { SelectedCustomization } from '../context/CartContext';

interface CustomizationPanelProps {
  item: MenuItem;
  onChange: (customizations: SelectedCustomization[], extraCost: number) => void;
}

export const CustomizationPanel: React.FC<CustomizationPanelProps> = ({ item, onChange }) => {
  // Store selections by group ID
  const [selections, setSelections] = useState<{ [groupId: string]: { name: string; price: number }[] }>(() => {
    const initial: { [groupId: string]: { name: string; price: number }[] } = {};
    item.customization.forEach(group => {
      if (group.type === 'select') {
        // Set first option as default
        initial[group.id] = [group.options[0]];
      } else {
        // Checkboxes start empty
        initial[group.id] = [];
      }
    });
    return initial;
  });

  // Whenever selections change, compute total extra cost and notify parent
  useEffect(() => {
    const formattedCustomizations: SelectedCustomization[] = Object.keys(selections).map(groupId => {
      const group = item.customization.find(g => g.id === groupId)!;
      return {
        groupId,
        groupName: group.name,
        selectedOptions: selections[groupId]
      };
    });

    // Filter out groups with no selection (e.g. empty checkbox groups)
    const activeCustomizations = formattedCustomizations.filter(c => c.selectedOptions.length > 0);

    const extraCost = activeCustomizations.reduce((sum, group) => {
      return sum + group.selectedOptions.reduce((groupSum, option) => groupSum + option.price, 0);
    }, 0);

    onChange(activeCustomizations, extraCost);
  }, [selections, item, onChange]);

  const handleSelectOption = (group: CustomizationGroup, option: { name: string; price: number }) => {
    setSelections(prev => ({
      ...prev,
      [group.id]: [option]
    }));
  };

  const handleCheckboxOption = (group: CustomizationGroup, option: { name: string; price: number }) => {
    setSelections(prev => {
      const current = prev[group.id] || [];
      const exists = current.some(o => o.name === option.name);
      
      const updated = exists
        ? current.filter(o => o.name !== option.name)
        : [...current, option];

      return {
        ...prev,
        [group.id]: updated
      };
    });
  };

  return (
    <div className="space-y-6">
      {item.customization.map((group) => {
        const selectedList = selections[group.id] || [];

        return (
          <div key={group.id} className="border-b border-stone-100 dark:border-stone-850 pb-5 last:border-b-0 last:pb-0">
            <h4 className="font-display text-sm font-bold text-charcoal dark:text-stone-200 mb-3 flex items-center justify-between">
              <span>{group.name}</span>
              {group.type === 'select' && (
                <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md uppercase tracking-wider">
                  Required
                </span>
              )}
            </h4>

            {group.type === 'select' ? (
              /* Radio buttons styled as rows */
              <div className="space-y-2">
                {group.options.map((option) => {
                  const isSelected = selectedList.some(o => o.name === option.name);
                  return (
                    <button
                      key={option.name}
                      onClick={() => handleSelectOption(group, option)}
                      className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left transition-all ${
                        isSelected
                          ? 'border-primary bg-primary/5 text-primary dark:bg-primary/10'
                          : 'border-stone-200 hover:bg-stone-50 dark:border-stone-800 dark:hover:bg-stone-900 text-stone-600 dark:text-stone-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                          isSelected ? 'border-primary bg-primary' : 'border-stone-300 dark:border-stone-700'
                        }`}>
                          {isSelected && <div className="h-2 w-2 rounded-full bg-white" />}
                        </div>
                        <span className="text-sm font-semibold">{option.name}</span>
                      </div>
                      <span className="text-sm font-bold">
                        {option.price > 0 ? `+₹${option.price}` : 'Free'}
                      </span>
                    </button>
                  );
                })}
              </div>
            ) : (
              /* Checkboxes styled as grid or wrap buttons */
              <div className="grid grid-cols-2 gap-2">
                {group.options.map((option) => {
                  const isSelected = selectedList.some(o => o.name === option.name);
                  return (
                    <button
                      key={option.name}
                      onClick={() => handleCheckboxOption(group, option)}
                      className={`flex items-center justify-between rounded-2xl border p-3.5 text-left transition-all ${
                        isSelected
                          ? 'border-primary bg-primary/5 text-primary dark:bg-primary/10'
                          : 'border-stone-200 hover:bg-stone-50 dark:border-stone-800 dark:hover:bg-stone-900 text-stone-600 dark:text-stone-300'
                      }`}
                    >
                      <span className="text-xs font-semibold break-all leading-tight pr-1">{option.name}</span>
                      <span className="text-xs font-bold whitespace-nowrap text-stone-500 dark:text-stone-400">
                        {option.price > 0 ? `+₹${option.price}` : 'Free'}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
export default CustomizationPanel;

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { MenuItem } from '../data/menu';

export interface SelectedCustomization {
  groupId: string;
  groupName: string;
  selectedOptions: { name: string; price: number }[];
}

export interface CartItem {
  cartItemId: string; // unique string computed from item ID and customizations
  menuItem: MenuItem;
  selectedCustomizations: SelectedCustomization[];
  quantity: number;
  addedPrice: number; // price of 1 item with customizations
  totalPrice: number; // addedPrice * quantity
}

export interface CheckoutInfo {
  name: string;
  phone: string;
  vehicleNumber: string;
  pickupSlot: string;
  specialInstructions: string;
}

export type OrderStatus = 'none' | 'confirmed' | 'preparing' | 'ready' | 'pickedup';

export interface OrderState {
  orderNumber: string | null;
  status: OrderStatus;
  items: CartItem[];
  totals: {
    subtotal: number;
    tax: number;
    serviceFee: number;
    total: number;
  };
  pickupInfo: CheckoutInfo | null;
}

export type ActiveView = 'menu' | 'checkout' | 'order-progress';

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: MenuItem, customizations: SelectedCustomization[], quantity: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, newQuantity: number) => void;
  clearCart: () => void;
  
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  selectedItem: MenuItem | null;
  setSelectedItem: (item: MenuItem | null) => void;
  
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  
  checkoutInfo: CheckoutInfo;
  setCheckoutInfo: React.Dispatch<React.SetStateAction<CheckoutInfo>>;
  
  orderState: OrderState;
  placeOrder: (info: CheckoutInfo) => void;
  resetOrder: () => void;
  
  totals: {
    subtotal: number;
    tax: number;
    serviceFee: number;
    total: number;
  };
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial states from localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('steward_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const savedTheme = localStorage.getItem('steward_theme');
    if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
    // Default to system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [activeView, setActiveView] = useState<ActiveView>('menu');
  
  const [checkoutInfo, setCheckoutInfo] = useState<CheckoutInfo>({
    name: '',
    phone: '',
    vehicleNumber: '',
    pickupSlot: '',
    specialInstructions: ''
  });

  const [orderState, setOrderState] = useState<OrderState>(() => {
    const savedOrder = localStorage.getItem('steward_order');
    return savedOrder ? JSON.parse(savedOrder) : {
      orderNumber: null,
      status: 'none',
      items: [],
      totals: { subtotal: 0, tax: 0, serviceFee: 0, total: 0 },
      pickupInfo: null
    };
  });

  // Persist cart
  useEffect(() => {
    localStorage.setItem('steward_cart', JSON.stringify(cart));
  }, [cart]);

  // Persist theme and apply class to documentElement
  useEffect(() => {
    localStorage.setItem('steward_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Persist order
  useEffect(() => {
    localStorage.setItem('steward_order', JSON.stringify(orderState));
  }, [orderState]);

  // Dynamic pricing calculations
  const [totals, setTotals] = useState({ subtotal: 0, tax: 0, serviceFee: 0, total: 0 });

  useEffect(() => {
    const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
    const tax = Math.round(subtotal * 0.05); // 5% tax
    const serviceFee = subtotal > 0 ? 25 : 0; // Flat ₹25 drive-through packing & slot booking fee
    const total = subtotal + tax + serviceFee;
    setTotals({ subtotal, tax, serviceFee, total });
  }, [cart]);

  // Order status animation timers
  useEffect(() => {
    if (orderState.status === 'none' || orderState.status === 'pickedup') return;

    let timer: any;
    
    if (orderState.status === 'confirmed') {
      timer = setTimeout(() => {
        setOrderState(prev => ({ ...prev, status: 'preparing' }));
      }, 5000); // 5 seconds
    } else if (orderState.status === 'preparing') {
      timer = setTimeout(() => {
        setOrderState(prev => ({ ...prev, status: 'ready' }));
      }, 5000); // 5 seconds
    } else if (orderState.status === 'ready') {
      timer = setTimeout(() => {
        setOrderState(prev => ({ ...prev, status: 'pickedup' }));
      }, 7000); // 7 seconds until picked up simulation
    }

    return () => clearTimeout(timer);
  }, [orderState.status]);

  // Helper to generate unique cartItemId
  const getCartItemId = (itemId: string, customizations: SelectedCustomization[]) => {
    // Sort customizations to ensure consistency in ID generation
    const sorted = [...customizations].sort((a, b) => a.groupId.localeCompare(b.groupId));
    const customString = sorted
      .map(g => `${g.groupId}:${g.selectedOptions.map(o => o.name).sort().join(',')}`)
      .join('|');
    return `${itemId}-${customString}`;
  };

  const addToCart = (item: MenuItem, customizations: SelectedCustomization[], quantity: number) => {
    const cartItemId = getCartItemId(item.id, customizations);
    
    // Calculate single item price with options
    const customCost = customizations.reduce((sum, group) => {
      return sum + group.selectedOptions.reduce((innerSum, opt) => innerSum + opt.price, 0);
    }, 0);
    const addedPrice = item.price + customCost;

    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(i => i.cartItemId === cartItemId);
      
      if (existingItemIndex > -1) {
        // Increment quantity of existing item
        const updatedCart = [...prevCart];
        const currentQty = updatedCart[existingItemIndex].quantity;
        const newQty = currentQty + quantity;
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: newQty,
          totalPrice: addedPrice * newQty
        };
        return updatedCart;
      } else {
        // Add new item
        return [
          ...prevCart,
          {
            cartItemId,
            menuItem: item,
            selectedCustomizations: customizations,
            quantity,
            addedPrice,
            totalPrice: addedPrice * quantity
          }
        ];
      }
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prevCart => prevCart.filter(item => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.cartItemId === cartItemId
          ? { ...item, quantity: newQuantity, totalPrice: item.addedPrice * newQuantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const placeOrder = (info: CheckoutInfo) => {
    // Generate order number STW-XXXXX
    const num = Math.floor(10000 + Math.random() * 90000);
    const orderNumber = `STW-${num}`;

    const newOrder: OrderState = {
      orderNumber,
      status: 'confirmed',
      items: [...cart],
      totals: { ...totals },
      pickupInfo: info
    };

    setOrderState(newOrder);
    clearCart();
    setCheckoutInfo({
      name: '',
      phone: '',
      vehicleNumber: '',
      pickupSlot: '',
      specialInstructions: ''
    });
    setActiveView('order-progress');
  };

  const resetOrder = () => {
    setOrderState({
      orderNumber: null,
      status: 'none',
      items: [],
      totals: { subtotal: 0, tax: 0, serviceFee: 0, total: 0 },
      pickupInfo: null
    });
    setActiveView('menu');
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        selectedItem,
        setSelectedItem,
        theme,
        toggleTheme,
        activeView,
        setActiveView,
        checkoutInfo,
        setCheckoutInfo,
        orderState,
        placeOrder,
        resetOrder,
        totals
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

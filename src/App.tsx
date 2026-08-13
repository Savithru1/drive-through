import React, { useState } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryNav } from './components/CategoryNav';
import { MenuGrid } from './components/MenuGrid';
import { FoodModal } from './components/FoodModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutForm } from './components/CheckoutForm';
import { OrderProgress } from './components/OrderProgress';
import { Footer } from './components/Footer';

const AppContent: React.FC = () => {
  const { activeView } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const scrollToMenu = () => {
    const section = document.getElementById('menu-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream text-charcoal transition-theme dark:bg-dark-bg dark:text-stone-100">
      {/* Navigation Header */}
      <Navbar onOpenCart={() => setIsCartOpen(true)} />

      {/* Main Container */}
      <main className="flex-1">
        {activeView === 'menu' && (
          <div className="animate-slide-up">
            <Hero onOrderNowClick={scrollToMenu} />
            <CategoryNav />
            <MenuGrid />
          </div>
        )}

        {activeView === 'checkout' && (
          <div className="animate-slide-up">
            <CheckoutForm />
          </div>
        )}

        {activeView === 'order-progress' && (
          <div className="animate-slide-up">
            <OrderProgress />
          </div>
        )}
      </main>

      {/* Shared Modals / Overlays */}
      <FoodModal />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Footer Branding */}
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
};

export default App;

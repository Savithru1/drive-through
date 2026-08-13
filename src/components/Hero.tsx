import React from 'react';
import { ArrowRight, Clock, ShieldCheck, Zap } from 'lucide-react';

interface HeroProps {
  onOrderNowClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOrderNowClick }) => {
  return (
    <section className="relative overflow-hidden bg-cream py-12 transition-theme dark:bg-dark-bg md:py-20 lg:py-24">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary/10 blur-3xl dark:bg-primary/5" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-8">
          {/* Text Content */}
          <div className="text-center lg:col-span-7 lg:text-left">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3.5 py-1.5 text-xs font-semibold tracking-wider text-primary uppercase dark:bg-primary/20">
              <Zap className="h-3.5 w-3.5 fill-primary" />
              The Smartest Drive-Through
            </div>
            
            <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-charcoal dark:text-stone-100 sm:text-5xl md:text-6xl lg:leading-tight">
              GOOD FOOD.<br />
              <span className="text-primary">NO WAITING.</span>
            </h1>
            
            <p className="mt-4 text-base text-stone-600 dark:text-stone-400 sm:mt-6 sm:text-lg lg:max-w-xl">
              Steward reinvents the drive-through ordering experience. Browse our menu, customize your meal, select your pickup time slot, and collect your order fresh and hot without stepping out of your vehicle.
            </p>
            
            {/* CTAs */}
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <button
                onClick={onOrderNowClick}
                className="flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3.5 font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-hover hover:shadow-primary/30 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-dark-bg"
              >
                Order Now
                <ArrowRight className="h-5 w-5" />
              </button>
              
              <a
                href="#menu-section"
                className="flex items-center justify-center rounded-xl border-2 border-stone-200 bg-white px-8 py-3.5 font-semibold text-charcoal shadow-sm transition-all hover:bg-stone-50 hover:border-stone-300 active:scale-95 focus:outline-none dark:border-stone-850 dark:bg-stone-900 dark:text-stone-350 dark:hover:bg-stone-800"
              >
                Explore Menu
              </a>
            </div>

            {/* Micro value props */}
            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-stone-200/60 pt-8 dark:border-stone-800/60 max-w-lg mx-auto lg:mx-0">
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary/15 text-secondary-hover">
                  <Clock className="h-5 w-5" />
                </div>
                <span className="mt-2 text-xs font-bold text-charcoal dark:text-stone-300">Under 10 Mins</span>
                <span className="text-[10px] text-stone-500">Average prep speed</span>
              </div>
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-500/15 text-green-600">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <span className="mt-2 text-xs font-bold text-charcoal dark:text-stone-300">Zero Contact</span>
                <span className="text-[10px] text-stone-500">Drive-through pickup</span>
              </div>
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
                  <Zap className="h-5 w-5" />
                </div>
                <span className="mt-2 text-xs font-bold text-charcoal dark:text-stone-300">Fresh & Hot</span>
                <span className="text-[10px] text-stone-500">Made for your slot</span>
              </div>
            </div>
          </div>
          
          {/* Visual Content */}
          <div className="relative lg:col-span-5">
            <div className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none">
              {/* Outer decorative ring */}
              <div className="absolute inset-0 rounded-3xl border-2 border-dashed border-stone-200 dark:border-stone-850 transform rotate-3" />
              
              {/* Main Image */}
              <div className="overflow-hidden rounded-3xl bg-stone-100 shadow-2xl dark:bg-stone-900 border border-stone-200/50 dark:border-stone-800">
                <img
                  src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80"
                  alt="Steward Classic Burger & Fries Combo"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="eager"
                />
              </div>

              {/* Floating badges */}
              <div className="absolute -top-4 -left-4 animate-bounce rounded-2xl bg-white p-3 shadow-lg dark:bg-stone-900 dark:border dark:border-stone-800 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-white font-bold text-sm">
                  ★
                </div>
                <div>
                  <div className="text-[10px] font-bold text-stone-400 uppercase">Bestseller</div>
                  <div className="text-xs font-bold text-charcoal dark:text-stone-200">Classic Combo</div>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 rounded-2xl bg-white p-3.5 shadow-lg dark:bg-stone-900 dark:border dark:border-stone-800 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-charcoal">
                  <Clock className="h-5 w-5 font-bold" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-stone-400 uppercase">Ready In</div>
                  <div className="text-xs font-bold text-charcoal dark:text-stone-200">8 Minutes</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Hero;

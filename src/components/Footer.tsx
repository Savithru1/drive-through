import React from 'react';
import { Utensils, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-stone-900 text-stone-300 transition-theme border-t border-stone-850 dark:bg-black">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-12 md:gap-8 pb-8 border-b border-stone-800">
          
          {/* Brand info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white">
                <Utensils className="h-4.5 w-4.5" />
              </div>
              <span className="font-display text-xl font-extrabold tracking-tight text-white">
                STEWARD
              </span>
            </div>
            <p className="text-xs text-stone-400 max-w-sm leading-relaxed">
              We design smart click-and-collect drive-through solutions. Fresh, hot, and customized fast food delivered straight to your car window within your chosen pickup slot.
            </p>
          </div>

          {/* Opening Hours */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Service Hours
            </h4>
            <div className="text-xs text-stone-400 space-y-1">
              <p>Monday - Friday: 11:00 AM - 11:00 PM</p>
              <p>Saturday - Sunday: 10:00 AM - 12:00 AM</p>
              <p className="text-primary font-semibold mt-1">Drive-Through Lane Open 24/7</p>
            </div>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Restaurant Location
            </h4>
            <ul className="text-xs text-stone-400 space-y-2">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                <span>100 steward Express Way, Food Park, Bangalore, KA</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <span>contact@stewardorder.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
          <p>© {new Date().getFullYear()} Steward Express. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-stone-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-stone-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-stone-300 transition-colors">Support</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
export default Footer;

# Steward — Smart Drive-Through Ordering Platform

Steward is a premium, fully responsive, static web application designed to simulate a modern drive-through restaurant ordering experience. It offers a smooth, mobile-first interface allowing customers to browse a customized menu, adjust items, reserve drive-through pickup time slots, provide vehicle registration numbers, and track their order preparation status in real time.

---

## 🌟 Features

- **Responsive & Premium UI:** Styled using Tailwind CSS v4, supporting dynamic light and dark theme toggles (persisted in `localStorage`).
- **Interactive Menu & Categories:** Quick category filtering (Burgers, Chicken, Sides, Wraps, Beverages, Desserts, Combos) with instant search on food names, categories, and descriptions.
- **Detailed Customizations:** Live cost adjustments based on selected item configurations (sizes, extra cheese, meat upgrades, toppings).
- **Persistent Shopping Cart:** Tracks quantities, customizations, item subtotals, packaging slot fees (₹25), and 5% GST dynamically.
- **Drive-Through Slot Scheduling:** Displays reservation time slots that must be selected before placing an order.
- **Simulated Checkout:** Gathers name, phone, and vehicle plate number for drive-through identification, generating a unique order number (e.g., `STW-XXXXX`).
- **Animated Order Status Tracker:** A simulated timeline (Order Confirmed ➔ Preparing ➔ Ready for Pickup ➔ Picked Up) updating automatically using frontend state and timers.

---

## 🛠️ Tech Stack

- **Framework:** React 19
- **Build Tool:** Vite 8 (with `@tailwindcss/vite` plugin)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React

---

## 📁 Project Structure

```
drivethrough/
├── public/                 # Static assets
└── src/
    ├── components/         # UI Elements
    │   ├── Navbar.tsx      # Header with search, theme toggle, and cart badge
    │   ├── Hero.tsx        # Promo section with primary CTAs
    │   ├── CategoryNav.tsx # Horizontally scrollable category selectors
    │   ├── MenuGrid.tsx    # Filtered products display & empty state
    │   ├── MenuCard.tsx    # Food item card displaying name, description, price, prep-time
    │   ├── FoodModal.tsx   # Lightbox display for product configurations
    │   ├── CustomizationPanel.tsx # Size, toppings, and extras select/checkbox forms
    │   ├── CartDrawer.tsx  # Sidebar listing cart items, quantities, and totals
    │   ├── PickupSlots.tsx # Selectable drive-through time slots
    │   ├── CheckoutForm.tsx # User input collection and local validations
    │   ├── OrderProgress.tsx # Timed progression bar and drive-through vehicle receipt
    │   └── Footer.tsx      # Informational footer
    ├── context/
    │   └── CartContext.tsx # Global state: cart operations, theme, and timer simulation
    ├── data/
    │   └── menu.ts         # High-quality menu database with Unsplash photo links
    ├── App.tsx             # Main layout, client-side routing, provider wrapper
    ├── index.css           # Tailwind v4 directives, custom font imports, transitions
    └── main.tsx            # DOM mounting entrypoint
```

---

## 🚀 Running Locally

Follow these commands to install and start the local development server:

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open your browser to the local URL (usually `http://localhost:5173`).

---

## 📦 Production Build

To compile TypeScript and bundle assets for hosting:

1. **Create Build**
   ```bash
   npm run build
   ```

2. **Preview Production Build Locally**
   ```bash
   npm run preview
   ```
   This compiles the output into the `dist/` directory, which can be uploaded directly to static hosting providers.

---

## ☁️ Deployment

Steward is designed to be hosted on free static website providers. 

### Deploying to Cloudflare Pages / Vercel:
1. Push this repository to your GitHub account.
2. Link the repository to your Cloudflare Pages or Vercel dashboard.
3. Configure the build parameters:
   - **Framework Preset:** Vite / None
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Deploy! The platform will automatically deploy commits pushed to the `main` branch.

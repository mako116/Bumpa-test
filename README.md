# The Book Nook App

The Book Nook is a premium React Native bookstore application built on Expo SDK 54. It features a responsive layout system, global Zustand stores with AsyncStorage persistence, smooth Reanimated micro-animations, and a highly structured codebase.

---

## Features

- **Home Feed**: Shows a featured hero book, category selection pills, a horizontal trending slider, and a grid of new arrivals.
- **Browse & Search**: Features high-performance debounced queries, genre filtering, and infinite scroll pagination to prevent layout shift glitches.
- **Book Details**: Displays detailed book metadata, customer reviews, stock availability, and a haptic add-to-cart "fly" animation.
- **Zustand State Management**: Centralized stores manage the catalog cache and cart operations. Cart items persist automatically in local storage.
- **Responsive Layout Wrapper**: An `AppLayout` container scales component paddings, margins, and status bar offsets across various iOS and Android screen sizes.
- **Custom Shimmer Loaders**: Sliding linear-gradient skeleton layouts simulate actual page structures during load times instead of generic spinners.
- **Secure Checkout Form**: Real-time form validators, payment method toggles, and a successful order summary screen accompanied by confetti and success haptics.

---

## Project Structure

```
bumpa/
├── app/                  # Expo Router file-based routing
│   ├── _layout.tsx       # Root layout configuration
│   ├── (tabs)/           # Tab navigation layout (Home, Search, Cart)
│   │   ├── _layout.tsx   # Custom TabBar configurations & Left/Right header hooks
│   │   ├── index.tsx     # Home Screen
│   │   ├── search.tsx    # Browse & Search Screen
│   │   └── cart.tsx      # Shopping Cart Screen
│   ├── book/
│   │   └── [id].tsx      # Dynamic Book Details Screen
│   └── checkout.tsx      # Order Checkout Screen
│
├── components/           # Flat, modular UI components grouped by feature
│   ├── books/            # Book cards, rating stars, and reviews
│   ├── cart/             # Cart badges, quantities, list items, and summaries
│   ├── checkout/         # Form validation fields and payment methods
│   ├── home/             # Hero banner, category pills, and trending carousels
│   ├── layout/           # AppLayout responsive viewport wrapper
│   └── ui/               # Primitive components (Buttons, Inputs, Shimmers, Skeletons)
│
├── hooks/                # Global React hooks connected directly to Zustand stores
├── lib/                  # Services and global state stores
│   ├── services/         # bookApi (mock catalog data & live Serper query mapping)
│   ├── stores/           # Zustand stores (book, cart)
│   └── mockData.ts       # Database of 50+ books and nested reviews
│
├── types/                # Centralized TypeScript type definitions
└── utils/                # Helper utilities (price formatting, numeric parse helpers)
```

---

## Getting Started

### Prerequisites
Ensure you have Node.js and the Expo CLI installed.

1. **Navigate to the Project**:
   ```bash
   cd bumpa
   ```

2. **Install Node Modules**:
   To ensure smooth peer matching on React 19 libraries, run install with the legacy peer flag:
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Start the Metro Bundler**:
   ```bash
   npx expo start
   ```

   Use the terminal prompts to open the app on your preferred platform:
   - Press `i` for the **iOS Simulator**
   - Press `a` for the **Android Emulator**
   - Press `w` for the **Web Browser**

---

## Unit Testing

Unit tests are written using **Jest** and **React Native Testing Library**.

To execute the test suite:
```bash
npm test
```

### Test Coverage:
- **`AddToCartButton.test.tsx`**: Tests button rendering, press triggers, and cart quantity states.
- **`CartItem.test.tsx`**: Verifies component updates, deletions, and metadata representations.
- **`CheckoutForm.test.tsx`**: Tests input validators, invalid email detection, and form dispatch behaviors.
- **`bookApi.test.ts`**: Asserts request delays, query filters, and pagination slices.
- **`cartReducer.test.ts`**: Tests the underlying state mutation logs.
- **`BookPrice.test.tsx`**: Verifies price discounts and current/original values layout behaviors.

---

## Architectural Decisions

- **Zustand State Stores**: Migrated from Context API to Zustand to decouple state mutations from React’s render loops. This simplifies hook structures and avoids redundant re-renders.
- **Flat Feature Components**: Relocated nested feature component directories into a unified `components/` root directory to maintain a clean codebase footprint.
- **Hardware-Accelerated Images**: Used `expo-image` cache policies to handle memory/disk image caching and prevent scrolling performance lag.
- **Input Debouncing**: Search queries use a 300ms debounce loop to avoid triggering concurrent database/API sweeps on every character stroke.

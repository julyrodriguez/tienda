import React from 'react';
import { StoreProvider } from './context/StoreContext';
import { MarqueeBanner } from './components/MarqueeBanner';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeaturedCategories } from './components/FeaturedCategories';
import { ProductGrid } from './components/ProductGrid';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { DocsArchitectureModal } from './components/DocsArchitectureModal';
import { WishlistModal } from './components/WishlistModal';
import { LiveSalesToaster } from './components/LiveSalesToaster';
import { ToastContainer } from './components/ToastContainer';
import { Footer } from './components/Footer';

export const AppContent: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1C1917] selection:bg-[#EADBC8] selection:text-[#1C1917]">
      {/* Top Announcement Marquee */}
      <MarqueeBanner />

      {/* Main Sticky Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1">
        {/* Dynamic High-Tech Hero */}
        <HeroSection />

        {/* Categories Bar */}
        <FeaturedCategories />

        {/* Product Catalog Grid */}
        <ProductGrid />
      </main>

      {/* Modern Rich Footer */}
      <Footer />

      {/* Modals & Overlays */}
      <ProductQuickViewModal />
      <CartDrawer />
      <CheckoutModal />
      <AdminPanelModal />
      <DocsArchitectureModal />
      <WishlistModal />

      {/* Reactive Floating Alerts & Social Proof */}
      <LiveSalesToaster />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}

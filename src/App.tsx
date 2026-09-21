import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { MarqueeBanner } from './components/MarqueeBanner';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { HomeFeaturedProducts } from './components/HomeFeaturedProducts';
import { CatalogView } from './components/CatalogView';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { WishlistModal } from './components/WishlistModal';
import { LegalSupportModal } from './components/LegalSupportModal';
import { LiveSalesToaster } from './components/LiveSalesToaster';
import { ToastContainer } from './components/ToastContainer';
import { Footer } from './components/Footer';

export const AppContent: React.FC = () => {
  const { currentView } = useStore();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1C1917] selection:bg-[#EADBC8] selection:text-[#1C1917]">
      {/* Top Announcement Marquee */}
      <MarqueeBanner />

      {/* Main Sticky Navbar */}
      <Navbar />

      {/* Main Content with View Switching */}
      <main className="flex-1">
        {currentView === 'home' ? (
          <>
            {/* Dynamic Hero with Exclusive Drop Star Product */}
            <HeroSection />

            {/* Curated Featured Articles on Home */}
            <HomeFeaturedProducts />
          </>
        ) : (
          /* Dedicated Catalog Page with Category Sidebar & Advanced Filters */
          <CatalogView />
        )}
      </main>

      {/* Modern Rich Footer */}
      <Footer />

      {/* Modals & Overlays */}
      <ProductQuickViewModal />
      <CartDrawer />
      <CheckoutModal />
      <AdminPanelModal />
      <WishlistModal />
      <LegalSupportModal />

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

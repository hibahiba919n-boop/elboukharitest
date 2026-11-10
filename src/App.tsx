import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetail } from './pages/ProductDetail';
import { RecipesBlog } from './pages/RecipesBlog';
import { AboutUs } from './pages/AboutUs';
import { OrderTracking } from './pages/OrderTracking';
import { CartPage } from './pages/CartPage';
import { Checkout } from './pages/Checkout';
import { UserAccount } from './pages/UserAccount';
import { AdminPanel } from './pages/AdminPanel';
import { StaticPages } from './pages/StaticPages';
import { X, CheckCircle, Info, AlertTriangle } from 'lucide-react';

function AppContent() {
  const { theme, notifications, removeNotification } = useApp();
  const [currentPage, setCurrentPage] = useState('home');
  const [pageParams, setPageParams] = useState<any>(null);

  // Scroll to top on page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleNavigate = (page: string, params: any = null) => {
    setCurrentPage(page);
    setPageParams(params);
  };

  const renderActivePage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} />;
      case 'shop':
        return <Shop onNavigate={handleNavigate} />;
      case 'product-detail':
        return <ProductDetail productId={pageParams?.productId || 'p-1'} onNavigate={handleNavigate} />;
      case 'recipes':
      case 'blog':
        return <RecipesBlog />;
      case 'about':
        return <AboutUs />;
      case 'contact':
        return <OrderTracking />;
      case 'cart':
        return <CartPage onNavigate={handleNavigate} />;
      case 'checkout':
        return <Checkout onNavigate={handleNavigate} />;
      case 'login':
      case 'register':
      case 'account':
        return <UserAccount onNavigate={handleNavigate} />;
      case 'admin':
        return <AdminPanel onNavigate={handleNavigate} />;
      
      // Static Pages
      case 'faq':
      case 'delivery':
      case 'returns':
      case 'terms':
      case 'privacy':
        return <StaticPages pageId={currentPage as any} />;

      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#111111] font-sans">
      
      {/* Floating high-contrast notification toasters system */}
      <div className="fixed bottom-6 right-6 z-50 space-y-3 max-w-sm w-full font-sans">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`p-4 rounded-xl shadow-2xl border flex items-start gap-3 animate-slide-left bg-[#111111] ${
              n.type === 'success'
                ? 'border-emerald-500/40 text-emerald-400'
                : n.type === 'error'
                ? 'border-red-500/40 text-red-400'
                : 'border-[#C89B3C]/40 text-[#C89B3C]'
            }`}
          >
            <div className="shrink-0 mt-0.5">
              {n.type === 'success' ? (
                <CheckCircle size={16} className="text-emerald-400" />
              ) : n.type === 'error' ? (
                <AlertTriangle size={16} className="text-red-400" />
              ) : (
                <Info size={16} className="text-[#C89B3C]" />
              )}
            </div>
            <div className="flex-1 text-xs font-bold leading-relaxed text-white">
              {n.message}
            </div>
            <button
              onClick={() => removeNotification(n.id)}
              className="text-gray-400 hover:text-white p-0.5 rounded transition shrink-0"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* Main Header (contains language settings, currencies, and shopping carts) */}
      <Header onNavigate={handleNavigate} currentPage={currentPage} />

      {/* Primary Page Layout Stage */}
      <main className="flex-1">
        {renderActivePage()}
      </main>

      {/* Corporate Footprint Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

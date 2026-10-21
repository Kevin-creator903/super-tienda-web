import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { ProductCard } from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import { ToastNotification } from './components/ToastNotification';
import { ProductDetailView } from './components/ProductDetailView';
import { PromoBannerSlider } from './components/PromoBannerSlider';
import { OffersSection } from './components/OffersSection';
import { SupermarketGrid } from './components/SupermarketGrid';
import { CategoryDrawer } from './components/CategoryDrawer';
import { FilterDrawer } from './components/FilterDrawer';
import { AdminPanel } from './components/AdminPanel';
import { AdminLoginModal } from './components/AdminLoginModal';
import { LoginScreen } from './components/LoginScreen';
import { UserProfileModal } from './components/UserProfileModal';

import CookieBanner from './components/CookieBanner';
import Footer from './components/Footer';
import TerminosCondiciones from './pages/TerminosCondiciones';
import PoliticaPrivacidad from './pages/PoliticaPrivacidad';
import PoliticaReembolsos from './pages/PoliticaReembolsos';
import NotFound from './pages/NotFound';

import { useStore } from './store/useStore';
import * as mockData from './data/mockData';
import { MessageCircle, ShoppingBag, RotateCcw } from 'lucide-react';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const { 
    user,
    isGuest,
    selectedCategory = 'Todos los productos', 
    selectedSubcategory, 
    searchQuery = '', 
    minPriceUSD = 0,
    maxPriceUSD = 150, 
    inStockFilter = false, 
    outOfStockFilter = false,
    primeOnlyFilter = false,
    sortBy = 'default',
    selectedProduct,
    isAdminViewOpen = false,
    openAdminView,
    resetFilters
  } = useStore();

  // Ruta /admin
  useEffect(() => {
    if (currentPath === '/admin' && !isAdminViewOpen) {
      setIsAdminModalOpen(true);
    }
  }, [currentPath, isAdminViewOpen]);

  // Actualizador dinámico de título SEO
  useEffect(() => {
    let pageTitle = 'FHERIA MAYOR | Tu Supermercado Mayorista';
    
    if (currentPath === '/terminos-condiciones') pageTitle = 'Términos y Condiciones | FHERIA MAYOR';
    else if (currentPath === '/politica-privacidad') pageTitle = 'Política de Privacidad | FHERIA MAYOR';
    else if (currentPath === '/politica-reembolsos') pageTitle = 'Política de Reembolsos | FHERIA MAYOR';
    else if (currentPath === '/admin') pageTitle = 'Acceso Administrativo | FHERIA MAYOR';
    else if (selectedCategory && selectedCategory !== 'Todos los productos') pageTitle = `${selectedCategory} | FHERIA MAYOR`;

    document.title = pageTitle;
  }, [currentPath, selectedCategory]);

  const productList = Array.isArray(mockData.PRODUCTS) ? mockData.PRODUCTS : [];
  const isDefaultView = selectedCategory === 'Todos los productos' && !selectedSubcategory && !searchQuery;

  const filteredProducts = React.useMemo(() => {
    return productList
      .filter((product) => {
        if (!product) return false;

        const price = product.priceUsd || 0;
        const matchCategory = selectedCategory === 'Todos los productos' || product.category === selectedCategory;
        const matchSubcategory = !selectedSubcategory || product.subcategory === selectedSubcategory;
        const matchSearch = (product.name || '').toLowerCase().includes((searchQuery || '').toLowerCase());
        const matchPrice = price >= minPriceUSD && price <= maxPriceUSD;
        const matchPrime = !primeOnlyFilter || Boolean(product.primePriceUsd);
        
        let matchStock = true;
        const stock = product.stock || 0;
        if (inStockFilter && !outOfStockFilter) matchStock = stock > 0;
        if (outOfStockFilter && !inStockFilter) matchStock = stock === 0;

        return matchCategory && matchSubcategory && matchSearch && matchPrice && matchPrime && matchStock;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return (a.priceUsd || 0) - (b.priceUsd || 0);
        if (sortBy === 'price-desc') return (b.priceUsd || 0) - (a.priceUsd || 0);
        if (sortBy === 'name-asc') return (a.name || '').localeCompare(b.name || '');
        return 0;
      });
  }, [productList, selectedCategory, selectedSubcategory, searchQuery, minPriceUSD, maxPriceUSD, inStockFilter, outOfStockFilter, primeOnlyFilter, sortBy]);

  // Evaluación de sesión ubicada después de los hooks para evitar crashes
  if (!user && !isGuest) {
    return <LoginScreen />;
  }

  const renderContent = () => {
    if (currentPath === '/terminos-condiciones') return <TerminosCondiciones />;
    if (currentPath === '/politica-privacidad') return <PoliticaPrivacidad />;
    if (currentPath === '/politica-reembolsos') return <PoliticaReembolsos />;
    if (currentPath !== '/' && currentPath !== '' && currentPath !== '/admin') return <NotFound />;

    if (isAdminViewOpen) return <AdminPanel />;
    if (selectedProduct) return <ProductDetailView />;

    return (
      <>
        {isDefaultView && <PromoBannerSlider />}
        {isDefaultView && <OffersSection />}
        {isDefaultView && <SupermarketGrid />}

        <div id="catalog-section" className="w-full space-y-6 pt-2">
          <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-emerald-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <nav className="text-xs text-emerald-700 font-semibold mb-0.5">
                Inicio &gt; {selectedCategory} {selectedSubcategory && `> ${selectedSubcategory}`}
              </nav>
              <h2 className="text-xl font-black text-gray-900">
                {selectedSubcategory || selectedCategory}
              </h2>
            </div>
            <span className="text-xs font-bold text-gray-500 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full w-max">
              {filteredProducts.length} Productos encontrados
            </span>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white/90 backdrop-blur-md rounded-2xl border border-dashed border-emerald-200 p-8 shadow-sm space-y-3">
              <div className="bg-emerald-50 text-emerald-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-gray-800">No hay productos que coincidan</h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                Intenta ajustar los filtros o limpiar la búsqueda activa.
              </p>
              <button
                onClick={resetFilters}
                className="mt-2 inline-flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Restablecer Filtros
              </button>
            </div>
          )}
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50/40 via-slate-50 to-teal-50/30 text-gray-900 font-sans relative flex flex-col justify-between">
      <div>
        <Navbar />
        <ToastNotification />
        <CartDrawer />
        <CategoryDrawer />
        <FilterDrawer />

        <main className="max-w-7xl mx-auto px-4 py-6">
          {renderContent()}
        </main>
      </div>

      <Footer onAdminClick={() => setIsAdminModalOpen(true)} />

      <a 
        href="https://wa.me/584120000000" 
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-full shadow-2xl hover:shadow-emerald-600/30 active:scale-90 transition-all border-2 border-white flex items-center justify-center"
        title="Atención por WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </a>

      <CookieBanner />

      <UserProfileModal />

      <AdminLoginModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        onSuccess={() => {
          setIsAdminModalOpen(false);
          openAdminView();
        }}
      />
    </div>
  );
}
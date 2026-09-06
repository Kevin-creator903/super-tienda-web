import React from 'react';
import { Navbar } from './components/Navbar';
import { ProductCard } from './components/ProductCard';
import { CustomerSupportChat } from './components/CustomerSupportChat';
import { CartDrawer } from './components/CartDrawer';
import { ToastNotification } from './components/ToastNotification';
import { ProductDetailView } from './components/ProductDetailView';
import { PromoBannerSlider } from './components/PromoBannerSlider';
import { OffersSection } from './components/OffersSection';
import { SupermarketGrid } from './components/SupermarketGrid';
import { CategoryDrawer } from './components/CategoryDrawer';
import { FilterDrawer } from './components/FilterDrawer';
import { useStore } from './store/useStore';
import * as mockData from './data/mockData';
import { MessageCircle, ShoppingBag, RotateCcw } from 'lucide-react';

export default function App() {
  const { 
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
    resetFilters
  } = useStore();

  const productList = Array.isArray(mockData.PRODUCTS) ? mockData.PRODUCTS : [];
  const isDefaultView = selectedCategory === 'Todos los productos' && !selectedSubcategory && !searchQuery;

  // Lógica de Filtrado y Ordenamiento
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50/40 via-slate-50 to-teal-50/30 text-gray-900 font-sans relative">
      <Navbar />

      <ToastNotification />
      <CartDrawer />
      <CategoryDrawer />
      <FilterDrawer />

      <main className="max-w-7xl mx-auto px-4 py-6">
        
        {selectedProduct ? (
          <ProductDetailView />
        ) : (
          <>
            {/* 1. Banners Promocionales Superior */}
            {isDefaultView && <PromoBannerSlider />}

            {/* 2. Ofertas de la Semana */}
            {isDefaultView && <OffersSection />}

            {/* 3. Grilla de Categorías "Supermercado" */}
            {isDefaultView && <SupermarketGrid />}

            {/* 4. Catálogo de Productos a Ancho Completo (Hasta 6 columnas) */}
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
        )}
      </main>

      <a 
        href="https://wa.me/" 
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-6 right-24 z-40 bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-full shadow-2xl hover:shadow-emerald-600/30 active:scale-90 transition-all border-2 border-white flex items-center justify-center"
        title="Atención por WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </a>

      <CustomerSupportChat />
    </div>
  );
}
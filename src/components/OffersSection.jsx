import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Percent, Tag } from 'lucide-react';
import { PRODUCTS } from '../data/mockData';
import { ProductCard } from './ProductCard';

export const OffersSection = () => {
  const scrollRef = useRef(null);

  // Filtrar solo productos en oferta
  const offerProducts = React.useMemo(() => {
    return (Array.isArray(PRODUCTS) ? PRODUCTS : []).filter(
      (p) => p.discountPercentage || (p.originalPriceUsd && p.originalPriceUsd > p.priceUsd)
    );
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (offerProducts.length === 0) return null;

  return (
    <section className="bg-gradient-to-r from-red-50/50 via-amber-50/30 to-emerald-50/30 rounded-3xl p-5 md:p-6 border border-red-100 shadow-sm mb-8 space-y-4">
      {/* Encabezado con Botones de Navegación */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-red-600 text-white p-2 rounded-xl shadow-md">
            <Percent className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-black text-gray-900 flex items-center gap-2">
              Ofertas Especiales de la Semana
            </h2>
            <p className="text-xs font-semibold text-gray-500">
              Descuentos insuperables por tiempo limitado
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            className="p-2 bg-white hover:bg-emerald-50 text-gray-700 rounded-full border border-gray-200 shadow-sm transition-all cursor-pointer active:scale-95"
            title="Anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-2 bg-white hover:bg-emerald-50 text-gray-700 rounded-full border border-gray-200 shadow-sm transition-all cursor-pointer active:scale-95"
            title="Siguiente"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Carrusel Horizontal de Productos */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar py-2 px-1"
      >
        {offerProducts.map((product) => (
          <div key={product.id} className="min-w-[190px] sm:min-w-[220px] max-w-[220px] flex-shrink-0">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};
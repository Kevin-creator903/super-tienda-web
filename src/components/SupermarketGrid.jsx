import React from 'react';
import { useStore } from '../store/useStore';
import * as mockData from '../data/mockData';

export const SupermarketGrid = () => {
  const { setSelectedCategory } = useStore();

  const banners = Array.isArray(mockData.SUPERMARKET_BANNERS) ? mockData.SUPERMARKET_BANNERS : [];

  if (banners.length === 0) return null;

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
    const catalogElement = document.getElementById('catalog-section');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="mb-10 space-y-4">
      <div>
        <h2 className="text-2xl md:text-3xl font-black text-sky-800 tracking-tight">
          Supermercado
        </h2>
        <p className="text-xs md:text-sm font-semibold text-gray-500">
          La forma más fácil de comprar. Elige tus productos y recíbelos en tu hogar.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {banners.map((item) => (
          <div
            key={item.id || item.name}
            onClick={() => handleCategoryClick(item.name)}
            className="group cursor-pointer space-y-1.5"
          >
            <div className="relative w-full h-24 sm:h-28 rounded-2xl overflow-hidden shadow-sm border border-slate-200 group-hover:shadow-lg group-hover:border-sky-400 transition-all duration-300">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
            </div>
            <h3 className="text-xs font-black text-sky-700 group-hover:text-emerald-700 transition-colors line-clamp-1">
              {item.name}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};
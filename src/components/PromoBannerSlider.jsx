import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { MAIN_BANNERS, PROMO_CARDS } from '../data/mockData';

export const PromoBannerSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Cambio automático de banner cada 5 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % MAIN_BANNERS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % MAIN_BANNERS.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + MAIN_BANNERS.length) % MAIN_BANNERS.length);

  return (
    <div className="space-y-6 mb-8">
      {/* 1. Slider Superior Principal */}
      <div className="relative w-full h-36 sm:h-48 md:h-56 rounded-3xl overflow-hidden shadow-lg border border-emerald-100 group">
        {MAIN_BANNERS.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img
              src={banner.image}
              alt={banner.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent flex flex-col justify-center px-8 sm:px-12 text-white">
              <span className="bg-amber-400 text-emerald-950 font-black text-[10px] uppercase tracking-wider px-3 py-1 rounded-full w-max mb-2 shadow">
                {banner.badge}
              </span>
              <h2 className="text-xl sm:text-3xl md:text-4xl font-black max-w-md leading-tight drop-shadow-md">
                {banner.title}
              </h2>
              {banner.subtitle && (
                <p className="text-xs sm:text-sm font-medium text-emerald-100 mt-1 drop-shadow">
                  {banner.subtitle}
                </p>
              )}
            </div>
          </div>
        ))}

        {/* Botones Anterior / Siguiente */}
        <button
          onClick={prevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Indicadores / Puntos */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {MAIN_BANNERS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                idx === currentSlide ? 'w-6 bg-amber-400' : 'w-2 bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>

      {/* 2. Grid de 4 Banners Promocionales Destacados */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {PROMO_CARDS.map((card) => (
          <div
            key={card.id}
            className="relative h-48 sm:h-56 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-emerald-100 flex flex-col justify-between p-4 group cursor-pointer"
          >
            <img
              src={card.image}
              alt={card.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

            {/* Etiqueta de Descuento si existe */}
            {card.discount && (
              <span className="relative z-10 self-start bg-red-600 text-white font-black text-xs px-2.5 py-1 rounded-xl shadow-md">
                {card.discount}
              </span>
            )}

            {/* Título e Indicador con Flecha abajo */}
            <div className="relative z-10 mt-auto bg-white/95 backdrop-blur-md rounded-2xl p-2.5 flex items-center justify-between gap-2 shadow-md">
              <span className="text-xs font-black text-gray-900 truncate">
                {card.title}
              </span>
              <div className="bg-emerald-700 group-hover:bg-emerald-800 text-white p-1.5 rounded-full transition-colors flex-shrink-0">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
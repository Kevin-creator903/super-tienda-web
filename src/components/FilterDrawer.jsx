import React, { useEffect } from 'react';
import { X, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { useStore } from '../store/useStore';

export function FilterDrawer() {
  const { 
    isFilterDrawerOpen, 
    setIsFilterDrawerOpen, 
    minPriceUSD, 
    maxPriceUSD, 
    setPriceRangeUSD,
    inStockFilter, 
    setInStockFilter,
    outOfStockFilter, 
    setOutOfStockFilter,
    primeOnlyFilter, 
    setPrimeOnlyFilter,
    sortBy, 
    setSortBy,
    resetFilters 
  } = useStore();

  // Escuchar tecla Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isFilterDrawerOpen) {
        setIsFilterDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFilterDrawerOpen, setIsFilterDrawerOpen]);

  if (!isFilterDrawerOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm transition-opacity"
      onClick={() => setIsFilterDrawerOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Filtros de Búsqueda"
    >
      <div 
        className="w-full max-w-xs sm:max-w-sm bg-white h-full shadow-2xl flex flex-col justify-between p-6 overflow-y-auto animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Encabezado */}
        <div>
          <div className="flex items-center justify-between border-b pb-4 mb-6">
            <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-base">
              <SlidersHorizontal className="w-5 h-5" />
              <h2>Filtros Avanzados</h2>
            </div>
            <button 
              onClick={() => setIsFilterDrawerOpen(false)}
              className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
              aria-label="Cerrar filtros"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-6 text-xs">
            {/* Ordenamiento */}
            <div className="space-y-2">
              <label className="font-bold text-gray-800 block">Ordenar Productos por:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-gray-200 bg-gray-50 font-medium outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="default">Relevancia / Predeterminado</option>
                <option value="price-asc">Precio: Menor a Mayor</option>
                <option value="price-desc">Precio: Mayor a Menor</option>
                <option value="name-asc">Nombre: A - Z</option>
              </select>
            </div>

            {/* Rango de Precio USD */}
            <div className="space-y-2">
              <div className="flex justify-between font-bold text-gray-800">
                <span>Rango de Precio (USD):</span>
                <span className="text-emerald-700">${minPriceUSD} - ${maxPriceUSD}</span>
              </div>
              <input
                type="range"
                min="0"
                max="150"
                step="5"
                value={maxPriceUSD}
                onChange={(e) => setPriceRangeUSD(minPriceUSD, Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            {/* Disponibilidad */}
            <div className="space-y-2 border-t pt-4">
              <span className="font-bold text-gray-800 block">Disponibilidad de Inventario:</span>
              <label className="flex items-center gap-2 font-medium text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={inStockFilter}
                  onChange={(e) => setInStockFilter(e.target.checked)}
                  className="w-4 h-4 accent-emerald-600 rounded"
                />
                Solo En Stock
              </label>
              <label className="flex items-center gap-2 font-medium text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={outOfStockFilter}
                  onChange={(e) => setOutOfStockFilter(e.target.checked)}
                  className="w-4 h-4 accent-emerald-600 rounded"
                />
                Agotados
              </label>
            </div>

            {/* Ofertas Especiales */}
            <div className="space-y-2 border-t pt-4">
              <span className="font-bold text-gray-800 block">Opciones Especiales:</span>
              <label className="flex items-center gap-2 font-medium text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={primeOnlyFilter}
                  onChange={(e) => setPrimeOnlyFilter(e.target.checked)}
                  className="w-4 h-4 accent-emerald-600 rounded"
                />
                Precios Preferenciales / Mayorista
              </label>
            </div>
          </div>
        </div>

        {/* Botón de Restablecer */}
        <div className="border-t pt-4 mt-6">
          <button
            onClick={() => {
              resetFilters();
              setIsFilterDrawerOpen(false);
            }}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 rounded-xl flex items-center justify-center gap-2 text-xs transition-colors"
          >
            <RotateCcw className="w-4 h-4" /> Restablecer Todos los Filtros
          </button>
        </div>
      </div>
    </div>
  );
}
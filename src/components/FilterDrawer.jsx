import React, { useEffect } from 'react';
import { X, Filter, RotateCcw, Check } from 'lucide-react';
import { useStore } from '../store/useStore';

export function FilterDrawer() {
  const { 
    isFilterDrawerOpen, 
    closeFilterDrawer, 
    minPriceUSD, setMinPriceUSD,
    maxPriceUSD, setMaxPriceUSD,
    inStockFilter, setInStockFilter,
    outOfStockFilter, setOutOfStockFilter,
    primeOnlyFilter, setPrimeOnlyFilter,
    sortBy, setSortBy,
    resetFilters
  } = useStore();

  // Cerrar con la tecla ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isFilterDrawerOpen) {
        closeFilterDrawer();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFilterDrawerOpen, closeFilterDrawer]);

  if (!isFilterDrawerOpen) return null;

  const handleApply = () => {
    closeFilterDrawer();
  };

  const handleReset = () => {
    resetFilters();
    closeFilterDrawer();
  };

  return (
    <div 
      className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex justify-end transition-opacity animate-in fade-in duration-200"
      onClick={closeFilterDrawer}
    >
      <div 
        className="bg-white w-full max-w-xs md:max-w-sm h-full flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300 overflow-hidden"
        onClick={(e) => e.stopPropagation()} // Evita que se cierre al hacer clic adentro
      >
        {/* Encabezado */}
        <div className="p-4 bg-emerald-800 text-white flex items-center justify-between border-b border-emerald-700">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-amber-400" />
            <h2 className="font-extrabold text-sm tracking-wide">Filtros de Búsqueda</h2>
          </div>
          <button 
            type="button"
            onClick={closeFilterDrawer}
            className="p-1.5 hover:bg-emerald-700 rounded-xl text-white transition-colors cursor-pointer"
            title="Cerrar Filtros"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cuerpo de Filtros */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 text-xs text-gray-800">
          
          {/* Rango de Precios ($ USD) */}
          <div className="space-y-2">
            <label className="font-black uppercase tracking-wider text-[11px] text-gray-500 block">
              Rango de Precio ($ USD)
            </label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-[10px] text-gray-400 font-bold block mb-1">Mínimo ($)</span>
                <input
                  type="number"
                  min="0"
                  value={minPriceUSD}
                  onChange={(e) => setMinPriceUSD(e.target.value)}
                  className="w-full p-2 border border-gray-200 rounded-xl font-bold outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
              <div>
                <span className="text-[10px] text-gray-400 font-bold block mb-1">Máximo ($)</span>
                <input
                  type="number"
                  min="0"
                  value={maxPriceUSD}
                  onChange={(e) => setMaxPriceUSD(e.target.value)}
                  className="w-full p-2 border border-gray-200 rounded-xl font-bold outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            </div>
          </div>

          {/* Ordenar Por */}
          <div className="space-y-2">
            <label className="font-black uppercase tracking-wider text-[11px] text-gray-500 block">
              Ordenar Productos
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full p-2.5 border border-gray-200 rounded-xl font-bold bg-gray-50 outline-none focus:ring-2 focus:ring-emerald-600 cursor-pointer"
            >
              <option value="default">Por defecto</option>
              <option value="price-asc">Precio: Menor a Mayor</option>
              <option value="price-desc">Precio: Mayor a Menor</option>
              <option value="name-asc">Nombre: A - Z</option>
            </select>
          </div>

          {/* Disponibilidad e Inventario */}
          <div className="space-y-3 pt-2 border-t border-gray-100">
            <label className="font-black uppercase tracking-wider text-[11px] text-gray-500 block">
              Disponibilidad
            </label>
            
            <label className="flex items-center gap-2.5 font-bold cursor-pointer select-none">
              <input
                type="checkbox"
                checked={inStockFilter}
                onChange={(e) => setInStockFilter(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
              />
              <span>Solo en Stock (Disponible)</span>
            </label>

            <label className="flex items-center gap-2.5 font-bold cursor-pointer select-none">
              <input
                type="checkbox"
                checked={outOfStockFilter}
                onChange={(e) => setOutOfStockFilter(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
              />
              <span>Mostrar Agotados</span>
            </label>

            <label className="flex items-center gap-2.5 font-bold cursor-pointer select-none">
              <input
                type="checkbox"
                checked={primeOnlyFilter}
                onChange={(e) => setPrimeOnlyFilter(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
              />
              <span className="text-amber-800 font-extrabold">Precios Mayorista / Prime</span>
            </label>
          </div>

        </div>

        {/* Botones de Acción */}
        <div className="p-4 border-t border-gray-100 bg-slate-50 flex items-center gap-2">
          <button
            type="button"
            onClick={handleApply}
            className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer"
          >
            <Check className="w-4 h-4" /> Aplicar Filtros
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="p-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-xl text-xs transition-colors cursor-pointer"
            title="Restablecer Filtros"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
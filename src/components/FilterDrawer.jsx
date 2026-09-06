import React from 'react';
import { X, RotateCcw, Crown, ArrowUpDown, Tag, DollarSign, Layers, CheckSquare } from 'lucide-react';
import { useStore } from '../store/useStore';
import * as mockData from '../data/mockData';

export const FilterDrawer = () => {
  const { 
    isFilterDrawerOpen, closeFilterDrawer,
    selectedCategory, setSelectedCategory,
    minPriceUSD, setMinPriceUSD,
    maxPriceUSD, setMaxPriceUSD,
    inStockFilter, setInStockFilter,
    outOfStockFilter, setOutOfStockFilter,
    primeOnlyFilter, setPrimeOnlyFilter,
    sortBy, setSortBy,
    resetFilters
  } = useStore();

  if (!isFilterDrawerOpen) return null;

  const categoriesList = Array.isArray(mockData.CATEGORIES) ? mockData.CATEGORIES : [];

  const isFiltered = 
    selectedCategory !== 'Todos los productos' || 
    minPriceUSD > 0 || 
    maxPriceUSD < 150 || 
    inStockFilter || 
    outOfStockFilter || 
    primeOnlyFilter || 
    sortBy !== 'default';

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden animate-fade-in">
      {/* Overlay oscuro */}
      <div onClick={closeFilterDrawer} className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-emerald-100">
          
          {/* Encabezado */}
          <div className="bg-emerald-800 text-white p-4 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-2">
              <Tag className="w-5 h-5 text-amber-300" />
              <h2 className="text-lg font-black">Filtros Avanzados</h2>
            </div>
            <button 
              onClick={closeFilterDrawer} 
              className="p-1 text-emerald-200 hover:text-white rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cuerpo de Filtros */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-slate-50">
            
            {/* 1. Categoría */}
            <div className="bg-white p-4 rounded-2xl border border-emerald-100/80 shadow-sm space-y-2">
              <label className="text-xs font-black text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-emerald-600" /> Categoría
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-slate-50 border border-gray-200 rounded-xl p-2.5 text-xs font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              >
                {categoriesList.map((cat) => (
                  <option key={cat.id || cat.name} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Ordenar Por */}
            <div className="bg-white p-4 rounded-2xl border border-emerald-100/80 shadow-sm space-y-2">
              <label className="text-xs font-black text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
                <ArrowUpDown className="w-4 h-4 text-emerald-600" /> Ordenar Por
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-slate-50 border border-gray-200 rounded-xl p-2.5 text-xs font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              >
                <option value="default">Recomendados / Relevancia</option>
                <option value="price-asc">Precio: Menor a Mayor</option>
                <option value="price-desc">Precio: Mayor a Menor</option>
                <option value="name-asc">Nombre: (A - Z)</option>
              </select>
            </div>

            {/* 3. Toggle Solo Prime */}
            <div className="bg-white p-4 rounded-2xl border border-emerald-100/80 shadow-sm">
              <label className="flex items-center justify-between cursor-pointer p-3 bg-amber-50/80 rounded-xl border border-amber-200 hover:bg-amber-100/60 transition-colors">
                <div className="flex items-center gap-2">
                  <Crown className="w-4 h-4 text-amber-600 fill-amber-400" />
                  <span className="text-xs font-extrabold text-amber-950">Solo Precio Prime</span>
                </div>
                <input
                  type="checkbox"
                  checked={primeOnlyFilter}
                  onChange={(e) => setPrimeOnlyFilter(e.target.checked)}
                  className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 border-amber-400 accent-amber-500 cursor-pointer"
                />
              </label>
            </div>

            {/* 4. Disponibilidad */}
            <div className="bg-white p-4 rounded-2xl border border-emerald-100/80 shadow-sm space-y-3">
              <span className="text-xs font-black text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
                <CheckSquare className="w-4 h-4 text-emerald-600" /> Disponibilidad
              </span>
              <div className="space-y-2.5 pl-1">
                <label className="flex items-center gap-2.5 text-xs text-gray-700 font-semibold cursor-pointer hover:text-emerald-800">
                  <input
                    type="checkbox"
                    checked={inStockFilter}
                    onChange={(e) => setInStockFilter(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-gray-300 accent-emerald-600 cursor-pointer"
                  />
                  <span>En existencia</span>
                </label>
                <label className="flex items-center gap-2.5 text-xs text-gray-700 font-semibold cursor-pointer hover:text-emerald-800">
                  <input
                    type="checkbox"
                    checked={outOfStockFilter}
                    onChange={(e) => setOutOfStockFilter(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-gray-300 accent-emerald-600 cursor-pointer"
                  />
                  <span>Agotado</span>
                </label>
              </div>
            </div>

            {/* 5. Rango de Precio ($ USD) */}
            <div className="bg-white p-4 rounded-2xl border border-emerald-100/80 shadow-sm space-y-4">
              <label className="text-xs font-black text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-emerald-600" /> Rango de Precio ($ USD)
              </label>

              <div>
                <div className="flex justify-between text-[11px] text-gray-500 font-semibold mb-1">
                  <span>Deslizar máximo:</span>
                  <span className="font-bold text-emerald-800">${maxPriceUSD.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="150"
                  step="1"
                  value={maxPriceUSD}
                  onChange={(e) => setMaxPriceUSD(Number(e.target.value))}
                  className="w-full accent-emerald-600 bg-emerald-100 rounded-lg h-2 cursor-pointer"
                />
              </div>

              {/* Input Mínimo y Máximo */}
              <div className="flex items-center gap-2 pt-1">
                <div className="flex-1 bg-slate-50 border border-gray-200 rounded-xl p-2 focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500 transition-all">
                  <label className="text-[10px] text-gray-400 block font-bold mb-0.5">Mín ($)</label>
                  <input
                    type="number"
                    min="0"
                    max={maxPriceUSD}
                    value={minPriceUSD === 0 ? '' : minPriceUSD}
                    placeholder="0"
                    onChange={(e) => setMinPriceUSD(e.target.value === '' ? 0 : Number(e.target.value))}
                    className="w-full bg-transparent text-xs font-black text-gray-800 focus:outline-none"
                  />
                </div>

                <span className="text-gray-300 font-bold">-</span>

                <div className="flex-1 bg-slate-50 border border-gray-200 rounded-xl p-2 focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500 transition-all">
                  <label className="text-[10px] text-gray-400 block font-bold mb-0.5">Máx ($)</label>
                  <input
                    type="number"
                    min={minPriceUSD}
                    value={maxPriceUSD === 0 ? '' : maxPriceUSD}
                    placeholder="150"
                    onChange={(e) => setMaxPriceUSD(e.target.value === '' ? 0 : Number(e.target.value))}
                    className="w-full bg-transparent text-xs font-black text-gray-800 focus:outline-none"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Acciones del Footer */}
          <div className="p-4 bg-white border-t border-gray-200 flex items-center gap-3 shadow-lg">
            {isFiltered && (
              <button
                type="button"
                onClick={resetFilters}
                className="py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-extrabold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Limpiar
              </button>
            )}
            <button
              type="button"
              onClick={closeFilterDrawer}
              className="flex-1 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs rounded-xl shadow-md transition-all cursor-pointer text-center"
            >
              Aplicar Filtros
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
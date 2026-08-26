import React from 'react';
import { ChevronDown, ChevronUp, RotateCcw, Crown, ArrowUpDown, Tag, DollarSign, Layers } from 'lucide-react';
import { useStore } from '../store/useStore';
import { CATEGORIES } from '../data/mockData';
import { formatCurrency } from '../utils/formatters';

export const FilterSidebar = () => {
  const { 
    selectedCategory = 'Todos los productos', setSelectedCategory,
    selectedSubcategory,
    minPriceUSD = 0, setMinPriceUSD,
    maxPriceUSD = 150, setMaxPriceUSD,
    inStockFilter = false, setInStockFilter,
    outOfStockFilter = false, setOutOfStockFilter,
    primeOnlyFilter = false, setPrimeOnlyFilter,
    sortBy = 'default', setSortBy,
    currency = 'USD', exchangeRate = 1,
    resetFilters
  } = useStore();

  const [isCategoryOpen, setIsCategoryOpen] = React.useState(true);
  const [isSortOpen, setIsSortOpen] = React.useState(true);
  const [isDisponibilidadOpen, setIsDisponibilidadOpen] = React.useState(true);
  const [isPrecioOpen, setIsPrecioOpen] = React.useState(true);

  const categoriesList = Array.isArray(CATEGORIES) ? CATEGORIES : [];

  const isFiltered = 
    selectedCategory !== 'Todos los productos' || 
    Boolean(selectedSubcategory) || 
    minPriceUSD > 0 || 
    maxPriceUSD < 150 || 
    inStockFilter || 
    outOfStockFilter || 
    primeOnlyFilter || 
    sortBy !== 'default';

  return (
    <aside className="w-full lg:w-64 bg-white/95 backdrop-blur-md p-5 rounded-2xl border border-emerald-100 shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <h3 className="text-xs font-black text-emerald-950 uppercase tracking-wider flex items-center gap-1.5">
          <Tag className="w-3.5 h-3.5 text-emerald-600" /> Filtros Avanzados
        </h3>
        {isFiltered && (
          <button
            type="button"
            onClick={resetFilters}
            className="text-xs text-emerald-600 hover:text-emerald-800 flex items-center gap-1 font-bold transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Limpiar
          </button>
        )}
      </div>

      {/* 1. Desplegable de Categoría (Mismo selector del buscador superior) */}
      <div className="border-b border-gray-100 pb-4">
        <button
          type="button"
          onClick={() => setIsCategoryOpen(!isCategoryOpen)}
          className="w-full flex items-center justify-between text-xs font-bold text-gray-800 mb-3 uppercase tracking-wider cursor-pointer"
        >
          <span className="flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-emerald-600" /> Filtrar por Categoría
          </span>
          {isCategoryOpen ? <ChevronUp className="w-4 h-4 text-emerald-700" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
        </button>

        {isCategoryOpen && (
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full bg-slate-50 border border-gray-200 rounded-xl p-2.5 text-xs text-gray-800 font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
          >
            {categoriesList.map((cat) => (
              <option key={cat.id || cat.name} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* 2. Ordenar por */}
      <div className="border-b border-gray-100 pb-4">
        <button
          type="button"
          onClick={() => setIsSortOpen(!isSortOpen)}
          className="w-full flex items-center justify-between text-xs font-bold text-gray-800 mb-3 uppercase tracking-wider cursor-pointer"
        >
          <span className="flex items-center gap-1.5">
            <ArrowUpDown className="w-3.5 h-3.5 text-emerald-600" /> Ordenar Por
          </span>
          {isSortOpen ? <ChevronUp className="w-4 h-4 text-emerald-700" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
        </button>

        {isSortOpen && (
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full bg-slate-50 border border-gray-200 rounded-xl p-2.5 text-xs text-gray-800 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
          >
            <option value="default">Recomendados / Relevancia</option>
            <option value="price-asc">Precio: Menor a Mayor</option>
            <option value="price-desc">Precio: Mayor a Menor</option>
            <option value="name-asc">Nombre: (A-Z)</option>
          </select>
        )}
      </div>

      {/* 3. Filtro Prime */}
      <div className="border-b border-gray-100 pb-4">
        <label className="flex items-center justify-between cursor-pointer p-2.5 bg-amber-50/80 rounded-xl border border-amber-200 hover:bg-amber-100/60 transition-colors">
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
      <div className="border-b border-gray-100 pb-4">
        <button
          type="button"
          onClick={() => setIsDisponibilidadOpen(!isDisponibilidadOpen)}
          className="w-full flex items-center justify-between text-xs font-bold text-gray-800 mb-3 uppercase tracking-wider cursor-pointer"
        >
          <span>Disponibilidad</span>
          {isDisponibilidadOpen ? <ChevronUp className="w-4 h-4 text-emerald-700" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
        </button>

        {isDisponibilidadOpen && (
          <div className="space-y-2.5 pl-1">
            <label className="flex items-center gap-2.5 text-xs text-gray-600 cursor-pointer hover:text-emerald-800 font-medium">
              <input
                type="checkbox"
                checked={inStockFilter}
                onChange={(e) => setInStockFilter(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-gray-300 accent-emerald-600"
              />
              <span>En existencia</span>
            </label>
            <label className="flex items-center gap-2.5 text-xs text-gray-600 cursor-pointer hover:text-emerald-800 font-medium">
              <input
                type="checkbox"
                checked={outOfStockFilter}
                onChange={(e) => setOutOfStockFilter(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-gray-300 accent-emerald-600"
              />
              <span>Agotado</span>
            </label>
          </div>
        )}
      </div>

      {/* 5. Rango de Precio */}
      <div>
        <button
          type="button"
          onClick={() => setIsPrecioOpen(!isPrecioOpen)}
          className="w-full flex items-center justify-between text-xs font-bold text-gray-800 mb-3 uppercase tracking-wider cursor-pointer"
        >
          <span className="flex items-center gap-1">
            <DollarSign className="w-3.5 h-3.5 text-emerald-600" /> Rango de Precio ($ USD)
          </span>
          {isPrecioOpen ? <ChevronUp className="w-4 h-4 text-emerald-700" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
        </button>

        {isPrecioOpen && (
          <div className="space-y-4 px-1 pt-2">
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

            <div className="flex items-center gap-2 pt-2">
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
        )}
      </div>
    </aside>
  );
};
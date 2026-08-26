import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, User, ShoppingBag, Menu, Sparkles, ChevronDown, Crown, X, ArrowRight } from 'lucide-react';
import { useStore } from '../store/useStore';
import { CATEGORIES, PRODUCTS } from '../data/mockData';
import { formatCurrency } from '../utils/formatters';

export const Navbar = () => {
  const { 
    searchQuery, setSearchQuery, 
    selectedCategory, setSelectedCategory,
    currency, setCurrency, 
    exchangeRate, 
    carts = { 1: [], 2: [], 3: [] },
    activeCartTab = 1,
    openCart, 
    toggleCategoryMenu,
    setSelectedProduct,
    primeOnlyFilter, setPrimeOnlyFilter,
    inStockFilter, setInStockFilter
  } = useStore();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef(null);

  const currentCart = carts?.[activeCartTab] || [];
  const totalCartItems = currentCart.reduce((acc, item) => acc + (item?.quantity || 0), 0);
  const categoriesList = Array.isArray(CATEGORIES) ? CATEGORIES : [];

  // Búsqueda en vivo (Sugerencias dinámicas)
  const searchSuggestions = React.useMemo(() => {
    if (!searchQuery || searchQuery.trim().length < 2) return [];
    const query = searchQuery.toLowerCase().trim();
    return PRODUCTS.filter((p) => p.name.toLowerCase().includes(query)).slice(0, 5);
  }, [searchQuery]);

  // Cerrar sugerencias al hacer clic fuera del buscador
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectSuggestion = (product) => {
    setSelectedProduct(product);
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3 md:gap-4">
        
        {/* Logo */}
        <div 
          onClick={() => setSelectedCategory('Todos los productos')}
          className="flex items-center gap-2 cursor-pointer font-black text-xl md:text-2xl tracking-tight select-none flex-shrink-0"
        >
          <div className="bg-white text-emerald-800 p-1.5 rounded-xl shadow-md">
            <ShoppingBag className="w-5 h-5 md:w-6 md:h-6" />
          </div>
          <span>TU<span className="text-emerald-300">MARKET</span></span>
        </div>

        {/* Buscador Avanzado con Selector Integrado y Autocompletado */}
        <div className="flex-1 max-w-2xl relative" ref={searchRef}>
          <div className="flex items-center bg-white rounded-full shadow-inner overflow-hidden p-1 focus-within:ring-2 focus-within:ring-amber-400">
            
            {/* Selector de Categorías dentro del Buscador */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs py-2 px-3 border-r border-gray-200 focus:outline-none cursor-pointer hidden sm:block max-w-[140px] truncate"
            >
              {categoriesList.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>

            {/* Input de Búsqueda */}
            <input
              type="text"
              placeholder="Buscar productos por nombre, marca o SKU..."
              value={searchQuery || ''}
              onFocus={() => setIsSearchOpen(true)}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
              }}
              className="w-full py-1.5 px-3 text-gray-800 placeholder-gray-400 bg-transparent focus:outline-none text-xs md:text-sm"
            />

            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="p-1 text-gray-400 hover:text-gray-600 mr-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            <button className="bg-emerald-700 hover:bg-emerald-800 text-white p-2 rounded-full transition-colors flex-shrink-0 cursor-pointer">
              <Search className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>

          {/* Autocompletado Flotante en Tiempo Real */}
          {isSearchOpen && searchSuggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-emerald-100 overflow-hidden z-50 animate-fade-in">
              <div className="p-2 bg-slate-50 border-b border-gray-100 flex items-center justify-between text-[11px] font-bold text-gray-500">
                <span>SUGERENCIAS DE BÚSQUEDA</span>
                <span>{searchSuggestions.length} RESULTADOS</span>
              </div>
              <div className="divide-y divide-gray-100">
                {searchSuggestions.map((prod) => (
                  <div
                    key={prod.id}
                    onClick={() => handleSelectSuggestion(prod)}
                    className="p-3 hover:bg-emerald-50/70 flex items-center gap-3 cursor-pointer transition-colors"
                  >
                    <img src={prod.image} alt={prod.name} className="w-10 h-10 object-contain rounded-lg bg-gray-50 p-1 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-gray-800 truncate">{prod.name}</h4>
                      <span className="text-[10px] text-emerald-700 font-semibold">{prod.category}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-black text-gray-900 block">
                        {formatCurrency(prod.priceUsd, currency, exchangeRate)}
                      </span>
                      {prod.primePriceUsd && (
                        <span className="text-[9px] text-amber-600 font-extrabold flex items-center gap-0.5 justify-end">
                          <Crown className="w-2.5 h-2.5 fill-amber-500" /> Prime
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Acciones del Usuario */}
        <div className="flex items-center gap-3 md:gap-4 text-xs font-semibold">
          <div className="hidden lg:flex items-center gap-1.5 bg-emerald-900/40 px-3 py-1.5 rounded-xl border border-emerald-600/30">
            <MapPin className="w-4 h-4 text-emerald-300" />
            <div className="text-left leading-none">
              <span className="text-[9px] text-emerald-200 uppercase tracking-wider block">Zona</span>
              <span className="font-extrabold flex items-center gap-0.5 text-white">Carabobo <ChevronDown className="w-3 h-3 text-emerald-300" /></span>
            </div>
          </div>

          {/* Selector de Monedas */}
          <div className="flex items-center gap-2 bg-emerald-900/60 p-1 rounded-xl border border-emerald-600/40 shadow-inner">
            <div className="flex bg-emerald-950 p-0.5 rounded-lg">
              <button
                onClick={() => setCurrency('USD')}
                className={`px-2 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                  currency === 'USD' ? 'bg-amber-400 text-emerald-950 shadow-sm' : 'text-emerald-200 hover:text-white'
                }`}
              >
                $ USD
              </button>
              <button
                onClick={() => setCurrency('VES')}
                className={`px-2 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                  currency === 'VES' ? 'bg-amber-400 text-emerald-950 shadow-sm' : 'text-emerald-200 hover:text-white'
                }`}
              >
                Bs VES
              </button>
            </div>
          </div>

          <button className="hidden sm:flex items-center gap-1.5 hover:text-amber-300 transition-colors cursor-pointer">
            <User className="w-5 h-5" />
            <span>Mi Cuenta</span>
          </button>

          {/* Botón Carrito */}
          <button 
            onClick={openCart}
            className="relative bg-emerald-900 hover:bg-emerald-950 p-2.5 rounded-full transition-colors border border-emerald-600/50 cursor-pointer"
            title="Abrir Carrito de Compras"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalCartItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-400 text-emerald-950 font-black rounded-full text-[10px] w-5 h-5 flex items-center justify-center shadow-md animate-bounce">
                {totalCartItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Barra de Navegación Secundaria y Chips de Filtro Rápido */}
      <nav className="bg-emerald-900/90 border-t border-emerald-700/50 text-xs font-semibold">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-3 overflow-x-auto whitespace-nowrap py-2 no-scrollbar">
          <button 
            onClick={toggleCategoryMenu}
            className="flex items-center gap-2 bg-emerald-800 hover:bg-emerald-950 px-3 py-1.5 rounded-lg transition-colors text-white font-bold cursor-pointer"
          >
            <Menu className="w-4 h-4" />
            <span>Categorías</span>
          </button>

          {/* Chips de Filtrado Rápido */}
          <div className="flex items-center gap-2 border-r border-emerald-700/80 pr-3 mr-1">
            <button
              onClick={() => setPrimeOnlyFilter(!primeOnlyFilter)}
              className={`flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-extrabold transition-all cursor-pointer ${
                primeOnlyFilter 
                  ? 'bg-amber-400 text-emerald-950 shadow-md' 
                  : 'bg-emerald-950/60 text-amber-300 hover:bg-emerald-950'
              }`}
            >
              <Crown className="w-3 h-3 fill-amber-400 text-amber-950" />
              <span>Solo Prime</span>
            </button>

            <button
              onClick={() => setInStockFilter(!inStockFilter)}
              className={`flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                inStockFilter 
                  ? 'bg-emerald-500 text-white shadow-md' 
                  : 'bg-emerald-950/60 text-emerald-200 hover:bg-emerald-950'
              }`}
            >
              <span>En Stock</span>
            </button>
          </div>

          {categoriesList.map((cat) => (
            <button
              key={cat.id || cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className={`transition-colors py-1 cursor-pointer ${
                selectedCategory === cat.name 
                  ? 'text-amber-300 border-b-2 border-amber-300 font-bold' 
                  : 'text-emerald-100 hover:text-amber-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
};
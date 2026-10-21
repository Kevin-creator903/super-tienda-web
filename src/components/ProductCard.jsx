import React, { useState } from 'react';
import { ShoppingCart, Package, Check, Sparkles, Lock } from 'lucide-react';
import { useStore } from '../store/useStore';
import { formatCurrency } from '../utils/formatters';

export function ProductCard({ product }) {
  const { 
    addToCart, 
    setSelectedProduct, 
    currency = 'USD', 
    exchangeRate = 36.5,
    isGuest,
    user,
    logoutUser,
    primeOnlyFilter
  } = useStore();

  const [imgError, setImgError] = useState(false);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const handleAddToCart = (e) => {
    e.stopPropagation();

    if (isGuest && !user) {
      if (window.confirm('🔒 Estás navegando como invitado. ¿Deseas ir al Inicio de Sesión para realizar tus compras?')) {
        logoutUser();
      }
      return;
    }

    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  const isOutOfStock = product.stock === 0;

  // Determinar si aplica precio Prime/Mayorista o precio estándar
  const activePrice = (primeOnlyFilter && product.primePriceUsd) 
    ? product.primePriceUsd 
    : product.priceUsd;

  // Cálculo dinámico según la moneda seleccionada en el Navbar
  const isVesSelected = currency === 'VES' || currency === 'BS';
  const mainPrice = formatCurrency(activePrice, currency, exchangeRate);
  const secondaryPrice = isVesSelected 
    ? formatCurrency(activePrice, 'USD', 1)
    : formatCurrency(activePrice, 'VES', exchangeRate);

  return (
    <article 
      onClick={() => setSelectedProduct(product)}
      className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer relative"
      aria-label={`Producto: ${product.name}`}
    >
      {/* Badge Mayorista */}
      {product.primePriceUsd && (
        <span className="absolute top-2.5 left-2.5 z-10 bg-amber-500 text-neutral-950 font-black text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
          <Sparkles className="w-3 h-3" /> Mayorista
        </span>
      )}

      {/* Imagen */}
      <div className="relative w-full aspect-square bg-gray-50 flex items-center justify-center overflow-hidden p-3">
        {!imgError && product.image ? (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            decoding="async"
            onError={() => setImgError(true)}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-300 space-y-1">
            <Package className="w-10 h-10 stroke-1" />
            <span className="text-[10px] font-medium text-gray-400">Sin Imagen</span>
          </div>
        )}

        {isOutOfStock && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-[1px] flex items-center justify-center z-10">
            <span className="bg-gray-800 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
              Agotado
            </span>
          </div>
        )}
      </div>

      {/* Información y Botón */}
      <div className="p-3.5 flex flex-col flex-1 justify-between space-y-3">
        <div>
          <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md inline-block mb-1">
            {product.category}
          </span>
          <h3 className="text-xs font-bold text-gray-900 line-clamp-2 group-hover:text-emerald-700 transition-colors">
            {product.name}
          </h3>
        </div>

        <div className="pt-2 border-t border-gray-100 flex items-end justify-between">
          <div>
            {/* Precio Principal según botón seleccionado */}
            <div className="text-sm font-black text-gray-900">
              {mainPrice}
            </div>
            {/* Precio Secundario de referencia */}
            <div className="text-[10px] font-semibold text-gray-400">
              ~{secondaryPrice}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            aria-label={`Añadir ${product.name} al carrito`}
            className={`p-2.5 rounded-xl transition-all duration-200 flex items-center justify-center cursor-pointer ${
              isOutOfStock
                ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                : isGuest && !user
                ? 'bg-amber-500 hover:bg-amber-600 text-emerald-950 shadow-sm'
                : added
                ? 'bg-emerald-800 text-white scale-95'
                : 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm hover:shadow-emerald-700/20 active:scale-95'
            }`}
            title={isGuest && !user ? "Iniciar sesión para comprar" : "Añadir al carrito"}
          >
            {isGuest && !user ? <Lock className="w-4 h-4" /> : added ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </article>
  );
}
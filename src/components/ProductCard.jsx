import React from 'react';
import { Plus, Crown, Check } from 'lucide-react';
import { useStore } from '../store/useStore';
import { formatCurrency } from '../utils/formatters';

export const ProductCard = ({ product }) => {
  const { currency, exchangeRate, addToCart, setSelectedProduct } = useStore();
  const [added, setAdded] = React.useState(false);

  if (!product) return null;

  const handleClickCard = () => {
    if (typeof setSelectedProduct === 'function') {
      setSelectedProduct(product);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  const handleAdd = (e) => {
    e.stopPropagation();
    if (typeof addToCart === 'function') {
      addToCart(product, 1);
      setAdded(true);
      setTimeout(() => setAdded(false), 1200);
    }
  };

  const isOutOfStock = (product.stock || 0) === 0;

  const discount = product.discountPercentage || 
    (product.originalPriceUsd && product.originalPriceUsd > product.priceUsd 
      ? Math.round(((product.originalPriceUsd - product.priceUsd) / product.originalPriceUsd) * 100)
      : null);

  return (
    <div 
      onClick={handleClickCard}
      className={`bg-white rounded-2xl border border-fheria-cream-dark shadow-sm hover:shadow-xl hover:border-fheria-light transition-all duration-300 flex flex-col justify-between p-4 group relative cursor-pointer ${
        isOutOfStock ? 'opacity-70' : ''
      }`}
    >
      {/* Badge Descuento (Rojo Manzana) */}
      {discount && (
        <div className="absolute top-3 left-3 z-20 bg-fheria-red text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow-md">
          -{discount}%
        </div>
      )}

      {/* Badge Prime (Mostaza) */}
      {product.primePriceUsd !== undefined && product.primePriceUsd !== null && (
        <div className={`absolute top-3 z-10 flex items-center gap-1 bg-amber-50 text-fheria-mustard-dark text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-fheria-mustard/50 shadow-sm ${discount ? 'right-3' : 'left-3'}`}>
          <Crown className="w-3 h-3 text-fheria-mustard fill-fheria-mustard" />
          <span>Prime: {formatCurrency(product.primePriceUsd, currency, exchangeRate)}</span>
        </div>
      )}

      {isOutOfStock && !discount && (
        <span className="absolute top-3 right-3 z-10 bg-red-100 text-fheria-red text-[10px] font-bold px-2 py-0.5 rounded-md border border-red-200">
          Agotado
        </span>
      )}

      <div className="w-full h-40 mb-3 overflow-hidden rounded-xl bg-fheria-cream/50 flex items-center justify-center p-2">
        <img
          src={product.image || 'https://via.placeholder.com/300'}
          alt={product.name || 'Producto'}
          className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>

      <div className="flex flex-col flex-1 justify-between space-y-3">
        <div>
          <span className="text-[10px] font-extrabold text-fheria-dark uppercase tracking-wider block mb-1">
            {product.category || 'General'}
          </span>
          <h3 className="text-xs font-bold text-gray-800 line-clamp-2 leading-snug group-hover:text-fheria-primary transition-colors">
            {product.name || 'Sin título'}
          </h3>
          <p className="text-[10px] text-gray-400 font-medium mt-1">
            ({product.stock || 0} Disponibles)
          </p>
        </div>

        <div className="pt-2 border-t border-gray-100 flex items-end justify-between gap-2">
          <div>
            {product.originalPriceUsd && (
              <span className="text-[11px] text-gray-400 line-through font-semibold block leading-none">
                {formatCurrency(product.originalPriceUsd, currency, exchangeRate)}
              </span>
            )}
            <span className={`text-base font-black block leading-tight ${product.originalPriceUsd ? 'text-fheria-red' : 'text-gray-900'}`}>
              {formatCurrency(product.priceUsd || 0, currency, exchangeRate)}
            </span>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            disabled={isOutOfStock}
            className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold shadow-sm transition-all active:scale-95 cursor-pointer ${
              isOutOfStock 
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : added 
                ? 'bg-fheria-dark text-white' 
                : 'bg-fheria-primary hover:bg-fheria-dark text-white'
            }`}
          >
            {added ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            <span>{added ? 'Listo' : 'Agregar'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
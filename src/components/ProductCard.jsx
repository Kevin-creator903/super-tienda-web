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

  return (
    <div 
      onClick={handleClickCard}
      className={`bg-white rounded-2xl border border-emerald-100/80 shadow-sm hover:shadow-xl hover:border-emerald-400 transition-all duration-300 flex flex-col justify-between p-4 group relative cursor-pointer ${
        isOutOfStock ? 'opacity-70' : ''
      }`}
    >
      {/* Badge Prime seguro */}
      {product.primePriceUsd !== undefined && product.primePriceUsd !== null && (
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1 bg-amber-50 text-amber-900 text-[10px] font-extrabold px-2.5 py-1 rounded-full border border-amber-300 shadow-sm">
          <Crown className="w-3 h-3 text-amber-600 fill-amber-500" />
          <span>Prime: {formatCurrency(product.primePriceUsd, currency, exchangeRate)}</span>
        </div>
      )}

      {isOutOfStock && (
        <span className="absolute top-3 right-3 z-10 bg-red-100 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded-md border border-red-200">
          Agotado
        </span>
      )}

      <div className="w-full h-40 mb-3 overflow-hidden rounded-xl bg-slate-50 flex items-center justify-center p-2">
        <img
          src={product.image || 'https://via.placeholder.com/300'}
          alt={product.name || 'Producto'}
          className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>

      <div className="flex flex-col flex-1 justify-between space-y-3">
        <div>
          <span className="text-[10px] font-extrabold text-emerald-700 uppercase tracking-wider block mb-1">
            {product.category || 'General'}
          </span>
          <h3 className="text-xs font-bold text-gray-800 line-clamp-2 leading-snug group-hover:text-emerald-800 transition-colors">
            {product.name || 'Sin título'}
          </h3>
          <p className="text-[10px] text-gray-400 font-medium mt-1">
            ({product.stock || 0} Disponibles)
          </p>
        </div>

        <div className="pt-2 border-t border-gray-100 flex items-end justify-between gap-2">
          <div>
            <span className="text-xs text-gray-400 block leading-none font-medium">Precio</span>
            <span className="text-base font-black text-gray-900 block leading-tight">
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
                ? 'bg-emerald-800 text-white' 
                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
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
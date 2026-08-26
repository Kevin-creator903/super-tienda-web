import React from 'react';
import { ArrowLeft, Plus, Minus, Crown, Check, ShoppingBag } from 'lucide-react';
import { useStore } from '../store/useStore';
import { formatCurrency } from '../utils/formatters';
import { PRODUCTS } from '../data/mockData';
import { ProductCard } from './ProductCard';

export const ProductDetailView = () => {
  const { selectedProduct, clearSelectedProduct, currency, exchangeRate, addToCart } = useStore();
  const [quantity, setQuantity] = React.useState(1);
  const [added, setAdded] = React.useState(false);

  // Reiniciar estado y subir scroll suavemente al cambiar de producto
  React.useEffect(() => {
    setQuantity(1);
    setAdded(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedProduct]);

  if (!selectedProduct) return null;

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const isOutOfStock = (selectedProduct.stock || 0) === 0;

  // Algoritmo robusto para obtener productos relacionados
  const relatedProducts = React.useMemo(() => {
    const allProducts = Array.isArray(PRODUCTS) ? PRODUCTS : [];
    
    // 1. Filtrar coincidencias por misma categoría o subcategoría (normalizando cadenas e IDs)
    let matches = allProducts.filter((p) => {
      if (String(p.id) === String(selectedProduct.id)) return false;

      const matchCat = p.category && selectedProduct.category && 
        String(p.category).toLowerCase().trim() === String(selectedProduct.category).toLowerCase().trim();
      
      const matchSub = p.subcategory && selectedProduct.subcategory && 
        String(p.subcategory).toLowerCase().trim() === String(selectedProduct.subcategory).toLowerCase().trim();

      return matchCat || matchSub;
    });

    // 2. FALLBACK: Si no hay suficientes productos en la misma categoría, autocompletar con otros del catálogo
    if (matches.length < 6) {
      const remaining = allProducts.filter(
        (p) => String(p.id) !== String(selectedProduct.id) && !matches.some((m) => String(m.id) === String(p.id))
      );
      matches = [...matches, ...remaining];
    }

    return matches.slice(0, 6);
  }, [selectedProduct]);

  return (
    <div className="space-y-10 animate-fade-in pb-12">
      
      {/* Botón Volver & Miga de Pan */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-emerald-100 shadow-sm">
        <button
          onClick={clearSelectedProduct}
          className="flex items-center gap-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 px-4 py-2.5 rounded-xl shadow transition-all w-max cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Catálogo</span>
        </button>

        <nav className="text-xs text-gray-500">
          Inicio &gt; <span className="font-semibold text-emerald-700">{selectedProduct.category || 'Categoría'}</span> &gt; <span className="text-gray-800">{selectedProduct.name}</span>
        </nav>
      </div>

      {/* Detalle Principal del Producto */}
      <div className="bg-white rounded-3xl border border-emerald-100 shadow-sm p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        
        {/* Imagen Principal Grande */}
        <div className="relative bg-slate-50 rounded-2xl p-6 flex items-center justify-center border border-gray-100 h-80 md:h-96 shadow-inner">
          <img
            src={selectedProduct.image || 'https://via.placeholder.com/300'}
            alt={selectedProduct.name}
            className="max-h-full max-w-full object-contain"
          />
          {selectedProduct.primePriceUsd && (
            <div className="absolute top-4 left-4 bg-amber-400 text-emerald-950 font-black text-xs px-3.5 py-1.5 rounded-full shadow flex items-center gap-1.5">
              <Crown className="w-4 h-4 fill-emerald-950" />
              <span>Precio Prime</span>
            </div>
          )}
        </div>

        {/* Información Detallada */}
        <div className="space-y-6">
          <div>
            <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-wider block mb-1">
              {selectedProduct.category || 'General'} {selectedProduct.subcategory ? `• ${selectedProduct.subcategory}` : ''}
            </span>
            <h1 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight">
              {selectedProduct.name}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 border-y border-gray-100 py-3.5">
            <span><strong>SKU:</strong> {selectedProduct.sku || `SKU-${selectedProduct.id}982`}</span>
            <span>•</span>
            <span className={isOutOfStock ? 'text-red-500 font-bold' : 'text-emerald-700 font-bold'}>
              {isOutOfStock ? 'Agotado' : `(${selectedProduct.stock || 0} Disponibles)`}
            </span>
            {selectedProduct.dimensions && (
              <>
                <span>•</span>
                <span><strong>Dimensiones:</strong> {selectedProduct.dimensions}</span>
              </>
            )}
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Descripción del Producto</h3>
            <p className="text-xs md:text-sm text-gray-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-gray-100">
              {selectedProduct.description || 'Producto fresco de calidad garantizada para tu hogar.'}
            </p>
          </div>

          {/* Cuadro de Precios */}
          <div className="bg-emerald-50/70 p-5 rounded-2xl border border-emerald-100 space-y-1">
            <span className="text-xs text-gray-500 font-semibold block">Precio al detalle:</span>
            <div className="flex flex-wrap items-baseline gap-3">
              <span className="text-3xl font-black text-gray-900">
                {formatCurrency(selectedProduct.priceUsd, currency, exchangeRate)}
              </span>
              {selectedProduct.primePriceUsd && (
                <span className="text-xs font-extrabold text-amber-900 bg-amber-100 px-3 py-1.5 rounded-xl border border-amber-300 flex items-center gap-1">
                  <Crown className="w-4 h-4 fill-amber-500" /> Prime: {formatCurrency(selectedProduct.primePriceUsd, currency, exchangeRate)}
                </span>
              )}
            </div>
          </div>

          {/* Selector de Cantidad y Botón de Añadir */}
          <div className="flex items-center gap-4 pt-2">
            <div className="flex items-center border-2 border-emerald-100 rounded-2xl bg-white p-1 shadow-sm">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
                className="p-2.5 text-gray-500 hover:text-emerald-700 disabled:opacity-30 cursor-pointer"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-4 font-black text-base text-gray-800">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2.5 text-gray-500 hover:text-emerald-700 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-2xl font-black text-sm shadow-md transition-all active:scale-95 cursor-pointer ${
                isOutOfStock
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : added
                  ? 'bg-emerald-800 text-white'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              }`}
            >
              {added ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
              <span>{added ? '¡Añadido al Carrito!' : 'Añadir al carrito'}</span>
            </button>
          </div>

        </div>
      </div>

      {/* Sección de Productos Relacionados */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6 pt-6 border-t border-gray-200/80">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-6 h-6 text-emerald-700" />
              <h2 className="text-xl md:text-2xl font-black text-gray-900">Productos Relacionados</h2>
            </div>
            <span className="text-xs font-extrabold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
              Sugerencias para ti
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {relatedProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
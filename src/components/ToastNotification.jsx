import React from 'react';
import { CheckCircle2, X, ShoppingBag } from 'lucide-react';
import { useStore } from '../store/useStore';

export const ToastNotification = () => {
  const { toast, hideToast, openCart } = useStore();

  if (!toast?.show) return null;

  return (
    <div className="fixed top-20 right-4 z-[9999] max-w-sm bg-white border-2 border-emerald-500 rounded-2xl shadow-2xl p-4 flex items-center gap-3 transition-all duration-300 transform translate-y-0">
      {toast.image ? (
        <img 
          src={toast.image} 
          alt="Producto" 
          className="w-12 h-12 object-contain rounded-xl bg-slate-50 p-1 border border-gray-100 flex-shrink-0" 
        />
      ) : (
        <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
          <CheckCircle2 className="w-6 h-6 text-emerald-600" />
        </div>
      )}

      <div className="flex-1 min-w-0">
        <p className="text-xs font-bold text-gray-900 line-clamp-2 leading-snug">
          {toast.message}
        </p>
        <button
          onClick={() => {
            hideToast();
            openCart();
          }}
          className="text-[11px] font-black text-emerald-700 hover:text-emerald-900 underline mt-1 flex items-center gap-1"
        >
          <ShoppingBag className="w-3.5 h-3.5" /> Ver Carrito
        </button>
      </div>

      <button
        onClick={hideToast}
        className="text-gray-400 hover:text-gray-600 p-1 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
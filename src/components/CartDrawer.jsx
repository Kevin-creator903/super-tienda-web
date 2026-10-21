import React from 'react';
import { X, ShoppingBag, Trash2, ArrowRight, Lock, UserCheck } from 'lucide-react';
import { useStore } from '../store/useStore';
import { formatCurrency } from '../utils/formatters';

export default function CartDrawer() {
  const { 
    isCartOpen, 
    closeCart, 
    carts, 
    activeCartTab, 
    setActiveCartTab,
    updateCartQuantity, 
    removeFromCart, 
    currency, 
    exchangeRate,
    createOrder,
    user,
    isGuest,
    logoutUser
  } = useStore();

  if (!isCartOpen) return null;

  const currentCart = carts?.[activeCartTab] || [];
  const subtotalUsd = currentCart.reduce((sum, item) => sum + ((item?.priceUsd || 0) * (item?.quantity || 1)), 0);

  const handleCheckout = () => {
    if (isGuest && !user) {
      closeCart();
      logoutUser(); // Redirige a la pantalla de Login de inmediato
      return;
    }

    if (currentCart.length === 0) return;

    const newOrder = createOrder({
      name: user?.name || 'Cliente Web',
      phone: user?.phone || '',
      address: user?.address || ''
    });

    if (newOrder) {
      closeCart();
      let msg = `Hola *FHERIA MAYOR*, me gustaría confirmar mi pedido *${newOrder.id}*:\n\n`;
      currentCart.forEach((item) => {
        msg += `• ${item.quantity}x ${item.name} - $${((item.priceUsd || 0) * item.quantity).toFixed(2)}\n`;
      });
      msg += `\n*Total:* $${subtotalUsd.toFixed(2)} (${(subtotalUsd * exchangeRate).toLocaleString('es-VE')} Bs)\n`;
      if (user?.name) msg += `*Cliente:* ${user.name}\n`;
      if (user?.address) msg += `*Dirección:* ${user.address}\n`;

      const cleanPhone = (import.meta.env.VITE_WHATSAPP_PHONE || '584120000000').replace(/[^0-9]/g, '');
      window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`, '_blank');
    }
  };

  return (
    <div className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-sm flex justify-end">
      <div className="bg-white w-full max-w-md h-full flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300">
        
        {/* Encabezado */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-emerald-800 text-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <h2 className="font-extrabold text-sm">Tu Carrito de Compras</h2>
          </div>
          <button onClick={closeCart} className="p-1 hover:bg-emerald-700 rounded-lg text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Pestañas de Carrito (1, 2, 3) */}
        <div className="flex bg-slate-100 p-1 border-b border-gray-200">
          {[1, 2, 3].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveCartTab(tab)}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeCartTab === tab ? 'bg-white text-emerald-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Carrito #{tab} ({carts?.[tab]?.length || 0})
            </button>
          ))}
        </div>

        {/* Alerta Modo Invitado */}
        {isGuest && !user && (
          <div className="bg-amber-50 border-b border-amber-200 p-3 text-xs text-amber-900 flex items-center gap-2 font-medium">
            <Lock className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Estás en modo invitado. Debes iniciar sesión para procesar tu compra.</span>
          </div>
        )}

        {/* Ítems del Carrito */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 divide-y divide-gray-100">
          {currentCart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-2 text-gray-400">
              <ShoppingBag className="w-12 h-12 stroke-1" />
              <p className="text-xs font-semibold">Tu carrito está vacío</p>
            </div>
          ) : (
            currentCart.map((item) => (
              <div key={item.id} className="pt-3 flex items-center justify-between gap-3 text-xs">
                <img src={item.image} alt={item.name} className="w-12 h-12 object-contain rounded-lg bg-gray-50 p-1 border" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-gray-800 truncate">{item.name}</h4>
                  <span className="text-emerald-700 font-extrabold">
                    {formatCurrency(item.priceUsd, currency, exchangeRate)}
                  </span>
                </div>

                <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                  <button 
                    onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                    className="w-5 h-5 flex items-center justify-center font-black bg-white rounded shadow-sm text-gray-700 cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-6 text-center font-bold">{item.quantity}</span>
                  <button 
                    onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                    className="w-5 h-5 flex items-center justify-center font-black bg-white rounded shadow-sm text-gray-700 cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="p-1 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Pie del Carrito */}
        <div className="p-4 border-t border-gray-100 bg-slate-50 space-y-3">
          <div className="flex items-center justify-between text-sm font-black text-gray-900">
            <span>Subtotal:</span>
            <span className="text-emerald-800 text-base">
              {formatCurrency(subtotalUsd, currency, exchangeRate)}
            </span>
          </div>

          {isGuest && !user ? (
            <button
              onClick={handleCheckout}
              className="w-full bg-amber-500 hover:bg-amber-600 text-emerald-950 font-black py-3 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <UserCheck className="w-4 h-4" /> Iniciar Sesión para Comprar
            </button>
          ) : (
            <button
              onClick={handleCheckout}
              disabled={currentCart.length === 0}
              className={`w-full font-black py-3 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer ${
                currentCart.length === 0 
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-emerald-700 hover:bg-emerald-800 text-white'
              }`}
            >
              Procesar Pedido <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
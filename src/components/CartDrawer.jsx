import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, AlertTriangle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useStore } from '../store/useStore';

export const CartDrawer = () => {
  const { 
    isCartOpen, 
    closeCart, 
    activeCartTab = 1, 
    setActiveCartTab, 
    carts = { 1: [], 2: [], 3: [] }, 
    isUserLoggedIn = false,
    updateCartQuantity, 
    removeFromCart, 
    clearActiveCart,
    exchangeRate = 787.52 
  } = useStore();

  if (!isCartOpen) return null;

  const currentCart = carts?.[activeCartTab] || [];
  const totalUsd = currentCart.reduce((sum, item) => sum + ((item?.priceUsd || 0) * (item?.quantity || 1)), 0);
  const totalVes = totalUsd * exchangeRate;

  const handleCheckoutWhatsApp = () => {
    if (currentCart.length === 0) return;

    let message = `🛒 *NUEVO PEDIDO - CARRITO #${activeCartTab}*\n\n`;
    currentCart.forEach((item, index) => {
      message += `${index + 1}. *${item.name}*\n   Cant: ${item.quantity} x $${item.priceUsd.toFixed(2)} = *$${(item.priceUsd * item.quantity).toFixed(2)}*\n`;
    });

    message += `\n----------------------------------`;
    message += `\n💵 *Total ($ USD):* $${totalUsd.toFixed(2)}`;
    message += `\n🇻🇪 *Tasa del día:* ${exchangeRate} Bs/$`;
    message += `\n🇻🇪 *Total (Bs VES):* ${totalVes.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Bs`;
    message += `\n----------------------------------`;
    message += `\n📍 *Ubicación:* Carabobo`;
    message += `\n¡Hola! Quisiera procesar esta orden.`;

    const encodedMsg = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encodedMsg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden">
      {/* Overlay oscuro */}
      <div 
        onClick={closeCart} 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-emerald-100">
          
          {/* Encabezado */}
          <div className="bg-emerald-800 text-white p-4 space-y-3 shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-6 h-6 text-amber-300" />
                <h2 className="text-lg font-black tracking-wide">Tu Carrito de Compras</h2>
              </div>
              <button 
                onClick={closeCart}
                className="p-1.5 text-emerald-200 hover:text-white hover:bg-emerald-900 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Selector Carrito #1, #2, #3 */}
            <div className="grid grid-cols-3 gap-1 bg-emerald-950/60 p-1 rounded-xl text-xs font-extrabold">
              {[1, 2, 3].map((tabNum) => (
                <button
                  key={tabNum}
                  onClick={() => setActiveCartTab(tabNum)}
                  className={`py-2 rounded-lg transition-all ${
                    activeCartTab === tabNum
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-emerald-200 hover:text-white hover:bg-emerald-900/40'
                  }`}
                >
                  Carrito #{tabNum}
                  {carts?.[tabNum]?.length > 0 && (
                    <span className="ml-1 bg-amber-400 text-emerald-950 rounded-full px-1.5 py-0.2 text-[10px]">
                      {carts[tabNum].length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Advertencia en Carritos 2 y 3 */}
          {activeCartTab !== 1 && !isUserLoggedIn && (
            <div className="bg-amber-400 text-emerald-950 px-4 py-2.5 text-xs font-bold flex items-center gap-2 shadow-sm">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              <span>Regístrate para activar los carritos 2 y 3.</span>
            </div>
          )}

          {/* Productos en el Carrito */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
            {currentCart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center shadow-inner">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-gray-800">Carrito Vacío</h3>
                  <p className="text-xs text-gray-400 max-w-xs mt-1">
                    Explora el supermercado y añade tus productos favoritos.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs text-gray-400 font-bold border-b border-gray-200 pb-2">
                  <span>PRODUCTOS EN CESTA ({currentCart.length})</span>
                  <button 
                    onClick={clearActiveCart}
                    className="text-red-500 hover:underline text-[11px]"
                  >
                    Vaciar
                  </button>
                </div>

                {currentCart.map((item) => (
                  <div 
                    key={item.id} 
                    className="bg-white p-3.5 rounded-2xl border border-emerald-100/80 shadow-sm flex items-center gap-3 group hover:border-emerald-300 transition-all"
                  >
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-14 h-14 object-contain rounded-xl bg-slate-50 p-1 flex-shrink-0" 
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-gray-800 line-clamp-1 leading-tight">{item.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-black text-emerald-800">
                          ${((item.priceUsd || 0) * item.quantity).toFixed(2)}
                        </span>
                        <span className="text-[10px] text-gray-400 font-medium">
                          (${(item.priceUsd || 0).toFixed(2)} c/u)
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50">
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:text-emerald-700 text-gray-500"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-black text-gray-800">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:text-emerald-700 text-gray-500"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-red-500 p-1 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Totales */}
          <div className="bg-white border-t border-gray-200 p-5 space-y-4 shadow-lg">
            <div className="space-y-1.5 text-xs font-semibold">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({currentCart.length} ítems):</span>
                <span className="font-bold text-gray-800">${totalUsd.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-emerald-700">
                <span>Tasa del día:</span>
                <span className="font-bold">{exchangeRate} Bs/$</span>
              </div>

              <div className="pt-2 border-t border-gray-100 flex items-baseline justify-between">
                <div>
                  <span className="text-sm font-black text-gray-900 block leading-none">Total $ USD</span>
                  <span className="text-[11px] font-bold text-emerald-600">
                    Total: {totalVes.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Bs
                  </span>
                </div>
                <span className="text-2xl font-black text-emerald-800">
                  ${totalUsd.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={handleCheckoutWhatsApp}
              disabled={currentCart.length === 0}
              className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-extrabold py-3.5 px-4 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 text-sm"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>Finalizar Compra</span>
              <ArrowRight className="w-4 h-4 ml-auto" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
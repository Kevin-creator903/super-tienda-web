import React from 'react';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useStore } from '../store/useStore';
import { formatCurrency } from '../utils/formatters';

export const CartDrawer = () => {
  const { 
    isCartOpen, 
    closeCart, 
    activeCartTab = 1, 
    setActiveCartTab, 
    carts = { 1: [], 2: [], 3: [] }, 
    updateCartQuantity, 
    removeFromCart, 
    clearActiveCart,
    createOrder,
    currency = 'USD',
    exchangeRate = 787.52 
  } = useStore();

  if (!isCartOpen) return null;

  // Definición de las variables del carrito activo
  const currentCart = carts?.[activeCartTab] || [];
  const totalUsd = currentCart.reduce((sum, item) => sum + ((item?.priceUsd || 0) * (item?.quantity || 1)), 0);
  const totalVes = totalUsd * exchangeRate;

  const handleCheckoutWhatsApp = () => {
    if (currentCart.length === 0) return;

    // 1. Registrar pedido en el Panel de Administración
    const newOrder = typeof createOrder === 'function' ? createOrder({
      name: 'Cliente Web',
      phone: '+58 412-0000000',
      address: 'Carabobo, Venezuela',
      paymentMethod: 'WhatsApp / Pago Móvil'
    }) : null;

    const orderCode = newOrder?.id || `ORD-${Math.floor(1000 + Math.random() * 9000)}`;

    // 2. Construir mensaje de WhatsApp
    let message = `🛒 *NUEVO PEDIDO (${orderCode}) - CARRITO #${activeCartTab}*\n\n`;
    currentCart.forEach((item, index) => {
      const itemPrice = item.priceUsd || 0;
      const itemQty = item.quantity || 1;
      message += `${index + 1}. *${item.name}*\n   Cant: ${itemQty} x $${itemPrice.toFixed(2)} = *$${(itemPrice * itemQty).toFixed(2)}*\n`;
    });

    message += `\n----------------------------------`;
    message += `\n💵 *Total ($ USD):* $${totalUsd.toFixed(2)}`;
    message += `\n🇻🇪 *Tasa del día:* ${exchangeRate} Bs/$`;
    message += `\n🇻🇪 *Total (Bs VES):* ${totalVes.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Bs`;
    message += `\n----------------------------------`;
    message += `\n📍 *Ubicación:* Carabobo`;
    message += `\n\n¡Hola! Acabo de enviar esta orden en la web.`;

    closeCart();
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex justify-end animate-fade-in">
      <div className="bg-white w-full max-w-md h-full flex flex-col justify-between shadow-2xl border-l border-emerald-100">
        
        {/* Cabecera */}
        <div className="p-4 bg-gradient-to-r from-emerald-800 to-sky-900 text-white flex items-center justify-between border-b border-emerald-700">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-black tracking-wide">Tu Carrito de Compras</h2>
          </div>
          <button 
            onClick={closeCart}
            className="p-1 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Pestañas de Carritos (Multicarrito) */}
        <div className="flex border-b border-gray-100 bg-emerald-50/50 p-1.5 gap-1">
          {[1, 2, 3].map((tabNum) => {
            const tabItems = carts?.[tabNum] || [];
            const count = tabItems.reduce((acc, item) => acc + (item?.quantity || 0), 0);
            return (
              <button
                key={tabNum}
                onClick={() => setActiveCartTab(tabNum)}
                className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  activeCartTab === tabNum
                    ? 'bg-emerald-700 text-white shadow-sm'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span>Carrito {tabNum}</span>
                {count > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                    activeCartTab === tabNum ? 'bg-amber-400 text-emerald-950' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Lista de Productos */}
        <div className="flex-1 overflow-y-auto p-4 divide-y divide-gray-100 space-y-3">
          {currentCart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-3 text-gray-400">
              <ShoppingBag className="w-16 h-16 text-emerald-100" />
              <p className="text-xs font-bold">El Carrito #{activeCartTab} está vacío</p>
              <p className="text-[11px] text-gray-400 max-w-xs">Agrega víveres, carnes o embutidos desde el catálogo principal.</p>
            </div>
          ) : (
            currentCart.map((item) => (
              <div key={item.id} className="pt-3 flex items-center gap-3">
                <img 
                  src={item.image || 'https://via.placeholder.com/100'} 
                  alt={item.name} 
                  className="w-14 h-14 object-contain rounded-xl bg-slate-50 border border-gray-100 p-1 flex-shrink-0" 
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-gray-800 truncate">{item.name}</h4>
                  <span className="text-xs font-black text-emerald-800 block mt-0.5">
                    {formatCurrency(item.priceUsd, currency, exchangeRate)}
                  </span>

                  {/* Controles de Cantidad */}
                  <div className="flex items-center gap-2 mt-1.5">
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-slate-50">
                      <button 
                        onClick={() => updateCartQuantity(item.id, (item.quantity || 1) - 1)}
                        className="p-1 hover:bg-gray-200 text-gray-600 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-extrabold text-gray-800">{item.quantity}</span>
                      <button 
                        onClick={() => updateCartQuantity(item.id, (item.quantity || 1) + 1)}
                        className="p-1 hover:bg-gray-200 text-gray-600 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                      title="Eliminar producto"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <span className="text-xs font-black text-gray-900 block">
                    ${((item.priceUsd || 0) * (item.quantity || 1)).toFixed(2)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Resumen y Botón de Checkout */}
        {currentCart.length > 0 && (
          <div className="p-4 bg-slate-50 border-t border-gray-100 space-y-3">
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-gray-500 font-medium">
                <span>Subtotal ({currentCart.reduce((a, b) => a + (b.quantity || 0), 0)} ítems):</span>
                <span>${totalUsd.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-500 font-medium">
                <span>Tasa Oficial:</span>
                <span>{exchangeRate} Bs/$</span>
              </div>
              <div className="flex justify-between text-base font-black text-gray-900 pt-1 border-t border-gray-200">
                <span>Total Estimado:</span>
                <div className="text-right">
                  <span className="text-emerald-800 block">${totalUsd.toFixed(2)} USD</span>
                  <span className="text-[11px] text-gray-500 font-bold">
                    {totalVes.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Bs
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={clearActiveCart}
                className="px-3 py-3 border border-gray-200 hover:bg-gray-100 text-gray-600 rounded-xl text-xs font-bold transition-colors"
              >
                Vaciar
              </button>
              <button
                onClick={handleCheckoutWhatsApp}
                className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold py-3 px-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-xs active:scale-95 cursor-pointer"
              >
                <span>Finalizar Pedido por WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
import React, { useState } from 'react';
import { ShoppingCart, X, Trash2, Plus, Minus, Send, Truck, Store, MapPin } from 'lucide-react';
import { useStore } from '../store/useStore';
import { sanitizeInput, validatePhone, buildWhatsAppUrl } from '../utils/sanitizer';

// Zonas y tarifas configurables de Delivery
const DELIVERY_ZONES = [
  { id: 'z1', name: 'Zona Casco Central / Cercanías', feeUsd: 2.00 },
  { id: 'z2', name: 'Zona Norte / Urbanizaciones', feeUsd: 3.50 },
  { id: 'z3', name: 'Zona Sur / Periferia', feeUsd: 4.50 },
];

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity } = useStore();
  
  const [customer, setCustomer] = useState({ name: '', phone: '', address: '' });
  const [deliveryType, setDeliveryType] = useState('delivery'); // 'delivery' | 'pickup'
  const [selectedZoneId, setSelectedZoneId] = useState(DELIVERY_ZONES[0].id);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState({});

  if (!isCartOpen) return null;

  const subtotalUsd = cart.reduce((acc, item) => acc + (item.priceUsd * item.quantity), 0);
  const selectedZone = DELIVERY_ZONES.find(z => z.id === selectedZoneId) || DELIVERY_ZONES[0];
  const deliveryFee = deliveryType === 'delivery' ? selectedZone.feeUsd : 0;
  
  const totalUsd = subtotalUsd + deliveryFee;
  const tasaBcv = Number(import.meta.env.VITE_BCV_TASA) || 36.50;
  const totalVes = (totalUsd * tasaBcv).toFixed(2);

  const handleCheckout = (e) => {
    e.preventDefault();
    const newErrors = {};

    const cleanName = sanitizeInput(customer.name);
    if (!cleanName || cleanName.length < 3) {
      newErrors.name = 'Ingresa un nombre válido.';
    }

    if (!validatePhone(customer.phone)) {
      newErrors.phone = 'Ingresa un número telefónico válido.';
    }

    if (deliveryType === 'delivery' && !sanitizeInput(customer.address)) {
      newErrors.address = 'La dirección exacta de entrega es obligatoria para Delivery.';
    }

    if (!termsAccepted) {
      newErrors.terms = 'Debes aceptar los Términos y Políticas.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const storePhone = import.meta.env.VITE_WHATSAPP_PHONE || '584120000000';
    const deliveryData = {
      type: deliveryType,
      zoneName: selectedZone.name,
      feeUsd: deliveryFee
    };
    const totals = { subtotalUsd, totalUsd, totalVes };

    const waUrl = buildWhatsAppUrl(storePhone, cart, customer, deliveryData, totals);
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm transition-opacity">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between p-6 overflow-y-auto">
        
        {/* Encabezado */}
        <div>
          <div className="flex items-center justify-between border-b pb-4 mb-4">
            <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-lg">
              <ShoppingCart className="w-5 h-5" />
              <h2>Tu Carrito de Compras</h2>
            </div>
            <button 
              onClick={() => setIsCartOpen(false)}
              className="p-1 rounded-lg hover:bg-gray-100 text-gray-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Lista de Productos */}
          {cart.length === 0 ? (
            <div className="text-center py-12 text-gray-400 space-y-2">
              <ShoppingCart className="w-12 h-12 mx-auto stroke-1" />
              <p className="text-sm font-medium">El carrito está vacío</p>
            </div>
          ) : (
            <div className="space-y-2.5 max-h-[25vh] overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-2.5 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="flex-1 pr-2">
                    <h4 className="text-xs font-bold text-gray-800 truncate">{item.name}</h4>
                    <p className="text-xs text-emerald-700 font-semibold">${(item.priceUsd * item.quantity).toFixed(2)} USD</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center border rounded-lg bg-white">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:bg-gray-100"><Minus className="w-3 h-3" /></button>
                      <span className="text-xs font-bold px-2">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:bg-gray-100"><Plus className="w-3 h-3" /></button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600 p-1"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Proceso de Despacho y Checkout */}
        {cart.length > 0 && (
          <form onSubmit={handleCheckout} className="border-t pt-4 space-y-3.5">
            
            {/* Selector de Método de Entrega */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-gray-800 block">Método de Entrega:</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setDeliveryType('delivery')}
                  className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    deliveryType === 'delivery'
                      ? 'bg-emerald-50 border-emerald-600 text-emerald-800 shadow-sm'
                      : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Truck className="w-4 h-4" /> Delivery
                </button>
                <button
                  type="button"
                  onClick={() => setDeliveryType('pickup')}
                  className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    deliveryType === 'pickup'
                      ? 'bg-emerald-50 border-emerald-600 text-emerald-800 shadow-sm'
                      : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Store className="w-4 h-4" /> Retiro en Tienda
                </button>
              </div>
            </div>

            {/* Zona de Delivery si aplica */}
            {deliveryType === 'delivery' && (
              <div className="space-y-1 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                <label className="text-[11px] font-bold text-gray-700 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" /> Selecciona tu Zona de Envío:
                </label>
                <select
                  value={selectedZoneId}
                  onChange={(e) => setSelectedZoneId(e.target.value)}
                  className="w-full text-xs p-2 rounded-lg border border-gray-200 bg-white outline-none focus:ring-1 focus:ring-emerald-500"
                >
                  {DELIVERY_ZONES.map((zone) => (
                    <option key={zone.id} value={zone.id}>
                      {zone.name} (+${zone.feeUsd.toFixed(2)} USD)
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Resumen Financiero */}
            <div className="bg-emerald-50/70 p-3 rounded-xl space-y-1 text-xs">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal Productos:</span>
                <span className="font-semibold">${subtotalUsd.toFixed(2)} USD</span>
              </div>
              {deliveryType === 'delivery' && (
                <div className="flex justify-between text-gray-600">
                  <span>Costo de Delivery:</span>
                  <span className="font-semibold">+${deliveryFee.toFixed(2)} USD</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-extrabold text-gray-900 border-t border-emerald-200/60 pt-1 mt-1">
                <span>Total Estimado:</span>
                <span className="text-emerald-800">${totalUsd.toFixed(2)} USD (~{totalVes} VES)</span>
              </div>
            </div>

            {/* Datos del Cliente */}
            <div className="space-y-2">
              <div>
                <input
                  type="text"
                  placeholder="Tu Nombre Completo *"
                  value={customer.name}
                  onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
                {errors.name && <p className="text-[11px] text-red-500 mt-0.5">{errors.name}</p>}
              </div>

              <div>
                <input
                  type="tel"
                  placeholder="Teléfono WhatsApp (ej. 04121234567) *"
                  value={customer.phone}
                  onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
                {errors.phone && <p className="text-[11px] text-red-500 mt-0.5">{errors.phone}</p>}
              </div>

              {deliveryType === 'delivery' && (
                <div>
                  <input
                    type="text"
                    placeholder="Dirección Exacta / Punto de Referencia *"
                    value={customer.address}
                    onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                  {errors.address && <p className="text-[11px] text-red-500 mt-0.5">{errors.address}</p>}
                </div>
              )}

              {/* Casilla Legal */}
              <div className="pt-0.5">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="mt-0.5 w-4 h-4 accent-emerald-600 rounded"
                  />
                  <span className="text-[11px] text-gray-600 leading-tight">
                    Acepto los <a href="/terminos-condiciones" target="_blank" className="text-emerald-700 underline">Términos</a> y la <a href="/politica-privacidad" target="_blank" className="text-emerald-700 underline">Política de Privacidad</a>.
                  </span>
                </label>
                {errors.terms && <p className="text-[11px] text-red-500 mt-0.5">{errors.terms}</p>}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-xs shadow-lg transition-all"
            >
              <Send className="w-4 h-4" /> Enviar Pedido por WhatsApp
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
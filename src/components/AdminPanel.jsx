import React, { useState } from 'react';
import { 
  PackageCheck, Clock, Truck, CheckCircle2, XCircle, Search, 
  Trash2, ExternalLink, ArrowLeft, DollarSign, Calendar, User, MapPin, Phone 
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { formatCurrency } from '../utils/formatters';

export const AdminPanel = () => {
  const { 
    orders = [], 
    updateOrderStatus = () => {}, 
    deleteOrder = () => {}, 
    closeAdminView = () => {}, 
    currency = 'USD', 
    exchangeRate = 1 
  } = useStore();

  const [filterStatus, setFilterStatus] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);

  const safeOrders = Array.isArray(orders) ? orders : [];

  const filteredOrders = React.useMemo(() => {
    return safeOrders.filter((ord) => {
      if (!ord) return false;
      const matchStatus = filterStatus === 'Todos' || ord.status === filterStatus;
      const q = (searchQuery || '').toLowerCase().trim();
      const customerName = ord.customer?.name || '';
      const customerPhone = ord.customer?.phone || '';
      const ordId = ord.id || '';

      const matchSearch = 
        !q || 
        ordId.toLowerCase().includes(q) || 
        customerName.toLowerCase().includes(q) ||
        customerPhone.toLowerCase().includes(q);
      return matchStatus && matchSearch;
    });
  }, [safeOrders, filterStatus, searchQuery]);

  const stats = React.useMemo(() => {
    const totalVentas = safeOrders.reduce((acc, o) => (o && o.status !== 'Cancelado' ? acc + (o.totalUsd || 0) : acc), 0);
    const pendientes = safeOrders.filter((o) => o?.status === 'Pendiente').length;
    const enPreparacion = safeOrders.filter((o) => o?.status === 'En preparación').length;
    const completados = safeOrders.filter((o) => o?.status === 'Completado').length;
    return { totalVentas, pendientes, enPreparacion, completados };
  }, [safeOrders]);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Pendiente': return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'En preparación': return 'bg-sky-100 text-sky-900 border-sky-300';
      case 'En camino': return 'bg-indigo-100 text-indigo-900 border-indigo-300';
      case 'Completado': return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      case 'Cancelado': return 'bg-red-100 text-red-900 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const handleOpenWhatsAppClient = (order) => {
    if (!order?.customer) return;
    let msg = `Hola *${order.customer.name || 'Cliente'}*, te saludamos de *FHERIA MAYOR*. 👋\n\n`;
    msg += `Tu pedido *${order.id}* actualmente se encuentra en estado: *${(order.status || '').toUpperCase()}*.\n`;
    msg += `Monto total: $${(order.totalUsd || 0).toFixed(2)} (${((order.totalUsd || 0) * exchangeRate).toLocaleString('es-VE')} Bs).\n\n`;
    msg += `¡Gracias por tu preferencia!`;
    const cleanPhone = (order.customer.phone || '').replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <div className="bg-white p-5 rounded-3xl border border-emerald-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={closeAdminView}
            className="p-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-2xl shadow transition-all cursor-pointer"
            title="Volver a la Tienda"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-black text-gray-900 flex items-center gap-2">
              <PackageCheck className="w-7 h-7 text-emerald-700" />
              Panel de Administración de Pedidos
            </h1>
            <p className="text-xs text-gray-500 font-medium">
              Gestiona los pedidos realizados por tus clientes en tiempo real
            </p>
          </div>
        </div>

        <span className="text-xs font-black text-emerald-800 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-2xl w-max">
          Total Registrados: {safeOrders.length}
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-emerald-100 shadow-sm flex items-center gap-3">
          <div className="p-3 bg-emerald-100 text-emerald-800 rounded-xl">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase block">Ventas Procesadas</span>
            <span className="text-lg font-black text-gray-900">
              {formatCurrency(stats.totalVentas, currency, exchangeRate)}
            </span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-amber-100 shadow-sm flex items-center gap-3">
          <div className="p-3 bg-amber-100 text-amber-800 rounded-xl">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase block">Pendientes</span>
            <span className="text-lg font-black text-amber-900">{stats.pendientes}</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-sky-100 shadow-sm flex items-center gap-3">
          <div className="p-3 bg-sky-100 text-sky-800 rounded-xl">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase block">En Preparación</span>
            <span className="text-lg font-black text-sky-900">{stats.enPreparacion}</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-emerald-100 shadow-sm flex items-center gap-3">
          <div className="p-3 bg-emerald-100 text-emerald-800 rounded-xl">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase block">Completados</span>
            <span className="text-lg font-black text-emerald-900">{stats.completados}</span>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-emerald-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {['Todos', 'Pendiente', 'En preparación', 'En camino', 'Completado', 'Cancelado'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filterStatus === st 
                  ? 'bg-emerald-700 text-white shadow-sm' 
                  : 'bg-slate-100 text-gray-600 hover:bg-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Buscar por ID, cliente o tel..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-gray-200 rounded-xl py-2 pl-8 pr-3 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-emerald-100 shadow-sm overflow-hidden">
        {filteredOrders.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <XCircle className="w-12 h-12 text-gray-300 mx-auto" />
            <h3 className="text-base font-bold text-gray-700">No hay pedidos que coincidan</h3>
            <p className="text-xs text-gray-400">Prueba cambiando los filtros de estado o la búsqueda.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-gray-100 text-[11px] font-black text-gray-400 uppercase tracking-wider">
                  <th className="p-4">N° Pedido / Fecha</th>
                  <th className="p-4">Cliente</th>
                  <th className="p-4">Monto Total</th>
                  <th className="p-4">Estado</th>
                  <th className="p-4 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs">
                {filteredOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-4 align-top">
                      <span className="font-black text-gray-900 block text-sm">{ord.id}</span>
                      <span className="text-[10px] text-gray-400 flex items-center gap-1 mt-0.5 font-medium">
                        <Calendar className="w-3 h-3" />
                        {ord.date ? new Date(ord.date).toLocaleString('es-VE', { dateStyle: 'short', timeStyle: 'short' }) : 'N/A'}
                      </span>
                    </td>

                    <td className="p-4 align-top max-w-xs">
                      <div className="space-y-0.5">
                        <span className="font-bold text-gray-800 flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-emerald-600" />
                          {ord.customer?.name || 'Cliente'}
                        </span>
                        <span className="text-[11px] text-gray-500 flex items-center gap-1">
                          <Phone className="w-3 h-3 text-gray-400" />
                          {ord.customer?.phone || 'Sin tel'}
                        </span>
                        <span className="text-[10px] text-gray-400 flex items-start gap-1 line-clamp-1">
                          <MapPin className="w-3 h-3 text-gray-400 flex-shrink-0 mt-0.5" />
                          {ord.customer?.address || 'Sin dirección'}
                        </span>
                      </div>
                    </td>

                    <td className="p-4 align-top">
                      <span className="font-black text-emerald-800 text-sm block">
                        ${(ord.totalUsd || 0).toFixed(2)}
                      </span>
                      <span className="text-[10px] text-gray-400 font-bold">
                        {((ord.totalUsd || 0) * exchangeRate).toLocaleString('es-VE', { minimumFractionDigits: 2 })} Bs
                      </span>
                    </td>

                    <td className="p-4 align-top">
                      <select
                        value={ord.status || 'Pendiente'}
                        onChange={(e) => updateOrderStatus(ord.id, e.target.value)}
                        className={`text-xs font-extrabold px-3 py-1.5 rounded-xl border cursor-pointer focus:outline-none ${getStatusBadgeClass(ord.status)}`}
                      >
                        <option value="Pendiente">Pendiente</option>
                        <option value="En preparación">En preparación</option>
                        <option value="En camino">En camino</option>
                        <option value="Completado">Completado</option>
                        <option value="Cancelado">Cancelado</option>
                      </select>
                    </td>

                    <td className="p-4 align-top text-center space-x-1.5">
                      <button
                        onClick={() => setSelectedOrderDetails(ord)}
                        className="px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold rounded-xl transition-colors"
                        title="Ver Ítems"
                      >
                        Detalles
                      </button>

                      <button
                        onClick={() => handleOpenWhatsAppClient(ord)}
                        className="p-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-colors inline-flex items-center"
                        title="Contactar al Cliente"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => deleteOrder(ord.id)}
                        className="p-1.5 hover:bg-red-50 text-gray-400 hover:text-red-600 rounded-xl transition-colors inline-flex items-center"
                        title="Eliminar Pedido"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedOrderDetails && (
        <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl border border-emerald-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-lg font-black text-gray-900">
                  Detalles del Pedido #{selectedOrderDetails.id}
                </h3>
                <span className="text-xs text-gray-400">
                  {selectedOrderDetails.date ? new Date(selectedOrderDetails.date).toLocaleString('es-VE') : ''}
                </span>
              </div>
              <button
                onClick={() => setSelectedOrderDetails(null)}
                className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full"
              >
                ✕
              </button>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl space-y-1.5 text-xs text-gray-700">
              <p><strong>Cliente:</strong> {selectedOrderDetails.customer?.name}</p>
              <p><strong>Teléfono:</strong> {selectedOrderDetails.customer?.phone}</p>
              <p><strong>Dirección:</strong> {selectedOrderDetails.customer?.address}</p>
              <p><strong>Método de Pago:</strong> {selectedOrderDetails.customer?.paymentMethod}</p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-black text-gray-400 uppercase block">Productos Solicitados</span>
              <div className="divide-y divide-gray-100 border border-gray-100 rounded-2xl overflow-hidden p-3 bg-white space-y-2">
                {(selectedOrderDetails.items || []).map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs pt-1">
                    <div>
                      <span className="font-bold text-gray-800 block">{item.name}</span>
                      <span className="text-[10px] text-gray-400">Cant: {item.quantity} x ${(item.priceUsd || 0).toFixed(2)}</span>
                    </div>
                    <span className="font-black text-emerald-800">
                      ${((item.priceUsd || 0) * (item.quantity || 1)).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
              <span className="text-sm font-black text-gray-900">Monto Total:</span>
              <div className="text-right">
                <span className="text-xl font-black text-emerald-800 block">
                  ${(selectedOrderDetails.totalUsd || 0).toFixed(2)}
                </span>
                <span className="text-xs font-bold text-gray-500">
                  {((selectedOrderDetails.totalUsd || 0) * exchangeRate).toLocaleString('es-VE')} Bs
                </span>
              </div>
            </div>

            <button
              onClick={() => setSelectedOrderDetails(null)}
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold py-3 rounded-2xl transition-all text-xs"
            >
              Cerrar Detalles
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
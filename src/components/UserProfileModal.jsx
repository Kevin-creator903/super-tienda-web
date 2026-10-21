import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, X, Save, LogOut, CheckCircle } from 'lucide-react';
import { useStore } from '../store/useStore';

export function UserProfileModal() {
  const { user, isProfileModalOpen, closeProfileModal, updateUserProfile, logoutUser } = useStore();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || ''
      });
    }
  }, [user, isProfileModalOpen]);

  if (!isProfileModalOpen || !user) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserProfile(formData);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      closeProfileModal();
    }, 1200);
  };

  const handleLogout = () => {
    closeProfileModal();
    logoutUser(); // Redirige automáticamente a la pantalla de Login
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-emerald-100 p-6 space-y-5 animate-in zoom-in-95 duration-200">
        
        {/* Encabezado */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-base">
            <User className="w-5 h-5 text-emerald-600" />
            <h3>Mi Cuenta - Datos Personales</h3>
          </div>
          <button 
            onClick={closeProfileModal}
            className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-gray-500 leading-relaxed">
          Mantén tus datos actualizados para agilizar tus pedidos de despacho y la comunicación por WhatsApp.
        </p>

        {/* Formulario de Datos Personales */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="text-[11px] font-bold text-gray-700 block mb-1">
              Nombre Completo
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Ej. Juan Pérez"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full text-xs p-2.5 pl-9 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-600 outline-none font-medium text-gray-800"
                required
              />
              <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-gray-700 block mb-1">
              Correo Electrónico
            </label>
            <div className="relative">
              <input
                type="email"
                placeholder="ejemplo@correo.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full text-xs p-2.5 pl-9 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-600 outline-none font-medium text-gray-800"
                required
              />
              <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-gray-700 block mb-1">
              Teléfono de Contacto (WhatsApp)
            </label>
            <div className="relative">
              <input
                type="tel"
                placeholder="+58 412-0000000"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full text-xs p-2.5 pl-9 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-600 outline-none font-medium text-gray-800"
              />
              <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-gray-700 block mb-1">
              Dirección de Despacho
            </label>
            <div className="relative">
              <textarea
                rows="2"
                placeholder="Ej. Urb. El Trigal, Calle 3, Casa #12, Valencia"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full text-xs p-2.5 pl-9 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-600 outline-none font-medium text-gray-800 resize-none"
              />
              <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            </div>
          </div>

          <div className="pt-2 flex items-center gap-2">
            <button
              type="submit"
              className={`flex-1 font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer ${
                saved ? 'bg-emerald-800 text-white' : 'bg-emerald-700 hover:bg-emerald-800 text-white'
              }`}
            >
              {saved ? (
                <>
                  <CheckCircle className="w-4 h-4" /> ¡Guardado!
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" /> Guardar Cambios
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="bg-red-50 hover:bg-red-100 text-red-600 font-bold px-3 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition-all cursor-pointer border border-red-200"
              title="Cerrar Sesión"
            >
              <LogOut className="w-4 h-4" /> Salir
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
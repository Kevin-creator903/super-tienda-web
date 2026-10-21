import React, { useState } from 'react';
import { Lock, X, KeyRound, AlertCircle, ShieldCheck } from 'lucide-react';
import { useStore } from '../store/useStore';

export function AdminLoginModal({ isOpen, onClose, onSuccess }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    // Lee la clave definida en .env.local o usa una por defecto para pruebas
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';

    if (password === adminPassword) {
      setError('');
      setPassword('');
      onSuccess();
    } else {
      setError('Contraseña incorrecta. Inténtalo de nuevo.');
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 space-y-4 animate-in zoom-in-95 duration-200">
        
        <div className="flex items-center justify-between border-b pb-3">
          <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-base">
            <Lock className="w-5 h-5 text-emerald-600" />
            <h3>Acceso Administrativo</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-gray-500 leading-relaxed">
          Ingresa la clave de administrador para acceder al panel de gestión de productos e inventario.
        </p>

        <form onSubmit={handleLogin} className="space-y-3">
          <div>
            <label className="text-[11px] font-bold text-gray-700 block mb-1">
              Contraseña de Acceso
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-xs p-2.5 pl-9 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 outline-none"
                autoFocus
              />
              <KeyRound className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            </div>
            {error && (
              <div className="flex items-center gap-1 text-[11px] text-red-500 mt-1.5 font-medium">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-all"
          >
            <ShieldCheck className="w-4 h-4" /> Iniciar Sesión Admin
          </button>
        </form>

      </div>
    </div>
  );
}
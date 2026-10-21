import React, { useState } from 'react';
import { Store, UserCheck, ShieldAlert, Lock, Mail, Eye, EyeOff } from 'lucide-react';
import { useStore } from '../store/useStore';
import { HinexLogo } from './HinexLogo';

export function LoginScreen() {
  const { loginUser, setGuestMode } = useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Por favor, ingresa tu correo y contraseña.');
      return;
    }

    loginUser({
      email: email.trim(),
      name: email.split('@')[0],
      role: 'customer'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-950 to-slate-900 text-white flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md bg-white text-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-emerald-100 p-8 space-y-6">
        
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-2">
            <HinexLogo className="h-16" />
          </div>
          <h1 className="text-2xl font-black text-gray-900">Bienvenido a FHERIA MAYOR</h1>
          <p className="text-xs text-gray-500 font-medium">
            Tu supermercado mayorista de confianza. Inicia sesión para realizar tus compras.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 text-red-700 text-xs p-3 rounded-xl flex items-center gap-2 border border-red-200 font-semibold">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="text-[11px] font-bold text-gray-700 block mb-1">
              Correo Electrónico
            </label>
            <div className="relative">
              <input
                type="email"
                placeholder="ejemplo@correo.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                className="w-full text-xs p-3 pl-10 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-600 outline-none font-medium text-gray-800"
              />
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-gray-700 block mb-1">
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                className="w-full text-xs p-3 pl-10 pr-10 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-600 outline-none font-medium text-gray-800"
              />
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3.5 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold py-3 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg hover:shadow-emerald-700/20 transition-all cursor-pointer"
          >
            <UserCheck className="w-4 h-4" /> Iniciar Sesión
          </button>
        </form>

        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink mx-3 text-[11px] font-bold text-gray-400 uppercase">o</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        <div className="space-y-2 text-center">
          <button
            type="button"
            onClick={setGuestMode}
            className="w-full bg-slate-100 hover:bg-slate-200 text-gray-800 font-extrabold py-3 rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer border border-gray-200"
          >
            <Store className="w-4 h-4 text-emerald-700" /> Continuar como Invitado
          </button>
          <p className="text-[10px] text-gray-400 font-medium leading-relaxed">
            Podrás explorar el catálogo completo de productos, pero deberás iniciar sesión para procesar un pedido.
          </p>
        </div>

      </div>
    </div>
  );
}
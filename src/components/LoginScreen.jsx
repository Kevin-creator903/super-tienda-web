import React, { useState } from 'react';
import { Store, UserCheck, ShieldAlert, Lock, Mail, Eye, EyeOff, UserPlus, Phone, CheckCircle2, FileText, Calendar } from 'lucide-react';
import { useStore } from '../store/useStore';
import { HinexLogo } from './HinexLogo';

export function LoginScreen() {
  const { loginUser, registerUser, setGuestMode } = useStore();
  
  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'register'
  
  // Estado Login
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Estado Registro
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  
  // Casillas Legales Obligatorias
  const [isOver18, setIsOver18] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!loginEmail.trim() || !loginPassword.trim()) {
      setError('Por favor, ingresa tu correo y contraseña.');
      return;
    }
    setError('');
    loginUser({
      email: loginEmail.trim(),
      name: loginEmail.split('@')[0],
      role: 'customer'
    });
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!regName.trim() || !regEmail.trim() || !regPassword.trim()) {
      setError('Por favor completa todos los campos requeridos.');
      return;
    }

    if (!isOver18) {
      setError('Debes declarar que eres mayor de edad (+18 años) para poder registrarte.');
      return;
    }

    if (!termsAccepted) {
      setError('Debes aceptar los Términos y Condiciones y la Política de Privacidad.');
      return;
    }

    setError('');
    registerUser(
      {
        name: regName.trim(),
        email: regEmail.trim(),
        phone: regPhone.trim(),
        role: 'customer'
      },
      {
        isOver18,
        termsAccepted
      }
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-950 to-slate-900 text-white flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md bg-white text-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-emerald-100 p-6 md:p-8 space-y-5">
        
        {/* Encabezado y Logo */}
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-1">
            <HinexLogo className="h-14" />
          </div>
          <h1 className="text-2xl font-black text-gray-900">FHERIA MAYOR</h1>
          <p className="text-xs text-gray-500 font-medium">
            Tu supermercado mayorista y al detal de confianza.
          </p>
        </div>

        {/* Pestañas Iniciar Sesión / Registrarse */}
        <div className="flex bg-slate-100 p-1 rounded-2xl border border-gray-200">
          <button
            type="button"
            onClick={() => { setActiveTab('login'); setError(''); }}
            className={`flex-1 py-2 text-xs font-black rounded-xl transition-all cursor-pointer ${
              activeTab === 'login' ? 'bg-emerald-700 text-white shadow-md' : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            Iniciar Sesión
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('register'); setError(''); }}
            className={`flex-1 py-2 text-xs font-black rounded-xl transition-all cursor-pointer ${
              activeTab === 'register' ? 'bg-emerald-700 text-white shadow-md' : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            Crear Cuenta
          </button>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 text-xs p-3 rounded-xl flex items-center gap-2 border border-red-200 font-semibold animate-shake">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Pestaña 1: Iniciar Sesión */}
        {activeTab === 'login' ? (
          <form onSubmit={handleLoginSubmit} className="space-y-3.5">
            <div>
              <label className="text-[11px] font-bold text-gray-700 block mb-1">
                Correo Electrónico
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="ejemplo@correo.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full text-xs p-2.5 pl-9 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-600 outline-none font-medium text-gray-800"
                />
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
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
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full text-xs p-2.5 pl-9 pr-9 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-600 outline-none font-medium text-gray-800"
                />
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold py-3 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg hover:shadow-emerald-700/20 transition-all cursor-pointer"
            >
              <UserCheck className="w-4 h-4" /> Ingresar a Mi Cuenta
            </button>
          </form>
        ) : (
          /* Pestaña 2: Crear Cuenta con Auditoría Legal */
          <form onSubmit={handleRegisterSubmit} className="space-y-3">
            <div>
              <label className="text-[11px] font-bold text-gray-700 block mb-1">
                Nombre Completo *
              </label>
              <input
                type="text"
                placeholder="Ej. Juan Pérez"
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-600 outline-none font-medium text-gray-800"
                required
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-gray-700 block mb-1">
                Correo Electrónico *
              </label>
              <input
                type="email"
                placeholder="ejemplo@correo.com"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-600 outline-none font-medium text-gray-800"
                required
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-gray-700 block mb-1">
                Teléfono de WhatsApp (Opcional)
              </label>
              <input
                type="tel"
                placeholder="+58 412-0000000"
                value={regPhone}
                onChange={(e) => setRegPhone(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-600 outline-none font-medium text-gray-800"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-gray-700 block mb-1">
                Contraseña *
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-600 outline-none font-medium text-gray-800"
                required
              />
            </div>

            {/* SECCIÓN OBLIGATORIA DE CUMPLIMIENTO LEGAL */}
            <div className="pt-2 border-t border-gray-100 space-y-2 bg-emerald-50/60 p-3 rounded-2xl border">
              
              {/* Checkbox 1: Mayoría de Edad */}
              <label className="flex items-start gap-2 text-[11px] font-bold text-gray-800 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isOver18}
                  onChange={(e) => setIsOver18(e.target.checked)}
                  className="w-4 h-4 mt-0.5 rounded text-emerald-700 focus:ring-emerald-600 cursor-pointer"
                />
                <span>Declaración de Edad: Confirmo que soy mayor de edad (+18 años) según la legislación vigente.</span>
              </label>

              {/* Checkbox 2: Términos y Políticas */}
              <label className="flex items-start gap-2 text-[11px] font-semibold text-gray-700 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="w-4 h-4 mt-0.5 rounded text-emerald-700 focus:ring-emerald-600 cursor-pointer"
                />
                <span>
                  He leído y acepto los{' '}
                  <a href="/terminos-condiciones" target="_blank" className="text-emerald-800 font-extrabold underline hover:text-emerald-950">
                    Términos y Condiciones
                  </a>{' '}
                  y la{' '}
                  <a href="/politica-privacidad" target="_blank" className="text-emerald-800 font-extrabold underline hover:text-emerald-950">
                    Política de Privacidad
                  </a>.
                </span>
              </label>

            </div>

            <button
              type="submit"
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold py-3 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg hover:shadow-emerald-700/20 transition-all cursor-pointer mt-2"
            >
              <UserPlus className="w-4 h-4" /> Crear Cuenta de Cliente
            </button>
          </form>
        )}

        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink mx-3 text-[11px] font-bold text-gray-400 uppercase">o</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        {/* Continuar como Invitado */}
        <div className="space-y-1.5 text-center">
          <button
            type="button"
            onClick={setGuestMode}
            className="w-full bg-slate-100 hover:bg-slate-200 text-gray-800 font-extrabold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer border border-gray-200"
          >
            <Store className="w-4 h-4 text-emerald-700" /> Continuar como Invitado
          </button>
          <p className="text-[10px] text-gray-400 font-medium leading-relaxed">
            Explora el catálogo completo sin registrarte. Deberás iniciar sesión para comprar.
          </p>
        </div>

      </div>
    </div>
  );
}
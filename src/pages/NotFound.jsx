import React from 'react';
import { Store, RotateCcw, AlertCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-white/90 backdrop-blur-md rounded-2xl border border-emerald-100 p-8 shadow-sm text-center space-y-4">
        <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-100">
          <AlertCircle className="w-8 h-8" />
        </div>

        <span className="text-4xl font-extrabold text-emerald-700 tracking-tight">404</span>
        <h1 className="text-xl font-extrabold text-gray-900">Página no encontrada</h1>
        
        <p className="text-xs text-gray-500 leading-relaxed">
          La ruta que intentas visitar no existe o ha sido movida. Puedes regresar al catálogo principal de **FHERIA MAYOR**.
        </p>

        <a
          href="/"
          className="inline-flex items-center justify-center gap-2 w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs py-3 rounded-xl transition-all shadow-md hover:shadow-emerald-700/20"
        >
          <Store className="w-4 h-4" /> Volver al Catálogo Principal
        </a>
      </div>
    </div>
  );
}
import React from 'react';
import { ShieldCheck, MessageCircle, FileText, Lock, RefreshCw, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-300 border-t border-neutral-800 mt-16 text-xs">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Columna 1: Marca */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-white font-extrabold text-lg">
            <span className="bg-emerald-600 text-white p-1.5 rounded-lg">FM</span>
            <span>FHERIA MAYOR</span>
          </div>
          <p className="text-neutral-400 leading-relaxed">
            Plataforma comercial y de distribución al mayor y detal. Precios competitivos y atención personalizada.
          </p>
          <div className="flex items-center gap-2 text-emerald-400 font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>Sitio Seguro con Cifrado SSL</span>
          </div>
        </div>

        {/* Columna 2: Enlaces Legales */}
        <div className="space-y-3">
          <h3 className="font-bold text-white text-sm uppercase tracking-wider">Cumplimiento y Legal</h3>
          <ul className="space-y-2">
            <li>
              <a href="/terminos-condiciones" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" /> Términos y Condiciones
              </a>
            </li>
            <li>
              <a href="/politica-privacidad" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" /> Política de Privacidad
              </a>
            </li>
            <li>
              <a href="/politica-reembolsos" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                <RefreshCw className="w-3.5 h-3.5" /> Política de Reembolso
              </a>
            </li>
          </ul>
        </div>

        {/* Columna 3: Atención al Cliente */}
        <div className="space-y-3">
          <h3 className="font-bold text-white text-sm uppercase tracking-wider">Contacto Directo</h3>
          <p className="text-neutral-400">Atención personalizada y confirmación de pedidos:</p>
          <a
            href="https://wa.me/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-2 rounded-lg transition-colors"
          >
            <MessageCircle className="w-4 h-4" /> Canal Oficial WhatsApp
          </a>
        </div>

        {/* Columna 4: Métodos de Pago */}
        <div className="space-y-3">
          <h3 className="font-bold text-white text-sm uppercase tracking-wider">Métodos de Pago</h3>
          <p className="text-neutral-400">Aceptamos transferencias nacionales, Pago Móvil y divisas bajo tasa oficial BCV.</p>
          <div className="flex flex-wrap gap-2 pt-1 text-neutral-400 font-bold">
            <span className="bg-neutral-800 px-2.5 py-1 rounded border border-neutral-700">Pago Móvil</span>
            <span className="bg-neutral-800 px-2.5 py-1 rounded border border-neutral-700">Zelle</span>
            <span className="bg-neutral-800 px-2.5 py-1 rounded border border-neutral-700">Efectivo</span>
          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="border-t border-neutral-800 py-4 text-center text-neutral-500 text-[11px]">
        <p>© 2026 FHERIA MAYOR. Todos los derechos reservados. Desarrollado bajo estándares profesionales de ciberseguridad y comercio legal[cite: 75].</p>
      </div>
    </footer>
  );
}
import React from 'react';
import { ShieldCheck, Lock, ArrowLeft } from 'lucide-react';

export default function PoliticaPrivacidad() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <a href="/" className="inline-flex items-center gap-2 text-amber-400 hover:underline text-sm font-medium">
          <ArrowLeft className="w-4 h-4" /> Volver al Inicio
        </a>

        <header className="border-b border-neutral-800 pb-6">
          <div className="flex items-center gap-3 text-amber-400 mb-2">
            <Lock className="w-8 h-8" />
            <h1 className="text-3xl font-extrabold text-white">Política de Privacidad</h1>
          </div>
          <p className="text-xs text-neutral-400">Última actualización: 20 de octubre de 2026</p>
        </header>

        <section className="space-y-6 text-sm leading-relaxed text-neutral-300">
          <article className="space-y-2">
            <h2 className="text-lg font-bold text-white">1. Datos Recopilados y Principio de Minimización</h2>
            <p>
              En **FHERIA MAYOR** únicamente solicitamos los datos personales estrictamente necesarios para prestar nuestros servicios de atención al cliente, procesar tus compras e informarte sobre el estado de tus envíos.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-neutral-400">
              <li>**Formulario y WhatsApp:** Nombre, número telefónico, dirección de correo electrónico y dirección de despacho.</li>
              <li>**Datos Técnicos:** Dirección IP anonimizada, tipo de navegador y preferencia de idioma.</li>
            </ul>
          </article>

          <article className="space-y-2">
            <h2 className="text-lg font-bold text-white">2. Finalidad del Tratamiento</h2>
            <p>Tus datos se utilizan con los siguientes propósitos:</p>
            <ul className="list-disc pl-5 space-y-1 text-neutral-400">
              <li>Procesar y despachar pedidos solicitados a través del sitio web.</li>
              <li>Responder consultas iniciadas por el usuario vía formulario o chat de soporte.</li>
              <li>Garantizar la ciberseguridad del portal y prevenir fraudes.</li>
              <li>Enviar comunicaciones promocionales únicamente si has otorgado consentimiento expreso previo.</li>
            </ul>
          </article>

          <article className="space-y-2">
            <h2 className="text-lg font-bold text-white">3. Proveedores Terceros</h2>
            <p>
              No vendemos ni comercializamos tus datos personales. Compartimos información mínima requerida con proveedores tecnológicos esenciales para el servicio:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-neutral-400">
              <li>**Servicios de Alojamiento y Dominio:** Infraestructura del servidor seguro con cifrado SSL/TLS.</li>
              <li>**Empresas de Encomienda:** Para la entrega física de tus compras.</li>
              <li>**Herramientas Analíticas:** Google Analytics (bajo tu consentimiento previo).</li>
            </ul>
          </article>

          <article className="space-y-2">
            <h2 className="text-lg font-bold text-white">4. Ejercicio de Derechos de Protección de Datos</h2>
            <p>
              Puedes ejercer tus derechos de acceso, rectificación, cancelación o eliminación de tus datos en cualquier momento enviando una solicitud a nuestro correo oficial: <strong className="text-amber-400">privacidad@fheriamayor.com</strong>.
            </p>
          </article>
        </section>

      </div>
    </div>
  );
}
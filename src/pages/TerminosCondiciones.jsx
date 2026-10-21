import React from 'react';
import { ShieldAlert, FileText, ArrowLeft } from 'lucide-react';

export default function TerminosCondiciones() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Enlace de retorno */}
        <a href="/" className="inline-flex items-center gap-2 text-amber-400 hover:underline text-sm font-medium">
          <ArrowLeft className="w-4 h-4" /> Volver al Inicio
        </a>

        <header className="border-b border-neutral-800 pb-6">
          <div className="flex items-center gap-3 text-amber-400 mb-2">
            <FileText className="w-8 h-8" />
            <h1 className="text-3xl font-extrabold text-white">Términos y Condiciones de Uso</h1>
          </div>
          <p className="text-xs text-neutral-400">Última actualización: 20 de octubre de 2026</p>
        </header>

        <section className="space-y-6 text-sm leading-relaxed text-neutral-300">
          <article className="space-y-2">
            <h2 className="text-lg font-bold text-white">1. Identificación del Titular y Comercio</h2>
            <p>
              El presente sitio web **FHERIA MAYOR** es operado como una plataforma de comercio electrónico orientada a la venta de bienes y artículos de consumo en Venezuela y mercados internacionales. Al acceder, navegar o realizar compras en este portal, aceptas quedar vinculado por los presentes Términos y Condiciones.
            </p>
          </article>

          <article className="space-y-2">
            <h2 className="text-lg font-bold text-white">2. Precios, Moneda y Métodos de Pago</h2>
            <p>
              Todos los precios de los productos están expresados en Divisas (USD) y su equivalente de referencia en Bolívares (VES), calculados según la tasa oficial publicada por el Banco Central de Venezuela (BCV) correspondiente a la fecha de la transacción.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-neutral-400">
              <li>**Métodos de pago aceptados:** Pago Móvil, Transferencia Bancaria Nacional, Zelle y/o Pasarelas de Pago Autorizadas.</li>
              <li>La confirmación final del pedido está sujeta a la validación efectiva del pago por parte de nuestro equipo de administración.</li>
            </ul>
          </article>

          <article className="space-y-2">
            <h2 className="text-lg font-bold text-white">3. Procedimiento de Compra y Pedidos por WhatsApp</h2>
            <p>
              Los pedidos completados a través de nuestro catálogo interactivo se formalizan y confirman directamente con nuestra línea oficial de soporte de WhatsApp o canales autorizados. El cliente es responsable de suministrar datos veraces de contacto y dirección de entrega.
            </p>
          </article>

          <article className="space-y-2">
            <h2 className="text-lg font-bold text-white">4. Envíos y Entregas</h2>
            <p>
              Los envíos se realizan a través de empresas de encomienda nacionales e internacionales (ej. MRW, Zoom, Tealca, DHL, entre otras). Las tarifas de envío se informan antes de completar la transacción. Los tiempos de entrega son estimados y dependen del operador logístico seleccionado.
            </p>
          </article>

          <article className="space-y-2">
            <h2 className="text-lg font-bold text-white">5. Propiedad Intelectual</h2>
            <p>
              Todos los logotipos, diseños, marcas, fotografías, imágenes y códigos de esta plataforma son propiedad exclusiva de **FHERIA MAYOR** o cuentan con las debidas licencias comerciales de uso. Queda prohibida su reproducción sin autorización previa y por escrito.
            </p>
          </article>

          <article className="space-y-2">
            <h2 className="text-lg font-bold text-white">6. Modificaciones y Ley Aplicable</h2>
            <p>
              Nos reservamos el derecho de actualizar estos términos en cualquier momento. El uso continuado del sitio tras la publicación de cambios constituye la aceptación implícita de los mismos. Las presentes condiciones se rigen por la legislación aplicable en la República Bolivariana de Venezuela.
            </p>
          </article>
        </section>

      </div>
    </div>
  );
}
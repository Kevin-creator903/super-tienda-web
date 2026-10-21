import React from 'react';
import { RefreshCw, CheckCircle2, ArrowLeft } from 'lucide-react';

export default function PoliticaReembolsos() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <a href="/" className="inline-flex items-center gap-2 text-amber-400 hover:underline text-sm font-medium">
          <ArrowLeft className="w-4 h-4" /> Volver al Inicio
        </a>

        <header className="border-b border-neutral-800 pb-6">
          <div className="flex items-center gap-3 text-amber-400 mb-2">
            <RefreshCw className="w-8 h-8" />
            <h1 className="text-3xl font-extrabold text-white">Política de Reembolso y Garantía</h1>
          </div>
          <p className="text-xs text-neutral-400">Última actualización: 20 de octubre de 2026</p>
        </header>

        <section className="space-y-6 text-sm leading-relaxed text-neutral-300">
          <article className="space-y-2">
            <h2 className="text-lg font-bold text-white">1. Condiciones Generales para Devoluciones</h2>
            <p>
              En **FHERIA MAYOR** garantizamos la calidad de nuestros productos. Si el producto recibido presenta algún defecto de fábrica, daño durante el transporte o no corresponde al pedido realizado, podrás solicitar un cambio o reembolso bajo las siguientes condiciones:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-neutral-400">
              <li>El reporte debe realizarse en un plazo máximo de **7 días continuos** tras recibir el paquete.</li>
              <li>El producto debe conservarse sin uso, con sus empaques y etiquetas originales intactas.</li>
            </ul>
          </article>

          <article className="space-y-2">
            <h2 className="text-lg font-bold text-white">2. Procedimiento para Solicitar un Reembolso</h2>
            <ol className="list-decimal pl-5 space-y-2 text-neutral-400">
              <li>Contacta a nuestro canal oficial de soporte con tu número de factura o pedido.</li>
              <li>Adjunta fotografías/videos claros del defecto o discrepancia reportada.</li>
              <li>Nuestro equipo evaluará la solicitud en un plazo de 24 a 48 horas hábiles.</li>
            </ol>
          </article>

          <article className="space-y-2">
            <h2 className="text-lg font-bold text-white">3. Procesamiento del Reembolso</h2>
            <p>
              Una vez aprobada la devolución, el dinero será reintegrado a través del mismo método de pago utilizado en la compra o mediante nota de crédito negociable en la tienda, según la preferencia del cliente.
            </p>
          </article>
        </section>

      </div>
    </div>
  );
}
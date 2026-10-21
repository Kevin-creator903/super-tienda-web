import React, { useState, useEffect } from 'react';
import { ShieldCheck, Cookie, X, ChevronDown, ChevronUp } from 'lucide-react';

const COOKIE_STORAGE_KEY = 'fheria_cookie_consent_v1';

export default function CookieBanner() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  
  // Categorías de cookies
  const [preferences, setPreferences] = useState({
    essential: true, // Siempre obligatoria
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const savedConsent = localStorage.getItem(COOKIE_STORAGE_KEY);
    if (!savedConsent) {
      // Mostrar el banner si no hay preferencia guardada
      setIsOpen(true);
    } else {
      try {
        const parsed = JSON.parse(savedConsent);
        setPreferences(parsed.preferences || { essential: true, analytics: false, marketing: false });
        applyConsent(parsed.preferences);
      } catch (e) {
        setIsOpen(true);
      }
    }
  }, []);

  // Aplicar script de analítica/marketing según la elección
  const applyConsent = (currentPreferences) => {
    if (currentPreferences.analytics) {
      // Activar Google Analytics / etiquetas de medición
      window.gtag?.('consent', 'update', { analytics_storage: 'granted' });
    } else {
      window.gtag?.('consent', 'update', { analytics_storage: 'denied' });
    }

    if (currentPreferences.marketing) {
      window.gtag?.('consent', 'update', { ad_storage: 'granted' });
    } else {
      window.gtag?.('consent', 'update', { ad_storage: 'denied' });
    }
  };

  // Guardar la elección con formato de evidencia auditale
  const saveConsent = (updatedPreferences) => {
    const consentRecord = {
      event: 'cookie_consent_updated',
      timestamp: new Date().toISOString(),
      policy_version: '1.0-2026',
      preferences: updatedPreferences,
    };

    localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify(consentRecord));
    setPreferences(updatedPreferences);
    applyConsent(updatedPreferences);
    setIsOpen(false);
  };

  const handleAcceptAll = () => {
    const allAccepted = { essential: true, analytics: true, marketing: true };
    saveConsent(allAccepted);
  };

  const handleRejectNonEssential = () => {
    const essentialOnly = { essential: true, analytics: false, marketing: false };
    saveConsent(essentialOnly);
  };

  const handleSaveCustom = () => {
    saveConsent(preferences);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 z-40 bg-neutral-900 text-white p-2.5 rounded-full shadow-lg border border-neutral-700 hover:bg-neutral-800 transition-all flex items-center gap-2 text-xs font-medium"
        title="Configurar privacidad y cookies"
        aria-label="Gestionar cookies"
      >
        <Cookie className="w-4 h-4 text-amber-400" />
        <span className="hidden sm:inline">Privacidad</span>
      </button>
    );
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-4 sm:p-6 bg-neutral-950/95 backdrop-blur-md border-t border-neutral-800 shadow-2xl text-neutral-200 transition-all">
      <div className="max-w-6xl mx-auto space-y-4">
        
        {/* Cabecera del Banner */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-neutral-800/80 rounded-lg text-amber-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Gestión de Cookies y Privacidad</h3>
              <p className="text-xs text-neutral-400">FHERIA MAYOR</p>
            </div>
          </div>
          <button 
            onClick={handleRejectNonEssential}
            className="text-neutral-400 hover:text-white p-1 rounded-md"
            title="Cerrar y rechazar opcionales"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Explicación corta */}
        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
          Utilizamos cookies propias y de terceros para garantizar el correcto funcionamiento del sitio, personalizar tu experiencia y analizar el tráfico de navegación. Puedes aceptar todas las cookies, rechazar las opcionales o configurar tus preferencias. Para más detalles, consulta nuestra{' '}
          <a href="/politica-privacidad" className="text-amber-400 underline hover:text-amber-300">
            Política de Privacidad
          </a>.
        </p>

        {/* Panel desplegable de personalización */}
        {showPreferences && (
          <div className="pt-3 border-t border-neutral-800 space-y-3 text-xs sm:text-sm">
            {/* Esenciales */}
            <div className="flex items-center justify-between p-3 bg-neutral-900 rounded-lg border border-neutral-800">
              <div>
                <span className="font-semibold text-white block">Cookies Necesarias (Técnicas)</span>
                <span className="text-neutral-400 text-xs">Imprescindibles para la navegación, el carrito de compras y la seguridad.</span>
              </div>
              <span className="text-xs font-bold bg-neutral-800 text-neutral-400 px-2.5 py-1 rounded-md">Siempre Activas</span>
            </div>

            {/* Analíticas */}
            <div className="flex items-center justify-between p-3 bg-neutral-900 rounded-lg border border-neutral-800">
              <div>
                <span className="font-semibold text-white block">Cookies Analíticas</span>
                <span className="text-neutral-400 text-xs">Nos permiten medir estadísticas de visitas para mejorar la tienda.</span>
              </div>
              <input
                type="checkbox"
                checked={preferences.analytics}
                onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
              />
            </div>

            {/* Marketing */}
            <div className="flex items-center justify-between p-3 bg-neutral-900 rounded-lg border border-neutral-800">
              <div>
                <span className="font-semibold text-white block">Cookies de Marketing y WhatsApp</span>
                <span className="text-neutral-400 text-xs">Utilizadas para personalizar recomendaciones y funciones de contacto.</span>
              </div>
              <input
                type="checkbox"
                checked={preferences.marketing}
                onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
              />
            </div>
          </div>
        )}

        {/* Botones de acción */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <button
            onClick={() => setShowPreferences(!showPreferences)}
            className="text-xs text-neutral-400 hover:text-white underline flex items-center gap-1"
          >
            {showPreferences ? (
              <>Ocultar opciones <ChevronUp className="w-3.5 h-3.5" /></>
            ) : (
              <>Personalizar cookies <ChevronDown className="w-3.5 h-3.5" /></>
            )}
          </button>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {showPreferences ? (
              <button
                onClick={handleSaveCustom}
                className="flex-1 sm:flex-initial px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg font-medium text-xs transition-colors"
              >
                Guardar Preferencias
              </button>
            ) : (
              <button
                onClick={handleRejectNonEssential}
                className="flex-1 sm:flex-initial px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-lg font-medium text-xs transition-colors"
              >
                Rechazar Opcionales
              </button>
            )}

            <button
              onClick={handleAcceptAll}
              className="flex-1 sm:flex-initial px-5 py-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded-lg text-xs transition-colors"
            >
              Aceptar Todas
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
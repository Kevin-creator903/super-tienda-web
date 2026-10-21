import React, { useState } from 'react';
import { MessageSquare, X, Send, ShieldAlert } from 'lucide-react';
import { sanitizeInput } from '../utils/sanitizer';

export function CustomerSupportChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: '¡Hola! Bienvenid@ a FHERIA MAYOR. ¿En qué podemos ayudarte hoy?' }
  ]);
  const [lastSentTime, setLastSentTime] = useState(0);
  const [spamWarning, setSpamWarning] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    const cleanMsg = sanitizeInput(message);
    if (!cleanMsg) return;

    // Rate Limiting: Previene envíos con menos de 3 segundos de diferencia
    const now = Date.now();
    if (now - lastSentTime < 3000) {
      setSpamWarning('Por favor, espera unos segundos antes de enviar otro mensaje.');
      return;
    }

    setSpamWarning('');
    setLastSentTime(now);

    const userMsg = { id: Date.now(), sender: 'user', text: cleanMsg };
    setMessages((prev) => [...prev, userMsg]);
    setMessage('');

    // Respuesta automatizada simple
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, sender: 'bot', text: 'Gracias por escribirnos. Un agente te responderá a la brevedad o puedes contactarnos por WhatsApp directamente.' }
      ]);
    }, 1200);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-emerald-700 hover:bg-emerald-800 text-white p-4 rounded-full shadow-2xl transition-all border-2 border-white flex items-center justify-center"
          title="Chat de Soporte"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      ) : (
        <div className="w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col h-[420px]">
          {/* Header */}
          <div className="bg-emerald-800 text-white p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              <span className="font-bold text-xs">Atención al Cliente - FHERIA MAYOR</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-emerald-700 p-1 rounded">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Mensajes */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2.5 text-xs bg-gray-50">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-2.5 rounded-xl ${m.sender === 'user' ? 'bg-emerald-700 text-white' : 'bg-white text-gray-800 border border-gray-200 shadow-sm'}`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Advertencia de Rate Limit */}
          {spamWarning && (
            <div className="bg-amber-50 text-amber-800 text-[11px] p-2 flex items-center gap-1 border-t border-amber-200">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>{spamWarning}</span>
            </div>
          )}

          {/* Input Form */}
          <form onSubmit={handleSend} className="p-2 bg-white border-t flex gap-2">
            <input
              type="text"
              placeholder="Escribe tu consulta..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 text-xs p-2 border rounded-lg outline-none focus:border-emerald-600"
            />
            <button type="submit" className="bg-emerald-700 hover:bg-emerald-800 text-white p-2 rounded-lg">
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
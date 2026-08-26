import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, User, Bot, AlertCircle } from 'lucide-react';

export const CustomerSupportChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [needsHuman, setNeedsHuman] = useState(false);
  const messagesEndRef = useRef(null);

  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: '¡Hola! 👋 Soy el asistente virtual de Tu Market. ¿Buscas algún producto en especial o tienes dudas sobre envíos?', 
      sender: 'agent' 
    }
  ]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput('');
    
    setMessages(prev => [...prev, { id: Date.now(), text: userText, sender: 'user' }]);
    setIsLoading(true);

    try {
      // Conexión real con el backend Python (FastAPI)
      const response = await fetch('http://127.0.0.1:8000/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: userText })
});

      if (!response.ok) throw new Error('Error en el servidor');

      const data = await response.json();
      let botReply = data.reply;

      if (botReply.includes('[ACTION:HUMAN_HANDOFF]')) {
        setNeedsHuman(true);
        botReply = botReply.replace('[ACTION:HUMAN_HANDOFF]', '').trim();
      }

      setMessages(prev => [...prev, { id: Date.now(), text: botReply, sender: 'agent' }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        id: Date.now(), 
        text: 'Ocurrió un error al conectar con la IA. Asegúrate de tener la API encendida (uvicorn en puerto 8000).', 
        sender: 'agent' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWhatsAppRedirect = () => {
    const message = encodeURIComponent("Hola, necesito hablar con un asesor de Tu Market. Vengo desde la app.");
    window.open(`https://wa.me/584120000000?text=${message}`, '_blank');
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 active:scale-90 flex items-center justify-center border-2 border-white cursor-pointer"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[90vw] sm:w-[360px] h-[520px] bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-fade-in">
          
          <div className="bg-gradient-to-r from-emerald-800 to-teal-700 p-4 flex items-center justify-between text-white shadow-md">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
                <Bot className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm leading-tight">Asistente IA</span>
                <span className="text-[10px] text-emerald-200 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  En línea
                </span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:text-emerald-200 transition-colors cursor-pointer"><X className="w-5 h-5" /></button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-emerald-600 text-white rounded-br-none'
                    : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex items-start">
                <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm flex gap-1.5">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce delay-75"></div>
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 bg-white border-t border-gray-100">
            {needsHuman ? (
              <div className="space-y-2 animate-fade-in">
                <div className="bg-amber-50 border border-amber-200 text-amber-800 text-xs p-2.5 rounded-xl flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <p>Te hemos transferido al modo manual. Un asesor tomará tu caso en WhatsApp.</p>
                </div>
                <button
                  onClick={handleWhatsAppRedirect}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-3 rounded-xl flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer"
                >
                  <User className="w-4 h-4" /> Hablar con un Asesor
                </button>
                <button 
                  onClick={() => setNeedsHuman(false)} 
                  className="w-full text-xs text-gray-400 hover:text-gray-600 py-1 cursor-pointer"
                >
                  Volver al asistente virtual
                </button>
              </div>
            ) : (
              <form onSubmit={handleSend} className="bg-slate-50 rounded-2xl border border-gray-200 p-1.5 flex items-center gap-2 focus-within:border-emerald-500 focus-within:bg-white transition-all">
                <input
                  type="text"
                  placeholder="Escribe tu consulta..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full bg-transparent text-sm text-gray-800 focus:outline-none px-3 py-1.5"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white p-2 rounded-xl transition-all flex-shrink-0 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};
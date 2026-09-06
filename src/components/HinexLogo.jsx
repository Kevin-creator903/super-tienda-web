import React from 'react';

export const HinexLogo = ({ className = "h-12 md:h-14" }) => {
  return (
    <div className="bg-white px-3 py-1.5 rounded-2xl shadow-md border border-emerald-100 flex items-center justify-center hover:scale-105 transition-transform duration-200 cursor-pointer">
      <img
        src="/hinex-logo.jpeg"
        alt="HINEX - Tu Aliado Estratégico"
        className={`${className} w-auto object-contain`}
      />
    </div>
  );
};
import React from 'react';

export const HinexLogo = ({ className = "h-11 md:h-12" }) => {
  return (
    <div className="bg-[#f7f4eb] px-3 py-1 rounded-2xl shadow-md border border-[#d89b27]/40 flex items-center justify-center hover:scale-105 transition-transform duration-200 cursor-pointer overflow-hidden">
      <img
        src="/hinex-logo.jpeg"
        alt="FHERIA MAYOR"
        className={`${className} w-auto object-contain rounded-xl`}
      />
    </div>
  );
};
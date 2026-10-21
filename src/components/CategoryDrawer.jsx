import React, { useEffect } from 'react';
import { X, Layers, ChevronRight } from 'lucide-react';
import { useStore } from '../store/useStore';
import * as mockData from '../data/mockData';

export function CategoryDrawer() {
  const { isCategoryDrawerOpen, setIsCategoryDrawerOpen, setSelectedCategory, setSelectedSubcategory } = useStore();

  // Escuchar la tecla Escape para cerrar el drawer
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isCategoryDrawerOpen) {
        setIsCategoryDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCategoryDrawerOpen, setIsCategoryDrawerOpen]);

  if (!isCategoryDrawerOpen) return null;

  const categories = mockData.CATEGORIES || [];

  const handleSelect = (catName, subcatName = null) => {
    setSelectedCategory(catName);
    setSelectedSubcategory(subcatName);
    setIsCategoryDrawerOpen(false);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex justify-start bg-black/60 backdrop-blur-sm transition-opacity"
      onClick={() => setIsCategoryDrawerOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Menú de Categorías"
    >
      <div 
        className="w-full max-w-xs sm:max-w-sm bg-white h-full shadow-2xl flex flex-col p-6 overflow-y-auto animate-in slide-in-from-left duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Encabezado */}
        <div className="flex items-center justify-between border-b pb-4 mb-4">
          <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-base">
            <Layers className="w-5 h-5" />
            <h2>Categorías de Productos</h2>
          </div>
          <button 
            onClick={() => setIsCategoryDrawerOpen(false)}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
            aria-label="Cerrar menú de categorías"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Lista de Categorías */}
        <div className="space-y-1 overflow-y-auto flex-1 pr-1">
          <button
            onClick={() => handleSelect('Todos los productos')}
            className="w-full text-left font-bold text-xs p-3 rounded-xl hover:bg-emerald-50 text-gray-800 flex items-center justify-between transition-colors"
          >
            <span>Todas las Categorías</span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>

          {categories.map((cat) => (
            <div key={cat.id} className="space-y-0.5">
              <button
                onClick={() => handleSelect(cat.name)}
                className="w-full text-left font-bold text-xs p-3 rounded-xl hover:bg-emerald-50 text-gray-800 flex items-center justify-between transition-colors"
              >
                <span>{cat.name}</span>
                <ChevronRight className="w-4 h-4 text-emerald-600" />
              </button>

              {/* Subcategorías */}
              {cat.subcategories && cat.subcategories.length > 0 && (
                <div className="pl-4 space-y-0.5 border-l-2 border-emerald-100 my-1">
                  {cat.subcategories.map((sub, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelect(cat.name, sub)}
                      className="w-full text-left text-xs p-2 rounded-lg text-gray-600 hover:text-emerald-700 hover:bg-emerald-50/50 block transition-colors"
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
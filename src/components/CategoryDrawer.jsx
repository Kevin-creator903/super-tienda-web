import React, { useEffect } from 'react';
import { X, ChevronRight, Layers, Sparkles } from 'lucide-react';
import { useStore } from '../store/useStore';
import * as mockData from '../data/mockData';

export function CategoryDrawer() {
  const { 
    isCategoryDrawerOpen, 
    closeCategoryDrawer, 
    selectedCategory, 
    setSelectedCategory,
    selectedSubcategory,
    setSelectedSubcategory
  } = useStore();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isCategoryDrawerOpen) {
        closeCategoryDrawer();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCategoryDrawerOpen, closeCategoryDrawer]);

  if (!isCategoryDrawerOpen) return null;

  const categories = Array.isArray(mockData.CATEGORIES) ? mockData.CATEGORIES : [];

  const handleSelectCat = (categoryName) => {
    setSelectedCategory(categoryName);
    closeCategoryDrawer();
  };

  const handleSelectSub = (subName) => {
    setSelectedSubcategory(subName);
    closeCategoryDrawer();
  };

  return (
    <div 
      className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex justify-start transition-opacity animate-in fade-in duration-200"
      onClick={closeCategoryDrawer}
    >
      <div 
        className="bg-white w-full max-w-xs md:max-w-sm h-full flex flex-col justify-between shadow-2xl animate-in slide-in-from-left duration-300 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 bg-emerald-800 text-white flex items-center justify-between border-b border-emerald-700">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-400" />
            <h2 className="font-extrabold text-sm tracking-wide">Categorías de Productos</h2>
          </div>
          <button 
            type="button"
            onClick={closeCategoryDrawer}
            className="p-1.5 hover:bg-emerald-700 rounded-xl text-white transition-colors cursor-pointer"
            title="Cerrar Categorías"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-1.5 divide-y divide-gray-100">
          <button
            onClick={() => handleSelectCat('Todos los productos')}
            className={`w-full text-left px-3 py-2.5 rounded-xl font-bold text-xs flex items-center justify-between transition-all cursor-pointer ${
              selectedCategory === 'Todos los productos' 
                ? 'bg-emerald-700 text-white shadow-md' 
                : 'text-gray-800 hover:bg-emerald-50'
            }`}
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" /> Todos los productos
            </span>
            <ChevronRight className="w-4 h-4" />
          </button>

          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.name;
            return (
              <div key={cat.id || cat.name} className="pt-1.5">
                <button
                  onClick={() => handleSelectCat(cat.name)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl font-bold text-xs flex items-center justify-between transition-all cursor-pointer ${
                    isSelected 
                      ? 'bg-emerald-700 text-white shadow-md' 
                      : 'text-gray-800 hover:bg-emerald-50'
                  }`}
                >
                  <span className="truncate">{cat.name}</span>
                  <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'rotate-90' : ''}`} />
                </button>

                {isSelected && cat.subcategories && cat.subcategories.length > 0 && (
                  <div className="pl-4 pr-1 py-1.5 space-y-1 bg-emerald-50/50 rounded-xl mt-1 border border-emerald-100">
                    {cat.subcategories.map((sub) => (
                      <button
                        key={sub}
                        onClick={() => handleSelectSub(sub)}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer ${
                          selectedSubcategory === sub
                            ? 'bg-amber-400 text-emerald-950 font-black'
                            : 'text-gray-600 hover:text-emerald-800 hover:bg-emerald-100/60'
                        }`}
                      >
                        • {sub}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="p-4 border-t border-gray-100 bg-slate-50 text-center text-[10px] text-gray-400 font-semibold">
          FHERIA MAYOR © 2026 - Catálogo Mayorista
        </div>

      </div>
    </div>
  );
}

export default CategoryDrawer;
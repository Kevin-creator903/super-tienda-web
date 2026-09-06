import React, { useState } from 'react';
import { X, Folder, ChevronRight, ChevronDown, Search } from 'lucide-react';
import { useStore } from '../store/useStore';
import * as mockData from '../data/mockData';

export const CategoryDrawer = () => {
  const { isCategoryDrawerOpen, closeCategoryDrawer, setSelectedCategory, setSelectedSubcategory } = useStore();
  const [filterQuery, setFilterQuery] = useState('');
  const [expandedCat, setExpandedCat] = useState(null);

  if (!isCategoryDrawerOpen) return null;

  const categoriesTree = Array.isArray(mockData.CATEGORY_TREE) ? mockData.CATEGORY_TREE : [];

  const filteredTree = categoriesTree.filter((cat) => {
    if (!filterQuery) return true;
    const q = filterQuery.toLowerCase();
    const matchCat = cat.name.toLowerCase().includes(q);
    const matchSub = cat.subcategories?.some((s) => s.name.toLowerCase().includes(q));
    return matchCat || matchSub;
  });

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden animate-fade-in">
      <div onClick={closeCategoryDrawer} className="fixed inset-0 bg-black/60 backdrop-blur-sm" />

      <div className="fixed inset-y-0 left-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="bg-emerald-800 text-white p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Folder className="w-6 h-6 text-amber-300" />
                <h2 className="text-lg font-black">Todas las Categorías</h2>
              </div>
              <button onClick={closeCategoryDrawer} className="p-1 text-emerald-200 hover:text-white rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Buscador dentro de categorías */}
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar categoría..."
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                className="w-full bg-emerald-950/60 text-white placeholder-emerald-300/70 text-xs rounded-xl py-2 pl-8 pr-3 focus:outline-none border border-emerald-600/40"
              />
              <Search className="w-3.5 h-3.5 text-emerald-300 absolute left-2.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Lista de Categorías */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-slate-50">
            {filteredTree.map((cat) => {
              const isExpanded = expandedCat === cat.id;
              const hasSubs = Array.isArray(cat.subcategories) && cat.subcategories.length > 0;

              return (
                <div key={cat.id} className="bg-white rounded-2xl border border-emerald-100 shadow-sm overflow-hidden">
                  <div className="flex items-center justify-between p-3.5 hover:bg-emerald-50/50 transition-colors">
                    <button
                      onClick={() => {
                        setSelectedCategory(cat.name);
                        closeCategoryDrawer();
                      }}
                      className="text-xs font-black text-gray-800 text-left flex-1 hover:text-emerald-700"
                    >
                      {cat.name}
                    </button>

                    {hasSubs && (
                      <button
                        onClick={() => setExpandedCat(isExpanded ? null : cat.id)}
                        className="p-1 text-gray-400 hover:text-emerald-700"
                      >
                        {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                      </button>
                    )}
                  </div>

                  {isExpanded && hasSubs && (
                    <div className="bg-slate-50/80 p-3 pt-1 border-t border-gray-100 space-y-1">
                      {cat.subcategories.map((sub) => (
                        <button
                          key={sub.id}
                          onClick={() => {
                            setSelectedCategory(cat.name);
                            setSelectedSubcategory(sub.name);
                            closeCategoryDrawer();
                          }}
                          className="block w-full text-left py-1.5 px-3 rounded-lg text-[11px] font-semibold text-gray-600 hover:text-emerald-800 hover:bg-emerald-100/60 transition-colors"
                        >
                          • {sub.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
};
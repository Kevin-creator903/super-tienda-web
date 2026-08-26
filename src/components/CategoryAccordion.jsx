import React from 'react';
import { ChevronDown, ChevronUp, Folder } from 'lucide-react';
import { CATEGORY_TREE } from '../data/mockData';
import { useStore } from '../store/useStore';

export const CategoryAccordion = () => {
  const { selectedCategory, setSelectedCategory, selectedSubcategory, setSelectedSubcategory } = useStore();
  const [expandedCats, setExpandedCats] = React.useState({ 'Alimentos': true, 'Frutas y Verduras': true });

  const tree = Array.isArray(CATEGORY_TREE) ? CATEGORY_TREE : [];

  const toggleCategoryExpand = (catName) => {
    setExpandedCats((prev) => ({ ...prev, [catName]: !prev[catName] }));
  };

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-emerald-100 shadow-sm p-4 space-y-2">
      <div className="bg-emerald-800 text-white font-extrabold text-xs px-3 py-2 rounded-xl flex items-center gap-2 mb-3">
        <Folder className="w-4 h-4 text-amber-300" />
        <span>Categorías de Supermercado</span>
      </div>

      {tree.map((category) => {
        const catName = category?.name || '';
        const isExpanded = expandedCats[catName];
        const isSelected = selectedCategory === catName && !selectedSubcategory;
        const hasSub = Array.isArray(category.subcategories) && category.subcategories.length > 0;

        return (
          <div key={category.id || catName} className="text-xs">
            <div className="flex items-center justify-between py-1.5 px-2 hover:bg-emerald-50/60 rounded-lg transition-colors">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedCategory(catName);
                }}
                className={`font-semibold flex-1 text-left cursor-pointer ${
                  isSelected ? 'text-emerald-700 font-bold' : 'text-gray-700'
                }`}
              >
                {catName}
              </button>
              
              {hasSub && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleCategoryExpand(catName);
                  }}
                  className="p-1 text-gray-400 hover:text-emerald-700 cursor-pointer"
                >
                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              )}
            </div>

            {isExpanded && hasSub && (
              <div className="pl-4 space-y-1 my-1 border-l-2 border-emerald-100 ml-2">
                {category.subcategories.map((sub) => {
                  const subName = sub?.name || '';
                  return (
                    <button
                      key={sub.id || subName}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCategory(catName);
                        setSelectedSubcategory(subName);
                      }}
                      className={`block w-full text-left py-1 px-2 rounded-md transition-all text-[11px] cursor-pointer ${
                        selectedSubcategory === subName
                          ? 'bg-emerald-100/70 text-emerald-800 font-bold'
                          : 'text-gray-500 hover:text-emerald-700 hover:bg-gray-50'
                      }`}
                    >
                      {subName}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
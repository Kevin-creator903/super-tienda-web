import { create } from 'zustand';

export const useStore = create((set, get) => ({
  currency: 'USD',
  exchangeRate: 787.52,
  selectedCategory: 'Todos los productos',
  selectedSubcategory: null,
  selectedProduct: null,
  searchQuery: '',
  
  // Modales / Drawers
  isCategoryDrawerOpen: false,
  isFilterDrawerOpen: false,

  // Estados de Filtros
  minPriceUSD: 0,
  maxPriceUSD: 150,
  inStockFilter: false,
  outOfStockFilter: false,
  primeOnlyFilter: false,
  sortBy: 'default',
  
  // Carritos
  isCartOpen: false,
  activeCartTab: 1,
  isUserLoggedIn: false,
  carts: { 1: [], 2: [], 3: [] },

  toast: { show: false, message: '', image: '' },

  setCurrency: (currency) => set({ currency }),
  setExchangeRate: (exchangeRate) => set({ exchangeRate }),
  setSelectedCategory: (category) => {
    let catName = 'Todos los productos';
    if (typeof category === 'string') catName = category;
    else if (category?.name) catName = category.name;

    set({ 
      selectedCategory: catName, 
      selectedSubcategory: null, 
      selectedProduct: null,
      isCategoryDrawerOpen: false 
    });
  },
  setSelectedSubcategory: (subcategory) => set({ 
    selectedSubcategory: subcategory, 
    selectedProduct: null,
    isCategoryDrawerOpen: false 
  }),
  setSelectedProduct: (product) => set({ selectedProduct: product }),
  clearSelectedProduct: () => set({ selectedProduct: null }),
  setSearchQuery: (searchQuery) => set({ searchQuery: searchQuery || '' }),
  
  // Modales Toggles
  toggleCategoryDrawer: () => set((state) => ({ isCategoryDrawerOpen: !state.isCategoryDrawerOpen })),
  openCategoryDrawer: () => set({ isCategoryDrawerOpen: true }),
  closeCategoryDrawer: () => set({ isCategoryDrawerOpen: false }),

  toggleFilterDrawer: () => set((state) => ({ isFilterDrawerOpen: !state.isFilterDrawerOpen })),
  openFilterDrawer: () => set({ isFilterDrawerOpen: true }),
  closeFilterDrawer: () => set({ isFilterDrawerOpen: false }),

  // Setters de Filtros
  setMinPriceUSD: (minPriceUSD) => set({ minPriceUSD: Math.max(0, Number(minPriceUSD) || 0) }),
  setMaxPriceUSD: (maxPriceUSD) => set({ maxPriceUSD: Number(maxPriceUSD) || 150 }),
  setInStockFilter: (inStockFilter) => set({ inStockFilter: Boolean(inStockFilter) }),
  setOutOfStockFilter: (outOfStockFilter) => set({ outOfStockFilter: Boolean(outOfStockFilter) }),
  setPrimeOnlyFilter: (primeOnlyFilter) => set({ primeOnlyFilter: Boolean(primeOnlyFilter) }),
  setSortBy: (sortBy) => set({ sortBy }),

  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
  setActiveCartTab: (tab) => set({ activeCartTab: tab }),
  hideToast: () => set({ toast: { show: false, message: '', image: '' } }),

  resetFilters: () => set({
    minPriceUSD: 0,
    maxPriceUSD: 150,
    inStockFilter: false,
    outOfStockFilter: false,
    primeOnlyFilter: false,
    sortBy: 'default',
    selectedSubcategory: null,
    searchQuery: '',
    selectedCategory: 'Todos los productos',
    selectedProduct: null,
  }),

  addToCart: (product, quantity = 1) => {
    if (!product?.id) return;
    const state = get();
    const activeTab = state.activeCartTab || 1;
    const cartsState = state.carts || { 1: [], 2: [], 3: [] };
    const currentCart = cartsState[activeTab] || [];
    const existing = currentCart.find((item) => item.id === product.id);

    let updatedCart;
    if (existing) {
      updatedCart = currentCart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
      );
    } else {
      updatedCart = [...currentCart, { ...product, quantity }];
    }

    set({
      carts: { ...cartsState, [activeTab]: updatedCart },
      toast: {
        show: true,
        message: `¡${product.name || 'Producto'} agregado!`,
        image: product.image || '',
      },
    });

    setTimeout(() => set((s) => ({ toast: { ...s.toast, show: false } })), 3500);
  },

  updateCartQuantity: (productId, quantity) => {
    const state = get();
    const activeTab = state.activeCartTab || 1;
    const cartsState = state.carts || { 1: [], 2: [], 3: [] };
    const currentCart = cartsState[activeTab] || [];

    const updatedCart = quantity <= 0
      ? currentCart.filter((item) => item.id !== productId)
      : currentCart.map((item) => item.id === productId ? { ...item, quantity } : item);

    set({ carts: { ...cartsState, [activeTab]: updatedCart } });
  },

  removeFromCart: (productId) => {
    const state = get();
    const activeTab = state.activeCartTab || 1;
    const cartsState = state.carts || { 1: [], 2: [], 3: [] };
    set({ carts: { ...cartsState, [activeTab]: (cartsState[activeTab] || []).filter((item) => item.id !== productId) } });
  },

  clearActiveCart: () => {
    const state = get();
    const activeTab = state.activeCartTab || 1;
    set({ carts: { ...state.carts, [activeTab]: [] } });
  },
}));
import { create } from 'zustand';

export const useStore = create((set, get) => ({
  currency: 'USD',
  exchangeRate: 787.52,
  selectedCategory: 'Todos los productos',
  selectedSubcategory: null,
  selectedProduct: null,
  searchQuery: '',
  
  // Nuevos Estados de Filtros Avanzados
  minPriceUSD: 0,
  maxPriceUSD: 150,
  inStockFilter: false,
  outOfStockFilter: false,
  primeOnlyFilter: false,
  sortBy: 'default', // 'default' | 'price-asc' | 'price-desc' | 'name-asc'
  
  isCategoryMenuOpen: false,

  // Estado del Carrito y Múltiples Carritos
  isCartOpen: false,
  activeCartTab: 1,
  isUserLoggedIn: false,
  carts: {
    1: [],
    2: [],
    3: [],
  },

  toast: { show: false, message: '', image: '' },

  setCurrency: (currency) => set({ currency }),
  setExchangeRate: (exchangeRate) => set({ exchangeRate }),
  setSelectedCategory: (category) => {
    let catName = 'Todos los productos';
    if (typeof category === 'string') {
      catName = category;
    } else if (category && typeof category === 'object' && category.name) {
      catName = category.name;
    }

    set({ 
      selectedCategory: catName, 
      selectedSubcategory: null, 
      selectedProduct: null 
    });
  },
  setSelectedSubcategory: (subcategory) => set({ 
    selectedSubcategory: subcategory, 
    selectedProduct: null 
  }),
  setSelectedProduct: (product) => set({ selectedProduct: product }),
  clearSelectedProduct: () => set({ selectedProduct: null }),
  setSearchQuery: (searchQuery) => set({ searchQuery: searchQuery || '' }),
  
  // Setters de Filtros Nuevos
  setMinPriceUSD: (minPriceUSD) => set({ minPriceUSD: Math.max(0, Number(minPriceUSD) || 0) }),
  setMaxPriceUSD: (maxPriceUSD) => set({ maxPriceUSD: Number(maxPriceUSD) || 150 }),
  setInStockFilter: (inStockFilter) => set({ inStockFilter: Boolean(inStockFilter) }),
  setOutOfStockFilter: (outOfStockFilter) => set({ outOfStockFilter: Boolean(outOfStockFilter) }),
  setPrimeOnlyFilter: (primeOnlyFilter) => set({ primeOnlyFilter: Boolean(primeOnlyFilter) }),
  setSortBy: (sortBy) => set({ sortBy }),

  toggleCategoryMenu: () => set((state) => ({ isCategoryMenuOpen: !state.isCategoryMenuOpen })),

  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
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
    if (!product || !product.id) return;

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
      carts: {
        ...cartsState,
        [activeTab]: updatedCart,
      },
      toast: {
        show: true,
        message: `¡${product.name || 'Producto'} agregado!`,
        image: product.image || '',
      },
    });

    setTimeout(() => {
      set((s) => ({ toast: { ...s.toast, show: false } }));
    }, 3500);
  },

  updateCartQuantity: (productId, quantity) => {
    const state = get();
    const activeTab = state.activeCartTab || 1;
    const cartsState = state.carts || { 1: [], 2: [], 3: [] };
    const currentCart = cartsState[activeTab] || [];

    let updatedCart;
    if (quantity <= 0) {
      updatedCart = currentCart.filter((item) => item.id !== productId);
    } else {
      updatedCart = currentCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      );
    }

    set({
      carts: {
        ...cartsState,
        [activeTab]: updatedCart,
      },
    });
  },

  removeFromCart: (productId) => {
    const state = get();
    const activeTab = state.activeCartTab || 1;
    const cartsState = state.carts || { 1: [], 2: [], 3: [] };
    const currentCart = cartsState[activeTab] || [];

    set({
      carts: {
        ...cartsState,
        [activeTab]: currentCart.filter((item) => item.id !== productId),
      },
    });
  },

  clearActiveCart: () => {
    const state = get();
    const activeTab = state.activeCartTab || 1;
    const cartsState = state.carts || { 1: [], 2: [], 3: [] };

    set({
      carts: {
        ...cartsState,
        [activeTab]: [],
      },
    });
  },
}));
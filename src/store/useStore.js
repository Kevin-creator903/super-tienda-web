import { create } from 'zustand';

export const useStore = create((set, get) => ({
  currency: 'USD',
  exchangeRate: 787.52,
  selectedCategory: 'Todos los productos',
  selectedSubcategory: null,
  selectedProduct: null,
  searchQuery: '',
  
  isAdminViewOpen: false,

  orders: [
    {
      id: 'ORD-1001',
      date: new Date(Date.now() - 3600000 * 2).toISOString(),
      customer: {
        name: 'Carlos Mendoza',
        phone: '+58 412-1234567',
        address: 'Valencia, Carabobo - Av. Bolivar Norte',
        paymentMethod: 'Pago Móvil / Zelle'
      },
      items: [
        { id: 1, name: 'Harina de Maíz Blanco Precocida 1kg', quantity: 3, priceUsd: 1.25 },
        { id: 3, name: 'Pechuga de Pollo Fresca sin Piel (Por kg)', quantity: 2, priceUsd: 4.80 }
      ],
      totalUsd: 13.35,
      cartTab: 1,
      status: 'Pendiente'
    }
  ],

  isCategoryDrawerOpen: false,
  isFilterDrawerOpen: false,

  minPriceUSD: 0,
  maxPriceUSD: 150,
  inStockFilter: false,
  outOfStockFilter: false,
  primeOnlyFilter: false,
  sortBy: 'default',
  
  isCartOpen: false,
  activeCartTab: 1,
  isUserLoggedIn: false,
  carts: { 1: [], 2: [], 3: [] },

  toast: { show: false, message: '', image: '' },

  toggleAdminView: () => set((state) => ({ isAdminViewOpen: !state.isAdminViewOpen, selectedProduct: null })),
  openAdminView: () => set({ isAdminViewOpen: true, selectedProduct: null }),
  closeAdminView: () => set({ isAdminViewOpen: false }),

  createOrder: (customerData = {}) => {
    const state = get();
    const activeTab = state.activeCartTab || 1;
    const currentCart = state.carts[activeTab] || [];
    if (currentCart.length === 0) return null;

    const totalUsd = currentCart.reduce((sum, item) => sum + ((item?.priceUsd || 0) * (item?.quantity || 1)), 0);
    const newOrderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder = {
      id: newOrderId,
      date: new Date().toISOString(),
      customer: {
        name: customerData.name || 'Cliente Web',
        phone: customerData.phone || '+58 4XX-XXXXXXX',
        address: customerData.address || 'Carabobo, Venezuela',
        paymentMethod: customerData.paymentMethod || 'Acordar por WhatsApp'
      },
      items: [...currentCart],
      totalUsd,
      cartTab: activeTab,
      status: 'Pendiente'
    };

    set((s) => ({
      orders: [newOrder, ...s.orders],
      carts: { ...s.carts, [activeTab]: [] },
      toast: { show: true, message: `¡Pedido ${newOrderId} generado con éxito!`, image: '' }
    }));

    setTimeout(() => set((s) => ({ toast: { ...s.toast, show: false } })), 3500);
    return newOrder;
  },

  updateOrderStatus: (orderId, newStatus) => {
    set((state) => ({
      orders: (state.orders || []).map((ord) => 
        ord.id === orderId ? { ...ord, status: newStatus } : ord
      )
    }));
  },

  deleteOrder: (orderId) => {
    set((state) => ({
      orders: (state.orders || []).filter((ord) => ord.id !== orderId)
    }));
  },

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
      isAdminViewOpen: false,
      isCategoryDrawerOpen: false 
    });
  },
  setSelectedSubcategory: (subcategory) => set({ 
    selectedSubcategory: subcategory, 
    selectedProduct: null,
    isAdminViewOpen: false,
    isCategoryDrawerOpen: false 
  }),
  setSelectedProduct: (product) => set({ selectedProduct: product, isAdminViewOpen: false }),
  clearSelectedProduct: () => set({ selectedProduct: null }),
  setSearchQuery: (searchQuery) => set({ searchQuery: searchQuery || '' }),
  
  toggleCategoryDrawer: () => set((state) => ({ isCategoryDrawerOpen: !state.isCategoryDrawerOpen })),
  openCategoryDrawer: () => set({ isCategoryDrawerOpen: true }),
  closeCategoryDrawer: () => set({ isCategoryDrawerOpen: false }),

  toggleFilterDrawer: () => set((state) => ({ isFilterDrawerOpen: !state.isFilterDrawerOpen })),
  openFilterDrawer: () => set({ isFilterDrawerOpen: true }),
  closeFilterDrawer: () => set({ isFilterDrawerOpen: false }),

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
import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Product, ProductVariant, CartItem, Coupon, Order, CategoryFilter, StoreSettings, ViewType } from '../types/store';
import { INITIAL_PRODUCTS, AVAILABLE_COUPONS } from '../data/mockData';
import { TIENDA_API } from '../config/api';

interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  title: string;
  description?: string;
}

interface StoreContextType {
  // Store Settings & Customization
  settings: StoreSettings;
  updateSettings: (newSettings: Partial<StoreSettings>) => Promise<void>;
  resetSettings: () => Promise<void>;

  // Products & Filtering
  products: Product[];
  selectedCategory: CategoryFilter;
  setSelectedCategory: (cat: CategoryFilter) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'discount';
  setSortBy: (sort: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'discount') => void;
  inStockOnly: boolean;
  setInStockOnly: (val: boolean) => void;
  filteredProducts: Product[];

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, variant?: ProductVariant, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, newQty: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  freeShippingThreshold: number;
  freeShippingProgress: number; // 0 to 100%
  amountToFreeShipping: number;

  // Coupon
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  discountAmount: number;

  // Views & Routing
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;

  // Modals & Drawers
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isWishlistModalOpen: boolean;
  setIsWishlistModalOpen: (open: boolean) => void;

  // Legal Support Modal
  isLegalModalOpen: boolean;
  setIsLegalModalOpen: (open: boolean) => void;
  legalTab: 'terms' | 'privacy' | 'consumer' | 'regret';
  setLegalTab: (tab: 'terms' | 'privacy' | 'consumer' | 'regret') => void;

  // Currency
  currency: 'ARS' | 'USD';
  setCurrency: (c: 'ARS' | 'USD') => void;
  formatPrice: (amountInArs: number) => string;

  // Admin & Products CRUD & Orders
  orders: Order[];
  createOrder: (order: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>) => Promise<Order>;
  addProduct: (product: Product) => Promise<void> | void;
  updateProduct: (updatedProduct: Product) => Promise<void>;
  updateProductStock: (productId: string, newStock: number) => Promise<void> | void;
  deleteProduct: (productId: string) => Promise<void>;

  // Toasts
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const DEFAULT_STORE_SETTINGS: StoreSettings = {
  storeName: 'AURA',
  storeTagline: 'Tienda de electrónica de vanguardia 100% personalizada',
  supportEmail: 'alertasjariel@gmail.com',
  supportPhone: '+54 11 4567-8900',
  announcementText: '20% OFF Inauguración con cupón MODERNA20 • Envíos gratis desde $250.000 • Hasta 12 cuotas sin interés',
  announcementCoupon: 'MODERNA20',
  announcementDiscount: 20,
  heroBadge: 'Colección Minimalista 2026',
  heroTitle: 'Tecnología de élite,',
  heroTitleHighlight: 'en su expresión más pura.',
  heroSubtitle: 'Tu tienda de electrónica de vanguardia 100% personalizada. Dispositivos de audio Hi-Fi, wearables y periféricos premium configurados a tu medida, con atención exclusiva, garantía oficial y envíos prioritarios a todo el país.',
  heroCtaPrimary: 'Explorar Catálogo',
  heroCtaSecondary: 'Ver Producto Estrella',
  heroStarProductId: 'prod-1',
  heroStarBadge: 'DROP EXCLUSIVO',
  heroStarTag: '🎧 Berilio Puro 40mm • LDAC Lossless',
  freeShippingThreshold: 250000,
};

const FREE_SHIPPING_THRESHOLD_ARS = 250000;
const USD_RATE = 1250; // 1 USD = 1250 ARS

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Store Customization Settings State
  const [settings, setSettings] = useState<StoreSettings>(() => {
    const saved = localStorage.getItem('aura_store_settings');
    if (saved) {
      try {
        return { ...DEFAULT_STORE_SETTINGS, ...JSON.parse(saved) };
      } catch (e) {}
    }
    return DEFAULT_STORE_SETTINGS;
  });

  // Catalog State
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('aura_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'discount'>('featured');
  const [inStockOnly, setInStockOnly] = useState(false);

  // Wishlist State
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('aura_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  // Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('aura_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Coupon State
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(() => {
    const saved = localStorage.getItem('aura_coupon');
    return saved ? JSON.parse(saved) : null;
  });

  // Orders State
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('aura_orders');
    return saved ? JSON.parse(saved) : [];
  });

  // Views & Routing
  const [currentView, setCurrentView] = useState<ViewType>('home');

  // Modals & Navigation
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isWishlistModalOpen, setIsWishlistModalOpen] = useState(false);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState<'terms' | 'privacy' | 'consumer' | 'regret'>('terms');
  const [currency, setCurrency] = useState<'ARS' | 'USD'>('ARS');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem('aura_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('aura_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('aura_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('aura_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    if (appliedCoupon) {
      localStorage.setItem('aura_coupon', JSON.stringify(appliedCoupon));
    } else {
      localStorage.removeItem('aura_coupon');
    }
  }, [appliedCoupon]);

  // Toast System
  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { ...toast, id }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Currency Formatter
  const formatPrice = (amountInArs: number): string => {
    if (currency === 'USD') {
      const usdVal = amountInArs / USD_RATE;
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }).format(usdVal);
    }
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amountInArs);
  };

  // Wishlist Methods
  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      const prod = products.find(p => p.id === productId);
      if (exists) {
        addToast({
          type: 'info',
          title: 'Eliminado de favoritos',
          description: prod ? prod.title : undefined,
        });
        return prev.filter(id => id !== productId);
      } else {
        addToast({
          type: 'success',
          title: 'Guardado en favoritos ❤️',
          description: prod ? prod.title : undefined,
        });
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  // Cart Calculations
  const cartSubtotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  }, [cart]);

  const cartCount = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  const discountAmount = useMemo(() => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon.minSpend && cartSubtotal < appliedCoupon.minSpend) return 0;

    if (appliedCoupon.discountType === 'percentage') {
      return Math.round((cartSubtotal * appliedCoupon.discountValue) / 100);
    }
    return Math.min(appliedCoupon.discountValue, cartSubtotal);
  }, [appliedCoupon, cartSubtotal]);

  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD_ARS - cartSubtotal);
  const freeShippingProgress = Math.min(100, Math.round((cartSubtotal / FREE_SHIPPING_THRESHOLD_ARS) * 100));

  // Cart Methods
  const addToCart = (product: Product, variant?: ProductVariant, quantity: number = 1) => {
    const unitPrice = variant?.promoPrice ?? variant?.price ?? product.promoPrice ?? product.price;
    const cartItemId = variant ? `${product.id}-${variant.id}` : product.id;

    setCart(prev => {
      const existing = prev.find(item => item.id === cartItemId);
      if (existing) {
        return prev.map(item =>
          item.id === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, {
        id: cartItemId,
        productId: product.id,
        product,
        variant,
        quantity,
        unitPrice,
      }];
    });

    addToast({
      type: 'success',
      title: '¡Agregado al carrito!',
      description: `${product.title}${variant ? ` (${variant.name})` : ''} x${quantity}`,
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.id === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Coupons
  const applyCoupon = (code: string) => {
    const formatted = code.trim().toUpperCase();

    // Check if it matches the store's customized promotional coupon
    const customCode = (settings.announcementCoupon || 'MODERNA20').trim().toUpperCase();
    if (formatted === customCode) {
      const customCoupon: Coupon = {
        code: customCode,
        discountType: 'percentage',
        discountValue: settings.announcementDiscount || 20,
        description: `${settings.announcementDiscount || 20}% OFF de inauguración`
      };
      setAppliedCoupon(customCoupon);
      return { success: true, message: `¡Cupón ${customCode} aplicado con éxito!` };
    }

    const found = AVAILABLE_COUPONS.find(c => c.code === formatted);

    if (!found) {
      return { success: false, message: 'El cupón ingresado no es válido o ha expirado.' };
    }

    if (found.minSpend && cartSubtotal < found.minSpend) {
      return {
        success: false,
        message: `Mínimo de compra para este cupón: ${formatPrice(found.minSpend)}`,
      };
    }

    setAppliedCoupon(found);
    return { success: true, message: `¡Cupón ${found.code} aplicado con éxito!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  // Filtered Products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q)) ||
        p.category.toLowerCase().includes(q)
      );
    }

    // In stock
    if (inStockOnly) {
      result = result.filter(p => p.stock > 0);
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => (a.promoPrice ?? a.price) - (b.promoPrice ?? b.price));
        break;
      case 'price-desc':
        result.sort((a, b) => (b.promoPrice ?? b.price) - (a.promoPrice ?? a.price));
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'discount':
        result.sort((a, b) => {
          const discA = a.promoPrice ? (a.price - a.promoPrice) / a.price : 0;
          const discB = b.promoPrice ? (b.price - b.promoPrice) / b.price : 0;
          return discB - discA;
        });
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
        break;
    }

    return result;
  }, [products, selectedCategory, searchQuery, inStockOnly, sortBy]);

  // Load products & orders from MongoDB server on mount
  useEffect(() => {
    const loadDataFromServer = async () => {
      try {
        const prodRes = await fetch(TIENDA_API.products);
        if (prodRes.ok) {
          const data = await prodRes.json();
          if (data.success && data.products && data.products.length > 0) {
            setProducts(data.products);
          }
        }
      } catch (err) {
        console.warn('⚠️ No se pudo conectar con backend MongoDB para productos, usando cache local:', err);
      }

      try {
        const ordRes = await fetch(TIENDA_API.orders);
        if (ordRes.ok) {
          const data = await ordRes.json();
          if (data.success && data.orders) {
            setOrders(data.orders);
          }
        }
      } catch (err) {
        console.warn('⚠️ No se pudo conectar con backend MongoDB para órdenes:', err);
      }

      try {
        const setRes = await fetch(TIENDA_API.settings);
        if (setRes.ok) {
          const setData = await setRes.json();
          if (setData.success && setData.settings) {
            setSettings(prev => ({ ...prev, ...setData.settings }));
          }
        }
      } catch (err) {
        console.warn('⚠️ No se pudo conectar con backend MongoDB para settings:', err);
      }
    };

    loadDataFromServer();
  }, []);

  // Order Creation (persisted in MongoDB server + Nodemailer receipt email)
  const createOrder = async (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>): Promise<Order> => {
    try {
      const res = await fetch(TIENDA_API.orders, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      if (res.ok) {
        const result = await res.json();
        if (result.success && result.order) {
          const serverOrder = result.order;
          setOrders(prev => [serverOrder, ...prev]);

          // Refresh catalog to reflect new real-time stocks from DB
          try {
            const refreshRes = await fetch(TIENDA_API.products);
            if (refreshRes.ok) {
              const refreshData = await refreshRes.json();
              if (refreshData.products) setProducts(refreshData.products);
            }
          } catch (e) {}

          clearCart();
          setAppliedCoupon(null);
          return serverOrder;
        }
      }
    } catch (err) {
      console.warn('⚠️ Error al comunicarse con servidor para procesar orden, usando fallback local:', err);
    }

    // Fallback in case backend server is offline
    const fallbackOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber: `AUR-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: new Date().toISOString(),
      trackingNumber: `TRACK-AR-${Math.floor(10000000 + Math.random() * 90000000)}`,
    };

    setOrders(prev => [fallbackOrder, ...prev]);
    clearCart();
    setAppliedCoupon(null);
    return fallbackOrder;
  };

  const addProduct = async (newProduct: Product) => {
    try {
      const res = await fetch(TIENDA_API.products, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct)
      });
      if (res.ok) {
        const result = await res.json();
        if (result.product) {
          setProducts(prev => [result.product, ...prev]);
          addToast({
            type: 'success',
            title: 'Producto guardado en MongoDB',
            description: newProduct.title,
          });
          return;
        }
      }
    } catch (err) {
      console.warn('⚠️ Error al guardar producto en servidor:', err);
    }

    // Local fallback
    setProducts(prev => [newProduct, ...prev]);
    addToast({
      type: 'success',
      title: 'Producto creado en el catálogo',
      description: newProduct.title,
    });
  };

  const updateProductStock = async (productId: string, newStock: number) => {
    // Optimistic local update
    setProducts(prev =>
      prev.map(p => (p.id === productId ? { ...p, stock: newStock } : p))
    );

    try {
      await fetch(TIENDA_API.productStock(productId), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stock: newStock })
      });
    } catch (err) {
      console.warn('⚠️ Error al actualizar stock en servidor MongoDB:', err);
    }
  };

  const deleteProduct = async (productId: string) => {
    const target = products.find(p => p.id === productId);
    setProducts(prev => prev.filter(p => p.id !== productId));
    addToast({
      type: 'info',
      title: 'Producto eliminado',
      description: target?.title
    });

    try {
      await fetch(TIENDA_API.deleteProduct(productId), {
        method: 'DELETE'
      });
    } catch (err) {
      console.warn('⚠️ Error al eliminar producto en servidor MongoDB:', err);
    }
  };

  const updateProduct = async (updatedProduct: Product) => {
    setProducts(prev =>
      prev.map(p => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    addToast({
      type: 'success',
      title: 'Producto actualizado',
      description: updatedProduct.title
    });

    try {
      await fetch(TIENDA_API.updateProduct(updatedProduct.id), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct)
      });
    } catch (err) {
      console.warn('⚠️ Error al actualizar producto en servidor MongoDB:', err);
    }
  };

  const updateSettings = async (newSettings: Partial<StoreSettings>) => {
    const merged = { ...settings, ...newSettings };
    setSettings(merged);
    localStorage.setItem('aura_store_settings', JSON.stringify(merged));
    addToast({
      type: 'success',
      title: 'Configuración guardada',
      description: 'Los cambios ya se aplicaron a la tienda.'
    });

    try {
      await fetch(TIENDA_API.settings, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings: merged })
      });
    } catch (err) {
      console.warn('⚠️ Error al guardar configuración en servidor MongoDB:', err);
    }
  };

  const resetSettings = async () => {
    setSettings(DEFAULT_STORE_SETTINGS);
    localStorage.setItem('aura_store_settings', JSON.stringify(DEFAULT_STORE_SETTINGS));
    addToast({
      type: 'info',
      title: 'Valores restablecidos',
      description: 'Se restauraron los textos originales de la tienda.'
    });

    try {
      await fetch(TIENDA_API.settings, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings: DEFAULT_STORE_SETTINGS })
      });
    } catch (err) {}
  };

  return (
    <StoreContext.Provider
      value={{
        settings,
        updateSettings,
        resetSettings,

        currentView,
        setCurrentView,

        products,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        sortBy,
        setSortBy,
        inStockOnly,
        setInStockOnly,
        filteredProducts,

        wishlist,
        toggleWishlist,
        isWishlisted,

        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        freeShippingThreshold: settings.freeShippingThreshold || FREE_SHIPPING_THRESHOLD_ARS,
        freeShippingProgress,
        amountToFreeShipping,

        appliedCoupon,
        applyCoupon,
        removeCoupon,
        discountAmount,

        isCartOpen,
        setIsCartOpen,
        quickViewProduct,
        setQuickViewProduct,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isAdminOpen,
        setIsAdminOpen,
        isWishlistModalOpen,
        setIsWishlistModalOpen,

        isLegalModalOpen,
        setIsLegalModalOpen,
        legalTab,
        setLegalTab,

        currency,
        setCurrency,
        formatPrice,

        orders,
        createOrder,
        addProduct,
        updateProduct,
        updateProductStock,
        deleteProduct,

        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

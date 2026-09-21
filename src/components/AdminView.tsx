import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SlidersHorizontal,
  ArrowLeft,
  Package,
  FileText,
  ShoppingBag,
  Settings,
  Plus,
  Trash2,
  Edit3,
  Check,
  Save,
  RotateCcw,
  Sparkles,
  Zap,
  Truck,
  Eye,
  ExternalLink,
  Search,
  Star,
  Layers,
  Image as ImageIcon,
  Tag,
  DollarSign,
  AlertCircle,
  X
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product, ProductVariant } from '../types/store';

export const AdminView: React.FC = () => {
  const {
    settings,
    updateSettings,
    resetSettings,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    orders,
    formatPrice,
    setCurrentView,
    addToast
  } = useStore();

  // Active Tab: 'brand' | 'products' | 'orders' | 'settings'
  const [activeTab, setActiveTab] = useState<'brand' | 'products' | 'orders' | 'settings'>('brand');

  // Local state for brand & hero form
  const [brandForm, setBrandForm] = useState({
    storeName: settings.storeName,
    storeTagline: settings.storeTagline,
    supportEmail: settings.supportEmail,
    supportPhone: settings.supportPhone,
    announcementText: settings.announcementText,
    announcementCoupon: settings.announcementCoupon || 'MODERNA20',
    announcementDiscount: settings.announcementDiscount || 20,
    heroBadge: settings.heroBadge,
    heroTitle: settings.heroTitle,
    heroTitleHighlight: settings.heroTitleHighlight,
    heroSubtitle: settings.heroSubtitle,
    heroCtaPrimary: settings.heroCtaPrimary,
    heroCtaSecondary: settings.heroCtaSecondary,
    heroStarProductId: settings.heroStarProductId,
    heroStarBadge: settings.heroStarBadge,
    heroStarTag: settings.heroStarTag,
    freeShippingThreshold: settings.freeShippingThreshold,
  });

  const [savingBrand, setSavingBrand] = useState(false);

  // Products Search & Filter in Admin
  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState('all');

  // Product Edit Modal State
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreatingNewProduct, setIsCreatingNewProduct] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Handle Save Brand Settings
  const handleSaveBrand = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingBrand(true);
    await updateSettings(brandForm);
    setSavingBrand(false);
  };

  // Filtered products for admin catalog list
  const adminFilteredProducts = products.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(productSearch.toLowerCase()) ||
                          p.subtitle?.toLowerCase().includes(productSearch.toLowerCase()) ||
                          p.category.toLowerCase().includes(productSearch.toLowerCase());
    const matchesCategory = productCategoryFilter === 'all' || p.category.toLowerCase() === productCategoryFilter.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  // Open Edit Product Modal
  const openEditProduct = (prod: Product) => {
    setIsCreatingNewProduct(false);
    // Deep clone product to avoid direct mutation
    setEditingProduct(JSON.parse(JSON.stringify(prod)));
  };

  // Open Create New Product Modal
  const openCreateProduct = () => {
    setIsCreatingNewProduct(true);
    const newProd: Product = {
      id: `prod-${Date.now()}`,
      title: 'Nuevo Dispositivo',
      subtitle: 'Descripción breve y atractiva',
      description: 'Detalle completo sobre los materiales, ingeniería acústica, conectividad y autonomía del producto.',
      features: ['Materiales de alta durabilidad', 'Conectividad inalámbrica sin pérdidas', 'Garantía oficial de 2 años'],
      price: 199900,
      promoPrice: 169900,
      category: 'audio',
      images: [
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1000&auto=format&fit=crop&q=80'
      ],
      rating: 5.0,
      reviewCount: 1,
      stock: 10,
      isBestSeller: false,
      isNew: true,
      freeShipping: true,
      installmentsMax: 6,
      tags: ['Nuevo', 'Premium'],
      variants: []
    };
    setEditingProduct(newProd);
  };

  // Save Product from modal
  const handleSaveProductModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    if (!editingProduct.title.trim()) {
      addToast({ type: 'error', title: 'El título es obligatorio' });
      return;
    }
    if (editingProduct.price <= 0) {
      addToast({ type: 'error', title: 'El precio debe ser mayor a 0' });
      return;
    }

    if (isCreatingNewProduct) {
      await addProduct(editingProduct);
    } else {
      await updateProduct(editingProduct);
    }

    setEditingProduct(null);
    setIsCreatingNewProduct(false);
  };

  return (
    <div className="min-h-screen bg-[#F7F4EE] text-[#1C1917] pb-24">
      {/* Top Admin Navigation Header */}
      <header className="sticky top-0 z-30 bg-[#FFFFFF]/90 backdrop-blur-md border-b border-[#E8E1D5] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setCurrentView('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FAF7F2] hover:bg-[#F4ECE0] text-[#57534E] hover:text-[#1C1917] border border-[#E8E1D5] text-xs font-bold transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Volver a la Tienda</span>
            </button>

            <div className="h-4 w-px bg-[#E8E1D5] hidden sm:block" />

            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-[#EADBC8] text-[#78350F]">
                <SlidersHorizontal className="w-4 h-4 text-[#C25E38]" />
              </div>
              <h1 className="font-display font-black text-base sm:text-lg text-[#1C1917]">
                Centro de Administración
              </h1>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-2.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] sm:text-xs font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Modo Demostración Libre</span>
            </div>

            <button
              onClick={() => {
                setCurrentView('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#1C1917] hover:bg-[#292524] text-[#FAF7F2] text-xs font-bold shadow-xs transition-transform active:scale-95 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-[#DEC9AE]" />
              <span>Ver Tienda en Vivo</span>
            </button>
          </div>

        </div>
      </header>

      {/* Hero Intro Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-4">
        <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#FFFFFF] via-[#FAF7F2] to-[#F4ECE0] border border-[#E8E1D5] shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-[#78350F]">
              <Sparkles className="w-3.5 h-3.5 text-[#C25E38]" />
              <span>Personalización 100% en Vivo</span>
            </div>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-[#1C1917]">
              Gestión Integral de {settings.storeName}
            </h2>
            <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
              Personalizá el nombre de la tienda, los textos de la página de inicio, elegí qué producto se destaca en la portada y editá las fotos, precios y stock de cada artículo del catálogo.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-4 bg-[#FFFFFF] p-3 sm:p-4 rounded-2xl border border-[#E8E1D5] shadow-xs shrink-0">
            <div className="text-center px-3 border-r border-[#E8E1D5]">
              <span className="block font-display font-black text-xl sm:text-2xl text-[#1C1917]">{products.length}</span>
              <span className="text-[10px] text-[#78716C] uppercase font-bold">Productos</span>
            </div>
            <div className="text-center px-3 border-r border-[#E8E1D5]">
              <span className="block font-display font-black text-xl sm:text-2xl text-[#C25E38]">{orders.length}</span>
              <span className="text-[10px] text-[#78716C] uppercase font-bold">Órdenes</span>
            </div>
            <div className="text-center px-3">
              <span className="block font-display font-black text-xl sm:text-2xl text-[#0F766E]">{products.reduce((acc, p) => acc + p.stock, 0)}</span>
              <span className="text-[10px] text-[#78716C] uppercase font-bold">Unidades</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto py-4 border-b border-[#E8E1D5] no-scrollbar">
          <button
            onClick={() => setActiveTab('brand')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0 ${
              activeTab === 'brand'
                ? 'bg-[#1C1917] text-[#FAF7F2] shadow-sm'
                : 'bg-[#FFFFFF] text-[#57534E] hover:bg-[#F4ECE0] border border-[#E8E1D5]'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>🎨 Textos & Identidad</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0 ${
              activeTab === 'products'
                ? 'bg-[#1C1917] text-[#FAF7F2] shadow-sm'
                : 'bg-[#FFFFFF] text-[#57534E] hover:bg-[#F4ECE0] border border-[#E8E1D5]'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>📦 Catálogo de Productos ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0 ${
              activeTab === 'orders'
                ? 'bg-[#1C1917] text-[#FAF7F2] shadow-sm'
                : 'bg-[#FFFFFF] text-[#57534E] hover:bg-[#F4ECE0] border border-[#E8E1D5]'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>📋 Órdenes ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0 ${
              activeTab === 'settings'
                ? 'bg-[#1C1917] text-[#FAF7F2] shadow-sm'
                : 'bg-[#FFFFFF] text-[#57534E] hover:bg-[#F4ECE0] border border-[#E8E1D5]'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>⚙️ Opciones & Reset</span>
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">

        {/* TAB 1: Brand & Hero Customization */}
        {activeTab === 'brand' && (
          <motion.form
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSaveBrand}
            className="space-y-6"
          >
            {/* Store Identity Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#FFFFFF] border border-[#E8E1D5] shadow-sm space-y-6">
              <div className="border-b border-[#E8E1D5] pb-4">
                <h3 className="font-display font-black text-lg sm:text-xl text-[#1C1917] flex items-center gap-2">
                  <span>Identidad de la Marca</span>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#EADBC8] text-[#78350F] font-bold">General</span>
                </h3>
                <p className="text-xs text-[#78716C] mt-1">
                  Define el nombre visible en la barra superior, pie de página y metadatos del sitio.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-[#1C1917] mb-1.5">
                    Nombre de la Tienda
                  </label>
                  <input
                    type="text"
                    value={brandForm.storeName}
                    onChange={(e) => setBrandForm({ ...brandForm, storeName: e.target.value })}
                    placeholder="Ej. AURA, TECHBOUTIQUE, etc."
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8E1D5] bg-[#FAF7F2] text-[#1C1917] text-sm focus:outline-none focus:ring-2 focus:ring-[#BA9971]"
                  />
                  <span className="text-[11px] text-[#78716C] mt-1 block">
                    Se actualizará en el logo, header, footer y recibos de compra.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1C1917] mb-1.5">
                    Eslogan o Subtítulo Institucional
                  </label>
                  <input
                    type="text"
                    value={brandForm.storeTagline}
                    onChange={(e) => setBrandForm({ ...brandForm, storeTagline: e.target.value })}
                    placeholder="Ej. Tienda de electrónica 100% personalizada"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8E1D5] bg-[#FAF7F2] text-[#1C1917] text-sm focus:outline-none focus:ring-2 focus:ring-[#BA9971]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1C1917] mb-1.5">
                    Email de Soporte / Notificaciones
                  </label>
                  <input
                    type="email"
                    value={brandForm.supportEmail}
                    onChange={(e) => setBrandForm({ ...brandForm, supportEmail: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8E1D5] bg-[#FAF7F2] text-[#1C1917] text-sm focus:outline-none focus:ring-2 focus:ring-[#BA9971]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1C1917] mb-1.5">
                    Teléfono de Contacto / WhatsApp
                  </label>
                  <input
                    type="text"
                    value={brandForm.supportPhone}
                    onChange={(e) => setBrandForm({ ...brandForm, supportPhone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8E1D5] bg-[#FAF7F2] text-[#1C1917] text-sm focus:outline-none focus:ring-2 focus:ring-[#BA9971]"
                  />
                </div>
              </div>

              {/* Announcement Bar text */}
              <div className="pt-2">
                <label className="block text-xs font-bold text-[#1C1917] mb-1.5">
                  Texto de la Marquesina Superior (Promociones & Envíos)
                </label>
                <input
                  type="text"
                  value={brandForm.announcementText}
                  onChange={(e) => setBrandForm({ ...brandForm, announcementText: e.target.value })}
                  placeholder="20% OFF con cupón MODERNA20 • Envíos gratis desde $250.000..."
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8E1D5] bg-[#FAF7F2] text-[#1C1917] text-sm focus:outline-none focus:ring-2 focus:ring-[#BA9971]"
                />
              </div>

              {/* Promotional Coupon Settings */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="block text-xs font-bold text-[#1C1917] mb-1.5">
                    Código del Cupón Promocional (Botón Copiar)
                  </label>
                  <input
                    type="text"
                    value={brandForm.announcementCoupon}
                    onChange={(e) => setBrandForm({ ...brandForm, announcementCoupon: e.target.value.toUpperCase() })}
                    placeholder="MODERNA20"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8E1D5] bg-[#FAF7F2] text-[#1C1917] text-sm font-mono font-bold focus:outline-none focus:ring-2 focus:ring-[#BA9971]"
                  />
                  <span className="text-[11px] text-[#78716C] mt-1 block">
                    Es el código que se muestra en el botón "CUPÓN: ..." y que se copia al portapapeles.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1C1917] mb-1.5">
                    Porcentaje de Descuento del Cupón (%)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={100}
                    value={brandForm.announcementDiscount}
                    onChange={(e) => setBrandForm({ ...brandForm, announcementDiscount: Number(e.target.value) || 20 })}
                    placeholder="20"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8E1D5] bg-[#FAF7F2] text-[#1C1917] text-sm font-mono font-bold focus:outline-none focus:ring-2 focus:ring-[#BA9971]"
                  />
                  <span className="text-[11px] text-[#78716C] mt-1 block">
                    Porcentaje que se descuenta automáticamente en el checkout al aplicar este cupón.
                  </span>
                </div>
              </div>
            </div>

            {/* Hero Section Copy Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#FFFFFF] border border-[#E8E1D5] shadow-sm space-y-6">
              <div className="border-b border-[#E8E1D5] pb-4">
                <h3 className="font-display font-black text-lg sm:text-xl text-[#1C1917] flex items-center gap-2">
                  <span>Portada Principal (Sección Hero)</span>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#EADBC8] text-[#78350F] font-bold">Textos de Inicio</span>
                </h3>
                <p className="text-xs text-[#78716C] mt-1">
                  Modificá el título de tecnología, el subtítulo explicativo y los textos de llamada a la acción.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-bold text-[#1C1917] mb-1.5">
                    Pre-título / Badge
                  </label>
                  <input
                    type="text"
                    value={brandForm.heroBadge}
                    onChange={(e) => setBrandForm({ ...brandForm, heroBadge: e.target.value })}
                    placeholder="Colección Minimalista 2026"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8E1D5] bg-[#FAF7F2] text-[#1C1917] text-sm focus:outline-none focus:ring-2 focus:ring-[#BA9971]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1C1917] mb-1.5">
                    Título Principal
                  </label>
                  <input
                    type="text"
                    value={brandForm.heroTitle}
                    onChange={(e) => setBrandForm({ ...brandForm, heroTitle: e.target.value })}
                    placeholder="Tecnología de élite,"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8E1D5] bg-[#FAF7F2] text-[#1C1917] text-sm focus:outline-none focus:ring-2 focus:ring-[#BA9971]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1C1917] mb-1.5">
                    Remate con Gradiente
                  </label>
                  <input
                    type="text"
                    value={brandForm.heroTitleHighlight}
                    onChange={(e) => setBrandForm({ ...brandForm, heroTitleHighlight: e.target.value })}
                    placeholder="en su expresión más pura."
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8E1D5] bg-[#FAF7F2] text-[#1C1917] text-sm focus:outline-none focus:ring-2 focus:ring-[#BA9971]"
                  />
                </div>
              </div>

              {/* Hero Subtitle */}
              <div>
                <label className="block text-xs font-bold text-[#1C1917] mb-1.5">
                  Subtexto Explicativo
                </label>
                <textarea
                  rows={3}
                  value={brandForm.heroSubtitle}
                  onChange={(e) => setBrandForm({ ...brandForm, heroSubtitle: e.target.value })}
                  placeholder="Tu tienda de electrónica de vanguardia 100% personalizada..."
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8E1D5] bg-[#FAF7F2] text-[#1C1917] text-sm focus:outline-none focus:ring-2 focus:ring-[#BA9971] leading-relaxed"
                />
              </div>

              {/* Action Buttons text */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-[#1C1917] mb-1.5">
                    Texto Botón Principal (Catálogo)
                  </label>
                  <input
                    type="text"
                    value={brandForm.heroCtaPrimary}
                    onChange={(e) => setBrandForm({ ...brandForm, heroCtaPrimary: e.target.value })}
                    placeholder="Explorar Catálogo"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8E1D5] bg-[#FAF7F2] text-[#1C1917] text-sm focus:outline-none focus:ring-2 focus:ring-[#BA9971]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#1C1917] mb-1.5">
                    Texto Botón Secundario (Producto Estrella)
                  </label>
                  <input
                    type="text"
                    value={brandForm.heroCtaSecondary}
                    onChange={(e) => setBrandForm({ ...brandForm, heroCtaSecondary: e.target.value })}
                    placeholder="Ver Producto Estrella"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8E1D5] bg-[#FAF7F2] text-[#1C1917] text-sm focus:outline-none focus:ring-2 focus:ring-[#BA9971]"
                  />
                </div>
              </div>
            </div>

            {/* Hero Star Product Selection Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#FFFFFF] border border-[#E8E1D5] shadow-sm space-y-6">
              <div className="border-b border-[#E8E1D5] pb-4">
                <h3 className="font-display font-black text-lg sm:text-xl text-[#1C1917] flex items-center gap-2">
                  <span>Producto Estrella en Portada</span>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#EADBC8] text-[#78350F] font-bold">Hero Spotlight</span>
                </h3>
                <p className="text-xs text-[#78716C] mt-1">
                  Elegí cuál de todos los productos del catálogo ocupará el lugar destacado junto a la animación principal.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Product Dropdown Picker */}
                <div>
                  <label className="block text-xs font-bold text-[#1C1917] mb-1.5">
                    Seleccionar Producto Estrella
                  </label>
                  <select
                    value={brandForm.heroStarProductId}
                    onChange={(e) => setBrandForm({ ...brandForm, heroStarProductId: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8E1D5] bg-[#FAF7F2] text-[#1C1917] text-sm focus:outline-none focus:ring-2 focus:ring-[#BA9971] cursor-pointer"
                  >
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.title} ({formatPrice(p.promoPrice || p.price)})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Star Badge */}
                <div>
                  <label className="block text-xs font-bold text-[#1C1917] mb-1.5">
                    Badge Superior del Producto
                  </label>
                  <input
                    type="text"
                    value={brandForm.heroStarBadge}
                    onChange={(e) => setBrandForm({ ...brandForm, heroStarBadge: e.target.value })}
                    placeholder="DROP EXCLUSIVO"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8E1D5] bg-[#FAF7F2] text-[#1C1917] text-sm focus:outline-none focus:ring-2 focus:ring-[#BA9971]"
                  />
                </div>

                {/* Star Tag */}
                <div>
                  <label className="block text-xs font-bold text-[#1C1917] mb-1.5">
                    Tag / Especificación Flotante
                  </label>
                  <input
                    type="text"
                    value={brandForm.heroStarTag}
                    onChange={(e) => setBrandForm({ ...brandForm, heroStarTag: e.target.value })}
                    placeholder="🎧 Berilio Puro 40mm • LDAC Lossless"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8E1D5] bg-[#FAF7F2] text-[#1C1917] text-sm focus:outline-none focus:ring-2 focus:ring-[#BA9971]"
                  />
                </div>
              </div>

              {/* Star Product Preview Card */}
              {(() => {
                const selected = products.find(p => p.id === brandForm.heroStarProductId) || products[0];
                if (!selected) return null;
                return (
                  <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8E1D5] flex items-center gap-4">
                    <img
                      src={selected.images[0]}
                      alt={selected.title}
                      className="w-16 h-16 rounded-xl object-cover bg-white border border-[#E8E1D5] shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-[#EADBC8] text-[#78350F]">
                          {brandForm.heroStarBadge}
                        </span>
                        <span className="text-xs font-bold text-[#0F766E]">
                          {formatPrice(selected.promoPrice || selected.price)}
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-[#1C1917] truncate mt-0.5">{selected.title}</h4>
                      <p className="text-[11px] text-[#78716C] truncate">{brandForm.heroStarTag}</p>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Submit Action Bar */}
            <div className="flex items-center justify-between p-4 sm:p-6 rounded-3xl bg-[#FFFFFF] border border-[#E8E1D5] shadow-sm">
              <div className="flex items-center gap-2 text-xs text-[#78716C]">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Los cambios se guardan localmente y se sincronizan con la base de datos.</span>
              </div>

              <button
                type="submit"
                disabled={savingBrand}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#1C1917] hover:bg-[#292524] text-[#FAF7F2] font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer disabled:opacity-50"
              >
                <Save className="w-4 h-4 text-[#DEC9AE]" />
                <span>{savingBrand ? 'Guardando...' : 'Guardar Todo'}</span>
              </button>
            </div>
          </motion.form>
        )}

        {/* TAB 2: Full Product Catalog Management */}
        {activeTab === 'products' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Products Toolbar */}
            <div className="p-4 sm:p-6 rounded-3xl bg-[#FFFFFF] border border-[#E8E1D5] shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="flex flex-1 items-center gap-3">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-[#A8A29E] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    placeholder="Buscar producto por nombre o categoría..."
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#E8E1D5] bg-[#FAF7F2] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#BA9971]"
                  />
                </div>

                <select
                  value={productCategoryFilter}
                  onChange={(e) => setProductCategoryFilter(e.target.value)}
                  className="px-3 py-2.5 rounded-xl border border-[#E8E1D5] bg-[#FAF7F2] text-xs font-bold text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-[#BA9971] cursor-pointer"
                >
                  <option value="all">Todas las Categorías</option>
                  <option value="audio">Audio</option>
                  <option value="wearables">Wearables</option>
                  <option value="workstation">Workstation</option>
                  <option value="lifestyle">Lifestyle</option>
                  <option value="gaming">Gaming</option>
                </select>
              </div>

              <button
                onClick={openCreateProduct}
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-[#1C1917] hover:bg-[#292524] text-[#FAF7F2] font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4 text-[#DEC9AE]" />
                <span>+ Agregar Producto</span>
              </button>
            </div>

            {/* Products List Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {adminFilteredProducts.map((p) => {
                const isHeroStar = p.id === settings.heroStarProductId;
                return (
                  <div
                    key={p.id}
                    className={`rounded-3xl bg-[#FFFFFF] border p-4 sm:p-5 flex flex-col justify-between space-y-4 shadow-xs hover:shadow-md transition-all ${
                      isHeroStar ? 'border-[#BA9971] ring-2 ring-[#BA9971]/20' : 'border-[#E8E1D5]'
                    }`}
                  >
                    <div>
                      {/* Top Badges & Stock status */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#FAF7F2] text-[#78350F] border border-[#E8E1D5]">
                            {p.category}
                          </span>
                          {isHeroStar && (
                            <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-[#C25E38] text-white">
                              ⭐ Estrella
                            </span>
                          )}
                          {p.freeShipping && (
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700">
                              Envío Gratis
                            </span>
                          )}
                        </div>

                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                          p.stock > 3 ? 'bg-emerald-50 text-emerald-700' : p.stock > 0 ? 'bg-amber-50 text-amber-700' : 'bg-rose-50 text-rose-700'
                        }`}>
                          {p.stock > 0 ? `${p.stock} en stock` : 'Sin stock'}
                        </span>
                      </div>

                      {/* Image & Title */}
                      <div className="flex items-start gap-3">
                        <img
                          src={p.images[0]}
                          alt={p.title}
                          className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover bg-[#FAF7F2] border border-[#E8E1D5] shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <h4 className="font-display font-bold text-sm sm:text-base text-[#1C1917] truncate">
                            {p.title}
                          </h4>
                          <p className="text-xs text-[#78716C] line-clamp-2 mt-0.5">
                            {p.subtitle || p.description}
                          </p>
                          <div className="flex items-baseline gap-2 mt-2">
                            <span className="font-display font-black text-sm sm:text-base text-[#1C1917]">
                              {formatPrice(p.promoPrice || p.price)}
                            </span>
                            {p.promoPrice && (
                              <span className="text-xs text-[#A8A29E] line-through">
                                {formatPrice(p.price)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions bar */}
                    <div className="pt-3 border-t border-[#E8E1D5] flex items-center justify-between gap-2">
                      <button
                        onClick={() => openEditProduct(p)}
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#FAF7F2] hover:bg-[#F4ECE0] text-[#1C1917] font-bold text-xs border border-[#E8E1D5] transition-colors cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-[#C25E38]" />
                        <span>Editar Todo</span>
                      </button>

                      <button
                        onClick={() => setDeleteConfirmId(p.id)}
                        className="p-2 rounded-xl text-[#A8A29E] hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer border border-transparent hover:border-rose-200"
                        title="Eliminar producto"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {adminFilteredProducts.length === 0 && (
              <div className="p-12 text-center bg-[#FFFFFF] rounded-3xl border border-[#E8E1D5] text-[#78716C] space-y-3">
                <Package className="w-12 h-12 text-[#DEC9AE] mx-auto" />
                <h4 className="font-bold text-base text-[#1C1917]">No se encontraron productos</h4>
                <p className="text-xs text-[#78716C]">
                  Probá ajustando los términos de búsqueda o agregá un nuevo producto.
                </p>
                <button
                  onClick={openCreateProduct}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1C1917] text-[#FAF7F2] text-xs font-bold"
                >
                  <Plus className="w-4 h-4" />
                  <span>Crear Nuevo Producto</span>
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* TAB 3: Orders List */}
        {activeTab === 'orders' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 sm:p-8 rounded-3xl bg-[#FFFFFF] border border-[#E8E1D5] shadow-sm space-y-6"
          >
            <div className="flex items-center justify-between border-b border-[#E8E1D5] pb-4">
              <div>
                <h3 className="font-display font-black text-lg sm:text-xl text-[#1C1917]">
                  Historial de Pedidos ({orders.length})
                </h3>
                <p className="text-xs text-[#78716C] mt-1">
                  Órdenes generadas por los clientes a través del checkout de 3 pasos.
                </p>
              </div>
            </div>

            {orders.length > 0 ? (
              <div className="space-y-3">
                {orders.map((ord) => (
                  <div
                    key={ord.id}
                    className="p-4 sm:p-5 rounded-2xl bg-[#FAF7F2] border border-[#E8E1D5] flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono font-bold text-xs text-[#C25E38] bg-[#FFFFFF] px-2.5 py-0.5 rounded-lg border border-[#E8E1D5]">
                          {ord.orderNumber}
                        </span>
                        <span className="text-xs text-[#78716C]">
                          {new Date(ord.createdAt).toLocaleDateString('es-AR', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          {ord.status.toUpperCase()}
                        </span>
                      </div>

                      <h4 className="font-bold text-sm text-[#1C1917] mt-1">
                        {ord.customer.fullName} • <span className="font-normal text-[#78716C]">{ord.customer.email}</span>
                      </h4>
                      <p className="text-xs text-[#78716C]">
                        {ord.customer.address}, {ord.customer.city} (CP: {ord.customer.postalCode})
                      </p>
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-6 pt-3 md:pt-0 border-t md:border-t-0 border-[#E8E1D5]">
                      <div className="text-left md:text-right">
                        <span className="text-[10px] text-[#78716C] block uppercase font-bold">Total Abonado</span>
                        <span className="font-display font-black text-base sm:text-lg text-[#1C1917]">
                          {formatPrice(ord.total)}
                        </span>
                      </div>

                      <div className="text-xs text-[#78716C] bg-white px-3 py-1.5 rounded-xl border border-[#E8E1D5]">
                        <span className="font-bold text-[#1C1917]">{ord.items.length}</span> ítems
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center text-[#78716C] space-y-2">
                <ShoppingBag className="w-10 h-10 text-[#DEC9AE] mx-auto" />
                <h4 className="font-bold text-sm text-[#1C1917]">Aún no hay pedidos registrados</h4>
                <p className="text-xs text-[#A8A29E]">
                  Cuando los clientes completen compras aparecerán listadas aquí con todos sus datos.
                </p>
              </div>
            )}
          </motion.div>
        )}

        {/* TAB 4: Advanced Options & Factory Reset */}
        {activeTab === 'settings' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Free Shipping & Logistics */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#FFFFFF] border border-[#E8E1D5] shadow-sm space-y-6">
              <div className="border-b border-[#E8E1D5] pb-4">
                <h3 className="font-display font-black text-lg sm:text-xl text-[#1C1917]">
                  Logística & Carrito
                </h3>
                <p className="text-xs text-[#78716C] mt-1">
                  Ajustes para el cálculo de envíos gratis en la bolsa de compras.
                </p>
              </div>

              <div className="max-w-md">
                <label className="block text-xs font-bold text-[#1C1917] mb-1.5">
                  Monto Mínimo para Envío Gratis ($ ARS)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={brandForm.freeShippingThreshold}
                    onChange={(e) => setBrandForm({ ...brandForm, freeShippingThreshold: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8E1D5] bg-[#FAF7F2] text-[#1C1917] text-sm focus:outline-none focus:ring-2 focus:ring-[#BA9971]"
                  />
                  <button
                    type="button"
                    onClick={() => updateSettings({ freeShippingThreshold: brandForm.freeShippingThreshold })}
                    className="px-4 py-2.5 rounded-xl bg-[#1C1917] text-[#FAF7F2] font-bold text-xs shrink-0 cursor-pointer"
                  >
                    Guardar
                  </button>
                </div>
                <span className="text-[11px] text-[#78716C] mt-1 block">
                  Actualmente: {formatPrice(settings.freeShippingThreshold)}
                </span>
              </div>
            </div>

            {/* Factory Reset Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-rose-50/50 border border-rose-200 shadow-sm space-y-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-rose-600 mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-display font-bold text-base text-rose-900">
                    Restablecer Valores por Defecto
                  </h3>
                  <p className="text-xs text-rose-700 mt-1 max-w-xl">
                    Si modificaste textos o productos durante una demo y querés volver a la configuración original de fábrica de la tienda, podés restablecer los valores con este botón.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (window.confirm('¿Seguro que deseas restablecer todos los textos y configuraciones originales de la tienda?')) {
                    resetSettings();
                    setBrandForm({
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
                    });
                  }
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-sm transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Restaurar Textos Originales</span>
              </button>
            </div>
          </motion.div>
        )}

      </div>

      {/* FULL PRODUCT EDIT / CREATE MODAL */}
      <AnimatePresence>
        {editingProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEditingProduct(null)}
              className="fixed inset-0 bg-[#1C1917]/50"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.2 }}
              className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#FFFFFF] border border-[#E8E1D5] shadow-2xl p-5 sm:p-7 text-[#1C1917]"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#E8E1D5]">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-[#EADBC8] text-[#78350F]">
                    <Package className="w-5 h-5 text-[#C25E38]" />
                  </div>
                  <div>
                    <h3 className="font-display font-black text-lg sm:text-xl text-[#1C1917]">
                      {isCreatingNewProduct ? 'Nuevo Producto' : `Editar: ${editingProduct.title}`}
                    </h3>
                    <p className="text-[11px] text-[#78716C]">
                      Todos los cambios se aplicarán inmediatamente en la tienda y catálogo.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="p-2 rounded-full bg-[#FAF7F2] hover:bg-[#F4ECE0] text-[#78716C] hover:text-[#1C1917] transition-colors cursor-pointer border border-[#E8E1D5]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSaveProductModal} className="py-4 space-y-5">
                {/* Title & Subtitle */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1C1917] mb-1">
                      Nombre / Título del Producto *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingProduct.title}
                      onChange={(e) => setEditingProduct({ ...editingProduct, title: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-[#E8E1D5] bg-[#FAF7F2] text-sm focus:outline-none focus:ring-2 focus:ring-[#BA9971]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1C1917] mb-1">
                      Subtítulo o Resumen Corto
                    </label>
                    <input
                      type="text"
                      value={editingProduct.subtitle || ''}
                      onChange={(e) => setEditingProduct({ ...editingProduct, subtitle: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-[#E8E1D5] bg-[#FAF7F2] text-sm focus:outline-none focus:ring-2 focus:ring-[#BA9971]"
                    />
                  </div>
                </div>

                {/* Category & Stock */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1C1917] mb-1">
                      Categoría
                    </label>
                    <select
                      value={editingProduct.category}
                      onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-[#E8E1D5] bg-[#FAF7F2] text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#BA9971] cursor-pointer"
                    >
                      <option value="audio">Audio</option>
                      <option value="wearables">Wearables</option>
                      <option value="workstation">Workstation</option>
                      <option value="lifestyle">Lifestyle</option>
                      <option value="gaming">Gaming</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1C1917] mb-1">
                      Stock Disponible (unidades)
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={editingProduct.stock}
                      onChange={(e) => setEditingProduct({ ...editingProduct, stock: parseInt(e.target.value) || 0 })}
                      className="w-full px-3.5 py-2 rounded-xl border border-[#E8E1D5] bg-[#FAF7F2] text-sm focus:outline-none focus:ring-2 focus:ring-[#BA9971]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1C1917] mb-1">
                      Máx. Cuotas sin Interés
                    </label>
                    <select
                      value={editingProduct.installmentsMax || 6}
                      onChange={(e) => setEditingProduct({ ...editingProduct, installmentsMax: parseInt(e.target.value) || 6 })}
                      className="w-full px-3.5 py-2 rounded-xl border border-[#E8E1D5] bg-[#FAF7F2] text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#BA9971] cursor-pointer"
                    >
                      <option value={1}>1 cuota</option>
                      <option value={3}>3 cuotas</option>
                      <option value={6}>6 cuotas</option>
                      <option value={12}>12 cuotas</option>
                    </select>
                  </div>
                </div>

                {/* Prices */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1C1917] mb-1">
                      Precio Regular ($ ARS) *
                    </label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={editingProduct.price}
                      onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) || 0 })}
                      className="w-full px-3.5 py-2 rounded-xl border border-[#E8E1D5] bg-[#FAF7F2] text-sm font-mono font-bold focus:outline-none focus:ring-2 focus:ring-[#BA9971]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1C1917] mb-1">
                      Precio Promocional OFF ($ ARS - Opcional)
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={editingProduct.promoPrice || ''}
                      onChange={(e) => setEditingProduct({ ...editingProduct, promoPrice: e.target.value ? parseFloat(e.target.value) : undefined })}
                      placeholder="Dejar vacío si no tiene descuento"
                      className="w-full px-3.5 py-2 rounded-xl border border-[#E8E1D5] bg-[#FAF7F2] text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#BA9971]"
                    />
                  </div>
                </div>

                {/* Toggles (Best Seller, Free Shipping, New) */}
                <div className="flex flex-wrap items-center gap-4 pt-1">
                  <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-bold text-[#1C1917]">
                    <input
                      type="checkbox"
                      checked={Boolean(editingProduct.freeShipping)}
                      onChange={(e) => setEditingProduct({ ...editingProduct, freeShipping: e.target.checked })}
                      className="rounded border-[#DEC9AE] text-[#1C1917] focus:ring-[#BA9971] w-4 h-4"
                    />
                    <span>¿Envío Gratis?</span>
                  </label>

                  <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-bold text-[#1C1917]">
                    <input
                      type="checkbox"
                      checked={Boolean(editingProduct.isBestSeller)}
                      onChange={(e) => setEditingProduct({ ...editingProduct, isBestSeller: e.target.checked })}
                      className="rounded border-[#DEC9AE] text-[#1C1917] focus:ring-[#BA9971] w-4 h-4"
                    />
                    <span>¿Producto Destacado / TOP?</span>
                  </label>

                  <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-bold text-[#1C1917]">
                    <input
                      type="checkbox"
                      checked={Boolean(editingProduct.isNew)}
                      onChange={(e) => setEditingProduct({ ...editingProduct, isNew: e.target.checked })}
                      className="rounded border-[#DEC9AE] text-[#1C1917] focus:ring-[#BA9971] w-4 h-4"
                    />
                    <span>¿Lanzamiento Nuevo?</span>
                  </label>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-bold text-[#1C1917] mb-1">
                    Descripción Completa
                  </label>
                  <textarea
                    rows={3}
                    value={editingProduct.description}
                    onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#E8E1D5] bg-[#FAF7F2] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#BA9971] leading-relaxed"
                  />
                </div>

                {/* Main Image URL */}
                <div>
                  <label className="block text-xs font-bold text-[#1C1917] mb-1">
                    URL de la Imagen Principal
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="url"
                      required
                      value={editingProduct.images[0] || ''}
                      onChange={(e) => {
                        const newImages = [...editingProduct.images];
                        newImages[0] = e.target.value;
                        setEditingProduct({ ...editingProduct, images: newImages });
                      }}
                      className="flex-1 px-3.5 py-2 rounded-xl border border-[#E8E1D5] bg-[#FAF7F2] text-xs focus:outline-none focus:ring-2 focus:ring-[#BA9971]"
                    />
                    {editingProduct.images[0] && (
                      <img
                        src={editingProduct.images[0]}
                        alt="Preview"
                        className="w-10 h-10 rounded-lg object-cover border border-[#E8E1D5] shrink-0"
                      />
                    )}
                  </div>
                </div>

                {/* Features (Tags list) */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-[#1C1917]">
                      Especificaciones Clave (Viñetas destacadas)
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingProduct({
                          ...editingProduct,
                          features: [...editingProduct.features, 'Nueva característica']
                        });
                      }}
                      className="text-[11px] font-bold text-[#C25E38] hover:underline cursor-pointer"
                    >
                      + Añadir viñeta
                    </button>
                  </div>
                  <div className="space-y-2">
                    {editingProduct.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={feat}
                          onChange={(e) => {
                            const newFeats = [...editingProduct.features];
                            newFeats[idx] = e.target.value;
                            setEditingProduct({ ...editingProduct, features: newFeats });
                          }}
                          className="flex-1 px-3 py-1.5 rounded-xl border border-[#E8E1D5] bg-[#FAF7F2] text-xs focus:outline-none focus:ring-2 focus:ring-[#BA9971]"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setEditingProduct({
                              ...editingProduct,
                              features: editingProduct.features.filter((_, i) => i !== idx)
                            });
                          }}
                          className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="pt-4 border-t border-[#E8E1D5] flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingProduct(null)}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold text-[#57534E] hover:bg-[#FAF7F2] transition-colors cursor-pointer"
                  >
                    Cancelar
                  </button>

                  <button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#1C1917] hover:bg-[#292524] text-[#FAF7F2] text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95 cursor-pointer"
                  >
                    <Save className="w-4 h-4 text-[#DEC9AE]" />
                    <span>{isCreatingNewProduct ? 'Crear Producto' : 'Guardar Cambios'}</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DELETE PRODUCT CONFIRMATION MODAL */}
      <AnimatePresence>
        {deleteConfirmId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteConfirmId(null)}
              className="fixed inset-0 bg-[#1C1917]/50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative z-10 w-full max-w-sm rounded-3xl bg-[#FFFFFF] border border-[#E8E1D5] p-6 text-center space-y-4 shadow-2xl"
            >
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center mx-auto">
                <Trash2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-[#1C1917]">
                  ¿Eliminar este producto?
                </h3>
                <p className="text-xs text-[#78716C] mt-1">
                  Se borrará de forma permanente del catálogo y de la base de datos.
                </p>
              </div>
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setDeleteConfirmId(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-[#57534E] hover:bg-[#FAF7F2] cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  onClick={async () => {
                    await deleteProduct(deleteConfirmId);
                    setDeleteConfirmId(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-sm cursor-pointer"
                >
                  Sí, eliminar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

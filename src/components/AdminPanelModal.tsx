import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  SlidersHorizontal,
  TrendingUp,
  ShoppingBag,
  Plus,
  AlertTriangle,
  DollarSign,
  Sparkles,
  Trash2
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types/store';

export const AdminPanelModal: React.FC = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    products,
    addProduct,
    updateProductStock,
    deleteProduct,
    orders,
    formatPrice
  } = useStore();

  const [activeTab, setActiveTab] = useState<'metrics' | 'inventory' | 'orders' | 'new-product'>('metrics');

  const [newTitle, setNewTitle] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newCategory, setNewCategory] = useState('lifestyle');
  const [newStock, setNewStock] = useState('10');
  const [newImage, setNewImage] = useState('');

  if (!isAdminOpen) return null;

  const totalRevenue = orders.reduce((sum, ord) => sum + ord.total, 0);
  const totalOrders = orders.length;
  const avgTicket = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  const lowStockProducts = products.filter(p => p.stock <= 5);

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newPrice.trim()) return;

    const prod: Product = {
      id: `prod-${Date.now()}`,
      title: newTitle,
      subtitle: 'Edición especial agregada desde Tienda Cloud Admin',
      description: 'Producto integrado en tiempo real mediante el panel de administración.',
      features: ['Garantía oficial', 'Materiales sostenibles', 'Envío prioritario'],
      price: parseFloat(newPrice),
      category: newCategory,
      images: [
        newImage.trim() || 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=1000&auto=format&fit=crop&q=80'
      ],
      rating: 5.0,
      reviewCount: 1,
      stock: parseInt(newStock) || 10,
      isNew: true,
      freeShipping: parseFloat(newPrice) >= 250000,
      installmentsMax: 6,
      tags: ['AdminDrop', 'Nuevo']
    };

    addProduct(prod);
    setNewTitle('');
    setNewPrice('');
    setNewImage('');
    setActiveTab('inventory');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsAdminOpen(false)}
          className="fixed inset-0 bg-[#1C1917]/50"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 10 }}
          transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.22 }}
          className="relative z-10 w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#FFFFFF] border border-[#E8E1D5] shadow-2xl p-4 sm:p-6 md:p-8 text-[#1C1917] gpu-layer"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 sm:pb-6 border-b border-[#E8E1D5]">
            <div className="flex items-center gap-3">
              <div className="p-2.5 sm:p-3 rounded-2xl bg-[#EADBC8] text-[#78350F] border border-[#DEC9AE]">
                <SlidersHorizontal className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-display font-black text-lg sm:text-2xl text-[#1C1917]">
                    Consola Admin Cloud
                  </h2>
                  <span className="px-2 py-0.5 rounded-full bg-[#EADBC8] text-[#78350F] text-[10px] sm:text-xs font-bold">
                    TIENDANUBE SYNC
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-[#78716C]">
                  Control de stock, órdenes y métricas en tiempo real.
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsAdminOpen(false)}
              className="p-2 rounded-xl bg-[#FAF7F2] hover:bg-[#F4ECE0] text-[#78716C] hover:text-[#1C1917] transition-colors cursor-pointer border border-[#E8E1D5]"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-1.5 sm:gap-2 pt-3 pb-4 sm:pb-6 border-b border-[#E8E1D5] overflow-x-auto text-xs font-bold scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
            <button
              onClick={() => setActiveTab('metrics')}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'metrics'
                  ? 'bg-[#1C1917] text-white shadow-xs'
                  : 'bg-[#FAF7F2] text-[#57534E] hover:text-[#1C1917] border border-[#E8E1D5]'
              }`}
            >
              Métricas & KPI
            </button>
            <button
              onClick={() => setActiveTab('inventory')}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'inventory'
                  ? 'bg-[#1C1917] text-white shadow-xs'
                  : 'bg-[#FAF7F2] text-[#57534E] hover:text-[#1C1917] border border-[#E8E1D5]'
              }`}
            >
              Inventario ({products.length})
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'orders'
                  ? 'bg-[#1C1917] text-white shadow-xs'
                  : 'bg-[#FAF7F2] text-[#57534E] hover:text-[#1C1917] border border-[#E8E1D5]'
              }`}
            >
              Pedidos ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab('new-product')}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'new-product'
                  ? 'bg-[#1C1917] text-white shadow-xs'
                  : 'bg-[#FAF7F2] text-[#57534E] hover:text-[#1C1917] border border-[#E8E1D5]'
              }`}
            >
              + Nuevo Producto
            </button>
          </div>

          {/* Tab 1: KPIs */}
          {activeTab === 'metrics' && (
            <div className="py-4 sm:py-6 space-y-4">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
                <div className="p-3.5 sm:p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8E1D5]">
                  <div className="flex items-center justify-between text-[11px] sm:text-xs text-[#78716C]">
                    <span>Facturación</span>
                    <TrendingUp className="w-3.5 h-3.5 text-[#0F766E]" />
                  </div>
                  <p className="font-display font-black text-lg sm:text-2xl text-[#1C1917] mt-1.5">
                    {formatPrice(totalRevenue)}
                  </p>
                  <p className="text-[10px] sm:text-[11px] text-[#0F766E] font-bold mt-1">
                    +18.4% vs mes anterior
                  </p>
                </div>

                <div className="p-3.5 sm:p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8E1D5]">
                  <div className="flex items-center justify-between text-[11px] sm:text-xs text-[#78716C]">
                    <span>Pedidos</span>
                    <ShoppingBag className="w-3.5 h-3.5 text-[#C25E38]" />
                  </div>
                  <p className="font-display font-black text-lg sm:text-2xl text-[#1C1917] mt-1.5">
                    {totalOrders}
                  </p>
                  <p className="text-[10px] sm:text-[11px] text-[#78716C] mt-1">
                    Tasa entrega 98.7%
                  </p>
                </div>

                <div className="p-3.5 sm:p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8E1D5]">
                  <div className="flex items-center justify-between text-[11px] sm:text-xs text-[#78716C]">
                    <span>Ticket Medio</span>
                    <DollarSign className="w-3.5 h-3.5 text-[#78350F]" />
                  </div>
                  <p className="font-display font-black text-lg sm:text-2xl text-[#1C1917] mt-1.5 truncate">
                    {formatPrice(avgTicket)}
                  </p>
                  <p className="text-[10px] sm:text-[11px] text-[#78716C] mt-1">
                    Cuotas activas
                  </p>
                </div>

                <div className="p-3.5 sm:p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8E1D5]">
                  <div className="flex items-center justify-between text-[11px] sm:text-xs text-[#78716C]">
                    <span>Stock Bajo</span>
                    <AlertTriangle className="w-3.5 h-3.5 text-[#D97706]" />
                  </div>
                  <p className="font-display font-black text-lg sm:text-2xl text-[#D97706] mt-1.5">
                    {lowStockProducts.length} items
                  </p>
                  <p className="text-[10px] sm:text-[11px] text-[#78350F] font-bold mt-1">
                    Alerta de reposición
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8E1D5] space-y-1.5">
                <div className="flex items-center gap-2 text-[#78350F] font-bold text-xs sm:text-sm">
                  <Sparkles className="w-4 h-4 text-[#C25E38]" />
                  <span>Sincronización Webhook Instantánea</span>
                </div>
                <p className="text-xs text-[#57534E] leading-relaxed">
                  Cualquier compra realizada en la tienda o ajuste manual de inventario actualiza esta base de datos local y el storefront de inmediato.
                </p>
              </div>
            </div>
          )}

          {/* Tab 2: Inventory */}
          {activeTab === 'inventory' && (
            <div className="py-4 space-y-3">
              <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                <table className="w-full text-left text-xs min-w-[500px]">
                  <thead className="bg-[#FAF7F2] text-[#78716C] uppercase tracking-wider font-bold border-b border-[#E8E1D5]">
                    <tr>
                      <th className="p-2.5 sm:p-3">Producto</th>
                      <th className="p-2.5 sm:p-3">Categoría</th>
                      <th className="p-2.5 sm:p-3">Precio</th>
                      <th className="p-2.5 sm:p-3">Stock</th>
                      <th className="p-2.5 sm:p-3">Ajustar</th>
                      <th className="p-2.5 sm:p-3 text-right">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8E1D5] text-[#57534E]">
                    {products.map((p) => (
                      <tr key={p.id} className="hover:bg-[#FAF7F2]/60">
                        <td className="p-2.5 sm:p-3 flex items-center gap-2.5">
                          <img src={p.images[0]} alt="" className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg object-cover" />
                          <span className="font-bold text-[#1C1917] truncate max-w-[180px]">{p.title}</span>
                        </td>
                        <td className="p-2.5 sm:p-3 capitalize">{p.category}</td>
                        <td className="p-2.5 sm:p-3 font-semibold text-[#1C1917]">
                          {formatPrice(p.promoPrice || p.price)}
                        </td>
                        <td className="p-2.5 sm:p-3">
                          <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                            p.stock <= 5 ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {p.stock} u.
                          </span>
                        </td>
                        <td className="p-2.5 sm:p-3">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => updateProductStock(p.id, Math.max(0, p.stock - 1))}
                              className="px-2 py-0.5 rounded bg-[#FAF7F2] hover:bg-[#E8E1D5] text-[#1C1917] border border-[#E8E1D5]"
                            >
                              -1
                            </button>
                            <button
                              onClick={() => updateProductStock(p.id, p.stock + 5)}
                              className="px-2 py-0.5 rounded bg-[#EADBC8] hover:bg-[#DEC9AE] text-[#78350F] font-bold border border-[#DEC9AE]"
                            >
                              +5
                            </button>
                          </div>
                        </td>
                        <td className="p-2.5 sm:p-3 text-right">
                          <button
                            onClick={() => {
                              if (window.confirm(`¿Estás seguro de eliminar permanentemente "${p.title}"?`)) {
                                deleteProduct(p.id);
                              }
                            }}
                            className="p-1.5 rounded-lg text-[#A8A29E] hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-colors cursor-pointer"
                            title="Eliminar producto"
                          >
                            <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 3: Orders */}
          {activeTab === 'orders' && (
            <div className="py-4 space-y-3">
              {orders.length > 0 ? (
                orders.map((ord) => (
                  <div key={ord.id} className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E8E1D5] space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-[#1C1917] text-sm">{ord.orderNumber}</span>
                        <span className="text-[#78716C]">• {new Date(ord.createdAt).toLocaleTimeString()}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase">
                        {ord.status}
                      </span>
                    </div>
                    <div className="text-[#57534E]">
                      <strong>Cliente:</strong> {ord.customer.fullName} ({ord.customer.email})
                    </div>
                    <div className="flex items-center justify-between pt-1.5 border-t border-[#E8E1D5]/60">
                      <span className="text-[#78716C]">{ord.items.length} productos</span>
                      <span className="font-extrabold text-sm text-[#1C1917]">{formatPrice(ord.total)}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 text-[#78716C] text-xs">
                  Aún no se registraron órdenes. Realiza un checkout de prueba en la tienda.
                </div>
              )}
            </div>
          )}

          {/* Tab 4: Form */}
          {activeTab === 'new-product' && (
            <form onSubmit={handleCreateProduct} className="py-4 space-y-3 max-w-xl">
              <h3 className="font-display font-bold text-sm sm:text-base text-[#1C1917]">
                Publicar Producto
              </h3>
              <div className="space-y-2.5 text-xs">
                <div>
                  <label className="text-[#57534E] font-bold mb-1 block">Título</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Teclado Mecánico Custom Apex"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-[#E8E1D5] rounded-xl px-3 py-2 text-[#1C1917] focus:outline-none focus:border-[#BA9971]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[#57534E] font-bold mb-1 block">Precio (ARS)</label>
                    <input
                      type="number"
                      required
                      placeholder="249000"
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                      className="w-full bg-[#FAF7F2] border border-[#E8E1D5] rounded-xl px-3 py-2 text-[#1C1917] focus:outline-none focus:border-[#BA9971]"
                    />
                  </div>
                  <div>
                    <label className="text-[#57534E] font-bold mb-1 block">Stock Inicial</label>
                    <input
                      type="number"
                      required
                      value={newStock}
                      onChange={(e) => setNewStock(e.target.value)}
                      className="w-full bg-[#FAF7F2] border border-[#E8E1D5] rounded-xl px-3 py-2 text-[#1C1917] focus:outline-none focus:border-[#BA9971]"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[#57534E] font-bold mb-1 block">Categoría</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-[#E8E1D5] rounded-xl px-3 py-2 text-[#1C1917] focus:outline-none focus:border-[#BA9971]"
                  >
                    <option value="audio">Audio Hi-Fi</option>
                    <option value="wearables">Smart Wearables</option>
                    <option value="gaming">Gaming & Keebs</option>
                    <option value="workstation">Workstation</option>
                    <option value="lifestyle">Lifestyle & Setup</option>
                  </select>
                </div>
                <div>
                  <label className="text-[#57534E] font-bold mb-1 block">URL de Imagen</label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={newImage}
                    onChange={(e) => setNewImage(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-[#E8E1D5] rounded-xl px-3 py-2 text-[#1C1917] focus:outline-none focus:border-[#BA9971]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1C1917] hover:bg-[#292524] text-[#FAF7F2] font-bold text-xs shadow-md transition-all cursor-pointer mt-3"
              >
                <Plus className="w-4 h-4 text-[#DEC9AE]" />
                <span>Publicar en Catálogo</span>
              </button>
            </form>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

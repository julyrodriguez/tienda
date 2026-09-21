import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  SlidersHorizontal,
  TrendingUp,
  ShoppingBag,
  Package,
  Plus,
  Edit3,
  CheckCircle,
  AlertTriangle,
  DollarSign,
  Layers,
  Sparkles
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
    orders,
    formatPrice
  } = useStore();

  const [activeTab, setActiveTab] = useState<'metrics' | 'inventory' | 'orders' | 'new-product'>('metrics');

  // Form for new product
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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsAdminOpen(false)}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative z-10 w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#0d0f1a] border border-brand-500/30 shadow-2xl p-6 sm:p-8"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-brand-500/20 text-brand-300 border border-brand-500/30">
                <SlidersHorizontal className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-display font-black text-2xl text-white">
                    Tienda Cloud Admin Console
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
                    ONLINE • TIENDANUBE API SYNC
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Panel en vivo para controlar inventario, métricas de conversión y órdenes entrantes.
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsAdminOpen(false)}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-2 pt-4 pb-6 border-b border-white/10 overflow-x-auto">
            <button
              onClick={() => setActiveTab('metrics')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'metrics'
                  ? 'bg-brand-500 text-slate-950 shadow-md'
                  : 'bg-white/5 text-slate-300 hover:text-white'
              }`}
            >
              Métricas & KPI en Vivo
            </button>
            <button
              onClick={() => setActiveTab('inventory')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'inventory'
                  ? 'bg-brand-500 text-slate-950 shadow-md'
                  : 'bg-white/5 text-slate-300 hover:text-white'
              }`}
            >
              Control de Inventario ({products.length})
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'orders'
                  ? 'bg-brand-500 text-slate-950 shadow-md'
                  : 'bg-white/5 text-slate-300 hover:text-white'
              }`}
            >
              Pedidos Recientes ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab('new-product')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'new-product'
                  ? 'bg-brand-500 text-slate-950 shadow-md'
                  : 'bg-white/5 text-slate-300 hover:text-white'
              }`}
            >
              + Agregar Producto
            </button>
          </div>

          {/* Tab 1: Live KPIs */}
          {activeTab === 'metrics' && (
            <div className="py-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Facturación Total</span>
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                  </div>
                  <p className="font-display font-black text-2xl text-white mt-2">
                    {formatPrice(totalRevenue)}
                  </p>
                  <p className="text-[11px] text-emerald-400 font-semibold mt-1">
                    +18.4% vs mes anterior
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Pedidos Completados</span>
                    <ShoppingBag className="w-4 h-4 text-brand-400" />
                  </div>
                  <p className="font-display font-black text-2xl text-white mt-2">
                    {totalOrders}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Tasa de entrega 98.7%
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Ticket Promedio (AOV)</span>
                    <DollarSign className="w-4 h-4 text-cyan-400" />
                  </div>
                  <p className="font-display font-black text-2xl text-white mt-2">
                    {formatPrice(avgTicket)}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Optimizador de cuotas activo
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Alertas de Stock Bajo</span>
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                  </div>
                  <p className="font-display font-black text-2xl text-amber-400 mt-2">
                    {lowStockProducts.length} items
                  </p>
                  <p className="text-[11px] text-amber-300 font-semibold mt-1">
                    Reponer antes de 48h
                  </p>
                </div>
              </div>

              {/* Architecture Integration Notice */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-violet-950/40 to-slate-900 border border-violet-500/30 space-y-2">
                <div className="flex items-center gap-2 text-violet-300 font-bold text-sm">
                  <Sparkles className="w-4 h-4" />
                  <span>Sincronización Webhook en Tiempo Real</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Este prototipo implementa el flujo idéntico a los Webhooks de Tiendanube y Shopify (<code>orders/create</code>, <code>products/stock_update</code>, <code>checkouts/complete</code>). Cualquier cambio de stock o compra realizada en el storefront actualiza esta base de datos en milisegundos.
                </p>
              </div>
            </div>
          )}

          {/* Tab 2: Inventory Management */}
          {activeTab === 'inventory' && (
            <div className="py-6 space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-white/5 text-slate-400 uppercase tracking-wider font-semibold border-b border-white/10">
                    <tr>
                      <th className="p-3">Producto</th>
                      <th className="p-3">Categoría</th>
                      <th className="p-3">Precio</th>
                      <th className="p-3">Stock Actual</th>
                      <th className="p-3">Acción Rápida</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-slate-200">
                    {products.map((p) => (
                      <tr key={p.id} className="hover:bg-white/[0.02]">
                        <td className="p-3 flex items-center gap-3">
                          <img src={p.images[0]} alt="" className="w-8 h-8 rounded-lg object-cover" />
                          <span className="font-bold text-white">{p.title}</span>
                        </td>
                        <td className="p-3 capitalize text-slate-400">{p.category}</td>
                        <td className="p-3 font-semibold text-brand-300">
                          {formatPrice(p.promoPrice || p.price)}
                        </td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded-full font-bold text-[11px] ${
                            p.stock <= 5 ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-400'
                          }`}>
                            {p.stock} unidades
                          </span>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => updateProductStock(p.id, Math.max(0, p.stock - 1))}
                              className="px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-white"
                            >
                              -1
                            </button>
                            <button
                              onClick={() => updateProductStock(p.id, p.stock + 5)}
                              className="px-2 py-1 rounded bg-brand-500/20 hover:bg-brand-500 text-brand-300 hover:text-black font-bold"
                            >
                              +5
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 3: Recent Orders */}
          {activeTab === 'orders' && (
            <div className="py-6 space-y-4">
              {orders.length > 0 ? (
                <div className="space-y-3">
                  {orders.map((ord) => (
                    <div key={ord.id} className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-brand-300 text-sm">{ord.orderNumber}</span>
                          <span className="text-slate-400">• {new Date(ord.createdAt).toLocaleTimeString()}</span>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase">
                          {ord.status}
                        </span>
                      </div>
                      <div className="text-slate-300">
                        <strong>Cliente:</strong> {ord.customer.fullName} ({ord.customer.email})
                      </div>
                      <div className="text-slate-400">
                        <strong>Dirección:</strong> {ord.customer.address}, {ord.customer.city}
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-white/5">
                        <span className="text-slate-400">Items: {ord.items.length} productos</span>
                        <span className="font-extrabold text-sm text-white">{formatPrice(ord.total)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-slate-500 text-xs">
                  Aún no se registraron órdenes. Realiza un checkout de prueba en la tienda para ver cómo entra en tiempo real.
                </div>
              )}
            </div>
          )}

          {/* Tab 4: New Product Form */}
          {activeTab === 'new-product' && (
            <form onSubmit={handleCreateProduct} className="py-6 space-y-4 max-w-xl">
              <h3 className="font-display font-bold text-base text-white">
                Publicar Nuevo Producto en Catálogo
              </h3>
              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-slate-400 font-semibold mb-1 block">Título del Producto</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Teclado Mecánico Custom Apex"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-brand-400"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-400 font-semibold mb-1 block">Precio (ARS)</label>
                    <input
                      type="number"
                      required
                      placeholder="249000"
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                      className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-brand-400"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 font-semibold mb-1 block">Stock Inicial</label>
                    <input
                      type="number"
                      required
                      value={newStock}
                      onChange={(e) => setNewStock(e.target.value)}
                      className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-brand-400"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-slate-400 font-semibold mb-1 block">Categoría</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-brand-400"
                  >
                    <option value="audio">Audio Hi-Fi</option>
                    <option value="wearables">Smart Wearables</option>
                    <option value="gaming">Gaming & Keebs</option>
                    <option value="workstation">Workstation</option>
                    <option value="lifestyle">Lifestyle & Setup</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 font-semibold mb-1 block">URL de Imagen (Unsplash u otra)</label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={newImage}
                    onChange={(e) => setNewImage(e.target.value)}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-brand-400"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-400 text-slate-950 font-bold text-xs shadow-lg transition-all cursor-pointer mt-4"
              >
                <Plus className="w-4 h-4" />
                <span>Publicar en Tienda Instantáneamente</span>
              </button>
            </form>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

// API configuration
export const API_BASE_URL = (import.meta.env.VITE_API_URL || 'https://apivacas.jariel.com.ar').replace(/\/$/, '');

export const TIENDA_API = {
  products: `${API_BASE_URL}/api/tienda/products`,
  deleteProduct: (id: string) => `${API_BASE_URL}/api/tienda/products/${id}`,
  productStock: (id: string) => `${API_BASE_URL}/api/tienda/products/${id}/stock`,
  orders: `${API_BASE_URL}/api/tienda/orders`,
  stats: `${API_BASE_URL}/api/tienda/stats`,
  newsletter: `${API_BASE_URL}/api/tienda/newsletter`,
};

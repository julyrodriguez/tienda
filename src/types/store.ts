export interface ProductVariant {
  id: string;
  name: string; // e.g. "Space Black - 256GB"
  sku: string;
  price: number;
  promoPrice?: number;
  stock: number;
  colorHex?: string;
  image?: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  price: number;
  promoPrice?: number;
  category: string;
  images: string[];
  rating: number;
  reviewCount: number;
  reviews?: Review[];
  variants?: ProductVariant[];
  stock: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  freeShipping?: boolean;
  installmentsMax: number; // e.g. 6 cuotas sin interés
  tags: string[];
}

export interface CartItem {
  id: string; // unique item id: product.id + (variant?.id || '')
  productId: string;
  product: Product;
  variant?: ProductVariant;
  quantity: number;
  unitPrice: number;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minSpend?: number;
  description: string;
}

export interface ShippingOption {
  id: string;
  name: string;
  carrier: string;
  estimatedDays: string;
  cost: number;
  badge?: string;
}

export interface OrderCustomer {
  fullName: string;
  email: string;
  phone: string;
  dni: string;
  address: string;
  city: string;
  postalCode: string;
  notes?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  customer: OrderCustomer;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingCost: number;
  total: number;
  paymentMethod: 'credit_card' | 'mercado_pago' | 'bank_transfer';
  installments?: number;
  status: 'paid' | 'pending' | 'shipped' | 'delivered';
  trackingNumber?: string;
}

export type CategoryFilter = 'all' | 'audio' | 'wearables' | 'workstation' | 'lifestyle' | 'gaming';

export type ViewType = 'home' | 'catalog' | 'admin';

export interface StoreSettings {
  storeName: string;
  storeTagline: string;
  supportEmail: string;
  supportPhone: string;
  announcementText: string;
  
  // Hero Section copy
  heroBadge: string;
  heroTitle: string;
  heroTitleHighlight: string;
  heroSubtitle: string;
  heroCtaPrimary: string;
  heroCtaSecondary: string;
  
  // Hero Star Product
  heroStarProductId: string;
  heroStarBadge: string;
  heroStarTag: string;

  // Free shipping threshold
  freeShippingThreshold: number;
}

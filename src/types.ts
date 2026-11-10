export type Language = 'ar' | 'fr' | 'en';
export type Currency = 'DZD' | 'EUR' | 'USD';
export type Theme = 'light' | 'dark';

export interface LocalizedString {
  ar: string;
  fr: string;
  en: string;
}

export interface Category {
  id: string;
  name: LocalizedString;
  image: string;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface ProductWeightPrice {
  weight: string; // e.g., "50g", "100g", "250g", "500g", "1kg"
  price: number;  // Base price in DZD
  oldPrice?: number;
  stock: number;
}

export interface Product {
  id: string;
  name: LocalizedString;
  category: string; // e.g., 'epices', 'poivres', 'herbes', 'melanges', 'graines', 'produits_naturels'
  categoryName: LocalizedString;
  shortDescription: LocalizedString;
  description: LocalizedString;
  ingredients: LocalizedString;
  origin: LocalizedString;
  nutritionalInfo: {
    energy: string;
    protein: string;
    fat: string;
    carbohydrates: string;
    sodium: string;
  };
  rating: number;
  reviewsCount: number;
  reviews: Review[];
  weightPrices: ProductWeightPrice[];
  images: string[];
  isBestSeller?: boolean;
  isNew?: boolean;
}

export interface CartItem {
  product: Product;
  selectedWeight: string;
  selectedPrice: number;
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  addresses?: Address[];
  role: 'customer' | 'admin';
}

export interface Address {
  id: string;
  title: string;
  fullName: string;
  phone: string;
  addressLine: string;
  wilaya: string;
  commune: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  weight: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Address;
  paymentMethod: 'cod' | 'card';
  paymentStatus: 'pending' | 'paid';
  trackingNumber?: string;
}

export interface BlogArticle {
  id: string;
  title: LocalizedString;
  excerpt: LocalizedString;
  content: LocalizedString;
  image: string;
  date: string;
  readTime: string;
  category: LocalizedString;
  tags: string[];
}

export interface RecipeCategory {
  id: string;
  name: LocalizedString;
  image?: string;
}

export interface Recipe {
  id: string;
  title: LocalizedString;
  category?: string; // Recipe Category ID
  description: LocalizedString;
  image: string;
  prepTime: string;
  cookTime: string;
  difficulty: 'easy' | 'medium' | 'hard';
  difficultyLabel: LocalizedString;
  servings: number;
  ingredients: LocalizedString[];
  instructions: LocalizedString[];
  spicesUsed: string[]; // Product IDs
}

export interface WilayaShippingRate {
  code: number; // 1 to 58
  name: LocalizedString;
  homeRate: number; // Tariff À Domicile (DA)
  deskRate: number; // Tariff Stop Desk (DA)
  active: boolean;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  value: number;
  minSubtotal: number;
}

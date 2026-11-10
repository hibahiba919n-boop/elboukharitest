import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Category, CartItem, User, Order, Address, Language, Currency, Theme, Coupon, Recipe, RecipeCategory, WilayaShippingRate } from '../types';
import { PRODUCTS as INITIAL_PRODUCTS, CATEGORIES as INITIAL_CATEGORIES } from '../data/products';
import { RECIPES as INITIAL_RECIPES } from '../data/recipes';
import { INITIAL_WILAYA_RATES, INITIAL_RECIPE_CATEGORIES } from '../data/wilayas';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface Notification {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  currency: Currency;
  setCurrency: (curr: Currency) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  cart: CartItem[];
  addToCart: (product: Product, weight: string, price: number, qty?: number) => void;
  removeFromCart: (productId: string, weight: string) => void;
  updateCartQuantity: (productId: string, weight: string, quantity: number) => void;
  clearCart: () => void;
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  compareList: Product[];
  toggleCompare: (product: Product) => void;
  recentlyViewed: Product[];
  addToRecentlyViewed: (product: Product) => void;
  currentUser: User | null;
  login: (email: string, password: string) => boolean;
  register: (fullName: string, email: string, phone: string, password?: string) => boolean;
  logout: () => void;
  updateUserAddresses: (addresses: Address[]) => void;
  updateUserSettings: (firstName: string, lastName: string, phone: string) => void;
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'date' | 'status' | 'paymentStatus'>) => Order;
  activeCoupon: Coupon | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  coupons: Coupon[];
  addCoupon: (coupon: Coupon) => void;
  updateCoupon: (oldCode: string, updatedCoupon: Coupon) => void;
  deleteCoupon: (code: string) => void;
  updateOrderStatus: (orderId: string, status: string) => void;
  notifications: Notification[];
  addNotification: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeNotification: (id: string) => void;
  formatPrice: (priceInDZD: number) => string;
  translate: (localized: { ar: string; fr: string; en: string }) => string;
  // Dynamic Products and Categories
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  categories: Category[];
  addCategory: (category: Category) => void;
  updateCategory: (category: Category) => void;
  deleteCategory: (id: string) => void;
  // Dynamic Recipes and Recipe Categories
  recipes: Recipe[];
  addRecipe: (recipe: Recipe) => void;
  updateRecipe: (recipe: Recipe) => void;
  deleteRecipe: (id: string) => void;
  recipeCategories: RecipeCategory[];
  addRecipeCategory: (category: RecipeCategory) => void;
  updateRecipeCategory: (category: RecipeCategory) => void;
  deleteRecipeCategory: (id: string) => void;
  // Shipping Rates (58 Wilayas)
  shippingRates: WilayaShippingRate[];
  updateShippingRate: (code: number, homeRate: number, deskRate: number, active?: boolean) => void;
  applyGlobalShippingRates: (homeRate: number, deskRate: number) => void;
  // Supabase Cloud Sync
  isSupabaseConfigured: boolean;
  isSyncingCloud: boolean;
  syncAllToSupabase: () => Promise<boolean>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const EXCHANGE_RATES = {
  DZD: 1,
  EUR: 0.0068, // 1 DZD = 0.0068 EUR (approximate official rate)
  USD: 0.0074  // 1 DZD = 0.0074 USD
};

const SYMBOLS = {
  DZD: ' DA',
  EUR: ' €',
  USD: ' $'
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('lang') as Language;
    // Redirect English users to French since we removed English support
    if (saved === 'en') return 'fr';
    return saved || 'fr';
  });
  const [currency, setCurrency] = useState<Currency>(() => {
    return (localStorage.getItem('currency') as Currency) || 'DZD';
  });
  const [theme, setThemeState] = useState<Theme>('light');

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [compareList, setCompareList] = useState<Product[]>([]);

  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>(() => {
    const saved = localStorage.getItem('recently_viewed');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [activeCoupon, setActiveCoupon] = useState<Coupon | null>(null);
  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const saved = localStorage.getItem('coupons');
    if (!saved) {
      return [
        { code: 'BOUKHARI10', discountType: 'percentage', value: 10, minSubtotal: 1000 },
        { code: 'RAMADAN20', discountType: 'percentage', value: 20, minSubtotal: 3000 },
        { code: 'PROMO1000', discountType: 'fixed', value: 1000, minSubtotal: 5000 }
      ];
    }
    try {
      return JSON.parse(saved);
    } catch {
      return [
        { code: 'BOUKHARI10', discountType: 'percentage', value: 10, minSubtotal: 1000 },
        { code: 'RAMADAN20', discountType: 'percentage', value: 20, minSubtotal: 3000 },
        { code: 'PROMO1000', discountType: 'fixed', value: 1000, minSubtotal: 5000 }
      ];
    }
  });
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Dynamic Products and Categories state with localStorage backup
  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('categories');
    return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [recipeCategories, setRecipeCategories] = useState<RecipeCategory[]>(() => {
    const saved = localStorage.getItem('recipe_categories');
    if (!saved) return INITIAL_RECIPE_CATEGORIES;
    try {
      const parsed: RecipeCategory[] = JSON.parse(saved);
      const existingIds = new Set(parsed.map((c) => c.id));
      const missing = INITIAL_RECIPE_CATEGORIES.filter((c) => !existingIds.has(c.id));
      return missing.length > 0 ? [...parsed, ...missing] : parsed;
    } catch {
      return INITIAL_RECIPE_CATEGORIES;
    }
  });

  const [recipes, setRecipes] = useState<Recipe[]>(() => {
    const saved = localStorage.getItem('recipes');
    if (!saved) return INITIAL_RECIPES;
    try {
      const parsed: Recipe[] = JSON.parse(saved);
      const existingIds = new Set(parsed.map((r) => r.id));
      const missing = INITIAL_RECIPES.filter((r) => !existingIds.has(r.id));
      return missing.length > 0 ? [...parsed, ...missing] : parsed;
    } catch {
      return INITIAL_RECIPES;
    }
  });

  const [shippingRates, setShippingRates] = useState<WilayaShippingRate[]>(() => {
    const saved = localStorage.getItem('shipping_rates');
    return saved ? JSON.parse(saved) : INITIAL_WILAYA_RATES;
  });

  const [isSyncingCloud, setIsSyncingCloud] = useState(false);

  // Supabase Data Mappers
  const mapCategoryFromDb = (row: any): Category => ({
    id: row.id,
    name: row.name,
    image: row.image
  });
  const mapCategoryToDb = (cat: Category) => ({
    id: cat.id,
    name: cat.name,
    image: cat.image
  });

  const mapProductFromDb = (row: any): Product => ({
    id: row.id,
    name: row.name,
    category: row.category,
    categoryName: row.category_name,
    shortDescription: row.short_description,
    description: row.description,
    ingredients: row.ingredients || { ar: '', fr: '', en: '' },
    origin: row.origin || { ar: '', fr: '', en: '' },
    nutritionalInfo: row.nutritional_info,
    rating: Number(row.rating) || 5.0,
    reviewsCount: Number(row.reviews_count) || 0,
    reviews: row.reviews || [],
    weightPrices: row.weight_prices || [],
    images: row.images || [],
    isBestSeller: Boolean(row.is_best_seller),
    isNew: Boolean(row.is_new)
  });
  const mapProductToDb = (p: Product) => ({
    id: p.id,
    name: p.name,
    category: p.category,
    category_name: p.categoryName,
    short_description: p.shortDescription,
    description: p.description,
    ingredients: p.ingredients,
    origin: p.origin,
    nutritional_info: p.nutritionalInfo,
    rating: p.rating,
    reviews_count: p.reviewsCount,
    reviews: p.reviews,
    weight_prices: p.weightPrices,
    images: p.images,
    is_best_seller: p.isBestSeller,
    is_new: p.isNew
  });

  const mapRecipeFromDb = (row: any): Recipe => ({
    id: row.id,
    title: row.title,
    category: row.category,
    description: row.description,
    image: row.image,
    prepTime: row.prep_time,
    cookTime: row.cook_time,
    difficulty: row.difficulty,
    difficultyLabel: row.difficulty_label,
    servings: Number(row.servings) || 4,
    ingredients: row.ingredients || [],
    instructions: row.instructions || [],
    spicesUsed: row.spices_used || []
  });
  const mapRecipeToDb = (r: Recipe) => ({
    id: r.id,
    title: r.title,
    category: r.category,
    description: r.description,
    image: r.image,
    prep_time: r.prepTime,
    cook_time: r.cookTime,
    difficulty: r.difficulty,
    difficulty_label: r.difficultyLabel,
    servings: r.servings,
    ingredients: r.ingredients,
    instructions: r.instructions,
    spices_used: r.spicesUsed
  });

  const mapCouponFromDb = (row: any): Coupon => ({
    code: row.code,
    discountType: row.discount_type,
    value: Number(row.value),
    minSubtotal: Number(row.min_subtotal) || 0
  });
  const mapCouponToDb = (c: Coupon) => ({
    code: c.code,
    discount_type: c.discountType,
    value: c.value,
    min_subtotal: c.minSubtotal || 0
  });

  const mapOrderFromDb = (row: any): Order => ({
    id: row.id,
    date: typeof row.date === 'string' ? row.date : new Date(row.date).toLocaleDateString(),
    items: row.items || [],
    subtotal: Number(row.subtotal),
    shippingFee: Number(row.shipping_fee) || 0,
    discount: Number(row.discount) || 0,
    total: Number(row.total),
    status: row.status,
    shippingAddress: row.shipping_address,
    paymentMethod: row.payment_method,
    paymentStatus: row.payment_status,
    trackingNumber: row.tracking_number
  });
  const mapOrderToDb = (o: Order) => ({
    id: o.id,
    date: new Date().toISOString(),
    items: o.items,
    subtotal: o.subtotal,
    shipping_fee: o.shippingFee,
    discount: o.discount,
    total: o.total,
    status: o.status,
    shipping_address: o.shippingAddress,
    payment_method: o.paymentMethod,
    payment_status: o.paymentStatus,
    tracking_number: o.trackingNumber
  });

  // Fetch live cloud data from Supabase on startup & auto-seed if tables are empty
  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return;

    const fetchCloudData = async () => {
      try {
        // 1. Categories
        const { data: catData, error: catErr } = await supabase.from('categories').select('*');
        if (!catErr) {
          if (catData && catData.length > 0) {
            const mappedCats = catData.map(mapCategoryFromDb);
            setCategories(mappedCats);
          } else {
            // Auto-seed initial categories into Supabase
            await supabase.from('categories').upsert(INITIAL_CATEGORIES.map(mapCategoryToDb));
          }
        }

        // 2. Products
        const { data: prodData, error: prodErr } = await supabase.from('products').select('*');
        if (!prodErr) {
          if (prodData && prodData.length > 0) {
            const mappedProds = prodData.map(mapProductFromDb);
            setProducts(mappedProds);
          } else {
            // Auto-seed initial products into Supabase
            await supabase.from('products').upsert(INITIAL_PRODUCTS.map(mapProductToDb));
          }
        }

        // 3. Recipe Categories
        const { data: recCatData, error: recCatErr } = await supabase.from('recipe_categories').select('*');
        if (!recCatErr) {
          if (recCatData && recCatData.length > 0) {
            const mappedRecCats: RecipeCategory[] = recCatData.map((r) => ({ id: r.id, name: r.name, image: r.image }));
            setRecipeCategories(mappedRecCats);
          } else {
            await supabase.from('recipe_categories').upsert(INITIAL_RECIPE_CATEGORIES.map((c) => ({ id: c.id, name: c.name, image: c.image })));
          }
        }

        // 4. Recipes
        const { data: recData, error: recErr } = await supabase.from('recipes').select('*');
        if (!recErr) {
          if (recData && recData.length > 0) {
            const mappedRecipes = recData.map(mapRecipeFromDb);
            setRecipes(mappedRecipes);
          } else {
            await supabase.from('recipes').upsert(INITIAL_RECIPES.map(mapRecipeToDb));
          }
        }

        // 5. Coupons
        const { data: couponData, error: couponErr } = await supabase.from('coupons').select('*');
        if (!couponErr) {
          if (couponData && couponData.length > 0) {
            const mappedCoupons = couponData.map(mapCouponFromDb);
            setCoupons(mappedCoupons);
          } else {
            const defaultCoupons = [
              { code: 'BOUKHARI10', discountType: 'percentage', value: 10, minSubtotal: 1000 },
              { code: 'RAMADAN20', discountType: 'percentage', value: 20, minSubtotal: 3000 },
              { code: 'PROMO1000', discountType: 'fixed', value: 1000, minSubtotal: 5000 }
            ];
            await supabase.from('coupons').upsert(defaultCoupons.map(mapCouponToDb));
          }
        }

        // 6. Orders
        const { data: orderData, error: orderErr } = await supabase.from('orders').select('*');
        if (!orderErr && orderData && orderData.length > 0) {
          const mappedOrders = orderData.map(mapOrderFromDb);
          setOrders(mappedOrders);
        }
      } catch (err) {
        console.warn('Supabase automatic cloud initialization warning:', err);
      }
    };

    fetchCloudData();
  }, []);

  // ──────────────────────────────────────────────
  // REALTIME SUBSCRIPTIONS — automatic sync across all browsers/devices
  // ──────────────────────────────────────────────
  useEffect(() => {
    if (!supabase) return;

    const channel = supabase
      .channel('db-realtime-all')
      // Categories
      .on('postgres_changes', { event: '*', schema: 'public', table: 'categories' }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setCategories((prev) => {
            if (prev.some((c) => c.id === payload.new.id)) return prev;
            return [...prev, mapCategoryFromDb(payload.new)];
          });
        } else if (payload.eventType === 'UPDATE') {
          setCategories((prev) => prev.map((c) => c.id === payload.new.id ? mapCategoryFromDb(payload.new) : c));
        } else if (payload.eventType === 'DELETE') {
          setCategories((prev) => prev.filter((c) => c.id !== payload.old.id));
        }
      })
      // Products
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setProducts((prev) => {
            if (prev.some((p) => p.id === payload.new.id)) return prev;
            return [mapProductFromDb(payload.new), ...prev];
          });
        } else if (payload.eventType === 'UPDATE') {
          setProducts((prev) => prev.map((p) => p.id === payload.new.id ? mapProductFromDb(payload.new) : p));
        } else if (payload.eventType === 'DELETE') {
          setProducts((prev) => prev.filter((p) => p.id !== payload.old.id));
        }
      })
      // Recipes
      .on('postgres_changes', { event: '*', schema: 'public', table: 'recipes' }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setRecipes((prev) => {
            if (prev.some((r) => r.id === payload.new.id)) return prev;
            return [...prev, mapRecipeFromDb(payload.new)];
          });
        } else if (payload.eventType === 'UPDATE') {
          setRecipes((prev) => prev.map((r) => r.id === payload.new.id ? mapRecipeFromDb(payload.new) : r));
        } else if (payload.eventType === 'DELETE') {
          setRecipes((prev) => prev.filter((r) => r.id !== payload.old.id));
        }
      })
      // Recipe Categories
      .on('postgres_changes', { event: '*', schema: 'public', table: 'recipe_categories' }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setRecipeCategories((prev) => {
            if (prev.some((c) => c.id === payload.new.id)) return prev;
            return [...prev, { id: payload.new.id, name: payload.new.name, image: payload.new.image }];
          });
        } else if (payload.eventType === 'UPDATE') {
          setRecipeCategories((prev) => prev.map((c) => c.id === payload.new.id ? { id: payload.new.id, name: payload.new.name, image: payload.new.image } : c));
        } else if (payload.eventType === 'DELETE') {
          setRecipeCategories((prev) => prev.filter((c) => c.id !== payload.old.id));
        }
      })
      // Orders
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setOrders((prev) => {
            if (prev.some((o) => o.id === payload.new.id)) return prev;
            return [mapOrderFromDb(payload.new), ...prev];
          });
        } else if (payload.eventType === 'UPDATE') {
          setOrders((prev) => prev.map((o) => o.id === payload.new.id ? mapOrderFromDb(payload.new) : o));
        } else if (payload.eventType === 'DELETE') {
          setOrders((prev) => prev.filter((o) => o.id !== payload.old.id));
        }
      })
      // Coupons
      .on('postgres_changes', { event: '*', schema: 'public', table: 'coupons' }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setCoupons((prev) => {
            if (prev.some((c) => c.code === payload.new.code)) return prev;
            return [...prev, mapCouponFromDb(payload.new)];
          });
        } else if (payload.eventType === 'UPDATE') {
          setCoupons((prev) => prev.map((c) => c.code === payload.new.code ? mapCouponFromDb(payload.new) : c));
        } else if (payload.eventType === 'DELETE') {
          setCoupons((prev) => prev.filter((c) => c.code !== payload.old.code));
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const syncAllToSupabase = async (): Promise<boolean> => {
    if (!isSupabaseConfigured || !supabase) {
      addNotification(
        translate({
          ar: 'لم يتم إعداد متغيرات بيئة Supabase (VITE_SUPABASE_URL)',
          fr: 'Supabase n\'est pas configuré dans les variables d\'environnement',
          en: 'Supabase environment variables are not configured'
        }),
        'error'
      );
      return false;
    }

    setIsSyncingCloud(true);
    try {
      if (categories.length > 0) {
        await supabase.from('categories').upsert(categories.map(mapCategoryToDb));
      }
      if (products.length > 0) {
        await supabase.from('products').upsert(products.map(mapProductToDb));
      }
      if (recipeCategories.length > 0) {
        await supabase.from('recipe_categories').upsert(recipeCategories.map((c) => ({ id: c.id, name: c.name, image: c.image })));
      }
      if (recipes.length > 0) {
        await supabase.from('recipes').upsert(recipes.map(mapRecipeToDb));
      }
      if (coupons.length > 0) {
        await supabase.from('coupons').upsert(coupons.map(mapCouponToDb));
      }

      addNotification(
        translate({
          ar: 'تم رفع ومزامنة الكتالوج بالكامل مع قاعدة بيانات Supabase بنجاح!',
          fr: 'Le catalogue a été synchronisé avec succès sur la base Supabase !',
          en: 'Catalog successfully synced to Supabase cloud database!'
        }),
        'success'
      );
      setIsSyncingCloud(false);
      return true;
    } catch (err: any) {
      console.error('Supabase seed error:', err);
      addNotification(
        translate({
          ar: 'حدث خطأ أثناء مزامنة البيانات مع Supabase',
          fr: 'Erreur lors de la synchronisation Supabase',
          en: 'Error syncing data with Supabase'
        }),
        'error'
      );
      setIsSyncingCloud(false);
      return false;
    }
  };

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('recipe_categories', JSON.stringify(recipeCategories));
  }, [recipeCategories]);

  useEffect(() => {
    localStorage.setItem('recipes', JSON.stringify(recipes));
  }, [recipes]);

  useEffect(() => {
    localStorage.setItem('coupons', JSON.stringify(coupons));
  }, [coupons]);

  useEffect(() => {
    localStorage.setItem('shipping_rates', JSON.stringify(shippingRates));
  }, [shippingRates]);

  // Apply language direction class to html element
  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute('lang', language);
    if (language === 'ar') {
      html.setAttribute('dir', 'rtl');
      html.className = 'rtl-mode';
    } else {
      html.setAttribute('dir', 'ltr');
      html.className = 'ltr-mode';
    }
    localStorage.setItem('lang', language);
  }, [language]);

  // Handle Theme switching
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Persist items
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('recently_viewed', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('user');
    }
  }, [currentUser]);

  // Helpers
  const addNotification = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString();
    setNotifications((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeNotification(id);
    }, 4000);
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const translate = (localized: { ar: string; fr: string; en: string }) => {
    return localized[language] || localized['fr'] || '';
  };

  const formatPrice = (priceInDZD: number) => {
    const converted = priceInDZD * EXCHANGE_RATES[currency];
    const rounded = currency === 'DZD' ? Math.round(converted) : Number(converted.toFixed(2));
    
    // Formatting style based on language
    if (language === 'ar') {
      return `${rounded.toLocaleString('ar-DZ')}${SYMBOLS[currency]}`;
    }
    return `${rounded.toLocaleString()} ${SYMBOLS[currency].trim()}`;
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    addNotification(
      lang === 'ar' ? 'تم تغيير اللغة إلى العربية' : 'Langue changée en Français',
      'info'
    );
  };

  const setTheme = (t: Theme) => {
    setThemeState(t);
  };

  // Cart Operations
  const addToCart = (product: Product, weight: string, price: number, qty = 1) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedWeight === weight
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += qty;
        addNotification(
          translate({
            ar: `تمت زيادة كمية ${translate(product.name)} في السلة`,
            fr: `Quantité de ${translate(product.name)} mise à jour dans le panier`,
            en: `Quantity of ${translate(product.name)} updated in your cart`
          }),
          'success'
        );
        return updated;
      } else {
        addNotification(
          translate({
            ar: `تمت إضافة ${translate(product.name)} إلى السلة`,
            fr: `${translate(product.name)} ajouté au panier`,
            en: `${translate(product.name)} added to cart`
          }),
          'success'
        );
        return [...prev, { product, selectedWeight: weight, selectedPrice: price, quantity: qty }];
      }
    });
  };

  const removeFromCart = (productId: string, weight: string) => {
    setCart((prev) => prev.filter((item) => !(item.product.id === productId && item.selectedWeight === weight)));
    addNotification(
      translate({
        ar: 'تمت إزالة المنتج من السلة',
        fr: 'Produit retiré du panier',
        en: 'Product removed from cart'
      }),
      'info'
    );
  };

  const updateCartQuantity = (productId: string, weight: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, weight);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.selectedWeight === weight ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist
  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        addNotification(
          translate({
            ar: 'تمت إزالة المنتج من المفضلة',
            fr: 'Produit retiré des favoris',
            en: 'Product removed from wishlist'
          }),
          'info'
        );
        return prev.filter((item) => item.id !== product.id);
      } else {
        addNotification(
          translate({
            ar: 'تمت إضافة المنتج إلى المفضلة',
            fr: 'Produit ajouté aux favoris',
            en: 'Product added to wishlist'
          }),
          'success'
        );
        return [...prev, product];
      }
    });
  };

  // Compare List
  const toggleCompare = (product: Product) => {
    setCompareList((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        addNotification(
          translate({
            ar: 'تمت إزالة المنتج من المقارنة',
            fr: 'Produit retiré du comparateur',
            en: 'Product removed from comparison list'
          }),
          'info'
        );
        return prev.filter((item) => item.id !== product.id);
      } else {
        if (prev.length >= 3) {
          addNotification(
            translate({
              ar: 'يمكنك مقارنة 3 منتجات كحد أقصى',
              fr: 'Vous pouvez comparer 3 produits au maximum',
              en: 'You can compare up to 3 products maximum'
            }),
            'error'
          );
          return prev;
        }
        addNotification(
          translate({
            ar: 'تمت إضافة المنتج إلى المقارنة',
            fr: 'Produit ajouté au comparateur',
            en: 'Product added to comparison list'
          }),
          'success'
        );
        return [...prev, product];
      }
    });
  };

  // Recently Viewed
  const addToRecentlyViewed = (product: Product) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((item) => item.id !== product.id);
      return [product, ...filtered].slice(0, 5); // Keep last 5
    });
  };

  // Auth Mocks
  const login = (email: string, password: string): boolean => {
    // Elegant login bypass for simulation
    if (email && password.length >= 4) {
      const mockUser: User = {
        id: 'usr-' + Math.random().toString(36).substr(2, 9),
        email: email,
        firstName: email.split('@')[0],
        lastName: 'El Boukhari Customer',
        phone: '+213 555 12 34 56',
        role: email.includes('admin') ? 'admin' : 'customer',
        addresses: [
          {
            id: 'addr-1',
            title: 'Domicile Algiers',
            fullName: email.split('@')[0] + ' Guest',
            phone: '+213 555 12 34 56',
            addressLine: '12 Rue Larbi Ben M\'hidi',
            wilaya: 'Alger',
            commune: 'Sidi M\'hamed'
          }
        ]
      };
      setCurrentUser(mockUser);
      addNotification(
        translate({
          ar: `مرحباً بك مجدداً، ${mockUser.firstName}`,
          fr: `Ravi de vous revoir, ${mockUser.firstName}`,
          en: `Welcome back, ${mockUser.firstName}`
        }),
        'success'
      );
      return true;
    }
    return false;
  };

  const register = (fullName: string, email: string, phone: string, password?: string): boolean => {
    if (fullName && email) {
      const parts = fullName.trim().split(' ');
      const firstName = parts[0] || 'Client';
      const lastName = parts.slice(1).join(' ') || 'El Boukhari';
      const cleanEmail = email.trim();
      const isAdmin = cleanEmail.toLowerCase().includes('admin');

      const newUser: User = {
        id: 'usr-' + Math.random().toString(36).substr(2, 9),
        email: cleanEmail,
        firstName,
        lastName,
        phone: phone.trim(),
        role: isAdmin ? 'admin' : 'customer',
        addresses: [
          {
            id: 'addr-1',
            title: 'Domicile Principale',
            fullName: `${firstName} ${lastName}`,
            phone: phone.trim() || '+213 555 12 34 56',
            addressLine: '12 Rue Larbi Ben M\'hidi',
            wilaya: 'Alger',
            commune: 'Sidi M\'hamed'
          }
        ]
      };
      setCurrentUser(newUser);
      addNotification(
        translate({
          ar: `تم إنشاء حسابك بنجاح! أهلاً بك يا ${firstName}`,
          fr: `Votre compte a été créé avec succès ! Bienvenue ${firstName}`,
          en: `Account created successfully! Welcome ${firstName}`
        }),
        'success'
      );
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    addNotification(
      translate({
        ar: 'تم تسجيل الخروج بنجاح. رافقتك السلامة',
        fr: 'Déconnexion réussie. À bientôt !',
        en: 'Logged out successfully. See you soon!'
      }),
      'info'
    );
  };

  const updateUserAddresses = (addresses: Address[]) => {
    if (currentUser) {
      setCurrentUser({ ...currentUser, addresses });
    }
  };

  const updateUserSettings = (firstName: string, lastName: string, phone: string) => {
    if (currentUser) {
      setCurrentUser({ ...currentUser, firstName, lastName, phone });
      addNotification(
        translate({
          ar: 'تم تحديث معلومات الحساب بنجاح',
          fr: 'Informations du compte mises à jour avec succès',
          en: 'Account details updated successfully'
        }),
        'success'
      );
    }
  };

  // Orders
  const createOrder = (orderData: Omit<Order, 'id' | 'date' | 'status' | 'paymentStatus'>): Order => {
    const newOrder: Order = {
      ...orderData,
      id: 'BKH-' + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleDateString(language === 'ar' ? 'ar-DZ' : 'fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      status: 'pending',
      paymentStatus: orderData.paymentMethod === 'card' ? 'paid' : 'pending'
    };

    setOrders((prev) => [newOrder, ...prev]);
    if (isSupabaseConfigured && supabase) {
      supabase.from('orders').insert(mapOrderToDb(newOrder)).then(({ error }) => {
        if (error) console.error('Supabase createOrder error:', error);
      });
    }
    clearCart();
    setActiveCoupon(null);
    addNotification(
      translate({
        ar: `تم تسجيل طلبك بنجاح! رقم الطلب: ${newOrder.id}`,
        fr: `Votre commande a été enregistrée ! N°: ${newOrder.id}`,
        en: `Your order has been placed! Order N°: ${newOrder.id}`
      }),
      'success'
    );
    return newOrder;
  };

  // Coupons
  const applyCoupon = (code: string): boolean => {
    const upperCode = code.toUpperCase();
    const found = coupons.find((c) => c.code === upperCode);

    if (found) {
      setActiveCoupon(found);
      addNotification(
        translate({
          ar: 'تم تطبيق كود الخصم بنجاح !',
          fr: 'Code promo appliqué avec succès !',
          en: 'Promo code applied successfully!'
        }),
        'success'
      );
      return true;
    }
    
    addNotification(
      translate({
        ar: 'كود الخصم هذا غير صالح أو منتهي الصلاحية',
        fr: 'Ce code promo est invalide ou expiré',
        en: 'This promo code is invalid or expired'
      }),
      'error'
    );
    return false;
  };

  const removeCoupon = () => {
    setActiveCoupon(null);
  };

  const addCoupon = (newCoupon: Coupon) => {
    setCoupons((prev) => {
      const filtered = prev.filter((c) => c.code !== newCoupon.code);
      const updated = [...filtered, newCoupon];
      localStorage.setItem('coupons', JSON.stringify(updated));
      return updated;
    });
    if (isSupabaseConfigured && supabase) {
      supabase.from('coupons').upsert(mapCouponToDb(newCoupon)).then(({ error }) => {
        if (error) console.error('Supabase addCoupon error:', error);
      });
    }
    addNotification(
      translate({
        ar: `تمت إضافة كود الخصم: ${newCoupon.code}`,
        fr: `Code promo ajouté : ${newCoupon.code}`,
        en: `Promo code added: ${newCoupon.code}`
      }),
      'success'
    );
  };

  const updateCoupon = (oldCode: string, updatedCoupon: Coupon) => {
    setCoupons((prev) => {
      const updated = prev.map((c) => (c.code === oldCode ? updatedCoupon : c));
      localStorage.setItem('coupons', JSON.stringify(updated));
      return updated;
    });
    if (isSupabaseConfigured && supabase) {
      if (oldCode !== updatedCoupon.code) {
        supabase.from('coupons').delete().eq('code', oldCode);
      }
      supabase.from('coupons').upsert(mapCouponToDb(updatedCoupon)).then(({ error }) => {
        if (error) console.error('Supabase updateCoupon error:', error);
      });
    }
    if (activeCoupon?.code === oldCode) {
      setActiveCoupon(updatedCoupon);
    }
    addNotification(
      translate({
        ar: `تم تعديل كود الخصم: ${updatedCoupon.code}`,
        fr: `Code promo mis à jour : ${updatedCoupon.code}`,
        en: `Promo code updated: ${updatedCoupon.code}`
      }),
      'success'
    );
  };

  const deleteCoupon = (code: string) => {
    setCoupons((prev) => {
      const updated = prev.filter((c) => c.code !== code);
      localStorage.setItem('coupons', JSON.stringify(updated));
      return updated;
    });
    if (isSupabaseConfigured && supabase) {
      supabase.from('coupons').delete().eq('code', code).then(({ error }) => {
        if (error) console.error('Supabase deleteCoupon error:', error);
      });
    }
    if (activeCoupon?.code === code) {
      setActiveCoupon(null);
    }
    addNotification(
      translate({
        ar: `تم حذف كود الخصم: ${code}`,
        fr: `Code promo supprimé : ${code}`,
        en: `Promo code deleted: ${code}`
      }),
      'info'
    );
  };

  const updateOrderStatus = (orderId: string, status: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: status as any } : o))
    );
    if (isSupabaseConfigured && supabase) {
      supabase.from('orders').update({ status }).eq('id', orderId).then(({ error }) => {
        if (error) console.error('Supabase updateOrderStatus error:', error);
      });
    }
    addNotification(
      translate({
        ar: `تم تحديث حالة الطلب إلى: ${status}`,
        fr: `Statut de la commande mis à jour : ${status}`,
        en: `Order status updated to: ${status}`
      }),
      'success'
    );
  };

  const addProduct = (product: Product) => {
    setProducts((prev) => [product, ...prev]);
    if (isSupabaseConfigured && supabase) {
      supabase.from('products').upsert(mapProductToDb(product)).then(({ error }) => {
        if (error) console.error('Supabase addProduct error:', error);
      });
    }
    addNotification(
      translate({
        ar: `تمت إضافة المنتج: ${product.name.fr}`,
        fr: `Produit ajouté : ${product.name.fr}`,
        en: `Product added: ${product.name.fr}`
      }),
      'success'
    );
  };

  const updateProduct = (product: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === product.id ? product : p)));
    if (isSupabaseConfigured && supabase) {
      supabase.from('products').upsert(mapProductToDb(product)).then(({ error }) => {
        if (error) console.error('Supabase updateProduct error:', error);
      });
    }
    addNotification(
      translate({
        ar: `تم تحديث المنتج: ${product.name.fr}`,
        fr: `Produit mis à jour : ${product.name.fr}`,
        en: `Product updated: ${product.name.fr}`
      }),
      'success'
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    if (isSupabaseConfigured && supabase) {
      supabase.from('products').delete().eq('id', id).then(({ error }) => {
        if (error) console.error('Supabase deleteProduct error:', error);
      });
    }
    addNotification(
      translate({
        ar: 'تم حذف المنتج بنجاح',
        fr: 'Produit supprimé avec succès',
        en: 'Product deleted successfully'
      }),
      'info'
    );
  };

  const addCategory = (category: Category) => {
    setCategories((prev) => [...prev, category]);
    if (isSupabaseConfigured && supabase) {
      supabase.from('categories').upsert(mapCategoryToDb(category)).then(({ error }) => {
        if (error) console.error('Supabase addCategory error:', error);
      });
    }
    addNotification(
      translate({
        ar: `تمت إضافة الفئة: ${category.name.fr}`,
        fr: `Catégorie ajoutée : ${category.name.fr}`,
        en: `Category added: ${category.name.fr}`
      }),
      'success'
    );
  };

  const updateCategory = (category: Category) => {
    setCategories((prev) => prev.map((c) => (c.id === category.id ? category : c)));
    if (isSupabaseConfigured && supabase) {
      supabase.from('categories').upsert(mapCategoryToDb(category)).then(({ error }) => {
        if (error) console.error('Supabase updateCategory error:', error);
      });
    }
    addNotification(
      translate({
        ar: `تم تحديث الفئة: ${category.name.fr}`,
        fr: `Catégorie mise à jour : ${category.name.fr}`,
        en: `Category updated: ${category.name.fr}`
      }),
      'success'
    );
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    if (isSupabaseConfigured && supabase) {
      supabase.from('categories').delete().eq('id', id).then(({ error }) => {
        if (error) console.error('Supabase deleteCategory error:', error);
      });
    }
    addNotification(
      translate({
        ar: 'تم حذف الفئة بنجاح',
        fr: 'Catégorie supprimée avec succès',
        en: 'Category deleted successfully'
      }),
      'info'
    );
  };

  // Recipe Category Handlers
  const addRecipeCategory = (category: RecipeCategory) => {
    setRecipeCategories((prev) => [...prev, category]);
    if (isSupabaseConfigured && supabase) {
      supabase.from('recipe_categories').upsert({ id: category.id, name: category.name, image: category.image }).then(({ error }) => {
        if (error) console.error('Supabase addRecipeCategory error:', error);
      });
    }
    addNotification(
      translate({
        ar: `تمت إضافة فئة الوصفة: ${category.name.fr}`,
        fr: `Catégorie de recette ajoutée : ${category.name.fr}`,
        en: `Recipe category added: ${category.name.fr}`
      }),
      'success'
    );
  };

  const updateRecipeCategory = (category: RecipeCategory) => {
    setRecipeCategories((prev) => prev.map((c) => (c.id === category.id ? category : c)));
    if (isSupabaseConfigured && supabase) {
      supabase.from('recipe_categories').upsert({ id: category.id, name: category.name, image: category.image }).then(({ error }) => {
        if (error) console.error('Supabase updateRecipeCategory error:', error);
      });
    }
    addNotification(
      translate({
        ar: `تم تحديث فئة الوصفة: ${category.name.fr}`,
        fr: `Catégorie de recette mise à jour : ${category.name.fr}`,
        en: `Recipe category updated: ${category.name.fr}`
      }),
      'success'
    );
  };

  const deleteRecipeCategory = (id: string) => {
    setRecipeCategories((prev) => {
      const filtered = prev.filter((c) => c.id !== id);
      const fallbackCatId = filtered[0]?.id || 'recettes_gastronomiques';
      setRecipes((rPrev) =>
        rPrev.map((r) => (r.category === id ? { ...r, category: fallbackCatId } : r))
      );
      return filtered;
    });
    if (isSupabaseConfigured && supabase) {
      supabase.from('recipe_categories').delete().eq('id', id).then(({ error }) => {
        if (error) console.error('Supabase deleteRecipeCategory error:', error);
      });
    }
    addNotification(
      translate({
        ar: 'تم حذف تصنيف الوصفات وتحديث الوصفات المرتبطة به بنجاح',
        fr: 'Catégorie de recette supprimée avec succès',
        en: 'Recipe category deleted successfully'
      }),
      'info'
    );
  };

  // Recipe Handlers
  const addRecipe = (recipe: Recipe) => {
    setRecipes((prev) => [...prev, recipe]);
    if (isSupabaseConfigured && supabase) {
      supabase.from('recipes').upsert(mapRecipeToDb(recipe)).then(({ error }) => {
        if (error) console.error('Supabase addRecipe error:', error);
      });
    }
    addNotification(
      translate({
        ar: `تمت إضافة الوصفة: ${recipe.title.fr}`,
        fr: `Recette ajoutée : ${recipe.title.fr}`,
        en: `Recipe added: ${recipe.title.fr}`
      }),
      'success'
    );
  };

  const updateRecipe = (recipe: Recipe) => {
    setRecipes((prev) => prev.map((r) => (r.id === recipe.id ? recipe : r)));
    if (isSupabaseConfigured && supabase) {
      supabase.from('recipes').upsert(mapRecipeToDb(recipe)).then(({ error }) => {
        if (error) console.error('Supabase updateRecipe error:', error);
      });
    }
    addNotification(
      translate({
        ar: `تم تحديث الوصفة: ${recipe.title.fr}`,
        fr: `Recette mise à jour : ${recipe.title.fr}`,
        en: `Recipe updated: ${recipe.title.fr}`
      }),
      'success'
    );
  };

  const deleteRecipe = (id: string) => {
    setRecipes((prev) => prev.filter((r) => r.id !== id));
    if (isSupabaseConfigured && supabase) {
      supabase.from('recipes').delete().eq('id', id).then(({ error }) => {
        if (error) console.error('Supabase deleteRecipe error:', error);
      });
    }
    addNotification(
      translate({
        ar: 'تم حذف الوصفة بنجاح',
        fr: 'Recette supprimée avec succès',
        en: 'Recipe deleted successfully'
      }),
      'info'
    );
  };

  // Shipping Rates Handlers
  const updateShippingRate = (code: number, homeRate: number, deskRate: number, active: boolean = true) => {
    setShippingRates((prev) =>
      prev.map((item) => (item.code === code ? { ...item, homeRate, deskRate, active } : item))
    );
  };

  const applyGlobalShippingRates = (homeRate: number, deskRate: number) => {
    setShippingRates((prev) =>
      prev.map((item) => ({
        ...item,
        homeRate,
        deskRate
      }))
    );
    addNotification(
      translate({
        ar: `تم تحديث أسعار الشحن لجميع الولايات الـ 58 (${homeRate} د.ج منزل / ${deskRate} د.ج مكتب)`,
        fr: `Tarifs appliqués à l'ensemble des 58 Wilayas (${homeRate} DA Domicile / ${deskRate} DA Stop Desk)`,
        en: `Shipping rates updated for all 58 Wilayas (${homeRate} DA Home / ${deskRate} DA Office)`
      }),
      'success'
    );
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        currency,
        setCurrency,
        theme,
        setTheme,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        wishlist,
        toggleWishlist,
        compareList,
        toggleCompare,
        recentlyViewed,
        addToRecentlyViewed,
        currentUser,
        login,
        register,
        logout,
        updateUserAddresses,
        updateUserSettings,
        orders,
        createOrder,
        activeCoupon,
        applyCoupon,
        removeCoupon,
        coupons,
        addCoupon,
        updateCoupon,
        deleteCoupon,
        updateOrderStatus,
        notifications,
        addNotification,
        removeNotification,
        formatPrice,
        translate,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        categories,
        addCategory,
        updateCategory,
        deleteCategory,
        recipes,
        addRecipe,
        updateRecipe,
        deleteRecipe,
        recipeCategories,
        addRecipeCategory,
        updateRecipeCategory,
        deleteRecipeCategory,
        shippingRates,
        updateShippingRate,
        applyGlobalShippingRates,
        isSupabaseConfigured,
        isSyncingCloud,
        syncAllToSupabase
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

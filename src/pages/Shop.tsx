import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { Product } from '../types';
import {
  Search,
  SlidersHorizontal,
  Grid2X2,
  Grid3X3,
  List,
  Star,
  ShoppingBag,
  Heart,
  X,
  Filter,
  Check
} from 'lucide-react';

interface ShopProps {
  onNavigate: (page: string, params?: any) => void;
  initialCategory?: string | null;
}

export const Shop: React.FC<ShopProps> = ({ onNavigate, initialCategory = null }) => {
  const { translate, formatPrice, addToCart, toggleWishlist, wishlist, products, categories } = useApp();

  // Layout View State: 'grid3' | 'grid4' | 'list'
  const [viewStyle, setViewStyle] = useState<'grid3' | 'grid4' | 'list'>('grid3');

  // Search, Filter & Sort States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');
  const [selectedWeight, setSelectedWeight] = useState<string>('all');
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('featured');
  
  // Mobile Filter Drawer State
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // Derived filters
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  // Weights lists
  const weightFormats = ['all', '100g', '250g', '500g', '1g', '3g', '5g'];

  // Handle initialCategory transition correctly
  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  // Apply search/filter logic
  useEffect(() => {
    let result = [...products];

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Search query matching
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.ar.toLowerCase().includes(q) ||
          p.name.fr.toLowerCase().includes(q) ||
          p.name.en.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.ingredients.ar.toLowerCase().includes(q) ||
          p.ingredients.fr.toLowerCase().includes(q) ||
          p.ingredients.en.toLowerCase().includes(q)
      );
    }

    // Weight format matching
    if (selectedWeight !== 'all') {
      result = result.filter((p) => p.weightPrices.some((wp) => wp.weight === selectedWeight));
    }

    // In stock only
    if (onlyInStock) {
      result = result.filter((p) => p.weightPrices.some((wp) => wp.stock > 0));
    }

    // Sorting logic
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.weightPrices[0].price - b.weightPrices[0].price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.weightPrices[0].price - a.weightPrices[0].price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'newest') {
      result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    } else {
      // 'featured' / 'bestsellers'
      result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
    }

    setFilteredProducts(result);
  }, [searchQuery, selectedCategory, selectedWeight, onlyInStock, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedWeight('all');
    setOnlyInStock(false);
    setSortBy('featured');
  };

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    const wp = product.weightPrices[0];
    addToCart(product, wp.weight, wp.price, 1);
  };

  return (
    <div className="w-full min-h-screen bg-[#FDFBF7] dark:bg-[#030807] text-[#111111] dark:text-gray-100 py-12 px-4 md:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Banner/Header Info */}
        <div className="text-center space-y-2 pb-6 border-b border-gray-100 dark:border-[#222222]">
          <h1 className="text-3xl md:text-5xl font-sans font-extrabold tracking-tight">
            {translate({ ar: 'متجر توابل البوخاري الفاخر', fr: 'La Boutique El Boukhari', en: 'The El Boukhari Boutique' })}
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto text-xs md:text-sm">
            {translate({
              ar: 'اكتشف أرقى أنواع البهارات المفردة والخلطات الملكية السحرية المطحونة طازجة لتمنح أطباقك فخامة التقاليد الجزائرية.',
              fr: 'Explorez nos poivres rares, safran pur, sels aromatiques et mélanges traditionnels moulus artisanalement à la commande.',
              en: 'Explore our rare single strains, pure saffron, custom seasonings, and authentic secret blends ground upon ordering.'
            })}
          </p>
        </div>


        {/* Filter and View Action Header bar */}
        <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#222222] p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
          {/* Active count and search inside shop */}
          <div className="w-full md:w-auto flex items-center gap-4 justify-between md:justify-start">
            <button
              onClick={() => setIsFilterDrawerOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-[#222222] rounded-xl text-xs font-bold bg-[#F9F6F0] dark:bg-black text-gray-700 dark:text-gray-200"
            >
              <SlidersHorizontal size={14} />
              <span>{translate({ ar: 'تصفية المنتجات', fr: 'Filtres', en: 'Filters' })}</span>
            </button>

            <span className="text-xs text-gray-500 font-mono">
              <strong>{filteredProducts.length}</strong> {translate({ ar: 'منتج متاح', fr: 'produits trouvés', en: 'spices found' })}
            </span>
          </div>

          {/* Core Search & Sort tools */}
          <div className="w-full md:w-auto flex flex-wrap items-center gap-3 justify-end">
            <div className="relative flex-1 sm:flex-none">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={translate({ ar: 'ابحث في التوابل...', fr: 'Chercher une épice...', en: 'Search store...' })}
                className="w-full sm:w-60 bg-[#FDFBF7] dark:bg-black border border-gray-200 dark:border-[#222222] focus:border-[#C89B3C] focus:outline-none pl-9 pr-4 py-2 rounded-xl text-xs text-gray-800 dark:text-white placeholder-gray-400"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            </div>

            {/* Sort Select */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#FDFBF7] dark:bg-black border border-gray-200 dark:border-[#222222] focus:border-[#C89B3C] focus:outline-none px-3 py-2 rounded-xl text-xs text-gray-700 dark:text-gray-200"
            >
              <option value="featured">{translate({ ar: 'المقترحة والأكثر طلباً', fr: 'Tri par : Vedettes', en: 'Sort by: Featured' })}</option>
              <option value="price-asc">{translate({ ar: 'السعر: من الأقل للأعلى', fr: 'Prix : Croissant', en: 'Price: Low to High' })}</option>
              <option value="price-desc">{translate({ ar: 'السعر: من الأعلى للأقل', fr: 'Prix : Décroissant', en: 'Price: High to Low' })}</option>
              <option value="rating">{translate({ ar: 'تقييم الزبائن الممتاز', fr: 'Évaluation Clients', en: 'Customer Ratings' })}</option>
              <option value="newest">{translate({ ar: 'أحدث التوابل وصولاً', fr: 'Nouveautés', en: 'Latest Arrivals' })}</option>
            </select>

            {/* Grid Switchers (Desktop only) */}
            <div className="hidden lg:flex items-center gap-1 border-l border-gray-200 dark:border-[#222222] pl-3 rtl:border-l-0 rtl:border-r rtl:pl-0 rtl:pr-3">
              <button
                onClick={() => setViewStyle('grid3')}
                className={`p-2 rounded-lg transition ${viewStyle === 'grid3' ? 'bg-[#C89B3C]/10 text-[#C89B3C]' : 'text-gray-400 hover:text-black dark:hover:text-white'}`}
                title="Grid of 3"
              >
                <Grid2X2 size={16} />
              </button>
              <button
                onClick={() => setViewStyle('grid4')}
                className={`p-2 rounded-lg transition ${viewStyle === 'grid4' ? 'bg-[#C89B3C]/10 text-[#C89B3C]' : 'text-gray-400 hover:text-black dark:hover:text-white'}`}
                title="Grid of 4"
              >
                <Grid3X3 size={16} />
              </button>
              <button
                onClick={() => setViewStyle('list')}
                className={`p-2 rounded-lg transition ${viewStyle === 'list' ? 'bg-[#C89B3C]/10 text-[#C89B3C]' : 'text-gray-400 hover:text-black dark:hover:text-white'}`}
                title="List rows"
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* MAIN BODY LAYOUT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* DESKTOP SIDEBAR FILTERS (lg:col-span-3) */}
          <aside className="hidden lg:block lg:col-span-3 bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#222222] p-6 rounded-2xl space-y-6 shadow-sm sticky top-28 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-[#222222] pb-3">
              <span className="font-extrabold text-sm text-[#C89B3C] tracking-wider uppercase flex items-center gap-1.5">
                <Filter size={14} />
                <span>{translate({ ar: 'خيارات التصفية', fr: 'Filtres Avancés', en: 'Advanced Filters' })}</span>
              </span>
              <button
                onClick={handleResetFilters}
                className="text-[10px] font-bold text-gray-400 hover:text-red-500 underline"
              >
                {translate({ ar: 'إعادة تعيين', fr: 'Réinitialiser', en: 'Reset All' })}
              </button>
            </div>

            {/* Filter Group: Category */}
            <div className="space-y-2.5">
              <h4 className="font-bold text-xs text-gray-500 uppercase tracking-widest">
                {translate({ ar: 'الفئة', fr: 'Catégories', en: 'Category' })}
              </h4>
              <div className="flex flex-col gap-1.5 text-xs text-gray-600 dark:text-gray-300">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`text-left rtl:text-right py-1 flex items-center justify-between ${selectedCategory === 'all' ? 'text-[#C89B3C] font-black' : 'hover:text-[#C89B3C]'}`}
                >
                  <span>{translate({ ar: 'كل الفئات', fr: 'Toutes les catégories', en: 'All categories' })}</span>
                  {selectedCategory === 'all' && <Check size={12} />}
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`text-left rtl:text-right py-1 flex items-center justify-between ${selectedCategory === cat.id ? 'text-[#C89B3C] font-black' : 'hover:text-[#C89B3C]'}`}
                  >
                    <span>{translate(cat.name)}</span>
                    {selectedCategory === cat.id && <Check size={12} />}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter Group: Formats */}
            <div className="space-y-2.5 pt-4 border-t border-gray-100 dark:border-[#222222]">
              <h4 className="font-bold text-xs text-gray-500 uppercase tracking-widest">
                {translate({ ar: 'الوزن والتعبئة', fr: 'Poids / Contenance', en: 'Format Weight' })}
              </h4>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {weightFormats.map((w) => (
                  <button
                    key={w}
                    onClick={() => setSelectedWeight(w)}
                    className={`px-3 py-1.5 border rounded-lg text-xs font-mono font-bold transition ${
                      selectedWeight === w
                        ? 'border-[#C89B3C] bg-[#C89B3C]/10 text-[#C89B3C]'
                        : 'border-gray-200 dark:border-[#222222] text-gray-500 hover:border-[#C89B3C]'
                    }`}
                  >
                    {w === 'all' ? translate({ ar: 'الكل', fr: 'Tout', en: 'All' }) : w}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter Group: Stock status */}
            <div className="pt-4 border-t border-gray-100 dark:border-[#222222] flex items-center justify-between text-xs">
              <span className="text-gray-600 dark:text-gray-300 font-semibold">
                {translate({ ar: 'التوابل المتوفرة فقط بالمخزن', fr: 'En stock uniquement', en: 'In Stock Only' })}
              </span>
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="w-4 h-4 rounded text-[#C89B3C] accent-[#C89B3C] border-gray-300 focus:ring-[#C89B3C]"
              />
            </div>
          </aside>

          {/* PRODUCTS GRID (lg:col-span-9) */}
          <main className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-white dark:bg-[#111111] rounded-2xl border border-gray-200 dark:border-[#222222]">
                <Search className="mx-auto mb-4 text-gray-400" size={48} />
                <h3 className="font-bold text-lg text-white mb-2">
                  {translate({ ar: 'لا توجد توابل مطابقة للخيارات', fr: 'Aucun produit ne correspond', en: 'No products matched filters' })}
                </h3>
                <p className="text-xs text-gray-500 max-w-sm mx-auto">
                  {translate({
                    ar: 'يرجى تجربة تقليل خيارات التصفية أو مسح حقل البحث للعثور على البهارات الحرة.',
                    fr: 'Essayez de réinitialiser vos critères de recherche pour trouver la perle rare.',
                    en: 'Try decreasing your filters or clearing the search query to uncover classic spices.'
                  })}
                </p>
                <button
                  onClick={handleResetFilters}
                  className="mt-6 bg-[#C89B3C] text-black font-extrabold text-xs px-6 py-2.5 rounded-full hover:bg-white transition"
                >
                  {translate({ ar: 'مسح كافة التصفية', fr: 'Réinitialiser tous les filtres', en: 'Clear all filters' })}
                </button>
              </div>
            ) : (
              <div
                className={
                  viewStyle === 'list'
                    ? 'flex flex-col gap-6'
                    : viewStyle === 'grid4'
                    ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6'
                    : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'
                }
              >
                {filteredProducts.map((product) => {
                  const baseWp = product.weightPrices[0];
                  const hasDiscount = !!baseWp.oldPrice;
                  const isWish = wishlist.some((item) => item.id === product.id);

                  if (viewStyle === 'list') {
                    // List Row view
                    return (
                      <div
                        key={product.id}
                        onClick={() => onNavigate('product-detail', { productId: product.id })}
                        className="bg-white dark:bg-[#111111] rounded-2xl overflow-hidden border border-gray-200 dark:border-[#222222] hover:border-[#C89B3C]/30 shadow-sm hover:shadow-xl transition flex flex-col sm:flex-row items-stretch cursor-pointer group"
                      >
                        {/* Image */}
                        <div className="w-full sm:w-48 xl:w-60 shrink-0 aspect-square sm:aspect-auto overflow-hidden relative">
                          <img
                            src={product.images[0]}
                            alt={translate(product.name)}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        {/* Content details */}
                        <div className="p-6 flex-1 flex flex-col justify-between">
                          <div className="space-y-2">
                            <div className="flex justify-between items-start">
                              <span className="text-xs font-mono text-[#C89B3C] tracking-wider uppercase">
                                {translate(product.categoryName)}
                              </span>
                              <div className="flex gap-1 text-[10px] font-black uppercase">
                                {hasDiscount && <span className="bg-[#1B4332] text-white px-2 py-0.5 rounded">PROMO</span>}
                                {product.isNew && <span className="bg-[#C89B3C] text-black px-2 py-0.5 rounded">NEW</span>}
                              </div>
                            </div>
                            <h4 className="font-sans font-extrabold text-lg text-gray-900 dark:text-white group-hover:text-[#C89B3C] transition">
                              {translate(product.name)}
                            </h4>
                            <p className="text-gray-500 text-xs md:text-sm line-clamp-2 md:line-clamp-3 leading-relaxed">
                              {translate(product.shortDescription)}
                            </p>
                            <div className="flex items-center gap-1.5 text-xs text-amber-500">
                              <Star size={14} className="fill-amber-500" />
                              <span className="font-bold text-gray-800 dark:text-gray-200">{product.rating}</span>
                              <span className="text-gray-400">({product.reviewsCount} reviews)</span>
                            </div>
                          </div>

                          <div className="pt-4 mt-4 border-t border-gray-100 dark:border-[#222222] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div className="flex-1 space-y-1.5">
                              <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider block">
                                {translate({ ar: 'اختر الحجم للإضافة السريعة للسلة:', fr: 'Choix du format (Ajout direct) :', en: 'Select format (Quick add):' })}
                              </span>
                              <div className="flex flex-wrap gap-2">
                                {product.weightPrices.map((wp, idx) => (
                                  <button
                                    key={idx}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      addToCart(product, wp.weight, wp.price, 1);
                                    }}
                                    className="bg-[#FDFBF7] dark:bg-[#1A1A1A] hover:bg-[#C89B3C] dark:hover:bg-[#C89B3C] text-gray-900 dark:text-gray-100 hover:text-black dark:hover:text-black border border-[#C89B3C]/40 py-2 px-3 rounded-xl text-xs transition-all duration-200 flex items-center gap-1.5 font-sans shadow-xs hover:shadow-md group/btn cursor-pointer"
                                    title={`Ajouter ${wp.weight} au panier`}
                                  >
                                    <span className="font-extrabold text-xs">{wp.weight}</span>
                                    <span className="text-[11px] text-[#C89B3C] group-hover/btn:text-black font-mono font-bold">• {formatPrice(wp.price)}</span>
                                    <ShoppingBag size={12} className="opacity-70 group-hover/btn:opacity-100 ml-0.5" />
                                  </button>
                                ))}
                              </div>
                            </div>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleWishlist(product);
                              }}
                              className={`w-10 h-10 shrink-0 rounded-full border border-gray-200 dark:border-[#222222] flex items-center justify-center transition hover:bg-[#FDFBF7] ${isWish ? 'text-red-500 border-red-200' : 'text-gray-400 hover:text-black'}`}
                            >
                              <Star size={16} className={isWish ? 'fill-red-500' : ''} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  // Default Grid views (grid3 / grid4)
                  return (
                    <div
                      key={product.id}
                      onClick={() => onNavigate('product-detail', { productId: product.id })}
                      className="bg-white dark:bg-[#111111] rounded-2xl overflow-hidden border border-gray-200 dark:border-[#222222] shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col group relative"
                    >
                      {/* Heart Wishlist Trigger */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(product);
                        }}
                        className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/95 dark:bg-black/90 flex items-center justify-center shadow-md hover:scale-110 transition ${
                          isWish ? 'text-red-500' : 'text-gray-400 hover:text-black dark:hover:text-white'
                        }`}
                      >
                        <Star size={14} className={isWish ? 'fill-red-500 text-red-500' : ''} />
                      </button>

                      {/* Sale/New stickers */}
                      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 text-[9px] font-black uppercase">
                        {hasDiscount && <span className="bg-[#1B4332] text-white px-2 py-0.5 rounded">PROMO</span>}
                        {product.isNew && <span className="bg-[#C89B3C] text-black px-2 py-0.5 rounded">NEW</span>}
                      </div>

                      {/* Image Frame */}
                      <div className="aspect-square overflow-hidden relative">
                        <img
                          src={product.images[0]}
                          alt={translate(product.name)}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Body Info */}
                      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-[#C89B3C] tracking-wider uppercase block">
                            {translate(product.categoryName)}
                          </span>
                          <h4 className="font-sans font-extrabold text-sm text-gray-900 dark:text-white line-clamp-1 group-hover:text-[#C89B3C] transition">
                            {translate(product.name)}
                          </h4>
                          <p className="text-gray-500 text-[11px] line-clamp-2 leading-relaxed">
                            {translate(product.shortDescription)}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-gray-100 dark:border-[#222222] space-y-2">
                          <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider block">
                            {translate({ ar: 'اختر الحجم للإضافة السريعة:', fr: 'Format au choix (Ajout direct) :', en: 'Select size (Quick add):' })}
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {product.weightPrices.map((wp, idx) => (
                              <button
                                key={idx}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  addToCart(product, wp.weight, wp.price, 1);
                                }}
                                className="flex-1 min-w-[70px] bg-[#FDFBF7] dark:bg-[#1A1A1A] hover:bg-[#C89B3C] dark:hover:bg-[#C89B3C] text-gray-900 dark:text-gray-100 hover:text-black dark:hover:text-black border border-[#C89B3C]/40 py-1.5 px-2 rounded-xl transition-all duration-200 flex flex-col items-center justify-center font-sans shadow-xs hover:shadow-md group/btn cursor-pointer"
                                title={`Ajouter ${wp.weight} - ${formatPrice(wp.price)} au panier`}
                              >
                                <span className="font-extrabold text-[11px] leading-tight">{wp.weight}</span>
                                <span className="text-[10px] text-[#C89B3C] group-hover/btn:text-black font-mono font-bold leading-tight">{formatPrice(wp.price)}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* MOBILE FILTER BOTTOM DRAWER */}
      {isFilterDrawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 overflow-hidden font-sans">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsFilterDrawerOpen(false)} />
          <div className="absolute bottom-0 inset-x-0 bg-white dark:bg-[#111111] max-h-[85vh] rounded-t-3xl overflow-y-auto p-6 space-y-6 flex flex-col animate-slide-up text-gray-800 dark:text-white">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-[#222222]">
              <span className="font-extrabold text-[#C89B3C] flex items-center gap-1.5 text-base">
                <SlidersHorizontal size={16} />
                <span>{translate({ ar: 'خيارات التصفية الفاخرة', fr: 'Filtres de Sélection', en: 'Filter Selection' })}</span>
              </span>
              <button
                onClick={() => setIsFilterDrawerOpen(false)}
                className="text-gray-400 hover:text-white p-2 hover:bg-gray-100 dark:hover:bg-[#222222] rounded-full transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* Category selection */}
            <div className="space-y-2">
              <span className="font-bold text-xs text-gray-500 uppercase block">{translate({ ar: 'الفئة الغذائية', fr: 'Famille d\'Épices', en: 'Spice Category' })}</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`py-2 px-3 border rounded-xl text-xs font-bold transition text-center ${
                    selectedCategory === 'all'
                      ? 'border-[#C89B3C] bg-[#C89B3C]/10 text-[#C89B3C]'
                      : 'border-gray-200 dark:border-[#222222] text-gray-600 dark:text-gray-300'
                  }`}
                >
                  {translate({ ar: 'الكل', fr: 'Tous les produits', en: 'All Categories' })}
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`py-2 px-3 border rounded-xl text-xs font-bold transition text-center ${
                      selectedCategory === cat.id
                        ? 'border-[#C89B3C] bg-[#C89B3C]/10 text-[#C89B3C]'
                        : 'border-gray-200 dark:border-[#222222] text-gray-600 dark:text-gray-300'
                    }`}
                  >
                    {translate(cat.name)}
                  </button>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100 dark:border-[#222222]">
              <button
                onClick={handleResetFilters}
                className="py-3 px-4 rounded-xl text-xs font-extrabold bg-[#F9F6F0] text-black border border-gray-200 dark:border-transparent text-center"
              >
                {translate({ ar: 'إعادة تعيين الكل', fr: 'Tout effacer', en: 'Reset All' })}
              </button>
              <button
                onClick={() => setIsFilterDrawerOpen(false)}
                className="py-3 px-4 rounded-xl text-xs font-extrabold bg-[#C89B3C] text-black text-center shadow-md"
              >
                {translate({ ar: 'تطبيق التصفية', fr: 'Appliquer', en: 'Apply Filters' })}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

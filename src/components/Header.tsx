import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/products';
import { Logo } from './Logo';
import {
  ShoppingBag,
  Heart,
  User,
  Search,
  Menu,
  X,
  ChevronDown,
  Moon,
  Sun,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  Sparkles,
  Info,
  Check,
  BookOpen
} from 'lucide-react';
import { Product } from '../types';

interface HeaderProps {
  onNavigate: (page: string, params?: any) => void;
  currentPage: string;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
  const {
    language,
    setLanguage,
    currency,
    setCurrency,
    theme,
    setTheme,
    cart,
    updateCartQuantity,
    removeFromCart,
    wishlist,
    toggleWishlist,
    formatPrice,
    translate,
    currentUser,
    logout,
    activeCoupon,
    applyCoupon,
    removeCoupon,
    products
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [couponCode, setCouponCode] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCategoryTab, setActiveCategoryTab] = useState<string | null>(null);

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Scroll detection for sticky luxury styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Live search handler
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const query = searchQuery.toLowerCase();
      const filtered = products.filter((product) => {
        const arName = product.name.ar.toLowerCase();
        const frName = product.name.fr.toLowerCase();
        const enName = product.name.en.toLowerCase();
        const cat = product.category.toLowerCase();
        return arName.includes(query) || frName.includes(query) || enName.includes(query) || cat.includes(query);
      });
      setSearchResults(filtered.slice(0, 5));
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  // Focus search input when search bar opens
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [isSearchOpen]);

  // Calculations for Cart Drawer
  const cartSubtotal = cart.reduce((acc, item) => acc + item.selectedPrice * item.quantity, 0);
  const discountAmount = activeCoupon
    ? activeCoupon.discountType === 'percentage'
      ? (cartSubtotal * activeCoupon.value) / 100
      : activeCoupon.value
    : 0;
  const isFreeDelivery = cartSubtotal >= 5000;
  const shippingFee = cart.length === 0 ? 0 : isFreeDelivery ? 0 : 600; // 600 DA standard shipping inside Algeria
  const cartTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim()) {
      applyCoupon(couponCode);
      setCouponCode('');
    }
  };

  const selectSearchResult = (product: Product) => {
    setSearchQuery('');
    setIsSearchOpen(false);
    onNavigate('product-detail', { productId: product.id });
  };

  const navItems = [
    { id: 'home', label: { ar: 'الرئيسية', fr: 'Accueil', en: 'Home' } },
    { id: 'shop', label: { ar: 'المتجر', fr: 'Boutique', en: 'Shop' } },
    { id: 'recipes', label: { ar: 'وصفات الطبخ', fr: 'Recettes', en: 'Recipes' } },
    { id: 'contact', label: { ar: 'تتبع الطلب', fr: 'Suivi de commande', en: 'Order Tracking' } }
  ];

  return (
    <>
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="w-full bg-[#111111] text-[#C89B3C] border-b border-[#222222] text-xs py-2 px-4 flex justify-end items-center z-50 relative font-sans">
        {/* Global Selectors */}
        <div className="flex items-center gap-6">
          {/* Language Switcher */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLanguage('ar')}
              className={`hover:text-white transition ${language === 'ar' ? 'font-bold underline text-white' : 'opacity-80'}`}
            >
              العربية
            </button>
            <span className="text-[#333333]">|</span>
            <button
              onClick={() => setLanguage('fr')}
              className={`hover:text-white transition ${language === 'fr' ? 'font-bold underline text-white' : 'opacity-80'}`}
            >
              Français
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER */}
      <header
        className={`w-full sticky top-0 z-40 transition-all duration-300 font-sans border-b ${
          isScrolled
            ? 'bg-[#111111] text-white py-3 shadow-lg border-[#C89B3C]/20'
            : 'bg-[#111111]/95 text-white py-5 border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
          {/* Mobile Menu Icon */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-[#C89B3C] p-1 hover:bg-[#222222] rounded transition"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo (El Boukhari) */}
          <div className="cursor-pointer" onClick={() => onNavigate('home')}>
            <Logo size={isScrolled ? 50 : 60} variant="gold" showText={true} />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 font-sans font-medium text-sm tracking-wide">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`hover:text-[#C89B3C] transition-colors relative py-2 group ${
                    isActive ? 'text-[#C89B3C] font-semibold' : 'text-gray-300'
                  }`}
                >
                  {translate(item.label)}
                  <span
                    className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#C89B3C] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${
                      isActive ? 'scale-x-100' : ''
                    }`}
                  />
                </button>
              );
            })}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-3 md:gap-5">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="text-gray-300 hover:text-[#C89B3C] p-2 hover:bg-[#222222] rounded-full transition"
              title="Search Spices"
            >
              <Search size={20} />
            </button>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="bg-[#C89B3C] text-black hover:bg-[#E2B755] p-2 md:px-4 md:py-2 rounded-full transition flex items-center gap-2 font-bold text-sm shadow-md"
              title="Shopping Cart"
            >
              <ShoppingBag size={18} />
              <span className="hidden sm:inline">
                {cart.length > 0 ? formatPrice(cartSubtotal) : translate({ ar: 'السلة', fr: 'Panier', en: 'Cart' })}
              </span>
              {cart.length > 0 && (
                <span className="bg-black text-[#C89B3C] text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-black">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* 3. LIVE SEARCH MODAL OVERLAY */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex flex-col pt-20 px-4 animate-fade-in font-sans">
          <div className="max-w-3xl mx-auto w-full">
            <div className="flex items-center justify-between border-b border-[#333333] pb-4">
              <span className="text-xl font-bold text-[#C89B3C] tracking-wide">
                {translate({
                  ar: 'البحث عن التوابل الفاخرة',
                  fr: 'Rechercher des Épices de Luxe',
                  en: 'Search Premium Spices'
                })}
              </span>
              <button
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchQuery('');
                }}
                className="text-gray-400 hover:text-white p-2 hover:bg-[#222222] rounded-full transition"
              >
                <X size={24} />
              </button>
            </div>

            {/* Input Bar */}
            <div className="relative mt-6">
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={translate({
                  ar: 'اكتب اسم تابل، بلد المنشأ، أو المكونات...',
                  fr: 'Rechercher safran, cumin, ras el hanout...',
                  en: 'Type saffron, cumin, blends, origin...'
                })}
                className="w-full bg-[#111111] text-white placeholder-gray-500 border border-[#333333] focus:border-[#C89B3C] focus:outline-none py-4 pl-12 pr-6 rounded-xl text-lg transition-all shadow-inner"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white text-xs"
                >
                  {translate({ ar: 'مسح', fr: 'Effacer', en: 'Clear' })}
                </button>
              )}
            </div>

            {/* Live Search Results */}
            <div className="mt-8">
              {searchQuery.trim().length <= 1 ? (
                <div className="text-gray-500 text-sm">
                  <p className="font-semibold text-gray-400 mb-3">
                    {translate({ ar: 'عمليات البحث الشائعة:', fr: 'Recherches populaires:', en: 'Popular searches:' })}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['Ras El Hanout', 'Safran', 'Cumin', 'Chorba', 'Graines', 'Thym'].map((pop) => (
                      <button
                        key={pop}
                        onClick={() => setSearchQuery(pop)}
                        className="bg-[#222222] text-gray-300 hover:bg-[#C89B3C] hover:text-black transition-colors px-3 py-1.5 rounded-full text-xs"
                      >
                        {pop}
                      </button>
                    ))}
                  </div>
                </div>
              ) : searchResults.length > 0 ? (
                <div className="bg-[#181818] rounded-xl overflow-hidden border border-[#222222]">
                  {searchResults.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => selectSearchResult(product)}
                      className="flex items-center gap-4 p-4 hover:bg-[#222222] cursor-pointer transition border-b border-[#222222] last:border-0"
                    >
                      <img
                        src={product.images[0]}
                        alt={translate(product.name)}
                        className="w-16 h-16 object-cover rounded-lg border border-[#333333]"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-white text-sm md:text-base truncate">{translate(product.name)}</p>
                        <p className="text-[#C89B3C] text-xs font-mono tracking-wider">{translate(product.categoryName)}</p>
                        <p className="text-gray-400 text-xs truncate">{translate(product.shortDescription)}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-[#C89B3C] font-bold text-sm">
                          {formatPrice(product.weightPrices[0].price)}
                        </span>
                        <p className="text-gray-500 text-[10px]">{product.weightPrices[0].weight}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-400">
                  <Info className="mx-auto mb-3 text-gray-600" size={32} />
                  <p>
                    {translate({
                      ar: 'لم نجد أي توابل مطابقة للبحث...',
                      fr: 'Aucun résultat trouvé pour votre recherche...',
                      en: 'No premium spices matched your search...'
                    })}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 4. WISHLIST SIDE DRAWER */}
      {isWishlistOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden font-sans">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsWishlistOpen(false)} />
          <div className="absolute inset-y-0 right-0 max-w-md w-full bg-[#111111] border-l border-[#C89B3C]/20 shadow-2xl flex flex-col animate-slide-left">
            {/* Drawer Header */}
            <div className="p-6 border-b border-[#222222] flex items-center justify-between bg-black">
              <div className="flex items-center gap-2 text-[#C89B3C]">
                <Heart className="fill-[#C89B3C]" size={22} />
                <h3 className="font-bold text-lg text-white">
                  {translate({ ar: 'المفضلة الفاخرة', fr: 'Mes Favoris', en: 'My Wishlist' })}
                </h3>
              </div>
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="text-gray-400 hover:text-white p-2 hover:bg-[#222222] rounded-full transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Wishlist Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {wishlist.length === 0 ? (
                <div className="text-center py-20 text-gray-500">
                  <Heart className="mx-auto mb-4 text-gray-700" size={48} />
                  <p className="font-bold text-white mb-1">
                    {translate({ ar: 'المفضلة فارغة', fr: 'Votre liste est vide', en: 'Wishlist is empty' })}
                  </p>
                  <p className="text-xs text-gray-500">
                    {translate({
                      ar: 'تصفح متجرنا وأضف التوابل التي تود اقتناءها لاحقاً.',
                      fr: 'Parcourez la boutique et ajoutez des épices de choix.',
                      en: 'Browse our boutique and save luxury items for later.'
                    })}
                  </p>
                  <button
                    onClick={() => {
                      setIsWishlistOpen(false);
                      onNavigate('shop');
                    }}
                    className="mt-6 bg-[#C89B3C] text-black text-xs font-bold px-6 py-2.5 rounded-full hover:bg-white transition"
                  >
                    {translate({ ar: 'تصفح المتجر الآن', fr: 'Visiter la boutique', en: 'Visit shop now' })}
                  </button>
                </div>
              ) : (
                wishlist.map((product) => (
                  <div
                    key={product.id}
                    className="flex gap-4 p-3 bg-[#181818] border border-[#222222] rounded-xl hover:border-[#C89B3C]/30 transition"
                  >
                    <img
                      src={product.images[0]}
                      alt={translate(product.name)}
                      className="w-20 h-20 object-cover rounded-lg border border-[#222222]"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-white text-sm truncate">{translate(product.name)}</p>
                      <p className="text-gray-400 text-xs truncate">{translate(product.shortDescription)}</p>
                      <p className="text-[#C89B3C] font-mono font-bold text-sm mt-1">
                        {formatPrice(product.weightPrices[0].price)}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => {
                            setIsWishlistOpen(false);
                            onNavigate('product-detail', { productId: product.id });
                          }}
                          className="bg-[#C89B3C] hover:bg-white text-black font-extrabold text-[10px] px-3 py-1 rounded-full transition"
                        >
                          {translate({ ar: 'عرض المنتج', fr: 'Voir produit', en: 'View Product' })}
                        </button>
                        <button
                          onClick={() => toggleWishlist(product)}
                          className="text-red-500 hover:text-red-400 p-1.5 hover:bg-red-500/10 rounded-full transition"
                          title="Remove"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* 5. CART SIDE DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden font-sans">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
          <div className="absolute inset-y-0 right-0 max-w-md w-full bg-[#111111] border-l border-[#C89B3C]/20 shadow-2xl flex flex-col animate-slide-left">
            {/* Drawer Header */}
            <div className="p-6 border-b border-[#222222] flex items-center justify-between bg-black">
              <div className="flex items-center gap-2 text-[#C89B3C]">
                <ShoppingBag size={22} />
                <h3 className="font-bold text-lg text-white">
                  {translate({ ar: 'سلة المشتريات الفخمة', fr: 'Mon Panier', en: 'My Cart' })}
                </h3>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-gray-400 hover:text-white p-2 hover:bg-[#222222] rounded-full transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-20 text-gray-500">
                  <ShoppingBag className="mx-auto mb-4 text-gray-700" size={48} />
                  <p className="font-bold text-white mb-1">
                    {translate({ ar: 'السلة فارغة', fr: 'Votre panier est vide', en: 'Cart is empty' })}
                  </p>
                  <p className="text-xs text-gray-500">
                    {translate({
                      ar: 'أضف بعض بهاراتنا ونكهاتنا الفاخرة إلى سلتك لتبدأ الطهي الرفيع.',
                      fr: 'Ajoutez nos épices nobles et commencez votre voyage culinaire.',
                      en: 'Add our premium spices and start your grand cooking journey.'
                    })}
                  </p>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      onNavigate('shop');
                    }}
                    className="mt-6 bg-[#C89B3C] text-black text-xs font-bold px-6 py-2.5 rounded-full hover:bg-white transition"
                  >
                    {translate({ ar: 'تصفح توابلنا الآن', fr: 'Visiter la boutique', en: 'Shop our spices' })}
                  </button>
                </div>
              ) : (
                cart.map((item, idx) => (
                  <div
                    key={`${item.product.id}-${item.selectedWeight}-${idx}`}
                    className="flex gap-4 p-3 bg-[#181818] border border-[#222222] rounded-xl relative"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={translate(item.product.name)}
                      className="w-16 h-16 object-cover rounded-lg border border-[#222222]"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-white text-xs md:text-sm truncate">{translate(item.product.name)}</p>
                      <div className="flex items-center gap-2 mt-0.5 text-[10px] text-gray-400">
                        <span className="bg-[#222222] text-[#C89B3C] font-mono px-2 py-0.5 rounded-md">
                          {item.selectedWeight}
                        </span>
                        <span>{formatPrice(item.selectedPrice)} / u</span>
                      </div>
                      <p className="text-[#C89B3C] font-mono font-bold text-sm mt-1">
                        {formatPrice(item.selectedPrice * item.quantity)}
                      </p>

                      {/* Quantity Controller */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center bg-black border border-[#333333] rounded-md overflow-hidden">
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.selectedWeight, item.quantity - 1)}
                            className="p-1.5 text-gray-400 hover:text-[#C89B3C] hover:bg-[#222222] transition"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="px-3 text-xs font-bold text-white">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.selectedWeight, item.quantity + 1)}
                            className="p-1.5 text-gray-400 hover:text-[#C89B3C] hover:bg-[#222222] transition"
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedWeight)}
                          className="text-red-500 hover:text-red-400 p-1.5 hover:bg-red-500/10 rounded-full transition"
                          title="Delete item"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Cart Drawer Footer with order sums */}
            {cart.length > 0 && (
              <div className="p-6 bg-black border-t border-[#222222] space-y-4">
                {/* Free Shipping Progress Indicator */}
                <div className="bg-[#181818] p-3 rounded-lg border border-[#222222] text-xs">
                  {isFreeDelivery ? (
                    <div className="flex items-center gap-1.5 text-emerald-500 font-bold justify-center">
                      <Check size={14} />
                      <span>
                        {translate({
                          ar: 'تهانينا! لقد حصلت على توصيل مجاني لموقعك',
                          fr: 'Félicitations ! Livraison gratuite débloquée',
                          en: 'Congratulations! Free delivery unlocked'
                        })}
                      </span>
                    </div>
                  ) : (
                    <div className="text-center">
                      <p className="text-gray-400">
                        {translate({ ar: 'أضف', fr: 'Ajoutez', en: 'Add' })}{' '}
                        <span className="text-[#C89B3C] font-bold font-mono">{formatPrice(5000 - cartSubtotal)}</span>{' '}
                        {translate({
                          ar: 'للحصول على توصيل مجاني لـ 58 ولاية!',
                          fr: 'pour obtenir la livraison gratuite !',
                          en: 'to get free delivery to 58 Wilayas!'
                        })}
                      </p>
                      <div className="w-full bg-[#333333] h-1.5 rounded-full overflow-hidden mt-2">
                        <div
                          className="bg-[#C89B3C] h-full transition-all duration-500"
                          style={{ width: `${Math.min(100, (cartSubtotal / 5000) * 100)}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Promo Code Input Form */}
                {activeCoupon ? (
                  <div className="bg-[#1B4332]/20 border border-emerald-500/30 p-2.5 rounded-lg flex items-center justify-between text-xs">
                    <span className="text-emerald-500 font-bold">
                      {activeCoupon.code} (-
                      {activeCoupon.discountType === 'percentage'
                        ? `${activeCoupon.value}%`
                        : formatPrice(activeCoupon.value)}
                      )
                    </span>
                    <button onClick={removeCoupon} className="text-red-500 hover:text-red-400 font-bold underline">
                      {translate({ ar: 'إزالة', fr: 'Retirer', en: 'Remove' })}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder={translate({
                        ar: 'كود الخصم',
                        fr: 'Code promo',
                        en: 'Promo code'
                      })}
                      className="flex-1 bg-[#181818] border border-[#333333] focus:border-[#C89B3C] focus:outline-none px-3 py-2 rounded-lg text-xs text-white"
                    />
                    <button
                      type="submit"
                      className="bg-[#C89B3C] hover:bg-white text-black font-extrabold text-xs px-4 py-2 rounded-lg transition"
                    >
                      {translate({ ar: 'تطبيق', fr: 'Appliquer', en: 'Apply' })}
                    </button>
                  </form>
                )}

                {/* Bill totals */}
                <div className="space-y-2 border-b border-[#222222] pb-4 text-sm font-sans">
                  <div className="flex justify-between text-gray-400">
                    <span>{translate({ ar: 'المجموع الفرعي', fr: 'Sous-total', en: 'Subtotal' })}</span>
                    <span className="font-mono text-white">{formatPrice(cartSubtotal)}</span>
                  </div>
                  {activeCoupon && (
                    <div className="flex justify-between text-emerald-500">
                      <span>{translate({ ar: 'الخصم', fr: 'Remise', en: 'Discount' })}</span>
                      <span className="font-mono">-{formatPrice(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-400">
                    <span>{translate({ ar: 'تكلفة التوصيل', fr: 'Frais de livraison', en: 'Shipping' })}</span>
                    <span className="font-mono text-white">
                      {shippingFee === 0
                        ? translate({ ar: 'مجاني', fr: 'Gratuit', en: 'Free' })
                        : formatPrice(shippingFee)}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center text-lg font-bold text-white font-sans py-2">
                  <span>{translate({ ar: 'الإجمالي', fr: 'Total', en: 'Total' })}</span>
                  <span className="font-mono text-[#C89B3C] text-xl">{formatPrice(cartTotal)}</span>
                </div>

                {/* Checkout button */}
                <div className="grid grid-cols-1 gap-2 pt-2">
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      onNavigate('checkout');
                    }}
                    className="w-full bg-[#C89B3C] text-black hover:bg-white font-black py-3 px-6 rounded-full text-center transition flex items-center justify-center gap-2 group shadow-xl"
                  >
                    <span>{translate({ ar: 'إتمام الطلب الآن', fr: 'Passer à la caisse', en: 'Proceed to Checkout' })}</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      onNavigate('cart');
                    }}
                    className="w-full text-center text-gray-400 hover:text-white text-xs font-semibold underline py-1"
                  >
                    {translate({ ar: 'عرض وتعديل السلة بالكامل', fr: 'Voir le panier complet', en: 'View full cart' })}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 6. RESPONSIVE MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/95 backdrop-blur-md pt-24 pb-8 px-6 flex flex-col font-sans animate-fade-in">
          {/* Quick Language switchers for mobile */}
          <div className="flex justify-around items-center bg-[#111111] p-3 rounded-xl border border-[#222222] mb-6 text-sm text-[#C89B3C]">
            <button onClick={() => setLanguage('ar')} className={language === 'ar' ? 'font-black underline' : 'opacity-70'}>
              العربية
            </button>
            <button onClick={() => setLanguage('fr')} className={language === 'fr' ? 'font-black underline' : 'opacity-70'}>
              Français
            </button>
          </div>

          <div className="flex-1 flex flex-col gap-6 text-lg font-bold tracking-wide">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onNavigate(item.id);
                }}
                className={`text-left rtl:text-right py-2 border-b border-[#222222] flex items-center justify-between ${
                  currentPage === item.id ? 'text-[#C89B3C]' : 'text-gray-300'
                }`}
              >
                <span>{translate(item.label)}</span>
                <ArrowRight size={16} className="opacity-55" />
              </button>
            ))}
          </div>

          {/* Currency + Theme quick select in mobile footer */}
          <div className="mt-auto pt-6 border-t border-[#222222] flex items-center justify-between text-xs text-gray-400">
            <div className="flex gap-4">
              {(['DZD', 'EUR', 'USD'] as const).map((curr) => (
                <button
                  key={curr}
                  onClick={() => setCurrency(curr)}
                  className={`font-mono text-sm ${currency === curr ? 'text-[#C89B3C] font-bold underline' : 'opacity-60'}`}
                >
                  {curr}
                </button>
              ))}
            </div>
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="bg-[#181818] p-2.5 rounded-full border border-[#333333] text-white flex items-center gap-1.5"
            >
              {theme === 'light' ? <Moon size={14} /> : <Sun size={14} />}
              <span>{theme === 'light' ? 'Sombre' : 'Clair'}</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

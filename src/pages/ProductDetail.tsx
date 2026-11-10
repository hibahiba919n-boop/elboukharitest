import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/products';
import { Product, ProductWeightPrice } from '../types';
import {
  Star,
  ShoppingBag,
  Heart,
  Truck,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  MapPin,
  Flame,
  Info
} from 'lucide-react';

interface ProductDetailProps {
  productId: string;
  onNavigate: (page: string, params?: any) => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ productId, onNavigate }) => {
  const { translate, formatPrice, addToCart, toggleWishlist, wishlist, addToRecentlyViewed, products } = useApp();

  const [product, setProduct] = useState<Product | null>(null);
  const [activeImage, setActiveImage] = useState<string>('');
  const [selectedFormat, setSelectedFormat] = useState<ProductWeightPrice | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeAccordion, setActiveAccordion] = useState<string>('desc');

  // Load product
  useEffect(() => {
    const found = products.find((p) => p.id === productId);
    if (found) {
      setProduct(found);
      setActiveImage(found.images[0]);
      setSelectedFormat(found.weightPrices[0]);
      setQuantity(1);
      addToRecentlyViewed(found);
    }
  }, [productId, products]);

  if (!product || !selectedFormat) {
    return (
      <div className="w-full text-center py-20 text-gray-500 font-sans">
        <p>{translate({ ar: 'جاري تحميل تفاصيل التابل...', fr: 'Chargement du produit...', en: 'Loading product details...' })}</p>
      </div>
    );
  }

  const isWish = wishlist.some((item) => item.id === product.id);
  const hasDiscount = !!selectedFormat.oldPrice;

  // Related products
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, selectedFormat.weight, selectedFormat.price, quantity);
  };

  const toggleAccordion = (section: string) => {
    setActiveAccordion(activeAccordion === section ? '' : section);
  };

  return (
    <div className="w-full min-h-screen bg-[#FDFBF7] dark:bg-[#030807] text-[#111111] dark:text-gray-100 py-12 px-4 md:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Back Link Breadcrumb */}
        <div className="text-xs text-gray-400 flex items-center gap-2">
          <button onClick={() => onNavigate('home')} className="hover:text-[#C89B3C] transition">
            {translate({ ar: 'الرئيسية', fr: 'Accueil', en: 'Home' })}
          </button>
          <span>/</span>
          <button onClick={() => onNavigate('shop')} className="hover:text-[#C89B3C] transition">
            {translate({ ar: 'المتجر', fr: 'Boutique', en: 'Shop' })}
          </button>
          <span>/</span>
          <button onClick={() => onNavigate('shop', { category: product.category })} className="hover:text-[#C89B3C] transition">
            {translate(product.categoryName)}
          </button>
          <span>/</span>
          <span className="text-gray-600 dark:text-gray-200 font-bold truncate max-w-[150px]">{translate(product.name)}</span>
        </div>

        {/* 1. PRODUCT METADATA SPLIT BLOCK */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* GALLERY PANEL (lg:col-span-6) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="aspect-square bg-white dark:bg-[#111111] rounded-3xl overflow-hidden border border-gray-100 dark:border-[#222222] shadow-sm relative group">
              <img
                src={activeImage}
                alt={translate(product.name)}
                className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              {/* Sale stamp */}
              {hasDiscount && (
                <span className="absolute top-4 left-4 bg-[#1B4332] text-white text-[10px] font-black uppercase px-3 py-1.5 rounded-lg">
                  {translate({ ar: 'خصم حقيقي', fr: 'Promo Spéciale', en: 'Sale Special' })}
                </span>
              )}
            </div>

            {/* Thumbnails selector */}
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`aspect-square rounded-2xl overflow-hidden border-2 cursor-pointer transition ${
                    activeImage === img ? 'border-[#C89B3C]' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              ))}
            </div>
          </div>

          {/* DETAILED PURCHASING PANEL (lg:col-span-6) */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Category / Rating Row */}
            <div className="flex justify-between items-center text-xs">
              <span className="bg-[#C89B3C]/10 text-[#C89B3C] font-mono tracking-widest font-extrabold uppercase px-3 py-1 rounded-md">
                {translate(product.categoryName)}
              </span>

              {/* Stars summary */}
              <div className="flex items-center gap-1.5 text-amber-500">
                <Star size={14} className="fill-amber-500" />
                <span className="font-bold text-gray-800 dark:text-gray-100">{product.rating}</span>
                <span className="text-gray-400">({product.reviewsCount} reviews)</span>
              </div>
            </div>

            {/* Product Title */}
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-sans font-extrabold tracking-tight">
                {translate(product.name)}
              </h1>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                {translate(product.shortDescription)}
              </p>
            </div>

            {/* Price Frame */}
            <div className="p-4 bg-[#F9F6F0] dark:bg-[#111111] rounded-2xl border border-gray-100 dark:border-[#222222] flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 font-mono">
                  <span className="text-2xl md:text-3xl font-black text-[#C89B3C]">
                    {formatPrice(selectedFormat.price)}
                  </span>
                  {hasDiscount && (
                    <span className="text-gray-400 line-through text-sm">
                      {formatPrice(selectedFormat.oldPrice!)}
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-gray-400 font-mono">
                  Format: {selectedFormat.weight} ({translate({ ar: 'طحن بارد طازج', fr: 'Fraîchement moulu', en: 'Fresh cold grind' })})
                </span>
              </div>

              {/* Stock status indicator */}
              <div className="text-right">
                {selectedFormat.stock > 0 ? (
                  <span className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-500 text-xs font-bold px-2.5 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                    <span>{translate({ ar: 'متوفر بالمخزن', fr: 'En Stock', en: 'In Stock' })}</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 bg-red-500/10 text-red-500 text-xs font-bold px-2.5 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                    <span>{translate({ ar: 'نفدت الكمية', fr: 'En rupture', en: 'Out of Stock' })}</span>
                  </span>
                )}
                <p className="text-[10px] text-gray-500 font-mono mt-1">
                  {selectedFormat.stock} {translate({ ar: 'عبوة متبقية', fr: 'unités restantes', en: 'units left' })}
                </p>
              </div>
            </div>

            {/* Format Weight Selector Tabs */}
            <div className="space-y-3">
              <span className="text-xs font-extrabold text-gray-500 uppercase tracking-widest block">
                {translate({ ar: 'اختر الوزن والتعبئة', fr: 'Sélectionnez le format', en: 'Select Format Weight' })}
              </span>
              <div className="flex flex-wrap gap-2">
                {product.weightPrices.map((wp, idx) => {
                  const isSelected = selectedFormat.weight === wp.weight;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedFormat(wp)}
                      className={`px-4 py-2.5 border rounded-xl font-mono font-bold text-xs md:text-sm transition flex flex-col items-center min-w-[80px] ${
                        isSelected
                          ? 'border-[#C89B3C] bg-[#C89B3C]/10 text-[#C89B3C] shadow-sm'
                          : 'border-gray-200 dark:border-[#222222] text-gray-500 hover:border-[#C89B3C]'
                      }`}
                    >
                      <span>{wp.weight}</span>
                      <span className="text-[10px] opacity-75 mt-0.5">{formatPrice(wp.price)}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity and Actions Split Row */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-gray-100 dark:border-[#222222]">
              {/* Quantity selectors */}
              <div className="flex items-center border border-gray-200 dark:border-[#222222] bg-white dark:bg-[#111111] rounded-full p-1.5">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-[#222222] flex items-center justify-center font-bold text-gray-500 hover:text-[#C89B3C] transition"
                >
                  -
                </button>
                <span className="px-5 text-sm font-bold font-mono text-center min-w-[40px]">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(selectedFormat.stock, quantity + 1))}
                  className="w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-[#222222] flex items-center justify-center font-bold text-gray-500 hover:text-[#C89B3C] transition"
                >
                  +
                </button>
              </div>

              {/* Wishlist Icon toggle */}
              <button
                onClick={() => toggleWishlist(product)}
                className={`w-14 h-14 rounded-full border border-gray-200 dark:border-[#222222] flex items-center justify-center hover:scale-105 transition shadow-sm bg-white dark:bg-black ${
                  isWish ? 'text-red-500 border-red-200' : 'text-gray-400 hover:text-[#C89B3C]'
                }`}
                title="Add to Wishlist"
              >
                <Star className={isWish ? 'fill-red-500 text-red-500' : ''} size={20} />
              </button>

              {/* Core Add to Cart button */}
              <button
                onClick={handleAddToCart}
                disabled={selectedFormat.stock === 0}
                className="flex-1 min-w-[200px] bg-[#C89B3C] text-black hover:bg-black hover:text-[#C89B3C] dark:hover:bg-white dark:hover:text-black font-black py-4 px-6 rounded-full transition flex items-center justify-center gap-2 shadow-xl hover:shadow-[#C89B3C]/15 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
              >
                <ShoppingBag size={18} />
                <span>{translate({ ar: 'أضف إلى سلة المشتريات', fr: 'Ajouter au Panier', en: 'Add to Shopping Cart' })}</span>
              </button>
            </div>

            {/* Quick trust assurances */}
            <div className="grid grid-cols-3 gap-3 text-[10px] text-gray-400 pt-6 border-t border-gray-100 dark:border-[#222222]">
              <div className="flex items-center gap-1.5">
                <Truck size={14} className="text-[#C89B3C]" />
                <span>{translate({ ar: 'توصيل سريع لـ 58 ولاية', fr: 'Expédition 58 Wilayas', en: 'Shipment 58 Wilayas' })}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-[#C89B3C]" />
                <span>{translate({ ar: 'دفع نقدي عند الاستلام', fr: 'Paiement à la livraison', en: 'Cash On Delivery' })}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Info size={14} className="text-[#C89B3C]" />
                <span>{translate({ ar: 'نقي 100% بدون إضافات', fr: 'Épices 100% Pures', en: '100% Pure Spices' })}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. TABBED ACCORDION SPECIFICATIONS SECTION */}
        <div className="border-t border-gray-100 dark:border-[#222222] pt-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left/Middle Column Accordions */}
            <div className="lg:col-span-2 space-y-3">
              {/* Description Accordion */}
              <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#222222] rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleAccordion('desc')}
                  className="w-full p-4 text-left rtl:text-right flex items-center justify-between font-extrabold text-sm text-gray-800 dark:text-white"
                >
                  <span>{translate({ ar: 'وصف تفصيلي للتابل', fr: 'Description Détaillée', en: 'Detailed Description' })}</span>
                  {activeAccordion === 'desc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {activeAccordion === 'desc' && (
                  <div className="p-5 border-t border-gray-100 dark:border-[#222222] text-sm text-gray-500 dark:text-gray-400 leading-relaxed space-y-3">
                    <p>{translate(product.description)}</p>
                  </div>
                )}
              </div>

              {/* Ingredients Accordion */}
              <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#222222] rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleAccordion('ing')}
                  className="w-full p-4 text-left rtl:text-right flex items-center justify-between font-extrabold text-sm text-gray-800 dark:text-white"
                >
                  <span>{translate({ ar: 'المكونات والنقاوة', fr: 'Ingrédients & Pureté', en: 'Ingredients & Purity' })}</span>
                  {activeAccordion === 'ing' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {activeAccordion === 'ing' && (
                  <div className="p-5 border-t border-gray-100 dark:border-[#222222] text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    <p>{translate(product.ingredients)}</p>
                  </div>
                )}
              </div>

              {/* Origin Accordion */}
              <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#222222] rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleAccordion('orig')}
                  className="w-full p-4 text-left rtl:text-right flex items-center justify-between font-extrabold text-sm text-gray-800 dark:text-white"
                >
                  <span>{translate({ ar: 'بلد المنشأ والزراعة', fr: 'Origine & Culture Terroir', en: 'Origin & Terroir Sourcing' })}</span>
                  {activeAccordion === 'orig' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {activeAccordion === 'orig' && (
                  <div className="p-5 border-t border-gray-100 dark:border-[#222222] text-sm text-gray-500 dark:text-gray-400 leading-relaxed flex items-center gap-3">
                    <MapPin className="text-[#C89B3C] shrink-0" size={18} />
                    <p>{translate(product.origin)}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Nutritional Information Badge card */}
            <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#222222] p-6 rounded-2xl shadow-sm space-y-4">
              <h3 className="font-extrabold text-xs text-gray-500 uppercase tracking-widest border-b border-gray-100 dark:border-[#222222] pb-2">
                {translate({ ar: 'الحقائق الغذائية لكل 100 غ', fr: 'Valeurs Nutritionnelles / 100g', en: 'Nutritional Facts per 100g' })}
              </h3>
              <div className="space-y-3.5 text-xs font-mono text-gray-600 dark:text-gray-300">
                <div className="flex justify-between border-b border-gray-50 dark:border-[#222222] pb-1.5">
                  <span>{translate({ ar: 'الطاقة', fr: 'Énergie', en: 'Energy' })}</span>
                  <span className="font-bold text-white">{product.nutritionalInfo.energy}</span>
                </div>
                <div className="flex justify-between border-b border-gray-50 dark:border-[#222222] pb-1.5">
                  <span>{translate({ ar: 'البروتينات', fr: 'Protéines', en: 'Protein' })}</span>
                  <span className="font-bold text-white">{product.nutritionalInfo.protein}</span>
                </div>
                <div className="flex justify-between border-b border-gray-50 dark:border-[#222222] pb-1.5">
                  <span>{translate({ ar: 'الدهون الكلية', fr: 'Lipides', en: 'Total Fat' })}</span>
                  <span className="font-bold text-white">{product.nutritionalInfo.fat}</span>
                </div>
                <div className="flex justify-between border-b border-gray-50 dark:border-[#222222] pb-1.5">
                  <span>{translate({ ar: 'الكربوهيدرات', fr: 'Glucides', en: 'Carbohydrates' })}</span>
                  <span className="font-bold text-white">{product.nutritionalInfo.carbohydrates}</span>
                </div>
                <div className="flex justify-between pb-1.5">
                  <span>{translate({ ar: 'الصوديوم والملح', fr: 'Sodium', en: 'Sodium' })}</span>
                  <span className="font-bold text-white">{product.nutritionalInfo.sodium}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. REVIEWS & COMMENTS */}
        <div className="border-t border-gray-100 dark:border-[#222222] pt-12 space-y-8">
          <h3 className="text-2xl font-extrabold tracking-tight">
            {translate({ ar: 'آراء وتقييمات زبائن البوخاري', fr: 'Avis de nos Clients', en: 'Customer Feedbacks' })}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Reviews Summary block (cols 4) */}
            <div className="md:col-span-4 bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#222222] p-6 rounded-2xl shadow-sm text-center space-y-4">
              <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest">
                {translate({ ar: 'معدل التقييم', fr: 'Note Moyenne', en: 'Average Score' })}
              </h4>
              <div className="space-y-1">
                <p className="text-5xl font-black text-[#C89B3C] font-mono">{product.rating}</p>
                <div className="flex justify-center text-amber-500 gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={16} className="fill-amber-500" />
                  ))}
                </div>
                <p className="text-xs text-gray-400">{product.reviewsCount} verified reviews</p>
              </div>
            </div>

            {/* Specific feedback logs (cols 8) */}
            <div className="md:col-span-8 space-y-4">
              {product.reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-5 bg-white dark:bg-[#111111] border border-gray-100 dark:border-[#222222] rounded-2xl space-y-2 text-xs md:text-sm"
                >
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-extrabold text-gray-800 dark:text-gray-100">{rev.userName}</span>
                    <span className="text-gray-400 font-mono">{rev.date}</span>
                  </div>
                  <div className="flex text-amber-500 gap-0.5">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} size={12} className="fill-amber-500" />
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed italic">
                    "{rev.comment}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4. RELATED PRODUCTS CAROUSEL */}
        {related.length > 0 && (
          <div className="border-t border-gray-100 dark:border-[#222222] pt-12 space-y-6">
            <h3 className="text-2xl font-extrabold tracking-tight text-center md:text-left rtl:md:text-right">
              {translate({ ar: 'توابل ذات صلة بالمجموعة', fr: 'Épices de la même Collection', en: 'Related Spices' })}
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {related.map((p) => {
                const basePrice = p.weightPrices[0].price;
                return (
                  <div
                    key={p.id}
                    onClick={() => onNavigate('product-detail', { productId: p.id })}
                    className="bg-white dark:bg-[#111111] rounded-2xl overflow-hidden border border-gray-100 dark:border-[#222222] shadow-sm hover:shadow-lg transition cursor-pointer flex flex-col group p-3"
                  >
                    <div className="aspect-square rounded-xl overflow-hidden">
                      <img
                        src={p.images[0]}
                        alt={translate(p.name)}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="pt-3 flex-1 flex flex-col justify-between space-y-2">
                      <h4 className="font-sans font-extrabold text-xs md:text-sm text-gray-900 dark:text-white line-clamp-1 group-hover:text-[#C89B3C] transition">
                        {translate(p.name)}
                      </h4>
                      <div className="flex justify-between items-center text-xs font-mono">
                        <span className="text-[#C89B3C] font-extrabold">{formatPrice(basePrice)}</span>
                        <span className="text-gray-400">{p.weightPrices[0].weight}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

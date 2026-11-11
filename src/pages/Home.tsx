import React from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { RECIPES } from '../data/recipes';
import {
  Sparkles,
  ShoppingBag,
  ArrowRight,
  Star,
  MapPin,
  Flame,
  Award,
  Clock,
  MessageSquare,
  ShieldCheck,
  BookOpen
} from 'lucide-react';

interface HomeProps {
  onNavigate: (page: string, params?: any) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const { translate, formatPrice, addToCart, toggleWishlist, wishlist, products, categories } = useApp();

  // Get best sellers
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 4);

  // Quick Add handler
  const handleQuickAdd = (product: any, e: React.MouseEvent) => {
    e.stopPropagation();
    const wp = product.weightPrices[0];
    addToCart(product, wp.weight, wp.price, 1);
  };

  // Testimonials
  const testimonials = [
    {
      name: 'Hadj Rachid (Restaurateur, Alger)',
      text: {
        ar: 'أنا زبون وفي للبخاري منذ سنتين. رأس الحانوت الملكي والكمون الصحراوي لا غنى عنهما في مطبخنا. الزبائن يسألون دائماً عن سر النكهة والصلصة العسلية.',
        fr: 'Je suis un client fidèle d\'El Boukhari. Le Ras El Hanout Royal et le cumin d\'Adrar sont indispensables dans mon restaurant. Les clients demandent toujours le secret de nos sauces.',
        en: "I am a devoted customer of El Boukhari. Their Royal Ras El Hanout and desert cumin are culinary essentials in my restaurant. Patrons always inquire about our secret sauces."
      },
      stars: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150'
    },
    {
      name: 'Nassima Benkhaled (Constantine)',
      text: {
        ar: 'وصلتني العلبة الخشبية الفاخرة كهدية من أختي. التقديم غاية في الأناقة، والبهارات نظيفة جداً ومطحونة بإتقان، رائحة الكزبرة ومزيج الشوربة تفوح في كل البيت.',
        fr: 'J\'ai reçu le Coffret Prestige en cadeau de ma sœur. La présentation est sublime, les épices sont extrêmement propres et fraîchement moulues. Tout le quartier sent la bonne Chorba !',
        en: 'I received the Prestige Wooden Box as a gift from my sister. The presentation is magnificent; the spices are incredibly clean and freshly ground. The entire neighborhood smells of delicious Chorba!'
      },
      stars: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150'
    }
  ];

  // Instagram gallery pictures
  const instaImages = [
    'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=300',
    'https://images.unsplash.com/photo-1532336414038-cf1905047b2b?auto=format&fit=crop&q=80&w=300',
    'https://images.unsplash.com/photo-1508747703725-719ae257c14a?auto=format&fit=crop&q=80&w=300',
    'https://images.unsplash.com/photo-1532634922-8fe0b757fb13?auto=format&fit=crop&q=80&w=300',
    'https://images.unsplash.com/photo-1588693951121-657eb4c6c0b3?auto=format&fit=crop&q=80&w=300',
    'https://images.unsplash.com/photo-1608686207856-001b95cf60ca?auto=format&fit=crop&q=80&w=300'
  ];

  // Physical showrooms in Algeria
  const boutiques = [
    {
      city: { ar: 'وهران - قديل', fr: 'Oran - Gdyel', en: 'Oran - Gdyel' },
      address: {
        ar: 'قديل، وهران، الجزائر',
        fr: 'Gdyel, Oran, Algérie',
        en: 'Gdyel, Oran, Algeria'
      },
      phone: '0781 59 10 87',
      hours: { ar: 'السبت - الخميس: 9:00 صباحاً - 8:00 مساءً', fr: 'Sam - Jeu : 09h00 - 20h00', en: 'Sat - Thu: 9:00 AM - 8:00 PM' }
    }
  ];

  return (
    <div className="w-full bg-[#FDFBF7] dark:bg-[#030807] text-[#111111] dark:text-gray-100 font-sans overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-[#0B1B17] text-white overflow-hidden py-20">
        {/* Animated Spices/Pestle luxury background */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=1600"
            alt="Luxury spices background"
            className="w-full h-full object-cover opacity-20 filter brightness-50"
            referrerPolicy="no-referrer"
          />
          {/* Golden Warm Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#030807] via-transparent to-[#0B1B17]/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#030807]/80 via-transparent to-[#030807]/80" />
        </div>

        {/* Decorative Golden Floating Sparkles / Particles */}
        <div className="absolute inset-0 pointer-events-none z-10 opacity-30">
          <div className="absolute top-10 left-1/4 w-2 h-2 bg-[#C89B3C] rounded-full animate-ping" />
          <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-[#DFBA6B] rounded-full animate-pulse" />
          <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-[#C89B3C] rounded-full animate-bounce" />
          <div className="absolute top-1/2 right-10 w-2.5 h-2.5 bg-[#C89B3C] rounded-full animate-ping" />
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-20 text-center space-y-8 mt-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-1.5 bg-[#C89B3C]/10 border border-[#C89B3C]/30 px-4 py-1.5 rounded-full text-xs text-[#C89B3C] tracking-widest font-black uppercase">
              <Sparkles size={12} />
              <span>
                {translate({
                  ar: 'تراث، نقاوة، وفخامة النكهة الجزائرية',
                  fr: 'Héritage, Pureté & Noblesse des Épices',
                  en: 'Heritage, Purity & Grandeur of Authentic Spices'
                })}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-sans font-extrabold tracking-tight leading-tight">
              {translate({ ar: 'توابل البوخاري الفاخرة', fr: 'Maison Épices El Boukhari', en: 'El Boukhari Spice House' })}
              <br />
              <span className="text-[#C89B3C] font-serif italic text-3xl sm:text-4xl md:text-5xl font-medium">
                {translate({
                  ar: 'فن تذوق البهارات الراقية',
                  fr: 'La Haute Couture de l\'Assaisonnement',
                  en: 'The Haute Couture of Culinary Spice Blends'
                })}
              </span>
            </h1>

            <p className="max-w-2xl mx-auto text-gray-300 text-sm md:text-lg leading-relaxed font-sans">
              {translate({
                ar: 'ننتقي يدوياً أجود أعشاب جبال الأطلس وكمون الصحراء وأندر بهارات العالم المطحونة بارداً عند الطلب، لنمنح موائدكم هيبة التقاليد وفخامة الطهي المعاصر.',
                fr: 'Une sélection impériale de safran pur, cumin d\'Adrar, et mélanges ancestraux moulus à froid pour libérer l\'âme de la cuisine algérienne traditionnelle.',
                en: 'An imperial collection of pure saffron, Adrar cumin, and age-old traditional blends cold-ground to unlock the true soul of gourmet Algerian feasts.'
              })}
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center font-sans"
          >
            <button
              onClick={() => onNavigate('shop')}
              className="w-full sm:w-auto bg-[#C89B3C] text-black hover:bg-white font-black py-4 px-8 rounded-full text-sm transition shadow-xl hover:shadow-[#C89B3C]/20 flex items-center justify-center gap-2 group"
            >
              <span>{translate({ ar: 'اكتشف توابلنا', fr: 'Découvrir nos Épices', en: 'Explore Spices' })}</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => onNavigate('shop', { category: 'melanges' })}
              className="w-full sm:w-auto bg-transparent border-2 border-white hover:border-[#C89B3C] hover:text-[#C89B3C] text-white font-bold py-4 px-8 rounded-full text-sm transition"
            >
              {translate({ ar: 'مجموعات البوخاري الحصرية', fr: 'Collections Exclusives', en: 'Prestige Box Sets' })}
            </button>
          </motion.div>

          {/* Core Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-10 border-t border-white/10 text-xs text-gray-400"
          >
            <div className="flex flex-col items-center gap-1">
              <span className="text-xl font-black text-[#C89B3C] font-mono">100%</span>
              <span>{translate({ ar: 'طبيعي وخالٍ من المضافات', fr: 'Naturel sans Additif', en: 'Pure & Organic' })}</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-xl font-black text-[#C89B3C] font-mono">27+</span>
              <span>{translate({ ar: 'تابل برأس الحانوت الملكي', fr: 'Ingrédients Secret', en: 'Noble Spice Strains' })}</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-xl font-black text-[#C89B3C] font-mono">58</span>
              <span>{translate({ ar: 'ولاية نشحن إليها بالكامل', fr: 'Wilayas Livrées', en: 'Wilayas Delivered' })}</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-xl font-black text-[#C89B3C] font-mono">24/7</span>
              <span>{translate({ ar: 'توصيل ودعم فني متواصل', fr: 'Support & Suivi', en: 'Customer Care' })}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. FEATURED CATEGORIES SECTION */}
      <section className="py-20 max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center space-y-3 mb-16">
          <h2 className="text-sm tracking-[0.3em] font-extrabold text-[#C89B3C] uppercase">
            {translate({ ar: 'عائلات التوابل', fr: 'Catégories Nobles', en: 'Noble Families' })}
          </h2>
          <h3 className="text-3xl md:text-5xl font-sans font-extrabold tracking-tight">
            {translate({ ar: 'تصنيف بهاراتنا الفاخرة', fr: 'Explorez nos Collections', en: 'Explore Our Collections' })}
          </h3>
          <p className="text-gray-500 max-w-md mx-auto text-xs md:text-sm">
            {translate({
              ar: 'تصفح تشكيلاتنا المتخصصة من الأعشاب والبهارات النادرة والمجموعات المصممة لأشهر المطابخ.',
              fr: 'Parcourez nos collections raffinées, des mélanges signature aux herbes fraîches et graines sauvages.',
              en: 'Browse our sophisticated categories, from signature blends to rare wild mountain herbs.'
            })}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              whileHover={{ y: -6 }}
              className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group shadow-md border border-gray-100 dark:border-[#222222]"
              onClick={() => onNavigate('shop', { category: cat.id })}
            >
              <img
                src={cat.image}
                alt={translate(cat.name)}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              {/* Soft gold/dark gradient inside */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80" />
              <div className="absolute inset-0 border border-[#C89B3C]/0 group-hover:border-[#C89B3C]/50 rounded-2xl transition duration-300" />

              <div className="absolute bottom-4 left-4 right-4 text-center">
                <span className="block font-sans font-extrabold text-white text-xs sm:text-sm md:text-base tracking-wide drop-shadow-md">
                  {translate(cat.name)}
                </span>
                <span className="inline-block h-0.5 w-6 bg-[#C89B3C] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center mt-1" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. BEST SELLERS SECTION */}
      <section className="bg-gradient-to-b from-[#F9F6F0]/60 via-[#FDFBF7] to-[#FDFBF7] dark:from-[#0B1B17]/20 dark:to-[#030807] py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div className="space-y-2 text-center md:text-left rtl:md:text-right">
              <div className="inline-flex items-center gap-1 text-[#C89B3C] font-extrabold text-xs tracking-wider uppercase">
                <Flame size={14} className="fill-[#C89B3C]" />
                <span>{translate({ ar: 'الأكثر طلباً', fr: 'Sélection Vedette', en: 'Highly Demanded' })}</span>
              </div>
              <h3 className="text-3xl md:text-5xl font-sans font-extrabold tracking-tight">
                {translate({ ar: 'منتجات البوخاري الأكثر مبيعاً', fr: 'Nos Best-Sellers', en: 'Our Top Sellers' })}
              </h3>
            </div>
            <button
              onClick={() => onNavigate('shop')}
              className="text-xs md:text-sm font-black text-[#C89B3C] hover:text-[#111111] dark:hover:text-white transition flex items-center gap-1 hover:underline"
            >
              <span>{translate({ ar: 'رؤية كافة المنتجات بالمتجر', fr: 'Voir tous les produits', en: 'View all spices' })}</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {bestSellers.map((product) => {
              const basePrice = product.weightPrices[0].price;
              const oldPrice = product.weightPrices[0].oldPrice;
              const hasDiscount = !!oldPrice;
              const isWish = wishlist.some((item) => item.id === product.id);

              return (
                <div
                  key={product.id}
                  onClick={() => onNavigate('product-detail', { productId: product.id })}
                  className="bg-white dark:bg-[#111111] rounded-2xl overflow-hidden border border-gray-100 dark:border-[#222222] shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col group relative"
                >
                  {/* Heart / Wishlist Trigger absolute */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product);
                    }}
                    className={`absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 dark:bg-black/80 flex items-center justify-center shadow-md hover:scale-110 transition ${
                      isWish ? 'text-red-500' : 'text-gray-400 hover:text-black dark:hover:text-white'
                    }`}
                  >
                    <Star size={16} className={isWish ? 'fill-red-500 text-red-500' : ''} />
                  </button>

                  {/* Discount / New badge absolute */}
                  <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 text-[10px] font-black uppercase">
                    {hasDiscount && (
                      <span className="bg-[#1B4332] text-white px-2.5 py-1 rounded-md">
                        {translate({ ar: 'تخفيض', fr: 'Promo', en: 'Sale' })}
                      </span>
                    )}
                    {product.isNew && (
                      <span className="bg-[#C89B3C] text-black px-2.5 py-1 rounded-md">
                        {translate({ ar: 'جديد', fr: 'Nouveau', en: 'New' })}
                      </span>
                    )}
                  </div>

                  {/* Image container */}
                  <div className="aspect-square bg-gray-50 overflow-hidden relative">
                    <img
                      src={product.images[0]}
                      alt={translate(product.name)}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  </div>

                  {/* Body details */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div className="space-y-1.5">
                      <span className="text-xs font-mono text-[#C89B3C] tracking-wider uppercase">
                        {translate(product.categoryName)}
                      </span>
                      <h4 className="font-sans font-extrabold text-sm md:text-base text-gray-900 dark:text-white line-clamp-1 group-hover:text-[#C89B3C] transition">
                        {translate(product.name)}
                      </h4>
                      <p className="text-gray-500 text-xs line-clamp-2 leading-relaxed">
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
        </div>
      </section>

      {/* 4. BRAND STORY SECTION */}
      <section className="py-24 max-w-7xl mx-auto px-4 md:px-6 border-t border-[#C89B3C]/10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text block */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-1 text-[#C89B3C] font-extrabold text-xs tracking-wider uppercase">
              <Award size={14} />
              <span>{translate({ ar: 'الأصالة والتراث', fr: 'Notre Noblesse', en: 'Noble Roots' })}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-sans font-extrabold tracking-tight">
              {translate({ ar: 'قصة عائلية من الطحن العطري الفاخر', fr: 'L\'Histoire de la Maison El Boukhari', en: 'The House of El Boukhari Heritage' })}
            </h2>
            <div className="text-sm md:text-base text-gray-600 dark:text-gray-400 space-y-4 leading-relaxed">
              <p>
                {translate({
                  ar: 'تأسست علامة "توابل البوخاري" لتكون حامية لثقافة البهارات الجزائرية والطبخ التقليدي الرفيع. لجيلين متتاليين، سعينا للمحافظة على أسرار خلطات رأس الحانوت وتوليفات الشوربة، دون أي مواد مالئة كيميائية أو ملونات رخيصة.',
                  fr: 'La Maison El Boukhari est née de la passion d\'artisans fiers de leur patrimoine culinaire algérien. Depuis deux générations, nous défendons les secrets d\'assemblage du Ras El Hanout authentique, du Jari constantinois et de la Harira de l\'Oranie, sans aucun additif chimique.',
                  en: "The House of El Boukhari sprouted from a passionate devotion to authentic culinary Algerian heritage. For two generations, we have guarded the secret formulas of genuine Ras El Hanout, Constantine Jari, and Oran Harira, rejecting any chemical fillers or color enhancers."
                })}
              </p>
              <p>
                {translate({
                  ar: 'مفهومنا للبهارات لا يتوقف عند جودة المذاق فقط، بل نؤمن بالدور العلاجي العشبي الطبيعي. لذلك نقوم بتنقية بذور السانوج البري، كمون واحات أدرار الصحراوية، وزعتر جبال الأطلس البليدي يدوياً، لنصنع علباً كقطع فنية تزين بيوتكم وتكرم هيبتكم.',
                  fr: 'Pour nous, les épices sont aussi des vecteurs de bien-être physique. C\'est pourquoi nous nettoyons méticuleusement à la main nos graines de Sanoudj, notre cumin sauvage d\'Adrar et notre thym montagnard, créant des coffrets qui subliment vos tables tout en fortifiant votre santé.',
                  en: 'To us, spices are the natural pharmacopoeia of life. That is why we hand-sort our wild black seeds, desert Adrar cumin, and alpine Atlas thyme, assembling premium jars that enrich your dinner table and promote health.'
                })}
              </p>
            </div>
          </div>

          {/* Luxury bento collage */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img
                src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=400"
                alt="Herbs roasting"
                className="w-full aspect-[4/5] object-cover rounded-2xl border border-gray-100 dark:border-[#222222]"
                referrerPolicy="no-referrer"
              />
              <img
                src="https://images.unsplash.com/photo-1532634922-8fe0b757fb13?auto=format&fit=crop&q=80&w=400"
                alt="Atlas mountain thyme"
                className="w-full aspect-square object-cover rounded-2xl border border-gray-100 dark:border-[#222222]"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="space-y-4 pt-8">
              <img
                src="https://images.unsplash.com/photo-1532336414038-cf1905047b2b?auto=format&fit=crop&q=80&w=400"
                alt="Coriander spices"
                className="w-full aspect-square object-cover rounded-2xl border border-gray-100 dark:border-[#222222]"
                referrerPolicy="no-referrer"
              />
              <img
                src="https://images.unsplash.com/photo-1608686207856-001b95cf60ca?auto=format&fit=crop&q=80&w=400"
                alt="Luxury jars selection"
                className="w-full aspect-[4/5] object-cover rounded-2xl border border-gray-100 dark:border-[#222222]"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. RECIPES BANNER */}
      <section className="bg-[#0B1B17] text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-15">
          <img
            src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=1600"
            alt="Couscous plating"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6 relative z-10">
          <BookOpen className="mx-auto text-[#C89B3C]" size={40} />
          <h2 className="text-3xl md:text-5xl font-sans font-extrabold tracking-tight">
            {translate({ ar: 'اطبخ كالطهاة المحترفين بتوابلنا', fr: 'Cuisinez comme un Chef avec El Boukhari', en: 'Cook Like an Elite Chef' })}
          </h2>
          <p className="max-w-2xl mx-auto text-gray-300 text-sm md:text-base leading-relaxed">
            {translate({
              ar: 'ندعوك لتجربة أسرار المطبخ العاصمي، القسنطيني، والوهراني الأصيل عبر وصفاتنا المكتوبة بدقة وتوجيهات استخدام خلطة الشوربة ورأس الحانوت الملكي بالتفصيل.',
              fr: 'Explorez nos fiches recettes d\'exception pour réussir vos plats du terroir (Couscous, Chorba, Tajine) grâce aux mélanges aromatiques de nos maîtres épiciers.',
              en: 'Explore our master culinary guides to perfect your traditional Algerian dishes using our high-grade artisanal spice formulas.'
            })}
          </p>
          <button
            onClick={() => onNavigate('recipes')}
            className="bg-[#C89B3C] text-black font-black hover:bg-white px-8 py-3.5 rounded-full text-sm transition shadow-lg"
          >
            {translate({ ar: 'رؤية الوصفات والخطوات', fr: 'Découvrir les Recettes', en: 'View Recipes & Guides' })}
          </button>
        </div>
      </section>

      {/* 6. STORE LOCATIONS SECTION */}
      <section className="py-24 max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center space-y-3 mb-16">
          <MapPin className="mx-auto text-[#C89B3C]" size={36} />
          <h2 className="text-3xl md:text-4xl font-sans font-extrabold tracking-tight">
            {translate({ ar: 'متجرنا الفعلي', fr: 'Notre Boutique Physique', en: 'Our Physical Store' })}
          </h2>
          <p className="text-gray-500 max-w-md mx-auto text-xs md:text-sm">
            {translate({
              ar: 'تفضلوا بزيارة متجرنا بقديل، وهران لتذوق واستنشاق روائح توابلنا مباشرة.',
              fr: 'Venez humer et sélectionner nos mélanges de prestige directement dans notre boutique à Gdyel, Oran.',
              en: 'Visit our retail shop in Gdyel, Oran to smell and select our premium spice blends firsthand.'
            })}
          </p>
        </div>

        <div className="flex justify-center">
          {boutiques.map((b, idx) => (
            <div
              key={idx}
              className="max-w-md w-full bg-white dark:bg-[#111111] p-6 md:p-8 rounded-2xl border border-gray-100 dark:border-[#222222] shadow-sm hover:border-[#C89B3C]/30 transition space-y-4"
            >
              <h4 className="text-xl font-bold text-[#C89B3C] font-sans flex items-center gap-2">
                <MapPin size={18} />
                <span>{translate(b.city)}</span>
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed min-h-[40px]">
                {translate(b.address)}
              </p>
              <div className="border-t border-gray-50 dark:border-[#222222] pt-4 space-y-1.5 text-xs text-gray-500">
                <p>
                  <strong>{translate({ ar: 'الهاتف:', fr: 'Téléphone :', en: 'Phone:' })}</strong> {b.phone}
                </p>
                <p className="flex items-center gap-1">
                  <Clock size={12} className="text-[#C89B3C]" />
                  <span>{translate(b.hours)}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

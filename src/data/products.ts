import { Product, Category } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'epices',
    name: {
      ar: 'توابل منفردة',
      fr: 'Épices Simples',
      en: 'Single Spices'
    },
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'poivres',
    name: {
      ar: 'أنواع الفلفل',
      fr: 'Poivres Rares',
      en: 'Rare Peppers'
    },
    image: 'https://images.unsplash.com/photo-1508747703725-719ae257c14a?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'herbes',
    name: {
      ar: 'أعشاب مجففة',
      fr: 'Herbes Aromatiques',
      en: 'Aromatic Herbs'
    },
    image: 'https://images.unsplash.com/photo-1532634922-8fe0b757fb13?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'melanges',
    name: {
      ar: 'مزيج توابل البوخاري',
      fr: 'Mélanges Signature',
      en: 'Signature Blends'
    },
    image: 'https://images.unsplash.com/photo-1532336414038-cf1905047b2b?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'graines',
    name: {
      ar: 'بذور طبيعية',
      fr: 'Graines & Semences',
      en: 'Seeds & Grains'
    },
    image: 'https://images.unsplash.com/photo-1588693951121-657eb4c6c0b3?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'produits_naturels',
    name: {
      ar: 'منتجات طبيعية وهدايا',
      fr: 'Coffrets & Naturel',
      en: 'Natural & Gift Boxes'
    },
    image: 'https://images.unsplash.com/photo-1608686207856-001b95cf60ca?auto=format&fit=crop&q=80&w=600'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'ras-el-hanout-royal',
    name: {
      ar: 'رأس الحانوت الملكي البوخاري',
      fr: 'Ras El Hanout Royal El Boukhari',
      en: 'El Boukhari Royal Ras El Hanout'
    },
    category: 'melanges',
    categoryName: {
      ar: 'مزيج توابل البوخاري',
      fr: 'Mélanges Signature',
      en: 'Signature Blends'
    },
    shortDescription: {
      ar: 'المزيج التقليدي الفاخر المكون من 27 تابل مختار بعناية فائقة لأرقى الأطباق الجزائرية.',
      fr: 'Le mélange traditionnel d\'exception composé de 27 épices nobles sélectionnées pour sublimer vos plats algériens.',
      en: 'The ultimate traditional blend of 27 noble spices selected to elevate your premium Algerian dishes.'
    },
    description: {
      ar: 'رأس الحانوت الملكي من توابل البوخاري هو تجسيد حي للأصالة الجزائرية. نقوم بتحميص وطحن 27 تابل نادرا بمقادير سرية متوارثة، بما في ذلك الكبابة، جوزة الطيب، الهيل، قشور الرمان، لسان العصفور، وورد الروض. مثالي للكسكس، الطواجن، والمناسبات الكبرى.',
      fr: 'Notre Ras El Hanout Royal est la quintessence du savoir-faire El Boukhari. Composé de 27 épices rares torréfiées et moulues artisanalement selon une recette secrète ancestrale. Contient de la cardamome, noix de muscade, bouton de rose, macis et cubèbe. Parfait pour vos couscous, tajines et grandes occasions.',
      en: 'Our Royal Ras El Hanout is the epitome of El Boukhari craftsmanship. Handcrafted from 27 rare spices, lightly toasted and freshly ground according to an ancestral secret recipe. Features cardamom, nutmeg, rose petals, mace, and cubeb. Absolute perfection for couscous, slow-cooked tajines, and grand festive feasts.'
    },
    ingredients: {
      ar: 'كبابة، قرفة، هيل، جوزة الطيب، فلفل أسود، زنجبيل، قرنفل، كزبرة، كمون، حبة حلاوة، ورد الروض، ومستخلصات توابل نادرة.',
      fr: 'Cubèbe, cannelle, cardamome, noix de muscade, poivre noir, gingembre, clou de girofle, coriandre, cumin, anis vert, boutons de rose et épices rares sélectionnées.',
      en: 'Cubeb, cinnamon, cardamom, nutmeg, black pepper, ginger, cloves, coriander, cumin, aniseed, rosebuds, and specially selected rare spices.'
    },
    origin: {
      ar: 'محضر يدويا في الجزائر بتوليفة من توابل عالمية ومحلية فاخرة',
      fr: 'Assemblé artisanalement en Algérie à partir d\'épices du monde de première qualité',
      en: 'Artisanally blended in Algeria from selected premium grade global spices'
    },
    nutritionalInfo: {
      energy: '312 kcal / 100g',
      protein: '11.4g / 100g',
      fat: '8.2g / 100g',
      carbohydrates: '48.1g / 100g',
      sodium: '45mg / 100g'
    },
    rating: 4.9,
    reviewsCount: 148,
    weightPrices: [
      { weight: '100g', price: 650, oldPrice: 750, stock: 45 },
      { weight: '250g', price: 1500, oldPrice: 1800, stock: 30 },
      { weight: '500g', price: 2800, oldPrice: 3200, stock: 15 }
    ],
    images: [
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1532336414038-cf1905047b2b?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800'
    ],
    isBestSeller: true,
    reviews: [
      { id: '1', userName: 'Yacine B.', rating: 5, comment: 'رائحة لا توصف، غير مجرى الكسكس في مطعمنا بالكامل. زبائننا لاحظوا الفرق فوراً.', date: '2026-06-15' },
      { id: '2', userName: 'Amel K.', rating: 5, comment: 'Un vrai délice ! On sent la fraîcheur et la qualité des ingrédients dès l\'ouverture du sachet.', date: '2026-07-02' },
      { id: '3', userName: 'Sarah L.', rating: 4.8, comment: 'Very aromatic and balanced. The best Ras El Hanout I have bought online, absolutely premium packaging.', date: '2026-07-10' }
    ]
  },
  {
    id: 'safran-pur-taliouine',
    name: {
      ar: 'زعفران حر أصيل درجة أولى',
      fr: 'Safran Pur d\'Origine Supérieure',
      en: 'Premium Pure Saffron Threads'
    },
    category: 'epices',
    categoryName: {
      ar: 'توابل منفردة',
      fr: 'Épices Simples',
      en: 'Single Spices'
    },
    shortDescription: {
      ar: 'شُعيرات الزعفران الحر النقي، المقطوفة بعناية بالغة لتمنح أطباقك نكهة ولوناً ذهبياً ملكياً.',
      fr: 'Stigmates de safran pur de catégorie I, récoltés à la main pour offrir un arôme intense et une couleur d\'or royale.',
      en: 'Category I pure saffron threads, hand-harvested to bring a mystical aroma and standard golden hue to your dishes.'
    },
    description: {
      ar: 'زعفران البوخاري النقي يُعتبر الذهب الأحمر الحقيقي لمطبخك. شعيرات حمراء داكنة طويلة خالية تماما من الشوائب والمواد الكيميائية. غني جدا بمركبات الكروسين والسافرنال التي تمنح الفاعلية المثلى في اللون والمذاق والفوائد الصحية العلاجية.',
      fr: 'Le safran pur El Boukhari est le véritable "Or Rouge" de votre cuisine. Des filaments entiers d\'un rouge pourpre profond, sans aucune brisure ni additif. Très concentré en safranal et crocine pour garantir un pouvoir colorant et aromatique inégalé ainsi que d\'excellentes vertus thérapeutiques.',
      en: 'El Boukhari Pure Saffron is the true "Red Gold" of gourmet cuisine. Long, deep crimson threads, hand-picked and perfectly dried, completely free from additives or yellow styles. Rich in crocin and safranal, ensuring the highest coloring power and intense herbal, earthy aroma.'
    },
    ingredients: {
      ar: 'شُعيرات زعفران طبيعي نقي 100%.',
      fr: '100% stigmates de safran pur naturel.',
      en: '100% premium pure natural saffron threads.'
    },
    origin: {
      ar: 'مقطوف يدوياً من هضاب تاليوين الشهيرة ومرخص تحت معايير الجودة الدولية',
      fr: 'Récolté à la main dans les plaines d\'altitude et certifié selon les normes internationales',
      en: 'Hand-harvested from high altitude plateaus and tested for premium grade purity'
    },
    nutritionalInfo: {
      energy: '310 kcal / 100g',
      protein: '11.4g / 100g',
      fat: '5.8g / 100g',
      carbohydrates: '65.3g / 100g',
      sodium: '148mg / 100g'
    },
    rating: 5.0,
    reviewsCount: 84,
    weightPrices: [
      { weight: '1g', price: 1800, oldPrice: 2200, stock: 100 },
      { weight: '3g', price: 4900, oldPrice: 5800, stock: 50 },
      { weight: '5g', price: 7900, oldPrice: 9500, stock: 25 }
    ],
    images: [
      'https://images.unsplash.com/photo-1608686207856-001b95cf60ca?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=800'
    ],
    isBestSeller: true,
    reviews: [
      { id: '1', userName: 'Meriem T.', rating: 5, comment: 'غرام واحد منه كفانا لشهور ! رائع جدا في الحريرة الشلمسانية والحلويات الجزائرية.', date: '2026-05-20' },
      { id: '2', userName: 'Omar El Hadj', rating: 5, comment: 'La qualité est exceptionnelle. Le parfum se diffuse magnifiquement, couleur dorée magique.', date: '2026-06-11' }
    ]
  },
  {
    id: 'cumin-adrar-premium',
    name: {
      ar: 'كمون أدرار الصحراوي النقي',
      fr: 'Cumin d\'Adrar Pur Premium',
      en: 'Premium Pure Adrar Cumin'
    },
    category: 'epices',
    categoryName: {
      ar: 'توابل منفردة',
      fr: 'Épices Simples',
      en: 'Single Spices'
    },
    shortDescription: {
      ar: 'كمون صحراوي بري من واحات أدرار، يتميز بنكهة قوية ترابية لا غنى عنها في الأطباق الجزائرية التقليدية.',
      fr: 'Cumin sauvage des oasis d\'Adrar au goût terreux intense, indispensable pour vos tajines et ragoûts traditionnels.',
      en: 'Wild oasis-grown cumin from Adrar, bringing an intense, earthy, citrusy aroma vital for authentic Algerian stews.'
    },
    description: {
      ar: 'كمون أدرار الصحراوي من توابل البوخاري يُزرع في ظروف الواحات الصحراوية الطبيعية حيث تمنحه الشمس القوية تركيزاً فائقا للزيوت الطيارة. نقوم بتنقيته يدوياً حبة حبة، ثم طحنه بارداً عند الطلب لضمان احتفاظه بكامل روحه العطرية. مثالي لـ "اللوبيا" و"الكرنتيكا" والأسماك.',
      fr: 'Le cumin d\'Adrar El Boukhari pousse sous le soleil généreux des oasis du Sahara algérien, ce qui lui confère une teneur exceptionnelle en huiles essentielles. Trié à la main avec une précision chirurgicale, puis moulu à froid à la commande. Indispensable pour la Loubia, la Karantika et les poissons.',
      en: 'Grown in the vibrant desert oasis of Adrar under intense solar warmth, this cumin concentrates essential oils to the highest degree. Meticulously sorted by hand and cold-ground on demand. The classic companion for Algerian Loubia, Karantika, and grilled seafood.'
    },
    ingredients: {
      ar: 'بذور كمون أدرار طبيعي نقي 100% مطحون.',
      fr: '100% graines de cumin d\'Adrar pur moulu.',
      en: '100% pure premium Adrar cumin ground.'
    },
    origin: {
      ar: 'واحات أدرار، الصحراء الجزائرية',
      fr: 'Oasis d\'Adrar, Sahara Algérien',
      en: 'Adrar Oasis, Algerian Sahara'
    },
    nutritionalInfo: {
      energy: '375 kcal / 100g',
      protein: '17.8g / 100g',
      fat: '22.3g / 100g',
      carbohydrates: '44.2g / 100g',
      sodium: '168mg / 100g'
    },
    rating: 4.8,
    reviewsCount: 112,
    weightPrices: [
      { weight: '100g', price: 400, oldPrice: 480, stock: 120 },
      { weight: '250g', price: 900, oldPrice: 1100, stock: 80 },
      { weight: '500g', price: 1700, oldPrice: 2000, stock: 40 }
    ],
    images: [
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800'
    ],
    isBestSeller: true,
    reviews: [
      { id: '1', userName: 'Mustapha O.', rating: 5, comment: 'رائحة قوية جداً تختلف تماماً عن الكمون العادي الذي يباع في الأسواق. جودة حقيقية.', date: '2026-06-28' },
      { id: '2', userName: 'Khadidja G.', rating: 4, comment: 'Excellent parfum pour ma Harira et mes boulettes de kefta. Je recommande !', date: '2026-07-14' }
    ]
  },
  {
    id: 'melange-chorba-authentique',
    name: {
      ar: 'مزيج الشوربة والحساء التقليدي',
      fr: 'Mélange Chorba & Jari Authentique',
      en: 'Authentic Chorba & Soup Blend'
    },
    category: 'melanges',
    categoryName: {
      ar: 'مزيج توابل البوخاري',
      fr: 'Mélanges Signature',
      en: 'Signature Blends'
    },
    shortDescription: {
      ar: 'التوليفة السحرية لشوربة فريك رائعة، تعبق برائحة رمضان والمناسبات السعيدة.',
      fr: 'Le mélange parfait pour réussir votre Chorba Frik ou Jari, rappelant les saveurs chaleureuses du Ramadan.',
      en: 'The magical spiced signature mix for a perfect comforting Chorba Frik, rich with festive Algerian memories.'
    },
    description: {
      ar: 'سر الشوربة الجزائرية الناجحة يكمن في هذا المزيج المتوازن من البوخاري. تم تطويره بعناية ليجمع بين حرارة الفلفل الأسود العذبة وحلاوة الفلفل العكري المدخن ولمسة النعناع الجاف والكزبرة والكركم. سيعطي شوربة الفريك أو الحرير ملمساً عسلياً ونكهة عميقة لا تنسى.',
      fr: 'Le secret d\'une Chorba algérienne réussie réside dans l\'équilibre parfait de ce mélange. Développé pour associer la rondeur de la coriandre, la douceur du paprika doux, l\'intensité du poivre noir et la fraîcheur subtile de la menthe séchée. Idéal pour le Jari constantinois et la Chorba Frik.',
      en: 'The core secret behind an amazing authentic Algerian Chorba. Designed with high precision, balancing mild sweet paprika, rich coriander seeds, warm black pepper, a touch of turmeric, and a gentle breeze of dried mountain mint.'
    },
    ingredients: {
      ar: 'كزبرة، فلفل عكري حلو، كركم، زنجبيل، فلفل أسود، قرفة، قرنفل، نعناع بري مجفف، وكروية.',
      fr: 'Coriandre, paprika doux, curcuma, gingembre, poivre noir, cannelle, menthe sauvage séchée, carvi.',
      en: 'Coriander, sweet paprika, turmeric, ginger, black pepper, cinnamon, dried wild mint, caraway.'
    },
    origin: {
      ar: 'محضر يدويا بوصفة عائلية في ورشاتنا بالجزائر',
      fr: 'Formulé artisanalement selon une recette familiale dans nos ateliers en Algérie',
      en: 'Artisanally formulated following our private family recipe in our Algiers workshop'
    },
    nutritionalInfo: {
      energy: '315 kcal / 100g',
      protein: '12.1g / 100g',
      fat: '9.5g / 100g',
      carbohydrates: '45.3g / 100g',
      sodium: '28mg / 100g'
    },
    rating: 4.9,
    reviewsCount: 95,
    weightPrices: [
      { weight: '100g', price: 500, oldPrice: 600, stock: 75 },
      { weight: '250g', price: 1150, oldPrice: 1400, stock: 45 },
      { weight: '500g', price: 2100, oldPrice: 2600, stock: 20 }
    ],
    images: [
      'https://images.unsplash.com/photo-1532336414038-cf1905047b2b?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800'
    ],
    isBestSeller: true,
    isNew: true,
    reviews: [
      { id: '1', userName: 'Fatiha M.', rating: 5, comment: 'رائحة الكزبرة والنعناع تعيدني لأيام زمان في رمضان. شوربة رائعة بشهادة الضيوف.', date: '2026-06-30' },
      { id: '2', userName: 'Ryma B.', rating: 5, comment: 'La meilleure épice pour Chorba que j\'ai testée de toute ma vie. Fraîcheur incomparable !', date: '2026-07-16' }
    ]
  },
  {
    id: 'poivre-noir-sauvage',
    name: {
      ar: 'فلفل أسود بري فاخر حبات كاملة',
      fr: 'Poivre Noir Sauvage de Madagascar',
      en: 'Madagascar Wild Black Pepper'
    },
    category: 'poivres',
    categoryName: {
      ar: 'أنواع الفلفل',
      fr: 'Poivres Rares',
      en: 'Rare Peppers'
    },
    shortDescription: {
      ar: 'حبات الفلفل الأسود البري الكاملة المنتقاة باليد، لتمنح طحناً عطرياً حاراً بنكهات خشبية دافئة.',
      fr: 'Graines de poivre noir sauvage cueillies à la main, offrant un parfum boisé et piquant exceptionnel lors du broyage.',
      en: 'Handpicked whole wild black peppercorns, unleashing a stunning woody, citrusy heat when freshly cracked.'
    },
    description: {
      ar: 'الفلفل الأسود البري من البوخاري يتم استيراده مباشرة من غابات مدغشقر المطيرة حيث ينمو طبيعيا على قمم الأشجار. نختار يدويا الحبات الممتلئة والناضجة تماما. يتميز هذا الفلفل بذيل صغير ونكهة تدوم طويلا في الفم تجمع بين حدة الفلفل ونعومة نكهات الفواكه والغابات.',
      fr: 'Le poivre noir sauvage El Boukhari provient des forêts tropicales de Madagascar où il pousse à l\'état sauvage. Ses baies portent une petite queue caractéristique (voatsiperifery). Très recherché par les chefs pour ses notes boisées, résineuses et fruitées d\'agrumes.',
      en: 'This wild black peppercorn is sourced directly from the dense forests of Madagascar where it climbs up forest trees. Featuring a signature tiny tail, it delivers an extraordinary complex culinary experience blending citrus freshness, wild resin, and warm wooden heat.'
    },
    ingredients: {
      ar: 'حبات فلفل أسود بري كاملة 100%.',
      fr: '100% baies entières de poivre noir sauvage de Madagascar.',
      en: '100% whole wild Madagascar black peppercorns.'
    },
    origin: {
      ar: 'الغابات المطيرة، مدغشقر (منتقى ومطهر في الجزائر)',
      fr: 'Forêts tropicales, Madagascar (Trié et nettoyé en Algérie)',
      en: 'Madagascar Tropical Rainforests (Sorted and cleaned in Algeria)'
    },
    nutritionalInfo: {
      energy: '251 kcal / 100g',
      protein: '10.4g / 100g',
      fat: '3.3g / 100g',
      carbohydrates: '64.0g / 100g',
      sodium: '20mg / 100g'
    },
    rating: 4.7,
    reviewsCount: 62,
    weightPrices: [
      { weight: '100g', price: 750, oldPrice: 900, stock: 60 },
      { weight: '250g', price: 1700, oldPrice: 2100, stock: 35 }
    ],
    images: [
      'https://images.unsplash.com/photo-1508747703725-719ae257c14a?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800'
    ],
    reviews: [
      { id: '1', userName: 'Chef Amine', rating: 5, comment: 'أستخدمه في اللحوم المشوية بمطعمنا. طحنته طازجاً تعطي بعداً آخر تماما للأكل.', date: '2026-06-18' },
      { id: '2', userName: 'Leila D.', rating: 4.5, comment: 'Une puissance aromatique incroyable, totalement différent du poivre noir de supermarché.', date: '2026-07-05' }
    ]
  },
  {
    id: 'graines-de-nigelle-sauvages',
    name: {
      ar: 'حبة البركة / السانوج البري النقي',
      fr: 'Graines de Nigelle Sauvages (Sanoudj)',
      en: 'Wild Black Seed / Nigella (Sanouj)'
    },
    category: 'graines',
    categoryName: {
      ar: 'بذور طبيعية',
      fr: 'Graines & Semences',
      en: 'Seeds & Grains'
    },
    shortDescription: {
      ar: 'بذور السانوج البرية الغنية بالزيوت المفيدة، شريك الخبز الجزائري ومستودع الصحة والشفاء.',
      fr: 'Graines de nigelle sauvages sélectionnées, idéales pour parfumer le pain traditionnel (Khobz Eddar) et booster l\'immunité.',
      en: 'Highly aromatic wild nigella seeds, the ultimate flavor companion for traditional bread and herbal remedies.'
    },
    description: {
      ar: 'السانوج أو حبة البركة من توابل البوخاري تمثل جزءا لا يتجزأ من المطبخ والصيدلية الشعبية الجزائرية. بذور برية صغيرة سوداء، غنية جدا بمركب الثيموكينون الفعال. نكهتها الرائعة تجمع بين البصل المحمص، الفلفل الأسود، والزعتر البري. ضرورية لتزيين "خبز الدار" و"الكسرة" وعلاجات البرد والربو.',
      fr: 'Le Sanoudj (graine de nigelle) est un trésor de la cuisine et de la pharmacopée traditionnelle algérienne. Ces graines sauvages noires et intenses contiennent une haute concentration en thymoquinone, puissant antioxydant. Elles révèlent un arôme complexe évoquant l\'oignon grillé, le poivre noir et l\'origan. Parfaites pour le Khobz Eddar.',
      en: 'Known locally as Sanouj or Habbat al-Barakah, our wild nigella seeds are highly aromatic with hints of toasted onion, black pepper, and mountain thyme. Widely integrated into traditional bread-making and sought after for their potent immune-boosting and anti-inflammatory properties.'
    },
    ingredients: {
      ar: 'بذور سانوج / حبة البركة طبيعية 100%.',
      fr: '100% graines de nigelle (sanoudj) naturelles.',
      en: '100% natural wild nigella seeds.'
    },
    origin: {
      ar: 'مستزرعة طبيعياً في سهول الهضاب العليا الجزائرية',
      fr: 'Cultivée de manière écologique dans les plaines des Hauts Plateaux Algériens',
      en: 'Ecologically cultivated in the rolling plains of High Plateaux, Algeria'
    },
    nutritionalInfo: {
      energy: '345 kcal / 100g',
      protein: '16.0g / 100g',
      fat: '15.0g / 100g',
      carbohydrates: '52.0g / 100g',
      sodium: '15mg / 100g'
    },
    rating: 4.9,
    reviewsCount: 130,
    weightPrices: [
      { weight: '100g', price: 350, oldPrice: 420, stock: 150 },
      { weight: '250g', price: 800, oldPrice: 950, stock: 90 },
      { weight: '500g', price: 1500, oldPrice: 1800, stock: 45 }
    ],
    images: [
      'https://images.unsplash.com/photo-1588693951121-657eb4c6c0b3?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1532634922-8fe0b757fb13?auto=format&fit=crop&q=80&w=800'
    ],
    reviews: [
      { id: '1', userName: 'Zohra A.', rating: 5, comment: 'أفضل سانوج جربته لخبز الدار، حباته نظيفة جداً وخالية من التراب والأحجار وصاحب رائحة زكية.', date: '2026-06-25' },
      { id: '2', userName: 'Anis K.', rating: 4.9, comment: 'Excellente qualité médicinale. Je l\'utilise infusé avec du miel naturel pour la gorge.', date: '2026-07-08' }
    ]
  },
  {
    id: 'coffret-prestige-boukhari',
    name: {
      ar: 'علبة الهدايا الخشبية الفاخرة - البوخاري',
      fr: 'Coffret Prestige en Bois - El Boukhari',
      en: 'The El Boukhari Prestige Wooden Gift Box'
    },
    category: 'produits_naturels',
    categoryName: {
      ar: 'منتجات طبيعية وهدايا',
      fr: 'Coffrets & Naturel',
      en: 'Natural & Gift Boxes'
    },
    shortDescription: {
      ar: 'تحفة خشبية راقية تضم 6 برطمانات زجاجية من أفخر توابلنا لتزيين مطبخك أو كهدية فخمة لأحبائك.',
      fr: 'Un coffret artisanal en bois noble contenant 6 bocaux en verre d\'épices d\'exception, idéal pour offrir ou magnifier votre cuisine.',
      en: 'An artisan-crafted noble wooden chest housing 6 premium glass jars of our finest spices, the ultimate luxury gift.'
    },
    description: {
      ar: 'علبة الهدايا الخشبية الفاخرة من البوخاري هي الخيار الأول لتبادل الهدايا في المناسبات السعيدة والأعياد والزيارات العائلية الفخمة. العلبة مصنوعة يدويا من خشب طبيعي معتق وتحتوي على 6 برطمانات زجاجية بغطاء معدني ذهبي مليئة بـ: رأس الحانوت الملكي، زعفران حر (1غ)، كمون أدرار، فلفل عكري مدخن، فلفل أسود بري، ومزيج الشوربة الخاص.',
      fr: 'Le Coffret Prestige El Boukhari est le cadeau d\'excellence par excellence. Boîte en bois noble vernie à la main contenant 6 bocaux en verre haut de gamme avec capsules dorées hermétiques: Ras El Hanout Royal, Safran Pur (1g), Cumin d\'Adrar, Paprika Fumé, Poivre Noir Sauvage, et notre Mélange Chorba.',
      en: 'The El Boukhari Prestige Gift Box is the pinnacle of culinary gifting. A solid premium wooden chest hand-polished to perfection, protecting 6 exquisite glass jars sealed with gold airtight caps: Royal Ras El Hanout, Pure Saffron (1g), Adrar Cumin, Smoked Paprika, Wild Madagascar Pepper, and the Signature Chorba soup blend.'
    },
    ingredients: {
      ar: 'رأس الحانوت الملكي (100غ)، زعفران حر (1غ)، كمون أدرار (100غ)، فلفل عكري مدخن (100غ)، فلفل أسود بري (100غ)، مزيج الشوربة (100غ).',
      fr: 'Ras El Hanout Royal (100g), Safran Pur (1g), Cumin d\'Adrar (100g), Paprika Fumé (100g), Poivre Noir Sauvage (100g), Mélange Chorba (100g).',
      en: 'Royal Ras El Hanout (100g), Pure Saffron (1g), Adrar Cumin (100g), Smoked Paprika (100g), Wild Madagascar Pepper (100g), Signature Chorba Blend (100g).'
    },
    origin: {
      ar: 'صناعة جزائرية حرفية للعلبة وتعبئة يدوية للتوابل',
      fr: 'Écrin bois fabriqué localement et remplissage manuel d\'épices de choix',
      en: 'Locally crafted wooden box, manually filled with our select premium handpicked spices'
    },
    nutritionalInfo: {
      energy: 'N/A',
      protein: 'N/A',
      fat: 'N/A',
      carbohydrates: 'N/A',
      sodium: 'N/A'
    },
    rating: 5.0,
    reviewsCount: 42,
    weightPrices: [
      { weight: 'Standard (6 Jars)', price: 7900, oldPrice: 9500, stock: 15 }
    ],
    images: [
      'https://images.unsplash.com/photo-1608686207856-001b95cf60ca?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800'
    ],
    isBestSeller: true,
    reviews: [
      { id: '1', userName: 'Karim L.', rating: 5, comment: 'أفضل هدية قدمتها لوالدتي بمناسبة رمضان، جودة الخشب والتقديم غاية في الرقي والتوابل قمة الفخامة.', date: '2026-04-10' },
      { id: '2', userName: 'Nadia B.', rating: 5, comment: 'Boîte magnifique et épices d\'une qualité exceptionnelle. Idéal pour faire un cadeau qui marque les esprits.', date: '2026-05-18' }
    ]
  },
  {
    id: 'thym-de-l-atlas',
    name: {
      ar: 'زعتر بري مجفف من جبال الأطلس',
      fr: 'Thym Sauvage de l\'Atlas',
      en: 'Wild Atlas Mountain Thyme'
    },
    category: 'herbes',
    categoryName: {
      ar: 'أعشاب مجففة',
      fr: 'Herbes Aromatiques',
      en: 'Aromatic Herbs'
    },
    shortDescription: {
      ar: 'أوراق الزعتر البري المنتقاة من قمم جبال الأطلس البليدي، عطر قوي ومضاد طبيعي للسموم.',
      fr: 'Feuilles de thym sauvage cueillies sur les sommets de l\'Atlas blidéen, parfum intense et puissant antiseptique naturel.',
      en: 'Wild thyme leaves hand-gathered from the high peaks of the Blidean Atlas mountains, rich in alpine oils.'
    },
    description: {
      ar: 'زعتر الأطلس البري من توابل البوخاري هو عشب معمر ينمو في التربة الصخرية النقية لجبال الأطلس الجزائري. يتم جمعه يدويا من قبل سكان المناطق الجبلية في أواخر الربيع وتجفيفه ببطء في الظل للحفاظ على زيوته العطرية "الثيمول" المركزة. ممتاز للأطباق، صلصات البيتزا، والشاي الدافئ المضاد للبرد.',
      fr: 'Notre thym de l\'Atlas est cueilli à la main par les montagnards locaux sur les pentes rocheuses du Djurdjura et de l\'Atlas blidéen. Séché à l\'abri de la lumière pour protéger sa haute teneur en thymol. Idéal pour infuser, parfumer vos viandes grillées et assaisonner vos sauces tomate.',
      en: 'Our Atlas Thyme is gathered by local highlanders along the pristine rocky ridges of the Algerian Atlas. Slowly shadow-dried to lock in its precious thymol content. Yields an incredible, sharp herbal pine aroma, perfect for grilled meats, authentic marinades, and comforting therapeutic teas.'
    },
    ingredients: {
      ar: 'أوراق زعتر بري مجففة 100%.',
      fr: '100% feuilles de thym sauvage séchées de l\'Atlas.',
      en: '100% whole wild dried Atlas mountain thyme leaves.'
    },
    origin: {
      ar: 'قمم جبال الأطلس البليدي، الجزائر',
      fr: 'Sommets de l\'Atlas Blidéen, Algérie',
      en: 'Blidean Atlas Mountain Peaks, Algeria'
    },
    nutritionalInfo: {
      energy: '276 kcal / 100g',
      protein: '9.1g / 100g',
      fat: '7.4g / 100g',
      carbohydrates: '63.9g / 100g',
      sodium: '55mg / 100g'
    },
    rating: 4.8,
    reviewsCount: 54,
    weightPrices: [
      { weight: '100g', price: 300, oldPrice: 380, stock: 95 },
      { weight: '250g', price: 700, oldPrice: 850, stock: 50 }
    ],
    images: [
      'https://images.unsplash.com/photo-1532634922-8fe0b757fb13?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800'
    ],
    reviews: [
      { id: '1', userName: 'Sofiane Y.', rating: 5, comment: 'رائحة الزعتر الجبلي فيه تفوح بمجرد لمسه. نستخدمه للشاي والصلصات دائماً.', date: '2026-06-12' },
      { id: '2', userName: 'Lamia O.', rating: 4.6, comment: 'Parfait pour le rhume en infusion avec du citron, on sent que c\'est très pur et sauvage.', date: '2026-07-03' }
    ]
  }
];

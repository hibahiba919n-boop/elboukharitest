import { BlogArticle } from '../types';

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 'bienfaits-safran-sante',
    title: {
      ar: 'الزعفران الحر: الذهب الأحمر وفوائده الطبية المذهلة لصحتك',
      fr: 'Le Safran Pur: Les Secrets Médicaux de l\'Or Rouge de votre Cuisine',
      en: 'Pure Saffron: The Medical Secrets of the Culinary Red Gold'
    },
    excerpt: {
      ar: 'تعرف على القيمة العلاجية الحقيقية لزعفران البوخاري الأصيل، من محاربة الاكتئاب إلى تحسين المناعة والذاكرة.',
      fr: 'Découvrez la véritable valeur thérapeutique du safran authentique El Boukhari, de la lutte contre le stress à l\'immunité.',
      en: 'Discover the medical power of genuine El Boukhari saffron, from stress relief to cognitive and immune support.'
    },
    content: {
      ar: 'الزعفران ليس مجرد تابل يعطي لوناً ذهبياً جميلاً، بل هو صيدلية طبيعية متكاملة. يحتوي الزعفران الحر على مضادات أكسدة قوية للغاية مثل الكروسين والكروسيتين والسافرنال. تشير الدراسات العلمية الحديثة إلى أن استهلاك شعيرات الزعفران بانتظام يساعد في تحسين الحالة المزاجية ومحاربة الاكتئاب الخفيف، حيث يعزز مستويات السيروتونين في الدماغ. كما أنه يساعد في تحسين الرؤية وصحة القلب وتهدئة آلام المفاصل وتنشيط الذاكرة.',
      fr: 'Le safran est bien plus qu\'une simple épice colorante; c\'est un véritable trésor médicinal. Nos stigmates de safran pur contiennent de formidables antioxydants : crocine, crocétine et safranal. Des recherches récentes démontrent qu\'une consommation régulière aide à réguler l\'humeur, favorise la relaxation et combat la déprime passagère en stimulant la sérotonine. De plus, il améliore la circulation sanguine, protège la vision et renforce le système immunitaire.',
      en: 'Saffron is far more than a coloring agent; it is a profound natural medicine. Our pure saffron threads contain exceptional antioxidants: crocin, crocetin, and safranal. Scientific research indicates that daily moderate consumption naturally balances mood, combats stress, and enhances emotional well-being by boosting serotonin. It also acts as a potent anti-inflammatory, protecting eyesight, supporting cardiovascular health, and boosting memory.'
    },
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=800',
    date: '2026-07-15',
    readTime: '5 min',
    category: {
      ar: 'صحة وعافية',
      fr: 'Santé & Bien-être',
      en: 'Health & Wellness'
    },
    tags: ['Safran', 'Santé', 'Algérie', 'Gourmet']
  },
  {
    id: 'secrets-conservation-epices',
    title: {
      ar: 'أسرار الاحتفاظ برائحة ونكهة التوابل لأطول فترة ممكنة',
      fr: 'Comment Conserver l\'Arôme et la Force de vos Épices Plus Longtemps',
      en: 'The Golden Rules of Spice Storage: Lock in Fragrance and Power'
    },
    excerpt: {
      ar: 'تجنب الأخطاء الشائعة في تخزين توابلك وحافظ على زيوتها الطيارة طازجة ونشطة باتباع نصائح خبراء توابل البوخاري.',
      fr: 'Évitez les erreurs courantes de conservation et gardez les huiles essentielles de vos épices intactes grâce à nos conseils.',
      en: 'Avoid standard storage mistakes and keep your essential spice oils fresh and potent with our professional advice.'
    },
    content: {
      ar: 'التوابل حساسة جداً للضوء، الرطوبة، والحرارة. أكبر خطأ نرتكبه جميعاً هو وضع رف التوابل مباشرة فوق الموقد أو الفرن، حيث تتسبب الحرارة المباشرة والبخار في تطاير الزيوت العطرية سريعا وأكسدة التوابل. ينصح خبراء البوخاري بحفظ التوابل في برطمانات زجاجية معتمة أو داكنة محكمة الإغلاق، ووضعها في خزانة باردة ومظلمة. كما نوصي بشراء التوابل كاملة وطحنها طازجة عند الحاجة، وهو ما يدعم نكهة أطباقك مئات المرات.',
      fr: 'Les épices sont particulièrement sensibles à la lumière, à l\'humidité et aux variations de température. L\'erreur la plus fréquente consiste à placer son étagère à épices juste au-dessus de la plaque de cuisson, exposant les précieux flacons à la vapeur chaude, ce qui oxyde les arômes en un temps record. Les experts El Boukhari recommandent d\'utiliser des pots en verre hermétiques placés dans un placard sombre et frais, loin de toute source de chaleur. Privilégiez l\'achat d\'épices entières et moulez-les à la minute.',
      en: 'Spices are delicate organisms sensitive to light, moisture, and heat. The most common mistake is placing your spice rack directly above or near the stove. The rising warmth and cooking vapor escape and oxidize the aromatic essential oils, flattening the taste. El Boukhari master spice merchants recommend storing them in airtight glass jars tucked inside a cool, dark cabinet. Whenever possible, buy spices whole and grind them freshly on demand.'
    },
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800',
    date: '2026-07-02',
    readTime: '4 min',
    category: {
      ar: 'نصائح المطبخ',
      fr: 'Conseils de Cuisine',
      en: 'Kitchen Wisdom'
    },
    tags: ['Conservation', 'Conseils', 'Arômes', 'Qualité']
  },
  {
    id: 'histoire-ras-el-hanout',
    title: {
      ar: 'رأس الحانوت: قصة سيد التوابل الجزائرية وسر الـ 27 مكوناً',
      fr: 'Ras El Hanout: L\'Histoire du Maître des Épices et le Secret des 27 Ingrédients',
      en: 'Ras El Hanout: The History of the Master Blend and its 27 Secret Ingredients'
    },
    excerpt: {
      ar: 'رحلة تاريخية عبر الأسواق الجزائرية القديمة لاستكشاف أصول رأس الحانوت وكيف أصبح رمزاً للأصالة العائلية.',
      fr: 'Un voyage historique à travers les souks algériens pour comprendre les origines mystiques de ce chef-d\'œuvre d\'arômes.',
      en: 'A historic journey through traditional Algerian souks to uncover the origin of Ras El Hanout.'
    },
    content: {
      ar: 'اسم "رأس الحانوت" يعني حرفياً التابل الأفضل والأجود الذي يعرضه صاحب الدكان في مقدمة دكانه (رأس دكانه). تاريخياً، كان كل بائع توابل بارع في المدن الجزائرية القديمة مثل قسنطينة وتلمسان والجزائر العاصمة يحتفظ بتركيبته السرية الخاصة، ويتنافس التجار في عدد المكونات وجودتها لتصل إلى 27 تابل أو أكثر في التوليفات الملكية. كان هذا المزيج رمزا للرخاء وحسن الضيافة في البيوت الكبرى، ويعتبر صلة الوصل بين ثقافة البحر الأبيض المتوسط وتجارة القوافل الصحراوية القديمة.',
      fr: 'Le nom "Ras El Hanout" signifie littéralement "la tête de la boutique", désignant le mélange d\'élite que l\'épicier plaçait au premier rang. Historiquement, chaque maître épicier dans les médinas d\'Alger, de Constantine ou de Tlemcen gardait jalousement sa formulation secrète. L\'assemblage de prestige pouvait compter 27 ingrédients rares, symbolisant la richesse du foyer et le raffinement de l\'accueil. C\'est le pont historique parfait entre la douceur de la Méditerranée et la force des pistes sahariennes.',
      en: 'The name "Ras El Hanout" translates literally to "head of the shop," indicating the very finest spices the merchant has to offer. Historically, master spice blenders in legendary Algerian medinas like Constantine, Tlemcen, and Algiers guarded their formulations as sacred trade secrets. A prestigious blend counts 27 rare components, symbolizing family prosperity and high hospitality. It serves as a beautiful culinary bridge between Mediterranean culture and trans-Saharan trading routes.'
    },
    image: 'https://images.unsplash.com/photo-1532336414038-cf1905047b2b?auto=format&fit=crop&q=80&w=800',
    date: '2026-06-20',
    readTime: '6 min',
    category: {
      ar: 'تراث وتاريخ',
      fr: 'Histoire & Tradition',
      en: 'History & Tradition'
    },
    tags: ['Ras El Hanout', 'Tradition', 'Histoire', 'Cuisine Algérienne']
  }
];

import { Recipe } from '../types';

export const RECIPES: Recipe[] = [
  {
    id: 'chorba-frik-traditionnelle',
    category: 'soupes_chorba',
    title: {
      ar: 'شوربة فريك عاصمية أصيلة باللحم',
      fr: 'Chorba Frik Traditionnelle Algéroise au Mouton',
      en: 'Authentic Algerian Chorba Frik with Lamb'
    },
    description: {
      ar: 'طريقة تحضير الشوربة الجزائرية الحمراء الأكثر شهرة بالفريك الأخضر المشوي والتوابل العريقة.',
      fr: 'La recette incontournable de la soupe rouge algérienne au blé vert concassé (Frik) et aux herbes fraîches.',
      en: 'The classic, comforting Algerian red soup made with cracked green wheat (Frik), lamb, and aromatic fresh herbs.'
    },
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800',
    prepTime: '20 min',
    cookTime: '50 min',
    difficulty: 'medium',
    difficultyLabel: {
      ar: 'متوسط',
      fr: 'Moyen',
      en: 'Medium'
    },
    servings: 6,
    ingredients: [
      { ar: '500غ لحم غنم مقطع قطعاً صغيرة', fr: '500g de viande de mouton coupée en petits morceaux', en: '500g lamb, cut into small cubes' },
      { ar: '1 كوب فريك (قمح مرمس أخضر) مغسول ومصفى', fr: '1 verre de blé vert concassé (Frik) lavé', en: '1 cup of cracked green wheat (Frik), washed' },
      { ar: '1 بصلة كبيرة مفرومة ناعماً جداً', fr: '1 gros oignon râpé finement', en: '1 large onion, finely grated' },
      { ar: '2 حبات طماطم ناضجة مفرومة', fr: '2 belles tomates mûres mixées', en: '2 ripe tomatoes, pureed' },
      { ar: '1 ملعقة كبيرة طماطم مصبرة', fr: '1 cuillère à soupe de concentré de tomate', en: '1 tbsp tomato paste' },
      { ar: 'حزمة كزبرة طازجة ونعناع مفرومين', fr: '1 bouquet de coriandre fraîche et de menthe ciselées', en: '1 bunch of fresh coriander and mint, chopped' },
      { ar: '2 ملاعق كبيرة زيت أو سمن', fr: '2 cuillères à soupe d\'huile ou de Smen', en: '2 tbsp vegetable oil or Smen (clarified butter)' },
      { ar: '1 ملعقة كبيرة "مزيج الشوربة البوخاري"', fr: '1 cuillère à soupe de "Mélange Chorba El Boukhari"', en: '1 tbsp "El Boukhari Chorba Blend"' },
      { ar: 'نصف ملعقة صغيرة "فلفل أسود بري البوخاري"', fr: '1/2 cuillère à café de "Poivre Noir Sauvage El Boukhari"', en: '1/2 tsp "El Boukhari Wild Black Pepper"' },
      { ar: 'عود قرفة صغير وملح حسب الرغبة', fr: '1 petit bâton de cannelle et du sel', en: '1 small cinnamon stick and salt to taste' }
    ],
    instructions: [
      {
        ar: 'في قدر تقليدي (قدر الطين إن وجد)، ضع الزيت أو السمن وسخن على نار هادئة، ثم أضف اللحم المقطع والبصل المفروم وحمر جيداً.',
        fr: 'Dans une marmite traditionnelle (en terre cuite de préférence), faites chauffer l\'huile ou le Smen. Ajoutez la viande et l\'oignon, puis faites revenir longuement à feu doux.',
        en: 'In a traditional pot (preferably clay), heat the oil or Smen. Add the lamb pieces and grated onion, and sauté thoroughly over low heat.'
      },
      {
        ar: 'أضف "مزيج الشوربة البوخاري" والفلفل الأسود وعود القرفة والملح ونصف كمية الكزبرة والنعناع المفرومين مع بضع قطرات من الماء الساخن لمنع احتراق التوابل.',
        fr: 'Incorporez le "Mélange Chorba El Boukhari", le poivre noir, la cannelle, le sel et la moitié de la coriandre/menthe. Ajoutez un filet d\'eau chaude pour préserver les épices.',
        en: 'Stir in the "El Boukhari Chorba Blend", black pepper, cinnamon, salt, and half of the coriander/mint. Splash in some hot water to keep the spices from burning.'
      },
      {
        ar: 'أضف الطماطم الطازجة والمصبرة وقلّب المكونات لدقيقتين، ثم اسكب لتراً ونصف من الماء المغلي واترك اللحم يطهى على نار متوسطة لمدة 30 دقيقة.',
        fr: 'Ajoutez les tomates mixées et le concentré de tomate. Remuez puis versez 1,5 litre d\'eau bouillante. Laissez cuire à feu moyen pendant 30 minutes.',
        en: 'Add the fresh tomato puree and tomato paste. Stir well and pour in 1.5 liters of boiling water. Let it cook over medium heat for 30 minutes until the meat is tender.'
      },
      {
        ar: 'عندما ينضج اللحم، أضف الفريك بالتدريج مع التحريك المستمر، واترك القدر يطهى على نار هادئة لمدة 15-20 دقيقة حتى ينتفخ الفريك وتتكاثف الشوربة.',
        fr: 'Une fois la viande tendre, jetez le Frik en pluie tout en remuant régulièrement. Laissez mijoter à feu très doux pendant 15 à 20 minutes jusqu\'à ce que le blé gonfle.',
        en: 'Gradually add the Frik wheat while stirring continuously to prevent sticking. Let it simmer on low heat for 15-20 minutes until the grains swell and the soup thickens.'
      },
      {
        ar: 'اطفئ النار، وزين الشوربة بما تبقى من الكزبرة والنعناع الطازج، وقدمها ساخنة مع البوراك وعصرة ليمون.',
        fr: 'Éteignez le feu, parsemez du reste de coriandre et menthe fraîches. Servez bien chaud accompagné de Boureks et de quartiers de citron.',
        en: 'Turn off the heat, garnish with the remaining fresh coriander and mint, and serve piping hot alongside crispy Boureks and fresh lemon wedges.'
      }
    ],
    spicesUsed: ['melange-chorba-authentique', 'poivre-noir-sauvage']
  },
  {
    id: 'couscous-royal-algerien',
    category: 'plats_traditionnels',
    title: {
      ar: 'الكسكس العاصمي الملكي الفاخر بالمرق الأبيض',
      fr: 'Couscous Royal Algérois à la Sauce Blanche Divine',
      en: 'Prestige Royal Algerian Couscous with White Sauce'
    },
    description: {
      ar: 'كسكس ملكي ناعم مطهو على البخار بمرق أبيض غني بنكهة القرفة وجوزة الطيب مع لحم الغنم والخضار.',
      fr: 'Le grand classique des fêtes algéroises: couscous fin cuit à la vapeur, arrosé d\'une sauce blanche parfumée.',
      en: 'The legendary festive masterpiece: steamed fine couscous served with an aromatic cinnamon-infused white sauce.'
    },
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800',
    prepTime: '30 min',
    cookTime: '60 min',
    difficulty: 'hard',
    difficultyLabel: {
      ar: 'متقدم',
      fr: 'Avancé',
      en: 'Advanced'
    },
    servings: 8,
    ingredients: [
      { ar: '1 كغ كسكس جزائري ناعم', fr: '1kg de couscous fin algérien', en: '1kg fine Algerian couscous' },
      { ar: '1 كغ لحم كتف خروف أو دجاج بلدي', fr: '1kg d\'épaule de mouton ou de poulet fermier', en: '1kg lamb shoulder or farm chicken' },
      { ar: '2 بصلات كبار مفرومين ناعماً جداً (للحفاظ على صفاء المرق)', fr: '2 gros oignons très finement râpés pour une sauce limpide', en: '2 large onions, finely grated (to keep the sauce clean)' },
      { ar: '3 حبات لفت بيضاء و3 حبات جريوات (كوسة) مقطعة بالطول', fr: '3 navets blancs et 3 courgettes coupés en deux dans la longueur', en: '3 white turnips and 3 zucchinis, halved lengthwise' },
      { ar: 'كوب حمص منقوع طوال الليل', fr: '1 verre de pois chiches trempés la veille', en: '1 cup chickpeas, soaked overnight' },
      { ar: '1 ملعقة كبيرة سمن طبيعي', fr: '1 cuillère à soupe de Smen naturel', en: '1 tbsp authentic Smen (clarified butter)' },
      { ar: '1 ملعقة كبيرة "رأس الحانوت الملكي البوخاري"', fr: '1 cuillère à soupe de "Ras El Hanout Royal El Boukhari"', en: '1 tbsp "El Boukhari Royal Ras El Hanout"' },
      { ar: 'نصف ملعقة صغيرة قرفة مطحونة وقرصة جوزة الطيب', fr: '1/2 cuillère à café de cannelle et une pincée de muscade', en: '1/2 tsp cinnamon powder and a pinch of nutmeg' },
      { ar: 'ملح وفلفل أسود حسب الحاجة', fr: 'Sel et poivre noir', en: 'Salt and black pepper to taste' }
    ],
    instructions: [
      {
        ar: 'في أسفل الكسكاس (القدر السفلي)، ضع السمن والبصل واللحم والملح والفلفل الأسود ورأس الحانوت الملكي والقرفة وجوزة الطيب وحمر الكل جيدا على نار هادئة لـ 15 دقيقة دون أن يتغير لون البصل.',
        fr: 'Dans la marmite du couscoussier, faites revenir le Smen, l\'oignon râpé, la viande, le sel, le poivre, le Ras El Hanout Royal et la cannelle à feu doux pendant 15 min sans faire colorer l\'oignon.',
        en: 'In the bottom of the couscoussier, melt the Smen and add the grated onion, meat, salt, pepper, Royal Ras El Hanout, and cinnamon. Sauté gently on low for 15 minutes, keeping the onion sweet and white.'
      },
      {
        ar: 'اسكب لترين من الماء المغلي، وأضف الحمص المنقوع واللفت، ثم غط القدر ودعه يغلي.',
        fr: 'Mouillez avec 2 litres d\'eau bouillante, plongez-y les pois chiches et les navets blancs. Couvrez et laissez bouillir.',
        en: 'Pour in 2 liters of boiling water, and add the soaked chickpeas and white turnips. Cover and bring to a boil.'
      },
      {
        ar: 'أثناء ذلك، حضر الكسكس بدهنه بقليل من الزيت والماء الدافئ واتركه يتشرب، ثم ضعه في الكسكاس العلوي ليتبخر التفويرة الأولى (حوالي 20 دقيقة بعد صعود البخار).',
        fr: 'Pendant ce temps, préparez les grains de couscous en les humectant d\'eau tiède et d\'un filet d\'huile. Placez-les dans le panier vapeur du couscoussier pour une première cuisson (20 min après échappement de la vapeur).',
        en: 'Meanwhile, prepare the couscous grains by moistening them with warm water and a splash of oil. Let it absorb, then transfer to the steamer basket for its first steaming (20 mins after steam rises).'
      },
      {
        ar: 'أنزل الكسكس في قصعة خشبية، رشه بالماء المملح وافتحه بيدك ببطء ودعه يتشرب مجدداً، ثم كرر عملية التبخير لمرة ثانية. بعد التفويرة الثانية، ادهنه بملعقة سمن أو زبدة حرة.',
        fr: 'Versez le couscous dans une grande "Gassaâ" en bois, arrosez d\'eau salée, séparez les grains délicatement et laissez sécher avant de le repasser à la vapeur pour une 2ème fois. Enduisez de Smen ou de beurre frais à la fin.',
        en: 'Turn the couscous into a large wooden "Gassaa" bowl, sprinkle with salted water, carefully break apart any lumps, and let dry. Steam it a second time. Once done, massage with a spoonful of fresh butter or Smen.'
      },
      {
        ar: 'قبل 15 دقيقة من نهاية طهي اللحم، أضف الكوسة (الجريوات) إلى المرق لتنضج وتبقى متماسكة.',
        fr: 'Environ 15 minutes avant la fin de cuisson de la viande, ajoutez les courgettes dans le bouillon pour qu\'elles restent fermes.',
        en: 'Add the zucchinis to the white broth about 15 minutes before the meat finishes cooking to ensure they cook through but remain firm.'
      },
      {
        ar: 'قدم الكسكس في قصعة تقليدية، زين باللحم في المركز، رتب الخضار والحمص بشكل متناسق، واسكب المرق الأبيض العطري الساخن.',
        fr: 'Dressez le couscous en dôme dans un plat traditionnel, disposez la viande au centre, décorez de légumes et de pois chiches, puis arrosez généreusement de sauce blanche parfumée.',
        en: 'Mound the warm fluffy couscous in a traditional serving platter, place the tender meat in the center, arrange the turnips, zucchinis, and chickpeas decoratively, and ladle the luxurious hot white sauce over.'
      }
    ],
    spicesUsed: ['ras-el-hanout-royal', 'poivre-noir-sauvage']
  },
  {
    id: 'tajine-agneau-safran-miel',
    category: 'recettes_gastronomiques',
    title: {
      ar: 'طاجين لحم الخروف المحمر بالزعفران الحر وعسل البرتقال',
      fr: 'Tajine d\'Agneau Gastronomique au Safran Pur & Miel d\'Oranger',
      en: 'Gourmet Lamb Tajine with Pure Saffron & Orange Blossom Honey'
    },
    description: {
      ar: 'وصفة فاخرة للمناسبات الراقية: لحم خروف طري مكرمل ببطء في مرق الزعفران الطبيعي مع اللوز المحمص والبرقوق.',
      fr: 'Une création de haute gastronomie orientale : souris d\'agneau confite lentement dans une infusion de safran pur, rehaussée de miel et d\'amandes.',
      en: 'A sublime festive masterpiece: tender lamb shank slow-braised with pure saffron strands, orange blossom honey, and toasted almonds.'
    },
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800',
    prepTime: '25 min',
    cookTime: '90 min',
    difficulty: 'medium',
    difficultyLabel: {
      ar: 'متوسط',
      fr: 'Moyen',
      en: 'Medium'
    },
    servings: 6,
    ingredients: [
      { ar: '1.2 كغ لحم خروف (موزات أو كتف)', fr: '1.2kg de viande d\'agneau (souris ou épaule)', en: '1.2kg tender lamb cuts' },
      { ar: '0.5غ زعفران البوخاري النقي منقوع في نصف كوب ماء زهر دافئ', fr: '0.5g de Safran Pur El Boukhari infusé dans 1/2 verre d\'eau de fleur d\'oranger', en: '0.5g Pure El Boukhari Saffron infused in warm orange water' },
      { ar: '3 ملاعق كبيرة عسل برتقال طبيعي', fr: '3 cuillères à soupe de miel pur d\'oranger', en: '3 tbsp pure orange blossom honey' },
      { ar: '1 ملعقة صغيرة قرفة مطحونة وعود قرفة خشب', fr: '1 cuillère à café de cannelle moulue et un bâton', en: '1 tsp ground cinnamon and 1 stick' },
      { ar: '2 ملاعق سمن البوخاري أو زبدة طبيعية', fr: '2 cuillères de Smen ou de beurre doux', en: '2 tbsp clarified butter (Smen)' },
      { ar: '100غ لوز مقشر ومحمص للتزيين', fr: '100g d\'amandes émondées et dorées', en: '100g toasted blanched almonds' }
    ],
    instructions: [
      {
        ar: 'انقع خيوط زعفران البوخاري في ماء الزهر الدافئ لمدة 15 دقيقة حتى يطلق لونه الذهبي ورائحته العطرية.',
        fr: 'Faites infuser les pistils de Safran El Boukhari dans l\'eau de fleur d\'oranger tiède pendant 15 min.',
        en: 'Infuse the pure saffron strands in warm orange blossom water for 15 minutes.'
      },
      {
        ar: 'في طاجين فخاري، حمّر قطع اللحم في السمن مع البصل المفروم والقرفة والملح والفلفل الأسود حتى تكتسب لوناً ذهبياً.',
        fr: 'Dans un plat à tajine, dorez la viande dans le Smen avec l\'oignon, la cannelle, le sel et le poivre.',
        en: 'In a clay tajine, sear the lamb pieces in Smen with onion, cinnamon, salt, and pepper until golden.'
      },
      {
        ar: 'أضف منقوع الزعفران مع العسل وكوبين من الماء المغلي، غط الطاجين واتركه ينضج على نار هادئة جداً لمدة ساعة ونصف حتى يتعسل المرق.',
        fr: 'Versez l\'infusion de safran dorée, le miel et deux verres d\'eau bouillante. Laissez mijoter à feu très doux 1h30 jusqu\'à ce que la sauce caramélise.',
        en: 'Pour the saffron infusion, honey, and boiling water. Simmer gently on very low heat for 90 minutes until succulent.'
      },
      {
        ar: 'زين باللوز المحمص وحبات البرقوق المعسل وقدمه ساخناً كطبق ضيافة ملكي.',
        fr: 'Garnissez d\'amandes croustillantes dorées et servez chaud dans le tajine d\'apparat.',
        en: 'Garnish with crunchy toasted almonds and prunes, serve warm.'
      }
    ],
    spicesUsed: ['safran-pur-taliouine', 'poivre-noir-sauvage']
  },
  {
    id: 'elixir-or-thym-sauvage-nigelle',
    category: 'herbier_secrets_sante',
    title: {
      ar: 'إكسير الشفاء الذهبي: منقوع زعتر الأطلس وحبة البركة والكركم',
      fr: 'Élixir d\'Or de l\'Atlas : Infusion Détox Thym Sauvage & Nigelle',
      en: 'Atlas Golden Elixir: Wild Thyme, Black Seed & Turmeric Herbal Brew'
    },
    description: {
      ar: 'وصفة علاجية من صيدلية الأعشاب الطبيعية لتقوية جهاز المناعة، تنقية الجهاز التنفسي، ومكافحة الالتهابات ونزلات البرد.',
      fr: 'Une préparation issue de notre herbier ancestral pour fortifier l\'immunité, assainir la gorge et stimuler le système digestif.',
      en: 'A restorative wellness infusion from our ancestral apothecary designed to boost immunity and soothe the respiratory system.'
    },
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=800',
    prepTime: '5 min',
    cookTime: '10 min',
    difficulty: 'easy',
    difficultyLabel: {
      ar: 'سهل',
      fr: 'Facile',
      en: 'Easy'
    },
    servings: 2,
    ingredients: [
      { ar: '1 ملعقة كبيرة زعتر الأطلس البري البوخاري', fr: '1 cuillère à soupe de Thym Sauvage de l\'Atlas El Boukhari', en: '1 tbsp El Boukhari Atlas Wild Thyme' },
      { ar: 'نصف ملعقة صغيرة بذور السانوج (حبة البركة) البوخاري مهروسة خفيفاً', fr: '1/2 cuillère à café de graines de Nigelle (Sanoudj) El Boukhari légèrement concassées', en: '1/2 tsp crushed El Boukhari Black Seed (Sanoudj)' },
      { ar: 'نصف ملعقة صغيرة كركم طبيعي مطحون ورشة فلفل أسود', fr: '1/2 cuillère à café de curcuma pur et une pincée de poivre noir (pour activer la curcumine)', en: '1/2 tsp pure turmeric and a pinch of black pepper (to activate curcumin)' },
      { ar: 'عصير نصف ليمونة طازجة وملعقة عسل سدر أو حر', fr: 'Jus d\'un demi citron frais et 1 cuillère de miel pur', en: 'Juice of 1/2 fresh lemon and 1 tbsp raw honey' },
      { ar: 'نصف لتر ماء نقي مغلي', fr: '500ml d\'eau de source bouillante', en: '500ml boiling mineral water' }
    ],
    instructions: [
      {
        ar: 'في إبريق زجاجي أو خزفي، ضع زعتر الأطلس، حبوب السانوج المهروشة، والكركم ورشة الفلفل الأسود البري.',
        fr: 'Dans une théière ou carafe en verre, déposez le thym sauvage, les graines de nigelle concassées et le curcuma.',
        en: 'In a teapot, place the wild thyme, crushed black seeds, turmeric, and pinch of black pepper.'
      },
      {
        ar: 'اسكب الماء المغلي مباشرة فوق الأعشاب وغط الإبريق فوراً لمنع تطاير الزيوت العطرية الثمينة لمدة 8 إلى 10 دقائق.',
        fr: 'Versez l\'eau bouillante et couvrez immédiatement pour emprisonner les huiles essentielles précieuses pendant 8 à 10 minutes.',
        en: 'Pour boiling water over the herbs and cover immediately to retain the volatile essential oils for 8-10 minutes.'
      },
      {
        ar: 'صف المنقوع في أكواب دافئة، أضف عصير الليمون وملعقة العسل وحرك جيداً.',
        fr: 'Filtrez l\'infusion, ajoutez le jus de citron frais et le miel. Dégustez tiède au réveil ou au coucher.',
        en: 'Strain into mugs, stir in fresh lemon juice and raw honey. Sip warm morning or evening.'
      }
    ],
    spicesUsed: ['zaatar-atlas-sauvage', 'sanoudj-graines-nigelle', 'poivre-noir-sauvage']
  }
];

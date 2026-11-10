import { WilayaShippingRate, RecipeCategory } from '../types';

export const INITIAL_WILAYA_RATES: WilayaShippingRate[] = [
  { code: 1, name: { ar: 'أدرار', fr: 'Adrar', en: 'Adrar' }, homeRate: 1100, deskRate: 800, active: true },
  { code: 2, name: { ar: 'الشلف', fr: 'Chlef', en: 'Chlef' }, homeRate: 700, deskRate: 450, active: true },
  { code: 3, name: { ar: 'الأغواط', fr: 'Laghouat', en: 'Laghouat' }, homeRate: 850, deskRate: 550, active: true },
  { code: 4, name: { ar: 'أم البواقي', fr: 'Oum El Bouaghi', en: 'Oum El Bouaghi' }, homeRate: 750, deskRate: 500, active: true },
  { code: 5, name: { ar: 'باتنة', fr: 'Batna', en: 'Batna' }, homeRate: 750, deskRate: 500, active: true },
  { code: 6, name: { ar: 'بجاية', fr: 'Béjaïa', en: 'Bejaia' }, homeRate: 700, deskRate: 450, active: true },
  { code: 7, name: { ar: 'بسكرة', fr: 'Biskra', en: 'Biskra' }, homeRate: 850, deskRate: 550, active: true },
  { code: 8, name: { ar: 'بشار', fr: 'Béchar', en: 'Bechar' }, homeRate: 1000, deskRate: 700, active: true },
  { code: 9, name: { ar: 'البليدة', fr: 'Blida', en: 'Blida' }, homeRate: 650, deskRate: 400, active: true },
  { code: 10, name: { ar: 'البويرة', fr: 'Bouira', en: 'Bouira' }, homeRate: 700, deskRate: 450, active: true },
  { code: 11, name: { ar: 'تمنراست', fr: 'Tamanrasset', en: 'Tamanrasset' }, homeRate: 1400, deskRate: 1000, active: true },
  { code: 12, name: { ar: 'تبسة', fr: 'Tébessa', en: 'Tebessa' }, homeRate: 800, deskRate: 550, active: true },
  { code: 13, name: { ar: 'تلمسان', fr: 'Tlemcen', en: 'Tlemcen' }, homeRate: 550, deskRate: 350, active: true },
  { code: 14, name: { ar: 'تيارت', fr: 'Tiaret', en: 'Tiaret' }, homeRate: 650, deskRate: 400, active: true },
  { code: 15, name: { ar: 'تيزي وزو', fr: 'Tizi Ouzou', en: 'Tizi Ouzou' }, homeRate: 700, deskRate: 450, active: true },
  { code: 16, name: { ar: 'الجزائر العاصمة', fr: 'Alger', en: 'Algiers' }, homeRate: 600, deskRate: 400, active: true },
  { code: 17, name: { ar: 'الجلفة', fr: 'Djelfa', en: 'Djelfa' }, homeRate: 800, deskRate: 500, active: true },
  { code: 18, name: { ar: 'جيجل', fr: 'Jijel', en: 'Jijel' }, homeRate: 750, deskRate: 500, active: true },
  { code: 19, name: { ar: 'سطيف', fr: 'Sétif', en: 'Setif' }, homeRate: 700, deskRate: 450, active: true },
  { code: 20, name: { ar: 'سعيدة', fr: 'Saïda', en: 'Saida' }, homeRate: 550, deskRate: 350, active: true },
  { code: 21, name: { ar: 'سكيكدة', fr: 'Skikda', en: 'Skikda' }, homeRate: 750, deskRate: 500, active: true },
  { code: 22, name: { ar: 'سيدي بلعباس', fr: 'Sidi Bel Abbès', en: 'Sidi Bel Abbes' }, homeRate: 450, deskRate: 300, active: true },
  { code: 23, name: { ar: 'عنابة', fr: 'Annaba', en: 'Annaba' }, homeRate: 800, deskRate: 500, active: true },
  { code: 24, name: { ar: 'قالمة', fr: 'Guelma', en: 'Guelma' }, homeRate: 800, deskRate: 500, active: true },
  { code: 25, name: { ar: 'قسنطينة', fr: 'Constantine', en: 'Constantine' }, homeRate: 750, deskRate: 500, active: true },
  { code: 26, name: { ar: 'المدية', fr: 'Médéa', en: 'Medea' }, homeRate: 700, deskRate: 450, active: true },
  { code: 27, name: { ar: 'مستغانم', fr: 'Mostaganem', en: 'Mostaganem' }, homeRate: 450, deskRate: 300, active: true },
  { code: 28, name: { ar: 'المسيلة', fr: 'M\'Sila', en: 'MSila' }, homeRate: 750, deskRate: 500, active: true },
  { code: 29, name: { ar: 'معسكر', fr: 'Mascara', en: 'Mascara' }, homeRate: 450, deskRate: 300, active: true },
  { code: 30, name: { ar: 'ورقلة', fr: 'Ouargla', en: 'Ouargla' }, homeRate: 900, deskRate: 600, active: true },
  { code: 31, name: { ar: 'وهران (المقر الرئيسي)', fr: 'Oran (Siège Social)', en: 'Oran (HQ Origin)' }, homeRate: 300, deskRate: 150, active: true },
  { code: 32, name: { ar: 'البيض', fr: 'El Bayadh', en: 'El Bayadh' }, homeRate: 850, deskRate: 550, active: true },
  { code: 33, name: { ar: 'إليزي', fr: 'Illizi', en: 'Illizi' }, homeRate: 1400, deskRate: 1000, active: true },
  { code: 34, name: { ar: 'برج بوعريريج', fr: 'Bordj Bou Arreridj', en: 'Bordj Bou Arreridj' }, homeRate: 700, deskRate: 450, active: true },
  { code: 35, name: { ar: 'بومرداس', fr: 'Boumerdès', en: 'Boumerdes' }, homeRate: 650, deskRate: 400, active: true },
  { code: 36, name: { ar: 'الطارف', fr: 'El Tarf', en: 'El Tarf' }, homeRate: 850, deskRate: 550, active: true },
  { code: 37, name: { ar: 'تندوف', fr: 'Tindouf', en: 'Tindouf' }, homeRate: 1400, deskRate: 1000, active: true },
  { code: 38, name: { ar: 'تيسمسيلت', fr: 'Tissemsilt', en: 'Tissemsilt' }, homeRate: 700, deskRate: 450, active: true },
  { code: 39, name: { ar: 'الوادي', fr: 'El Oued', en: 'El Oued' }, homeRate: 900, deskRate: 600, active: true },
  { code: 40, name: { ar: 'خنشلة', fr: 'Khenchela', en: 'Khenchela' }, homeRate: 800, deskRate: 550, active: true },
  { code: 41, name: { ar: 'سوق أهراس', fr: 'Souk Ahras', en: 'Souk Ahras' }, homeRate: 850, deskRate: 550, active: true },
  { code: 42, name: { ar: 'تيبازة', fr: 'Tipaza', en: 'Tipaza' }, homeRate: 650, deskRate: 400, active: true },
  { code: 43, name: { ar: 'ميلة', fr: 'Mila', en: 'Mila' }, homeRate: 750, deskRate: 500, active: true },
  { code: 44, name: { ar: 'عين الدفلى', fr: 'Aïn Defla', en: 'Ain Defla' }, homeRate: 650, deskRate: 400, active: true },
  { code: 45, name: { ar: 'النعامة', fr: 'Naâma', en: 'Naama' }, homeRate: 850, deskRate: 550, active: true },
  { code: 46, name: { ar: 'عين تموشنت', fr: 'Aïn Témouchent', en: 'Ain Temouchent' }, homeRate: 400, deskRate: 250, active: true },
  { code: 47, name: { ar: 'غرداية', fr: 'Ghardaïa', en: 'Ghardaia' }, homeRate: 850, deskRate: 550, active: true },
  { code: 48, name: { ar: 'غليزان', fr: 'Relizane', en: 'Relizane' }, homeRate: 500, deskRate: 350, active: true },
  { code: 49, name: { ar: 'تيميمون', fr: 'Timimoun', en: 'Timimoun' }, homeRate: 1100, deskRate: 800, active: true },
  { code: 50, name: { ar: 'برج باجي مختار', fr: 'Bordj Badji Mokhtar', en: 'Bordj Badji Mokhtar' }, homeRate: 1500, deskRate: 1100, active: true },
  { code: 51, name: { ar: 'أولاد جلال', fr: 'Ouled Djellal', en: 'Ouled Djellal' }, homeRate: 850, deskRate: 550, active: true },
  { code: 52, name: { ar: 'بني عباس', fr: 'Béni Abbès', en: 'Beni Abbes' }, homeRate: 1100, deskRate: 800, active: true },
  { code: 53, name: { ar: 'عين صالح', fr: 'In Salah', en: 'In Salah' }, homeRate: 1300, deskRate: 950, active: true },
  { code: 54, name: { ar: 'عين قزام', fr: 'In Guezzam', en: 'In Guezzam' }, homeRate: 1500, deskRate: 1100, active: true },
  { code: 55, name: { ar: 'تقرت', fr: 'Touggourt', en: 'Touggourt' }, homeRate: 900, deskRate: 600, active: true },
  { code: 56, name: { ar: 'جانت', fr: 'Djanet', en: 'Djanet' }, homeRate: 1500, deskRate: 1100, active: true },
  { code: 57, name: { ar: 'المغير', fr: 'El M\'Ghair', en: 'El MGhair' }, homeRate: 900, deskRate: 600, active: true },
  { code: 58, name: { ar: 'المنيعة', fr: 'El Meniaa', en: 'El Meniaa' }, homeRate: 1000, deskRate: 700, active: true }
];

export const INITIAL_RECIPE_CATEGORIES: RecipeCategory[] = [
  {
    id: 'recettes_gastronomiques',
    name: { ar: 'وصفات راقية ومطبخ فاخر', fr: 'Recettes Gastronomiques', en: 'Gourmet Haute Cuisine' },
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'herbier_secrets_sante',
    name: { ar: 'عشبة وأسرار الصحة والطب البديل', fr: 'Herbier & Secrets Santé', en: 'Herbal & Health Secrets' },
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'plats_traditionnels',
    name: { ar: 'أطباق تقليدية أصيلة', fr: 'Plats Traditionnels', en: 'Traditional Dishes' },
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'soupes_chorba',
    name: { ar: 'شوربة وحساء', fr: 'Soupes & Chorbas', en: 'Soups & Chorba' },
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'tajines',
    name: { ar: 'طواجن وصلصات متبلة', fr: 'Tajines & Sauces', en: 'Tajines & Sauces' },
    image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'patisseries_douceurs',
    name: { ar: 'حلويات ومعسلات شرقية', fr: 'Pâtisseries & Douceurs', en: 'Pastries & Sweets' },
    image: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&q=80&w=600'
  }
];

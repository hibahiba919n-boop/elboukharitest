import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Category, Coupon, Product, ProductWeightPrice, Recipe, RecipeCategory, WilayaShippingRate } from '../types';
import { AdminImageInput } from '../components/AdminImageInput';
import {
  TrendingUp,
  ShoppingBag,
  Users,
  Percent,
  Edit,
  Plus,
  Minus,
  CheckCircle,
  Truck,
  RotateCcw,
  Sparkles,
  Eye,
  Check,
  Package,
  Lock,
  Mail,
  ShieldCheck,
  AlertCircle,
  LogOut,
  ArrowLeft,
  Trash2,
  FolderPlus,
  PackagePlus,
  Layers,
  Search,
  X,
  Tag,
  Image as ImageIcon,
  BookOpen,
  MapPin,
  Building2,
  Home,
  Globe,
  UtensilsCrossed
} from 'lucide-react';

interface AdminPanelProps {
  onNavigate?: (page: string) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onNavigate }) => {
  const {
    translate,
    formatPrice,
    orders,
    updateOrderStatus,
    coupons,
    addCoupon,
    updateCoupon,
    deleteCoupon,
    currentUser,
    login,
    logout,
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
    applyGlobalShippingRates
  } = useApp();

  // Admin Login local states (EMPTY initially as requested)
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Selected Section: 'dashboard' | 'orders' | 'categories' | 'products' | 'coupons' | 'recipes' | 'shipping'
  const [activePanel, setActivePanel] = useState<'dashboard' | 'orders' | 'categories' | 'products' | 'coupons' | 'recipes' | 'shipping'>('dashboard');

  // Recipe Sub-tab
  const [recipeSubTab, setRecipeSubTab] = useState<'recipes_list' | 'recipe_categories'>('recipes_list');

  // ==================== RECIPE CATEGORIES MODAL & FORM STATES ====================
  const [isRecipeCatModalOpen, setIsRecipeCatModalOpen] = useState(false);
  const [editingRecipeCat, setEditingRecipeCat] = useState<RecipeCategory | null>(null);
  const [recCatId, setRecCatId] = useState('');
  const [recCatNameAr, setRecCatNameAr] = useState('');
  const [recCatNameFr, setRecCatNameFr] = useState('');
  const [recCatNameEn, setRecCatNameEn] = useState('');
  const [recCatImage, setRecCatImage] = useState('');

  // ==================== RECIPES MODAL & FORM STATES ====================
  const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const [recSearch, setRecSearch] = useState('');
  const [recCatFilter, setRecCatFilter] = useState('all');

  const [recId, setRecId] = useState('');
  const [recTitleAr, setRecTitleAr] = useState('');
  const [recTitleFr, setRecTitleFr] = useState('');
  const [recTitleEn, setRecTitleEn] = useState('');
  const [recCategory, setRecCategory] = useState('');
  const [recDescAr, setRecDescAr] = useState('');
  const [recDescFr, setRecDescFr] = useState('');
  const [recDescEn, setRecDescEn] = useState('');
  const [recImage, setRecImage] = useState('');
  const [recPrepTime, setRecPrepTime] = useState('20 min');
  const [recCookTime, setRecCookTime] = useState('45 min');
  const [recDifficulty, setRecDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [recServings, setRecServings] = useState<number>(4);
  const [recIngredientsText, setRecIngredientsText] = useState(''); // Textarea with line-separated items (FR or AR)
  const [recInstructionsText, setRecInstructionsText] = useState(''); // Textarea with line-separated steps
  const [recSpicesUsed, setRecSpicesUsed] = useState<string[]>([]);

  // ==================== SHIPPING FEES STATES ====================
  const [wilayaSearch, setWilayaSearch] = useState('');
  const [batchHomeRate, setBatchHomeRate] = useState<number>(800);
  const [batchDeskRate, setBatchDeskRate] = useState<number>(500);

  // Coupon Generator states
  const [newCode, setNewCode] = useState('');
  const [newVal, setNewVal] = useState<number>(10);
  const [newType, setNewType] = useState<'percentage' | 'fixed'>('percentage');
  const [newMinSubtotal, setNewMinSubtotal] = useState<number>(1000);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);

  // In-App Confirmation Modal State (replaces blocked window.confirm in iframe)
  const [deleteConfirm, setDeleteConfirm] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    confirmLabel?: string;
    onConfirm: () => void;
  } | null>(null);

  // ==================== CATEGORIES MODAL & FORM STATES ====================
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [catId, setCatId] = useState('');
  const [catNameAr, setCatNameAr] = useState('');
  const [catNameFr, setCatNameFr] = useState('');
  const [catNameEn, setCatNameEn] = useState('');
  const [catImage, setCatImage] = useState('');

  // ==================== PRODUCTS MODAL & FORM STATES ====================
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [prodSearch, setProdSearch] = useState('');
  const [prodCatFilter, setProdCatFilter] = useState('all');

  const [prodId, setProdId] = useState('');
  const [prodNameAr, setProdNameAr] = useState('');
  const [prodNameFr, setProdNameFr] = useState('');
  const [prodNameEn, setProdNameEn] = useState('');
  const [prodCategory, setProdCategory] = useState('');
  const [prodShortDescAr, setProdShortDescAr] = useState('');
  const [prodShortDescFr, setProdShortDescFr] = useState('');
  const [prodShortDescEn, setProdShortDescEn] = useState('');
  const [prodDescAr, setProdDescAr] = useState('');
  const [prodDescFr, setProdDescFr] = useState('');
  const [prodDescEn, setProdDescEn] = useState('');
  const [prodIngrAr, setProdIngrAr] = useState('');
  const [prodIngrFr, setProdIngrFr] = useState('');
  const [prodIngrEn, setProdIngrEn] = useState('');
  const [prodOriginAr, setProdOriginAr] = useState('');
  const [prodOriginFr, setProdOriginFr] = useState('');
  const [prodOriginEn, setProdOriginEn] = useState('');
  const [prodImages, setProdImages] = useState<string[]>(['']);
  const [prodIsBestSeller, setProdIsBestSeller] = useState(false);
  const [prodIsNew, setProdIsNew] = useState(false);
  const [prodWeightPrices, setProdWeightPrices] = useState<ProductWeightPrice[]>([
    { weight: '100g', price: 600, stock: 50 },
    { weight: '250g', price: 1400, stock: 30 }
  ]);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    if (!adminEmail.trim()) {
      setAuthError(translate({
        ar: 'يرجى إدخال البريد الإلكتروني للمسؤول',
        fr: 'Veuillez saisir l\'adresse e-mail administrateur',
        en: 'Please enter admin email'
      }));
      return;
    }

    if (adminEmail.trim().toLowerCase() !== 'admin@elboukhari.dz' || adminPassword !== 'admin123') {
      setAuthError(translate({
        ar: 'بيانات الدخول غير صحيحة',
        fr: 'Identifiants incorrects.',
        en: 'Invalid credentials.'
      }));
      return;
    }

    const success = login(adminEmail, adminPassword);
    if (!success) {
      setAuthError(translate({
        ar: 'فشل تسجيل الدخول. يرجى التحقق من البيانات.',
        fr: 'Échec de la connexion administrateur.',
        en: 'Admin login failed. Check credentials.'
      }));
    }
  };

  // Calculations for Corporate Dashboard
  const totalRev = orders.reduce((acc, o) => acc + o.total, 0);
  const totalOrdersCount = orders.length;

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedCode = newCode.toUpperCase().replace(/\s/g, '');
    if (!formattedCode) return;

    if (editingCoupon) {
      updateCoupon(editingCoupon.code, {
        code: formattedCode,
        discountType: newType,
        value: Number(newVal),
        minSubtotal: Number(newMinSubtotal) || 0
      });
      setEditingCoupon(null);
    } else {
      addCoupon({
        code: formattedCode,
        discountType: newType,
        value: Number(newVal),
        minSubtotal: Number(newMinSubtotal) || 0
      });
    }
    setNewCode('');
    setNewVal(10);
    setNewType('percentage');
    setNewMinSubtotal(1000);
  };

  const handleEditCoupon = (c: Coupon) => {
    setEditingCoupon(c);
    setNewCode(c.code);
    setNewType(c.discountType);
    setNewVal(c.value);
    setNewMinSubtotal(c.minSubtotal || 1000);
  };

  const handleCancelCouponEdit = () => {
    setEditingCoupon(null);
    setNewCode('');
    setNewVal(10);
    setNewType('percentage');
    setNewMinSubtotal(1000);
  };

  const handleDeleteCoupon = (code: string) => {
    setDeleteConfirm({
      isOpen: true,
      title: 'Supprimer le code promo',
      message: `Voulez-vous vraiment supprimer définitivement le code promo "${code}" ? Cette action est immédiate.`,
      confirmLabel: 'Supprimer le code',
      onConfirm: () => {
        deleteCoupon(code);
        if (editingCoupon?.code === code) {
          handleCancelCouponEdit();
        }
        setDeleteConfirm(null);
      }
    });
  };

  // Category Modal Handler
  const handleOpenCategoryModal = (cat?: Category) => {
    if (cat) {
      setEditingCategory(cat);
      setCatId(cat.id);
      setCatNameAr(cat.name.ar);
      setCatNameFr(cat.name.fr);
      setCatNameEn(cat.name.en);
      setCatImage(cat.image);
    } else {
      setEditingCategory(null);
      setCatId('');
      setCatNameAr('');
      setCatNameFr('');
      setCatNameEn('');
      setCatImage('https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=600');
    }
    setIsCategoryModalOpen(true);
  };

  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedSlug = catNameFr.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || `cat-${Date.now()}`;
    const finalId = catId.trim() ? catId.trim().toLowerCase().replace(/\s+/g, '_') : generatedSlug;

    const categoryData: Category = {
      id: finalId,
      name: {
        ar: catNameAr || catNameFr,
        fr: catNameFr || catNameAr,
        en: catNameEn || catNameFr
      },
      image: catImage.trim() || 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=600'
    };

    if (editingCategory) {
      updateCategory(categoryData);
    } else {
      addCategory(categoryData);
    }
    setIsCategoryModalOpen(false);
  };

  // Recipe Category Modal Handlers
  const handleOpenRecipeCatModal = (cat?: RecipeCategory) => {
    if (cat) {
      setEditingRecipeCat(cat);
      setRecCatId(cat.id);
      setRecCatNameAr(cat.name.ar);
      setRecCatNameFr(cat.name.fr);
      setRecCatNameEn(cat.name.en);
      setRecCatImage(cat.image || '');
    } else {
      setEditingRecipeCat(null);
      setRecCatId('');
      setRecCatNameAr('');
      setRecCatNameFr('');
      setRecCatNameEn('');
      setRecCatImage('https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=600');
    }
    setIsRecipeCatModalOpen(true);
  };

  const handleSaveRecipeCat = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedSlug = recCatNameFr.toLowerCase().trim().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '') || `rec_cat_${Date.now()}`;
    const finalId = recCatId.trim() ? recCatId.trim().toLowerCase().replace(/\s+/g, '_') : generatedSlug;

    const categoryData: RecipeCategory = {
      id: finalId,
      name: {
        ar: recCatNameAr || recCatNameFr,
        fr: recCatNameFr || recCatNameAr,
        en: recCatNameEn || recCatNameFr
      },
      image: recCatImage.trim() || 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=600'
    };

    if (editingRecipeCat) {
      updateRecipeCategory(categoryData);
    } else {
      addRecipeCategory(categoryData);
    }
    setIsRecipeCatModalOpen(false);
  };

  // Recipe Modal Handlers
  const handleOpenRecipeModal = (recipe?: Recipe, defaultCategory?: string) => {
    if (recipe) {
      setEditingRecipe(recipe);
      setRecId(recipe.id);
      setRecTitleAr(recipe.title.ar);
      setRecTitleFr(recipe.title.fr);
      setRecTitleEn(recipe.title.en);
      setRecCategory(recipe.category || (recipeCategories[0]?.id || 'soupes_chorba'));
      setRecDescAr(recipe.description.ar);
      setRecDescFr(recipe.description.fr);
      setRecDescEn(recipe.description.en);
      setRecImage(recipe.image);
      setRecPrepTime(recipe.prepTime);
      setRecCookTime(recipe.cookTime);
      setRecDifficulty(recipe.difficulty);
      setRecServings(recipe.servings);
      
      const ingLines = recipe.ingredients.map(i => i.fr || i.ar).join('\n');
      setRecIngredientsText(ingLines);

      const stepLines = recipe.instructions.map(i => i.fr || i.ar).join('\n');
      setRecInstructionsText(stepLines);

      setRecSpicesUsed([...recipe.spicesUsed]);
    } else {
      setEditingRecipe(null);
      setRecId('');
      setRecTitleAr('');
      setRecTitleFr('');
      setRecTitleEn('');
      setRecCategory(defaultCategory || (recipeCategories[0]?.id || 'soupes_chorba'));
      setRecDescAr('');
      setRecDescFr('');
      setRecDescEn('');
      setRecImage('https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800');
      setRecPrepTime('20 min');
      setRecCookTime('45 min');
      setRecDifficulty('medium');
      setRecServings(4);
      setRecIngredientsText('1 oignon râpé\n2 cuillères de Smen\n1 verre de Frik\nÉpices El Boukhari');
      setRecInstructionsText('Faire revenir les oignons et la viande dans le Smen.\nAjouter les épices et l\'eau bouillante.\nMijoter pendant 30 minutes.');
      setRecSpicesUsed(products.slice(0, 2).map(p => p.id));
    }
    setIsRecipeModalOpen(true);
  };

  const handleSaveRecipe = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedSlug = recTitleFr.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || `recipe-${Date.now()}`;
    const finalId = recId.trim() ? recId.trim().toLowerCase().replace(/\s+/g, '-') : generatedSlug;

    const parsedIngredients = recIngredientsText
      .split('\n')
      .filter(line => line.trim().length > 0)
      .map(line => ({ ar: line.trim(), fr: line.trim(), en: line.trim() }));

    const parsedInstructions = recInstructionsText
      .split('\n')
      .filter(line => line.trim().length > 0)
      .map(line => ({ ar: line.trim(), fr: line.trim(), en: line.trim() }));

    const diffLabelMap = {
      easy: { ar: 'سهل', fr: 'Facile', en: 'Easy' },
      medium: { ar: 'متوسط', fr: 'Moyen', en: 'Medium' },
      hard: { ar: 'متقدم', fr: 'Avancé', en: 'Hard' }
    };

    const recipeData: Recipe = {
      id: finalId,
      title: {
        ar: recTitleAr || recTitleFr,
        fr: recTitleFr || recTitleAr,
        en: recTitleEn || recTitleFr
      },
      category: recCategory,
      description: {
        ar: recDescAr || recDescFr,
        fr: recDescFr || recDescAr,
        en: recDescEn || recDescFr
      },
      image: recImage.trim() || 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800',
      prepTime: recPrepTime || '20 min',
      cookTime: recCookTime || '40 min',
      difficulty: recDifficulty,
      difficultyLabel: diffLabelMap[recDifficulty],
      servings: Number(recServings) || 4,
      ingredients: parsedIngredients.length ? parsedIngredients : [{ ar: 'مكونات عادية', fr: 'Ingrédients de base', en: 'Basic ingredients' }],
      instructions: parsedInstructions.length ? parsedInstructions : [{ ar: 'خطوة التحضير الاولى', fr: 'Première étape', en: 'First step' }],
      spicesUsed: recSpicesUsed
    };

    if (editingRecipe) {
      updateRecipe(recipeData);
    } else {
      addRecipe(recipeData);
    }
    setIsRecipeModalOpen(false);
  };

  // Product Modal Handler
  const handleOpenProductModal = (prod?: Product) => {
    if (prod) {
      setEditingProduct(prod);
      setProdId(prod.id);
      setProdNameAr(prod.name.ar);
      setProdNameFr(prod.name.fr);
      setProdNameEn(prod.name.en);
      setProdCategory(prod.category);
      setProdShortDescAr(prod.shortDescription.ar);
      setProdShortDescFr(prod.shortDescription.fr);
      setProdShortDescEn(prod.shortDescription.en);
      setProdDescAr(prod.description.ar);
      setProdDescFr(prod.description.fr);
      setProdDescEn(prod.description.en);
      setProdIngrAr(prod.ingredients.ar);
      setProdIngrFr(prod.ingredients.fr);
      setProdIngrEn(prod.ingredients.en);
      setProdOriginAr(prod.origin.ar);
      setProdOriginFr(prod.origin.fr);
      setProdOriginEn(prod.origin.en);
      setProdImages(prod.images.length ? [...prod.images] : ['']);
      setProdIsBestSeller(!!prod.isBestSeller);
      setProdIsNew(!!prod.isNew);
      setProdWeightPrices(prod.weightPrices.length ? JSON.parse(JSON.stringify(prod.weightPrices)) : [{ weight: '100g', price: 600, stock: 50 }]);
    } else {
      setEditingProduct(null);
      setProdId('');
      setProdNameAr('');
      setProdNameFr('');
      setProdNameEn('');
      setProdCategory(categories[0]?.id || 'epices');
      setProdShortDescAr('');
      setProdShortDescFr('');
      setProdShortDescEn('');
      setProdDescAr('');
      setProdDescFr('');
      setProdDescEn('');
      setProdIngrAr('');
      setProdIngrFr('');
      setProdIngrEn('');
      setProdOriginAr('');
      setProdOriginFr('');
      setProdOriginEn('');
      setProdImages(['https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=600']);
      setProdIsBestSeller(false);
      setProdIsNew(true);
      setProdWeightPrices([
        { weight: '100g', price: 650, stock: 50 },
        { weight: '250g', price: 1500, stock: 30 }
      ]);
    }
    setIsProductModalOpen(true);
  };

  const handleAddWeightFormat = () => {
    setProdWeightPrices((prev) => [...prev, { weight: '500g', price: 2800, stock: 25 }]);
  };

  const handleUpdateWeightFormat = (index: number, field: keyof ProductWeightPrice, value: any) => {
    setProdWeightPrices((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const handleRemoveWeightFormat = (index: number) => {
    if (prodWeightPrices.length <= 1) return;
    setProdWeightPrices((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddImageInput = () => {
    setProdImages((prev) => [...prev, '']);
  };

  const handleUpdateImageInput = (index: number, val: string) => {
    setProdImages((prev) => {
      const copy = [...prev];
      copy[index] = val;
      return copy;
    });
  };

  const handleRemoveImageInput = (index: number) => {
    if (prodImages.length <= 1) return;
    setProdImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedSlug = prodNameFr.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || `prod-${Date.now()}`;
    const finalId = prodId.trim() ? prodId.trim().toLowerCase().replace(/\s+/g, '-') : generatedSlug;

    const selectedCatObj = categories.find((c) => c.id === prodCategory) || categories[0];
    const catNameObj = selectedCatObj ? selectedCatObj.name : { ar: prodCategory, fr: prodCategory, en: prodCategory };

    const validImages = prodImages.map((img) => img.trim()).filter((img) => img.length > 0);
    const validWeightPrices = prodWeightPrices.filter((wp) => wp.weight.trim() && wp.price > 0);

    const productData: Product = {
      id: finalId,
      name: {
        ar: prodNameAr || prodNameFr,
        fr: prodNameFr || prodNameAr,
        en: prodNameEn || prodNameFr
      },
      category: prodCategory || categories[0]?.id || 'epices',
      categoryName: catNameObj,
      shortDescription: {
        ar: prodShortDescAr || prodShortDescFr,
        fr: prodShortDescFr || prodShortDescAr,
        en: prodShortDescEn || prodShortDescFr
      },
      description: {
        ar: prodDescAr || prodDescFr,
        fr: prodDescFr || prodDescAr,
        en: prodDescEn || prodDescFr
      },
      ingredients: {
        ar: prodIngrAr || 'توابل طبيعية صافية 100%',
        fr: prodIngrFr || 'Épices 100% naturelles',
        en: prodIngrEn || '100% Natural spices'
      },
      origin: {
        ar: prodOriginAr || 'الجزائر',
        fr: prodOriginFr || 'Algérie',
        en: prodOriginEn || 'Algeria'
      },
      nutritionalInfo: editingProduct?.nutritionalInfo || {
        energy: '312 kcal / 100g',
        protein: '11.4g / 100g',
        fat: '8.2g / 100g',
        carbohydrates: '48.1g / 100g',
        sodium: '45mg / 100g'
      },
      rating: editingProduct?.rating || 5.0,
      reviewsCount: editingProduct?.reviewsCount || 12,
      reviews: editingProduct?.reviews || [],
      weightPrices: validWeightPrices.length ? validWeightPrices : [{ weight: '100g', price: 500, stock: 50 }],
      images: validImages.length ? validImages : ['https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=600'],
      isBestSeller: prodIsBestSeller,
      isNew: prodIsNew
    };

    if (editingProduct) {
      updateProduct(productData);
    } else {
      addProduct(productData);
    }
    setIsProductModalOpen(false);
  };

  // Filtered Products for Products Tab
  const filteredAdminProducts = products.filter((p) => {
    const matchesCat = prodCatFilter === 'all' || p.category === prodCatFilter;
    const q = prodSearch.toLowerCase();
    const matchesQuery =
      !q ||
      p.name.fr.toLowerCase().includes(q) ||
      p.name.ar.toLowerCase().includes(q) ||
      p.id.toLowerCase().includes(q);
    return matchesCat && matchesQuery;
  });

  // Check if Admin Authentication is required
  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div className="w-full min-h-screen bg-[#FDFBF7] dark:bg-[#030807] text-[#111111] dark:text-gray-100 py-16 px-4 md:px-8 font-sans flex items-center justify-center">
        <div className="max-w-md w-full bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#222222] p-8 rounded-3xl shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-[#C89B3C]/10 border border-[#C89B3C]/30 text-[#C89B3C] rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
              <Lock size={28} />
            </div>
            <span className="text-[#C89B3C] font-mono font-black text-xs tracking-widest uppercase block">
              {translate({ ar: 'توابل البوخاري - لوحة التحكم', fr: 'Épices El Boukhari - Administration', en: 'El Boukhari Admin Console' })}
            </span>
            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">
              {translate({ ar: 'تسجيل دخول المسؤول', fr: 'Authentification Administrateur', en: 'Admin Portal Access' })}
            </h1>
            <p className="text-xs text-gray-500">
              {translate({
                ar: 'أدخل بريد وكلمة مرور المسؤول للوصول إلى لوحة إدارة الطلبات والمخزون',
                fr: 'Veuillez vous authentifier avec un compte administrateur pour accéder à la gestion.',
                en: 'Please authenticate with admin credentials to access store management.'
              })}
            </p>
          </div>

          {authError && (
            <div className="p-3.5 bg-red-500/10 border border-red-500/30 rounded-xl text-red-500 text-xs font-bold flex items-center gap-2">
              <AlertCircle size={16} className="shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-bold text-gray-500 dark:text-gray-400">
                {translate({ ar: 'البريد الإلكتروني للمسؤول', fr: 'Adresse Email Administrateur', en: 'Admin Email' })}
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  placeholder="admin@elboukhari.dz"
                  className="w-full bg-[#FDFBF7] dark:bg-black border border-gray-200 dark:border-[#222222] focus:border-[#C89B3C] focus:outline-none pl-10 pr-4 py-3.5 rounded-xl text-gray-900 dark:text-white font-mono"
                />
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-gray-500 dark:text-gray-400">
                {translate({ ar: 'كلمة المرور', fr: 'Mot de passe', en: 'Password' })}
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#FDFBF7] dark:bg-black border border-gray-200 dark:border-[#222222] focus:border-[#C89B3C] focus:outline-none pl-10 pr-4 py-3.5 rounded-xl text-gray-900 dark:text-white font-mono"
                />
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#C89B3C] hover:bg-black hover:text-[#C89B3C] dark:hover:bg-white dark:hover:text-black text-black font-extrabold py-4 rounded-xl transition shadow-lg text-xs uppercase tracking-wider cursor-pointer flex items-center justify-center gap-2 mt-2"
            >
              <ShieldCheck size={16} />
              <span>{translate({ ar: 'دخول لوحة التحكم', fr: 'Connexion Administrateur', en: 'Login to Dashboard' })}</span>
            </button>

            {onNavigate && (
              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => onNavigate('home')}
                  className="text-gray-500 hover:text-gray-900 dark:hover:text-white text-xs underline font-medium"
                >
                  {translate({ ar: '← العودة للمتجر', fr: '← Retour à la boutique', en: '← Back to boutique' })}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#FDFBF7] dark:bg-[#030807] text-[#111111] dark:text-gray-100 py-12 px-4 md:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Admin Header Title */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-100 dark:border-[#222222] pb-6 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-[#C89B3C]/10 border border-[#C89B3C]/30 px-3 py-1 rounded-full text-[10px] text-[#C89B3C] tracking-widest font-black uppercase">
              <Sparkles size={10} />
              <span>EL BOUKHARI CONSOLE</span>
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mt-1">
              {translate({ ar: 'لوحة التحكم الإدارية للبخاري', fr: 'Console Administration El Boukhari', en: 'El Boukhari Brand Console' })}
            </h1>
            <p className="text-xs text-gray-500">
              Gérez les catégories, ajoutez des produits et leurs formats de poids/prix, et gérez les commandes.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-white dark:bg-[#111111] border border-emerald-500/30 p-1.5 px-3 rounded-xl text-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <div className="flex flex-col">
                <span className="font-bold text-[10px] uppercase tracking-wider text-emerald-500">
                  Temps Réel Actif
                </span>
                <span className="text-[10px] text-gray-500 font-mono">
                  Supabase Realtime
                </span>
              </div>
            </div>

            <div className="text-right hidden sm:block">
              <span className="text-[10px] text-emerald-500 font-extrabold uppercase tracking-wider block">● ADMIN CONNECTÉ</span>
              <span className="text-xs text-gray-400 font-mono">{currentUser.email}</span>
            </div>
            <button
              onClick={() => logout()}
              className="bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white border border-red-500/30 px-3.5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-sm"
              title="Déconnexion Administrateur"
            >
              <LogOut size={14} />
              <span>{translate({ ar: 'خروج', fr: 'Déconnexion', en: 'Logout' })}</span>
            </button>
          </div>
        </div>

        {/* Quick Tab control headers */}
        <div className="flex flex-wrap gap-2 text-xs">
          <button
            onClick={() => setActivePanel('dashboard')}
            className={`px-4 py-2.5 rounded-xl font-bold transition ${activePanel === 'dashboard' ? 'bg-[#C89B3C] text-black shadow' : 'bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#222222] text-gray-400 hover:text-white'}`}
          >
            Aperçu Analytique
          </button>
          <button
            onClick={() => setActivePanel('orders')}
            className={`px-4 py-2.5 rounded-xl font-bold transition ${activePanel === 'orders' ? 'bg-[#C89B3C] text-black shadow' : 'bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#222222] text-gray-400 hover:text-white'}`}
          >
            Commandes ({orders.length})
          </button>
          <button
            onClick={() => setActivePanel('categories')}
            className={`px-4 py-2.5 rounded-xl font-bold transition flex items-center gap-1.5 ${activePanel === 'categories' ? 'bg-[#C89B3C] text-black shadow' : 'bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#222222] text-gray-400 hover:text-white'}`}
          >
            <Layers size={14} />
            <span>Catégories ({categories.length})</span>
          </button>
          <button
            onClick={() => setActivePanel('products')}
            className={`px-4 py-2.5 rounded-xl font-bold transition flex items-center gap-1.5 ${activePanel === 'products' ? 'bg-[#C89B3C] text-black shadow' : 'bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#222222] text-gray-400 hover:text-white'}`}
          >
            <Package size={14} />
            <span>Produits ({products.length})</span>
          </button>
          <button
            onClick={() => setActivePanel('coupons')}
            className={`px-4 py-2.5 rounded-xl font-bold transition ${activePanel === 'coupons' ? 'bg-[#C89B3C] text-black shadow' : 'bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#222222] text-gray-400 hover:text-white'}`}
          >
            Codes Promo ({coupons.length})
          </button>
          <button
            onClick={() => setActivePanel('recipes')}
            className={`px-4 py-2.5 rounded-xl font-bold transition flex items-center gap-1.5 ${activePanel === 'recipes' ? 'bg-[#C89B3C] text-black shadow' : 'bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#222222] text-gray-400 hover:text-white'}`}
          >
            <BookOpen size={14} />
            <span>Recettes ({recipes.length})</span>
          </button>
          <button
            onClick={() => setActivePanel('shipping')}
            className={`px-4 py-2.5 rounded-xl font-bold transition flex items-center gap-1.5 ${activePanel === 'shipping' ? 'bg-[#C89B3C] text-black shadow' : 'bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#222222] text-gray-400 hover:text-white'}`}
          >
            <Truck size={14} />
            <span>Frais de Livraison (58 Wilayas)</span>
          </button>
        </div>

        {/* ===================== OVERVIEW ANALYTICS TAB ===================== */}
        {activePanel === 'dashboard' && (
          <div className="space-y-8 animate-fade-in">
            {/* Corporate widgets row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Revenue */}
              <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#222222] p-6 rounded-3xl shadow-sm flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] text-gray-400 uppercase font-black tracking-widest">Chiffre d'affaires</span>
                  <p className="text-2xl font-black text-[#C89B3C] font-mono">{formatPrice(totalRev)}</p>
                  <span className="text-[10px] text-emerald-500 font-bold flex items-center gap-1">
                    <TrendingUp size={12} /> Chiffre d'affaires réel
                  </span>
                </div>
                <div className="w-12 h-12 bg-[#C89B3C]/10 border border-[#C89B3C]/30 text-[#C89B3C] rounded-2xl flex items-center justify-center">
                  <TrendingUp size={22} />
                </div>
              </div>

              {/* Total Orders */}
              <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#222222] p-6 rounded-3xl shadow-sm flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] text-gray-400 uppercase font-black tracking-widest">Commandes globales</span>
                  <p className="text-2xl font-black text-gray-900 dark:text-white font-mono">{totalOrdersCount}</p>
                  <span className="text-[10px] text-gray-500 font-mono">Commandes reçues</span>
                </div>
                <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/30 text-blue-500 rounded-2xl flex items-center justify-center">
                  <ShoppingBag size={22} />
                </div>
              </div>

              {/* Products count */}
              <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#222222] p-6 rounded-3xl shadow-sm flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] text-gray-400 uppercase font-black tracking-widest">Produits au catalogue</span>
                  <p className="text-2xl font-black text-gray-900 dark:text-white font-mono">{products.length}</p>
                  <span className="text-[10px] text-gray-500">{categories.length} catégories actives</span>
                </div>
                <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/30 text-purple-500 rounded-2xl flex items-center justify-center">
                  <Package size={22} />
                </div>
              </div>

              {/* Active Coupons */}
              <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#222222] p-6 rounded-3xl shadow-sm flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] text-gray-400 uppercase font-black tracking-widest">Codes Promo Actifs</span>
                  <p className="text-2xl font-black text-gray-900 dark:text-white font-mono">{coupons.length}</p>
                  <span className="text-[10px] text-emerald-500 font-bold">Campagnes actives</span>
                </div>
                <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 rounded-2xl flex items-center justify-center">
                  <Percent size={22} />
                </div>
              </div>
            </div>

            {/* Quick overview of categories & products */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#222222] p-6 rounded-3xl shadow-sm space-y-4">
                <div className="flex justify-between items-center border-b border-gray-100 dark:border-[#222222] pb-3">
                  <h3 className="font-extrabold text-gray-900 dark:text-white text-sm">Catégories du magasin</h3>
                  <button onClick={() => setActivePanel('categories')} className="text-xs text-[#C89B3C] font-bold hover:underline">
                    Gérer ({categories.length}) →
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {categories.map((c) => (
                    <div key={c.id} className="p-3 bg-[#FDFBF7] dark:bg-black rounded-xl border border-gray-100 dark:border-[#222222] flex items-center gap-3">
                      <img src={c.image} alt={c.name.fr} className="w-10 h-10 object-cover rounded-lg" />
                      <div className="overflow-hidden">
                        <p className="font-bold text-xs truncate text-gray-900 dark:text-white">{c.name.fr}</p>
                        <p className="text-[10px] text-gray-500">{products.filter((p) => p.category === c.id).length} produits</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#222222] p-6 rounded-3xl shadow-sm space-y-4">
                <div className="flex justify-between items-center border-b border-gray-100 dark:border-[#222222] pb-3">
                  <h3 className="font-extrabold text-gray-900 dark:text-white text-sm">Dernières commandes enregistrées</h3>
                  <button onClick={() => setActivePanel('orders')} className="text-xs text-[#C89B3C] font-bold hover:underline">
                    Voir tout ({orders.length}) →
                  </button>
                </div>
                {orders.length === 0 ? (
                  <p className="text-xs text-gray-500 py-4 text-center">Aucune commande pour le moment.</p>
                ) : (
                  <div className="space-y-2">
                    {orders.slice(0, 4).map((o) => (
                      <div key={o.id} className="p-3 bg-[#FDFBF7] dark:bg-black rounded-xl border border-gray-100 dark:border-[#222222] flex justify-between items-center text-xs">
                        <div>
                          <p className="font-mono font-bold text-gray-900 dark:text-white">{o.id}</p>
                          <p className="text-[10px] text-gray-500">{o.shippingAddress.fullName} • {o.shippingAddress.wilaya}</p>
                        </div>
                        <span className="font-bold font-mono text-[#C89B3C]">{formatPrice(o.total)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ===================== ORDERS SUPERVISOR TAB ===================== */}
        {activePanel === 'orders' && (
          <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#222222] p-6 rounded-3xl shadow-sm space-y-6 animate-fade-in">
            <div className="flex justify-between items-center border-b border-gray-100 dark:border-[#222222] pb-3">
              <h3 className="font-extrabold text-gray-900 dark:text-white text-base">
                Registre des commandes clients ({orders.length})
              </h3>
            </div>

            {orders.length === 0 ? (
              <div className="text-center py-12 text-gray-500 text-xs">
                <p>Aucune commande enregistrée pour l'instant.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left rtl:text-right border-collapse">
                  <thead>
                    <tr className="border-b border-gray-100 dark:border-[#222222] text-gray-400 font-bold uppercase">
                      <th className="py-3 px-4">N° Commande & Date</th>
                      <th className="py-3 px-4">Client & Wilaya</th>
                      <th className="py-3 px-4">Articles</th>
                      <th className="py-3 px-4">Total</th>
                      <th className="py-3 px-4">Statut</th>
                      <th className="py-3 px-4 text-right">Mettre à jour</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 dark:divide-[#222222] text-gray-700 dark:text-gray-300">
                    {orders.map((o) => (
                      <tr key={o.id} className="hover:bg-[#FDFBF7] dark:hover:bg-black/40 transition">
                        <td className="py-4 px-4">
                          <p className="font-black font-mono text-gray-900 dark:text-white">{o.id}</p>
                          <p className="text-[10px] text-gray-500 font-mono">{o.date}</p>
                        </td>
                        <td className="py-4 px-4">
                          <p className="font-bold text-gray-900 dark:text-white">{o.shippingAddress.fullName}</p>
                          <p className="text-[10px] text-gray-500">{o.shippingAddress.phone}</p>
                          <p className="text-[10px] text-[#C89B3C] font-bold">{o.shippingAddress.wilaya} - {o.shippingAddress.commune}</p>
                        </td>
                        <td className="py-4 px-4">
                          <div className="space-y-1">
                            {o.items.map((item, idx) => (
                              <p key={idx} className="text-[11px]">
                                {item.quantity}x <span className="font-medium text-gray-900 dark:text-white">{item.productName}</span> ({item.weight})
                              </p>
                            ))}
                          </div>
                        </td>
                        <td className="py-4 px-4 font-mono font-bold text-[#C89B3C]">
                          {formatPrice(o.total)}
                        </td>
                        <td className="py-4 px-4">
                          <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] uppercase tracking-wider ${
                            o.status === 'delivered' ? 'bg-emerald-500/10 text-emerald-500' :
                            o.status === 'shipped' ? 'bg-blue-500/10 text-blue-500' :
                            o.status === 'confirmed' ? 'bg-purple-500/10 text-purple-500' :
                            o.status === 'cancelled' ? 'bg-red-500/10 text-red-500' : 'bg-amber-500/10 text-amber-500'
                          }`}>
                            {o.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <select
                            value={o.status}
                            onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                            className="bg-[#FDFBF7] dark:bg-black border border-gray-200 dark:border-[#222222] text-xs font-bold py-1.5 px-2.5 rounded-xl text-gray-900 dark:text-white"
                          >
                            <option value="pending">En attente</option>
                            <option value="confirmed">Confirmée</option>
                            <option value="shipped">Expédiée (Yalidine)</option>
                            <option value="delivered">Livrée</option>
                            <option value="cancelled">Annulée</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ===================== CATEGORIES TAB ===================== */}
        {activePanel === 'categories' && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#222222] p-6 rounded-3xl shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="font-extrabold text-gray-900 dark:text-white text-lg">
                  Gestion des Catégories ({categories.length})
                </h3>
                <p className="text-xs text-gray-500">
                  Ajoutez, modifiez ou supprimez les catégories de la boutique El Boukhari.
                </p>
              </div>
              <button
                onClick={() => handleOpenCategoryModal()}
                className="bg-[#C89B3C] text-black hover:bg-black hover:text-[#C89B3C] dark:hover:bg-white font-extrabold px-5 py-3 rounded-xl transition text-xs flex items-center gap-2 cursor-pointer shadow-md"
              >
                <FolderPlus size={16} />
                <span>Nouveau Fichier / Catégorie</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((cat) => {
                const count = products.filter((p) => p.category === cat.id).length;
                return (
                  <div
                    key={cat.id}
                    className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#222222] rounded-3xl p-5 shadow-sm space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-100 dark:bg-black border border-gray-100 dark:border-[#222222]">
                        <img src={cat.image} alt={cat.name.fr} className="w-full h-full object-cover" />
                        <span className="absolute top-2 left-2 bg-black/70 backdrop-blur-md text-[#C89B3C] font-mono text-[10px] font-extrabold px-2.5 py-1 rounded-md">
                          ID: {cat.id}
                        </span>
                      </div>

                      <div>
                        <h4 className="font-black text-gray-900 dark:text-white text-base">{cat.name.fr}</h4>
                        <p className="text-xs text-gray-500 font-sans rtl:font-arabic" dir="rtl">{cat.name.ar}</p>
                        <p className="text-[11px] text-gray-400 font-sans mt-0.5">{cat.name.en}</p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-gray-100 dark:border-[#222222] flex justify-between items-center">
                      <span className="text-xs font-bold text-gray-500 bg-gray-100 dark:bg-[#222222] px-3 py-1 rounded-full">
                        {count} produit{count > 1 ? 's' : ''}
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleOpenCategoryModal(cat)}
                          className="p-2 bg-gray-100 dark:bg-[#222222] hover:bg-[#C89B3C] hover:text-black rounded-xl text-gray-600 dark:text-gray-300 transition cursor-pointer"
                          title="Modifier"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() => {
                            setDeleteConfirm({
                              isOpen: true,
                              title: 'Supprimer la catégorie',
                              message: `Êtes-vous sûr de vouloir supprimer la catégorie "${cat.name.fr}" (${cat.name.ar}) ?`,
                              confirmLabel: 'Supprimer la catégorie',
                              onConfirm: () => {
                                deleteCategory(cat.id);
                                setDeleteConfirm(null);
                              }
                            });
                          }}
                          className="p-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-xl transition cursor-pointer"
                          title="Supprimer"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ===================== PRODUCTS TAB ===================== */}
        {activePanel === 'products' && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#222222] p-6 rounded-3xl shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h3 className="font-extrabold text-gray-900 dark:text-white text-lg">
                  Gestion des Produits ({products.length})
                </h3>
                <p className="text-xs text-gray-500">
                  Définissez vos épices, gérez les descriptions et configurez les formats disponibles (poids/prix).
                </p>
              </div>

              <button
                onClick={() => handleOpenProductModal()}
                className="bg-[#C89B3C] text-black hover:bg-black hover:text-[#C89B3C] dark:hover:bg-white font-extrabold px-5 py-3 rounded-xl transition text-xs flex items-center gap-2 cursor-pointer shadow-md"
              >
                <PackagePlus size={16} />
                <span>Nouveau Produit</span>
              </button>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={prodSearch}
                  onChange={(e) => setProdSearch(e.target.value)}
                  placeholder="Rechercher un produit par nom ou ID..."
                  className="w-full bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#222222] focus:border-[#C89B3C] focus:outline-none pl-10 pr-4 py-3 rounded-2xl text-xs text-gray-900 dark:text-white"
                />
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              </div>

              <select
                value={prodCatFilter}
                onChange={(e) => setProdCatFilter(e.target.value)}
                className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#222222] focus:border-[#C89B3C] focus:outline-none px-4 py-3 rounded-2xl text-xs font-bold text-gray-900 dark:text-white"
              >
                <option value="all">Toutes les catégories ({products.length})</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name.fr} ({products.filter((p) => p.category === c.id).length})
                  </option>
                ))}
              </select>
            </div>

            {/* Products Table */}
            <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#222222] rounded-3xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left rtl:text-right border-collapse">
                  <thead>
                    <tr className="border-b border-gray-100 dark:border-[#222222] text-gray-400 font-bold uppercase bg-[#FDFBF7] dark:bg-black/50">
                      <th className="py-3.5 px-4">Produit</th>
                      <th className="py-3.5 px-4">Catégorie</th>
                      <th className="py-3.5 px-4">Formats disponibles (Poids & Prix)</th>
                      <th className="py-3.5 px-4 text-center">Badges</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 dark:divide-[#222222] text-gray-700 dark:text-gray-300">
                    {filteredAdminProducts.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-12 text-center text-gray-500">
                          Aucun produit trouvé dans cette recherche.
                        </td>
                      </tr>
                    ) : (
                      filteredAdminProducts.map((p) => (
                        <tr key={p.id} className="hover:bg-[#FDFBF7] dark:hover:bg-black/40 transition">
                          <td className="py-4 px-4 flex gap-3 items-center">
                            <img src={p.images[0]} alt={p.name.fr} className="w-12 h-12 object-cover rounded-xl border border-gray-100 dark:border-[#222222] shrink-0" />
                            <div>
                              <p className="font-bold text-gray-900 dark:text-white text-sm">{p.name.fr}</p>
                              <p className="text-[11px] text-gray-500 rtl:font-arabic" dir="rtl">{p.name.ar}</p>
                              <p className="text-[10px] text-[#C89B3C] font-mono">{p.id}</p>
                            </div>
                          </td>

                          <td className="py-4 px-4">
                            <span className="bg-[#C89B3C]/10 text-[#C89B3C] font-mono font-bold px-2.5 py-1 rounded-md text-[10px]">
                              {p.category}
                            </span>
                          </td>

                          <td className="py-4 px-4">
                            <div className="flex flex-wrap gap-1.5">
                              {p.weightPrices.map((wp, idx) => (
                                <span
                                  key={idx}
                                  className="bg-gray-100 dark:bg-[#222222] border border-gray-200 dark:border-gray-700 px-2 py-1 rounded-lg text-[10px] font-mono"
                                >
                                  <strong>{wp.weight}</strong>: {formatPrice(wp.price)} <span className="text-gray-400">({wp.stock} en stock)</span>
                                </span>
                              ))}
                            </div>
                          </td>

                          <td className="py-4 px-4 text-center">
                            <div className="flex items-center justify-center gap-1">
                              {p.isBestSeller && (
                                <span className="bg-amber-500/10 text-amber-500 font-bold px-2 py-0.5 rounded text-[9px]">
                                  BEST SELLER
                                </span>
                              )}
                              {p.isNew && (
                                <span className="bg-emerald-500/10 text-emerald-500 font-bold px-2 py-0.5 rounded text-[9px]">
                                  NOUVEAU
                                </span>
                              )}
                            </div>
                          </td>

                          <td className="py-4 px-4 text-right">
                            <div className="inline-flex gap-2">
                              <button
                                onClick={() => handleOpenProductModal(p)}
                                className="px-3 py-1.5 bg-[#C89B3C]/10 text-[#C89B3C] hover:bg-[#C89B3C] hover:text-black font-bold rounded-xl transition text-xs flex items-center gap-1 cursor-pointer"
                              >
                                <Edit size={12} />
                                <span>Éditer</span>
                              </button>
                              <button
                                onClick={() => {
                                  setDeleteConfirm({
                                    isOpen: true,
                                    title: 'Supprimer le produit',
                                    message: `Êtes-vous sûr de vouloir supprimer définitivement le produit "${p.name.fr}" (${p.name.ar}) ?`,
                                    confirmLabel: 'Supprimer le produit',
                                    onConfirm: () => {
                                      deleteProduct(p.id);
                                      setDeleteConfirm(null);
                                    }
                                  });
                                }}
                                className="p-1.5 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-xl transition cursor-pointer"
                                title="Supprimer"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ===================== CAMPAIGN CODES TAB ===================== */}
        {activePanel === 'coupons' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in">
            <div className="lg:col-span-7 bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#222222] p-6 rounded-3xl shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-[#222222] pb-3">
                <div>
                  <h3 className="font-extrabold text-gray-900 dark:text-white text-base">
                    Liste des codes promo actifs
                  </h3>
                  <p className="text-xs text-gray-500">
                    Gérez vos codes de réduction, modifiez leurs valeurs ou supprimez-les.
                  </p>
                </div>
                <span className="text-xs font-mono font-bold bg-[#C89B3C]/10 text-[#C89B3C] px-3 py-1 rounded-full border border-[#C89B3C]/30">
                  {coupons.length} code{coupons.length > 1 ? 's' : ''}
                </span>
              </div>

              <div className="space-y-4">
                {coupons.length === 0 ? (
                  <div className="text-center py-10 bg-[#FDFBF7] dark:bg-black rounded-2xl border border-dashed border-gray-200 dark:border-[#222222] p-6">
                    <Percent className="mx-auto text-gray-400 mb-2" size={32} />
                    <p className="text-xs text-gray-500 font-bold">Aucun code promo actif.</p>
                    <p className="text-[11px] text-gray-400 mt-1">Créez votre premier code de réduction dans le formulaire ci-contre.</p>
                  </div>
                ) : (
                  coupons.map((c) => {
                    const isBeingEdited = editingCoupon?.code === c.code;
                    return (
                      <div
                        key={c.code}
                        className={`p-4 rounded-2xl border transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs ${
                          isBeingEdited
                            ? 'bg-[#C89B3C]/10 border-[#C89B3C] shadow-sm'
                            : 'bg-[#FDFBF7] dark:bg-black border-gray-100 dark:border-[#222222] hover:border-gray-300 dark:hover:border-[#333333]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 bg-[#C89B3C]/10 text-[#C89B3C] rounded-2xl flex items-center justify-center font-bold text-sm border border-[#C89B3C]/20 shrink-0">
                            {c.discountType === 'percentage' ? '%' : 'DA'}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-black text-gray-900 dark:text-white text-base tracking-wider font-mono">
                                {c.code}
                              </span>
                              {isBeingEdited && (
                                <span className="bg-[#C89B3C] text-black text-[9px] font-black px-2 py-0.5 rounded-full uppercase">
                                  En modification
                                </span>
                              )}
                            </div>
                            <p className="text-xs font-bold text-[#C89B3C] mt-0.5">
                              {c.discountType === 'percentage' ? `Réduction de -${c.value}%` : `Réduction de -${c.value.toLocaleString()} DA`}
                            </p>
                            <p className="text-[10px] text-gray-400 mt-0.5">
                              Commande min: {c.minSubtotal ? `${c.minSubtotal.toLocaleString()} DA` : 'Sans minimum'}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-center">
                          <span className="hidden md:inline-block bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 font-bold px-2.5 py-1 rounded-md text-[9px] uppercase tracking-wider">
                            Actif
                          </span>

                          <button
                            type="button"
                            onClick={() => handleEditCoupon(c)}
                            className="p-2 bg-amber-500/10 hover:bg-amber-500 text-amber-600 dark:text-amber-400 hover:text-white rounded-xl transition cursor-pointer flex items-center gap-1 font-bold text-xs"
                            title="Modifier ce code promo"
                          >
                            <Edit size={14} />
                            <span className="sm:hidden md:inline">Modifier</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDeleteCoupon(c.code)}
                            className="p-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-xl transition cursor-pointer flex items-center gap-1 font-bold text-xs"
                            title="Supprimer ce code promo"
                          >
                            <Trash2 size={14} />
                            <span className="sm:hidden md:inline">Supprimer</span>
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            <div className="lg:col-span-5 bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#222222] p-6 rounded-3xl shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-[#222222] pb-3">
                <div>
                  {editingCoupon ? (
                    <div>
                      <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest block font-mono">
                        Modification en cours
                      </span>
                      <h3 className="font-extrabold text-gray-900 dark:text-white text-base">
                        Modifier : {editingCoupon.code}
                      </h3>
                    </div>
                  ) : (
                    <h3 className="font-extrabold text-gray-900 dark:text-white text-base">
                      Créer un nouveau code promo
                    </h3>
                  )}
                </div>
                {editingCoupon && (
                  <button
                    type="button"
                    onClick={handleCancelCouponEdit}
                    className="text-xs text-gray-400 hover:text-gray-900 dark:hover:text-white font-bold cursor-pointer"
                  >
                    Annuler
                  </button>
                )}
              </div>

              <form onSubmit={handleCreateCoupon} className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-bold text-gray-500">Code promo (ex: BOUKHARI10)</label>
                  <input
                    type="text"
                    required
                    value={newCode}
                    onChange={(e) => setNewCode(e.target.value)}
                    placeholder="Ex: SPECIAL30"
                    className="w-full bg-[#FDFBF7] dark:bg-black border border-gray-200 dark:border-[#222222] focus:border-[#C89B3C] focus:outline-none p-3.5 rounded-xl text-gray-900 dark:text-white font-mono font-bold tracking-wider uppercase"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="font-bold text-gray-500">Type de réduction</label>
                    <select
                      value={newType}
                      onChange={(e) => setNewType(e.target.value as 'percentage' | 'fixed')}
                      className="w-full bg-[#FDFBF7] dark:bg-black border border-gray-200 dark:border-[#222222] focus:border-[#C89B3C] focus:outline-none p-3.5 rounded-xl text-gray-900 dark:text-white font-bold"
                    >
                      <option value="percentage">Pourcentage (%)</option>
                      <option value="fixed">Montant fixe (DA)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-gray-500">
                      Valeur {newType === 'percentage' ? '(%)' : '(DA)'}
                    </label>
                    <input
                      type="number"
                      required
                      min={1}
                      max={newType === 'percentage' ? 100 : 100000}
                      value={newVal}
                      onChange={(e) => setNewVal(Number(e.target.value))}
                      className="w-full bg-[#FDFBF7] dark:bg-black border border-gray-200 dark:border-[#222222] focus:border-[#C89B3C] focus:outline-none p-3.5 rounded-xl text-gray-900 dark:text-white font-mono font-bold"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-gray-500">Montant minimum de panier (DA)</label>
                  <input
                    type="number"
                    min={0}
                    step={100}
                    value={newMinSubtotal}
                    onChange={(e) => setNewMinSubtotal(Number(e.target.value))}
                    placeholder="1000"
                    className="w-full bg-[#FDFBF7] dark:bg-black border border-gray-200 dark:border-[#222222] focus:border-[#C89B3C] focus:outline-none p-3.5 rounded-xl text-gray-900 dark:text-white font-mono"
                  />
                  <p className="text-[10px] text-gray-400">
                    Le code s'appliquera uniquement si le sous-total est supérieur ou égal à ce montant.
                  </p>
                </div>

                {editingCoupon ? (
                  <div className="flex gap-2 pt-2">
                    <button
                      type="submit"
                      className="flex-1 bg-[#C89B3C] hover:bg-[#d8ab4c] text-black font-black py-3.5 rounded-xl transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Check size={16} />
                      <span>Enregistrer les modifications</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleCancelCouponEdit}
                      className="px-4 bg-gray-200 dark:bg-[#222222] hover:bg-gray-300 dark:hover:bg-[#333333] text-gray-700 dark:text-gray-300 font-bold py-3.5 rounded-xl transition cursor-pointer"
                    >
                      Annuler
                    </button>
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="w-full bg-[#C89B3C] hover:bg-white text-black font-black py-4 rounded-xl transition shadow-md mt-2 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Plus size={16} />
                    <span>Publier le code promo</span>
                  </button>
                )}
              </form>
            </div>
          </div>
        )}

        {/* ===================== GESTION DES RECETTES TAB ===================== */}
        {activePanel === 'recipes' && (
          <div className="space-y-6 animate-fade-in">
            {/* Top Sub-Bar & Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#222222] p-4 rounded-3xl shadow-sm">
              <div className="flex gap-2">
                <button
                  onClick={() => setRecipeSubTab('recipes_list')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    recipeSubTab === 'recipes_list'
                      ? 'bg-[#C89B3C] text-black shadow'
                      : 'bg-gray-100 dark:bg-[#1A1A1A] text-gray-500 hover:text-white'
                  }`}
                >
                  <BookOpen size={14} />
                  <span>Toutes les Recettes ({recipes.length})</span>
                </button>
                <button
                  onClick={() => setRecipeSubTab('recipe_categories')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    recipeSubTab === 'recipe_categories'
                      ? 'bg-[#C89B3C] text-black shadow'
                      : 'bg-gray-100 dark:bg-[#1A1A1A] text-gray-500 hover:text-white'
                  }`}
                >
                  <UtensilsCrossed size={14} />
                  <span>Catégories de Recettes ({recipeCategories.length})</span>
                </button>
              </div>

              <div>
                {recipeSubTab === 'recipes_list' ? (
                  <button
                    onClick={() => handleOpenRecipeModal()}
                    className="bg-[#C89B3C] hover:bg-black hover:text-[#C89B3C] dark:hover:bg-white dark:hover:text-black text-black font-extrabold px-4 py-2.5 rounded-xl text-xs transition flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <Plus size={16} />
                    <span>Ajouter une Recette</span>
                  </button>
                ) : (
                  <button
                    onClick={() => handleOpenRecipeCatModal()}
                    className="bg-[#C89B3C] hover:bg-black hover:text-[#C89B3C] dark:hover:bg-white dark:hover:text-black text-black font-extrabold px-4 py-2.5 rounded-xl text-xs transition flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <Plus size={16} />
                    <span>Nouvelle Catégorie de Recette</span>
                  </button>
                )}
              </div>
            </div>

            {/* SUB TAB 1: RECIPES LIST */}
            {recipeSubTab === 'recipes_list' && (
              <div className="space-y-6">
                {/* Search & Filter */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={recSearch}
                      onChange={(e) => setRecSearch(e.target.value)}
                      placeholder="Rechercher une recette par titre..."
                      className="w-full bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#222222] focus:border-[#C89B3C] focus:outline-none pl-10 pr-4 py-3 rounded-2xl text-xs text-gray-900 dark:text-white"
                    />
                    <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                  <select
                    value={recCatFilter}
                    onChange={(e) => setRecCatFilter(e.target.value)}
                    className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#222222] focus:border-[#C89B3C] focus:outline-none px-4 py-3 rounded-2xl text-xs text-gray-900 dark:text-white"
                  >
                    <option value="all">Toutes les catégories</option>
                    {recipeCategories.map((rc) => (
                      <option key={rc.id} value={rc.id}>
                        {translate(rc.name)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Grid of Recipes */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recipes
                    .filter((r) => {
                      const matchesCat = recCatFilter === 'all' || r.category === recCatFilter;
                      const q = recSearch.toLowerCase();
                      const matchesSearch =
                        !q ||
                        r.title.fr.toLowerCase().includes(q) ||
                        r.title.ar.includes(q);
                      return matchesCat && matchesSearch;
                    })
                    .map((r) => (
                      <div
                        key={r.id}
                        className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#222222] rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between group hover:border-[#C89B3C] transition"
                      >
                        <div>
                          <div className="relative h-44 overflow-hidden">
                            <img
                              src={r.image}
                              alt={r.title.fr}
                              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                            />
                            <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-[#C89B3C]">
                              {r.prepTime} + {r.cookTime}
                            </div>
                          </div>
                          <div className="p-5 space-y-3">
                            <div>
                              <span className="text-[10px] font-extrabold text-[#C89B3C] uppercase tracking-wider block">
                                {recipeCategories.find((c) => c.id === r.category)?.name.fr || r.category}
                              </span>
                              <h3 className="font-extrabold text-gray-900 dark:text-white text-base">
                                {r.title.fr}
                              </h3>
                              <p className="text-xs text-gray-500 rtl:font-arabic line-clamp-1" dir="rtl">
                                {r.title.ar}
                              </p>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                              {r.description.fr}
                            </p>
                            <div className="flex items-center gap-2 text-[10px] text-gray-400">
                              <span className="bg-gray-100 dark:bg-[#1C1C1C] px-2 py-1 rounded-md font-bold">
                                {r.difficultyLabel.fr}
                              </span>
                              <span className="bg-gray-100 dark:bg-[#1C1C1C] px-2 py-1 rounded-md font-bold">
                                {r.servings} Personnes
                              </span>
                              <span className="bg-[#C89B3C]/10 text-[#C89B3C] px-2 py-1 rounded-md font-bold">
                                {r.spicesUsed.length} Épices associées
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="p-4 bg-gray-50 dark:bg-[#161616] border-t border-gray-100 dark:border-[#222222] flex gap-2">
                          <button
                            onClick={() => handleOpenRecipeModal(r)}
                            className="flex-1 bg-white dark:bg-black border border-gray-200 dark:border-[#333333] hover:border-[#C89B3C] text-gray-700 dark:text-gray-200 font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                          >
                            <Edit size={14} className="text-[#C89B3C]" />
                            <span>Modifier</span>
                          </button>
                          <button
                            onClick={() => {
                              setDeleteConfirm({
                                isOpen: true,
                                title: 'Supprimer la recette',
                                message: `Voulez-vous vraiment supprimer la recette "${r.title.fr}" ?`,
                                confirmLabel: 'Supprimer la recette',
                                onConfirm: () => {
                                  deleteRecipe(r.id);
                                  setDeleteConfirm(null);
                                }
                              });
                            }}
                            className="bg-red-500/10 hover:bg-red-500 hover:text-white border border-red-500/30 text-red-500 font-bold p-2 rounded-xl text-xs transition cursor-pointer"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* SUB TAB 2: RECIPE CATEGORIES */}
            {recipeSubTab === 'recipe_categories' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recipeCategories.map((rc) => {
                  const catRecipes = recipes.filter((r) => r.category === rc.id);
                  return (
                    <div
                      key={rc.id}
                      className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#222222] rounded-3xl p-5 shadow-sm hover:border-[#C89B3C] transition flex flex-col justify-between group"
                    >
                      <div>
                        <div className="flex items-start gap-4 mb-4">
                          <img
                            src={rc.image}
                            alt={rc.name.fr}
                            className="w-20 h-20 rounded-2xl object-cover shrink-0 border border-gray-200 dark:border-[#222222] group-hover:scale-105 transition"
                          />
                          <div className="flex-1 space-y-1 overflow-hidden">
                            <span className="text-[10px] font-mono font-bold text-[#C89B3C] uppercase block">
                              ID: {rc.id}
                            </span>
                            <h4 className="font-extrabold text-gray-900 dark:text-white text-base truncate">
                              {rc.name.fr}
                            </h4>
                            <p className="text-xs text-gray-500 rtl:font-arabic font-bold truncate" dir="rtl">
                              {rc.name.ar}
                            </p>
                            <div className="pt-1">
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#C89B3C]/10 text-[#C89B3C]">
                                <BookOpen size={12} />
                                <span>{catRecipes.length} recette{catRecipes.length > 1 ? 's' : ''}</span>
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Preview of recipes assigned to this category */}
                        {catRecipes.length > 0 ? (
                          <div className="space-y-1.5 mb-4 bg-gray-50 dark:bg-[#161616] p-3 rounded-2xl border border-gray-100 dark:border-[#222222]">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                              Recettes dans cette catégorie ({catRecipes.length}) :
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {catRecipes.slice(0, 3).map((r) => (
                                <span
                                  key={r.id}
                                  className="text-[10px] bg-white dark:bg-black text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded-md border border-gray-200 dark:border-[#333333] font-medium"
                                >
                                  {r.title.fr}
                                </span>
                              ))}
                              {catRecipes.length > 3 && (
                                <span className="text-[10px] text-gray-400 font-bold self-center">
                                  +{catRecipes.length - 3} autre{catRecipes.length - 3 > 1 ? 's' : ''}
                                </span>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="mb-4 bg-gray-50 dark:bg-[#161616] p-3 rounded-2xl border border-dashed border-gray-200 dark:border-[#333333] text-center">
                            <span className="text-[11px] text-gray-400">
                              Aucune recette dans cette catégorie pour le moment.
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Card Action Buttons */}
                      <div className="pt-3 border-t border-gray-100 dark:border-[#222222] flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setRecCatFilter(rc.id);
                            setRecipeSubTab('recipes_list');
                          }}
                          className="flex-1 py-2 px-2 bg-gray-100 hover:bg-gray-200 dark:bg-[#1E1E1E] dark:hover:bg-[#282828] text-gray-800 dark:text-gray-200 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer"
                          title="Voir les recettes de cette catégorie"
                        >
                          <Eye size={13} />
                          <span>Voir ({catRecipes.length})</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleOpenRecipeModal(undefined, rc.id)}
                          className="py-2 px-2.5 bg-[#C89B3C]/10 hover:bg-[#C89B3C] text-[#C89B3C] hover:text-black rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer"
                          title="Ajouter une recette dans cette catégorie"
                        >
                          <Plus size={13} />
                          <span>+ Recette</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleOpenRecipeCatModal(rc)}
                          className="p-2 bg-gray-100 dark:bg-[#222222] text-gray-600 dark:text-gray-300 hover:text-[#C89B3C] rounded-xl transition cursor-pointer"
                          title="Modifier la catégorie"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setDeleteConfirm({
                              isOpen: true,
                              title: 'Supprimer la catégorie de recette',
                              message: `Supprimer la catégorie "${rc.name.fr}" ? Les recettes associées seront automatiquement conservées et réaffectées.`,
                              confirmLabel: 'Supprimer la catégorie',
                              onConfirm: () => {
                                deleteRecipeCategory(rc.id);
                                setDeleteConfirm(null);
                              }
                            });
                          }}
                          className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition cursor-pointer"
                          title="Supprimer la catégorie"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ===================== GESTION DES FRAIS DE LIVRAISON TAB ===================== */}
        {activePanel === 'shipping' && (
          <div className="space-y-6 animate-fade-in">
            {/* Siège Social & Headquarters Origin Banner */}
            <div className="bg-gradient-to-r from-amber-500/10 via-[#C89B3C]/10 to-transparent border border-[#C89B3C]/30 p-6 rounded-3xl space-y-3 relative overflow-hidden">
              <div className="flex items-center gap-3 text-[#C89B3C]">
                <div className="w-10 h-10 bg-[#C89B3C] text-black font-extrabold rounded-2xl flex items-center justify-center shrink-0">
                  <MapPin size={22} />
                </div>
                <div>
                  <h3 className="font-extrabold text-gray-900 dark:text-white text-lg">
                    Siège Social d'Origine : Wilaya 31 - Oran
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Définissez la tarification différenciée pour les 58 Wilayas d'Algérie (Livraison À Domicile et Retrait Stop Desk).
                  </p>
                </div>
              </div>
            </div>

            {/* Batch Shipping Rate Modifier & Search Tool */}
            <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#222222] p-6 rounded-3xl shadow-sm space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-gray-100 dark:border-[#222222]">
                <div>
                  <h4 className="font-extrabold text-gray-900 dark:text-white text-base flex items-center gap-2">
                    <Truck size={18} className="text-[#C89B3C]" />
                    <span>Mise à jour globale rapide des tarifs (58 Wilayas)</span>
                  </h4>
                  <p className="text-xs text-gray-500">
                    Appliquez un tarif forfaitaire à toutes les Wilayas d'un seul clic, puis ajustez individuellement.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                  <div className="flex items-center gap-2 bg-[#FDFBF7] dark:bg-black border border-gray-200 dark:border-[#222222] px-3 py-2 rounded-xl text-xs">
                    <Home size={14} className="text-gray-400" />
                    <span className="text-gray-500 font-bold">Domicile:</span>
                    <input
                      type="number"
                      value={batchHomeRate}
                      onChange={(e) => setBatchHomeRate(Number(e.target.value))}
                      className="w-20 bg-transparent text-gray-900 dark:text-white font-mono font-bold focus:outline-none"
                    />
                    <span className="text-gray-400">DA</span>
                  </div>

                  <div className="flex items-center gap-2 bg-[#FDFBF7] dark:bg-black border border-gray-200 dark:border-[#222222] px-3 py-2 rounded-xl text-xs">
                    <Building2 size={14} className="text-gray-400" />
                    <span className="text-gray-500 font-bold">Stop Desk:</span>
                    <input
                      type="number"
                      value={batchDeskRate}
                      onChange={(e) => setBatchDeskRate(Number(e.target.value))}
                      className="w-20 bg-transparent text-gray-900 dark:text-white font-mono font-bold focus:outline-none"
                    />
                    <span className="text-gray-400">DA</span>
                  </div>

                  <button
                    onClick={() => {
                      setDeleteConfirm({
                        isOpen: true,
                        title: 'Appliquer les tarifs de livraison globaux',
                        message: `Appliquer ${batchHomeRate.toLocaleString()} DA (Domicile) et ${batchDeskRate.toLocaleString()} DA (Stop Desk) à TOUTES les 58 Wilayas ?`,
                        confirmLabel: 'Appliquer aux 58 Wilayas',
                        onConfirm: () => {
                          applyGlobalShippingRates(batchHomeRate, batchDeskRate);
                          setDeleteConfirm(null);
                        }
                      });
                    }}
                    className="bg-[#C89B3C] hover:bg-black hover:text-[#C89B3C] dark:hover:bg-white dark:hover:text-black text-black font-extrabold px-4 py-2.5 rounded-xl text-xs transition cursor-pointer"
                  >
                    Appliquer aux 58 Wilayas
                  </button>
                </div>
              </div>

              {/* Wilaya Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  value={wilayaSearch}
                  onChange={(e) => setWilayaSearch(e.target.value)}
                  placeholder="Rechercher une Wilaya par Nom ou par Code (ex: 31, Oran, Alger, 01)..."
                  className="w-full bg-[#FDFBF7] dark:bg-black border border-gray-200 dark:border-[#222222] focus:border-[#C89B3C] focus:outline-none pl-10 pr-4 py-3.5 rounded-2xl text-xs text-gray-900 dark:text-white"
                />
                <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>

              {/* Wilayas Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left rtl:text-right text-xs">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-[#222222] text-gray-400 uppercase tracking-widest text-[10px]">
                      <th className="py-3 px-3">Code</th>
                      <th className="py-3 px-3">Wilaya</th>
                      <th className="py-3 px-3">À Domicile (DA)</th>
                      <th className="py-3 px-3">Stop Desk / Bureau (DA)</th>
                      <th className="py-3 px-3">Statut Service</th>
                      <th className="py-3 px-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-[#222222]">
                    {shippingRates
                      .filter((w) => {
                        const q = wilayaSearch.toLowerCase().trim();
                        if (!q) return true;
                        return (
                          w.code.toString().includes(q) ||
                          w.name.fr.toLowerCase().includes(q) ||
                          w.name.ar.includes(q)
                        );
                      })
                      .map((w) => {
                        const isOran = w.code === 31;
                        return (
                          <tr key={w.code} className="hover:bg-gray-50 dark:hover:bg-[#161616] transition">
                            <td className="py-3 px-3 font-mono font-bold text-[#C89B3C]">
                              {w.code < 10 ? `0${w.code}` : w.code}
                            </td>
                            <td className="py-3 px-3 font-bold text-gray-900 dark:text-white">
                              <div className="flex items-center gap-2">
                                <span>{w.name.fr}</span>
                                <span className="text-gray-400 rtl:font-arabic">({w.name.ar})</span>
                                {isOran && (
                                  <span className="bg-[#C89B3C]/20 text-[#C89B3C] border border-[#C89B3C]/40 text-[9px] font-black px-2 py-0.5 rounded-full uppercase">
                                    ★ Siège Social
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="py-3 px-3">
                              <input
                                type="number"
                                value={w.homeRate}
                                onChange={(e) =>
                                  updateShippingRate(w.code, { homeRate: Number(e.target.value) })
                                }
                                className="w-24 bg-[#FDFBF7] dark:bg-black border border-gray-200 dark:border-[#222222] focus:border-[#C89B3C] px-2.5 py-1.5 rounded-lg font-mono font-bold text-gray-900 dark:text-white"
                              />
                            </td>
                            <td className="py-3 px-3">
                              <input
                                type="number"
                                value={w.deskRate}
                                onChange={(e) =>
                                  updateShippingRate(w.code, { deskRate: Number(e.target.value) })
                                }
                                className="w-24 bg-[#FDFBF7] dark:bg-black border border-gray-200 dark:border-[#222222] focus:border-[#C89B3C] px-2.5 py-1.5 rounded-lg font-mono font-bold text-gray-900 dark:text-white"
                              />
                            </td>
                            <td className="py-3 px-3">
                              <label className="inline-flex items-center gap-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={w.active !== false}
                                  onChange={(e) =>
                                    updateShippingRate(w.code, { active: e.target.checked })
                                  }
                                  className="w-4 h-4 text-[#C89B3C] rounded focus:ring-[#C89B3C]"
                                />
                                <span className={w.active !== false ? 'text-emerald-500 font-bold' : 'text-gray-400'}>
                                  {w.active !== false ? 'Actif' : 'Inactif'}
                                </span>
                              </label>
                            </td>
                            <td className="py-3 px-3 text-right">
                              <span className="text-[10px] text-emerald-500 font-bold flex items-center justify-end gap-1">
                                <Check size={12} /> Sauvegardé
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ===================== CATEGORY MODAL ===================== */}
        {isCategoryModalOpen && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#222222] max-w-lg w-full rounded-3xl p-6 shadow-2xl space-y-6">
              <div className="flex justify-between items-center border-b border-gray-100 dark:border-[#222222] pb-3">
                <h3 className="font-extrabold text-gray-900 dark:text-white text-base">
                  {editingCategory ? 'Modifier la Catégorie' : 'Nouvelle Catégorie'}
                </h3>
                <button
                  onClick={() => setIsCategoryModalOpen(false)}
                  className="p-1 text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSaveCategory} className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-bold text-gray-500">Identifiant Unique / Slug (ID)</label>
                  <input
                    type="text"
                    value={catId}
                    onChange={(e) => setCatId(e.target.value)}
                    placeholder="ex: epices, poivres, herbes (automatique si vide)"
                    className="w-full bg-[#FDFBF7] dark:bg-black border border-gray-200 dark:border-[#222222] focus:border-[#C89B3C] focus:outline-none p-3 rounded-xl text-gray-900 dark:text-white font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-gray-500">Nom en Français (FR)</label>
                  <input
                    type="text"
                    required
                    value={catNameFr}
                    onChange={(e) => setCatNameFr(e.target.value)}
                    placeholder="ex: Épices Simples"
                    className="w-full bg-[#FDFBF7] dark:bg-black border border-gray-200 dark:border-[#222222] focus:border-[#C89B3C] focus:outline-none p-3 rounded-xl text-gray-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-gray-500">Nom en Arabe (AR)</label>
                  <input
                    type="text"
                    required
                    value={catNameAr}
                    onChange={(e) => setCatNameAr(e.target.value)}
                    placeholder="ex: توابل منفردة"
                    className="w-full bg-[#FDFBF7] dark:bg-black border border-gray-200 dark:border-[#222222] focus:border-[#C89B3C] focus:outline-none p-3 rounded-xl text-gray-900 dark:text-white rtl:font-arabic"
                    dir="rtl"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-gray-500">Nom en Anglais (EN)</label>
                  <input
                    type="text"
                    value={catNameEn}
                    onChange={(e) => setCatNameEn(e.target.value)}
                    placeholder="ex: Single Spices"
                    className="w-full bg-[#FDFBF7] dark:bg-black border border-gray-200 dark:border-[#222222] focus:border-[#C89B3C] focus:outline-none p-3 rounded-xl text-gray-900 dark:text-white"
                  />
                </div>

                <AdminImageInput
                  value={catImage}
                  onChange={setCatImage}
                  label="Image d'illustration de la catégorie"
                  placeholder="https://images.unsplash.com/... ou fichier local"
                  required
                />

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsCategoryModalOpen(false)}
                    className="flex-1 py-3 bg-gray-100 dark:bg-[#222222] text-gray-700 dark:text-gray-300 font-bold rounded-xl"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-[#C89B3C] text-black font-extrabold rounded-xl hover:bg-black hover:text-[#C89B3C] transition cursor-pointer"
                  >
                    Enregistrer la Catégorie
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ===================== PRODUCT MODAL ===================== */}
        {isProductModalOpen && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#222222] max-w-3xl w-full rounded-3xl p-6 shadow-2xl space-y-6 my-8 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center border-b border-gray-100 dark:border-[#222222] pb-3 sticky top-0 bg-white dark:bg-[#111111] z-10">
                <h3 className="font-extrabold text-gray-900 dark:text-white text-base">
                  {editingProduct ? `Modifier: ${editingProduct.name.fr}` : 'Nouveau Produit (Épice)'}
                </h3>
                <button
                  onClick={() => setIsProductModalOpen(false)}
                  className="p-1 text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-6 text-xs">
                
                {/* Product Name & Category */}
                <div className="space-y-4 bg-[#FDFBF7] dark:bg-black p-4 rounded-2xl border border-gray-100 dark:border-[#222222]">
                  <h4 className="font-bold text-[#C89B3C] uppercase text-[10px] tracking-wider">1. Informations Générales</h4>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="font-bold text-gray-500">Nom en Français (FR)</label>
                      <input
                        type="text"
                        required
                        value={prodNameFr}
                        onChange={(e) => setProdNameFr(e.target.value)}
                        placeholder="ex: Curcuma Pur des Indes"
                        className="w-full bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#222222] focus:border-[#C89B3C] focus:outline-none p-2.5 rounded-xl text-gray-900 dark:text-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-gray-500">Nom en Arabe (AR)</label>
                      <input
                        type="text"
                        required
                        value={prodNameAr}
                        onChange={(e) => setProdNameAr(e.target.value)}
                        placeholder="ex: كركم هندي خالص"
                        className="w-full bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#222222] focus:border-[#C89B3C] focus:outline-none p-2.5 rounded-xl text-gray-900 dark:text-white rtl:font-arabic"
                        dir="rtl"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-gray-500">Nom en Anglais (EN)</label>
                      <input
                        type="text"
                        value={prodNameEn}
                        onChange={(e) => setProdNameEn(e.target.value)}
                        placeholder="ex: Pure Indian Turmeric"
                        className="w-full bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#222222] focus:border-[#C89B3C] focus:outline-none p-2.5 rounded-xl text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="font-bold text-gray-500">Catégorie</label>
                      <select
                        value={prodCategory}
                        onChange={(e) => setProdCategory(e.target.value)}
                        className="w-full bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#222222] focus:border-[#C89B3C] focus:outline-none p-2.5 rounded-xl text-gray-900 dark:text-white font-bold"
                      >
                        {categories.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name.fr} ({c.name.ar})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-gray-500">Identifiant / ID Slug (ex: curcuma-pur)</label>
                      <input
                        type="text"
                        value={prodId}
                        onChange={(e) => setProdId(e.target.value)}
                        placeholder="Généré automatiquement si vide"
                        className="w-full bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#222222] focus:border-[#C89B3C] focus:outline-none p-2.5 rounded-xl text-gray-900 dark:text-white font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* Dynamic Weight & Prices Formats Section */}
                <div className="space-y-4 bg-[#FDFBF7] dark:bg-black p-4 rounded-2xl border border-gray-100 dark:border-[#222222]">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-[#C89B3C] uppercase text-[10px] tracking-wider">2. Formats de Poids & Prix Disponibles</h4>
                      <p className="text-[10px] text-gray-400">Définissez les grammages (50g, 100g, 250g, 500g, 1kg) et prix correspondants.</p>
                    </div>

                    <button
                      type="button"
                      onClick={handleAddWeightFormat}
                      className="bg-[#C89B3C]/10 text-[#C89B3C] hover:bg-[#C89B3C] hover:text-black font-bold px-3 py-1.5 rounded-xl transition text-[11px] flex items-center gap-1 border border-[#C89B3C]/30 cursor-pointer"
                    >
                      <Plus size={12} />
                      <span>Ajouter un format</span>
                    </button>
                  </div>

                  <div className="space-y-2">
                    {prodWeightPrices.map((wp, idx) => (
                      <div key={idx} className="flex items-center gap-2 bg-white dark:bg-[#111111] p-3 rounded-xl border border-gray-200 dark:border-[#222222]">
                        <div className="flex-1">
                          <label className="text-[9px] text-gray-400 font-bold block">Poids/Format</label>
                          <input
                            type="text"
                            required
                            value={wp.weight}
                            onChange={(e) => handleUpdateWeightFormat(idx, 'weight', e.target.value)}
                            placeholder="ex: 100g"
                            className="w-full bg-transparent border-b border-gray-200 dark:border-gray-700 focus:border-[#C89B3C] focus:outline-none font-bold text-gray-900 dark:text-white py-1"
                          />
                        </div>

                        <div className="flex-1">
                          <label className="text-[9px] text-gray-400 font-bold block">Prix (DA)</label>
                          <input
                            type="number"
                            required
                            min={1}
                            value={wp.price}
                            onChange={(e) => handleUpdateWeightFormat(idx, 'price', Number(e.target.value))}
                            placeholder="ex: 600"
                            className="w-full bg-transparent border-b border-gray-200 dark:border-gray-700 focus:border-[#C89B3C] focus:outline-none font-mono font-bold text-[#C89B3C] py-1"
                          />
                        </div>

                        <div className="flex-1">
                          <label className="text-[9px] text-gray-400 font-bold block">Ancien Prix DA (Promo)</label>
                          <input
                            type="number"
                            value={wp.oldPrice || ''}
                            onChange={(e) => handleUpdateWeightFormat(idx, 'oldPrice', e.target.value ? Number(e.target.value) : undefined)}
                            placeholder="Optionnel"
                            className="w-full bg-transparent border-b border-gray-200 dark:border-gray-700 focus:border-[#C89B3C] focus:outline-none font-mono text-gray-400 py-1"
                          />
                        </div>

                        <div className="w-24">
                          <label className="text-[9px] text-gray-400 font-bold block">Stock (Unités)</label>
                          <input
                            type="number"
                            min={0}
                            value={wp.stock}
                            onChange={(e) => handleUpdateWeightFormat(idx, 'stock', Number(e.target.value))}
                            className="w-full bg-transparent border-b border-gray-200 dark:border-gray-700 focus:border-[#C89B3C] focus:outline-none font-mono font-bold text-emerald-500 py-1"
                          />
                        </div>

                        {prodWeightPrices.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveWeightFormat(idx)}
                            className="p-2 text-red-400 hover:text-red-600 cursor-pointer mt-3"
                            title="Supprimer ce format"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Images URLs & Local Uploads */}
                <div className="space-y-4 bg-[#FDFBF7] dark:bg-black p-4 rounded-2xl border border-gray-100 dark:border-[#222222]">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-[#C89B3C] uppercase text-[10px] tracking-wider">3. Images du produit</h4>
                      <p className="text-[11px] text-gray-500">Collez un lien Web ou choisissez une photo depuis votre appareil</p>
                    </div>
                    <button
                      type="button"
                      onClick={handleAddImageInput}
                      className="text-[#C89B3C] text-[11px] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Plus size={13} />
                      <span>Ajouter une autre vue</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {prodImages.map((img, idx) => (
                      <div key={idx} className="bg-white dark:bg-[#111111] p-3 rounded-2xl border border-gray-200 dark:border-[#222222] space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-[11px] font-bold text-gray-700 dark:text-gray-300">
                            {idx === 0 ? 'Image principale du produit' : `Vue secondaire #${idx + 1}`}
                          </span>
                          {prodImages.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveImageInput(idx)}
                              className="text-red-500 hover:text-red-700 p-1 flex items-center gap-1 text-[11px] font-bold cursor-pointer"
                            >
                              <Trash2 size={13} />
                              <span>Retirer</span>
                            </button>
                          )}
                        </div>
                        <AdminImageInput
                          value={img}
                          onChange={(val) => handleUpdateImageInput(idx, val)}
                          placeholder="https://images.unsplash.com/... ou fichier local"
                          required={idx === 0}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Short & Full Descriptions */}
                <div className="space-y-4 bg-[#FDFBF7] dark:bg-black p-4 rounded-2xl border border-gray-100 dark:border-[#222222]">
                  <h4 className="font-bold text-[#C89B3C] uppercase text-[10px] tracking-wider">4. Descriptions & Origine</h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="font-bold text-gray-500">Description courte (FR)</label>
                      <textarea
                        rows={2}
                        value={prodShortDescFr}
                        onChange={(e) => setProdShortDescFr(e.target.value)}
                        className="w-full bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#222222] focus:border-[#C89B3C] focus:outline-none p-2.5 rounded-xl text-gray-900 dark:text-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-gray-500">Description courte (AR)</label>
                      <textarea
                        rows={2}
                        value={prodShortDescAr}
                        onChange={(e) => setProdShortDescAr(e.target.value)}
                        className="w-full bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#222222] focus:border-[#C89B3C] focus:outline-none p-2.5 rounded-xl text-gray-900 dark:text-white rtl:font-arabic"
                        dir="rtl"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="font-bold text-gray-500">Description complète (FR)</label>
                      <textarea
                        rows={3}
                        value={prodDescFr}
                        onChange={(e) => setProdDescFr(e.target.value)}
                        className="w-full bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#222222] focus:border-[#C89B3C] focus:outline-none p-2.5 rounded-xl text-gray-900 dark:text-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-gray-500">Description complète (AR)</label>
                      <textarea
                        rows={3}
                        value={prodDescAr}
                        onChange={(e) => setProdDescAr(e.target.value)}
                        className="w-full bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#222222] focus:border-[#C89B3C] focus:outline-none p-2.5 rounded-xl text-gray-900 dark:text-white rtl:font-arabic"
                        dir="rtl"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="font-bold text-gray-500">Origine (ex: Algérie / Inde)</label>
                      <input
                        type="text"
                        value={prodOriginFr}
                        onChange={(e) => setProdOriginFr(e.target.value)}
                        placeholder="Algérie, Inde, etc."
                        className="w-full bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#222222] focus:border-[#C89B3C] focus:outline-none p-2.5 rounded-xl text-gray-900 dark:text-white"
                      />
                    </div>

                    <div className="flex items-center gap-6 pt-4">
                      <label className="inline-flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={prodIsBestSeller}
                          onChange={(e) => setProdIsBestSeller(e.target.checked)}
                          className="w-4 h-4 text-[#C89B3C] rounded focus:ring-[#C89B3C]"
                        />
                        <span className="font-bold text-gray-700 dark:text-gray-300">★ Best-Seller</span>
                      </label>

                      <label className="inline-flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={prodIsNew}
                          onChange={(e) => setProdIsNew(e.target.checked)}
                          className="w-4 h-4 text-emerald-500 rounded focus:ring-emerald-500"
                        />
                        <span className="font-bold text-emerald-500">✦ Nouveau Produit</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsProductModalOpen(false)}
                    className="flex-1 py-3 bg-gray-100 dark:bg-[#222222] text-gray-700 dark:text-gray-300 font-bold rounded-xl"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-[#C89B3C] text-black font-extrabold rounded-xl hover:bg-black hover:text-[#C89B3C] transition cursor-pointer"
                  >
                    Enregistrer le Produit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ===================== RECIPE CATEGORY MODAL ===================== */}
        {isRecipeCatModalOpen && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#222222] max-w-lg w-full rounded-3xl p-6 shadow-2xl space-y-6">
              <div className="flex justify-between items-center border-b border-gray-100 dark:border-[#222222] pb-3">
                <h3 className="font-extrabold text-gray-900 dark:text-white text-base">
                  {editingRecipeCat ? 'Modifier la Catégorie de Recette' : 'Nouvelle Catégorie de Recette'}
                </h3>
                <button
                  onClick={() => setIsRecipeCatModalOpen(false)}
                  className="p-1 text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSaveRecipeCat} className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-bold text-gray-500">ID / Code Slug (ex: soupes_chorba)</label>
                  <input
                    type="text"
                    value={recCatId}
                    onChange={(e) => setRecCatId(e.target.value)}
                    placeholder="soupes_chorba"
                    className="w-full bg-[#FDFBF7] dark:bg-black border border-gray-200 dark:border-[#222222] focus:border-[#C89B3C] focus:outline-none p-3 rounded-xl text-gray-900 dark:text-white font-mono"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="font-bold text-gray-500">Nom (Français)</label>
                    <input
                      type="text"
                      required
                      value={recCatNameFr}
                      onChange={(e) => setRecCatNameFr(e.target.value)}
                      placeholder="Chorbas & Soupes"
                      className="w-full bg-[#FDFBF7] dark:bg-black border border-gray-200 dark:border-[#222222] focus:border-[#C89B3C] focus:outline-none p-3 rounded-xl text-gray-900 dark:text-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-gray-500">Nom (Arabe)</label>
                    <input
                      type="text"
                      required
                      value={recCatNameAr}
                      onChange={(e) => setRecCatNameAr(e.target.value)}
                      placeholder="الشربة والحساء"
                      className="w-full bg-[#FDFBF7] dark:bg-black border border-gray-200 dark:border-[#222222] focus:border-[#C89B3C] focus:outline-none p-3 rounded-xl text-gray-900 dark:text-white rtl:font-arabic"
                      dir="rtl"
                    />
                  </div>
                </div>

                <AdminImageInput
                  value={recCatImage}
                  onChange={setRecCatImage}
                  label="Image d'illustration de la catégorie"
                  placeholder="https://images.unsplash.com/... ou fichier local"
                />

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsRecipeCatModalOpen(false)}
                    className="flex-1 py-3 bg-gray-100 dark:bg-[#222222] text-gray-700 dark:text-gray-300 font-bold rounded-xl"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-[#C89B3C] text-black font-extrabold rounded-xl hover:bg-black hover:text-[#C89B3C] transition cursor-pointer"
                  >
                    Enregistrer la Catégorie
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ===================== RECIPE EDIT / CREATE MODAL ===================== */}
        {isRecipeModalOpen && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#222222] max-w-2xl w-full rounded-3xl p-6 shadow-2xl space-y-6 my-8">
              <div className="flex justify-between items-center border-b border-gray-100 dark:border-[#222222] pb-3">
                <h3 className="font-extrabold text-gray-900 dark:text-white text-base flex items-center gap-2">
                  <BookOpen size={18} className="text-[#C89B3C]" />
                  <span>{editingRecipe ? 'Modifier la Recette' : 'Ajouter une Nouvelle Recette'}</span>
                </h3>
                <button
                  onClick={() => setIsRecipeModalOpen(false)}
                  className="p-1 text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSaveRecipe} className="space-y-4 text-xs max-h-[75vh] overflow-y-auto pr-2">
                {/* ID & Category */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="font-bold text-gray-500">ID / Code Slug (ex: chorba-frik-traditionnelle)</label>
                    <input
                      type="text"
                      value={recId}
                      onChange={(e) => setRecId(e.target.value)}
                      placeholder="chorba-frik-traditionnelle"
                      className="w-full bg-[#FDFBF7] dark:bg-black border border-gray-200 dark:border-[#222222] focus:border-[#C89B3C] focus:outline-none p-3 rounded-xl text-gray-900 dark:text-white font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-gray-500">Catégorie de Recette</label>
                    <select
                      value={recCategory}
                      onChange={(e) => setRecCategory(e.target.value)}
                      className="w-full bg-[#FDFBF7] dark:bg-black border border-gray-200 dark:border-[#222222] focus:border-[#C89B3C] focus:outline-none p-3 rounded-xl text-gray-900 dark:text-white font-bold"
                    >
                      {recipeCategories.map((rc) => (
                        <option key={rc.id} value={rc.id}>
                          {translate(rc.name)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Titles */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="font-bold text-gray-500">Titre de la recette (Français)</label>
                    <input
                      type="text"
                      required
                      value={recTitleFr}
                      onChange={(e) => setRecTitleFr(e.target.value)}
                      placeholder="Chorba Frik Algéroise"
                      className="w-full bg-[#FDFBF7] dark:bg-black border border-gray-200 dark:border-[#222222] focus:border-[#C89B3C] focus:outline-none p-3 rounded-xl text-gray-900 dark:text-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-gray-500">Titre de la recette (Arabe)</label>
                    <input
                      type="text"
                      required
                      value={recTitleAr}
                      onChange={(e) => setRecTitleAr(e.target.value)}
                      placeholder="شربة فريك جزائرية أصيلة"
                      className="w-full bg-[#FDFBF7] dark:bg-black border border-gray-200 dark:border-[#222222] focus:border-[#C89B3C] focus:outline-none p-3 rounded-xl text-gray-900 dark:text-white rtl:font-arabic"
                      dir="rtl"
                    />
                  </div>
                </div>

                {/* Descriptions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="font-bold text-gray-500">Description courte (Français)</label>
                    <textarea
                      rows={2}
                      value={recDescFr}
                      onChange={(e) => setRecDescFr(e.target.value)}
                      placeholder="La véritable recette traditionnelle de Chorba Frik aux épices..."
                      className="w-full bg-[#FDFBF7] dark:bg-black border border-gray-200 dark:border-[#222222] focus:border-[#C89B3C] focus:outline-none p-3 rounded-xl text-gray-900 dark:text-white resize-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-gray-500">Description courte (Arabe)</label>
                    <textarea
                      rows={2}
                      value={recDescAr}
                      onChange={(e) => setRecDescAr(e.target.value)}
                      placeholder="الوصفة التقليدية الأصلية لشربة الفريك بالتوابل..."
                      className="w-full bg-[#FDFBF7] dark:bg-black border border-gray-200 dark:border-[#222222] focus:border-[#C89B3C] focus:outline-none p-3 rounded-xl text-gray-900 dark:text-white rtl:font-arabic resize-none"
                      dir="rtl"
                    />
                  </div>
                </div>

                {/* Prep, Cook, Difficulty, Servings */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="space-y-1.5">
                    <label className="font-bold text-gray-500">Préparation</label>
                    <input
                      type="text"
                      value={recPrepTime}
                      onChange={(e) => setRecPrepTime(e.target.value)}
                      placeholder="20 min"
                      className="w-full bg-[#FDFBF7] dark:bg-black border border-gray-200 dark:border-[#222222] focus:border-[#C89B3C] focus:outline-none p-3 rounded-xl text-gray-900 dark:text-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-gray-500">Cuisson</label>
                    <input
                      type="text"
                      value={recCookTime}
                      onChange={(e) => setRecCookTime(e.target.value)}
                      placeholder="45 min"
                      className="w-full bg-[#FDFBF7] dark:bg-black border border-gray-200 dark:border-[#222222] focus:border-[#C89B3C] focus:outline-none p-3 rounded-xl text-gray-900 dark:text-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-gray-500">Difficulté</label>
                    <select
                      value={recDifficulty}
                      onChange={(e) => setRecDifficulty(e.target.value as 'easy' | 'medium' | 'hard')}
                      className="w-full bg-[#FDFBF7] dark:bg-black border border-gray-200 dark:border-[#222222] focus:border-[#C89B3C] focus:outline-none p-3 rounded-xl text-gray-900 dark:text-white"
                    >
                      <option value="easy">Facile / سهل</option>
                      <option value="medium">Moyen / متوسط</option>
                      <option value="hard">Avancé / صعبة</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-gray-500">Personnes</label>
                    <input
                      type="number"
                      value={recServings}
                      onChange={(e) => setRecServings(Number(e.target.value))}
                      placeholder="4"
                      className="w-full bg-[#FDFBF7] dark:bg-black border border-gray-200 dark:border-[#222222] focus:border-[#C89B3C] focus:outline-none p-3 rounded-xl text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                {/* Photo de la Recette */}
                <AdminImageInput
                  value={recImage}
                  onChange={setRecImage}
                  label="Photo de la recette"
                  placeholder="https://images.unsplash.com/... ou fichier de votre ordinateur"
                />

                {/* Ingredients Textarea (1 per line) */}
                <div className="space-y-1.5">
                  <label className="font-bold text-gray-500">
                    Ingrédients & Ingrédients clés (1 ingrédient par ligne)
                  </label>
                  <textarea
                    rows={4}
                    value={recIngredientsText}
                    onChange={(e) => setRecIngredientsText(e.target.value)}
                    placeholder="1 oignon râpé&#10;2 cuillères à soupe de Smen&#10;1 verre de Frik&#10;Mélange Épices Chorba El Boukhari"
                    className="w-full bg-[#FDFBF7] dark:bg-black border border-gray-200 dark:border-[#222222] focus:border-[#C89B3C] focus:outline-none p-3 rounded-xl text-gray-900 dark:text-white font-mono text-xs"
                  />
                </div>

                {/* Instructions Textarea (1 step per line) */}
                <div className="space-y-1.5">
                  <label className="font-bold text-gray-500">
                    Étapes de Préparation (1 étape par ligne)
                  </label>
                  <textarea
                    rows={4}
                    value={recInstructionsText}
                    onChange={(e) => setRecInstructionsText(e.target.value)}
                    placeholder="Faire revenir la viande et les oignons dans le Smen.&#10;Ajouter les tomates râpées et le mélange d'épices Chorba El Boukhari.&#10;Verser l'eau bouillante et laisser mijoter 30 minutes.&#10;Ajouter le Frik rincé et mélanger délicatement."
                    className="w-full bg-[#FDFBF7] dark:bg-black border border-gray-200 dark:border-[#222222] focus:border-[#C89B3C] focus:outline-none p-3 rounded-xl text-gray-900 dark:text-white font-mono text-xs"
                  />
                </div>

                {/* Spice pairings selection */}
                <div className="space-y-2 bg-[#FDFBF7] dark:bg-black p-4 rounded-2xl border border-gray-200 dark:border-[#222222]">
                  <label className="font-extrabold text-[#C89B3C] uppercase text-[10px] tracking-wider block">
                    Épices & Produits El Boukhari recommandés pour cette recette
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-36 overflow-y-auto pr-1">
                    {products.map((p) => {
                      const isSelected = recSpicesUsed.includes(p.id);
                      return (
                        <label
                          key={p.id}
                          className={`flex items-center gap-2 p-2 rounded-xl border text-xs cursor-pointer transition ${
                            isSelected
                              ? 'bg-[#C89B3C]/10 border-[#C89B3C] text-gray-900 dark:text-white font-bold'
                              : 'bg-white dark:bg-[#111111] border-gray-200 dark:border-[#222222] text-gray-500'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setRecSpicesUsed([...recSpicesUsed, p.id]);
                              } else {
                                setRecSpicesUsed(recSpicesUsed.filter((id) => id !== p.id));
                              }
                            }}
                            className="w-3.5 h-3.5 text-[#C89B3C] rounded focus:ring-[#C89B3C]"
                          />
                          <span className="truncate">{p.name.fr}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div className="flex gap-3 pt-3 border-t border-gray-100 dark:border-[#222222]">
                  <button
                    type="button"
                    onClick={() => setIsRecipeModalOpen(false)}
                    className="flex-1 py-3 bg-gray-100 dark:bg-[#222222] text-gray-700 dark:text-gray-300 font-bold rounded-xl"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-[#C89B3C] text-black font-extrabold rounded-xl hover:bg-black hover:text-[#C89B3C] transition cursor-pointer"
                  >
                    Enregistrer la Recette
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ===================== CONFIRMATION MODAL (IFRAME SECURE) ===================== */}
        {deleteConfirm && deleteConfirm.isOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white dark:bg-[#141414] border border-gray-200 dark:border-[#222222] rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl animate-scale-up">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 flex items-center justify-center shrink-0">
                  <AlertCircle size={26} />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-gray-900 dark:text-white">
                    {deleteConfirm.title}
                  </h3>
                  <p className="text-xs text-gray-400">Confirmation requise</p>
                </div>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {deleteConfirm.message}
              </p>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100 dark:border-[#222222]">
                <button
                  type="button"
                  onClick={() => setDeleteConfirm(null)}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 dark:border-[#333333] text-gray-700 dark:text-gray-300 font-bold text-xs hover:bg-gray-100 dark:hover:bg-[#222222] transition cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="button"
                  onClick={deleteConfirm.onConfirm}
                  className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs transition shadow-lg shadow-red-600/25 flex items-center gap-2 cursor-pointer"
                >
                  <Trash2 size={14} />
                  <span>{deleteConfirm.confirmLabel || 'Confirmer'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

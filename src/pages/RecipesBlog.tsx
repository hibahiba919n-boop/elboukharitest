import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { RECIPES } from '../data/recipes';
import { BLOG_ARTICLES } from '../data/blog';
import { PRODUCTS } from '../data/products';
import {
  Clock,
  BookOpen,
  User,
  Flame,
  Search,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Heart,
  ChevronRight
} from 'lucide-react';

export const RecipesBlog: React.FC = () => {
  const { translate, recipes, recipeCategories, products } = useApp();

  // Selected tab: 'recipes' | 'wellness'
  const [activeTab, setActiveTab] = useState<'recipes' | 'wellness'>('recipes');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecipeCategory, setSelectedRecipeCategory] = useState<string>('all');

  // Active expanded recipe step drawer
  const [expandedRecipeId, setExpandedRecipeId] = useState<string | null>(null);

  // Active selected blog article for full reading modal
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null);

  const toggleRecipeExpansion = (id: string) => {
    setExpandedRecipeId(expandedRecipeId === id ? null : id);
  };

  // Filter recipes
  const filteredRecipes = recipes.filter((r) => {
    if (selectedRecipeCategory !== 'all' && r.category !== selectedRecipeCategory) {
      return false;
    }
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      r.title.ar.toLowerCase().includes(q) ||
      r.title.fr.toLowerCase().includes(q) ||
      r.title.en.toLowerCase().includes(q) ||
      r.difficulty.toLowerCase().includes(q)
    );
  });

  // Filter blogs
  const filteredBlogs = BLOG_ARTICLES.filter((b) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      b.title.ar.toLowerCase().includes(q) ||
      b.title.fr.toLowerCase().includes(q) ||
      b.title.en.toLowerCase().includes(q) ||
      b.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  return (
    <div className="w-full min-h-screen bg-[#FDFBF7] dark:bg-[#030807] text-[#111111] dark:text-gray-100 py-16 px-4 md:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Page Titles */}
        <div className="text-center space-y-2 max-w-xl mx-auto pb-6 border-b border-gray-100 dark:border-[#222222]">
          <h1 className="text-3xl md:text-5xl font-sans font-extrabold tracking-tight">
            {translate({ ar: 'دليل الطهي والمدونة العشبية', fr: 'L\'Atelier Culinaire & Bien-être', en: 'Gourmet Atelier & Herbal Wellness' })}
          </h1>
          <p className="text-gray-500 text-xs md:text-sm">
            {translate({
              ar: 'اكتشف أسرار المطبخ الجزائري العريق، ووصفات الطهاة المحترفين، والفوائد الصحية للأعشاب والبهارات الطبيعية الخالصة.',
              fr: 'Explorez nos secrets de grand-mères, recettes de chefs et les bienfaits thérapeutiques de nos graines sauvages.',
              en: 'Explore age-old Algerian cooking secrets, professional chef recipes, and therapeutic wellness advantages of natural spices.'
            })}
          </p>
        </div>

        {/* Search & Dynamic Categories control panel */}
        <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#222222] p-4 rounded-3xl flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 shadow-sm">
          {/* Dynamic Recipe Categories on the left (controlled from Admin Panel) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0 scrollbar-none flex-1">
            <button
              onClick={() => {
                setActiveTab('recipes');
                setSelectedRecipeCategory('all');
              }}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 border shrink-0 ${
                activeTab === 'recipes' && selectedRecipeCategory === 'all'
                  ? 'bg-[#C89B3C] text-black border-[#C89B3C] shadow-md'
                  : 'bg-[#FDFBF7] dark:bg-black text-gray-600 dark:text-gray-400 border-gray-200 dark:border-[#222222] hover:border-[#C89B3C]'
              }`}
            >
              <BookOpen size={14} />
              <span>{translate({ ar: 'جميع الوصفات', fr: 'Toutes les recettes', en: 'All Recipes' })}</span>
            </button>

            {recipeCategories.map((cat) => {
              const isSelected = activeTab === 'recipes' && selectedRecipeCategory === cat.id;
              const count = recipes.filter((r) => r.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveTab('recipes');
                    setSelectedRecipeCategory(cat.id);
                  }}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 border shrink-0 ${
                    isSelected
                      ? 'bg-[#C89B3C] text-black border-[#C89B3C] shadow-md'
                      : 'bg-[#FDFBF7] dark:bg-black text-gray-600 dark:text-gray-400 border-gray-200 dark:border-[#222222] hover:border-[#C89B3C]'
                  }`}
                >
                  <span>{translate(cat.name)}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-black/20 text-black' : 'bg-gray-200 dark:bg-[#222222] text-gray-500'}`}>
                    {count}
                  </span>
                </button>
              );
            })}

            {/* Herbal Wellness Blog Articles Button */}
            <button
              onClick={() => {
                setActiveTab('wellness');
              }}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 border shrink-0 ${
                activeTab === 'wellness'
                  ? 'bg-[#C89B3C] text-black border-[#C89B3C] shadow-md'
                  : 'bg-[#FDFBF7] dark:bg-black text-gray-600 dark:text-gray-400 border-gray-200 dark:border-[#222222] hover:border-[#C89B3C]'
              }`}
            >
              <Flame size={14} />
              <span>{translate({ ar: 'مقالات ونصائح عشبية', fr: 'Articles & Bien-être', en: 'Wellness Articles' })}</span>
            </button>
          </div>

          {/* Quick search input on the right */}
          <div className="relative w-full lg:w-72 shrink-0">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={activeTab === 'recipes' 
                ? translate({ ar: 'بحث في الوصفات والمكونات...', fr: 'Rechercher une recette...', en: 'Search recipes...' }) 
                : translate({ ar: 'بحث في المقالات والعلاجات...', fr: 'Rechercher un article...', en: 'Search health articles...' })}
              className="w-full bg-[#FDFBF7] dark:bg-black border border-gray-200 dark:border-[#222222] focus:border-[#C89B3C] focus:outline-none pl-9 pr-8 py-2.5 rounded-2xl text-xs text-gray-900 dark:text-white"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-white text-xs font-bold cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* ======================= TAB 1: RECIPES GRID ======================= */}
        {activeTab === 'recipes' && (
          <div className="space-y-6">
            {/* Active category indicator banner */}
            {selectedRecipeCategory !== 'all' && (() => {
              const currentCat = recipeCategories.find((c) => c.id === selectedRecipeCategory);
              if (!currentCat) return null;
              return (
                <div className="bg-[#C89B3C]/10 border border-[#C89B3C]/30 p-4 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {currentCat.image && (
                      <img src={currentCat.image} alt={translate(currentCat.name)} className="w-12 h-12 rounded-xl object-cover border border-[#C89B3C]/40" />
                    )}
                    <div>
                      <span className="text-[10px] font-mono font-bold text-[#C89B3C] uppercase tracking-wider block">
                        {translate({ ar: 'الفئة المعروضة', fr: 'Catégorie affichée', en: 'Category filter' })}
                      </span>
                      <h3 className="font-extrabold text-sm md:text-base text-gray-900 dark:text-white">
                        {translate(currentCat.name)}
                      </h3>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedRecipeCategory('all')}
                    className="text-xs text-[#C89B3C] font-bold hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <span>{translate({ ar: 'عرض جميع الوصفات', fr: 'Afficher toutes les recettes', en: 'Show all recipes' })}</span>
                    <span>→</span>
                  </button>
                </div>
              );
            })()}

            {filteredRecipes.length === 0 ? (
              <div className="text-center py-12 bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#222222] rounded-3xl p-8 space-y-3">
                <BookOpen className="mx-auto text-gray-400" size={36} />
                <p className="text-gray-500 font-bold text-sm">
                  {translate({
                    ar: 'لا توجد وصفات مسجلة في هذه الفئة حالياً.',
                    fr: 'Aucune recette trouvée dans cette catégorie.',
                    en: 'No recipes found in this category.'
                  })}
                </p>
                <p className="text-xs text-gray-400">
                  {translate({
                    ar: 'يمكنك إضافة وصفات جديدة لهذه الفئة مباشرة من لوحة التحكم.',
                    fr: 'Vous pouvez ajouter de nouvelles recettes dans cette catégorie depuis le Panneau d\'Administration.',
                    en: 'You can add recipes to this category directly from the Admin Panel.'
                  })}
                </p>
                <button
                  onClick={() => setSelectedRecipeCategory('all')}
                  className="mt-2 px-4 py-2 bg-[#C89B3C] text-black font-bold text-xs rounded-xl hover:opacity-90 transition cursor-pointer"
                >
                  {translate({ ar: 'عرض جميع الوصفات', fr: 'Voir toutes les recettes', en: 'View all recipes' })}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start animate-fade-in">
                {filteredRecipes.map((r) => {
                  const isExpanded = expandedRecipeId === r.id;
                  return (
                    <div
                      key={r.id}
                      className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#222222] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition flex flex-col"
                    >
                      {/* Photo Banner */}
                      <div className="aspect-[1.91/1] overflow-hidden relative">
                        <img src={r.image} alt={translate(r.title)} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80" />
                        
                        {/* Recipe Category Badge */}
                        {(() => {
                          const catObj = recipeCategories.find((c) => c.id === r.category);
                          if (!catObj) return null;
                          return (
                            <span className="absolute top-4 left-4 bg-black/75 backdrop-blur-md text-[#C89B3C] border border-[#C89B3C]/40 text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                              {translate(catObj.name)}
                            </span>
                          );
                        })()}

                        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-white">
                          <h3 className="font-extrabold text-lg md:text-xl font-sans drop-shadow-md">{translate(r.title)}</h3>
                          <div className="flex items-center gap-1.5 text-xs text-amber-400 bg-black/40 px-2.5 py-1 rounded-md backdrop-blur-sm">
                            <Clock size={12} />
                            <span>{r.prepTime} • {r.difficulty}</span>
                          </div>
                        </div>
                      </div>

                      {/* Body Briefing */}
                      <div className="p-6 space-y-4">
                        <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                          {translate(r.description)}
                        </p>

                        {/* El Boukhari specific spice match recommendation indicator */}
                        <div className="p-3 bg-[#F9F6F0] dark:bg-black border-l-4 border-[#C89B3C] rounded-r-xl rounded-l flex items-center gap-2.5 text-xs">
                          <Sparkles className="text-[#C89B3C] shrink-0 animate-pulse" size={16} />
                          <p className="text-gray-600 dark:text-gray-300">
                            <strong>{translate({ ar: 'التوابل الموصى بها:', fr: 'Épices Recommandées :', en: 'Spice Pairing Recommended:' })}</strong>{' '}
                            {r.spicesUsed.map((id) => {
                              const prod = products.find((p) => p.id === id);
                              return prod ? translate(prod.name) : id;
                            }).join(' • ')}
                          </p>
                        </div>

                    {/* Expand details trigger */}
                    <button
                      onClick={() => toggleRecipeExpansion(r.id)}
                      className="w-full text-center py-2.5 border border-gray-100 dark:border-[#222222] hover:border-[#C89B3C] text-[#C89B3C] font-extrabold text-xs rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer"
                    >
                      <span>
                        {translate({
                          ar: isExpanded ? 'إخفاء المكونات وخطوات التحضير' : 'عرض المكونات وخطوات التحضير التفصيلية',
                          fr: isExpanded ? 'Masquer ingrédients & étapes' : 'Afficher ingrédients & étapes de préparation',
                          en: isExpanded ? 'Hide Ingredients & Steps' : 'Reveal Ingredients & Preparation Steps'
                        })}
                      </span>
                      {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>

                    {/* Drawer Expansion (Ingredients and Cooking Steps Lists) */}
                    {isExpanded && (
                      <div className="pt-4 border-t border-gray-100 dark:border-[#222222] space-y-4 text-xs animate-fade-in">
                        {/* Ingredients */}
                        <div className="space-y-1.5">
                          <h4 className="font-extrabold text-[#C89B3C] uppercase tracking-wider text-[10px]">
                            {translate({ ar: 'المكونات والمقادير:', fr: 'Ingrédients nécessaires :', en: 'Ingredients required:' })}
                          </h4>
                          <ul className="list-disc pl-4 rtl:pl-0 rtl:pr-4 space-y-1 text-gray-500">
                            {r.ingredients.map((ing, idx) => (
                              <li key={idx}>{translate(ing)}</li>
                            ))}
                          </ul>
                        </div>

                        {/* Method Instructions */}
                        <div className="space-y-1.5 pt-3 border-t border-gray-50 dark:border-[#222222]">
                          <h4 className="font-extrabold text-[#C89B3C] uppercase tracking-wider text-[10px]">
                            {translate({ ar: 'خطوات التحضير بالتفصيل:', fr: 'Étapes de préparation :', en: 'Preparation steps:' })}
                          </h4>
                          <div className="space-y-2.5 text-gray-600 dark:text-gray-300">
                            {r.instructions.map((step, idx) => (
                              <div key={idx} className="flex gap-2.5 items-start">
                                <span className="w-5 h-5 bg-[#C89B3C] text-black rounded-full flex items-center justify-center font-bold font-mono text-[10px] shrink-0 mt-0.5">
                                  {idx + 1}
                                </span>
                                <p className="leading-relaxed">{translate(step)}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    )}

        {/* ======================= TAB 2: WELLNESS BLOGS GRID ======================= */}
        {activeTab === 'wellness' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
            {filteredBlogs.map((b) => (
              <div
                key={b.id}
                onClick={() => setSelectedArticle(b)}
                className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#222222] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition flex flex-col group cursor-pointer"
              >
                {/* Visual */}
                <div className="aspect-[1.6/1] overflow-hidden relative">
                  <img
                    src={b.image}
                    alt={translate(b.title)}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-[#C89B3C] text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Clock size={10} />
                    <span>{b.readTime}</span>
                  </div>
                </div>

                {/* Info details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[10px] text-gray-400 font-mono">
                      <span className="text-[#C89B3C] font-black uppercase">{translate(b.category)}</span>
                      <span>•</span>
                      <span>{b.date}</span>
                    </div>
                    <h3 className="font-sans font-extrabold text-sm md:text-base text-gray-900 dark:text-white group-hover:text-[#C89B3C] transition">
                      {translate(b.title)}
                    </h3>
                    <p className="text-gray-500 text-[11px] leading-relaxed line-clamp-3">
                      {translate(b.excerpt)}
                    </p>
                  </div>

                  {/* Footer & Read More trigger */}
                  <div className="pt-4 border-t border-gray-100 dark:border-[#222222] flex items-center justify-between text-xs font-bold text-[#C89B3C]">
                    <div className="flex flex-wrap gap-1">
                      {b.tags.map((t) => (
                        <span key={t} className="bg-gray-100 dark:bg-[#222222] text-gray-400 font-mono text-[9px] px-2 py-0.5 rounded">
                          #{t}
                        </span>
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-black text-[#C89B3C] hover:underline shrink-0">
                      <span>{translate({ ar: 'قراءة المقال', fr: 'Lire l\'article', en: 'Read article' })}</span>
                      <ChevronRight size={14} className="rtl:rotate-180" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* FULL ARTICLE MODAL READOUT */}
        {selectedArticle && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#222222] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 space-y-6 text-gray-900 dark:text-white relative shadow-2xl">
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 rtl:right-auto rtl:left-4 w-9 h-9 rounded-full bg-gray-100 dark:bg-[#222222] hover:bg-[#C89B3C] hover:text-black text-gray-500 transition flex items-center justify-center font-bold text-sm"
              >
                ✕
              </button>

              {/* Modal Image Header */}
              <div className="aspect-[2/1] rounded-2xl overflow-hidden relative">
                <img
                  src={selectedArticle.image}
                  alt={translate(selectedArticle.title)}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                  <span className="text-[10px] uppercase font-mono font-bold text-[#C89B3C] tracking-widest block">
                    {translate(selectedArticle.category)}
                  </span>
                  <h2 className="text-xl md:text-2xl font-black font-sans leading-tight">
                    {translate(selectedArticle.title)}
                  </h2>
                </div>
              </div>

              {/* Article Meta */}
              <div className="flex items-center justify-between text-xs text-gray-400 border-b border-gray-100 dark:border-[#222222] pb-3 font-mono">
                <span>{selectedArticle.date}</span>
                <span className="flex items-center gap-1 text-[#C89B3C]">
                  <Clock size={12} />
                  <span>{selectedArticle.readTime}</span>
                </span>
              </div>

              {/* Article Content Text */}
              <div className="space-y-4 text-sm leading-relaxed text-gray-700 dark:text-gray-200 font-sans">
                <p className="font-semibold text-base text-[#C89B3C]">
                  {translate(selectedArticle.excerpt)}
                </p>
                <div className="p-4 bg-[#F9F6F0] dark:bg-black rounded-2xl border border-[#C89B3C]/20 text-xs md:text-sm leading-loose whitespace-pre-line">
                  {translate(selectedArticle.content)}
                </div>
              </div>

              {/* Modal Footer / Close */}
              <div className="pt-4 border-t border-gray-100 dark:border-[#222222] flex justify-end">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="bg-[#C89B3C] text-black font-bold text-xs px-6 py-3 rounded-xl hover:bg-black hover:text-[#C89B3C] dark:hover:bg-white dark:hover:text-black transition"
                >
                  {translate({ ar: 'إغلاق المقال', fr: 'Fermer l\'article', en: 'Close article' })}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

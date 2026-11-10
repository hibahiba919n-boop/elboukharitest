import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  User,
  ShoppingBag,
  Heart,
  MapPin,
  Lock,
  Mail,
  ChevronRight,
  LogOut,
  Sparkles,
  Award,
  Clock,
  ExternalLink
} from 'lucide-react';

interface UserAccountProps {
  onNavigate?: (page: string, params?: any) => void;
}

export const UserAccount: React.FC<UserAccountProps> = ({ onNavigate }) => {
  const {
    translate,
    formatPrice,
    currentUser,
    login,
    register,
    logout,
    orders,
    wishlist,
    toggleWishlist,
    addToCart
  } = useApp();

  // Screen/View controls: 'login' | 'register' | 'forgot'
  const [authView, setAuthView] = useState<'login' | 'register' | 'forgot'>('login');
  
  // Tab Controls for logged in User Dashboard: 'orders' | 'wishlist' | 'address'
  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'address'>('orders');

  // Login inputs
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register inputs
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginEmail && loginPassword) {
      const success = login(loginEmail, loginPassword);
      if (!success) {
        alert(translate({
          ar: 'البريد الإلكتروني أو كلمة المرور خاطئة. يرجى المحاولة مجدداً.',
          fr: 'Identifiants invalides. Veuillez essayer à nouveau.',
          en: 'Invalid credentials. Please verify your email and password.'
        }));
      }
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (regName && regEmail && regPhone && regPassword) {
      register(regName, regEmail, regPhone, regPassword);
    }
  };

  const handleQuickBuy = (product: any) => {
    const wp = product.weightPrices[0];
    addToCart(product, wp.weight, wp.price, 1);
  };

  const userFullName = currentUser ? `${currentUser.firstName} ${currentUser.lastName}`.trim() : '';
  const userInitial = currentUser?.firstName ? currentUser.firstName.charAt(0).toUpperCase() : 'U';

  return (
    <div className="w-full min-h-screen bg-[#FDFBF7] dark:bg-[#030807] text-[#111111] dark:text-gray-100 py-16 px-4 md:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {!currentUser ? (
          /* =================== AUTHENTICATION SCREENS (GUEST FLOW) =================== */
          <div className="max-w-md mx-auto bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#222222] rounded-3xl p-6 md:p-8 shadow-xl space-y-6">
            
            {/* Branding Header */}
            <div className="text-center space-y-1">
              <span className="text-[#C89B3C] font-mono font-black text-xs tracking-widest uppercase block">
                توابل البوخاري
              </span>
              <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">
                {authView === 'login'
                  ? translate({ ar: 'تسجيل الدخول للمتذوقين', fr: 'Espace Client Prestige', en: 'Prestige Client Portal' })
                  : authView === 'register'
                  ? translate({ ar: 'إنشاء حساب جديد بالبوخاري', fr: 'Créer un Compte', en: 'Create Premium Account' })
                  : translate({ ar: 'استرجاع كلمة المرور', fr: 'Mot de Passe Oublié', en: 'Recover Password' })}
              </h1>
              <p className="text-xs text-gray-500">
                {translate({
                  ar: 'استمتع بمتابعة طلبياتك وحفظ بهاراتك المفضلة وتلقي عروضنا الحصرية.',
                  fr: 'Accédez à votre historique, suivez vos livraisons et enregistrez vos favoris.',
                  en: 'Access history logs, track live shipments, and capture custom box rates.'
                })}
              </p>
            </div>

            {/* Login form */}
            {authView === 'login' && (
              <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-bold text-gray-500">
                    {translate({ ar: 'البريد الإلكتروني', fr: 'Adresse Email', en: 'Email Address' })}
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="Ex: mohamed@gmail.com"
                      className="w-full bg-[#FDFBF7] dark:bg-black border border-gray-200 dark:border-[#222222] focus:border-[#C89B3C] focus:outline-none pl-10 pr-4 py-3.5 rounded-xl text-gray-900 dark:text-white"
                    />
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="font-bold text-gray-500">
                      {translate({ ar: 'كلمة المرور', fr: 'Mot de passe', en: 'Password' })}
                    </label>
                    <button
                      type="button"
                      onClick={() => setAuthView('forgot')}
                      className="text-[10px] text-gray-400 hover:text-[#C89B3C] underline"
                    >
                      {translate({ ar: 'نسيت كلمة المرور؟', fr: 'Mot de passe oublié ?', en: 'Forgot password?' })}
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-[#FDFBF7] dark:bg-black border border-gray-200 dark:border-[#222222] focus:border-[#C89B3C] focus:outline-none pl-10 pr-4 py-3.5 rounded-xl text-gray-900 dark:text-white"
                    />
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#C89B3C] hover:bg-black hover:text-[#C89B3C] dark:hover:bg-white dark:hover:text-black text-black font-black py-4 rounded-xl transition shadow-md mt-2 cursor-pointer"
                >
                  {translate({ ar: 'دخول آمن', fr: 'Se connecter', en: 'Secure Login' })}
                </button>

                <div className="text-center pt-2 space-y-3">
                  <button
                    type="button"
                    onClick={() => setAuthView('register')}
                    className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                  >
                    {translate({ ar: 'ليس لديك حساب؟ ', fr: 'Vous n\'avez pas de compte ? ', en: 'Don\'t have an account? ' })}
                    <strong className="text-[#C89B3C] underline">
                      {translate({ ar: 'أنشئ حسابك الآن', fr: 'Inscrivez-vous', en: 'Sign up' })}
                    </strong>
                  </button>

                  <div className="pt-3 border-t border-gray-100 dark:border-[#222222] space-y-1.5">
                    <span className="text-[10px] text-gray-400 block font-mono">
                      {translate({
                        ar: '💡 للوصول المباشر كمسؤول المتجر (Admin):',
                        fr: '💡 Accès direct pour la démo Administrateur :',
                        en: '💡 Direct Admin Demo Access:'
                      })}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setLoginEmail('admin@elboukhari.dz');
                        setLoginPassword('admin123');
                        login('admin@elboukhari.dz', 'admin123');
                      }}
                      className="w-full text-center py-2 px-3 bg-[#C89B3C]/10 hover:bg-[#C89B3C] text-[#C89B3C] hover:text-black border border-[#C89B3C]/30 rounded-xl text-xs font-bold transition cursor-pointer"
                    >
                      {translate({ ar: 'تسجيل الدخول الفوري كمسؤول (Admin)', fr: 'Connexion Directe Administrateur', en: 'Quick Admin Login' })}
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* Register Form */}
            {authView === 'register' && (
              <form onSubmit={handleRegisterSubmit} className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-bold text-gray-500">
                    {translate({ ar: 'الاسم الكامل', fr: 'Nom complet', en: 'Full Name' })}
                  </label>
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="Benali Mohamed"
                    className="w-full bg-[#FDFBF7] dark:bg-black border border-gray-200 dark:border-[#222222] focus:border-[#C89B3C] focus:outline-none px-4 py-3.5 rounded-xl text-gray-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-gray-500">
                    {translate({ ar: 'البريد الإلكتروني', fr: 'Adresse Email', en: 'Email Address' })}
                  </label>
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="mohamed@gmail.com"
                    className="w-full bg-[#FDFBF7] dark:bg-black border border-gray-200 dark:border-[#222222] focus:border-[#C89B3C] focus:outline-none px-4 py-3.5 rounded-xl text-gray-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-gray-500">
                    {translate({ ar: 'رقم الهاتف المحمول', fr: 'Numéro de téléphone', en: 'Mobile Phone Number' })}
                  </label>
                  <input
                    type="tel"
                    required
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="0555 12 34 56"
                    className="w-full bg-[#FDFBF7] dark:bg-black border border-gray-200 dark:border-[#222222] focus:border-[#C89B3C] focus:outline-none px-4 py-3.5 rounded-xl text-gray-900 dark:text-white font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-gray-500">
                    {translate({ ar: 'كلمة المرور', fr: 'Mot de passe', en: 'Password' })}
                  </label>
                  <input
                    type="password"
                    required
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="Min. 6 characters"
                    className="w-full bg-[#FDFBF7] dark:bg-black border border-gray-200 dark:border-[#222222] focus:border-[#C89B3C] focus:outline-none px-4 py-3.5 rounded-xl text-gray-900 dark:text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#C89B3C] hover:bg-black hover:text-[#C89B3C] dark:hover:bg-white dark:hover:text-black text-black font-black py-4 rounded-xl transition shadow-md mt-2 cursor-pointer"
                >
                  {translate({ ar: 'إنشاء الحساب الفاخر', fr: 'S\'enregistrer', en: 'Create Account' })}
                </button>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => setAuthView('login')}
                    className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                  >
                    {translate({ ar: 'لديك حساب بالفعل؟ ', fr: 'Vous avez déjà un compte ? ', en: 'Already have an account? ' })}
                    <strong className="text-[#C89B3C] underline">
                      {translate({ ar: 'تسجيل الدخول', fr: 'Se connecter', en: 'Sign in' })}
                    </strong>
                  </button>
                </div>
              </form>
            )}

            {/* Forgot password */}
            {authView === 'forgot' && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('Verification instructions have been dispatched if the email address is recorded.');
                  setAuthView('login');
                }}
                className="space-y-4 text-xs"
              >
                <div className="space-y-1.5">
                  <label className="font-bold text-gray-500">
                    {translate({ ar: 'أدخل بريدك الإلكتروني المسجل', fr: 'Email enregistré', en: 'Enter Registered Email' })}
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="mohamed@gmail.com"
                    className="w-full bg-[#FDFBF7] dark:bg-black border border-gray-200 dark:border-[#222222] focus:border-[#C89B3C] focus:outline-none px-4 py-3.5 rounded-xl text-gray-900 dark:text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#C89B3C] text-black font-black py-4 rounded-xl transition shadow-md mt-2"
                >
                  {translate({ ar: 'إرسال كود الاسترجاع', fr: 'Envoyer le lien', en: 'Send Recovery Link' })}
                </button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setAuthView('login')}
                    className="text-[#C89B3C] underline"
                  >
                    Back to login
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          /* =================== AUTHENTICATED USER DASHBOARD VIEW =================== */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* 1. LEFT UTILITY COLUMN: USER STATS & MENU (cols 4) */}
            <div className="lg:col-span-4 bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#222222] rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
              
              {/* Profile Card Header */}
              <div className="flex items-center gap-4 border-b border-gray-100 dark:border-[#222222] pb-5">
                <div className="w-16 h-16 bg-gradient-to-tr from-[#0F2F24] to-[#C89B3C] rounded-full flex items-center justify-center text-white font-serif italic font-extrabold text-2xl shadow-md border-2 border-white/10">
                  {userInitial}
                </div>
                <div>
                  <div className="inline-flex items-center gap-1 bg-[#C89B3C]/10 text-[#C89B3C] px-2 py-0.5 rounded text-[9px] font-black uppercase mb-1">
                    <Award size={10} />
                    <span>{currentUser.role === 'admin' ? 'ADMINISTRATEUR' : 'MEMBRE PRESTIGE'}</span>
                  </div>
                  <h3 className="font-extrabold text-lg text-gray-900 dark:text-white leading-tight">{userFullName}</h3>
                  <p className="text-[10px] text-gray-500">{currentUser.email}</p>
                </div>
              </div>

              {/* Admin Panel Link Button if user is admin or for easy navigation */}
              {onNavigate && (
                <div className="pt-2">
                  <button
                    onClick={() => onNavigate('admin')}
                    className="w-full bg-[#111111] dark:bg-black border border-[#C89B3C] hover:bg-[#C89B3C] hover:text-black text-[#C89B3C] font-extrabold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition shadow-sm text-xs cursor-pointer"
                  >
                    <Sparkles size={14} />
                    <span>{translate({ ar: 'لوحة التحكم الإدارية (Admin Console)', fr: 'Console Administration Admin', en: 'Open Admin Console' })}</span>
                  </button>
                </div>
              )}

              {/* Account Quick Status stats */}
              <div className="grid grid-cols-2 gap-3 text-center text-xs">
                <div className="p-3 bg-[#F9F6F0] dark:bg-black rounded-xl border border-gray-50 dark:border-transparent">
                  <span className="block font-black text-white text-lg font-mono">{orders.length}</span>
                  <span className="text-[10px] text-gray-400">{translate({ ar: 'الطلبيات', fr: 'Commandes', en: 'Orders' })}</span>
                </div>
                <div className="p-3 bg-[#F9F6F0] dark:bg-black rounded-xl border border-gray-50 dark:border-transparent">
                  <span className="block font-black text-[#C89B3C] text-lg font-mono">{wishlist.length}</span>
                  <span className="text-[10px] text-gray-400">{translate({ ar: 'المفضلة', fr: 'Favoris', en: 'Wishlist' })}</span>
                </div>
              </div>

              {/* Sidebar Menu Buttons */}
              <div className="flex flex-col gap-1.5 text-xs">
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full text-left rtl:text-right py-3 px-4 rounded-xl flex items-center justify-between font-bold transition ${
                    activeTab === 'orders' ? 'bg-[#C89B3C] text-black shadow-md' : 'hover:bg-[#F9F6F0] dark:hover:bg-[#222222] text-gray-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <ShoppingBag size={14} />
                    <span>{translate({ ar: 'سجل الطلبيات والمشتريات', fr: 'Historique des Commandes', en: 'Order History Log' })}</span>
                  </div>
                  <ChevronRight size={14} />
                </button>

                <button
                  onClick={() => setActiveTab('wishlist')}
                  className={`w-full text-left rtl:text-right py-3 px-4 rounded-xl flex items-center justify-between font-bold transition ${
                    activeTab === 'wishlist' ? 'bg-[#C89B3C] text-black shadow-md' : 'hover:bg-[#F9F6F0] dark:hover:bg-[#222222] text-gray-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Heart size={14} />
                    <span>{translate({ ar: 'قائمة التوابل المفضلة', fr: 'Ma Liste d\'Envies', en: 'My Wishlist' })}</span>
                  </div>
                  <ChevronRight size={14} />
                </button>

                <button
                  onClick={() => setActiveTab('address')}
                  className={`w-full text-left rtl:text-right py-3 px-4 rounded-xl flex items-center justify-between font-bold transition ${
                    activeTab === 'address' ? 'bg-[#C89B3C] text-black shadow-md' : 'hover:bg-[#F9F6F0] dark:hover:bg-[#222222] text-gray-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <MapPin size={14} />
                    <span>{translate({ ar: 'عناوين التوصيل المحفوظة', fr: 'Mon Carnet d\'Adresses', en: 'Saved Address Book' })}</span>
                  </div>
                  <ChevronRight size={14} />
                </button>

                <button
                  onClick={logout}
                  className="w-full text-left rtl:text-right py-3 px-4 rounded-xl flex items-center gap-2 font-bold text-red-500 hover:bg-red-500/10 transition mt-4"
                >
                  <LogOut size={14} />
                  <span>{translate({ ar: 'تسجيل الخروج', fr: 'Se déconnecter', en: 'Sign Out' })}</span>
                </button>
              </div>

            </div>

            {/* 2. RIGHT DYNAMIC GRID: SELECTED SCREEN (cols 8) */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* TAB CONTENT: ORDERS */}
              {activeTab === 'orders' && (
                <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#222222] p-6 md:p-8 rounded-3xl shadow-sm space-y-6">
                  <h3 className="text-lg font-bold border-b border-gray-100 dark:border-[#222222] pb-3 text-white flex items-center gap-2">
                    <ShoppingBag size={18} className="text-[#C89B3C]" />
                    <span>{translate({ ar: 'سجل الطلبيات', fr: 'Suivi de mes Commandes', en: 'My Order History' })}</span>
                  </h3>

                  {orders.length === 0 ? (
                    <div className="text-center py-12 text-gray-500 text-xs">
                      <Clock className="mx-auto mb-3 text-gray-400 animate-pulse" size={32} />
                      <p>{translate({ ar: 'لم تقم بأي طلبية بعد.', fr: 'Aucune commande enregistrée pour l\'instant.', en: 'No order records found for this account.' })}</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((o) => (
                        <div
                          key={o.orderId}
                          className="p-5 bg-[#FDFBF7] dark:bg-black rounded-2xl border border-gray-100 dark:border-[#222222] space-y-4 text-xs"
                        >
                          {/* Order sub-header */}
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-100 dark:border-[#222222] pb-3 gap-2">
                            <div>
                              <p className="font-bold text-white text-sm">N°: {o.orderId}</p>
                              <p className="text-[10px] text-gray-500">Placed on: {o.date}</p>
                            </div>
                            <span className="bg-[#C89B3C]/10 border border-[#C89B3C]/30 text-[#C89B3C] px-3 py-1 rounded-md font-bold uppercase text-[9px]">
                              {o.status === 'pending' ? 'En attente de validation' : 'Validé'}
                            </span>
                          </div>

                          {/* Items rows inside order */}
                          <div className="space-y-2">
                            {o.items.map((item: any, idx: number) => (
                              <div key={idx} className="flex justify-between">
                                <span className="text-gray-400 truncate max-w-[200px]">
                                  {translate(item.productName)} ({item.selectedWeight})
                                </span>
                                <span className="font-bold text-white">{item.quantity} × {formatPrice(item.selectedPrice)}</span>
                              </div>
                            ))}
                          </div>

                          {/* Totals row */}
                          <div className="flex justify-between items-center border-t border-gray-100 dark:border-[#222222] pt-3 text-[11px]">
                            <span className="text-gray-400">Expédition Wilaya: {o.wilaya}</span>
                            <span className="text-white font-bold">
                              {translate({ ar: 'الإجمالي المدفوع:', fr: 'Total Net Paid:', en: 'Grand Total:' })} <strong className="text-[#C89B3C] font-mono text-sm">{formatPrice(o.total)}</strong>
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB CONTENT: WISHLIST */}
              {activeTab === 'wishlist' && (
                <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#222222] p-6 md:p-8 rounded-3xl shadow-sm space-y-6">
                  <h3 className="text-lg font-bold border-b border-gray-100 dark:border-[#222222] pb-3 text-white flex items-center gap-2">
                    <Heart size={18} className="text-[#C89B3C]" />
                    <span>{translate({ ar: 'قائمتي المفضلة', fr: 'Mes Coups de Cœur', en: 'My Premium Wishlist' })}</span>
                  </h3>

                  {wishlist.length === 0 ? (
                    <div className="text-center py-12 text-gray-500 text-xs">
                      <Heart className="mx-auto mb-3 text-gray-300" size={32} />
                      <p>{translate({ ar: 'لم تقم بإضافة أي تابل للمفضلة بعد.', fr: 'Votre liste d\'envies est vide.', en: 'Your wishlist is currently empty.' })}</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {wishlist.map((prod) => {
                        const baseWp = prod.weightPrices[0];
                        return (
                          <div
                            key={prod.id}
                            className="p-4 bg-[#FDFBF7] dark:bg-black rounded-2xl border border-gray-100 dark:border-[#222222] flex gap-3 text-xs items-center justify-between"
                          >
                            <div className="flex gap-3 items-center">
                              <img
                                src={prod.images[0]}
                                alt={translate(prod.name)}
                                className="w-12 h-12 object-cover rounded-xl"
                                referrerPolicy="no-referrer"
                              />
                              <div>
                                <h4 className="font-bold text-white line-clamp-1 truncate max-w-[150px]">{translate(prod.name)}</h4>
                                <p className="text-gray-400 font-mono">{formatPrice(baseWp.price)}</p>
                              </div>
                            </div>

                            <div className="flex gap-2 shrink-0">
                              <button
                                onClick={() => toggleWishlist(prod)}
                                className="text-red-500 hover:text-red-400 font-bold p-2"
                                title="Remove"
                              >
                                <Heart size={14} className="fill-red-500" />
                              </button>
                              <button
                                onClick={() => handleQuickBuy(prod)}
                                className="bg-[#C89B3C] text-black font-extrabold px-3 py-1.5 rounded-lg transition text-[10px]"
                              >
                                {translate({ ar: 'شراء', fr: 'Acheter', en: 'Buy' })}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* TAB CONTENT: ADDRESS BOOK */}
              {activeTab === 'address' && (
                <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#222222] p-6 md:p-8 rounded-3xl shadow-sm space-y-6">
                  <h3 className="text-lg font-bold border-b border-gray-100 dark:border-[#222222] pb-3 text-white flex items-center gap-2">
                    <MapPin size={18} className="text-[#C89B3C]" />
                    <span>{translate({ ar: 'عناوين التوصيل', fr: 'Mon Carnet d\'Adresses', en: 'Delivery Address Book' })}</span>
                  </h3>

                  {/* Primary address mockup */}
                  <div className="p-5 bg-[#FDFBF7] dark:bg-black border border-[#C89B3C]/30 rounded-2xl space-y-3 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="font-extrabold text-[#C89B3C] uppercase text-[9px] tracking-wider">
                        {translate({ ar: 'العنوان الافتراضي', fr: 'ADRESSE PRINCIPALE', en: 'PRIMARY DEFAULT' })}
                      </span>
                      <span className="bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded text-[9px] font-bold">Verified</span>
                    </div>

                    <div className="space-y-1 text-gray-700 dark:text-gray-300">
                      <p className="font-bold text-gray-900 dark:text-white text-sm">{userFullName}</p>
                      <p>{currentUser.phone || '0555 12 34 56'}</p>
                      <p>Rue 1er Novembre, Cité 50 Logements, Apt 4</p>
                      <p className="font-bold text-white">Bab Ezzouar, Alger, Algérie</p>
                    </div>
                  </div>
                </div>
              )}

            </div>

          </div>
        )}

      </div>
    </div>
  );
};

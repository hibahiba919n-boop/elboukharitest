import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { supabase } from '../lib/supabase';
import {
  Search,
  Package,
  Clock,
  CheckCircle,
  Truck,
  XCircle,
  MapPin,
  Calendar,
  ShoppingBag,
  MessageSquare,
  ArrowRight,
  AlertCircle,
  Loader2,
  PackageCheck,
  PackageSearch,
  Star
} from 'lucide-react';

interface TrackedOrder {
  id: string;
  date: string;
  items: { productId: string; productName: string; weight: string; price: number; quantity: number }[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  status: string;
  shippingAddress: {
    fullName: string;
    phone: string;
    addressLine: string;
    wilaya: string;
    commune: string;
  };
  paymentMethod: string;
  trackingNumber?: string;
}

const STATUS_CONFIG: Record<string, { label: { ar: string; fr: string }; color: string; bg: string; border: string; icon: React.ReactNode }> = {
  pending: {
    label: { ar: 'في انتظار التأكيد', fr: 'En attente de confirmation' },
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    icon: <Clock size={14} />
  },
  confirmed: {
    label: { ar: 'تم تأكيد الطلب', fr: 'Confirmée' },
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    icon: <CheckCircle size={14} />
  },
  processing: {
    label: { ar: 'جاري التحضير', fr: 'En préparation' },
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30',
    icon: <Package size={14} />
  },
  shipped: {
    label: { ar: 'تم الشحن', fr: 'Expédiée' },
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/30',
    icon: <Truck size={14} />
  },
  out_for_delivery: {
    label: { ar: 'في طريق التسليم', fr: 'En cours de livraison' },
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/30',
    icon: <Truck size={14} />
  },
  delivered: {
    label: { ar: 'تم التسليم', fr: 'Livrée' },
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    icon: <PackageCheck size={14} />
  },
  cancelled: {
    label: { ar: 'ملغاة', fr: 'Annulée' },
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border-red-500/30',
    icon: <XCircle size={14} />
  }
};

// Progress steps for order timeline
const STATUS_STEPS = ['pending', 'confirmed', 'processing', 'shipped', 'out_for_delivery', 'delivered'];

const getStepIndex = (status: string) => STATUS_STEPS.indexOf(status);

export const OrderTracking: React.FC = () => {
  const { translate, formatPrice, language, orders: contextOrders } = useApp();

  const [phoneInput, setPhoneInput] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchDone, setSearchDone] = useState(false);
  const [foundOrders, setFoundOrders] = useState<TrackedOrder[]>([]);
  const [error, setError] = useState('');

  const normalizePhone = (phone: string) =>
    phone.replace(/[\s\-().+]/g, '');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const raw = phoneInput.trim();
    if (!raw) return;

    // Basic validation: at least 9 digits
    const digits = raw.replace(/\D/g, '');
    if (digits.length < 9) {
      setError(
        language === 'ar'
          ? 'يرجى إدخال رقم هاتف صحيح (9 أرقام على الأقل)'
          : 'Veuillez entrer un numéro de téléphone valide (au moins 9 chiffres).'
      );
      return;
    }

    setError('');
    setIsSearching(true);
    setSearchDone(false);
    setFoundOrders([]);

    try {
      let results: TrackedOrder[] = [];

      // Try Supabase first
      if (supabase) {
        const { data, error: supaErr } = await supabase
          .from('orders')
          .select('*')
          .order('date', { ascending: false });

        if (supaErr) throw supaErr;

        if (data && data.length > 0) {
          const normalizedInput = normalizePhone(raw);
          results = data
            .filter((row: any) => {
              const addr = row.shipping_address || {};
              const rowPhone = normalizePhone(addr.phone || '');
              return rowPhone.includes(normalizedInput) || normalizedInput.includes(rowPhone);
            })
            .map((row: any) => ({
              id: row.id,
              date: typeof row.date === 'string'
                ? new Date(row.date).toLocaleDateString(language === 'ar' ? 'ar-DZ' : 'fr-FR', {
                    year: 'numeric', month: 'long', day: 'numeric'
                  })
                : row.date,
              items: Array.isArray(row.items) ? row.items : [],
              subtotal: Number(row.subtotal),
              shippingFee: Number(row.shipping_fee) || 0,
              discount: Number(row.discount) || 0,
              total: Number(row.total),
              status: row.status || 'pending',
              shippingAddress: row.shipping_address || {},
              paymentMethod: row.payment_method || 'cod',
              trackingNumber: row.tracking_number
            }));
        }
      }

      // Fallback: search in context orders (localStorage)
      if (results.length === 0 && contextOrders.length > 0) {
        const normalizedInput = normalizePhone(raw);
        results = contextOrders
          .filter((o) => {
            const phone = normalizePhone(o.shippingAddress?.phone || '');
            return phone.includes(normalizedInput) || normalizedInput.includes(phone);
          })
          .map((o) => ({
            id: o.id,
            date: o.date,
            items: o.items.map((it) => ({
              productId: it.productId,
              productName: it.productName,
              weight: it.weight,
              price: it.price,
              quantity: it.quantity
            })),
            subtotal: o.subtotal,
            shippingFee: o.shippingFee,
            discount: o.discount,
            total: o.total,
            status: o.status,
            shippingAddress: {
              fullName: o.shippingAddress?.fullName || '',
              phone: o.shippingAddress?.phone || '',
              addressLine: o.shippingAddress?.addressLine || '',
              wilaya: o.shippingAddress?.wilaya || '',
              commune: o.shippingAddress?.commune || ''
            },
            paymentMethod: o.paymentMethod,
            trackingNumber: o.trackingNumber
          }));
      }

      setFoundOrders(results);
    } catch (err: any) {
      console.error('OrderTracking error:', err);
      setError(
        language === 'ar'
          ? 'حدث خطأ في الاتصال بقاعدة البيانات. يرجى المحاولة مرة أخرى.'
          : 'Erreur de connexion à la base de données. Veuillez réessayer.'
      );
    } finally {
      setIsSearching(false);
      setSearchDone(true);
    }
  };

  const getStatusConfig = (status: string) =>
    STATUS_CONFIG[status] || STATUS_CONFIG['pending'];

  const getStatusLabel = (status: string) => {
    const cfg = getStatusConfig(status);
    return language === 'ar' ? cfg.label.ar : cfg.label.fr;
  };

  const whatsappMsg = encodeURIComponent(
    language === 'ar'
      ? 'مرحباً، أود الاستفسار عن طلبيتي.'
      : 'Bonjour, je souhaite obtenir des informations concernant ma commande.'
  );

  return (
    <div className="w-full min-h-screen bg-[#FDFBF7] dark:bg-[#030807] text-[#111111] dark:text-gray-100 py-16 px-4 md:px-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-12">

        {/* ── PAGE HEADER ── */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#C89B3C]/10 border border-[#C89B3C]/30 px-4 py-1.5 rounded-full text-[11px] text-[#C89B3C] tracking-widest font-black uppercase">
            <PackageSearch size={12} />
            <span>El Boukhari — Suivi</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            {language === 'ar' ? 'تتبع طلبيتك' : 'Suivez votre commande'}
          </h1>
          <p className="text-gray-500 text-sm max-w-xl mx-auto leading-relaxed">
            {language === 'ar'
              ? 'أدخل رقم الهاتف المستخدم عند الطلب لعرض جميع طلباتك ومتابعة حالتها.'
              : 'Entrez le numéro de téléphone utilisé lors de votre commande pour consulter toutes vos commandes et suivre leur état.'}
          </p>
        </div>

        {/* ── SEARCH BOX ── */}
        <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#222222] rounded-3xl shadow-sm p-8 md:p-10">
          <form onSubmit={handleSearch} className="space-y-5">
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">
              {language === 'ar' ? 'رقم الهاتف *' : 'Numéro de téléphone *'}
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <input
                  type="tel"
                  value={phoneInput}
                  onChange={(e) => {
                    setPhoneInput(e.target.value);
                    setError('');
                    if (searchDone) { setSearchDone(false); setFoundOrders([]); }
                  }}
                  placeholder={language === 'ar' ? 'مثال: 0555 12 34 56' : 'Ex: 0555 12 34 56'}
                  className="w-full bg-[#FDFBF7] dark:bg-black border border-gray-200 dark:border-[#333333] focus:border-[#C89B3C] focus:outline-none pl-12 pr-4 py-4 rounded-xl text-gray-900 dark:text-white font-mono text-sm placeholder-gray-400 transition"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              </div>
              <button
                type="submit"
                disabled={isSearching || !phoneInput.trim()}
                className="bg-[#C89B3C] hover:bg-[#E2B755] disabled:opacity-50 disabled:cursor-not-allowed text-black font-black px-7 py-4 rounded-xl transition flex items-center justify-center gap-2 shadow-md text-sm whitespace-nowrap"
              >
                {isSearching ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Search size={16} />
                )}
                <span>
                  {isSearching
                    ? (language === 'ar' ? 'جاري البحث...' : 'Recherche...')
                    : (language === 'ar' ? 'بحث عن طلباتي' : 'Rechercher mes commandes')}
                </span>
              </button>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 text-red-500 bg-red-500/10 border border-red-500/20 px-4 py-3 rounded-xl text-xs font-bold">
                <AlertCircle size={14} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </form>
        </div>

        {/* ── RESULTS ── */}
        {searchDone && !isSearching && (
          <div className="space-y-6 animate-fade-in">
            {foundOrders.length === 0 ? (
              /* No results */
              <div className="text-center py-16 bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#222222] rounded-3xl space-y-4">
                <PackageSearch className="mx-auto text-gray-300 dark:text-gray-700" size={56} />
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                  {language === 'ar' ? 'لم يتم العثور على طلبات' : 'Aucune commande trouvée'}
                </h3>
                <p className="text-gray-500 text-sm max-w-sm mx-auto">
                  {language === 'ar'
                    ? 'لم نجد أي طلبات مرتبطة بهذا الرقم. تأكد من الرقم وحاول مجدداً.'
                    : 'Aucune commande trouvée pour ce numéro de téléphone. Veuillez vérifier votre numéro et réessayer.'}
                </p>
              </div>
            ) : (
              <>
                {/* Results header */}
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-gray-700 dark:text-gray-300">
                    <span className="text-[#C89B3C] font-black">{foundOrders.length}</span>{' '}
                    {language === 'ar'
                      ? `طلب${foundOrders.length > 1 ? '' : ''} مرتبط بهذا الرقم`
                      : `commande${foundOrders.length > 1 ? 's' : ''} trouvée${foundOrders.length > 1 ? 's' : ''}`}
                  </p>
                </div>

                {/* Order cards */}
                {foundOrders.map((order) => {
                  const cfg = getStatusConfig(order.status);
                  const stepIdx = getStepIndex(order.status);
                  const isCancelled = order.status === 'cancelled';

                  return (
                    <div
                      key={order.id}
                      className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#222222] rounded-3xl shadow-sm overflow-hidden"
                    >
                      {/* Card Header */}
                      <div className="bg-[#111111] dark:bg-black px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="space-y-1">
                          <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                            {language === 'ar' ? 'رقم الطلب' : 'Référence commande'}
                          </p>
                          <p className="text-[#C89B3C] font-mono font-black text-base tracking-wider">
                            {order.id}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          {/* Date */}
                          <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                            <Calendar size={12} />
                            <span>{order.date}</span>
                          </div>
                          {/* Status badge */}
                          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold ${cfg.color} ${cfg.bg} ${cfg.border}`}>
                            {cfg.icon}
                            <span>{getStatusLabel(order.status)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Progress timeline (not shown for cancelled) */}
                      {!isCancelled && (
                        <div className="px-6 py-5 border-b border-gray-100 dark:border-[#1A1A1A]">
                          <div className="flex items-center justify-between gap-1">
                            {STATUS_STEPS.map((step, idx) => {
                              const stepCfg = STATUS_CONFIG[step];
                              const done = idx <= stepIdx;
                              const active = idx === stepIdx;
                              return (
                                <div key={step} className="flex flex-col items-center flex-1 gap-1.5">
                                  {/* connector line */}
                                  <div className="flex items-center w-full">
                                    {idx > 0 && (
                                      <div className={`flex-1 h-0.5 rounded-full transition-all duration-500 ${done ? 'bg-[#C89B3C]' : 'bg-gray-200 dark:bg-[#2A2A2A]'}`} />
                                    )}
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all duration-500 border-2 ${
                                      active
                                        ? 'bg-[#C89B3C] border-[#C89B3C] text-black shadow-lg shadow-[#C89B3C]/30'
                                        : done
                                        ? 'bg-[#C89B3C]/20 border-[#C89B3C] text-[#C89B3C]'
                                        : 'bg-gray-100 dark:bg-[#1A1A1A] border-gray-200 dark:border-[#333333] text-gray-400'
                                    }`}>
                                      <span className="scale-75">{stepCfg.icon}</span>
                                    </div>
                                    {idx < STATUS_STEPS.length - 1 && (
                                      <div className={`flex-1 h-0.5 rounded-full transition-all duration-500 ${done && idx < stepIdx ? 'bg-[#C89B3C]' : 'bg-gray-200 dark:bg-[#2A2A2A]'}`} />
                                    )}
                                  </div>
                                  {/* step label */}
                                  <span className={`text-[9px] text-center font-bold leading-tight hidden sm:block ${active ? 'text-[#C89B3C]' : done ? 'text-gray-500' : 'text-gray-300 dark:text-gray-700'}`}>
                                    {language === 'ar' ? stepCfg.label.ar : stepCfg.label.fr}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Card Body */}
                      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Products list */}
                        <div className="space-y-3">
                          <h4 className="text-[10px] uppercase tracking-widest font-black text-gray-400 flex items-center gap-1.5">
                            <ShoppingBag size={11} />
                            {language === 'ar' ? 'المنتجات' : 'Articles commandés'}
                          </h4>
                          <div className="space-y-2">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="flex items-center justify-between bg-[#FDFBF7] dark:bg-[#0A0A0A] border border-gray-100 dark:border-[#1A1A1A] rounded-xl px-3 py-2.5 text-xs">
                                <div className="flex-1 min-w-0 mr-3">
                                  <p className="font-bold text-gray-900 dark:text-white truncate">
                                    {typeof item.productName === 'object'
                                      ? (language === 'ar' ? (item.productName as any).ar : (item.productName as any).fr)
                                      : item.productName}
                                  </p>
                                  <p className="text-gray-400 font-mono">{item.weight} × {item.quantity}</p>
                                </div>
                                <span className="font-mono font-bold text-[#C89B3C] shrink-0">
                                  {formatPrice(item.price * item.quantity)}
                                </span>
                              </div>
                            ))}
                          </div>

                          {/* Totals */}
                          <div className="bg-[#FDFBF7] dark:bg-[#0A0A0A] border border-gray-100 dark:border-[#1A1A1A] rounded-xl px-4 py-3 space-y-1.5 text-xs">
                            {order.discount > 0 && (
                              <div className="flex justify-between text-emerald-500">
                                <span>{language === 'ar' ? 'خصم' : 'Remise'}</span>
                                <span className="font-mono">-{formatPrice(order.discount)}</span>
                              </div>
                            )}
                            <div className="flex justify-between text-gray-500">
                              <span>{language === 'ar' ? 'تكلفة الشحن' : 'Livraison'}</span>
                              <span className="font-mono">
                                {order.shippingFee === 0
                                  ? (language === 'ar' ? 'مجاني' : 'Gratuit')
                                  : formatPrice(order.shippingFee)}
                              </span>
                            </div>
                            <div className="flex justify-between font-black text-sm border-t border-gray-200 dark:border-[#222222] pt-2 mt-1">
                              <span className="text-gray-900 dark:text-white">{language === 'ar' ? 'الإجمالي' : 'Total'}</span>
                              <span className="font-mono text-[#C89B3C]">{formatPrice(order.total)}</span>
                            </div>
                          </div>
                        </div>

                        {/* Delivery info */}
                        <div className="space-y-3">
                          <h4 className="text-[10px] uppercase tracking-widest font-black text-gray-400 flex items-center gap-1.5">
                            <MapPin size={11} />
                            {language === 'ar' ? 'عنوان التسليم' : 'Adresse de livraison'}
                          </h4>
                          <div className="bg-[#FDFBF7] dark:bg-[#0A0A0A] border border-gray-100 dark:border-[#1A1A1A] rounded-xl px-4 py-4 space-y-2 text-xs text-gray-600 dark:text-gray-400">
                            {order.shippingAddress?.fullName && (
                              <p className="font-bold text-gray-900 dark:text-white text-sm">{order.shippingAddress.fullName}</p>
                            )}
                            {order.shippingAddress?.addressLine && <p>{order.shippingAddress.addressLine}</p>}
                            {(order.shippingAddress?.commune || order.shippingAddress?.wilaya) && (
                              <p>{[order.shippingAddress.commune, order.shippingAddress.wilaya].filter(Boolean).join(', ')}</p>
                            )}
                            {order.shippingAddress?.phone && (
                              <p className="font-mono text-[#C89B3C] font-bold">{order.shippingAddress.phone}</p>
                            )}
                          </div>

                          {/* Payment method */}
                          <div className="flex items-center gap-2 text-xs text-gray-500 px-1">
                            <Star size={11} className="text-[#C89B3C]" />
                            <span>
                              {language === 'ar' ? 'طريقة الدفع: ' : 'Paiement : '}
                              <span className="font-bold text-gray-700 dark:text-gray-300">
                                {order.paymentMethod === 'cod'
                                  ? (language === 'ar' ? 'الدفع عند الاستلام' : 'À la livraison (COD)')
                                  : (language === 'ar' ? 'بطاقة بنكية' : 'Carte bancaire')}
                              </span>
                            </span>
                          </div>

                          {order.trackingNumber && (
                            <div className="bg-[#C89B3C]/10 border border-[#C89B3C]/30 rounded-xl px-4 py-3 text-xs">
                              <p className="text-gray-500 mb-1">{language === 'ar' ? 'رقم التتبع' : 'Numéro de suivi'}</p>
                              <p className="font-mono font-black text-[#C89B3C] tracking-wider">{order.trackingNumber}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        )}

        {/* ── WHATSAPP SECTION ── */}
        <div className="bg-gradient-to-br from-[#0F2F24] via-[#0B1B17] to-[#1B4332] border border-emerald-500/20 p-8 md:p-10 rounded-3xl text-center space-y-5 shadow-xl">
          <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto">
            <MessageSquare className="text-emerald-400" size={28} />
          </div>
          <div className="space-y-2">
            <h3 className="font-extrabold text-xl text-white">
              {language === 'ar' ? 'تحتاج مساعدة؟' : 'Besoin d\'aide ?'}
            </h3>
            <p className="text-emerald-200/70 text-sm max-w-md mx-auto leading-relaxed">
              {language === 'ar'
                ? 'تواصل مباشرة مع فريق خدمة العملاء عبر واتساب للحصول على معلومات حول طلبيتك.'
                : 'Contactez directement notre service client via WhatsApp pour toute information concernant votre commande.'}
            </p>
          </div>
          <a
            href={`https://wa.me/213781591087?text=${whatsappMsg}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-white font-black text-sm py-4 px-8 rounded-full transition shadow-lg shadow-emerald-500/20 group"
          >
            <MessageSquare size={18} />
            <span>
              {language === 'ar' ? 'تواصل مع خدمة العملاء' : 'Contacter notre service client'}
            </span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <p className="text-emerald-200/40 text-[11px] font-mono">
            {language === 'ar' ? 'متاح كل يوم · 09:00 – 20:00' : 'Disponible tous les jours · 09h00 – 20h00'}
          </p>
        </div>

      </div>
    </div>
  );
};

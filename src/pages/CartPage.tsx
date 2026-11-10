import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck, Tag, Percent, Info } from 'lucide-react';

interface CartPageProps {
  onNavigate: (page: string) => void;
}

export const CartPage: React.FC<CartPageProps> = ({ onNavigate }) => {
  const {
    translate,
    formatPrice,
    cart,
    updateCartQuantity,
    removeFromCart,
    activeCoupon,
    applyCoupon,
    removeCoupon,
    shippingRates
  } = useApp();

  const [couponCode, setCouponCode] = useState('');
  const [estimatedWilaya, setEstimatedWilaya] = useState('31');

  // Calculations
  const cartSubtotal = cart.reduce((acc, item) => acc + item.selectedPrice * item.quantity, 0);
  const discountAmount = activeCoupon
    ? activeCoupon.discountType === 'percentage'
      ? (cartSubtotal * activeCoupon.value) / 100
      : activeCoupon.value
    : 0;

  const matchedWilaya = shippingRates.find(
    (w) =>
      w.code.toString() === estimatedWilaya ||
      w.name.fr.toLowerCase().includes(estimatedWilaya.toLowerCase()) ||
      w.name.ar.includes(estimatedWilaya)
  );

  const isFreeDelivery = cartSubtotal >= 5000;
  const currentEstFee = matchedWilaya ? matchedWilaya.homeRate : 600;
  const shippingFee = cart.length === 0 ? 0 : isFreeDelivery ? 0 : currentEstFee;
  const cartTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim()) {
      applyCoupon(couponCode);
      setCouponCode('');
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#FDFBF7] dark:bg-[#030807] text-[#111111] dark:text-gray-100 py-16 px-4 md:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Title */}
        <div className="space-y-2 text-center md:text-left rtl:md:text-right">
          <h1 className="text-3xl md:text-4xl font-sans font-extrabold tracking-tight">
            {translate({ ar: 'سلة المشتريات والطلبية', fr: 'Mon Panier Complet', en: 'My Shopping Cart' })}
          </h1>
          <p className="text-gray-500 text-xs md:text-sm">
            {translate({
              ar: 'راجع بهاراتك الفاخرة وتوابل البوخاري المختارة وتابع خطوات التوصيل الآمن.',
              fr: 'Vérifiez vos sélections d\'épices nobles avant de finaliser votre commande de luxe.',
              en: 'Review your selected premium spices and proceed to our safe home checkout.'
            })}
          </p>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-[#111111] rounded-3xl border border-gray-200 dark:border-[#222222] shadow-sm max-w-xl mx-auto">
            <ShoppingBag className="mx-auto mb-6 text-gray-400" size={64} />
            <h2 className="text-xl font-bold text-white mb-2">
              {translate({ ar: 'سلتك فارغة تماماً', fr: 'Votre panier est vide', en: 'Your cart is empty' })}
            </h2>
            <p className="text-xs text-gray-500 max-w-xs mx-auto">
              {translate({
                ar: 'أضف بهارات رأس الحانوت الملكي، زعفران حر، أو علباً خشبية من مجموعتنا الفاخرة لتنطلق رحلة الطهي.',
                fr: 'Sélectionnez des épices d\'exception pour entamer votre odyssée culinaire de luxe.',
                en: 'Add precious Royal Ras El Hanout, pure saffron, or wooden gift boxes to begin your gourmet journey.'
              })}
            </p>
            <button
              onClick={() => onNavigate('shop')}
              className="mt-8 bg-[#C89B3C] text-black font-extrabold text-xs px-8 py-3.5 rounded-full hover:bg-white transition shadow-lg"
            >
              {translate({ ar: 'تصفح بهارات المتجر الآن', fr: 'Visiter la boutique', en: 'Visit our spices boutique' })}
            </button>
          </div>
        ) : (
          /* Cart Splits Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* ITEMS MATRIX (lg:col-span-8) */}
            <div className="lg:col-span-8 space-y-4">
              <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#222222] rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
                
                {/* Headers */}
                <div className="hidden md:grid grid-cols-12 gap-4 text-xs font-bold text-gray-400 uppercase tracking-wider pb-3 border-b border-gray-100 dark:border-[#222222]">
                  <div className="col-span-6">{translate({ ar: 'المنتج والتابل', fr: 'Épice Sélectionnée', en: 'Selected Spice' })}</div>
                  <div className="col-span-2 text-center">{translate({ ar: 'الوزن', fr: 'Format', en: 'Format' })}</div>
                  <div className="col-span-2 text-center">{translate({ ar: 'الكمية', fr: 'Quantité', en: 'Quantity' })}</div>
                  <div className="col-span-2 text-right">{translate({ ar: 'المجموع الفردي', fr: 'Total Partiel', en: 'Partial Total' })}</div>
                </div>

                {/* Items rows */}
                <div className="divide-y divide-gray-100 dark:divide-[#222222]">
                  {cart.map((item, idx) => (
                    <div
                      key={`${item.product.id}-${item.selectedWeight}-${idx}`}
                      className="grid grid-cols-1 md:grid-cols-12 gap-4 py-6 first:pt-0 last:pb-0 items-center text-sm"
                    >
                      {/* Product details */}
                      <div className="col-span-12 md:col-span-6 flex gap-4 items-center">
                        <img
                          src={item.product.images[0]}
                          alt={translate(item.product.name)}
                          className="w-20 h-20 object-cover rounded-xl border border-gray-100 dark:border-[#222222]"
                          referrerPolicy="no-referrer"
                        />
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-[#C89B3C] tracking-wider uppercase block">
                            {translate(item.product.categoryName)}
                          </span>
                          <h4 className="font-sans font-extrabold text-gray-900 dark:text-white line-clamp-1">
                            {translate(item.product.name)}
                          </h4>
                          <span className="text-xs text-gray-400 font-mono block md:hidden">Format: {item.selectedWeight}</span>
                        </div>
                      </div>

                      {/* Weight Format */}
                      <div className="hidden md:block col-span-12 md:col-span-2 text-center">
                        <span className="bg-[#FDFBF7] dark:bg-black border border-gray-200 dark:border-[#222222] text-[#C89B3C] font-mono font-bold text-xs px-3 py-1.5 rounded-lg">
                          {item.selectedWeight}
                        </span>
                      </div>

                      {/* Quantity Controller */}
                      <div className="col-span-12 md:col-span-2 flex justify-center md:justify-center">
                        <div className="flex items-center border border-gray-200 dark:border-[#333333] bg-[#FDFBF7] dark:bg-black rounded-lg overflow-hidden h-10">
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.selectedWeight, item.quantity - 1)}
                            className="px-3 hover:bg-gray-100 dark:hover:bg-[#222222] text-gray-400 hover:text-[#C89B3C] transition"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="px-3 font-bold text-center min-w-[30px] font-mono text-xs">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.selectedWeight, item.quantity + 1)}
                            className="px-3 hover:bg-gray-100 dark:hover:bg-[#222222] text-gray-400 hover:text-[#C89B3C] transition"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>

                      {/* Price / Delete */}
                      <div className="col-span-12 md:col-span-2 flex md:flex-col justify-between md:justify-center items-center md:items-end gap-2 text-right">
                        <div>
                          <p className="font-mono font-bold text-[#C89B3C] text-sm md:text-base">
                            {formatPrice(item.selectedPrice * item.quantity)}
                          </p>
                          <span className="text-[10px] text-gray-400 font-mono hidden md:inline">
                            {formatPrice(item.selectedPrice)} / u
                          </span>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedWeight)}
                          className="text-red-500 hover:text-red-400 p-2 hover:bg-red-500/10 rounded-full transition flex items-center gap-1 text-xs"
                        >
                          <Trash2 size={14} />
                          <span className="inline md:hidden">{translate({ ar: 'حذف', fr: 'Supprimer', en: 'Delete' })}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* BILL CALCULATOR PANEL (lg:col-span-4) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#222222] p-6 rounded-3xl shadow-sm space-y-6">
                <h3 className="text-lg font-bold border-b border-gray-100 dark:border-[#222222] pb-3 text-white">
                  {translate({ ar: 'ملخص الفاتورة والحساب', fr: 'Récapitulatif de Commande', en: 'Bill Summary' })}
                </h3>

                {/* Shipping Wilaya Estimator */}
                <div className="space-y-2">
                  <label className="text-xs font-extrabold text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                    <Truck size={14} className="text-[#C89B3C]" />
                    <span>{translate({ ar: 'تقدير تكلفة شحن الولاية', fr: 'Estimation de livraison', en: 'Delivery Estimation' })}</span>
                  </label>
                  <select
                    value={estimatedWilaya}
                    onChange={(e) => setEstimatedWilaya(e.target.value)}
                    className="w-full bg-[#FDFBF7] dark:bg-black border border-gray-200 dark:border-[#222222] focus:border-[#C89B3C] focus:outline-none px-4 py-3 rounded-xl text-xs text-gray-700 dark:text-gray-200"
                  >
                    {shippingRates.map((w) => (
                      <option key={w.code} value={w.code.toString()}>
                        {w.code} - {translate(w.name)} ({w.homeRate} DA)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Promo Code panel */}
                {activeCoupon ? (
                  <div className="bg-[#1B4332]/20 border border-emerald-500/30 p-3 rounded-xl flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-emerald-500">
                      <Percent size={14} />
                      <span className="font-bold">{activeCoupon.code} applied!</span>
                    </div>
                    <button onClick={removeCoupon} className="text-red-500 hover:text-red-400 font-bold underline">
                      {translate({ ar: 'إزالة', fr: 'Retirer', en: 'Remove' })}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder={translate({ ar: 'كود الخصم (RAMADAN20)', fr: 'Code Promo (RAMADAN20)', en: 'Promo Code' })}
                      className="flex-1 bg-[#FDFBF7] dark:bg-black border border-gray-200 dark:border-[#222222] focus:border-[#C89B3C] focus:outline-none px-4 py-3 rounded-xl text-xs text-white"
                    />
                    <button
                      type="submit"
                      className="bg-[#C89B3C] hover:bg-white text-black font-black text-xs px-5 py-3.5 rounded-xl transition shadow-md"
                    >
                      {translate({ ar: 'تطبيق', fr: 'Valider', en: 'Apply' })}
                    </button>
                  </form>
                )}

                {/* Invoice rows calculation */}
                <div className="space-y-3.5 border-t border-b border-gray-100 dark:border-[#222222] py-4 text-xs font-sans text-gray-600 dark:text-gray-400">
                  <div className="flex justify-between">
                    <span>{translate({ ar: 'المجموع الفرعي', fr: 'Sous-total articles', en: 'Subtotal items' })}</span>
                    <span className="font-mono font-bold text-white">{formatPrice(cartSubtotal)}</span>
                  </div>
                  {activeCoupon && (
                    <div className="flex justify-between text-emerald-500 font-semibold">
                      <span>{translate({ ar: 'الخصم المطبق', fr: 'Remise déduite', en: 'Discount applied' })}</span>
                      <span className="font-mono">-{formatPrice(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>{translate({ ar: 'تكلفة شحن الموقع', fr: 'Frais d\'expédition', en: 'Shipping' })}</span>
                    <span className="font-mono font-bold text-white">
                      {shippingFee === 0 ? translate({ ar: 'مجاني', fr: 'Gratuit', en: 'Free' }) : formatPrice(shippingFee)}
                    </span>
                  </div>

                  {/* Free shipping banner if not unlocked */}
                  {!isFreeDelivery && (
                    <div className="bg-[#FDFBF7] p-2.5 rounded-lg border border-[#C89B3C]/10 text-[10px] text-gray-500 flex items-center gap-1.5">
                      <Info size={12} className="text-[#C89B3C] shrink-0" />
                      <span>
                        {translate({
                          ar: 'أضف بهارات بـ ' + (5000 - cartSubtotal) + ' د.ج إضافية للتوصيل المجاني!',
                          fr: 'Ajoutez ' + (5000 - cartSubtotal) + ' DA d\'épices pour la gratuité !',
                          en: 'Add ' + (5000 - cartSubtotal) + ' DA of spices to lock free shipping!'
                        })}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center py-2">
                  <span className="font-bold text-white">{translate({ ar: 'الإجمالي النهائي المتبقي', fr: 'Total à Payer', en: 'Grand Total' })}</span>
                  <span className="font-mono text-2xl font-black text-[#C89B3C]">{formatPrice(cartTotal)}</span>
                </div>

                <button
                  onClick={() => onNavigate('checkout')}
                  className="w-full bg-[#C89B3C] text-black hover:bg-white font-black py-4 px-6 rounded-full text-center transition flex items-center justify-center gap-2 group shadow-xl hover:shadow-[#C89B3C]/15"
                >
                  <span>{translate({ ar: 'متابعة إتمام الطلبية', fr: 'Passer la commande', en: 'Proceed to Checkout' })}</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CreditCard, ShoppingBag, Truck, Check, HelpCircle, FileText, Sparkles, Printer } from 'lucide-react';

interface CheckoutProps {
  onNavigate: (page: string) => void;
}

export const Checkout: React.FC<CheckoutProps> = ({ onNavigate }) => {
  const {
    translate,
    formatPrice,
    cart,
    clearCart,
    activeCoupon,
    createOrder,
    shippingRates
  } = useApp();

  // Step state: 1: form, 2: order placed success
  const [checkoutStep, setCheckoutStep] = useState<1 | 2>(1);

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [altPhoneNumber, setAltPhoneNumber] = useState('');
  const [selectedWilaya, setSelectedWilaya] = useState('31');
  const [commune, setCommune] = useState('');
  const [address, setAddress] = useState('');
  const [deliveryType, setDeliveryType] = useState<'home' | 'office'>('home');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card'>('cod');
  
  // Card mock states
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  // Completed order receipt cache
  const [completedOrder, setCompletedOrder] = useState<any | null>(null);

  // Prices
  const cartSubtotal = cart.reduce((acc, item) => acc + item.selectedPrice * item.quantity, 0);
  const discountAmount = activeCoupon
    ? activeCoupon.discountType === 'percentage'
      ? (cartSubtotal * activeCoupon.value) / 100
      : activeCoupon.value
    : 0;

  const matchedWilaya = shippingRates.find(
    (w) =>
      w.name.fr.toLowerCase().includes(selectedWilaya.toLowerCase()) ||
      w.name.ar.includes(selectedWilaya) ||
      w.code.toString() === selectedWilaya
  );

  const isFreeDelivery = cartSubtotal >= 5000;
  const currentWilayaRate = matchedWilaya
    ? deliveryType === 'home'
      ? matchedWilaya.homeRate
      : matchedWilaya.deskRate
    : 600;
  const shippingFee = isFreeDelivery ? 0 : currentWilayaRate;
  const finalTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !phoneNumber || !commune || !address) {
      alert(translate({
        ar: 'يرجى ملء كافة الحقول الإلزامية التي يشار إليها بالنجمة (*)',
        fr: 'Veuillez remplir tous les champs obligatoires (*)',
        en: 'Please fill in all required fields (*)'
      }));
      return;
    }

    const wilayaName = shippingRates.find((w) => w.code.toString() === selectedWilaya)?.name || { ar: selectedWilaya, fr: selectedWilaya, en: selectedWilaya };

    const newOrder = createOrder({
      items: cart.map((item) => ({
        productId: item.product.id,
        productName: translate(item.product.name),
        weight: item.selectedWeight,
        price: item.selectedPrice,
        quantity: item.quantity
      })),
      subtotal: cartSubtotal,
      shippingFee,
      discount: discountAmount,
      total: finalTotal,
      shippingAddress: {
        id: 'addr-checkout',
        title: 'Adresse de livraison',
        fullName,
        phone: phoneNumber,
        addressLine: address + (altPhoneNumber ? ` (Alt: ${altPhoneNumber})` : ''),
        wilaya: translate(wilayaName),
        commune
      },
      paymentMethod,
    });

    setCompletedOrder({
      orderId: newOrder.id,
      date: newOrder.date,
      items: cart.map((item) => ({
        productName: item.product.name,
        selectedWeight: item.selectedWeight,
        selectedPrice: item.selectedPrice,
        quantity: item.quantity
      })),
      fullName,
      phone: phoneNumber,
      altPhone: altPhoneNumber,
      wilaya: selectedWilaya,
      commune,
      address,
      deliveryType,
      paymentMethod,
      shippingFee,
      discountAmount,
      subtotal: cartSubtotal,
      total: finalTotal,
      status: 'pending'
    });

    setCheckoutStep(2);
  };

  return (
    <div className="w-full min-h-screen bg-[#FDFBF7] dark:bg-[#030807] text-[#111111] dark:text-gray-100 py-16 px-4 md:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {checkoutStep === 1 ? (
          /* =================== STEP 1: FORM & CHECKOUT REVIEW =================== */
          <div className="space-y-10 animate-fade-in">
            <div className="text-center space-y-2">
              <h1 className="text-3xl md:text-4xl font-sans font-extrabold tracking-tight text-white">
                {translate({ ar: 'إتمام الطلب والدفع الفاخر', fr: 'Finalisation de ma Commande', en: 'Checkout Payment Details' })}
              </h1>
              <p className="text-gray-500 text-xs md:text-sm max-w-lg mx-auto">
                {translate({
                  ar: 'يرجى تزويدنا بعنوانكم بدقة لتلقي توابل البوخاري الطازجة في أقصر وقت ممكن.',
                  fr: 'Remplissez soigneusement le formulaire pour planifier le moulinage à froid et l\'expédition.',
                  en: 'Provide your accurate shipping directives to coordinate cold milling and delivery schedules.'
                })}
              </p>
            </div>

            <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              
              {/* LEFT COLUMN: INFORMATION FORMS (cols 7) */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* 1. Address Section Card */}
                <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#222222] p-6 md:p-8 rounded-3xl shadow-sm space-y-5">
                  <h3 className="text-base font-bold text-[#C89B3C] border-b border-gray-100 dark:border-[#222222] pb-3 uppercase flex items-center gap-1.5">
                    <Truck size={16} />
                    <span>{translate({ ar: 'بيانات التوصيل والمنزل', fr: 'Adresse de Livraison', en: 'Delivery Address' })}</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    {/* Full Name */}
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="font-bold text-gray-500">
                        {translate({ ar: 'الاسم واللقب بالكامل *', fr: 'Nom complet *', en: 'Full Name *' })}
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Ex: Benali Mohamed"
                        className="w-full bg-[#FDFBF7] dark:bg-black border border-gray-200 dark:border-[#222222] focus:border-[#C89B3C] focus:outline-none px-4 py-3.5 rounded-xl text-gray-900 dark:text-white"
                      />
                    </div>

                    {/* Primary Phone */}
                    <div className="space-y-1.5">
                      <label className="font-bold text-gray-500">
                        {translate({ ar: 'رقم الهاتف الأساسي *', fr: 'Numéro de téléphone principal *', en: 'Primary Phone Number *' })}
                      </label>
                      <input
                        type="tel"
                        required
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Ex: 0555 12 34 56"
                        className="w-full bg-[#FDFBF7] dark:bg-black border border-gray-200 dark:border-[#222222] focus:border-[#C89B3C] focus:outline-none px-4 py-3.5 rounded-xl text-gray-900 dark:text-white font-mono"
                      />
                    </div>

                    {/* Alternate Phone */}
                    <div className="space-y-1.5">
                      <label className="font-bold text-gray-400">
                        {translate({ ar: 'رقم هاتف احتياطي (اختياري)', fr: 'Numéro de téléphone secondaire', en: 'Secondary Phone (Optional)' })}
                      </label>
                      <input
                        type="tel"
                        value={altPhoneNumber}
                        onChange={(e) => setAltPhoneNumber(e.target.value)}
                        placeholder="Ex: 0666 98 76 54"
                        className="w-full bg-[#FDFBF7] dark:bg-black border border-gray-200 dark:border-[#222222] focus:border-[#C89B3C] focus:outline-none px-4 py-3.5 rounded-xl text-gray-900 dark:text-white font-mono"
                      />
                    </div>

                    {/* Wilaya select */}
                    <div className="space-y-1.5">
                      <label className="font-bold text-gray-500">
                        {translate({ ar: 'الولاية *', fr: 'Wilaya de livraison *', en: 'Wilaya *' })}
                      </label>
                      <select
                        value={selectedWilaya}
                        onChange={(e) => setSelectedWilaya(e.target.value)}
                        className="w-full bg-[#FDFBF7] dark:bg-black border border-gray-200 dark:border-[#222222] focus:border-[#C89B3C] focus:outline-none px-4 py-3.5 rounded-xl text-gray-900 dark:text-white"
                      >
                        {shippingRates.map((w) => (
                          <option key={w.code} value={w.code.toString()}>
                            {w.code} - {translate(w.name)} ({deliveryType === 'home' ? w.homeRate : w.deskRate} DA)
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Commune */}
                    <div className="space-y-1.5">
                      <label className="font-bold text-gray-500">
                        {translate({ ar: 'البلدية أو المدينة *', fr: 'Commune / Ville *', en: 'Commune / City *' })}
                      </label>
                      <input
                        type="text"
                        required
                        value={commune}
                        onChange={(e) => setCommune(e.target.value)}
                        placeholder="Ex: Bab Ezzouar"
                        className="w-full bg-[#FDFBF7] dark:bg-black border border-gray-200 dark:border-[#222222] focus:border-[#C89B3C] focus:outline-none px-4 py-3.5 rounded-xl text-gray-900 dark:text-white"
                      />
                    </div>

                    {/* Specific Address Details */}
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="font-bold text-gray-500">
                        {translate({ ar: 'العنوان السكني التفصيلي *', fr: 'Adresse résidentielle précise *', en: 'Detailed Address *' })}
                      </label>
                      <input
                        type="text"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Ex: Rue 1er Novembre, Cité 50 Logements, Apt 4"
                        className="w-full bg-[#FDFBF7] dark:bg-black border border-gray-200 dark:border-[#222222] focus:border-[#C89B3C] focus:outline-none px-4 py-3.5 rounded-xl text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>

                  {/* Delivery Type (Home vs Relais office) */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100 dark:border-[#222222] text-xs">
                    <button
                      type="button"
                      onClick={() => setDeliveryType('home')}
                      className={`p-4 rounded-xl border text-center transition flex flex-col items-center gap-1.5 ${
                        deliveryType === 'home'
                          ? 'border-[#C89B3C] bg-[#C89B3C]/10 text-[#C89B3C]'
                          : 'border-gray-200 dark:border-[#222222] text-gray-500 hover:border-[#C89B3C]'
                      }`}
                    >
                      <span className="font-bold">
                        {translate({ ar: 'توصيل لباب المنزل', fr: 'À Domicile', en: 'Home Delivery' })}
                      </span>
                      <span className="text-[10px] opacity-75">
                        {translate({ ar: 'التسليم مباشرة ليدك', fr: 'Livré en main propre', en: 'Directly to your door' })}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeliveryType('office')}
                      className={`p-4 rounded-xl border text-center transition flex flex-col items-center gap-1.5 ${
                        deliveryType === 'office'
                          ? 'border-[#C89B3C] bg-[#C89B3C]/10 text-[#C89B3C]'
                          : 'border-gray-200 dark:border-[#222222] text-gray-500 hover:border-[#C89B3C]'
                      }`}
                    >
                      <span className="font-bold">
                        {translate({ ar: 'استلام من مكتب التوصيل', fr: 'Point Bureau', en: 'Relais Desk Pickup' })}
                      </span>
                      <span className="text-[10px] opacity-75">
                        {translate({ ar: 'استلم طلبيتك بنفسك ووفر', fr: 'Moins cher à récupérer', en: 'Cheaper, pickup yourself' })}
                      </span>
                    </button>
                  </div>
                </div>

                {/* 2. Payment Method Card */}
                <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#222222] p-6 md:p-8 rounded-3xl shadow-sm space-y-5">
                  <h3 className="text-base font-bold text-[#C89B3C] border-b border-gray-100 dark:border-[#222222] pb-3 uppercase flex items-center gap-1.5">
                    <CreditCard size={16} />
                    <span>{translate({ ar: 'طريقة الدفع الفاخرة', fr: 'Moyen de Paiement', en: 'Payment Option' })}</span>
                  </h3>

                  <div className="grid grid-cols-2 gap-4 text-xs">
                    {/* Cash On Delivery */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cod')}
                      className={`p-4 rounded-xl border text-center transition flex flex-col items-center gap-1.5 ${
                        paymentMethod === 'cod'
                          ? 'border-[#C89B3C] bg-[#C89B3C]/10 text-[#C89B3C]'
                          : 'border-gray-200 dark:border-[#222222] text-gray-500 hover:border-[#C89B3C]'
                      }`}
                    >
                      <span className="font-bold">
                        {translate({ ar: 'الدفع عند الاستلام (COD)', fr: 'Paiement à la livraison', en: 'Cash on Delivery (COD)' })}
                      </span>
                      <span className="text-[10px] opacity-75">
                        {translate({ ar: 'الدفع نقداً بعد فحص جودة التوابل', fr: 'Payez cash après inspection', en: 'Pay cash after spice check' })}
                      </span>
                    </button>

                    {/* Mock Card */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-4 rounded-xl border text-center transition flex flex-col items-center gap-1.5 ${
                        paymentMethod === 'card'
                          ? 'border-[#C89B3C] bg-[#C89B3C]/10 text-[#C89B3C]'
                          : 'border-gray-200 dark:border-[#222222] text-gray-500 hover:border-[#C89B3C]'
                      }`}
                    >
                      <span className="font-bold">
                        {translate({ ar: 'البطاقة البنكية / الذهبية', fr: 'Carte Bancaire / Dahabia', en: 'Bank Card / Dahabia' })}
                      </span>
                      <span className="text-[10px] opacity-75">
                        {translate({ ar: 'دفع إلكتروني آمن ومحمي', fr: 'Paiement sécurisé crypté', en: 'Secure crypted checkout' })}
                      </span>
                    </button>
                  </div>

                  {/* Card payment detail form (only if 'card' selected) */}
                  {paymentMethod === 'card' && (
                    <div className="bg-[#FDFBF7] dark:bg-black p-5 rounded-2xl border border-gray-200 dark:border-[#222222] space-y-4 text-xs animate-fade-in">
                      <div className="relative aspect-[1.58/1] max-w-xs mx-auto bg-gradient-to-tr from-[#0F2F24] via-[#0B1B17] to-[#C89B3C] rounded-xl p-5 text-white shadow-lg flex flex-col justify-between font-mono">
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] font-bold text-gray-300">EL BOUKHARI PRESTIGE CARD</span>
                          <span className="text-[#C89B3C] font-black text-sm">Dahabia</span>
                        </div>
                        <div className="text-sm md:text-base tracking-[0.2em]">{cardNumber || '•••• •••• •••• ••••'}</div>
                        <div className="flex justify-between text-[10px] text-gray-300">
                          <div>
                            <p className="text-[7px]">CARDHOLDER</p>
                            <p>{fullName || 'MEMBER NAME'}</p>
                          </div>
                          <div>
                            <p className="text-[7px]">EXPIRES</p>
                            <p>{cardExpiry || 'MM/YY'}</p>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="space-y-1.5 md:col-span-2">
                          <label className="font-bold text-gray-500">Card Number</label>
                          <input
                            type="text"
                            maxLength={19}
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            placeholder="0000 0000 0000 0000"
                            className="w-full bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#222222] focus:border-[#C89B3C] focus:outline-none p-3 rounded-lg text-white text-xs font-mono"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="font-bold text-gray-500">Expiry (MM/YY)</label>
                          <input
                            type="text"
                            maxLength={5}
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            placeholder="12/28"
                            className="w-full bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#222222] focus:border-[#C89B3C] focus:outline-none p-3 rounded-lg text-white text-xs font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* RIGHT COLUMN: ITEMS SUMMARY REVIEW PANEL (cols 5) */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#222222] p-6 rounded-3xl shadow-sm space-y-6">
                  <h3 className="text-base font-bold text-white border-b border-gray-100 dark:border-[#222222] pb-3 uppercase flex items-center gap-1.5">
                    <ShoppingBag size={16} />
                    <span>{translate({ ar: 'مراجعة المشتريات المحددة', fr: 'Récapitulatif Articles', en: 'Cart Review' })}</span>
                  </h3>

                  {/* Cart Item Row list */}
                  <div className="max-h-[30vh] overflow-y-auto divide-y divide-gray-50 dark:divide-[#222222] pr-1">
                    {cart.map((item, idx) => (
                      <div key={idx} className="flex gap-3 py-3 items-center text-xs">
                        <img
                          src={item.product.images[0]}
                          alt={translate(item.product.name)}
                          className="w-12 h-12 object-cover rounded-lg border border-gray-100 dark:border-[#222222]"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1 space-y-0.5">
                          <h4 className="font-bold text-white truncate max-w-[150px]">{translate(item.product.name)}</h4>
                          <p className="text-gray-400 font-mono">Format: {item.selectedWeight} × {item.quantity}</p>
                        </div>
                        <span className="font-mono text-[#C89B3C] font-extrabold">{formatPrice(item.selectedPrice * item.quantity)}</span>
                      </div>
                    ))}
                  </div>

                  {/* Pricing bills lists */}
                  <div className="space-y-3.5 border-t border-b border-gray-100 dark:border-[#222222] py-4 text-xs font-sans text-gray-500">
                    <div className="flex justify-between">
                      <span>{translate({ ar: 'المجموع الفرعي للبهارات', fr: 'Total Brut', en: 'Items Subtotal' })}</span>
                      <span className="font-mono font-bold text-white">{formatPrice(cartSubtotal)}</span>
                    </div>
                    {activeCoupon && (
                      <div className="flex justify-between text-emerald-500 font-semibold">
                        <span>{translate({ ar: 'مبلغ الخصم المقتطع', fr: 'Code Promo Déduit', en: 'Discount amount' })}</span>
                        <span className="font-mono">-{formatPrice(discountAmount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>{translate({ ar: 'تكلفة شحن الولاية', fr: 'Frais de livraison', en: 'Shipping rate' })}</span>
                      <span className="font-mono font-bold text-white">
                        {shippingFee === 0 ? translate({ ar: 'مجاني', fr: 'Gratuit', en: 'Free' }) : formatPrice(shippingFee)}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="font-bold text-sm text-white">{translate({ ar: 'المجموع الإجمالي المستحق', fr: 'Total à payer', en: 'Grand Total' })}</span>
                    <span className="font-mono text-xl font-black text-[#C89B3C]">{formatPrice(finalTotal)}</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#C89B3C] text-black hover:bg-white font-black py-4 px-6 rounded-full text-center transition flex items-center justify-center gap-2 shadow-xl hover:shadow-[#C89B3C]/15"
                  >
                    <span>{translate({ ar: 'تأكيد وشراء الطلب الآن', fr: 'Confirmer mon Achat', en: 'Confirm Order & Pay' })}</span>
                  </button>
                </div>
              </div>

            </form>
          </div>
        ) : (
          /* =================== STEP 2: BEAUTIFUL SUCCESS INVOICE =================== */
          <div className="max-w-2xl mx-auto space-y-10 text-center animate-fade-in py-10">
            <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-md">
              <Check size={40} className="animate-bounce" />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 bg-[#C89B3C]/10 border border-[#C89B3C]/30 px-3 py-1 rounded-full text-[10px] text-[#C89B3C] tracking-widest font-black uppercase">
                <Sparkles size={10} />
                <span>ORDER PLACED SUCCESSFULLY!</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-sans font-extrabold tracking-tight">
                {translate({ ar: 'شكراً لكم! تم تسجيل طلبيتكم بنجاح', fr: 'Merci ! Votre commande est enregistrée', en: 'Thank you! Order Received Successfully' })}
              </h1>
              <p className="text-gray-500 text-xs md:text-sm max-w-md mx-auto">
                {translate({
                  ar: 'سيقوم ممثل خدمة عملاء توابل البوخاري بالتواصل معكم هاتفياً لتأكيد شحن طلبية الطحن الطازج قريباً.',
                  fr: 'Notre conseiller client vous contactera par téléphone d\'ici quelques minutes pour valider l\'expédition.',
                  en: 'Our dedicated customer advisor will call your phone soon to confirm the shipping status of your fresh grind.'
                })}
              </p>
            </div>

            {/* PRINTABLE PDF STYLE RECEIPT */}
            <div id="printable-receipt" className="bg-white text-black text-left rtl:text-right p-6 md:p-8 rounded-2xl border border-gray-200 shadow-xl space-y-6 font-mono text-xs">
              
              {/* Receipt Header branding */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-200 pb-5 gap-4">
                <div>
                  <h3 className="font-extrabold text-base tracking-wider text-[#C89B3C] uppercase font-sans">توابل البوخاري</h3>
                  <p className="text-[10px] text-gray-500">Maison Épices El Boukhari, Algérie</p>
                  <p className="text-[9px] text-gray-400">Tel: +213 (0) 21 73 45 67</p>
                </div>
                <div className="text-right sm:text-right rtl:sm:text-left">
                  <span className="bg-[#1B4332]/10 border border-emerald-500/20 text-[#1B4332] px-2.5 py-1 rounded font-bold uppercase text-[9px]">
                    {paymentMethod === 'cod' ? 'Pay à la Livraison (COD)' : 'Carte Payé'}
                  </span>
                  <p className="text-[10px] text-gray-500 mt-2">N°: <strong className="text-black">{completedOrder?.orderId}</strong></p>
                  <p className="text-[9px] text-gray-400">Date: {completedOrder?.date}</p>
                </div>
              </div>

              {/* Client specifications */}
              <div className="grid grid-cols-2 gap-4 border-b border-gray-200 pb-5 text-[10px]">
                <div>
                  <h4 className="font-extrabold text-[#C89B3C] uppercase text-[9px] mb-1.5">Facturé à / Deliver to:</h4>
                  <p className="font-bold text-gray-900">{completedOrder?.fullName}</p>
                  <p className="text-gray-600">{completedOrder?.phone}</p>
                  {completedOrder?.altPhone && <p className="text-gray-500">Alt: {completedOrder.altPhone}</p>}
                </div>
                <div className="text-right rtl:text-left">
                  <h4 className="font-extrabold text-[#C89B3C] uppercase text-[9px] mb-1.5">Adresse d'expédition:</h4>
                  <p className="text-gray-600">{completedOrder?.address}</p>
                  <p className="font-bold text-gray-900">{completedOrder?.commune}, Wilaya {completedOrder?.wilaya}</p>
                </div>
              </div>

              {/* Items bill table */}
              <div className="space-y-3 border-b border-gray-200 pb-5">
                <h4 className="font-extrabold text-[#C89B3C] uppercase text-[9px] mb-2">Détails des Articles:</h4>
                <div className="space-y-2">
                  {completedOrder?.items.map((item: any, idx: number) => (
                    <div key={idx} className="flex justify-between text-[11px] items-center">
                      <div className="flex-1 pr-4">
                        <p className="font-bold text-gray-900">{translate(item.productName)}</p>
                        <p className="text-[9px] text-gray-500 font-mono">Format: {item.selectedWeight} × {item.quantity}</p>
                      </div>
                      <span className="font-mono font-bold text-gray-900">{formatPrice(item.selectedPrice * item.quantity)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Totals */}
              <div className="space-y-2 text-[10px] text-gray-500 max-w-xs ml-auto rtl:ml-0 rtl:mr-auto">
                <div className="flex justify-between">
                  <span>Sous-total articles:</span>
                  <span className="font-mono text-gray-900 font-bold">{formatPrice(completedOrder?.subtotal || 0)}</span>
                </div>
                {completedOrder?.discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Remise Coupon:</span>
                    <span className="font-mono">-{formatPrice(completedOrder.discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Frais d'expédition Wilaya:</span>
                  <span className="font-mono text-gray-900 font-bold">
                    {completedOrder?.shippingFee === 0 ? 'Gratuit' : formatPrice(completedOrder?.shippingFee || 0)}
                  </span>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-2 text-xs font-extrabold text-black">
                  <span>Total Net Facturé:</span>
                  <span className="font-mono text-[#C89B3C] font-black text-sm">{formatPrice(completedOrder?.total || 0)}</span>
                </div>
              </div>
            </div>

            {/* Print/Download and Navigation actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center font-sans">
              <button
                onClick={() => window.print()}
                className="w-full sm:w-auto bg-transparent border border-gray-200 hover:border-white text-gray-400 hover:text-white font-bold py-3 px-6 rounded-full text-xs flex items-center justify-center gap-2"
              >
                <Printer size={14} />
                <span>{translate({ ar: 'طباعة هذه الفاتورة', fr: 'Imprimer mon bon', en: 'Print Invoice' })}</span>
              </button>
              <button
                onClick={() => onNavigate('home')}
                className="w-full sm:w-auto bg-[#C89B3C] text-black hover:bg-white font-black py-3.5 px-8 rounded-full text-xs"
              >
                {translate({ ar: 'العودة للواجهة الرئيسية للمتجر', fr: 'Retourner à l\'accueil', en: 'Back to Homepage' })}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Truck, ShieldAlert, FileText, CheckCircle, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface StaticPageProps {
  pageId: 'faq' | 'delivery' | 'returns' | 'terms' | 'privacy';
}

export const StaticPages: React.FC<StaticPageProps> = ({ pageId }) => {
  const { translate } = useApp();

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: {
        ar: 'من أين تأتي توابل البوخاري؟',
        fr: 'D\'où proviennent vos épices ?',
        en: 'Where do El Boukhari spices come from?'
      },
      a: {
        ar: 'تأتي توابلنا من مصادر متميزة ومحمية. نقوم باستيراد التوابل النادرة مثل الزعفران البري من تاليوين، الفلفل الأسود من غابات مدغشقر، والقرنفل من زنجبار، بينما نعتمد على مزارع محلية مستدامة بالجزائر لتوفير كمون أدرار الصحراوي، سانوج الهضاب العليا، وزعتر جبال الأطلس.',
        fr: 'Nos épices proviennent de terroirs d\'exception certifiés. Nous importons les trésors rares de leur pays d\'origine (Saffron de Taliouine, poivre sauvage de Madagascar, girofle de Zanzibar) et privilégions des partenariats éco-responsables en Algérie pour le cumin d\'Adrar, le Sanoudj des Hauts-Plateaux et le thym de l\'Atlas.',
        en: 'Our spices are sourced from certified geographical origins. We import global treasures directly (Madagascar wild pepper, Zanzibar cloves, pure saffron) and maintain direct eco-friendly partnerships in Algeria for desert Adrar cumin, local Sanouj seeds, and organic Atlas thyme.'
      }
    },
    {
      q: {
        ar: 'هل التوابل التي تبيعونها مطحونة طازجة؟',
        fr: 'Vos épices sont-elles moulues à la demande ?',
        en: 'Are your spices freshly ground?'
      },
      a: {
        ar: 'نعم، بكل تأكيد! للحفاظ على قوة الزيوت الطيارة، نحن نحتفظ بجميع توابلنا في شكل بذور وقشور كاملة في مستودعاتنا المبردة والمظلمة. نقوم بعملية الطحن البارد بجرعات صغيرة يومياً وتعبئتها فوراً في عبوات محكمة الغلق لتصلكم برائحتها الكاملة والنشطة.',
        fr: 'Oui, absolument ! Pour préserver l\'intégrité des huiles essentielles, nous stockons nos épices entières sous température contrôlée. Elles sont moulues à froid par petits lots quotidiens et conditionnées immédiatement dans des bocaux et sachets hermétiques anti-UV.',
        en: 'Yes, absolutely! To protect the volatile essential oils, we store our spices in whole forms in climate-controlled dark lockers. We perform cold-grinding in micro-batches daily and package them immediately in airtight, UV-shielded containers.'
      }
    },
    {
      q: {
        ar: 'ما هي طرق الدفع المتاحة للزبائن بالجزائر؟',
        fr: 'Quels sont les modes de paiement disponibles en Algérie ?',
        en: 'What payment options are available in Algeria?'
      },
      a: {
        ar: 'طريقة الدفع الرئيسية والأكثر أماناً لزبائننا هي الدفع نقداً عند الاستلام (Paiement à la livraison) بعد التحقق من جودة طلبيتكم مع عون التوصيل. كما نوفر إمكانية الدفع عبر بطاقة الشفاء الإلكترونية أو التحويل البريدي (CCP/BaridiMob) لبعض الهيئات والطلبيات الخاصة.',
        fr: 'Le mode de paiement par défaut et le plus sécurisé est le Paiement Cash à la Livraison (COD). Vous payez le livreur en espèces uniquement après réception et vérification de votre colis. Nous acceptons également les virements CCP ou BaridiMob pour les commandes professionnelles.',
        en: 'The standard and most trusted option is Cash on Delivery (COD). You pay the delivery agent in cash only after receiving and checking your package. We also accommodate BaridiMob and CCP transfers for businesses and corporate gift box orders.'
      }
    },
    {
      q: {
        ar: 'كيف أستعمل كود الخصم في الموقع؟',
        fr: 'Comment utiliser un code promo sur le site ?',
        en: 'How do I use a promo code on the website?'
      },
      a: {
        ar: 'عند إضافة منتجاتك المفضلة إلى السلة، افتح لوحة السلة الجانبية أو صفحة الدفع. ستجد حقلاً مخصصاً لإدخال كود الخصم (مثل BOUKHARI10 أو RAMADAN20). أدخل الكود واضغط على زر "تطبيق"، وسيتم تحديث إجمالي الفاتورة بخصم فوري.',
        fr: 'Une fois vos articles ajoutés au panier, ouvrez le tiroir du panier ou allez sur la page de paiement. Saisissez votre code promo (ex: BOUKHARI10) dans l\'encart dédié et cliquez sur "Appliquer". La réduction sera immédiatement déduite de votre total.',
        en: 'When your items are added, open the cart drawer or proceed to checkout. Enter your promo code (e.g., BOUKHARI10) in the input field and click "Apply". Your discount will be calculated and subtracted from your total bill instantly.'
      }
    }
  ];

  // Localized Wilaya Delivery Table
  const deliveryRates = [
    { wilaya: { ar: 'الجزائر العاصمة', fr: 'Alger', en: 'Algiers' }, delay: '24h - 48h', rate: '350 DA', home: '450 DA' },
    { wilaya: { ar: 'البليدة، تيبازة، بومرداس', fr: 'Blida, Tipaza, Boumerdès', en: 'Blida, Tipaza, Boumerdes' }, delay: '48h', rate: '400 DA', home: '500 DA' },
    { wilaya: { ar: 'وهران، قسنطينة، عنابة', fr: 'Oran, Constantine, Annaba', en: 'Oran, Constantine, Annaba' }, delay: '2 - 3 Jours', rate: '500 DA', home: '650 DA' },
    { wilaya: { ar: 'سطيف، تلمسان، بجاية، باتنة', fr: 'Sétif, Tlemcen, Béjaïa, Batna', en: 'Setif, Tlemcen, Bejaia, Batna' }, delay: '3 - 4 Jours', rate: '550 DA', home: '700 DA' },
    { wilaya: { ar: 'ورقلة، الوادي، بشار، غرداية', fr: 'Ouargla, El Oued, Béchar, Ghardaïa', en: 'Ouargla, El Oued, Bechar, Ghardaia' }, delay: '4 - 5 Jours', rate: '700 DA', home: '900 DA' },
    { wilaya: { ar: 'تمنراست، إليزي، أدرا ر', fr: 'Tamanrasset, Illizi, Adrar', en: 'Tamanrasset, Illizi, Adrar' }, delay: '5 - 7 Jours', rate: '900 DA', home: '1200 DA' }
  ];

  return (
    <div className="w-full min-h-screen bg-[#FDFBF7] dark:bg-[#030807] text-[#111111] dark:text-gray-100 py-16 px-4 md:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* FAQ PAGE */}
        {pageId === 'faq' && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center space-y-3">
              <HelpCircle className="mx-auto text-[#C89B3C]" size={48} />
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                {translate({ ar: 'الأسئلة الشائعة والدعم', fr: 'Questions Fréquentes', en: 'Frequently Asked Questions' })}
              </h1>
              <p className="text-gray-500 max-w-lg mx-auto text-sm">
                {translate({
                  ar: 'كل ما تود معرفته عن مصدر توابل البوخاري النادرة، كيفية الطحن، الشحن، وطرق الدفع والضمان.',
                  fr: 'Tout ce que vous devez savoir sur nos origines, la mouture, la livraison et les garanties de fraîcheur.',
                  en: 'Everything you need to know about our sourcing, grinding, delivery, and quality assurance.'
                })}
              </p>
            </div>

            <div className="space-y-4 mt-12">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#222222] rounded-xl overflow-hidden transition-all shadow-sm"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-5 text-left rtl:text-right flex items-center justify-between font-bold text-sm md:text-base hover:bg-[#F9F6F0] dark:hover:bg-[#181818] transition"
                    >
                      <span>{translate(faq.q)}</span>
                      {isOpen ? <ChevronUp className="text-[#C89B3C]" size={18} /> : <ChevronDown className="text-[#C89B3C]" size={18} />}
                    </button>
                    {isOpen && (
                      <div className="p-5 border-t border-gray-100 dark:border-[#222222] text-sm text-gray-600 dark:text-gray-400 leading-relaxed bg-[#FDFBF7] dark:bg-[#0B1B17]/20">
                        {translate(faq.a)}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* DELIVERY INFORMATION */}
        {pageId === 'delivery' && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center space-y-3">
              <Truck className="mx-auto text-[#C89B3C]" size={48} />
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                {translate({ ar: 'شحن التوابل لـ 58 ولاية جزائرية', fr: 'Livraison sur 58 Wilayas', en: 'Algerian Nationwide Shipping' })}
              </h1>
              <p className="text-gray-500 max-w-lg mx-auto text-sm">
                {translate({
                  ar: 'شحن سريع، آمن، ومحكم الإغلاق لضمان بقاء نكهة بهاراتكم طازجة. الدفع عند الاستلام كلياً.',
                  fr: 'Expédition rapide et hermétique pour préserver la fraîcheur de vos mélanges. Paiement à la réception.',
                  en: 'Fast, secure, and hermetic shipping to safeguard spice freshness. Paid 100% at delivery.'
                })}
              </p>
            </div>

            <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#222222] rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-[#C89B3C] border-b border-gray-100 dark:border-[#222222] pb-2">
                {translate({ ar: 'جدول أسعار التوصيل بالتفصيل', fr: 'Tarifs de Livraison par Région', en: 'Delivery Pricing Details' })}
              </h3>
              
              {/* Delivery rates table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-[#222222] text-gray-500 text-xs">
                      <th className="py-3 px-4 font-bold">{translate({ ar: 'الولاية / المنطقة', fr: 'Wilaya / Région', en: 'Wilaya / Zone' })}</th>
                      <th className="py-3 px-4 font-bold">{translate({ ar: 'مدة التوصيل', fr: 'Délai Estimé', en: 'Estimated Delay' })}</th>
                      <th className="py-3 px-4 font-bold">{translate({ ar: 'توصيل للمكتب', fr: 'Tarif Bureau Yalidine', en: 'Office Pickup' })}</th>
                      <th className="py-3 px-4 font-bold">{translate({ ar: 'توصيل للمنزل', fr: 'Tarif Domicile', en: 'Home Delivery' })}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-[#222222]">
                    {deliveryRates.map((rate, idx) => (
                      <tr key={idx} className="hover:bg-[#FDFBF7] dark:hover:bg-[#0B1B17]/10 transition">
                        <td className="py-3.5 px-4 font-bold">{translate(rate.wilaya)}</td>
                        <td className="py-3.5 px-4 font-mono text-xs">{rate.delay}</td>
                        <td className="py-3.5 px-4 font-mono text-xs text-[#C89B3C] font-semibold">{rate.rate}</td>
                        <td className="py-3.5 px-4 font-mono text-xs text-emerald-600 dark:text-emerald-400 font-bold">{rate.home}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Notice */}
              <div className="bg-[#F9F6F0] dark:bg-[#181818] p-4 rounded-xl border border-gray-200 dark:border-[#222222] flex gap-3 text-xs md:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                <CheckCircle className="text-[#C89B3C] shrink-0 mt-0.5" size={18} />
                <p>
                  {translate({
                    ar: 'نصيحة البوخاري: عند شراء توابل بقيمة 5000 د.ج أو أكثر، تصبح تكلفة الشحن مجانية تماماً لأي ولاية بالوطن ! سيقوم النظام بخصم التكلفة تلقائياً في سلتك.',
                    fr: 'Astuce El Boukhari : Dès 5000 DA d\'achats cumulés, la livraison devient 100% gratuite vers toutes les Wilayas ! La réduction s\'applique automatiquement dans votre panier.',
                    en: 'Pro Tip: For any order of 5000 DZD or more, shipping fees are instantly nullified for all 58 Wilayas. The cart deducts it automatically.'
                  })}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* RETURNS & REFUNDS */}
        {pageId === 'returns' && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center space-y-3">
              <ShieldAlert className="mx-auto text-[#C89B3C]" size={48} />
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                {translate({ ar: 'ضمان الجودة وسياسة الاسترجاع', fr: 'Garantie de Qualité & Retours', en: 'Quality Shield & Returns' })}
              </h1>
              <p className="text-gray-500 max-w-lg mx-auto text-sm">
                {translate({
                  ar: 'ثقتكم هي رأسمالنا الحقيقي. بهاراتنا تخضع لأشد اختبارات النقاوة والذوق ونضمن حقكم الكامل.',
                  fr: 'Votre satisfaction est notre seule priorité. Nos herbes et mélanges sont garantis satisfaits ou remboursés.',
                  en: 'Your satisfaction is our primary reward. Our handpicked spices are secured with full return privileges.'
                })}
              </p>
            </div>

            <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#222222] rounded-2xl p-6 md:p-8 shadow-sm space-y-6 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
              <h3 className="text-lg font-bold text-[#C89B3C] border-b border-gray-100 dark:border-[#222222] pb-2">
                {translate({ ar: 'البنود العامة لسياسة الضمان والاستبدال', fr: 'Conditions Générales de Retour', en: 'Standard Refund Terms' })}
              </h3>
              <p>
                {translate({
                  ar: 'بسبب الطبيعة الحساسة والغذائية للمنتجات الطازجة والتوابل، فإننا نقبل الاستبدال أو الاسترجاع في الحالات التالية:',
                  fr: 'En raison de la nature alimentaire et hautement hygiénique de nos épices fraîches, les retours sont accordés sous conditions :',
                  en: 'Due to the natural and highly sanitary food classification of fresh spices, refunds or exchanges are approved in the following cases:'
                })}
              </p>
              <ul className="list-disc pl-5 rtl:pl-0 rtl:pr-5 space-y-2">
                <li>
                  {translate({
                    ar: 'وجود تلف في عبوة التغليف أو البرطمان الزجاجي أثناء النقل والشحن.',
                    fr: 'Emballage d\'origine ou bocal en verre endommagé lors du transport par le livreur.',
                    en: 'Physical damage to the original packaging or glass jars during shipper transportation.'
                  })}
                </li>
                <li>
                  {translate({
                    ar: 'استلام منتج مغاير للذي طلبتموه في الفاتورة الرسمية.',
                    fr: 'Erreur de produit livré (produit différent de votre facture officielle).',
                    en: 'Mismatched order delivery (receiving a spice category different from your invoice).'
                  })}
                </li>
                <li>
                  {translate({
                    ar: 'عدم رضاكم التام عن الرائحة والنقاوة (يجب أن لا يكون قد استهلك أكثر من 5% من وزن العبوة).',
                    fr: 'Insatisfaction avérée quant à l\'arôme ou la pureté (l\'article ne doit pas être consommé à plus de 5%).',
                    en: 'Unsatisfied aroma check (the product must not be consumed beyond 5% of its shipped weight).'
                  })}
                </li>
              </ul>
              <p className="font-semibold text-gray-900 dark:text-white mt-4">
                {translate({
                  ar: 'كيف أقدم طلباً للاسترجاع؟',
                  fr: 'Comment initier une procédure ?',
                  en: 'How do I initiate a return?'
                })}
              </p>
              <p>
                {translate({
                  ar: 'ببساطة تامة، تواصل معنا عبر خدمة العملاء على الواتساب أو اتصل هاتفيا في غضون 7 أيام من الاستلام. سنقوم بإرسال مندوب التوصيل مجدداً لاستبدال السلعة أو إرجاع نقودكم كاملة دون أي تكلفة إضافية.',
                  fr: 'C\'est très simple ! Envoyez-nous une photo du produit défectueux par WhatsApp ou contactez notre service client par téléphone sous 7 jours. Nous dépêcherons un livreur pour effectuer l\'échange ou vous rembourser à domicile.',
                  en: 'It is incredibly simple! Contact our VIP customer support line via WhatsApp or phone within 7 days. We will coordinate a home pickup to replace the jar or return your cash immediately.'
                })}
              </p>
            </div>
          </div>
        )}

        {/* TERMS OF USE & PRIVACY POLICY */}
        {(pageId === 'terms' || pageId === 'privacy') && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center space-y-3">
              <FileText className="mx-auto text-[#C89B3C]" size={48} />
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                {pageId === 'terms'
                  ? translate({ ar: 'شروط الاستخدام والخدمة', fr: 'Conditions Générales de Vente', en: 'Terms of Use' })
                  : translate({ ar: 'سياسة الخصوصية وحماية البيانات', fr: 'Politique de Confidentialité', en: 'Privacy Policy' })}
              </h1>
              <p className="text-gray-500 max-w-lg mx-auto text-sm">
                {translate({
                  ar: 'الشفافية والأمان هما ركائز الميثاق العائلي لعلامة توابل البوخاري الجزائرية.',
                  fr: 'La transparence et l\'éthique commerciale au cœur de la charte de notre maison.',
                  en: 'Transparency, security, and corporate ethics form the core of our family spice registry.'
                })}
              </p>
            </div>

            <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#222222] rounded-2xl p-6 md:p-8 shadow-sm space-y-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              <p className="font-bold text-gray-900 dark:text-white">
                {translate({
                  ar: '1. الالتزام بالمعايير الصحية والغذائية للمنتجات',
                  fr: '1. Normes d\'Hygiène et de Qualité Supérieure',
                  en: '1. Premium Sanitary & Herbal Standards'
                })}
              </p>
              <p>
                {translate({
                  ar: 'تتعهد مؤسسة توابل البوخاري بتعبئة البهارات والأعشاب البرية في بيئة معقمة ومحمية، وفق أعلى المواصفات الجزائرية الصحية. نحن لا نستخدم أي ملونات اصطناعية، دقيق إضافي، أو مواد حافظة لزيادة الوزن في سائر خلطاتنا.',
                  fr: 'La maison El Boukhari s\'engage à conditionner toutes ses épices brutes et moulues dans des conditions d\'asepsie les plus rigoureuses. Nous garantissons l\'absence totale de colorants chimiques, de farine de charge ou d\'agents de conservation artificiels.',
                  en: 'El Boukhari guarantees that all whole and ground spices are custom-sealed under strict sanitary conditions. We do not incorporate heavy flours, color enhancers, or preservatives to unnaturally inflate weights.'
                })}
              </p>

              <p className="font-bold text-gray-900 dark:text-white mt-6">
                {translate({
                  ar: '2. دقة بيانات الأسعار والمخزون والشحن',
                  fr: '2. Exactitude des Tarifs, Stocks et Livraisons',
                  en: '2. Absolute Price, Stock & Dispatch Accuracy'
                })}
              </p>
              <p>
                {translate({
                  ar: 'نسعى دوماً لعرض صور واقعية للبرطمانات والأكياس والأسعار المعتمدة بالدينار الجزائري. في حال حدوث نفاد مفاجئ لأحد أنواع التوابل النادرة (مثل الزعفران الملكي)، يتم الاتصال بالزبون فوراً لاقتراح وزن بديل أو إلغاء الطلبية ودياً.',
                  fr: 'Nous mettons tout en œuvre pour que les photographies de nos coffrets et sachets soient le reflet exact de la réalité. En cas de rupture soudaine d\'une épice de prestige (safran, poivre rare), le client est averti pour convenir d\'une alternative.',
                  en: 'We strive to maintain exact visual depictions of our jars and boxes. If a rare spice is suddenly out of stock, we call the client directly to coordinate a size substitute or a friendly order cancellation.'
                })}
              </p>

              <p className="font-bold text-gray-900 dark:text-white mt-6">
                {translate({
                  ar: '3. سرية وأمان بيانات الزبائن',
                  fr: '3. Sécurisation et Confidentialité des Profils',
                  en: '3. Customer Session Privacy & Data Lockdown'
                })}
              </p>
              <p>
                {translate({
                  ar: 'نحن لا نشارك ولا نبيع معلومات الاتصال الخاصة بكم (الاسم، الهاتف، العنوان) لأي جهات تسويقية خارجية. نستخدم هذه البيانات فقط لغرض إعداد الفاتورة وتسليم الطلب إلى عون التوصيل.',
                  fr: 'La maison El Boukhari s\'interdit formellement de revendre ou de divulguer vos données personnelles (nom, téléphone, adresse) à des fins publicitaires tierces. Elles sont réservées uniquement à la facturation et à la livraison de vos colis.',
                  en: 'El Boukhari forbids sharing or selling your private contact listings (name, address, phone) to advertising firms. This metadata is strictly channeled for order dispatch and customer logistics.'
                })}
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

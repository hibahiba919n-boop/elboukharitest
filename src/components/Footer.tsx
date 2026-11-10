import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Logo } from './Logo';
import {
  MapPin,
  Phone,
  Mail,
  Send,
  Facebook,
  Instagram,
  Compass,
  Heart,
  Clock,
  ShieldCheck,
  Truck
} from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { translate, addNotification } = useApp();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      addNotification(
        translate({
          ar: 'تم الاشتراك في النشرة البريدية الحصرية بنجاح! شكراً لك.',
          fr: 'Inscription à notre newsletter exclusive réussie ! Merci.',
          en: 'Successfully subscribed to our elite spice newsletter! Thank you.'
        }),
        'success'
      );
      setEmail('');
    }
  };

  return (
    <footer className="bg-black text-white pt-16 pb-8 border-t border-[#C89B3C]/20 font-sans z-10 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Core Branding block with Social Links */}
        <div className="pb-16 border-b border-[#222222] flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="space-y-6 max-w-2xl">
            <Logo size={70} variant="white" showText={true} />
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              {translate({
                ar: 'نحن في توابل البوخاري نقوم بانتقاء، تنقية، وتحميص أفخر أنواع البهارات والخلطات التقليدية الجزائرية لتصل إلى مطبخكم برائحتها الأصلية العطرة التي لا تُنسى.',
                fr: 'Chez El Boukhari, nous sélectionnons, nettoyons et torréfions les épices les plus nobles d\'Algérie et du monde pour vous offrir un voyage gustatif inoubliable et authentique.',
                en: 'At El Boukhari, we source, sort, and roast the finest traditional Algerian and international spices, bringing the genuine, rich taste of old times right into your kitchen.'
              })}
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/profile.php?id=100063369480946"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-[#333333] hover:border-[#C89B3C] hover:text-[#C89B3C] transition flex items-center justify-center text-gray-400"
                title="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://www.instagram.com/epices_elboukhari/"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-[#333333] hover:border-[#C89B3C] hover:text-[#C89B3C] transition flex items-center justify-center text-gray-400"
                title="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://wa.me/213781591087"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-[#333333] hover:border-emerald-500 hover:text-emerald-400 transition flex items-center justify-center text-gray-400"
                title="WhatsApp"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Sitemap Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 text-sm border-b border-[#222222]">
          {/* Col 1: Discovery */}
          <div className="space-y-4">
            <h5 className="font-extrabold text-[#C89B3C] tracking-wider uppercase text-xs">
              {translate({ ar: 'اكتشف البوخاري', fr: 'Découvrir', en: 'Discovery' })}
            </h5>
            <ul className="space-y-2.5 text-gray-400">
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-[#C89B3C] transition">
                  {translate({ ar: 'متجر التوابل الكامل', fr: 'Boutique Complète', en: 'Boutique Store' })}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('recipes')} className="hover:text-[#C89B3C] transition">
                  {translate({ ar: 'وصفات جزائرية شهية', fr: 'Recettes Culinaires', en: 'Culinary Recipes' })}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-[#C89B3C] transition">
                  {translate({ ar: 'اتصل بنا والفرع الفعلي', fr: 'Contact & Boutique Gdyel', en: 'Contact & Gdyel Shop' })}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: Services */}
          <div className="space-y-4">
            <h5 className="font-extrabold text-[#C89B3C] tracking-wider uppercase text-xs">
              {translate({ ar: 'خدمات الدعم', fr: 'Services & Aide', en: 'Assistance' })}
            </h5>
            <ul className="space-y-2.5 text-gray-400">
              <li>
                <button onClick={() => onNavigate('faq')} className="hover:text-[#C89B3C] transition">
                  {translate({ ar: 'الأسئلة الشائعة', fr: 'Questions Fréquentes (FAQ)', en: 'FAQ Support' })}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('delivery')} className="hover:text-[#C89B3C] transition">
                  {translate({ ar: 'معلومات الشحن لـ 58 ولاية', fr: 'Livraison sur 58 Wilayas', en: 'Algeria Shipping Guide' })}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('returns')} className="hover:text-[#C89B3C] transition">
                  {translate({ ar: 'سياسة الاسترجاع والتبديل', fr: 'Politique de Retour', en: 'Return & Refund Policy' })}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-[#C89B3C] transition">
                  {translate({ ar: 'مواقع المتاجر والاتصال', fr: 'Nos Boutiques Physiques', en: 'Our Retail Shops' })}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal & Admin */}
          <div className="space-y-4">
            <h5 className="font-extrabold text-[#C89B3C] tracking-wider uppercase text-xs">
              {translate({ ar: 'السياسات القانونية', fr: 'Mentions Légales', en: 'Legal Info' })}
            </h5>
            <ul className="space-y-2.5 text-gray-400">
              <li>
                <button onClick={() => onNavigate('terms')} className="hover:text-[#C89B3C] transition">
                  {translate({ ar: 'شروط الخدمة والاستخدام', fr: 'Conditions d\'Utilisation', en: 'Terms of Service' })}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('privacy')} className="hover:text-[#C89B3C] transition">
                  {translate({ ar: 'سياسة الخصوصية وحماية البيانات', fr: 'Charte de Confidentialité', en: 'Privacy Policy' })}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('admin')} className="text-gray-500 hover:text-[#C89B3C] transition font-bold font-mono">
                  {translate({ ar: 'لوحة تحكم المدير', fr: 'Panneau Admin 🔒', en: 'Admin Portal 🔒' })}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact details */}
          <div className="space-y-4">
            <h5 className="font-extrabold text-[#C89B3C] tracking-wider uppercase text-xs">
              {translate({ ar: 'تفاصيل الاتصال', fr: 'Contactez-nous', en: 'Get In Touch' })}
            </h5>
            <ul className="space-y-3 text-xs md:text-sm text-gray-400 font-sans">
              <li className="flex gap-2 items-start">
                <MapPin size={16} className="text-[#C89B3C] shrink-0 mt-0.5" />
                <span>
                  {translate({
                    ar: 'قديل، وهران، الجزائر',
                    fr: 'Gdyel, Oran, Algérie',
                    en: 'Gdyel, Oran, Algeria'
                  })}
                </span>
              </li>
              <li className="flex gap-2 items-center">
                <Phone size={16} className="text-[#C89B3C] shrink-0" />
                <span className="font-mono">0781 59 10 87</span>
              </li>
              <li className="flex gap-2 items-center">
                <Mail size={16} className="text-[#C89B3C] shrink-0" />
                <span className="font-mono">contact@elboukhari.com</span>
              </li>
              <li className="flex gap-2 items-start">
                <Clock size={16} className="text-[#C89B3C] shrink-0 mt-0.5" />
                <span>
                  {translate({
                    ar: 'السبت - الخميس: 9:00 صباحاً - 8:00 مساءً',
                    fr: 'Sam - Jeu : 09h00 - 20h00',
                    en: 'Sat - Thu: 9:00 AM - 8:00 PM'
                  })}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer bottom metadata and payment icons */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4">
          <div className="flex flex-wrap gap-4 items-center justify-center md:justify-start">
            <p className="text-center md:text-left">
              &copy; {new Date().getFullYear()} {translate({ ar: 'توابل البوخاري. جميع الحقوق محفوظة.', fr: 'Épices El Boukhari. Tous droits réservés.', en: 'El Boukhari Spices. All rights reserved.' })}
            </p>
            <span className="hidden md:inline">|</span>
            <div className="flex items-center gap-1">
              <span>Made with</span>
              <Heart size={10} className="text-red-500 fill-red-500" />
              <span>in Algeria for spice lovers</span>
            </div>
          </div>

          {/* Secure markers */}
          <div className="flex items-center gap-4 text-gray-400">
            <div className="flex items-center gap-1.5 border border-[#222222] px-2.5 py-1 rounded-md">
              <Truck size={14} className="text-[#C89B3C]" />
              <span>{translate({ ar: 'دفع عند الاستلام', fr: 'Paiement à la Livraison', en: 'Cash On Delivery' })}</span>
            </div>
            <div className="flex items-center gap-1.5 border border-[#222222] px-2.5 py-1 rounded-md">
              <ShieldCheck size={14} className="text-[#C89B3C]" />
              <span>{translate({ ar: 'منتجات طبيعية 100%', fr: '100% Naturel', en: '100% Organic' })}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

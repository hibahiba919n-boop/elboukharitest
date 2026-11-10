import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, Phone, Mail, Clock, Send, Sparkles, MessageSquare, ArrowRight } from 'lucide-react';

export const Contact: React.FC = () => {
  const { translate } = useApp();

  // Contact form state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && phone && message) {
      setIsSubmitted(true);
      setName('');
      setPhone('');
      setEmail('');
      setSubject('');
      setMessage('');
    }
  };

  const contactInfos = [
    {
      title: { ar: 'مقر المتجر والمحل الفعلي', fr: 'Boutique & Point de Vente', en: 'Physical Store & Showroom' },
      address: {
        ar: 'قديل، وهران، الجزائر',
        fr: 'Gdyel, Oran, Algérie',
        en: 'Gdyel, Oran, Algeria'
      },
      phone: '0781 59 10 87',
      email: 'contact@epices-elboukhari.com'
    }
  ];

  return (
    <div className="w-full min-h-screen bg-[#FDFBF7] dark:bg-[#030807] text-[#111111] dark:text-gray-100 py-16 px-4 md:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Page title */}
        <div className="text-center space-y-2 max-w-xl mx-auto pb-6 border-b border-gray-100 dark:border-[#222222]">
          <h1 className="text-3xl md:text-5xl font-sans font-extrabold tracking-tight">
            {translate({ ar: 'تواصل مع دار البوخاري للتوابل', fr: 'Contacter la Maison El Boukhari', en: 'Connect with El Boukhari Spices' })}
          </h1>
          <p className="text-gray-500 text-xs md:text-sm">
            {translate({
              ar: 'يسعدنا الرد على استفساراتكم حول مبيعات الجملة للفنادق، تجهيز علب الهدايا، ومتابعة الشحنات لجميع الولايات.',
              fr: 'Nos conseillers de vente sont à votre écoute pour les commandes de coffrets corporatifs ou tarifs grossistes.',
              en: 'Our dedicated customer agents are available to answer queries about custom gift boxes or wholesale inquiries.'
            })}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT COLUMN: CONTACT DETAILS & SHOWROOMS (cols 5) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Showrooms Cards list */}
            <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#222222] p-6 md:p-8 rounded-3xl shadow-sm space-y-6">
              <h3 className="text-base font-bold text-[#C89B3C] border-b border-gray-100 dark:border-[#222222] pb-3 uppercase flex items-center gap-1.5">
                <Sparkles size={16} />
                <span>{translate({ ar: 'المقر الإداري والمصنع', fr: 'Siège Administratif', en: 'Headquarters Office' })}</span>
              </h3>

              {contactInfos.map((c, idx) => (
                <div key={idx} className="space-y-4 text-xs">
                  <h4 className="font-extrabold text-sm text-white">{translate(c.title)}</h4>
                  <div className="space-y-2 text-gray-500 font-sans">
                    <div className="flex gap-2.5 items-start">
                      <MapPin className="text-[#C89B3C] shrink-0 mt-0.5" size={14} />
                      <p>{translate(c.address)}</p>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <Phone className="text-[#C89B3C] shrink-0" size={14} />
                      <p className="font-mono">{c.phone}</p>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <Mail className="text-[#C89B3C] shrink-0" size={14} />
                      <p className="font-mono">{c.email}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Direct Connect WhatsApp Card */}
            <div className="bg-[#1B4332]/10 border border-emerald-500/20 p-6 rounded-3xl space-y-3.5 text-center">
              <MessageSquare className="mx-auto text-emerald-500" size={32} />
              <h4 className="font-bold text-white text-sm">
                {translate({ ar: 'دعم العملاء السريع عبر واتساب', fr: 'Service WhatsApp Direct', en: 'Instant WhatsApp Chat Line' })}
              </h4>
              <p className="text-[11px] text-gray-500 max-w-xs mx-auto">
                {translate({
                  ar: 'تحدث مباشرة مع خبير توابل البوخاري للحصول على توصية فورية لنوع رأس الحانوت أو الشوربة المناسب لوصفتك.',
                  fr: 'Discutez instantanément avec notre maître épicier pour choisir le meilleur assortiment pour votre tajine.',
                  en: 'Talk immediately with our spice master to pick the correct spice level for your traditional recipes.'
                })}
              </p>
              <a
                href="https://wa.me/213781591087"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs py-3 px-6 rounded-full transition shadow"
              >
                <span>{translate({ ar: 'افتح المحادثة الآن', fr: 'Lancer le Chat', en: 'Start Live Chat' })}</span>
                <ArrowRight size={12} />
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN: ACTIVE CONTACT FORM (cols 7) */}
          <div className="lg:col-span-7">
            {isSubmitted ? (
              <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#222222] p-8 rounded-3xl text-center space-y-4 animate-fade-in">
                <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto shadow-sm">
                  <Send size={24} className="animate-pulse" />
                </div>
                <h3 className="font-extrabold text-lg text-white">
                  {translate({ ar: 'تم إرسال رسالتكم بنجاح!', fr: 'Message Envoyé avec Succès !', en: 'Your message has been received!' })}
                </h3>
                <p className="text-xs text-gray-500 max-w-sm mx-auto">
                  {translate({
                    ar: 'شكراً لكم على التواصل. سيقوم مستشار خدمة عملاء البوخاري بالرد على بريدكم الإلكتروني أو الاتصال بكم خلال 24 ساعة.',
                    fr: 'Merci pour votre intérêt. Notre équipe commerciale vous répondra par courriel sous un délai maximal de 24 heures.',
                    en: 'Thank you for connecting. Our representative will contact your email coordinates within the next 24 hours.'
                  })}
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="bg-[#C89B3C] text-black font-extrabold text-xs px-6 py-2.5 rounded-full hover:bg-white transition"
                >
                  {translate({ ar: 'إرسال رسالة أخرى', fr: 'Envoyer un autre message', en: 'Send another message' })}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#222222] p-6 md:p-8 rounded-3xl shadow-sm space-y-4 text-xs">
                <h3 className="text-base font-bold text-white border-b border-gray-100 dark:border-[#222222] pb-3 uppercase flex items-center gap-1.5">
                  <Send size={16} />
                  <span>{translate({ ar: 'أرسل لنا استفسارك مباشرة', fr: 'Formulaire de Contact', en: 'Inquiry Form' })}</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-gray-500">
                      {translate({ ar: 'الاسم الكامل *', fr: 'Nom Complet *', en: 'Full Name *' })}
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ex: Benali Mohamed"
                      className="w-full bg-[#FDFBF7] dark:bg-black border border-gray-200 dark:border-[#222222] focus:border-[#C89B3C] focus:outline-none p-3.5 rounded-xl text-gray-900 dark:text-white"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-gray-500">
                      {translate({ ar: 'رقم الهاتف *', fr: 'Numéro de Téléphone *', en: 'Phone Number *' })}
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Ex: 0555 12 34 56"
                      className="w-full bg-[#FDFBF7] dark:bg-black border border-gray-200 dark:border-[#222222] focus:border-[#C89B3C] focus:outline-none p-3.5 rounded-xl text-gray-900 dark:text-white font-mono"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-gray-400">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Ex: mohamed@gmail.com"
                      className="w-full bg-[#FDFBF7] dark:bg-black border border-gray-200 dark:border-[#222222] focus:border-[#C89B3C] focus:outline-none p-3.5 rounded-xl text-gray-900 dark:text-white"
                    />
                  </div>

                  {/* Subject */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-gray-400">
                      Inquiry Subject (Optional)
                    </label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Ex: Wholesale price"
                      className="w-full bg-[#FDFBF7] dark:bg-black border border-gray-200 dark:border-[#222222] focus:border-[#C89B3C] focus:outline-none p-3.5 rounded-xl text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                {/* Message text area */}
                <div className="space-y-1.5">
                  <label className="font-bold text-gray-500">
                    {translate({ ar: 'نص الرسالة أو الاستفسار بالتفصيل *', fr: 'Votre Message détaillé *', en: 'Inquiry details *' })}
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write details of your question..."
                    className="w-full bg-[#FDFBF7] dark:bg-black border border-gray-200 dark:border-[#222222] focus:border-[#C89B3C] focus:outline-none p-3.5 rounded-xl text-gray-900 dark:text-white resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#C89B3C] hover:bg-white text-black font-black py-4 rounded-xl transition shadow-md mt-2 flex items-center justify-center gap-2"
                >
                  <Send size={14} />
                  <span>{translate({ ar: 'إرسال الرسالة لخدمة العملاء', fr: 'Transmettre mon message', en: 'Submit Inquiry' })}</span>
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

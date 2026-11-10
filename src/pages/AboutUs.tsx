import React from 'react';
import { useApp } from '../context/AppContext';
import { Award, Sparkles, BookOpen, ShieldCheck, Star } from 'lucide-react';

export const AboutUs: React.FC = () => {
  const { translate } = useApp();

  return (
    <div className="w-full min-h-screen bg-[#FDFBF7] dark:bg-[#030807] text-[#111111] dark:text-gray-100 py-16 px-4 md:px-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-16">
        
        {/* Title */}
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-sans font-extrabold tracking-tight">
            {translate({ ar: 'عن دار البوخاري للتوابل الفاخرة', fr: 'L\'Histoire de la Maison El Boukhari', en: 'Our Story & Brand Heritage' })}
          </h1>
          <p className="text-gray-500 text-xs md:text-sm">
            {translate({
              ar: 'تراث عائلي وقيم أصيلة مبنية على النقاوة المطلقة وإعادة تعريف مفهوم البهارات الراقية في الجزائر.',
              fr: 'Un héritage familial et des valeurs nobles basées sur la pureté absolue des épices algériennes.',
              en: 'A family legacy built on pure quality, redefining the art of fine spices across Algeria.'
            })}
          </p>
        </div>

        {/* Narrative Split Collage */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-1 text-[#C89B3C] font-extrabold text-xs tracking-wider uppercase">
              <BookOpen size={14} />
              <span>{translate({ ar: 'تاريخنا منذ 1982', fr: 'Depuis 1982', en: 'Our History Since 1982' })}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-sans font-extrabold tracking-tight">
              {translate({ ar: 'من جبال الأطلس إلى موائدكم العامرة', fr: 'De l\'Atlas à votre Table d\'Exception', en: 'From Atlas Heights to Gourmet Plates' })}
            </h2>
            <div className="text-xs md:text-sm text-gray-500 space-y-4 leading-relaxed">
              <p>
                {translate({
                  ar: 'بدأت رحلتنا في مدينة البليدة العريقة، حيث كان الوالد الحاج البوخاري يقوم بخلط البهارات يدوياً في متجر صغير بوسط المدينة. بفضل شغفه بالنقاوة والأمانة، ذاع صيت خلطاته الخاصة بالشوربة والكسكسي في كل ولايات الوسط.',
                  fr: 'Tout a commencé à Blida, où le patriarche Hadj El Boukhari assemblait méticuleusement ses mélanges d\'épices à la main dans son échoppe historique. Son exigence de propreté et d\'honnêteté a rapidement fait la réputation de son Ras El Hanout dans toute la Mitidja.',
                  en: 'Our journey began in Blida, where patriarch Hadj El Boukhari blended spices by hand in a small local market stall. His obsession with botanical purity quickly spread the reputation of his custom Ras El Hanout throughout the Mitidja plains.'
                })}
              </p>
              <p>
                {translate({
                  ar: 'اليوم، نقوم بدمج هذا التراث العريق مع أحدث تقنيات الطحن البارد الفائق للمحافظة على الزيوت العطرية الطيارة في بذور الكزبرة، الكروية، والكمون الصحراوي، لنقدم لبيوتكم بهارات حية مفعمة بالروائح الخلابة.',
                  fr: 'Aujourd\'hui, nous allions ce savoir-faire ancestral à des technologies modernes de cryomoulage (moulage à froid) pour préserver intactes les huiles essentielles volatiles de nos graines sauvages, vous offrant des épices vivantes aux saveurs spectaculaires.',
                  en: 'Today, we couple this ancestral expertise with advanced cold-milling technology to keep the volatile essential oils in coriander, caraway, and desert cumin completely intact, delivering highly aromatic, fresh spices to your home.'
                })}
              </p>
            </div>
          </div>

          <div className="aspect-[4/3] rounded-3xl overflow-hidden border border-gray-100 dark:border-[#222222] shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=600"
              alt="Artisanal spice grinding"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Brand Manifesto Core pillars (Bento Grid layout) */}
        <div className="space-y-6 pt-8 border-t border-gray-100 dark:border-[#222222]">
          <h3 className="text-center font-extrabold text-white text-base uppercase tracking-widest">
            {translate({ ar: 'ميثاق الجودة والنقاوة للبخاري', fr: 'Le Manifeste de la Maison', en: 'The Brand Quality Manifesto' })}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Zero fillers */}
            <div className="bg-white dark:bg-[#111111] p-6 md:p-8 rounded-2xl border border-gray-100 dark:border-[#222222] text-center space-y-3 shadow-sm">
              <ShieldCheck className="mx-auto text-[#C89B3C]" size={32} />
              <h4 className="font-extrabold text-sm text-white">
                {translate({ ar: 'خالٍ من المضافات 100%', fr: '0% d\'Additifs', en: '100% Zero Fillers' })}
              </h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                {translate({
                  ar: 'نحن نرفض استخدام أي مواد ملونة كيميائية، نشا البطاطس، أو دقيق القمح الرخيص لزيادة الوزن. بهاراتنا نقية بنسبة 100%.',
                  fr: 'Aucun colorant, aucune farine de blé pour tricher sur le poids. Nos épices sont garanties d\'une pureté absolue.',
                  en: 'No industrial starches, chemical colors, or cheap flour to artificially alter package weight. We offer pure spices only.'
                })}
              </p>
            </div>

            {/* Hand sorted */}
            <div className="bg-white dark:bg-[#111111] p-6 md:p-8 rounded-2xl border border-gray-100 dark:border-[#222222] text-center space-y-3 shadow-sm">
              <Sparkles className="mx-auto text-[#C89B3C]" size={32} />
              <h4 className="font-extrabold text-sm text-white">
                {translate({ ar: 'تنقية وغسيل يدوي كامل', fr: 'Trié Méticuleusement à la Main', en: '100% Hand Sorted' })}
              </h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                {translate({
                  ar: 'تخضع كل بذور الكمون، الكزبرة، والسانوج للغسيل والفرز اليدوي الدقيق لإزالة كافة الأتربة والشوائب المعلقة.',
                  fr: 'Chaque graine de cumin, coriandre ou anis est lavée et triée manuellement pour enlever la poussière et les impuretés.',
                  en: 'Every seed is hand-inspected, washed, and meticulously sorted to guarantee absolute purity from dirt and dust.'
                })}
              </p>
            </div>

            {/* Fair trade support */}
            <div className="bg-white dark:bg-[#111111] p-6 md:p-8 rounded-2xl border border-gray-100 dark:border-[#222222] text-center space-y-3 shadow-sm">
              <Award className="mx-auto text-[#C89B3C]" size={32} />
              <h4 className="font-extrabold text-sm text-white">
                {translate({ ar: 'دعم المزارع المحلية', fr: 'Soutien aux Agriculteurs Locaux', en: 'Supporting Local Farmers' })}
              </h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                {translate({
                  ar: 'نحن نتعاقد مباشرة مع مزارعي كمون أدرار بالجنوب، وزعتر الأطلس بالبليدة لضمان أسعار عادلة واستمرارية الفلاحة التقليدية.',
                  fr: 'Nous travaillons directement avec les producteurs d\'Adrar et de Blida pour soutenir le terroir algérien.',
                  en: 'We source directly from southern Adrar cumin growers and Atlas thyme farmers to promote fair trading.'
                })}
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

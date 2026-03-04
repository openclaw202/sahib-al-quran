import React, { useState } from 'react';
import { SurahDetail } from '../types';

import {
  ClipboardList,
  Star,
  BookOpen,
  Shield,
  Target,
  History,
  Scale,
  FileText,
  Globe,
  Heart,
  Sparkles
} from 'lucide-react';

interface SurahTabsProps {
  surah: Partial<SurahDetail>;
}

const sections = [
  { id: 'details', label: 'تفاصيل ومنهجية', icon: <ClipboardList size={16} /> },
  { id: 'virtues', label: 'فضل السورة', icon: <Star size={16} /> },
  { id: 'vocabulary', label: 'غريب الكلمات', icon: <BookOpen size={16} /> },
  { id: 'faith', label: 'الإيمان والتقوى', icon: <Shield size={16} /> },
  { id: 'commands_actions', label: 'الأوامر والأفعال', icon: <Target size={16} /> },
  { id: 'asbab', label: 'أسباب النزول', icon: <History size={16} /> },
  { id: 'aqadiyya', label: 'المواضيع العقدية', icon: <Scale size={16} /> },
  { id: 'fiqhiyya', label: 'الأحكام الفقهية', icon: <FileText size={16} /> },
  { id: 'qisasiyya', label: 'القصص القرآنية', icon: <Globe size={16} /> },
  { id: 'dua', label: 'الأدعية القرآنية', icon: <Heart size={16} /> },
  { id: 'akhlaqiyya', label: 'الأخلاق والسلوك', icon: <Sparkles size={16} /> },
];

export const SurahTabs: React.FC<SurahTabsProps> = ({ surah }) => {
  const [activeTab, setActiveTab] = useState('details');

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-700">
      {/* Refined Tabs Structure */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar border-b border-gray-100">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveTab(section.id)}
            className={`flex items-center gap-2 px-4 py-2 whitespace-nowrap text-[11px] font-bold transition-all ${activeTab === section.id
              ? 'text-[#1D1B4B] bg-white border border-gray-100 rounded-lg'
              : 'text-gray-400 hover:text-gray-600'
              }`}
          >
            <span className="text-sm">{section.icon}</span>
            <span>{section.label}</span>
          </button>
        ))}
      </div>

      {/* Simplified Content Area */}
      <div className="min-h-[300px]">
        <div className="relative">
          {activeTab === 'details' && (
            <div className="space-y-4 animate-in fade-in duration-500">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-none">
                  <p className="text-gray-400 text-[8px] font-bold uppercase tracking-wider mb-1">المنشأ والنوع</p>
                  <p className="font-bold text-[#1D1B4B] text-base">{surah.revelationType === 'MAKKI' ? 'مكية' : 'مدنية'}</p>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-none">
                  <p className="text-gray-400 text-[8px] font-bold uppercase tracking-wider mb-1">الترتيب (النزول / المصحف)</p>
                  <p className="font-bold text-[#1D1B4B] text-base">{surah.id === 1 ? '٥' : '--'} / {surah.id}</p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-gray-100">
                <h4 className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-2">اسم السورة وارتباطه بموضوعها</h4>
                <p className="leading-[1.8] text-[#1D1B4B] text-sm font-medium text-right">
                  {surah.id === 1 ? 'تسمى سورة الفاتحة لأن القرآن افتتح بها، وترتبط أسماؤها المتعددة (السبع المثاني، أم الكتاب، الشافية) بموضعها المركزي كملخص شامل لمقاصد الدين.' : `تسمى سورة ${surah.name} بـ...`}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'virtues' && (
            <div className="animate-in fade-in duration-500">
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-none">
                <p className="leading-[1.8] text-[#1D1B4B] text-sm text-right font-medium">
                  {surah.id === 1
                    ? 'عن أبي سعيد بن المعلى رضي الله عنه قال: قال لي رسول الله ﷺ: «لأعلمنك سورة هي أعظم السور في القرآن قبل أن تخرج من المسجد... قال: (الحمد لله رب العالمين) هي السبع المثاني، والقرآن العظيم الذي أوتيته» (رواه البخاري). وهي ركن في كل ركعة ولا تصح الصلاة إلا بها.'
                    : 'هذا المحتوى يتم تحضيره وتوثيقه حالياً من أمهات الكتب.'}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'vocabulary' && (
            <div className="animate-in fade-in duration-500">
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-none space-y-4">
                {surah.id === 1 ? (
                  <>
                    <div className="flex flex-col border-b border-gray-50 pb-3 last:border-0"><span className="text-sm font-bold text-blue-600 mb-1">الْحَمْدُ للهِ</span><p className="text-[13px] text-gray-500 font-medium">الثناء على الله بصفات الكمال، مع المحبة والتعظيم.</p></div>
                    <div className="flex flex-col border-b border-gray-50 pb-3 last:border-0"><span className="text-sm font-bold text-blue-600 mb-1">رَبِّ الْعَالَمِينَ</span><p className="text-[13px] text-gray-500 font-medium">الرب هو المالك المتصرف، والعالمين جمع عالم، وهو كل ما سوى الله.</p></div>
                    <div className="flex flex-col border-b border-gray-50 pb-3 last:border-0"><span className="text-sm font-bold text-blue-600 mb-1">يَوْمِ الدِّينِ</span><p className="text-[13px] text-gray-500 font-medium">يوم الجزاء والحساب، وهو يوم القيامة.</p></div>
                    <div className="flex flex-col border-b border-gray-50 pb-3 last:border-0"><span className="text-sm font-bold text-blue-600 mb-1">الْمَغْضُوبِ عَلَيْهِمْ</span><p className="text-[13px] text-gray-500 font-medium">من عرفوا الحق وتركوه (كاليهود).</p></div>
                    <div className="flex flex-col pb-1 last:border-0"><span className="text-sm font-bold text-blue-600 mb-1">الضَّالِّينَ</span><p className="text-[13px] text-gray-500 font-medium">من عبدوا الله على جهل وضلال (كالنصارى).</p></div>
                  </>
                ) : (
                  <p className="leading-[1.8] text-[#1D1B4B] text-sm text-right font-medium">هذا المحتوى يتم تحضيره وتوثيقه حالياً من المعاجم المعتمدة.</p>
                )}
              </div>
            </div>
          )}

          {activeTab === 'faith' && (
            <div className="animate-in fade-in duration-500">
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-none">
                <p className="leading-[1.8] text-[#1D1B4B] text-sm text-right font-medium">
                  {surah.id === 1
                    ? 'تركز السورة على توحيد الله بأقسامه الثلاثة: تصرح بتوحيد الربوبية في (رب العالمين)، وتوحيد الألوهية في (إياك نعبد)، وتوحيد الأسماء والصفات في إثبات صفات الكمال كـ (الرحمن الرحيم). وإثبات يوم القيامة والجزاء في (مالك يوم الدين).'
                    : 'هذا المحتوى يتم تحضيره وتوثيقه حالياً من أمهات الكتب.'}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'commands_actions' && (
            <div className="animate-in fade-in duration-500">
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-none space-y-4">
                {surah.id === 1 ? (
                  <>
                    <div className="flex flex-col border-b border-gray-50 pb-3 last:border-0"><span className="text-[10px] font-black text-orange-400 uppercase tracking-widest mb-1">فعل مباشر</span><p className="text-sm text-[#1D1B4B] font-bold leading-relaxed">إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ: توجيه مباشر للمؤمن بفعل العبادة لله وحده وطلب العون منه فقط في كل شؤونه.</p></div>
                    <div className="flex flex-col pb-1 last:border-0"><span className="text-[10px] font-black text-green-400 uppercase tracking-widest mb-1">أمر مباشر / دعاء</span><p className="text-sm text-[#1D1B4B] font-bold leading-relaxed">اهدِنَا الصِّرَاطَ المُسْتَقِيمَ: أمر بطلب الهداية والثبات على الحق الموصل إلى الله، وهو أكبر وأعظم مطلوب.</p></div>
                  </>
                ) : (
                  <p className="leading-[1.8] text-[#1D1B4B] text-sm text-right font-medium">هذا المحتوى يتم تحضيره وتوثيقه حالياً.</p>
                )}
              </div>
            </div>
          )}

          {activeTab === 'asbab' && (
            <div className="animate-in fade-in duration-500">
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-none">
                <p className="leading-[1.8] text-[#1D1B4B] text-sm text-right font-medium">
                  {surah.id === 1 ? 'نزلت بمكة في أوائل ما نزل من القرآن، ولم يرد في نزولها سبب محدد معين كحادثة خاصة، بل نزلت مبينة لأصول الدين لتكون فاتحة للكتاب وملازمة للمسلم في صلواته وركعاته.' : (surah.asbabAlNuzul || 'هذا المحتوى يتم تحضيره وتوثيقه حالياً.')}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'aqadiyya' && (
            <div className="animate-in fade-in duration-500">
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-none">
                <p className="leading-[1.8] text-[#1D1B4B] text-sm text-right font-medium">
                  {surah.id === 1 ? 'تضمنت السورة إثبات الإيمان بالله وتوحيده بأقسامه الثلاثة، وإثبات المعاد والجزاء (يوم الدين)، وإثبات النبوات والرسالات بطلب الهداية (الصراط المستقيم)، والرد على طوائف أهل البدع والضلال في قوله (غير المغضوب عليهم ولا الضالين).' : 'هذا المحتوى يتم تحضيره وتوثيقه حالياً.'}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'fiqhiyya' && (
            <div className="animate-in fade-in duration-500">
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-none space-y-4">
                {surah.id === 1 ? (
                  <>
                    <div className="flex flex-col border-b border-gray-50 pb-3 last:border-0"><span className="text-sm font-bold text-blue-600 mb-1">حكم قراءتها في الصلاة</span><p className="text-[13px] text-gray-500 font-medium">ركن من أركان الصلاة لا تصح إلا بها، لقوله ﷺ: «لا صلاة لمن لم يقرأ بفاتحة الكتاب».</p></div>
                    <div className="flex flex-col border-b border-gray-50 pb-3 last:border-0"><span className="text-sm font-bold text-blue-600 mb-1">التأمين بعدها</span><p className="text-[13px] text-gray-500 font-medium">يُسن التأمين (قول: آمين) بعدها للإمام والمأموم والمنفرد، ومعناها: اللهم استجب.</p></div>
                    <div className="flex flex-col pb-1 last:border-0"><span className="text-sm font-bold text-blue-600 mb-1">البسملة</span><p className="text-[13px] text-gray-500 font-medium">مشروعة في أولها، والصحيح أنها آية مستقلة للفصل بين السور، وليست آية من الفاتحة على الراجح المعتمد.</p></div>
                  </>
                ) : (
                  <p className="leading-[1.8] text-[#1D1B4B] text-sm text-right font-medium">هذا المحتوى يتم تحضيره وتوثيقه حالياً.</p>
                )}
              </div>
            </div>
          )}

          {activeTab === 'qisasiyya' && (
            <div className="animate-in fade-in duration-500">
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-none">
                <p className="leading-[1.8] text-[#1D1B4B] text-sm text-right font-medium">
                  {surah.id === 1 ? 'لم تذكر الفاتحة قصصاً مفصلة، ولكنها أشارت إجمالاً إلى تاريخ البشرية وتصنيفهم إلى ثلاثة أصناف: المنعم عليهم (الأنبياء والصديقون والشهداء والصالحون)، والمغضوب عليهم (اليهود ومن شابههم)، والضالون (النصارى وعباد الأصنام ومن تاه عن الحق).' : 'هذا المحتوى يتم تحضيره وتوثيقه حالياً.'}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'dua' && (
            <div className="animate-in fade-in duration-500">
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-none space-y-3">
                {surah.id === 1 ? (
                  <>
                    <p className="leading-[1.8] text-[#1D1B4B] text-sm text-right font-medium mb-2">تضمنت السورة أعظم دعاء وأجمعه وأنفعه للمسلم:</p>
                    <div className="bg-gray-50 p-4 rounded-xl text-center"><p className="text-lg font-bold text-[#1D1B4B]">﴿ اهدِنَا الصِّرَاطَ المُسْتَقِيمَ ﴾</p></div>
                    <p className="text-[13px] text-gray-500 font-medium text-right mt-2">وهو طلب الهداية إلى طريق الإسلام، والثبات عليه، والتوفيق للأعمال الصالحة التي ترضي الله.</p>
                  </>
                ) : (
                  <p className="leading-[1.8] text-[#1D1B4B] text-sm text-right font-medium">هذا المحتوى يتم تحضيره وتوثيقه حالياً.</p>
                )}
              </div>
            </div>
          )}

          {activeTab === 'akhlaqiyya' && (
            <div className="animate-in fade-in duration-500">
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-none space-y-4">
                {surah.id === 1 ? (
                  <>
                    <div className="flex flex-col border-b border-gray-50 pb-3 last:border-0"><span className="text-sm font-bold text-blue-600 mb-1">أدب الدعاء والطلب</span><p className="text-[13px] text-gray-500 font-medium">علمتنا الفاتحة أن نبدأ بحمد الله والثناء عليه وتمجيده (الحمد لله رب العالمين...) قبل أن نسأله حاجتنا (اهدنا الصراط).</p></div>
                    <div className="flex flex-col pb-1 last:border-0"><span className="text-sm font-bold text-blue-600 mb-1">الإخلاص والتواضع</span><p className="text-[13px] text-gray-500 font-medium">إعلان العبودية الخالصة لله والاعتراف بالضعف البشري والافتقار إلى إعانة الله في كل صغير وكبير (إياك نعبد وإياك نستعين).</p></div>
                  </>
                ) : (
                  <p className="leading-[1.8] text-[#1D1B4B] text-sm text-right font-medium">هذا المحتوى يتم تحضيره وتوثيقه حالياً.</p>
                )}
              </div>
            </div>
          )}

          {!['details', 'virtues', 'vocabulary', 'faith', 'commands_actions', 'asbab', 'aqadiyya', 'fiqhiyya', 'qisasiyya', 'dua', 'akhlaqiyya'].includes(activeTab) && (
            <div className="flex flex-col items-center justify-center py-20 text-center animate-in zoom-in-95 duration-500">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-[#1D1B4B]/20 mb-4 border border-gray-100 shadow-none">
                <span className="text-3xl">{sections.find(s => s.id === activeTab)?.icon}</span>
              </div>
              <h4 className="text-[#1D1B4B] font-bold text-sm mb-2">المحتوى قيد التوثيق</h4>
              <p className="text-gray-400 text-[9px] max-w-[200px] mx-auto leading-relaxed font-medium">
                نعمل حالياً على تدقيق المادة العلمية وتوثيقها من المصادر المعتمدة.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

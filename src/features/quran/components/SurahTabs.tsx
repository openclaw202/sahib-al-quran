import React, { useState } from 'react';
import { Surah } from '../types';
import { Info, BookOpen, Clock, Heart, MessageCircle } from 'lucide-react';

interface SurahTabsProps {
  surah: Surah;
}

export const SurahTabs: React.FC<SurahTabsProps> = ({ surah }) => {
  const [activeTab, setActiveTab] = useState('details');

  const sections = [
    { id: 'details', label: 'المعلومات', icon: <Info size={16} /> },
    { id: 'asbab', label: 'أسباب النزول', icon: <BookOpen size={16} /> },
    { id: 'reflections', label: 'تأملات', icon: <Heart size={16} /> },
    { id: 'history', label: 'السياق التاريخي', icon: <Clock size={16} /> },
    { id: 'discussion', label: 'مجلس التدبر', icon: <MessageCircle size={16} /> },
  ];

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-700">
      {/* Original Tabs Style - Simpler and Professional */}
      <div className="flex items-center gap-1 overflow-x-auto pb-2 scrollbar-hide no-scrollbar rtl:flex-row-reverse border-b border-[#1D1B4B]/5">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveTab(section.id)}
            className={`flex items-center gap-2 px-5 py-3 text-[12px] font-black uppercase tracking-widest transition-all duration-300 relative ${activeTab === section.id
                ? 'text-[#1D1B4B]'
                : 'text-[#1D1B4B]/30 hover:text-[#1D1B4B]/60'
              }`}
          >
            {section.icon}
            {section.label}
            {activeTab === section.id && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#1D1B4B] rounded-full animate-in slide-in-from-bottom-2 duration-300" />
            )}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="min-h-[400px]">
        <div className="relative">
          {activeTab === 'details' && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div className="grid grid-cols-2 gap-4">
                {/* Restoration of "Old Badges" style */}
                <div className="bg-[#FFF8F4] p-6 rounded-[20px] border border-orange-100/50">
                  <p className="text-orange-900/40 text-[9px] font-black uppercase tracking-widest mb-2">مكان النزول</p>
                  <p className="font-black text-gray-800 text-xl">{surah.revelationType === 'MAKKI' ? 'مكية' : 'مدنية'}</p>
                </div>
                <div className="bg-[#F4F8FF] p-6 rounded-[20px] border border-blue-100/50">
                  <p className="text-blue-900/40 text-[9px] font-black uppercase tracking-widest mb-2">عدد الآيات</p>
                  <p className="font-black text-gray-800 text-xl">{surah.versesCount} آية</p>
                </div>
              </div>

              <div className="bg-white/40 backdrop-blur-sm border border-white/60 p-8 rounded-[32px]">
                <p className="leading-[2] text-[#1D1B4B] text-lg lg:text-xl font-medium text-center lg:text-right">
                  تعتبر سورة {surah.name} من أعظم سور القرآن الكريم، حيث أنها السورة التي لا تصح الصلاة إلا بها، وتشتمل على مجمل معاني القرآن من توحيد وعبادة ووعد ووعيد.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'asbab' && (
            <div className="animate-in fade-in duration-500">
              <div className="bg-white/40 border border-white/60 p-8 rounded-[32px]">
                <p className="leading-[2.2] text-[#1D1B4B] text-lg text-right italic font-medium">
                  {surah.asbabAlNuzul || 'هذا المحتوى يتم تحضيره وتوثيقه حالياً من أمهات كتب التفسير والحديث، لضمان دقة المعلومات الواردة في تطبيق صاحب القرآن لسورة ' + surah.name}
                </p>
              </div>
            </div>
          )}

          {!['details', 'asbab'].includes(activeTab) && (
            <div className="flex flex-col items-center justify-center py-24 text-center animate-in zoom-in-95 duration-500">
              <div className="w-20 h-20 bg-white/40 border border-white/60 rounded-[24px] flex items-center justify-center text-[#1D1B4B]/10 mb-6">
                {sections.find(s => s.id === activeTab)?.icon}
              </div>
              <h4 className="text-[#1D1B4B] font-black text-xl mb-3">المحتوى قيد التوثيق</h4>
              <p className="text-[#1D1B4B]/40 text-[9px] max-w-xs mx-auto leading-relaxed uppercase tracking-[0.2em] font-black">
                نحن نحرص على تقديم مادة علمية موثقة ومعتمدة تليق بكتاب الله
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

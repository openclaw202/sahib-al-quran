import React, { useState } from 'react';
import { SurahDetail } from '../types';

interface SurahTabsProps {
  surah: Partial<SurahDetail>;
}

const sections = [
  { id: 'details', label: 'تفاصيل السورة', icon: '📖' },
  { id: 'asbab', label: 'أسباب النزول', icon: '🕊️' },
  { id: 'aqadiyya', label: 'المواضيع العقدية', icon: '⚖️' },
  { id: 'fiqhiyya', label: 'الأحكام الفقهية', icon: '📜' },
  { id: 'qisasiyya', label: 'القصص القرآنية', icon: '⌛' },
  { id: 'dua', label: 'الأدعية القرآنية', icon: '🤲' },
  { id: 'akhlaqiyya', label: 'الأخلاق والسلوك', icon: '✨' },
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
                <div className="bg-[#FFF8F4] p-4 rounded-2xl border border-orange-50/50">
                  <p className="text-orange-900/40 text-[8px] font-bold uppercase tracking-wider mb-1">مكان النزول</p>
                  <p className="font-bold text-gray-800 text-base">{surah.revelationType === 'MAKKI' ? 'مكية' : 'مدنية'}</p>
                </div>
                <div className="bg-[#F4F8FF] p-4 rounded-2xl border border-blue-50/50">
                  <p className="text-blue-900/40 text-[8px] font-bold uppercase tracking-wider mb-1">عدد الآيات</p>
                  <p className="font-bold text-gray-800 text-base">{surah.versesCount} آية</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-none">
                <p className="leading-[1.8] text-[#1D1B4B] text-sm font-medium text-right">
                  تعتبر سورة {surah.name} من أعظم سور القرآن الكريم، تشتمل على مجمل معاني القرآن من توحيد وعبادة ووعد ووعيد، وهي أساس الصلاة وركنها المتين.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'asbab' && (
            <div className="animate-in fade-in duration-500">
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-none">
                <p className="leading-[1.8] text-[#1D1B4B] text-sm text-right font-medium">
                  {surah.asbabAlNuzul || 'هذا المحتوى يتم تحضيره وتوثيقه حالياً من أمهات كتب التفسير والحديث لضمان دقة المعلومات.'}
                </p>
              </div>
            </div>
          )}

          {!['details', 'asbab'].includes(activeTab) && (
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

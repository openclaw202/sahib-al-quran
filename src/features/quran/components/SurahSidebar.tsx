import React from 'react';
import { SURAH_LIST } from '../constants/surah-list';

interface SurahSidebarProps {
  onSelect: (id: number) => void;
  selectedId: number;
}

export const SurahSidebar: React.FC<SurahSidebarProps> = ({ onSelect, selectedId }) => {
  return (
    <div className="flex flex-col h-full bg-transparent w-full font-graphik text-[#1D1B4B]">

      {/* Sidebar Header - Logo Only at the VERY TOP */}
      <div className="pt-10 pb-6 px-8">
        <div className="w-full animate-in fade-in slide-in-from-top-4 duration-1000">
          <img
            src="/images/Sahib Al Quran.png"
            alt="صاحب القرآن"
            className="w-full max-w-[220px] mx-auto object-contain"
          />
        </div>
      </div>

      {/* Surah List */}
      <div className="flex-1 overflow-y-auto px-4 py-2 pb-20 space-y-1 scrollbar-hide no-scrollbar">
        {SURAH_LIST.map((surah) => (
          <button
            key={surah.id}
            onClick={() => onSelect(surah.id)}
            className={`w-full group flex items-center justify-between p-3 rounded-2xl transition-all duration-300 ${selectedId === surah.id
                ? 'bg-[#1D1B4B] text-white shadow-lg shadow-[#1D1B4B]/10'
                : 'bg-white/10 hover:bg-white/60 text-[#1D1B4B]/80'
              }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-[11px] font-black transition-all duration-300 ${selectedId === surah.id ? 'bg-white/20 text-white' : 'bg-white/60 text-[#1D1B4B]/40'
                }`}>
                {surah.id}
              </div>
              <div className="text-right">
                <p className={`font-black text-base ${selectedId === surah.id ? 'text-white' : 'text-[#1D1B4B]'} leading-tight mb-0.5`}>
                  {surah.name}
                </p>
                <p className={`text-[9px] font-black ${selectedId === surah.id ? 'text-white/40' : 'text-[#1D1B4B]/40'} uppercase tracking-widest`}>
                  سورة {surah.id}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

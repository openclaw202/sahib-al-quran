import React from 'react';
import { SURAH_LIST } from '../constants/surah-list';

interface SurahSidebarProps {
  onSelect: (id: number) => void;
  selectedId: number;
}

export const SurahSidebar: React.FC<SurahSidebarProps> = ({ onSelect, selectedId }) => {
  return (
    <div className="flex flex-col h-full bg-transparent w-full font-graphik text-[#1D1B4B]">

      {/* Sidebar Header - Logo Only at the VERY TOP - 4px vertical padding */}
      <div className="w-full flex items-center justify-start py-[4px] animate-in fade-in duration-1000">
        <img
          src="/images/Sahib Al Quran.png"
          alt="صاحب القرآن"
          className="w-[70%] object-contain block"
        />
      </div>

      {/* Surah List - Fixed Padding to match top */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1 scrollbar-hide no-scrollbar">
        {SURAH_LIST.map((surah) => {
          const isImplemented = surah.id === 1;
          return (
            <button
              key={surah.id}
              onClick={() => isImplemented && onSelect(surah.id)}
              disabled={!isImplemented}
              className={`w-full group flex items-center justify-between p-3 rounded-2xl transition-all duration-300 shadow-none border-none outline-none ${selectedId === surah.id
                ? 'bg-[#1D1B4B] text-white shadow-none'
                : isImplemented
                  ? 'bg-white/10 hover:bg-white/60 text-[#1D1B4B]/80 shadow-none'
                  : 'bg-gray-50/50 text-[#1D1B4B]/30 cursor-not-allowed opacity-60'
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
                    {isImplemented ? `سورة ${surah.id}` : 'تحت التطوير'}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

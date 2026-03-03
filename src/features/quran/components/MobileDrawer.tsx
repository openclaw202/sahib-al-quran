import React from 'react';
import { X } from 'lucide-react';
import { SURAH_LIST } from '../constants/surah-list';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (id: number) => void;
  selectedId: number;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  onSelect,
  selectedId,
}) => {
  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-[#1D1B4B]/20 backdrop-blur-sm z-50 transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[85%] max-w-[340px] bg-[#F9E6D3] z-[60] transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] transform ${isOpen ? 'translate-x-0' : 'translate-x-full'
          } shadow-2xl`}
        dir="rtl"
      >
        <div className="flex flex-col h-full overflow-hidden">

          {/* Header area in drawer - Logo at the VERY TOP */}
          <div className="pt-10 pb-4 px-6 relative">
            <button
              onClick={onClose}
              className="absolute left-6 top-10 w-10 h-10 flex items-center justify-center text-[#1D1B4B]/40 hover:bg-white/40 rounded-full transition-all"
            >
              <X size={20} />
            </button>
            <div className="w-full mt-4">
              <img
                src="/images/Sahib Al Quran.png"
                alt="صاحب القرآن"
                className="w-full max-w-[180px] mx-auto object-contain"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-6 pb-32 space-y-1 scrollbar-hide">
            {SURAH_LIST.map((surah) => (
              <button
                key={surah.id}
                onClick={() => onSelect(surah.id)}
                className={`w-full group flex items-center justify-between p-3.5 rounded-2xl transition-all duration-300 ${selectedId === surah.id
                    ? 'bg-[#1D1B4B] text-white shadow-xl shadow-[#1D1B4B]/20'
                    : 'bg-white/20 hover:bg-white/60 text-[#1D1B4B]/80'
                  }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-[10px] font-black transition-all duration-300 ${selectedId === surah.id ? 'bg-white/20 text-white' : 'bg-white/40 text-[#1D1B4B]/40'
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
      </div>
    </>
  );
};

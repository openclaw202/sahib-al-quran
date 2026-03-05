import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, BookOpen } from 'lucide-react';
import { SURAH_LIST } from '../../constants/surah-list';

interface SurahSelectorProps {
  selectedSurahNumber: number;
  onSelectSurah: (surahNumber: number) => void;
}

export const SurahSelector: React.FC<SurahSelectorProps> = ({
  selectedSurahNumber,
  onSelectSurah,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const selectedSurah = SURAH_LIST.find((s) => s.id === selectedSurahNumber);

  const filteredSurahs = SURAH_LIST.filter(
    (surah) =>
      surah.name.includes(searchQuery) ||
      surah.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      surah.id.toString().includes(searchQuery)
  );

  const handleSelect = (surahId: number) => {
    onSelectSurah(surahId);
    setIsOpen(false);
    setSearchQuery('');
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-4 py-2.5 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all"
      >
        <BookOpen size={18} className="text-[#D4AF37]" />
        <span className="font-bold text-[#1D1B4B]">
          {selectedSurah?.name || 'اختر سورة'}
        </span>
        <ChevronDown
          size={16}
          className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full mt-2 right-0 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden"
            >
              <div className="p-3 border-b border-gray-100">
                <div className="relative">
                  <Search
                    size={16}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="ابحث عن سورة..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pr-10 pl-4 py-2.5 bg-gray-50 rounded-xl text-sm text-right focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30"
                  />
                </div>
              </div>

              <div className="max-h-80 overflow-y-auto scrollbar-hide">
                {filteredSurahs.map((surah) => (
                  <button
                    key={surah.id}
                    onClick={() => handleSelect(surah.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-right ${
                      surah.id === selectedSurahNumber ? 'bg-[#FDF8F3]' : ''
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                        surah.id === selectedSurahNumber
                          ? 'bg-[#1D1B4B] text-white'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {surah.id}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-[#1D1B4B] text-sm">{surah.name}</p>
                      <p className="text-[10px] text-gray-400">{surah.englishName}</p>
                    </div>
                    {surah.id === selectedSurahNumber && (
                      <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

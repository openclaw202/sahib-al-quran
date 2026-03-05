import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ayah } from '../../types/quran';

interface QuranTextViewProps {
  ayahs: Ayah[];
  viewMode: 'page' | 'verses';
  tafsir: { [ayahNumber: number]: string };
  surahName?: string;
  showTafsir?: boolean;
}

const ArabicNumber: React.FC<{ number: number }> = ({ number }) => {
  const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  const digits = number.toString().split('');
  const arabicDigits = digits.map((d) => arabicNumerals[parseInt(d)]).join('');
  return <span className="font-uthmani">{arabicDigits}</span>;
};

const AyahEndMark: React.FC<{ number: number }> = ({ number }) => (
  <span className="inline-flex items-center justify-center mx-1 text-[#D4AF37]">
    <span className="relative flex items-center justify-center w-8 h-8">
      <svg viewBox="0 0 40 40" className="absolute w-full h-full">
        <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="20" cy="20" r="14" fill="none" stroke="currentColor" strokeWidth="0.5" />
      </svg>
      <span className="text-[10px] font-bold text-[#1D1B4B]">
        <ArabicNumber number={number} />
      </span>
    </span>
  </span>
);

export const QuranTextView: React.FC<QuranTextViewProps> = ({
  ayahs,
  viewMode,
  tafsir,
  surahName,
  showTafsir = true,
}) => {
  if (viewMode === 'page') {
    return (
      <div className="quran-page-view text-center leading-[2.8] px-2 py-6">
        <p
          className="font-uthmani text-[22px] md:text-[26px] text-[#1D1B4B] text-justify"
          style={{
            fontFamily: "'KFGQPC Uthmanic Script HAFS', 'Amiri Quran', 'Scheherazade New', serif",
            direction: 'rtl',
            textAlignLast: 'center',
          }}
        >
          {ayahs.map((ayah, index) => (
            <React.Fragment key={ayah.number}>
              <span className="ayah-text">{ayah.text}</span>
              <AyahEndMark number={ayah.numberInSurah} />
              {index < ayahs.length - 1 && ' '}
            </React.Fragment>
          ))}
        </p>
      </div>
    );
  }

  return (
    <div className="quran-verses-view space-y-6 px-2 py-4">
      <AnimatePresence>
        {ayahs.map((ayah, index) => (
          <motion.div
            key={ayah.number}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            className="verse-container"
          >
            <div className="verse-card bg-gradient-to-br from-[#FEFDFB] to-[#FDF8F3] rounded-2xl border border-[#E8DFD5] shadow-sm overflow-hidden">
              <div className="verse-header flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[#F5EDE4] to-[#FDF8F3] border-b border-[#E8DFD5]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1D1B4B] flex items-center justify-center">
                    <span className="text-white text-sm font-bold">
                      <ArabicNumber number={ayah.numberInSurah} />
                    </span>
                  </div>
                  {surahName && (
                    <span className="text-[12px] text-gray-500 font-medium">{surahName}</span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-[10px] text-gray-400">
                  <span>صفحة {ayah.page}</span>
                  <span>•</span>
                  <span>جزء {ayah.juz}</span>
                </div>
              </div>

              <div className="verse-content p-5">
                <p
                  className="font-uthmani text-[24px] md:text-[28px] text-[#1D1B4B] text-center leading-[2.5]"
                  style={{
                    fontFamily: "'KFGQPC Uthmanic Script HAFS', 'Amiri Quran', 'Scheherazade New', serif",
                    direction: 'rtl',
                  }}
                >
                  {ayah.text}
                </p>
              </div>

              {showTafsir && tafsir[ayah.numberInSurah] && (
                <div className="verse-tafsir px-5 py-4 bg-[#F9F6F2] border-t border-[#E8DFD5]">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-1 h-4 bg-[#D4AF37] rounded-full" />
                    <span className="text-[11px] font-bold text-[#8B7355]">التفسير الميسر</span>
                  </div>
                  <p className="text-[14px] text-[#5C4D3D] leading-[2] text-right">
                    {tafsir[ayah.numberInSurah]}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

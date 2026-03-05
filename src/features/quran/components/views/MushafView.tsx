import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, List, Loader2, ChevronLeft, ChevronRight, Eye, EyeOff } from 'lucide-react';
import { useQuranData } from '../../hooks/useQuranData';
import { QuranTextView } from './QuranTextView';
import { SurahSelector } from './SurahSelector';

export const MushafView: React.FC = () => {
    const {
        currentSurah,
        currentPage,
        tafsir,
        viewMode,
        loading,
        error,
        selectedSurahNumber,
        loadSurah,
        goToNextPage,
        goToPrevPage,
        toggleViewMode,
    } = useQuranData();

    const [showTafsir, setShowTafsir] = React.useState(true);

    return (
        <div className="animate-in fade-in duration-700 h-full flex flex-col">
            {/* Header */}
            <div className="mb-4 text-right px-2">
                <h2 className="text-2xl font-black text-[#1D1B4B]">المصحف الشريف</h2>
                <p className="text-[10px] font-bold text-gray-400 mt-1">
                    القرآن الكريم بالرسم العثماني مع التفسير الميسر
                </p>
            </div>

            {/* Controls Bar */}
            <div className="flex items-center justify-between gap-3 mb-4 px-2 flex-wrap">
                <SurahSelector
                    selectedSurahNumber={selectedSurahNumber}
                    onSelectSurah={loadSurah}
                />

                <div className="flex items-center gap-2">
                    {/* Toggle Tafsir Button */}
                    <button
                        onClick={() => setShowTafsir(!showTafsir)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-all ${
                            showTafsir
                                ? 'bg-[#1D1B4B] text-white border-[#1D1B4B]'
                                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                        }`}
                        title={showTafsir ? 'إخفاء التفسير' : 'إظهار التفسير'}
                    >
                        {showTafsir ? <Eye size={16} /> : <EyeOff size={16} />}
                        <span className="text-[11px] font-bold hidden sm:inline">
                            {showTafsir ? 'التفسير' : 'التفسير'}
                        </span>
                    </button>

                    {/* View Mode Toggle */}
                    <button
                        onClick={toggleViewMode}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-all ${
                            viewMode === 'verses'
                                ? 'bg-[#D4AF37] text-white border-[#D4AF37]'
                                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                        }`}
                        title={viewMode === 'page' ? 'عرض آية آية' : 'عرض صفحة كاملة'}
                    >
                        {viewMode === 'verses' ? <List size={16} /> : <BookOpen size={16} />}
                        <span className="text-[11px] font-bold hidden sm:inline">
                            {viewMode === 'verses' ? 'آية آية' : 'صفحة'}
                        </span>
                    </button>
                </div>
            </div>

            {/* Surah Info Banner */}
            {currentSurah && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mx-2 mb-4 p-4 bg-gradient-to-r from-[#1D1B4B] to-[#2D2B5B] rounded-2xl text-white"
                >
                    <div className="flex items-center justify-between">
                        <div className="text-right">
                            <h3 className="text-xl font-black">{currentSurah.name}</h3>
                            <p className="text-[11px] opacity-70 mt-1">
                                {currentSurah.englishName} • {currentSurah.englishNameTranslation}
                            </p>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <span className="text-[10px] opacity-60">عدد الآيات</span>
                            <span className="text-2xl font-black">{currentSurah.numberOfAyahs}</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <span className="text-[10px] opacity-60">نوع السورة</span>
                            <span className="text-sm font-bold px-3 py-1 bg-white/10 rounded-lg">
                                {currentSurah.revelationType === 'Meccan' ? 'مكية' : 'مدنية'}
                            </span>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Main Content */}
            <div className="flex-1 bg-white rounded-[24px] border border-gray-100 shadow-sm relative overflow-hidden">
                {loading ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
                        <div className="flex flex-col items-center gap-3">
                            <Loader2 size={32} className="text-[#D4AF37] animate-spin" />
                            <span className="text-sm text-gray-500 font-medium">جاري التحميل...</span>
                        </div>
                    </div>
                ) : error ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                            <p className="text-red-500 font-bold mb-2">{error}</p>
                            <button
                                onClick={() => loadSurah(selectedSurahNumber)}
                                className="px-4 py-2 bg-[#1D1B4B] text-white rounded-xl text-sm font-bold"
                            >
                                إعادة المحاولة
                            </button>
                        </div>
                    </div>
                ) : currentSurah ? (
                    <div className="h-full overflow-y-auto scrollbar-hide pb-20">
                        {/* Bismillah */}
                        {currentSurah.number !== 1 && currentSurah.number !== 9 && (
                            <div className="text-center py-6 border-b border-gray-100">
                                <p
                                    className="text-[28px] text-[#1D1B4B]"
                                    style={{
                                        fontFamily: "'KFGQPC Uthmanic Script HAFS', 'Amiri Quran', serif",
                                    }}
                                >
                                    بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                                </p>
                            </div>
                        )}

                        <QuranTextView
                            ayahs={currentSurah.ayahs}
                            viewMode={viewMode}
                            tafsir={tafsir}
                            surahName={currentSurah.name}
                            showTafsir={showTafsir && viewMode === 'verses'}
                        />
                    </div>
                ) : null}

                {/* Page Navigation */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 z-20">
                    <button
                        onClick={goToNextPage}
                        disabled={currentPage >= 604}
                        className="w-10 h-10 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-[#1D1B4B] hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <div className="px-5 py-2.5 rounded-2xl bg-[#1D1B4B] text-white text-[12px] font-black shadow-lg flex items-center gap-2">
                        <span>صفحة</span>
                        <span>{currentPage}</span>
                    </div>
                    <button
                        onClick={goToPrevPage}
                        disabled={currentPage <= 1}
                        className="w-10 h-10 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-[#1D1B4B] hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

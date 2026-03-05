import React, { useState, useEffect, useCallback } from 'react';
import { Loader2 } from 'lucide-react';
import { fetchPage } from '../../services/quranApi';
import { Ayah } from '../../types/quran';

interface PageAyah extends Ayah {
    surahNumber?: number;
    surahName?: string;
}

const toArabicNumber = (num: number): string => {
    const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return num.toString().split('').map(d => arabicNumerals[parseInt(d)]).join('');
};

export const MushafView: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageAyahs, setPageAyahs] = useState<PageAyah[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadPage = useCallback(async (pageNumber: number) => {
        setLoading(true);
        setError(null);
        try {
            const ayahs = await fetchPage(pageNumber);
            setPageAyahs(ayahs as PageAyah[]);
            setCurrentPage(pageNumber);
        } catch (err) {
            setError('حدث خطأ في تحميل الصفحة');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadPage(1);
    }, []);

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const page = parseInt(e.target.value);
        setCurrentPage(page);
    };

    const handleSliderRelease = () => {
        loadPage(currentPage);
    };

    return (
        <div className="h-full flex flex-col bg-white">
            {/* Quran Page Content */}
            <div className="flex-1 overflow-y-auto scrollbar-hide relative">
                {loading ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
                        <Loader2 size={40} className="text-[#D4AF37] animate-spin" />
                    </div>
                ) : error ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                            <p className="text-red-500 font-bold mb-3">{error}</p>
                            <button
                                onClick={() => loadPage(currentPage)}
                                className="px-4 py-2 bg-[#1D1B4B] text-white rounded-xl text-sm font-bold"
                            >
                                إعادة المحاولة
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="px-4 py-6 pb-24">
                        <p
                            className="text-[22px] md:text-[26px] text-[#1D1B4B] text-center leading-[2.8]"
                            style={{
                                fontFamily: "'Amiri Quran', 'Scheherazade New', 'Traditional Arabic', serif",
                                direction: 'rtl',
                                textAlign: 'justify',
                                textAlignLast: 'center',
                            }}
                        >
                            {pageAyahs.map((ayah, index) => (
                                <React.Fragment key={ayah.number}>
                                    <span>{ayah.text}</span>
                                    <span className="inline-flex items-center justify-center mx-1 text-[#D4AF37]">
                                        <span className="relative flex items-center justify-center w-7 h-7">
                                            <svg viewBox="0 0 40 40" className="absolute w-full h-full">
                                                <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="1.5" />
                                            </svg>
                                            <span className="text-[9px] font-bold text-[#1D1B4B]">
                                                {toArabicNumber(ayah.numberInSurah)}
                                            </span>
                                        </span>
                                    </span>
                                    {index < pageAyahs.length - 1 && ' '}
                                </React.Fragment>
                            ))}
                        </p>
                    </div>
                )}
            </div>

            {/* Fixed Bottom Page Slider */}
            <div className="fixed bottom-[75px] lg:bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-4 z-30">
                <div className="max-w-[500px] mx-auto">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] text-gray-400 font-bold">٦٠٤</span>
                        <span className="text-[14px] font-black text-[#1D1B4B]">
                            {toArabicNumber(currentPage)}
                        </span>
                        <span className="text-[11px] text-gray-400 font-bold">١</span>
                    </div>
                    <input
                        type="range"
                        min="1"
                        max="604"
                        value={currentPage}
                        onChange={handleSliderChange}
                        onMouseUp={handleSliderRelease}
                        onTouchEnd={handleSliderRelease}
                        className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer slider-rtl"
                        style={{ direction: 'rtl' }}
                    />
                </div>
            </div>
        </div>
    );
};

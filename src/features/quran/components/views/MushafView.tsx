import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Loader2, BookOpen, ScrollText, ChevronDown, Search, MoreVertical, Send, X, MessageSquare } from 'lucide-react';
import { fetchPage, fetchSurahTafsir } from '../../services/quranApi';
import { Ayah } from '../../types/quran';
import { SURAH_LIST } from '../../constants/surah-list';

interface PageAyah extends Ayah {
    surahNumber?: number;
    surahName?: string;
    revelationType?: string;
}

interface Reflection {
    ayahNumber: number;
    surahNumber: number;
    text: string;
    timestamp: number;
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
    const [viewMode, setViewMode] = useState<'quran' | 'tafsir' | 'reflections'>('quran');
    const [isSurahListOpen, setIsSurahListOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [tafsirData, setTafsirData] = useState<Record<number, string>>({});
    const [reflections, setReflections] = useState<Reflection[]>([]);
    const [newReflection, setNewReflection] = useState('');
    const [activeAyahForReflection, setActiveAyahForReflection] = useState<number | null>(null);

    // Load reflections from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('quran_reflections');
        if (saved) {
            setReflections(JSON.parse(saved));
        }
    }, []);

    // Save reflections to localStorage
    const saveReflection = () => {
        if (!newReflection.trim() || activeAyahForReflection === null) return;
        
        const firstAyah = pageAyahs[0];
        if (!firstAyah.surahNumber) return;

        const reflection: Reflection = {
            ayahNumber: activeAyahForReflection,
            surahNumber: firstAyah.surahNumber,
            text: newReflection,
            timestamp: Date.now()
        };

        const updated = [...reflections, reflection];
        setReflections(updated);
        localStorage.setItem('quran_reflections', JSON.stringify(updated));
        setNewReflection('');
        setActiveAyahForReflection(null);
    };

    const currentSurahInfo = useMemo(() => {
        if (pageAyahs.length === 0) return null;
        const firstAyah = pageAyahs[0];
        return {
            name: firstAyah.surahName,
            number: firstAyah.surahNumber,
            revelationType: firstAyah.revelationType === 'Meccan' ? 'مكية' : 'مدنية'
        };
    }, [pageAyahs]);

    const loadPage = useCallback(async (pageNumber: number) => {
        setLoading(true);
        setError(null);
        try {
            const ayahs = await fetchPage(pageNumber);
            setPageAyahs(ayahs as PageAyah[]);
            setCurrentPage(pageNumber);

            if (viewMode === 'tafsir' && ayahs.length > 0) {
                const surahNum = (ayahs[0] as PageAyah).surahNumber;
                if (surahNum) {
                    const tafsir = await fetchSurahTafsir(surahNum);
                    const tafsirMap: Record<number, string> = {};
                    tafsir.forEach(t => {
                        tafsirMap[t.ayahNumber] = t.text;
                    });
                    setTafsirData(tafsirMap);
                }
            }
        } catch (err) {
            setError('حدث خطأ في تحميل الصفحة');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [viewMode]);

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

    const filteredSurahs = SURAH_LIST.filter(s =>
        s.name.includes(searchQuery) || s.id.toString().includes(searchQuery)
    );

    const handleSurahSelect = async (surahId: number) => {
        setIsSurahListOpen(false);
        setSearchQuery('');
        setLoading(true);
        try {
            const response = await fetch(`https://api.alquran.cloud/v1/surah/${surahId}`);
            const data = await response.json();
            if (data.code === 200 && data.data.ayahs.length > 0) {
                const firstPage = data.data.ayahs[0].page;
                loadPage(firstPage);
            }
        } catch (err) {
            console.error('Failed to jump to surah:', err);
            setError('حدث خطأ أثناء الانتقال إلى السورة');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-full flex flex-col bg-white" dir="rtl">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between bg-white sticky top-0 z-40">
                <div className="w-1/3 text-right">
                    <button
                        onClick={() => setIsSurahListOpen(!isSurahListOpen)}
                        className="flex items-center gap-2 hover:bg-gray-50 px-2 py-1 rounded-lg transition-colors"
                    >
                        <span className="text-[18px] font-black text-[#1D1B4B]">{currentSurahInfo?.name}</span>
                        <ChevronDown size={18} className="text-[#D4AF37]" />
                    </button>
                </div>
                
                <div className="w-1/3 text-center text-[16px] font-black text-[#1D1B4B]">
                    سورة رقم {currentSurahInfo?.number ? toArabicNumber(currentSurahInfo.number) : ''}
                </div>

                <div className="w-1/3 text-left text-[12px] font-bold text-[#D4AF37]">
                    {currentSurahInfo?.revelationType}
                </div>
            </div>

            {/* Surah List Dropdown */}
            {isSurahListOpen && (
                <div className="fixed inset-0 z-50 flex flex-col bg-white animate-in slide-in-from-top duration-300">
                    <div className="p-4 border-b border-gray-100 flex items-center gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="ابحث عن سورة..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pr-10 pl-4 py-2.5 bg-gray-50 rounded-xl text-right focus:outline-none font-graphik"
                            />
                        </div>
                        <button
                            onClick={() => setIsSurahListOpen(false)}
                            className="text-[#1D1B4B] font-bold font-graphik"
                        >
                            إلغاء
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-2">
                        <div className="grid grid-cols-2 gap-2">
                            {filteredSurahs.map(surah => (
                                <button
                                    key={surah.id}
                                    onClick={() => handleSurahSelect(surah.id)}
                                    className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-[#FDF8F3] transition-colors text-right"
                                >
                                    <span className="text-[12px] text-gray-400 font-bold font-graphik">{toArabicNumber(surah.id)}</span>
                                    <span className="text-[16px] font-black text-[#1D1B4B] font-graphik">{surah.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Quran Page Content */}
            <div className="flex-1 overflow-y-auto scrollbar-hide relative bg-white">
                {loading ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
                        <Loader2 size={40} className="text-[#D4AF37] animate-spin" />
                    </div>
                ) : error ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center font-graphik">
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
                    <div className="px-6 py-8 pb-32">
                        {viewMode === 'tafsir' ? (
                            <div className="space-y-8">
                                {pageAyahs.map((ayah) => (
                                    <div key={ayah.number} className="space-y-4">
                                        <div className="text-right">
                                            <p className="text-[24px] md:text-[28px] text-[#1D1B4B] leading-[2.5] text-justify font-uthmani">
                                                {ayah.text}
                                                <span className="inline-flex items-center justify-center mx-2 text-[#D4AF37]">
                                                    <span className="relative flex items-center justify-center w-8 h-8">
                                                        <svg viewBox="0 0 40 40" className="absolute w-full h-full">
                                                            <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="1.5" />
                                                        </svg>
                                                        <span className="text-[10px] font-bold text-[#1D1B4B] font-graphik">
                                                            {toArabicNumber(ayah.numberInSurah)}
                                                        </span>
                                                    </span>
                                                </span>
                                            </p>
                                        </div>
                                        <div className="bg-[#FDF8F3] rounded-2xl p-4 border border-[#F5EDE4]">
                                            <p className="text-[14px] text-gray-600 leading-[1.8] text-right font-graphik">
                                                {tafsirData[ayah.numberInSurah] || 'جاري تحميل التفسير...'}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : viewMode === 'reflections' ? (
                            <div className="space-y-8">
                                {pageAyahs.map((ayah) => {
                                    const ayahReflections = reflections.filter(r => 
                                        r.ayahNumber === ayah.numberInSurah && 
                                        r.surahNumber === ayah.surahNumber
                                    );
                                    
                                    return (
                                        <div key={ayah.number} className="space-y-4">
                                            <div className="text-right">
                                                <p className="text-[24px] md:text-[28px] text-[#1D1B4B] leading-[2.5] text-justify font-uthmani">
                                                    {ayah.text}
                                                    <span className="inline-flex items-center justify-center mx-2 text-[#D4AF37]">
                                                        <span className="relative flex items-center justify-center w-8 h-8">
                                                            <svg viewBox="0 0 40 40" className="absolute w-full h-full">
                                                                <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="1.5" />
                                                            </svg>
                                                            <span className="text-[10px] font-bold text-[#1D1B4B] font-graphik">
                                                                {toArabicNumber(ayah.numberInSurah)}
                                                            </span>
                                                        </span>
                                                    </span>
                                                </p>
                                            </div>
                                            
                                            {ayahReflections.map((ref, idx) => (
                                                <div key={idx} className="bg-[#EBF5FF] rounded-2xl p-4 border border-[#D1E9FF]">
                                                    <div className="flex items-center gap-2 mb-1 text-[#0066CC]">
                                                        <MessageSquare size={14} />
                                                        <span className="text-[12px] font-bold font-graphik">تأملاتي</span>
                                                    </div>
                                                    <p className="text-[14px] text-[#003366] leading-[1.8] text-right font-graphik">
                                                        {ref.text}
                                                    </p>
                                                </div>
                                            ))}

                                            {activeAyahForReflection === ayah.numberInSurah ? (
                                                <div className="bg-white rounded-2xl p-4 border-2 border-[#D4AF37] shadow-lg animate-in fade-in zoom-in duration-200">
                                                    <textarea
                                                        autoFocus
                                                        value={newReflection}
                                                        onChange={(e) => setNewReflection(e.target.value)}
                                                        placeholder="اكتب تأملك هنا..."
                                                        className="w-full bg-transparent border-none focus:ring-0 text-right text-[14px] font-graphik resize-none"
                                                        rows={3}
                                                    />
                                                    <div className="flex items-center justify-between mt-2">
                                                        <button
                                                            onClick={() => setActiveAyahForReflection(null)}
                                                            className="p-1.5 text-gray-400 hover:text-red-500"
                                                        >
                                                            <X size={20} />
                                                        </button>
                                                        <button
                                                            onClick={saveReflection}
                                                            disabled={!newReflection.trim()}
                                                            className="flex items-center gap-2 px-4 py-1.5 bg-[#D4AF37] text-white rounded-xl text-[13px] font-bold disabled:opacity-50"
                                                        >
                                                            <span>حفظ التأمل</span>
                                                            <Send size={14} />
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => setActiveAyahForReflection(ayah.numberInSurah)}
                                                    className="w-full py-3 px-4 rounded-2xl border border-dashed border-gray-300 text-gray-400 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all flex items-center justify-center gap-2 text-[14px] font-graphik"
                                                >
                                                    <ScrollText size={18} />
                                                    <span>أضف تأملاً لهذه الآية</span>
                                                </button>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <p
                                className="text-[24px] md:text-[28px] text-[#1D1B4B] text-center leading-[3] font-uthmani"
                                style={{
                                    direction: 'rtl',
                                    textAlign: 'justify',
                                    textAlignLast: 'center',
                                }}
                            >
                                {pageAyahs.map((ayah, index) => (
                                    <React.Fragment key={ayah.number}>
                                        <span>{ayah.text}</span>
                                        <span className="inline-flex items-center justify-center mx-1 text-[#D4AF37]">
                                            <span className="relative flex items-center justify-center w-8 h-8">
                                                <svg viewBox="0 0 40 40" className="absolute w-full h-full">
                                                    <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="1.5" />
                                                </svg>
                                                <span className="text-[10px] font-bold text-[#1D1B4B] font-graphik">
                                                    {toArabicNumber(ayah.numberInSurah)}
                                                </span>
                                            </span>
                                        </span>
                                        {index < pageAyahs.length - 1 && ' '}
                                    </React.Fragment>
                                ))}
                            </p>
                        )}
                    </div>
                )}
            </div>

            {/* Menu Overlay */}
            {isMenuOpen && (
                <>
                    <div 
                        className="fixed inset-0 bg-black/20 z-[45] animate-in fade-in duration-200"
                        onClick={() => setIsMenuOpen(false)}
                    />
                    <div className="fixed bottom-[140px] left-6 right-6 max-w-[500px] mx-auto bg-white rounded-[32px] shadow-2xl z-[50] overflow-hidden animate-in slide-in-from-bottom-8 duration-300">
                        <div className="p-2 space-y-1">
                            <button
                                onClick={() => {
                                    setViewMode('quran');
                                    setIsMenuOpen(false);
                                }}
                                className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${
                                    viewMode === 'quran' ? 'bg-[#FDF8F3] text-[#1D1B4B]' : 'hover:bg-gray-50 text-gray-600'
                                }`}
                            >
                                <span className="text-[16px] font-black font-graphik">المصحف الشريف</span>
                                <BookOpen size={20} className={viewMode === 'quran' ? 'text-[#D4AF37]' : 'text-gray-400'} />
                            </button>
                            <button
                                onClick={() => {
                                    setViewMode('tafsir');
                                    setIsMenuOpen(false);
                                    loadPage(currentPage);
                                }}
                                className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${
                                    viewMode === 'tafsir' ? 'bg-[#FDF8F3] text-[#1D1B4B]' : 'hover:bg-gray-50 text-gray-600'
                                }`}
                            >
                                <span className="text-[16px] font-black font-graphik">القراءة بالتفسير</span>
                                <ScrollText size={20} className={viewMode === 'tafsir' ? 'text-[#D4AF37]' : 'text-gray-400'} />
                            </button>
                            <button
                                onClick={() => {
                                    setViewMode('reflections');
                                    setIsMenuOpen(false);
                                }}
                                className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${
                                    viewMode === 'reflections' ? 'bg-[#FDF8F3] text-[#1D1B4B]' : 'hover:bg-gray-50 text-gray-600'
                                }`}
                            >
                                <span className="text-[16px] font-black font-graphik">تأملاتي</span>
                                <MessageSquare size={20} className={viewMode === 'reflections' ? 'text-[#D4AF37]' : 'text-gray-400'} />
                            </button>
                        </div>
                    </div>
                </>
            )}

            {/* Fixed Bottom Page Slider & Info */}
            <div className="fixed bottom-[75px] lg:bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-4 z-30 font-graphik">
                <div className="max-w-[500px] mx-auto space-y-4">
                    {/* Detailed Info Bar */}
                    <div className="flex items-center justify-between text-[#1D1B4B]">
                        <div className="flex flex-col items-start order-last">
                            <span className="text-[10px] text-gray-400 font-bold">سورة</span>
                            <span className="text-[14px] font-black">{currentSurahInfo?.name}</span>
                        </div>
                        <div className="flex flex-col items-center order-2">
                            <span className="text-[10px] text-gray-400 font-bold">صفحة</span>
                            <span className="text-[14px] font-black">{toArabicNumber(currentPage)}</span>
                        </div>
                        <div className="flex flex-col items-end order-first">
                            <span className="text-[10px] text-gray-400 font-bold">آية رقم</span>
                            <span className="text-[14px] font-black">
                                {pageAyahs.length > 0 ? toArabicNumber(pageAyahs[0].numberInSurah) : ''}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex-1 relative pt-1 order-last">
                            <input
                                type="range"
                                min="1"
                                max="604"
                                value={currentPage}
                                onChange={handleSliderChange}
                                onMouseUp={handleSliderRelease}
                                onTouchEnd={handleSliderRelease}
                                className="w-full h-2 bg-gray-100 rounded-full appearance-none cursor-pointer slider-rtl"
                                style={{ direction: 'rtl' }}
                            />
                        </div>

                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className={`p-2.5 rounded-xl transition-all order-first ${
                                isMenuOpen 
                                ? 'bg-[#1D1B4B] text-white shadow-lg' 
                                : 'bg-gray-50 text-gray-400 border border-gray-100 hover:bg-gray-100'
                            }`}
                            title="عرض الخيارات"
                        >
                            <MoreVertical size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

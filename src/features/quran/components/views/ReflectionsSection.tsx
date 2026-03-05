import React, { useState, useEffect } from 'react';
import { ChevronDown, Send, MessageSquare } from 'lucide-react';
import { SURAH_LIST } from '../../constants/surah-list';
import { fetchSurah } from '../../services/quranApi';

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

export const ReflectionsSection: React.FC = () => {
    const [selectedSurahId, setSelectedSurahId] = useState<number>(1);
    const [selectedAyahNumber, setSelectedAyahNumber] = useState<number>(1);
    const [maxAyahs, setMaxAyahs] = useState<number>(7);
    const [ayahText, setAyahText] = useState<string>('');
    const [reflectionText, setReflectionText] = useState('');
    const [reflections, setReflections] = useState<Reflection[]>([]);
    const [loading, setLoading] = useState(false);

    // Load reflections
    const loadReflections = () => {
        const saved = localStorage.getItem('quran_reflections');
        if (saved) {
            setReflections(JSON.parse(saved));
        }
    };

    useEffect(() => {
        loadReflections();
        
        // Listen for sync events
        const handleSync = (e: any) => {
            if (e.detail) setReflections(e.detail);
        };
        window.addEventListener('quran_reflections_updated', handleSync);
        return () => window.removeEventListener('quran_reflections_updated', handleSync);
    }, []);

    // Fetch surah details to get max ayahs and ayah text
    useEffect(() => {
        const loadSurahData = async () => {
            setLoading(true);
            try {
                const surah = await fetchSurah(selectedSurahId);
                setMaxAyahs(surah.ayahs.length);
                const ayah = surah.ayahs.find(a => a.numberInSurah === selectedAyahNumber);
                if (ayah) {
                    setAyahText(ayah.text);
                }
            } catch (err) {
                console.error('Error loading surah data:', err);
            } finally {
                setLoading(false);
            }
        };
        loadSurahData();
    }, [selectedSurahId, selectedAyahNumber]);

    const handleSaveReflection = () => {
        if (!reflectionText.trim()) return;

        const newReflection: Reflection = {
            ayahNumber: selectedAyahNumber,
            surahNumber: selectedSurahId,
            text: reflectionText,
            timestamp: Date.now()
        };

        const existing = JSON.parse(localStorage.getItem('quran_reflections') || '[]');
        const updated = [...existing, newReflection];
        setReflections(updated);
        localStorage.setItem('quran_reflections', JSON.stringify(updated));
        setReflectionText('');
        
        // Dispatch custom event for cross-component sync
        window.dispatchEvent(new CustomEvent('quran_reflections_updated', { detail: updated }));
    };

    const currentAyahReflections = reflections.filter(
        r => r.surahNumber === selectedSurahId && r.ayahNumber === selectedAyahNumber
    );

    return (
        <div className="flex flex-col h-full bg-white animate-in fade-in duration-500" dir="rtl">
            {/* Compact Header with Dropdowns */}
            <div className="p-3 border-b border-gray-50 bg-gray-50/50 sticky top-0 z-20">
                <div className="space-y-2 mb-3">
                    {/* Surah Selector */}
                    <div className="relative flex items-center gap-2">
                        <label className="text-[10px] text-gray-400 font-bold w-12 text-left">السورة:</label>
                        <div className="flex-1 relative">
                            <select
                                value={selectedSurahId}
                                onChange={(e) => {
                                    setSelectedSurahId(parseInt(e.target.value));
                                    setSelectedAyahNumber(1);
                                }}
                                className="w-full appearance-none bg-white border border-gray-100 rounded-lg px-3 py-1.5 text-[12px] font-bold text-[#1D1B4B] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 transition-all font-graphik shadow-sm"
                            >
                                {SURAH_LIST.map(s => (
                                    <option key={s.id} value={s.id}>{s.name}</option>
                                ))}
                            </select>
                            <ChevronDown size={12} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                    {/* Ayah Selector */}
                    <div className="relative flex items-center gap-2">
                        <label className="text-[10px] text-gray-400 font-bold w-12 text-left">الآية:</label>
                        <div className="flex-1 relative">
                            <select
                                value={selectedAyahNumber}
                                onChange={(e) => setSelectedAyahNumber(parseInt(e.target.value))}
                                className="w-full appearance-none bg-white border border-gray-100 rounded-lg px-3 py-1.5 text-[12px] font-bold text-[#1D1B4B] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 transition-all font-graphik shadow-sm"
                            >
                                {Array.from({ length: maxAyahs }, (_, i) => (
                                    <option key={i + 1} value={i + 1}>آية {toArabicNumber(i + 1)}</option>
                                ))}
                            </select>
                            <ChevronDown size={12} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* Ayah Display - Very Compact */}
                <div className="bg-white rounded-xl p-3 border border-[#F5EDE4] shadow-sm">
                    {loading ? (
                        <div className="h-8 flex items-center justify-center">
                            <div className="w-4 h-4 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
                        </div>
                    ) : (
                        <p className="text-[16px] text-[#1D1B4B] leading-relaxed text-center font-uthmani line-clamp-2">
                            {ayahText}
                        </p>
                    )}
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20 scrollbar-hide">
                {/* Existing Reflections */}
                <div className="space-y-3">
                    {currentAyahReflections.length > 0 ? (
                        currentAyahReflections.map((ref, idx) => (
                            <div key={idx} className="bg-[#EBF5FF] rounded-2xl p-4 border border-[#D1E9FF] animate-in slide-in-from-top-2">
                                <div className="flex items-center gap-2 mb-2 text-[#0066CC]">
                                    <MessageSquare size={14} />
                                    <span className="text-[11px] font-bold font-graphik">تأمل سابق</span>
                                </div>
                                <p className="text-[14px] text-[#003366] leading-relaxed font-graphik">
                                    {ref.text}
                                </p>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-8 opacity-40">
                            <MessageSquare size={32} className="mx-auto mb-2" />
                            <p className="text-[12px] font-bold font-graphik">لا توجد تأملات لهذه الآية بعد</p>
                        </div>
                    )}
                </div>

                {/* Input Area */}
                <div className="bg-white rounded-2xl border-2 border-[#D4AF37]/30 shadow-sm overflow-hidden sticky bottom-0">
                    <textarea
                        value={reflectionText}
                        onChange={(e) => setReflectionText(e.target.value)}
                        placeholder="اكتب تأملك حول الآية هنا..."
                        className="w-full p-4 bg-transparent border-none focus:ring-0 text-[14px] font-graphik resize-none min-h-[120px]"
                    />
                    <div className="p-3 bg-gray-50 flex justify-end">
                        <button
                            onClick={handleSaveReflection}
                            disabled={!reflectionText.trim()}
                            className="flex items-center gap-2 px-6 py-2 bg-[#1D1B4B] text-white rounded-xl text-[13px] font-bold disabled:opacity-50 transition-all hover:bg-[#2A286E]"
                        >
                            <span>حفظ التأمل</span>
                            <Send size={14} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

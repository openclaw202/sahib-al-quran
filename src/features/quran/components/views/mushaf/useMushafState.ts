// هوك إدارة حالة صفحة المصحف - يحتوي على كل اللوجيك والحالات
import { useState, useEffect, useCallback, useMemo } from 'react';
import React from 'react';
import { fetchPage, fetchSurahTafsir } from '../../../services/quranApi';
import { SURAH_LIST } from '../../../constants/surah-list';
import { PageAyah, Reflection, LongPressMenuState, MushafViewMode } from './types';
import { getSurahFromPage, toArabicNumber } from './utils';

export const useMushafState = () => {
    // ===== حالات الصفحة الأساسية =====
    // رقم الصفحة الحالية
    const [currentPage, setCurrentPage] = useState(1);
    // آيات الصفحة الحالية
    const [pageAyahs, setPageAyahs] = useState<PageAyah[]>([]);
    // حالة التحميل
    const [loading, setLoading] = useState(false);
    // رسالة الخطأ
    const [error, setError] = useState<string | null>(null);

    // ===== حالات وضع العرض =====
    // الوضع الحالي: مصحف / تفسير / تأملات
    const [viewMode, setViewMode] = useState<MushafViewMode>('quran');

    // ===== حالات القوائم =====
    // هل قائمة السور مفتوحة
    const [isSurahListOpen, setIsSurahListOpen] = useState(false);
    // هل قائمة الخيارات مفتوحة
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    // نص البحث في قائمة السور
    const [searchQuery, setSearchQuery] = useState('');

    // ===== حالات التفسير =====
    // بيانات التفسير
    const [tafsirData, setTafsirData] = useState<Record<number, string>>({});

    // ===== حالات التأملات =====
    // قائمة التأملات المحفوظة
    const [reflections, setReflections] = useState<Reflection[]>([]);
    // نص التأمل الجديد
    const [newReflection, setNewReflection] = useState('');
    // رقم الآية المفعّلة لإضافة تأمل
    const [activeAyahForReflection, setActiveAyahForReflection] = useState<number | null>(null);

    // ===== حالات التفاعل مع الآيات =====
    // قائمة الضغط المطول (الموقع والآية)
    const [longPressMenu, setLongPressMenu] = useState<LongPressMenuState | null>(null);
    // رقم الآية المفعّلة لشارة الإضاءة
    const [activeLightbulb, setActiveLightbulb] = useState<number | null>(null);
    // مؤقت الضغط المطول
    const [longPressTimer, setLongPressTimer] = useState<any>(null);
    // هل منتقي الألوان مفتوح
    const [showColorPicker, setShowColorPicker] = useState(false);

    // ===== حالات المفضلة والتظليل =====
    // قائمة الآيات المفضلة
    const [favorites, setFavorites] = useState<{surah: number; ayah: number}[]>([]);
    // ألوان تظليل الآيات (المفتاح: رقم_السورة-رقم_الآية)
    const [ayahHighlights, setAyahHighlights] = useState<Record<string, string>>({});

    // ===== تحميل البيانات المحفوظة من التخزين المحلي =====
    useEffect(() => {
        const savedFavs = localStorage.getItem('quran_favorites');
        if (savedFavs) setFavorites(JSON.parse(savedFavs));

        const savedHighlights = localStorage.getItem('quran_highlights');
        if (savedHighlights) setAyahHighlights(JSON.parse(savedHighlights));
    }, []);

    // ===== التعامل مع الضغط المطول وبدء اللمس =====
    const handleAyahTouchStart = (e: React.MouseEvent | React.TouchEvent, ayah: PageAyah) => {
        if (viewMode !== 'quran') return;

        // الحصول على إحداثيات اللمس لتحديد موقع القائمة
        const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;

        const timer = setTimeout(() => {
            setLongPressMenu({ ayah, x: clientX, y: clientY });
            setLongPressTimer(null);
            if ('vibrate' in navigator) navigator.vibrate(50);
        }, 600);
        setLongPressTimer(timer);
    };

    // ===== التعامل مع انتهاء اللمس (نقرة واحدة أو ضغط مطول) =====
    const handleAyahTouchEnd = (ayah: PageAyah) => {
        if (longPressTimer) {
            clearTimeout(longPressTimer);
            setLongPressTimer(null);
            if (!longPressMenu) {
                // تم اكتشاف نقرة واحدة - إظهار/إخفاء شارة الإضاءة
                setActiveLightbulb(activeLightbulb === ayah.number ? null : ayah.number);
            }
        }
    };

    // ===== تبديل تظليل الآية =====
    const toggleHighlight = (surahNum: number, ayahNum: number, colorClass: string) => {
        const key = `${surahNum}-${ayahNum}`;
        const updated = { ...ayahHighlights };
        if (updated[key] === colorClass) {
            delete updated[key];
        } else {
            updated[key] = colorClass;
        }
        setAyahHighlights(updated);
        localStorage.setItem('quran_highlights', JSON.stringify(updated));
    };

    // ===== التحقق من كون الآية مفضلة =====
    const isFavorite = (surahNum: number, ayahNum: number) =>
        favorites.some(f => f.surah === surahNum && f.ayah === ayahNum);

    // ===== تبديل حالة المفضلة =====
    const toggleFavorite = (surahNum: number, ayahNum: number) => {
        let updated;
        if (isFavorite(surahNum, ayahNum)) {
            updated = favorites.filter(f => !(f.surah === surahNum && f.ayah === ayahNum));
        } else {
            updated = [...favorites, { surah: surahNum, ayah: ayahNum }];
        }
        setFavorites(updated);
        localStorage.setItem('quran_favorites', JSON.stringify(updated));
    };

    // ===== نسخ نص الآية =====
    const copyAyah = (ayah: PageAyah) => {
        const text = `${ayah.text} (${ayah.surahName} - ${toArabicNumber(ayah.numberInSurah)})`;
        navigator.clipboard.writeText(text).catch(() => {});
    };

    // ===== مشاركة نص الآية =====
    const shareAyah = async (ayah: PageAyah) => {
        const text = `${ayah.text}\n\n- ${ayah.surahName}، الآية ${toArabicNumber(ayah.numberInSurah)}`;
        if (navigator.share) {
            try {
                await navigator.share({ text });
            } catch {}
        } else {
            navigator.clipboard.writeText(text).catch(() => {});
        }
    };

    // ===== تحميل التأملات من التخزين المحلي =====
    const loadReflections = () => {
        const saved = localStorage.getItem('quran_reflections');
        if (saved) {
            setReflections(JSON.parse(saved));
        }
    };

    // ===== الاستماع لأحداث تحديث التأملات =====
    useEffect(() => {
        loadReflections();

        const handleSync = (e: any) => {
            if (e.detail) setReflections(e.detail);
        };
        window.addEventListener('quran_reflections_updated', handleSync);
        return () => window.removeEventListener('quran_reflections_updated', handleSync);
    }, []);

    // ===== حفظ تأمل جديد =====
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

        const existing = JSON.parse(localStorage.getItem('quran_reflections') || '[]');
        const updated = [...existing, reflection];
        setReflections(updated);
        localStorage.setItem('quran_reflections', JSON.stringify(updated));
        setNewReflection('');
        setActiveAyahForReflection(null);

        // إرسال حدث المزامنة لباقي المكونات
        window.dispatchEvent(new CustomEvent('quran_reflections_updated', { detail: updated }));
    };

    // ===== معلومات السورة الحالية (من الآيات المحملة) =====
    const currentSurahInfo = useMemo(() => {
        if (pageAyahs.length === 0) return null;
        const firstAyah = pageAyahs[0];
        return {
            name: firstAyah.surahName,
            number: firstAyah.surahNumber,
            revelationType: firstAyah.revelationType === 'Meccan' ? 'مكية' : 'مدنية'
        };
    }, [pageAyahs]);

    // ===== معلومات السورة من شريط التمرير =====
    const sliderSurahInfo = useMemo(() => getSurahFromPage(currentPage), [currentPage]);

    // ===== تحميل صفحة من الـ API =====
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

    // ===== تحميل الصفحة الأولى عند بدء التطبيق =====
    useEffect(() => {
        loadPage(1);
    }, []);

    // ===== التعامل مع تغيير شريط التمرير =====
    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const page = parseInt(e.target.value);
        setCurrentPage(page);
    };

    // ===== التعامل مع إفلات شريط التمرير =====
    const handleSliderRelease = () => {
        loadPage(currentPage);
    };

    // ===== تصفية قائمة السور حسب البحث =====
    const filteredSurahs = SURAH_LIST.filter(s =>
        s.name.includes(searchQuery) || s.id.toString().includes(searchQuery)
    );

    // ===== الانتقال لسورة محددة =====
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

    // ===== إزالة التظليل عن آية =====
    const removeHighlight = (surahNum: number, ayahNum: number) => {
        const key = `${surahNum}-${ayahNum}`;
        const updated = { ...ayahHighlights };
        delete updated[key];
        setAyahHighlights(updated);
        localStorage.setItem('quran_highlights', JSON.stringify(updated));
    };

    // إرجاع كل الحالات والدوال للمكونات
    return {
        // حالات الصفحة
        currentPage,
        pageAyahs,
        loading,
        error,
        viewMode,
        setViewMode,

        // حالات القوائم
        isSurahListOpen,
        setIsSurahListOpen,
        isMenuOpen,
        setIsMenuOpen,
        searchQuery,
        setSearchQuery,

        // التفسير
        tafsirData,

        // التأملات
        reflections,
        newReflection,
        setNewReflection,
        activeAyahForReflection,
        setActiveAyahForReflection,
        saveReflection,

        // التفاعل مع الآيات
        longPressMenu,
        setLongPressMenu,
        activeLightbulb,
        setActiveLightbulb,
        longPressTimer,
        handleAyahTouchStart,
        handleAyahTouchEnd,
        showColorPicker,
        setShowColorPicker,

        // المفضلة والتظليل
        favorites,
        ayahHighlights,
        toggleHighlight,
        removeHighlight,
        isFavorite,
        toggleFavorite,
        copyAyah,
        shareAyah,

        // معلومات السورة
        currentSurahInfo,
        sliderSurahInfo,

        // التنقل
        loadPage,
        handleSliderChange,
        handleSliderRelease,
        filteredSurahs,
        handleSurahSelect,
    };
};

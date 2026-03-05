import { useState, useEffect, useCallback } from 'react';
import { Surah, Ayah, ViewMode } from '../types/quran';
import { fetchSurah, fetchPage, fetchSurahTafsir } from '../services/quranApi';

interface PageAyah extends Ayah {
  surahNumber: number;
  surahName: string;
}

interface TafsirData {
  [ayahNumber: number]: string;
}

export const useQuranData = () => {
  const [currentSurah, setCurrentSurah] = useState<Surah | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageAyahs, setPageAyahs] = useState<PageAyah[]>([]);
  const [tafsir, setTafsir] = useState<TafsirData>({});
  const [viewMode, setViewMode] = useState<ViewMode>('page');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedSurahNumber, setSelectedSurahNumber] = useState<number>(1);

  const loadSurah = useCallback(async (surahNumber: number) => {
    setLoading(true);
    setError(null);
    try {
      const [surahData, tafsirData] = await Promise.all([
        fetchSurah(surahNumber),
        fetchSurahTafsir(surahNumber),
      ]);
      setCurrentSurah(surahData);
      setSelectedSurahNumber(surahNumber);
      
      const tafsirMap: TafsirData = {};
      tafsirData.forEach((t) => {
        tafsirMap[t.ayahNumber] = t.text;
      });
      setTafsir(tafsirMap);
      
      if (surahData.ayahs.length > 0) {
        setCurrentPage(surahData.ayahs[0].page);
      }
    } catch (err) {
      setError('حدث خطأ في تحميل السورة');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

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

  const goToNextPage = useCallback(() => {
    if (currentPage < 604) {
      loadPage(currentPage + 1);
    }
  }, [currentPage, loadPage]);

  const goToPrevPage = useCallback(() => {
    if (currentPage > 1) {
      loadPage(currentPage - 1);
    }
  }, [currentPage, loadPage]);

  const toggleViewMode = useCallback(() => {
    setViewMode((prev) => (prev === 'page' ? 'verses' : 'page'));
  }, []);

  useEffect(() => {
    loadSurah(1);
  }, []);

  return {
    currentSurah,
    currentPage,
    pageAyahs,
    tafsir,
    viewMode,
    loading,
    error,
    selectedSurahNumber,
    loadSurah,
    loadPage,
    goToNextPage,
    goToPrevPage,
    toggleViewMode,
    setViewMode,
  };
};

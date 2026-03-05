import { Surah, Ayah, QuranData } from '../types/quran';

const QURAN_API_BASE = 'https://api.alquran.cloud/v1';

export async function fetchQuranData(): Promise<QuranData> {
  const response = await fetch(`${QURAN_API_BASE}/quran/quran-uthmani`);
  const data = await response.json();
  
  if (data.code !== 200) {
    throw new Error('Failed to fetch Quran data');
  }
  
  return {
    surahs: data.data.surahs.map((surah: any) => ({
      number: surah.number,
      name: surah.name,
      englishName: surah.englishName,
      englishNameTranslation: surah.englishNameTranslation,
      revelationType: surah.revelationType,
      numberOfAyahs: surah.numberOfAyahs,
      ayahs: surah.ayahs.map((ayah: any) => ({
        number: ayah.number,
        numberInSurah: ayah.numberInSurah,
        text: ayah.text,
        page: ayah.page,
        juz: ayah.juz,
        hizbQuarter: ayah.hizbQuarter,
      })),
    })),
  };
}

export async function fetchSurah(surahNumber: number): Promise<Surah> {
  const response = await fetch(`${QURAN_API_BASE}/surah/${surahNumber}/quran-uthmani`);
  const data = await response.json();
  
  if (data.code !== 200) {
    throw new Error(`Failed to fetch surah ${surahNumber}`);
  }
  
  const surah = data.data;
  return {
    number: surah.number,
    name: surah.name,
    englishName: surah.englishName,
    englishNameTranslation: surah.englishNameTranslation,
    revelationType: surah.revelationType,
    numberOfAyahs: surah.numberOfAyahs,
    ayahs: surah.ayahs.map((ayah: any) => ({
      number: ayah.number,
      numberInSurah: ayah.numberInSurah,
      text: ayah.text,
      page: ayah.page,
      juz: ayah.juz,
      hizbQuarter: ayah.hizbQuarter,
    })),
  };
}

export async function fetchPage(pageNumber: number): Promise<Ayah[]> {
  const response = await fetch(`${QURAN_API_BASE}/page/${pageNumber}/quran-uthmani`);
  const data = await response.json();
  
  if (data.code !== 200) {
    throw new Error(`Failed to fetch page ${pageNumber}`);
  }
  
  return data.data.ayahs.map((ayah: any) => ({
    number: ayah.number,
    numberInSurah: ayah.numberInSurah,
    text: ayah.text,
    page: ayah.page,
    juz: ayah.juz,
    hizbQuarter: ayah.hizbQuarter,
    surahNumber: ayah.surah.number,
    surahName: ayah.surah.name,
  }));
}

export async function fetchTafsir(surahNumber: number, ayahNumber: number): Promise<string> {
  const response = await fetch(`${QURAN_API_BASE}/ayah/${surahNumber}:${ayahNumber}/ar.muyassar`);
  const data = await response.json();
  
  if (data.code !== 200) {
    return 'التفسير غير متوفر حالياً';
  }
  
  return data.data.text;
}

export async function fetchSurahTafsir(surahNumber: number): Promise<{ ayahNumber: number; text: string }[]> {
  const response = await fetch(`${QURAN_API_BASE}/surah/${surahNumber}/ar.muyassar`);
  const data = await response.json();
  
  if (data.code !== 200) {
    return [];
  }
  
  return data.data.ayahs.map((ayah: any) => ({
    ayahNumber: ayah.numberInSurah,
    text: ayah.text,
  }));
}

export interface Ayah {
  number: number;
  numberInSurah: number;
  text: string;
  page: number;
  juz: number;
  hizbQuarter: number;
}

export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: 'Meccan' | 'Medinan';
  numberOfAyahs: number;
  ayahs: Ayah[];
}

export interface QuranData {
  surahs: Surah[];
}

export interface TafsirAyah {
  ayahNumber: number;
  text: string;
}

export interface TafsirSurah {
  surahNumber: number;
  tafsir: TafsirAyah[];
}

export type ViewMode = 'page' | 'verses';

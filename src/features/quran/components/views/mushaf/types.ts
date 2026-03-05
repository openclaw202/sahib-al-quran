// أنواع البيانات المستخدمة في صفحة المصحف
import { Ayah } from '../../../types/quran';

// نوع الآية مع بيانات السورة الإضافية
export interface PageAyah extends Ayah {
    surahNumber?: number;
    surahName?: string;
    revelationType?: string;
}

// نوع التأمل المحفوظ
export interface Reflection {
    ayahNumber: number;
    surahNumber: number;
    text: string;
    timestamp: number;
}

// نوع لون التظليل
export interface HighlightColor {
    id: string;
    bg: string;
    dot: string;
}

// نوع قائمة الضغط المطول
export interface LongPressMenuState {
    ayah: PageAyah;
    x: number;
    y: number;
}

// أوضاع العرض المتاحة
export type MushafViewMode = 'quran' | 'tafsir' | 'reflections';

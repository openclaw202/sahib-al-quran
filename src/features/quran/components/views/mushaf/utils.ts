// دوال مساعدة لصفحة المصحف

import { SURAH_LIST } from '../../../constants/surah-list';
import { HighlightColor } from './types';

// تحويل الأرقام الإنجليزية إلى أرقام عربية
export const toArabicNumber = (num: number): string => {
    const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return num.toString().split('').map(d => arabicNumerals[parseInt(d)]).join('');
};

// صفحات بداية كل سورة في المصحف
export const SURAH_START_PAGES = [
    1, 2, 50, 77, 106, 128, 151, 177, 187, 208, 221, 235, 249, 255, 262, 267, 282, 293, 305, 312, 322, 332, 342, 350, 359, 367, 377, 385, 396, 404, 411, 415, 418, 428, 434, 440, 446, 453, 458, 467, 477, 483, 489, 496, 499, 502, 507, 511, 515, 518, 520, 523, 526, 528, 531, 534, 537, 542, 545, 549, 551, 553, 554, 556, 558, 560, 562, 564, 566, 568, 570, 572, 574, 575, 577, 578, 580, 582, 583, 585, 586, 587, 587, 589, 590, 591, 591, 592, 593, 594, 595, 595, 596, 596, 597, 597, 598, 598, 599, 599, 600, 600, 601, 601, 601, 602, 602, 602, 603, 603, 603, 604, 604, 604
];

// استخراج معلومات السورة من رقم الصفحة
export const getSurahFromPage = (page: number) => {
    let surahId = 1;
    for (let i = 0; i < SURAH_START_PAGES.length; i++) {
        if (page >= SURAH_START_PAGES[i]) {
            surahId = i + 1;
        } else {
            break;
        }
    }
    return SURAH_LIST.find(s => s.id === surahId);
};

// ألوان التظليل المتاحة
export const HIGHLIGHT_COLORS: HighlightColor[] = [
    { id: 'yellow', bg: 'bg-yellow-200/60', dot: 'bg-yellow-400' },
    { id: 'green', bg: 'bg-green-200/60', dot: 'bg-green-400' },
    { id: 'blue', bg: 'bg-blue-200/60', dot: 'bg-blue-400' },
    { id: 'pink', bg: 'bg-pink-200/60', dot: 'bg-pink-400' },
    { id: 'purple', bg: 'bg-purple-200/60', dot: 'bg-purple-400' },
];

// نص البسملة الثابت
export const BASMALA_TEXT = "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ";

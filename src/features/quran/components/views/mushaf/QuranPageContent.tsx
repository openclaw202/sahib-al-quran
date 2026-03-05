// مكوّن عرض صفحة القرآن - يعرض الآيات بخط عثماني مع البسملة والتظليل
import React from 'react';
import { PageAyah } from './types';
import { toArabicNumber, HIGHLIGHT_COLORS, BASMALA_TEXT } from './utils';

interface QuranPageContentProps {
    // آيات الصفحة الحالية
    pageAyahs: PageAyah[];
    // ألوان التظليل المحفوظة
    ayahHighlights: Record<string, string>;
    // رقم الآية المحددة للضغط المطول
    activeAyahNumber?: number;
    // معالج بدء اللمس (للضغط المطول)
    onTouchStart: (e: React.MouseEvent | React.TouchEvent, ayah: PageAyah) => void;
    // معالج انتهاء اللمس
    onTouchEnd: (ayah: PageAyah) => void;
}


// ===== مكوّن البسملة العادية (لغير الفاتحة) - تظهر مركزة قبل أول آية في السورة =====
const BasmalaHeader: React.FC<{ text: string }> = ({ text }) => (
    <div className="w-full flex justify-center mb-2 clear-both select-none">
        <div className="font-uthmani text-[28px] md:text-[32px] text-[#1D1B4B] text-center leading-[1.8]">
            {text}
        </div>
    </div>
);

// ===== مكوّن بسملة الفاتحة - مع رقم الآية وتفاعل اللمس =====
interface FatihaBasmalaProps {
    ayah: PageAyah;
    basmala: string;
    highlightClass?: string;
    isActive: boolean;
    onTouchStart: (e: React.MouseEvent | React.TouchEvent, ayah: PageAyah) => void;
    onTouchEnd: (ayah: PageAyah) => void;
}

const FatihaBasmala: React.FC<FatihaBasmalaProps> = ({
    ayah,
    basmala,
    highlightClass,
    isActive,
    onTouchStart,
    onTouchEnd,
}) => {
    // الحصول على لون الخلفية من ألوان التظليل - لون أخف
    const bgClass = highlightClass ? HIGHLIGHT_COLORS.find(c => c.id === highlightClass)?.bgLight : '';
    // تفعيل التظليل إذا كانت الآية مظللة أو يتم الضغط عليها
    const activeClass = bgClass || (isActive ? 'bg-gray-100/50' : '');

    return (
        <div className="w-full flex justify-center mb-2 clear-both">
            <span
                onMouseDown={(e) => onTouchStart(e, ayah)}
                onMouseUp={() => onTouchEnd(ayah)}
                onTouchStart={(e) => onTouchStart(e, ayah)}
                onTouchEnd={() => onTouchEnd(ayah)}
                className={`inline-flex items-center justify-center cursor-pointer transition-colors duration-300 rounded-lg ${activeClass}`}
                style={{ padding: '0 8px' }}
            >
                {/* نص البسملة بنفس حجم الآيات */}
                <span className="font-uthmani text-[28px] md:text-[32px] text-[#1D1B4B] text-center leading-[1.8]">
                    {basmala}
                </span>
                {/* رقم الآية */}
                <span className="inline-flex items-center justify-center mr-1.5 text-[#1D1B4B] relative align-middle">
                    <span className="relative flex items-center justify-center w-8 h-8">
                        <span className="text-[20px] font-bold text-[#1D1B4B] font-uthmani relative z-10">
                            {toArabicNumber(ayah.numberInSurah)}
                        </span>
                    </span>
                </span>
            </span>
        </div>
    );
};

// ===== مكوّن نص الآية العادية - مع رقم الآية والتظليل =====
interface AyahSpanProps {
    ayah: PageAyah;
    ayahText: string;
    highlightClass?: string;
    isActive: boolean;
    onTouchStart: (e: React.MouseEvent | React.TouchEvent, ayah: PageAyah) => void;
    onTouchEnd: (ayah: PageAyah) => void;
}

const AyahSpan: React.FC<AyahSpanProps> = ({
    ayah,
    ayahText,
    highlightClass,
    isActive,
    onTouchStart,
    onTouchEnd,
}) => {
    // الحصول على لون الخلفية من ألوان التظليل - لون أخف
    const bgClass = highlightClass ? HIGHLIGHT_COLORS.find(c => c.id === highlightClass)?.bgLight : '';
    // تفعيل التظليل إذا كانت الآية مظللة أو يتم الضغط عليها
    const activeClass = bgClass || (isActive ? 'bg-gray-100/50' : '');

    return (
        <span
            onMouseDown={(e) => onTouchStart(e, ayah)}
            onMouseUp={() => onTouchEnd(ayah)}
            onTouchStart={(e) => onTouchStart(e, ayah)}
            onTouchEnd={() => onTouchEnd(ayah)}
            className={`inline cursor-pointer transition-all duration-300 ${activeClass} rounded-lg`}
            style={{
                boxDecorationBreak: 'clone',
                WebkitBoxDecorationBreak: 'clone',
                padding: activeClass ? '4px 8px' : '0px',
                margin: '0 2px'
            }}
        >
            {/* مسافة قبل الآية لتفادي الالتصاق الشديد بالآية السابقة */}
            {' '}
            {/* نص الآية */}
            <span className="text-[28px] md:text-[32px] text-[#1D1B4B] leading-[2.2] font-uthmani">{ayahText}</span>
            {/* رقم الآية */}
            <span className="inline-flex items-center justify-center mx-1 text-[#1D1B4B] relative align-middle">
                <span className="relative flex items-center justify-center w-8 h-8">
                    <span className="text-[20px] font-bold text-[#1D1B4B] font-uthmani relative z-10">
                        {toArabicNumber(ayah.numberInSurah)}
                    </span>
                </span>
            </span>
        </span>
    );
};

// دوال لتنظيف النص من الرموز الغريبة التي قد تظهر بين الآيات مثل ۞ أو ۝ أو رموز الوقف
const cleanStrangeSymbols = (text: string) => {
    return text.replace(/[ۖ-۩۞۝]/g, '');
};

// ===== المكوّن الرئيسي لعرض صفحة القرآن =====
export const QuranPageContent: React.FC<QuranPageContentProps> = ({
    pageAyahs,
    ayahHighlights,
    activeAyahNumber,
    onTouchStart,
    onTouchEnd,
}) => {
    return (
        // حاوية الصفحة بخط عثماني ومحاذاة من اليمين لليسار
        <div
            className="font-uthmani"
            style={{
                direction: 'rtl',
                textAlign: 'justify',
                textAlignLast: 'center',
            }}
        >
            {pageAyahs.map((ayah) => {
                // ===== منطق تحديد البسملة والنص =====
                const isFirstInSurah = ayah.numberInSurah === 1;
                const isAtTawbah = ayah.surahNumber === 9;
                const isAlFatiha = ayah.surahNumber === 1;
                const highlightKey = `${ayah.surahNumber}-${ayah.numberInSurah}`;
                const highlightClass = ayahHighlights[highlightKey];

                let ayahText = cleanStrangeSymbols(ayah.text);
                let basmala: string | null = null;

                // معالجة البسملة: إزالتها من نص الآية وعرضها بشكل منفصل
                if (isFirstInSurah && !isAtTawbah) {
                    basmala = BASMALA_TEXT;
                    
                    // استخدام regex ذكي لاقتطاع البسملة مهما كان التشكيل أو الرموز
                    // نبحث عن "بسم" ثم أي حروف (من 10 إلى 50 حرف لتغطية "الله الرحمن ال") ثم "رحيم"
                    const basmalaRegex = /^[\s\u00A0\u200Bۖ-۩۞۝]*ب[\u064B-\u065F]*س[\u064B-\u065F]*م[\u064B-\u065F]*[\s\S]{10,50}?ر[\u064B-\u065F]*ح[\u064B-\u065F]*ي[\u064B-\u065F]*م[\u064B-\u065F]*/;
                    const match = ayahText.match(basmalaRegex);
                    
                    if (match) {
                        ayahText = ayahText.substring(match[0].length);
                    } else {
                        // محاولة إضافية بالنص الحرفي في حال لم تنجح الـ Regex
                        const possibleBasmalas = [
                            BASMALA_TEXT,
                            "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
                            "بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ",
                            "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
                            "بسم الله الرحمن الرحيم",
                            "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
                            "بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ"
                        ];
                        
                        for (const b of possibleBasmalas) {
                            if (ayahText.startsWith(b)) {
                                ayahText = ayahText.substring(b.length);
                                break;
                            }
                        }
                    }
                    
                    // إزالة أي فراغات أو رموز متبقية في البداية
                    ayahText = ayahText.replace(/^[\s\u00A0\u200Bۖ-۩۞۝]+/, '');
                }

                return (
                    <React.Fragment key={ayah.number}>
                        {/* بسملة السور العادية (غير الفاتحة) */}
                        {basmala && !isAlFatiha && (
                            <BasmalaHeader text={basmala} />
                        )}

                        {/* بسملة الفاتحة مع رقم الآية */}
                        {basmala && isAlFatiha && (
                            <FatihaBasmala
                                ayah={ayah}
                                basmala={basmala}
                                highlightClass={highlightClass}
                                isActive={activeAyahNumber === ayah.number}
                                onTouchStart={onTouchStart}
                                onTouchEnd={onTouchEnd}
                            />
                        )}

                        {/* نص الآية العادي (أو باقي نص الفاتحة بعد البسملة) */}
                        {ayahText && (
                            <AyahSpan
                                ayah={ayah}
                                ayahText={ayahText}
                                highlightClass={highlightClass}
                                isActive={activeAyahNumber === ayah.number}
                                onTouchStart={onTouchStart}
                                onTouchEnd={onTouchEnd}
                            />
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
};

// مكوّن عرض صفحة القرآن - يعرض الآيات بخط عثماني مع البسملة والتظليل وشارة الإضاءة
import React from 'react';
import { Lightbulb } from 'lucide-react';
import { PageAyah } from './types';
import { toArabicNumber, HIGHLIGHT_COLORS, BASMALA_TEXT } from './utils';

interface QuranPageContentProps {
    // آيات الصفحة الحالية
    pageAyahs: PageAyah[];
    // ألوان التظليل المحفوظة
    ayahHighlights: Record<string, string>;
    // رقم الآية المفعّلة لشارة الإضاءة
    activeLightbulb: number | null;
    // معالج بدء اللمس (للضغط المطول)
    onTouchStart: (e: React.MouseEvent | React.TouchEvent, ayah: PageAyah) => void;
    // معالج انتهاء اللمس
    onTouchEnd: (ayah: PageAyah) => void;
}

// ===== مكوّن شارة الإضاءة - تظهر عند النقر على آية =====
const IdaaBadge: React.FC = () => (
    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-xl text-[#1D1B4B] px-4 py-1.5 rounded-full text-[12px] font-bold font-graphik flex items-center gap-2 whitespace-nowrap z-20 shadow-[0_10px_30px_rgba(0,0,0,0.1)] border border-yellow-100/50 animate-in fade-in zoom-in duration-300">
        <Lightbulb size={14} className="text-yellow-500" />
        <span>إضاءة</span>
    </div>
);

// ===== مكوّن البسملة العادية (لغير الفاتحة) - تظهر مركزة قبل أول آية في السورة =====
const BasmalaHeader: React.FC<{ text: string }> = ({ text }) => (
    <div className="w-full flex justify-center my-14 mb-16 clear-both select-none">
        <div className="px-16 py-8 border-y border-[#1D1B4B]/5 font-uthmani text-[42px] text-[#1D1B4B] text-center leading-relaxed bg-[#FDF8F3]/30 rounded-[40px] shadow-sm">
            {text}
        </div>
    </div>
);

// ===== مكوّن بسملة الفاتحة - مع رقم الآية وتفاعل اللمس =====
interface FatihaBasmalaProps {
    ayah: PageAyah;
    basmala: string;
    highlightClass?: string;
    isActiveLightbulb: boolean;
    onTouchStart: (e: React.MouseEvent | React.TouchEvent, ayah: PageAyah) => void;
    onTouchEnd: (ayah: PageAyah) => void;
}

const FatihaBasmala: React.FC<FatihaBasmalaProps> = ({
    ayah,
    basmala,
    highlightClass,
    isActiveLightbulb,
    onTouchStart,
    onTouchEnd,
}) => {
    // الحصول على لون الخلفية من ألوان التظليل
    const bgClass = highlightClass ? HIGHLIGHT_COLORS.find(c => c.id === highlightClass)?.bg : '';

    return (
        <div className="w-full flex justify-center my-8 mb-6 clear-both">
            <span
                onMouseDown={(e) => onTouchStart(e, ayah)}
                onMouseUp={() => onTouchEnd(ayah)}
                onTouchStart={(e) => onTouchStart(e, ayah)}
                onTouchEnd={() => onTouchEnd(ayah)}
                className={`inline-flex flex-col items-center cursor-pointer transition-all duration-300 rounded-[24px] relative ${
                    bgClass || ''
                } ${isActiveLightbulb ? 'bg-yellow-50/40 ring-1 ring-yellow-200/30' : ''}`}
                style={{ padding: '12px 24px' }}
            >
                {/* نص البسملة */}
                <span className="font-uthmani text-[38px] text-[#1D1B4B] text-center leading-tight">
                    {basmala}
                </span>
                {/* رقم الآية */}
                <span className="inline-flex items-center justify-center mt-2 text-[#1D1B4B]">
                    <span className="relative flex items-center justify-center w-10 h-10">
                        <span className="text-[24px] font-bold text-[#1D1B4B] font-uthmani relative z-10">
                            {toArabicNumber(ayah.numberInSurah)}
                        </span>
                    </span>
                </span>
                {/* شارة الإضاءة */}
                {isActiveLightbulb && <IdaaBadge />}
            </span>
        </div>
    );
};

// ===== مكوّن نص الآية العادية - مع رقم الآية والتظليل وشارة الإضاءة =====
interface AyahSpanProps {
    ayah: PageAyah;
    ayahText: string;
    highlightClass?: string;
    isActiveLightbulb: boolean;
    onTouchStart: (e: React.MouseEvent | React.TouchEvent, ayah: PageAyah) => void;
    onTouchEnd: (ayah: PageAyah) => void;
}

const AyahSpan: React.FC<AyahSpanProps> = ({
    ayah,
    ayahText,
    highlightClass,
    isActiveLightbulb,
    onTouchStart,
    onTouchEnd,
}) => {
    // الحصول على لون الخلفية من ألوان التظليل
    const bgClass = highlightClass ? HIGHLIGHT_COLORS.find(c => c.id === highlightClass)?.bg : '';

    return (
        <span
            onMouseDown={(e) => onTouchStart(e, ayah)}
            onMouseUp={() => onTouchEnd(ayah)}
            onTouchStart={(e) => onTouchStart(e, ayah)}
            onTouchEnd={() => onTouchEnd(ayah)}
            className={`inline-block cursor-pointer transition-all duration-300 rounded-[16px] relative ${
                bgClass || ''
            } ${isActiveLightbulb ? 'bg-yellow-50/40 ring-1 ring-yellow-200/30' : ''}`}
            style={{
                padding: '6px 12px',
                margin: '2px 1px'
            }}
        >
            {/* نص الآية */}
            <span className="text-[28px] md:text-[32px] text-[#1D1B4B] leading-[1.8] font-uthmani">{ayahText}</span>
            {/* رقم الآية */}
            <span className="inline-flex items-center justify-center mx-1.5 text-[#1D1B4B] relative align-middle">
                <span className="relative flex items-center justify-center w-10 h-10">
                    <span className="text-[24px] font-bold text-[#1D1B4B] font-uthmani relative z-10">
                        {toArabicNumber(ayah.numberInSurah)}
                    </span>
                </span>
            </span>
            {/* شارة الإضاءة */}
            {isActiveLightbulb && <IdaaBadge />}
        </span>
    );
};

// ===== المكوّن الرئيسي لعرض صفحة القرآن =====
export const QuranPageContent: React.FC<QuranPageContentProps> = ({
    pageAyahs,
    ayahHighlights,
    activeLightbulb,
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

                let ayahText = ayah.text;
                let basmala: string | null = null;

                // معالجة البسملة: إزالتها من نص الآية وعرضها بشكل منفصل
                if (isFirstInSurah && !isAtTawbah) {
                    const cleanAyahText = ayahText.trim().replace(/[ۖ-۩]/g, '');

                    if (isAlFatiha) {
                        // الفاتحة: الآية الأولى هي البسملة نفسها
                        basmala = BASMALA_TEXT;
                        if (cleanAyahText.includes(BASMALA_TEXT)) {
                            ayahText = ayahText.replace(BASMALA_TEXT, "").trim();
                        }
                        if (!ayahText) ayahText = "";
                    } else {
                        // باقي السور: إزالة البسملة من بداية النص
                        basmala = BASMALA_TEXT;
                        if (ayahText.startsWith(BASMALA_TEXT)) {
                            ayahText = ayahText.substring(BASMALA_TEXT.length).trim();
                        }
                    }
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
                                isActiveLightbulb={activeLightbulb === ayah.number}
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
                                isActiveLightbulb={activeLightbulb === ayah.number}
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

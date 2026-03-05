// مكوّن عرض التفسير - يعرض كل آية مع تفسيرها أسفلها
import React from 'react';
import { PageAyah } from './types';
import { toArabicNumber } from './utils';

interface TafsirPageContentProps {
    // آيات الصفحة الحالية
    pageAyahs: PageAyah[];
    // بيانات التفسير (رقم الآية -> نص التفسير)
    tafsirData: Record<number, string>;
}

export const TafsirPageContent: React.FC<TafsirPageContentProps> = ({
    pageAyahs,
    tafsirData,
}) => {
    return (
        <div className="space-y-8">
            {pageAyahs.map((ayah) => (
                <div key={ayah.number} className="space-y-4">
                    {/* نص الآية بالخط العثماني */}
                    <div className="text-right" style={{ direction: 'rtl' }}>
                        <p className="text-[24px] md:text-[28px] text-[#1D1B4B] leading-[2.5] text-justify font-uthmani" style={{ textAlignLast: 'right' }}>
                            {ayah.text}
                            {/* رقم الآية */}
                            <span className="inline-flex items-center justify-center mx-2 text-[#1D1B4B] relative align-middle">
                                <span className="relative flex items-center justify-center w-12 h-12">
                                    <span className="text-[28px] font-bold text-[#1D1B4B] font-uthmani relative z-10">
                                        {toArabicNumber(ayah.numberInSurah)}
                                    </span>
                                </span>
                            </span>
                        </p>
                    </div>
                    {/* صندوق التفسير */}
                    <div className="bg-[#FDF8F3] rounded-2xl p-4 border border-[#F5EDE4]">
                        <p className="text-[14px] text-gray-600 leading-[1.8] text-right font-graphik">
                            {tafsirData[ayah.numberInSurah] || 'جاري تحميل التفسير...'}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

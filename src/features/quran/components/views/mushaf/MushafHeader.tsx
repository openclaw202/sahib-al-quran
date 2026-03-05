// مكوّن رأس صفحة المصحف - يعرض اسم السورة ونوع النزول وزر فتح قائمة السور
import React from 'react';
import { ChevronDown } from 'lucide-react';

interface MushafHeaderProps {
    // اسم السورة الحالية
    surahName?: string;
    // نوع النزول (مكية / مدنية)
    revelationType?: string;
    // فتح/إغلاق قائمة السور
    onToggleSurahList: () => void;
}

export const MushafHeader: React.FC<MushafHeaderProps> = ({
    surahName,
    revelationType,
    onToggleSurahList,
}) => {
    return (
        // شريط الرأس الثابت أعلى الصفحة
        <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between bg-white sticky top-0 z-40">
            {/* الجانب الأيمن: اسم السورة وسهم القائمة */}
            <div className="flex-1 text-right">
                <button
                    onClick={onToggleSurahList}
                    className="flex items-center gap-2 hover:bg-gray-50 px-2 py-1 rounded-lg transition-colors"
                >
                    <span className="text-[20px] text-[#1D1B4B] font-uthmani pt-1">{surahName}</span>
                    <ChevronDown size={18} className="text-[#D4AF37]" />
                </button>
            </div>

            {/* الجانب الأيسر: نوع النزول */}
            <div className="flex-1 text-left">
                <span className="text-[16px] text-[#D4AF37] font-uthmani pt-1 inline-block">
                    {revelationType}
                </span>
            </div>
        </div>
    );
};

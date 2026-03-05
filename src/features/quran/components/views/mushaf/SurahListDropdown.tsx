// مكوّن قائمة السور المنسدلة - يعرض شبكة السور مع بحث للتنقل السريع
import React from 'react';
import { Search } from 'lucide-react';
import { toArabicNumber } from './utils';

interface SurahItem {
    id: number;
    name: string;
}

interface SurahListDropdownProps {
    // هل القائمة مفتوحة
    isOpen: boolean;
    // نص البحث الحالي
    searchQuery: string;
    // تغيير نص البحث
    onSearchChange: (query: string) => void;
    // إغلاق القائمة
    onClose: () => void;
    // قائمة السور المفلترة
    filteredSurahs: SurahItem[];
    // اختيار سورة
    onSurahSelect: (surahId: number) => void;
}

export const SurahListDropdown: React.FC<SurahListDropdownProps> = ({
    isOpen,
    searchQuery,
    onSearchChange,
    onClose,
    filteredSurahs,
    onSurahSelect,
}) => {
    // لا يُعرض إذا كانت القائمة مغلقة
    if (!isOpen) return null;

    return (
        // طبقة ملء الشاشة لقائمة السور
        <div className="fixed inset-0 z-50 flex flex-col bg-white animate-in slide-in-from-top duration-300">
            {/* شريط البحث وزر الإلغاء */}
            <div className="p-4 border-b border-gray-100 flex items-center gap-4">
                <div className="relative flex-1">
                    {/* أيقونة البحث */}
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    {/* حقل إدخال البحث */}
                    <input
                        type="text"
                        placeholder="ابحث عن سورة..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full pr-10 pl-4 py-2.5 bg-gray-50 rounded-xl text-right focus:outline-none font-graphik"
                    />
                </div>
                {/* زر إلغاء البحث وإغلاق القائمة */}
                <button
                    onClick={onClose}
                    className="text-[#1D1B4B] font-bold font-graphik"
                >
                    إلغاء
                </button>
            </div>

            {/* شبكة السور - عمودين */}
            <div className="flex-1 overflow-y-auto p-2">
                <div className="grid grid-cols-2 gap-2">
                    {filteredSurahs.map(surah => (
                        <button
                            key={surah.id}
                            onClick={() => onSurahSelect(surah.id)}
                            className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-[#FDF8F3] transition-colors text-right"
                        >
                            {/* رقم السورة بالعربية */}
                            <span className="text-[12px] text-gray-400 font-bold font-graphik">{toArabicNumber(surah.id)}</span>
                            {/* اسم السورة */}
                            <span className="text-[16px] font-black text-[#1D1B4B] font-graphik">{surah.name}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

// مكوّن شريط التمرير السفلي - يعرض رقم الصفحة واسم السورة وشريط التنقل بين الصفحات
import React from 'react';
import { MoreVertical } from 'lucide-react';
import { toArabicNumber } from './utils';

interface SurahInfo {
    id: number;
    name: string;
}

interface PageSliderProps {
    // رقم الصفحة الحالية
    currentPage: number;
    // معلومات السورة الحالية (من شريط التمرير)
    sliderSurahInfo: SurahInfo | undefined;
    // هل قائمة الخيارات مفتوحة
    isMenuOpen: boolean;
    // فتح/إغلاق قائمة الخيارات
    onToggleMenu: () => void;
    // معالج تغيير شريط التمرير
    onSliderChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    // معالج إفلات شريط التمرير
    onSliderRelease: () => void;
}

export const PageSlider: React.FC<PageSliderProps> = ({
    currentPage,
    sliderSurahInfo,
    isMenuOpen,
    onToggleMenu,
    onSliderChange,
    onSliderRelease,
}) => {
    return (
        // الشريط السفلي الثابت
        <div className="fixed bottom-[75px] lg:bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-4 z-30 font-graphik">
            <div className="max-w-[500px] mx-auto space-y-4">
                {/* شريط المعلومات: رقم الصفحة - اسم السورة - رقم السورة */}
                <div className="flex items-center justify-between text-[#1D1B4B]">
                    {/* الجانب الأيمن: رقم الصفحة */}
                    <div className="flex items-center gap-1.5 flex-1 justify-start">
                        <span className="text-[12px] text-gray-400 font-bold">صفحة</span>
                        <span className="text-[14px] font-black">{toArabicNumber(currentPage)}</span>
                    </div>

                    {/* المنتصف: اسم السورة */}
                    <div className="flex items-center justify-center flex-1">
                        <span className="text-[15px] font-black">{sliderSurahInfo?.name}</span>
                    </div>

                    {/* الجانب الأيسر: رقم السورة */}
                    <div className="flex items-center gap-1.5 flex-1 justify-end">
                        <span className="text-[12px] text-gray-400 font-bold">رقم السورة</span>
                        <span className="text-[14px] font-black">{sliderSurahInfo ? toArabicNumber(sliderSurahInfo.id) : ''}</span>
                    </div>
                </div>

                {/* شريط التمرير وزر الخيارات */}
                <div className="flex items-center gap-4">
                    {/* شريط التمرير */}
                    <div className="flex-1 relative pt-1 order-last">
                        <input
                            type="range"
                            min="1"
                            max="604"
                            value={currentPage}
                            onChange={onSliderChange}
                            onMouseUp={onSliderRelease}
                            onTouchEnd={onSliderRelease}
                            className="w-full h-2 bg-gray-100 rounded-full appearance-none cursor-pointer slider-rtl"
                            style={{ direction: 'rtl' }}
                        />
                    </div>

                    {/* زر فتح قائمة الخيارات */}
                    <button
                        onClick={onToggleMenu}
                        className={`p-2.5 rounded-xl transition-all order-first ${
                            isMenuOpen
                            ? 'bg-[#1D1B4B] text-white shadow-lg'
                            : 'bg-gray-50 text-gray-400 border border-gray-100 hover:bg-gray-100'
                        }`}
                        title="عرض الخيارات"
                    >
                        <MoreVertical size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

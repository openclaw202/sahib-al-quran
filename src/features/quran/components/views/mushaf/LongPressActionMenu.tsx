// مكوّن قائمة الإجراءات عند الضغط المطول - يعرض خيارات المفضلة والتظليل والنسخ والمشاركة والتأمل
import React from 'react';
import { Heart, Highlighter, Copy, Share2, BookMarked, X } from 'lucide-react';
import { PageAyah, LongPressMenuState, MushafViewMode } from './types';
import { HIGHLIGHT_COLORS } from './utils';

interface LongPressActionMenuProps {
    // حالة قائمة الضغط المطول (الآية والموقع)
    longPressMenu: LongPressMenuState | null;
    // إغلاق القائمة
    onClose: () => void;
    // هل منتقي الألوان مفتوح
    showColorPicker: boolean;
    // فتح/إغلاق منتقي الألوان
    setShowColorPicker: (show: boolean) => void;
    // التحقق من كون الآية مفضلة
    isFavorite: (surahNum: number, ayahNum: number) => boolean;
    // تبديل حالة المفضلة
    onToggleFavorite: (surahNum: number, ayahNum: number) => void;
    // تظليل الآية بلون محدد
    onToggleHighlight: (surahNum: number, ayahNum: number, colorId: string) => void;
    // إزالة التظليل عن الآية
    onRemoveHighlight: (surahNum: number, ayahNum: number) => void;
    // نسخ نص الآية
    onCopyAyah: (ayah: PageAyah) => void;
    // مشاركة نص الآية
    onShareAyah: (ayah: PageAyah) => void;
    // تغيير وضع العرض
    setViewMode: (mode: MushafViewMode) => void;
    // تفعيل آية لإضافة تأمل
    setActiveAyahForReflection: (ayahNum: number | null) => void;
}

export const LongPressActionMenu: React.FC<LongPressActionMenuProps> = ({
    longPressMenu,
    onClose,
    showColorPicker,
    setShowColorPicker,
    isFavorite,
    onToggleFavorite,
    onToggleHighlight,
    onRemoveHighlight,
    onCopyAyah,
    onShareAyah,
    setViewMode,
    setActiveAyahForReflection,
}) => {
    // لا يُعرض إذا لم تكن هناك قائمة مفتوحة
    if (!longPressMenu) return null;

    const { ayah } = longPressMenu;
    const surahNum = ayah.surahNumber || 0;
    const ayahNum = ayah.numberInSurah;
    const isAyahFavorite = isFavorite(surahNum, ayahNum);

    return (
        <>
            {/* طبقة شفافة لإغلاق القائمة عند النقر خارجها */}
            <div
                className="fixed inset-0 z-[60]"
                onClick={onClose}
            />

            {/* صندوق القائمة - يتموضع بالقرب من مكان الضغط */}
            <div
                className="fixed z-[70] animate-in fade-in zoom-in duration-300"
                style={{
                    left: Math.max(20, Math.min(window.innerWidth - 240, longPressMenu.x - 110)),
                    top: Math.max(20, Math.min(window.innerHeight - 280, longPressMenu.y - 140))
                }}
            >
                <div className="bg-white/90 backdrop-blur-xl rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-white/50 p-2.5 min-w-[220px]">
                    {!showColorPicker ? (
                        // ===== قائمة الإجراءات الرئيسية =====
                        <div className="space-y-1">
                            {/* زر المفضلة */}
                            <button
                                onClick={() => {
                                    onToggleFavorite(surahNum, ayahNum);
                                    onClose();
                                }}
                                className="w-full flex items-center justify-between p-3.5 rounded-2xl hover:bg-black/5 transition-all group"
                            >
                                <span className="text-[14px] font-bold font-graphik text-[#1D1B4B]">
                                    {isAyahFavorite ? 'إزالة من المفضلة' : 'إضافة للمفضلة'}
                                </span>
                                <div className={`p-2 rounded-xl transition-all ${isAyahFavorite ? 'bg-red-50 text-red-500' : 'bg-gray-50 text-gray-400 group-hover:bg-red-50 group-hover:text-red-400'}`}>
                                    <Heart
                                        size={18}
                                        fill={isAyahFavorite ? 'currentColor' : 'none'}
                                    />
                                </div>
                            </button>

                            {/* زر التظليل */}
                            <button
                                onClick={() => setShowColorPicker(true)}
                                className="w-full flex items-center justify-between p-3.5 rounded-2xl hover:bg-black/5 transition-all group"
                            >
                                <span className="text-[14px] font-bold font-graphik text-[#1D1B4B]">تظليل الآية</span>
                                <div className="p-2 rounded-xl bg-gray-50 text-gray-400 group-hover:bg-yellow-50 group-hover:text-yellow-500 transition-all">
                                    <Highlighter size={12} />
                                </div>
                            </button>

                            {/* زر النسخ */}
                            <button
                                onClick={() => {
                                    onCopyAyah(ayah);
                                    onClose();
                                }}
                                className="w-full flex items-center justify-between p-3.5 rounded-2xl hover:bg-black/5 transition-all group"
                            >
                                <span className="text-[14px] font-bold font-graphik text-[#1D1B4B]">نسخ الآية</span>
                                <div className="p-2 rounded-xl bg-gray-50 text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-all">
                                    <Copy size={12} />
                                </div>
                            </button>

                            {/* زر المشاركة */}
                            <button
                                onClick={() => {
                                    onShareAyah(ayah);
                                    onClose();
                                }}
                                className="w-full flex items-center justify-between p-3.5 rounded-2xl hover:bg-black/5 transition-all group"
                            >
                                <span className="text-[14px] font-bold font-graphik text-[#1D1B4B]">مشاركة</span>
                                <div className="p-2 rounded-xl bg-gray-50 text-gray-400 group-hover:bg-green-50 group-hover:text-green-500 transition-all">
                                    <Share2 size={18} />
                                </div>
                            </button>

                            {/* زر إضافة تأمل */}
                            <button
                                onClick={() => {
                                    setViewMode('reflections');
                                    setActiveAyahForReflection(ayahNum);
                                    onClose();
                                }}
                                className="w-full flex items-center justify-between p-3.5 rounded-2xl hover:bg-black/5 transition-all group"
                            >
                                <span className="text-[14px] font-bold font-graphik text-[#1D1B4B]">إضافة تأمل</span>
                                <div className="p-2 rounded-xl bg-gray-50 text-gray-400 group-hover:bg-indigo-50 group-hover:text-indigo-500 transition-all">
                                    <BookMarked size={18} />
                                </div>
                            </button>
                        </div>
                    ) : (
                        // ===== منتقي ألوان التظليل =====
                        <div className="p-3">
                            {/* رأس منتقي الألوان */}
                            <div className="flex items-center justify-between mb-4 px-1">
                                <button onClick={() => setShowColorPicker(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 transition-colors">
                                    <X size={18} />
                                </button>
                                <span className="text-[13px] font-bold font-graphik text-gray-600">اختر لون التظليل</span>
                            </div>
                            {/* شبكة الألوان */}
                            <div className="grid grid-cols-3 gap-3">
                                {HIGHLIGHT_COLORS.map(color => (
                                    <button
                                        key={color.id}
                                        onClick={() => {
                                            onToggleHighlight(surahNum, ayahNum, color.id);
                                            onClose();
                                        }}
                                        className={`w-full aspect-square rounded-2xl ${color.dot} border-4 border-white shadow-sm hover:scale-105 active:scale-95 transition-all`}
                                    />
                                ))}
                                {/* زر إزالة التظليل */}
                                <button
                                    onClick={() => {
                                        onRemoveHighlight(surahNum, ayahNum);
                                        onClose();
                                    }}
                                    className="w-full aspect-square rounded-2xl bg-gray-100 border-4 border-white shadow-sm flex items-center justify-center text-gray-400 hover:scale-105 active:scale-95 transition-all"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

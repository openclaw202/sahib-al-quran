// مكوّن قائمة أوضاع العرض - يسمح بالتبديل بين المصحف والتفسير والتأملات
import React from 'react';
import { BookOpen, ScrollText, MessageSquare } from 'lucide-react';
import { MushafViewMode } from './types';

interface ViewModeMenuProps {
    // هل القائمة مفتوحة
    isOpen: boolean;
    // إغلاق القائمة
    onClose: () => void;
    // وضع العرض الحالي
    viewMode: MushafViewMode;
    // تغيير وضع العرض
    setViewMode: (mode: MushafViewMode) => void;
    // إعادة تحميل الصفحة الحالية (للتفسير)
    onReloadPage: () => void;
}

export const ViewModeMenu: React.FC<ViewModeMenuProps> = ({
    isOpen,
    onClose,
    viewMode,
    setViewMode,
    onReloadPage,
}) => {
    // لا يُعرض إذا كانت القائمة مغلقة
    if (!isOpen) return null;

    return (
        <>
            {/* طبقة خلفية شبه شفافة لإغلاق القائمة */}
            <div
                className="fixed inset-0 bg-black/20 z-[45] animate-in fade-in duration-200"
                onClick={onClose}
            />

            {/* صندوق القائمة */}
            <div className="fixed bottom-[140px] left-6 right-6 max-w-[500px] mx-auto bg-white rounded-[32px] shadow-2xl z-[50] overflow-hidden animate-in slide-in-from-bottom-8 duration-300">
                <div className="p-2 space-y-1">
                    {/* زر وضع المصحف الشريف */}
                    <button
                        onClick={() => {
                            setViewMode('quran');
                            onClose();
                        }}
                        className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${
                            viewMode === 'quran' ? 'bg-[#FDF8F3] text-[#1D1B4B]' : 'hover:bg-gray-50 text-gray-600'
                        }`}
                    >
                        <span className="text-[16px] font-black font-graphik">المصحف الشريف</span>
                        <BookOpen size={20} className={viewMode === 'quran' ? 'text-[#D4AF37]' : 'text-gray-400'} />
                    </button>

                    {/* زر وضع القراءة بالتفسير */}
                    <button
                        onClick={() => {
                            setViewMode('tafsir');
                            onClose();
                            onReloadPage();
                        }}
                        className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${
                            viewMode === 'tafsir' ? 'bg-[#FDF8F3] text-[#1D1B4B]' : 'hover:bg-gray-50 text-gray-600'
                        }`}
                    >
                        <span className="text-[16px] font-black font-graphik">القراءة بالتفسير</span>
                        <ScrollText size={20} className={viewMode === 'tafsir' ? 'text-[#D4AF37]' : 'text-gray-400'} />
                    </button>

                    {/* زر وضع التأملات */}
                    <button
                        onClick={() => {
                            setViewMode('reflections');
                            onClose();
                        }}
                        className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${
                            viewMode === 'reflections' ? 'bg-[#FDF8F3] text-[#1D1B4B]' : 'hover:bg-gray-50 text-gray-600'
                        }`}
                    >
                        <span className="text-[16px] font-black font-graphik">تأملاتي</span>
                        <MessageSquare size={20} className={viewMode === 'reflections' ? 'text-[#D4AF37]' : 'text-gray-400'} />
                    </button>
                </div>
            </div>
        </>
    );
};

// مكوّن عرض الإضاءات - يعرض الإضاءات المحفوظة مع إمكانية إضافة إضاءة جديدة
import React, { useState, useEffect } from 'react';
import { ArrowRight, Plus, X, Lightbulb, BookOpen } from 'lucide-react';

// نوع الإضاءة المحفوظة
interface Idaa {
    id: string;
    text: string;
    ayahNumber: number;
    surahNumber: number;
    surahName: string;
    ayahText: string;
    timestamp: number;
}

interface IdaatViewProps {
    onBack: () => void;
}

// مفتاح التخزين المحلي
const IDAAT_STORAGE_KEY = 'sahib-quran-idaat';

export const IdaatView: React.FC<IdaatViewProps> = ({ onBack }) => {
    // حالة الإضاءات المحفوظة
    const [idaat, setIdaat] = useState<Idaa[]>([]);
    // حالة المودال
    const [showModal, setShowModal] = useState(false);
    // حالة النص الجديد
    const [newIdaaText, setNewIdaaText] = useState('');
    // حالة رقم السورة والآية
    const [surahNumber, setSurahNumber] = useState('');
    const [ayahNumber, setAyahNumber] = useState('');

    // تحميل الإضاءات من التخزين المحلي
    useEffect(() => {
        const stored = localStorage.getItem(IDAAT_STORAGE_KEY);
        if (stored) {
            try {
                setIdaat(JSON.parse(stored));
            } catch {
                setIdaat([]);
            }
        }
    }, []);

    // حفظ الإضاءات في التخزين المحلي
    const saveIdaat = (newIdaat: Idaa[]) => {
        setIdaat(newIdaat);
        localStorage.setItem(IDAAT_STORAGE_KEY, JSON.stringify(newIdaat));
    };

    // إضافة إضاءة جديدة
    const handleAddIdaa = () => {
        if (!newIdaaText.trim() || !surahNumber || !ayahNumber) return;

        const newIdaa: Idaa = {
            id: Date.now().toString(),
            text: newIdaaText.trim(),
            ayahNumber: parseInt(ayahNumber),
            surahNumber: parseInt(surahNumber),
            surahName: `سورة ${surahNumber}`,
            ayahText: `الآية ${ayahNumber}`,
            timestamp: Date.now(),
        };

        saveIdaat([newIdaa, ...idaat]);
        setNewIdaaText('');
        setSurahNumber('');
        setAyahNumber('');
        setShowModal(false);
    };

    // حذف إضاءة
    const handleDeleteIdaa = (id: string) => {
        saveIdaat(idaat.filter(i => i.id !== id));
    };

    // تحويل الأرقام إلى عربية
    const toArabicNumber = (num: number): string => {
        const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
        return num.toString().split('').map(d => arabicNumerals[parseInt(d)]).join('');
    };

    return (
        <div className="flex flex-col h-full bg-gradient-to-b from-[#FFFBF5] to-white">
            {/* الهيدر */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
                <button
                    onClick={onBack}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm"
                >
                    <ArrowRight size={20} className="text-[#1D1B4B]" />
                </button>
                <h1 className="text-lg font-bold text-[#1D1B4B]">إضاءات</h1>
                <div className="w-10" />
            </div>

            {/* المحتوى */}
            <div className="flex-1 overflow-y-auto px-4 py-6">
                {idaat.length === 0 ? (
                    // حالة عدم وجود إضاءات
                    <div className="flex flex-col items-center justify-center h-full text-center">
                        <div className="w-20 h-20 rounded-full bg-yellow-100 flex items-center justify-center mb-4">
                            <Lightbulb size={40} className="text-yellow-500" />
                        </div>
                        <h2 className="text-xl font-bold text-[#1D1B4B] mb-2">لا توجد إضاءات بعد</h2>
                        <p className="text-gray-500 text-sm mb-6">
                            أضف إضاءاتك وتأملاتك في آيات القرآن الكريم
                        </p>
                    </div>
                ) : (
                    // عرض الإضاءات
                    <div className="space-y-4">
                        {idaat.map((idaa) => (
                            <div
                                key={idaa.id}
                                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
                            >
                                {/* معلومات الآية */}
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                                        <BookOpen size={14} className="text-yellow-600" />
                                    </div>
                                    <span className="text-sm font-bold text-[#1D1B4B]">
                                        سورة {toArabicNumber(idaa.surahNumber)} - الآية {toArabicNumber(idaa.ayahNumber)}
                                    </span>
                                    <button
                                        onClick={() => handleDeleteIdaa(idaa.id)}
                                        className="mr-auto w-6 h-6 rounded-full bg-red-50 flex items-center justify-center"
                                    >
                                        <X size={12} className="text-red-500" />
                                    </button>
                                </div>
                                {/* نص الإضاءة */}
                                <p className="text-[#1D1B4B] text-sm leading-relaxed">
                                    {idaa.text}
                                </p>
                                {/* التاريخ */}
                                <p className="text-gray-400 text-xs mt-3">
                                    {new Date(idaa.timestamp).toLocaleDateString('ar-EG', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* زر الإضافة */}
            <div className="px-4 pb-6">
                <button
                    onClick={() => setShowModal(true)}
                    className="w-full py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-yellow-200/50"
                >
                    <Plus size={20} />
                    <span>إضافة إضاءة</span>
                </button>
            </div>

            {/* المودال */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50">
                    <div className="bg-white w-full max-w-md rounded-t-3xl p-6 animate-in slide-in-from-bottom duration-300">
                        {/* هيدر المودال */}
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold text-[#1D1B4B]">إضافة إضاءة جديدة</h2>
                            <button
                                onClick={() => setShowModal(false)}
                                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                            >
                                <X size={16} className="text-gray-500" />
                            </button>
                        </div>

                        {/* حقول الإدخال */}
                        <div className="space-y-4">
                            {/* رقم السورة والآية */}
                            <div className="flex gap-3">
                                <div className="flex-1">
                                    <label className="block text-sm font-bold text-gray-600 mb-2">رقم السورة</label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="114"
                                        value={surahNumber}
                                        onChange={(e) => setSurahNumber(e.target.value)}
                                        placeholder="١"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-right focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-sm font-bold text-gray-600 mb-2">رقم الآية</label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={ayahNumber}
                                        onChange={(e) => setAyahNumber(e.target.value)}
                                        placeholder="١"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-right focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                                    />
                                </div>
                            </div>

                            {/* نص الإضاءة */}
                            <div>
                                <label className="block text-sm font-bold text-gray-600 mb-2">الإضاءة</label>
                                <textarea
                                    value={newIdaaText}
                                    onChange={(e) => setNewIdaaText(e.target.value)}
                                    placeholder="اكتب إضاءتك هنا..."
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-right resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                                />
                            </div>
                        </div>

                        {/* زر الحفظ */}
                        <button
                            onClick={handleAddIdaa}
                            disabled={!newIdaaText.trim() || !surahNumber || !ayahNumber}
                            className="w-full mt-6 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-bold rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            حفظ الإضاءة
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

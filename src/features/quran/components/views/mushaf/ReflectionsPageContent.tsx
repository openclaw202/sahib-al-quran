// مكوّن عرض التأملات - يعرض كل آية مع تأملات المستخدم وإمكانية إضافة تأمل جديد
import React from 'react';
import { ScrollText, MessageSquare, X, Send } from 'lucide-react';
import { PageAyah, Reflection } from './types';
import { toArabicNumber } from './utils';

interface ReflectionsPageContentProps {
    // آيات الصفحة الحالية
    pageAyahs: PageAyah[];
    // قائمة التأملات المحفوظة
    reflections: Reflection[];
    // رقم الآية المفعّلة لإضافة تأمل
    activeAyahForReflection: number | null;
    // تفعيل آية لإضافة تأمل
    setActiveAyahForReflection: (ayahNum: number | null) => void;
    // نص التأمل الجديد
    newReflection: string;
    // تغيير نص التأمل الجديد
    setNewReflection: (text: string) => void;
    // حفظ التأمل
    onSaveReflection: () => void;
}

export const ReflectionsPageContent: React.FC<ReflectionsPageContentProps> = ({
    pageAyahs,
    reflections,
    activeAyahForReflection,
    setActiveAyahForReflection,
    newReflection,
    setNewReflection,
    onSaveReflection,
}) => {
    return (
        <div className="space-y-8">
            {pageAyahs.map((ayah) => {
                // تصفية التأملات الخاصة بهذه الآية
                const ayahReflections = reflections.filter(r =>
                    r.ayahNumber === ayah.numberInSurah &&
                    r.surahNumber === ayah.surahNumber
                );

                return (
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

                        {/* عرض التأملات المحفوظة لهذه الآية */}
                        {ayahReflections.map((ref, idx) => (
                            <div key={idx} className="bg-[#EBF5FF] rounded-2xl p-4 border border-[#D1E9FF]">
                                <div className="flex items-center gap-2 mb-1 text-[#0066CC]">
                                    <MessageSquare size={14} />
                                    <span className="text-[12px] font-bold font-graphik">تأملاتي</span>
                                </div>
                                <p className="text-[14px] text-[#003366] leading-[1.8] text-right font-graphik">
                                    {ref.text}
                                </p>
                            </div>
                        ))}

                        {/* حقل إدخال تأمل جديد أو زر الإضافة */}
                        {activeAyahForReflection === ayah.numberInSurah ? (
                            // نموذج إدخال التأمل الجديد
                            <div className="bg-white rounded-2xl p-4 border-2 border-[#D4AF37] shadow-lg animate-in fade-in zoom-in duration-200">
                                <textarea
                                    autoFocus
                                    value={newReflection}
                                    onChange={(e) => setNewReflection(e.target.value)}
                                    placeholder="اكتب تأملك هنا..."
                                    className="w-full bg-transparent border-none focus:ring-0 text-right text-[14px] font-graphik resize-none"
                                    rows={3}
                                />
                                <div className="flex items-center justify-between mt-2">
                                    {/* زر الإلغاء */}
                                    <button
                                        onClick={() => setActiveAyahForReflection(null)}
                                        className="p-1.5 text-gray-400 hover:text-red-500"
                                    >
                                        <X size={20} />
                                    </button>
                                    {/* زر الحفظ */}
                                    <button
                                        onClick={onSaveReflection}
                                        disabled={!newReflection.trim()}
                                        className="flex items-center gap-2 px-4 py-1.5 bg-[#D4AF37] text-white rounded-xl text-[13px] font-bold disabled:opacity-50"
                                    >
                                        <span>حفظ التأمل</span>
                                        <Send size={14} />
                                    </button>
                                </div>
                            </div>
                        ) : (
                            // زر إضافة تأمل جديد
                            <button
                                onClick={() => setActiveAyahForReflection(ayah.numberInSurah)}
                                className="w-full py-3 px-4 rounded-2xl border border-dashed border-gray-300 text-gray-400 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all flex items-center justify-center gap-2 text-[14px] font-graphik"
                            >
                                <ScrollText size={18} />
                                <span>أضف تأملاً لهذه الآية</span>
                            </button>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

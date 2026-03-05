import React from 'react';
import { Heart } from 'lucide-react';
import { useSupplicationsView } from '../../hooks/useSupplicationsView';

const QURANIC_SUPPLICATIONS = [
    { text: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ', ref: 'سورة البقرة - ٢٠١' },
    { text: 'رَبَّنَا لاَ تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِن لَّدُنكَ رَحْمَةً', ref: 'سورة آل عمران - ٨' },
    { text: 'رَبِّ اجْعَلْنِي مُقِيمَ الصَّلاةِ وَمِن ذُرِّيَّتِي رَبَّنَا وَتَقَبَّلْ دُعَاء', ref: 'سورة إبراهيم - ٤٠' },
];

export const SupplicationsView: React.FC = () => {
    const { suppType, setSuppType } = useSupplicationsView();

    return (
        <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 max-w-[450px] mx-auto">
            <div className="mb-8 text-right">
                <span className="text-[10px] font-black text-[#FF6B6B] uppercase tracking-widest mb-2 block">التقرب إلى الله</span>
                <h2 className="text-3xl font-black text-[#1D1B4B] mb-6">أدعية القرآن</h2>

                <div className="flex bg-gray-50 p-1.5 rounded-2xl mb-8">
                    <button
                        onClick={() => setSuppType('quranic')}
                        className={`flex-1 py-2.5 rounded-xl text-[11px] font-bold transition-all ${suppType === 'quranic' ? 'bg-white text-[#1D1B4B] shadow-sm' : 'text-gray-400'}`}
                    >
                        أدعية قرآنية
                    </button>
                    <button
                        onClick={() => setSuppType('prophetic')}
                        className={`flex-1 py-2.5 rounded-xl text-[11px] font-bold transition-all ${suppType === 'prophetic' ? 'bg-white text-[#1D1B4B] shadow-sm' : 'text-gray-400'}`}
                    >
                        أدعية نبوية
                    </button>
                </div>
            </div>

            <div className="space-y-6">
                {suppType === 'quranic' ? (
                    QURANIC_SUPPLICATIONS.map((item, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-[40px] border border-gray-100 space-y-4 shadow-sm text-center">
                            <p className="text-xl font-bold text-[#1D1B4B] leading-relaxed">"{item.text}"</p>
                            <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest block">{item.ref}</span>
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col items-center py-10 opacity-30">
                        <Heart size={48} className="mb-4" />
                        <p className="font-bold">محتوى الأدعية النبوية تحت التوثيق</p>
                    </div>
                )}
            </div>
        </div>
    );
};

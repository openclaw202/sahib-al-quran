import React from 'react';
import { useRemembrancesView } from '../../hooks/useRemembrancesView';

const REMEMBRANCES_DATA = [
    'آية الكرسي: الله لا إله إلا هو الحي القيوم',
    'آخر آيتين من سورة البقرة',
    'سورة الإخلاص والمعوذتين (٣ مرات)',
];

export const RemembrancesView: React.FC = () => {
    const { remType, setRemType } = useRemembrancesView();

    return (
        <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 max-w-[450px] mx-auto">
            <div className="mb-8 text-right">
                <span className="text-[10px] font-black text-[#49C18B] uppercase tracking-widest mb-2 block">حرز المسلم</span>
                <h2 className="text-3xl font-black text-[#1D1B4B] mb-6">أذكار القرآن</h2>

                <div className="flex bg-gray-50 p-1.5 rounded-2xl mb-8">
                    <button
                        onClick={() => setRemType('morning')}
                        className={`flex-1 py-2.5 rounded-xl text-[11px] font-bold transition-all ${remType === 'morning' ? 'bg-white text-[#1D1B4B] shadow-sm' : 'text-gray-400'}`}
                    >
                        أذكار الصباح
                    </button>
                    <button
                        onClick={() => setRemType('evening')}
                        className={`flex-1 py-2.5 rounded-xl text-[11px] font-bold transition-all ${remType === 'evening' ? 'bg-white text-[#1D1B4B] shadow-sm' : 'text-gray-400'}`}
                    >
                        أذكار المساء
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                {REMEMBRANCES_DATA.map((item, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-[32px] border border-gray-100 flex items-center gap-4 transition-all hover:border-green-100">
                        <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center text-green-600 font-black text-lg shrink-0">
                            ✨
                        </div>
                        <p className="text-sm font-bold text-[#1D1B4B] leading-snug">{item}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

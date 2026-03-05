import React from 'react';

const METHODOLOGY_STEPS = [
    'تعرف الأول: مكية ولا مدنية',
    'ما اسم السورة؟ وارتباطه بموضوعها؟ وهل لها أكثر من اسم؟',
    'هل ذكر النبي ﷺ فضلًا لها؟ ومتى كان يقرأها؟',
    'ما ترتيب نزولها؟ وترتيبها في المصحف؟',
    'ما أسباب النزول؟',
    'ما غريب الكلمات فيها؟',
    'ما الآيات عن اليوم الآخر وتفاصيله؟',
    'ما الآيات عن مفردات الإيمان والتقوى؟',
    'ما الآيات ذات الأوامر المُبشِّرة وغير المُبشِّرة؟',
    'ما الأفعال المباشرة وغير المباشرة؟',
];

export const MethodologyView: React.FC = () => (
    <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 max-w-[450px] mx-auto">
        <div className="mb-8 text-right">
            <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-2 block">المنهجية العلمية</span>
            <h2 className="text-3xl font-black text-[#1D1B4B] mb-2">📖 كيف تُصاحب سورة؟</h2>
            <p className="text-xs font-bold text-gray-400">المنهجية العشرة لإتقان فهم السور</p>
        </div>

        <div className="grid grid-cols-1 gap-3">
            {METHODOLOGY_STEPS.map((step, idx) => (
                <div key={idx} className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center gap-4 transition-all hover:border-blue-100 group">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 font-black text-sm shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        {idx + 1}
                    </div>
                    <p className="text-sm font-bold text-[#1D1B4B] leading-snug">{step}</p>
                </div>
            ))}
        </div>
    </div>
);

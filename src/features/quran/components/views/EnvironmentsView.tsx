import React from 'react';
import { useEnvironmentsView } from '../../hooks/useEnvironmentsView';

const MAKKI_DATA = [
    { title: 'الاستضعاف العام', desc: 'المسلمون كانوا يشاهدون الأصنام بأعينهم، ويُؤذَوْن أذًى شديدًا جدًا.' },
    { title: 'وجود الأصنام وصناديد كفار قريش', desc: 'تحديات بناء الهوية الإيمانية وسط بيئة معادية.' },
    { title: 'البيئة الأرقامية والمَحض التربوي', desc: 'التركيز على بناء الرشد والإدراك في دار الأرقم.' },
];

const MADANI_DATA = [
    'التمكين وبناء الدولة الإسلامية',
    'بيان الأحكام التشريعية والتفصيلية',
    'فضح المنافقين والتعامل مع أهل الكتاب',
    'الجهاد والقتال للدفاع عن العقيدة',
    'تنظيم شؤون المجتمع والأسرة',
];

export const EnvironmentsView: React.FC = () => {
    const { envType, setEnvType } = useEnvironmentsView();

    return (
        <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 max-w-[450px] mx-auto">
            <div className="mb-8 text-right">
                <span className="text-[10px] font-black text-[#F1C40F] uppercase tracking-widest mb-2 block">دراسات قرآنية</span>
                <h2 className="text-3xl font-black text-[#1D1B4B] mb-6">البيئات القرآنية</h2>

                {/* Sub-tabs */}
                <div className="flex bg-gray-50 p-1.5 rounded-2xl mb-8">
                    <button
                        onClick={() => setEnvType('makki')}
                        className={`flex-1 py-2.5 rounded-xl text-[11px] font-bold transition-all ${envType === 'makki' ? 'bg-white text-[#1D1B4B] shadow-sm' : 'text-gray-400'}`}
                    >
                        البيئة المكية
                    </button>
                    <button
                        onClick={() => setEnvType('madani')}
                        className={`flex-1 py-2.5 rounded-xl text-[11px] font-bold transition-all ${envType === 'madani' ? 'bg-white text-[#1D1B4B] shadow-sm' : 'text-gray-400'}`}
                    >
                        البيئة المدنية
                    </button>
                </div>
            </div>

            {envType === 'makki' ? (
                <div className="space-y-4">
                    {MAKKI_DATA.map((item, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-[32px] border border-gray-100 space-y-3 shadow-sm shadow-gray-100/20">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-600 font-black text-xs">
                                    {idx + 1}
                                </div>
                                <h4 className="font-black text-[#1D1B4B] text-base">{item.title}</h4>
                            </div>
                            <p className="text-[13px] font-medium text-gray-500 leading-relaxed pr-11">{item.desc}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="space-y-4">
                    {MADANI_DATA.map((item, idx) => (
                        <div key={idx} className="bg-white p-5 rounded-[32px] border border-gray-100 flex items-start gap-4 shadow-sm shadow-gray-100/20">
                            <div className="w-8 h-8 rounded-xl bg-green-50 flex items-center justify-center text-green-600 font-black text-sm shrink-0">
                                {idx + 1}
                            </div>
                            <p className="text-sm font-bold text-[#1D1B4B] leading-relaxed pt-1">{item}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

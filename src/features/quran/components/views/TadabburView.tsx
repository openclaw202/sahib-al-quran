import React from 'react';
import { SurahTabs } from '../SurahTabs';
import type { SurahDetail } from '../../types';

interface TadabburViewProps {
    surah: SurahDetail;
}

export const TadabburView: React.FC<TadabburViewProps> = ({ surah }) => (
    <div className="animate-in fade-in duration-700 max-w-[450px] mx-auto">
        <div className="mb-6 text-right">
            <h2 className="text-2xl font-black text-[#1D1B4B]">تأملات {surah.name}</h2>
            <p className="text-[10px] font-bold text-gray-400 mt-1">تصفح أسرار وإعجاز الآيات</p>
        </div>
        <SurahTabs surah={surah} />
    </div>
);

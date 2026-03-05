import React from 'react';
import {
    Bookmark, Mountain, ClipboardList, PenTool,
    MessageCircle, Heart, Moon, Lightbulb,
    BookOpen, Globe, Trophy,
} from 'lucide-react';
import { IconBubble } from '../shared/IconBubble';
import { useHomeView } from '../../hooks/useHomeView';
import type { DashboardView } from '../../types/dashboard';

interface HomeViewProps {
    onNavigate: (view: DashboardView) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
    const { activeSlide, sliderRef, handleSliderScroll } = useHomeView();

    return (
        <div className="flex-1 flex flex-col min-h-0 relative">
            {/* 1. Logo */}
            <div className="relative flex flex-col items-center mb-6 pt-4 z-10">
                <img
                    src="/images/Sahib Al Quran.png"
                    alt="صاحب القرآن"
                    className="h-28 object-contain"
                />
            </div>

            {/* 2. Hero Card */}
            <div className="relative mb-6 z-20">
                <div className="bg-white rounded-[32px] p-6 lg:p-8 border border-white shadow-lg shadow-gray-100/70">

                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full overflow-hidden border-2 border-orange-100 p-1">
                            <div className="w-full h-full rounded-full bg-gray-200 overflow-hidden">
                                <img src="/images/Sahib Al Quran.png" className="w-full h-full object-cover scale-150" alt="Avatar" />
                            </div>
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-center mb-1 px-1">
                                <span className="text-[9px] font-bold text-[#FFB84C]">خِتْمَة القرآن الكريم</span>
                                <span className="text-[9px] font-bold text-[#FFB84C]">٦٥٪</span>
                            </div>
                            <div className="h-4 w-full bg-[#FFF8E7] rounded-full relative overflow-hidden p-1">
                                <div className="h-full bg-gradient-to-r from-[#FFB84C] to-[#FFD89C] rounded-full" style={{ width: '65%' }}></div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center">
                                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                            </div>
                            <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">المستوى الأول</span>
                        </div>
                        <h2 className="text-xl lg:text-2xl font-black text-[#1D1B4B]">مرحباً، عبدالرحمن</h2>
                    </div>
                </div>
            </div>

            {/* 3. Icon Grid Slider */}
            <div className="flex-1 flex flex-col min-h-0 relative z-30 overflow-hidden">
                <div
                    ref={sliderRef}
                    onScroll={handleSliderScroll}
                    className="flex-1 overflow-x-auto scrollbar-hide snap-x snap-mandatory flex gap-4 px-2 relative w-full snap-always"
                >
                    <div className="min-w-full w-full flex justify-center py-2 h-full items-start shrink-0 snap-center">
                        <div className="grid grid-cols-4 grid-rows-3 gap-x-2 gap-y-3 px-1 w-full max-w-[360px] mx-auto">
                            <IconBubble label="التدبر" icon={<Bookmark size={20} strokeWidth={2.5} fill="currentColor" fillOpacity={0.15} />} bgColor="#F0E6FF" iconColor="#9B66FF" onClick={() => onNavigate('tadabbur')} />
                            <IconBubble label="البيئة القرآنية" icon={<Mountain size={20} strokeWidth={2.5} fill="currentColor" fillOpacity={0.15} />} bgColor="#FEF7E1" iconColor="#F1C40F" onClick={() => onNavigate('environments')} />
                            <IconBubble label="المنهجية" icon={<ClipboardList size={20} strokeWidth={2.5} fill="currentColor" fillOpacity={0.15} />} bgColor="#FFF1F1" iconColor="#FF6B6B" onClick={() => onNavigate('methodology')} />
                            <IconBubble label="تأملاتي" icon={<PenTool size={20} strokeWidth={2.5} fill="currentColor" fillOpacity={0.15} />} bgColor="#FEFBEA" iconColor="#E67E22" />

                            <IconBubble label="المجتمع" icon={<MessageCircle size={20} strokeWidth={2.5} fill="currentColor" fillOpacity={0.15} />} bgColor="#F2F3FF" iconColor="#5F27CD" />
                            <IconBubble label="أدعية القرآن" icon={<Heart size={20} strokeWidth={2.5} fill="currentColor" fillOpacity={0.15} />} bgColor="#FFF3E0" iconColor="#FF6B6B" onClick={() => onNavigate('supplications')} />
                            <IconBubble label="أذكار القرآن" icon={<Moon size={20} strokeWidth={2.5} fill="currentColor" fillOpacity={0.15} />} bgColor="#E3F9EC" iconColor="#49C18B" onClick={() => onNavigate('remembrances')} />
                            <IconBubble label="إضاءات" icon={<Lightbulb size={20} strokeWidth={2.5} fill="currentColor" fillOpacity={0.15} />} bgColor="#FFF1F1" iconColor="#FF4757" />

                            <IconBubble label="التفسير" icon={<BookOpen size={20} strokeWidth={2.5} fill="currentColor" fillOpacity={0.15} />} bgColor="#F0F8FF" iconColor="#1E90FF" />
                            <IconBubble label="قصص القرآن" icon={<Globe size={20} strokeWidth={2.5} fill="currentColor" fillOpacity={0.15} />} bgColor="#FEF7E1" iconColor="#F1C40F" />
                            <IconBubble label="مسابقات" icon={<Trophy size={20} strokeWidth={2.5} fill="currentColor" fillOpacity={0.15} />} bgColor="#F0E6FF" iconColor="#9B66FF" />
                        </div>
                    </div>
                    {/* Placeholder second page for 2 dots (Currently blank/under-dev) */}
                    <div className="min-w-full w-full flex justify-center py-2 h-full items-start shrink-0 snap-center">
                        <div className="grid grid-cols-4 grid-rows-3 gap-x-2 gap-y-3 px-1 w-full max-w-[360px] mx-auto opacity-50">
                            <div className="flex flex-col items-center justify-center p-4 col-span-4 text-xs font-bold text-gray-400">المزيد قريباً...</div>
                        </div>
                    </div>
                </div>

                {/* Pagination Dots */}
                <div className="flex justify-center gap-1.5 mt-auto pb-20 relative z-40">
                    <div className={`w-1.5 h-1.5 rounded-full transition-colors ${activeSlide === 0 ? 'bg-[#FF6B4A]' : 'bg-gray-200'}`}></div>
                    <div className={`w-1.5 h-1.5 rounded-full transition-colors ${activeSlide === 1 ? 'bg-[#FF6B4A]' : 'bg-gray-200'}`}></div>
                </div>
            </div>
        </div>
    );
};

import React, { useState } from 'react';
import { Home, Compass, BookOpen, User, Plus, MessageSquare, Book, Heart, LucideIcon } from 'lucide-react';
import type { DashboardView } from '../../types/dashboard';

interface BottomNavBarProps {
    currentView: DashboardView;
    onNavigate: (view: DashboardView) => void;
}

interface NavItem {
    view: DashboardView;
    label: string;
    icon: LucideIcon;
}

const NAV_ITEMS: NavItem[] = [
    { view: 'home', label: 'الرئيسية', icon: Home },
    { view: 'tadabbur', label: 'استكشاف', icon: Compass },
    { view: 'mushaf', label: 'المصحف', icon: BookOpen },
    { view: 'profile', label: 'ملفي', icon: User },
];

export const BottomNavBar: React.FC<BottomNavBarProps> = ({ currentView, onNavigate }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            {/* FAB Menu Overlay */}
            {isMenuOpen && (
                <div 
                    className="fixed inset-0 bg-black/20 z-[45] animate-in fade-in duration-200"
                    onClick={() => setIsMenuOpen(false)}
                />
            )}

            {/* FAB Menu Content */}
            {isMenuOpen && (
                <div className="fixed bottom-[90px] left-1/2 -translate-x-1/2 w-[280px] bg-white rounded-[32px] shadow-2xl z-[50] overflow-hidden animate-in slide-in-from-bottom-8 duration-300 p-2 space-y-1 border border-gray-100">
                    <button
                        onClick={() => {
                            onNavigate('reflections');
                            setIsMenuOpen(false);
                        }}
                        className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-[#FDF8F3] transition-all text-[#1D1B4B]"
                    >
                        <span className="text-[14px] font-black font-graphik">إضافة تأمل جديد</span>
                        <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-[#FF6B4A]">
                            <MessageSquare size={20} />
                        </div>
                    </button>
                    <button
                        className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-[#FDF8F3] transition-all text-[#1D1B4B]"
                    >
                        <span className="text-[14px] font-black font-graphik">إضافة علامة مرجعية</span>
                        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
                            <Book size={20} />
                        </div>
                    </button>
                    <button
                        className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-[#FDF8F3] transition-all text-[#1D1B4B]"
                    >
                        <span className="text-[14px] font-black font-graphik">الآيات المفضلة</span>
                        <div className="w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center text-[#E91E63]">
                            <Heart size={20} />
                        </div>
                    </button>
                </div>
            )}

            <div className="fixed bottom-0 left-0 right-0 h-[75px] bg-white border-t border-gray-100 flex items-center justify-between px-2 z-40 lg:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
                {/* Left Items */}
                <div className="flex flex-1 justify-around items-center">
                    {NAV_ITEMS.slice(0, 2).map(({ view, label, icon: Icon }) => {
                        const isActive = currentView === view;
                        return (
                            <button
                                key={view}
                                onClick={() => onNavigate(view)}
                                className={`flex flex-col items-center justify-center gap-1 transition-all ${isActive ? 'text-[#FF6B4A]' : 'text-gray-300'}`}
                            >
                                <Icon size={22} strokeWidth={isActive ? 3 : 2} fill="currentColor" fillOpacity={isActive ? 0.15 : 0} />
                                <span className="text-[9px] font-black uppercase tracking-tighter">{label}</span>
                            </button>
                        );
                    })}
                </div>

                {/* FAB Button */}
                <div className="relative -mt-8 flex flex-col items-center">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                            isMenuOpen ? 'bg-[#1D1B4B] rotate-45 scale-110' : 'bg-[#FF6B4A] hover:scale-105 active:scale-95'
                        }`}
                    >
                        <Plus size={28} className="text-white" />
                    </button>
                    <span className="text-[9px] font-black text-[#FF6B4A] mt-2 uppercase tracking-tighter">إضافة</span>
                </div>

                {/* Right Items */}
                <div className="flex flex-1 justify-around items-center">
                    {NAV_ITEMS.slice(2).map(({ view, label, icon: Icon }) => {
                        const isActive = currentView === view;
                        return (
                            <button
                                key={view}
                                onClick={() => onNavigate(view)}
                                className={`flex flex-col items-center justify-center gap-1 transition-all ${isActive ? 'text-[#FF6B4A]' : 'text-gray-300'}`}
                            >
                                <Icon size={22} strokeWidth={isActive ? 3 : 2} fill="currentColor" fillOpacity={isActive ? 0.15 : 0} />
                                <span className="text-[9px] font-black uppercase tracking-tighter">{label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

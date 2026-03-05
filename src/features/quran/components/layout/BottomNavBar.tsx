import React from 'react';
import { Home, Compass, BookOpen, User } from 'lucide-react';
import type { DashboardView } from '../../types/dashboard';

interface BottomNavBarProps {
    currentView: DashboardView;
    onNavigate: (view: DashboardView) => void;
}

interface NavItem {
    view: DashboardView;
    label: string;
    icon: React.FC<{ size: number; strokeWidth: number; fill: string; fillOpacity: number }>;
}

const NAV_ITEMS: NavItem[] = [
    { view: 'home', label: 'الرئيسية', icon: Home },
    { view: 'tadabbur', label: 'استكشاف', icon: Compass },
    { view: 'mushaf', label: 'المصحف', icon: BookOpen },
    { view: 'profile', label: 'ملفي', icon: User },
];

export const BottomNavBar: React.FC<BottomNavBarProps> = ({ currentView, onNavigate }) => (
    <div className="fixed bottom-0 left-0 right-0 h-[75px] bg-white border-t border-gray-100 flex items-center justify-around px-4 z-40 lg:hidden">
        {NAV_ITEMS.map(({ view, label, icon: Icon }) => {
            const isActive = currentView === view;
            return (
                <button
                    key={view}
                    onClick={() => onNavigate(view)}
                    className={`flex-1 flex flex-col items-center justify-center gap-1 transition-all ${isActive ? 'text-[#FF6B4A]' : 'text-gray-300'
                        }`}
                >
                    <Icon
                        size={24}
                        strokeWidth={isActive ? 3 : 2}
                        fill="currentColor"
                        fillOpacity={isActive ? 0.15 : 0}
                    />
                    <span className="text-[9px] font-black uppercase tracking-tighter">{label}</span>
                </button>
            );
        })}
    </div>
);

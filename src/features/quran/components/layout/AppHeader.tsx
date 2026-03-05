import React from 'react';
import { motion } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import { Menu, Search } from 'lucide-react';
import type { DashboardView } from '../../types/dashboard';

interface AppHeaderProps {
    currentView: DashboardView;
    headerRadius: MotionValue<string>;
    smallLogoOpacity: MotionValue<number>;
    smallLogoY: MotionValue<number>;
    onMenuToggle: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
    currentView,
    headerRadius,
    smallLogoOpacity,
    smallLogoY,
    onMenuToggle,
}) => (
    <motion.header
        className="lg:h-[70px] h-[75px] flex items-center justify-between px-6 lg:px-10 shrink-0 z-50 sticky top-0"
        style={{
            backgroundColor: currentView === 'home' ? '#fde2c5' : '#FFFFFF',
            borderBottomLeftRadius: headerRadius,
            borderBottomRightRadius: headerRadius,
        }}
    >
        <button
            className="w-10 h-10 flex items-center justify-center lg:hidden relative z-[60]"
            onClick={onMenuToggle}
        >
            <Menu size={20} className="text-[#1D1B4B]" />
        </button>

        <div className="flex-1 lg:flex-none flex justify-center lg:justify-start relative z-[60]">
            <motion.img
                src={currentView === 'home' ? '/images/Sahib Al Quran.png' : '/images/Sahib Al Quran - white.png'}
                alt="صاحب القرآن"
                className="h-7 object-contain relative z-[70]"
                style={{
                    opacity: currentView === 'home' ? smallLogoOpacity : 1,
                    y: currentView === 'home' ? smallLogoY : 0,
                }}
            />
        </div>

        <button className="w-10 h-10 flex items-center justify-center relative z-[60]">
            <Search size={20} className="text-[#1D1B4B]" />
        </button>
    </motion.header>
);

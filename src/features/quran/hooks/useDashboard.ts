import { useState, useRef, useCallback } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import { useSurahDetails } from './useSurahDetails';
import { useNavigation } from './useNavigation';
import type { DashboardView } from '../types/dashboard';

export const useDashboard = () => {
    const { selectedSurah, selectedSurahId, selectSurah } = useSurahDetails(1);
    const { isDrawerOpen, toggleDrawer, closeDrawer } = useNavigation();
    const [currentView, setCurrentView] = useState<DashboardView>('home');

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll({ container: scrollContainerRef });

    // Header transforms
    const headerRadius = useTransform(scrollY, [30, 80], ['0px', '32px']);

    // Small Logo transforms
    const smallLogoOpacity = useTransform(scrollY, [120, 160], [0, 1]);
    const smallLogoY = useTransform(scrollY, [120, 160], [10, 0]);

    const handleSelectSurah = useCallback((id: number) => {
        selectSurah(id);
        setCurrentView('tadabbur');
        closeDrawer();
    }, [selectSurah, closeDrawer]);

    const navigateTo = useCallback((view: DashboardView) => {
        setCurrentView(view);
    }, []);

    return {
        // Navigation
        currentView,
        navigateTo,
        isDrawerOpen,
        toggleDrawer,
        closeDrawer,

        // Surah details
        selectedSurah,
        selectedSurahId,
        handleSelectSurah,

        // Refs
        scrollContainerRef,

        // Motion transforms
        headerRadius,
        smallLogoOpacity,
        smallLogoY,
    };
};

export type UseDashboardReturn = ReturnType<typeof useDashboard>;

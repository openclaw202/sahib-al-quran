import React from 'react';
import { MobileDrawer } from './MobileDrawer';
import { SurahSidebar } from './SurahSidebar';

// Layout
import { AppHeader } from './layout/AppHeader';
import { BottomNavBar } from './layout/BottomNavBar';

// Hooks
import { useDashboard } from '../hooks/useDashboard';

// Views
import { HomeView } from './views/HomeView';
import { TadabburView } from './views/TadabburView';
import { MushafView } from './views/MushafView';
import { ReflectionsSection } from './views/ReflectionsSection';
import { EnvironmentsView } from './views/EnvironmentsView';
import { MethodologyView } from './views/MethodologyView';
import { SupplicationsView } from './views/SupplicationsView';
import { RemembrancesView } from './views/RemembrancesView';

export const MainDashboard: React.FC = () => {
  const {
    currentView,
    navigateTo,
    isDrawerOpen,
    toggleDrawer,
    closeDrawer,
    selectedSurah,
    selectedSurahId,
    handleSelectSurah,
    scrollContainerRef,
    headerRadius,
    smallLogoOpacity,
    smallLogoY,
  } = useDashboard();

  return (
    <div className="flex h-screen w-full bg-white font-graphik antialiased text-[#1D1B4B]" dir="rtl">
      {/* Sidebar - Remains for Desktop */}
      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        onSelect={handleSelectSurah}
        selectedId={selectedSurahId}
      />
      <aside className="hidden lg:flex w-[320px] h-full flex-col bg-white border-l border-gray-100">
        <SurahSidebar onSelect={handleSelectSurah} selectedId={selectedSurahId} />
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full relative overflow-hidden bg-white">

        <AppHeader
          currentView={currentView}
          headerRadius={headerRadius}
          smallLogoOpacity={smallLogoOpacity}
          smallLogoY={smallLogoY}
          onMenuToggle={toggleDrawer}
        />

        {/* Scrollable Area */}
        <div
          className={`flex-1 ${currentView === 'home' ? 'overflow-hidden' : 'overflow-y-auto'} scrollbar-hide z-10 relative bg-white`}
          ref={scrollContainerRef}
        >
          {/* Background Shape for large screens */}
          {currentView === 'home' && (
            <div className="absolute top-0 left-0 right-0 h-[240px] bg-[#fde2c5] rounded-b-[40px] z-0 pointer-events-none" />
          )}

          {/* Main Dashboard Router */}
          <div className={`max-w-[500px] mx-auto ${currentView === 'home' ? 'h-full flex flex-col pt-2 pb-4 px-6 overflow-hidden relative z-10' : 'px-6 py-4 space-y-8 pb-32 relative z-10'}`}>

            {currentView === 'home' && <HomeView onNavigate={navigateTo} />}
            {currentView === 'tadabbur' && <TadabburView surah={selectedSurah as any} />}
            {currentView === 'mushaf' && <MushafView />}
            {currentView === 'reflections' && <ReflectionsSection />}
            {currentView === 'environments' && <EnvironmentsView />}
            {currentView === 'methodology' && <MethodologyView />}
            {currentView === 'supplications' && <SupplicationsView />}
            {currentView === 'remembrances' && <RemembrancesView />}

            {/* profile placeholder if needed */}
            {currentView === 'profile' && (
              <div className="flex items-center justify-center p-12 text-gray-400 font-bold">
                تحت الانشاء...
              </div>
            )}
          </div>
        </div>

        <BottomNavBar currentView={currentView} onNavigate={navigateTo} />
      </main>
    </div>
  );
};

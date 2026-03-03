import React from 'react';
import { useSurahDetails } from '../hooks/useSurahDetails';
import { useNavigation } from '../hooks/useNavigation';
import { SurahSidebar } from './SurahSidebar';
import { SurahTabs } from './SurahTabs';
import { MobileDrawer } from './MobileDrawer';

export const MainDashboard: React.FC = () => {
  const { selectedSurah, selectedSurahId, selectSurah } = useSurahDetails(1);
  const { isDrawerOpen, toggleDrawer, closeDrawer } = useNavigation();

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden font-sans">
      {/* Mobile Drawer */}
      <MobileDrawer 
        isOpen={isDrawerOpen} 
        onClose={closeDrawer} 
        onSelect={selectSurah} 
        selectedId={selectedSurahId} 
      />

      {/* Sidebar - Persistent on Desktop */}
      <aside className="hidden lg:block w-72 h-full border-e bg-white">
        <SurahSidebar onSelect={selectSurah} selectedId={selectedSurahId} />
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Navbar / Header for Mobile */}
        <header className="lg:hidden bg-white border-b p-4 flex items-center justify-between sticky top-0 z-20">
          <button onClick={toggleDrawer} className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg">
            {/* Hamburger Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </button>
          <h1 className="text-xl font-bold text-emerald-900">صاحب القرآن</h1>
          <div className="w-10"></div> {/* Spacer for symmetry */}
        </header>

        <div className="flex-1 overflow-y-auto p-4 lg:p-8 bg-slate-100 scroll-smooth">
          <div className="max-w-4xl mx-auto min-h-full flex flex-col">
            <div className="mb-6 lg:mb-8 text-center lg:text-start">
              <span className="text-emerald-600 font-medium text-sm">سورة</span>
              <h2 className="text-4xl font-extrabold text-slate-800 tracking-tight">{selectedSurah.name}</h2>
            </div>
            
            <div className="flex-1">
              <SurahTabs surah={selectedSurah} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

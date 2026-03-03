import React, { useState } from 'react';
import { useSurahDetails } from '../hooks/useSurahDetails';
import { useNavigation } from '../hooks/useNavigation';
import { SurahSidebar } from './SurahSidebar';
import { SurahTabs } from './SurahTabs';
import { MobileDrawer } from './MobileDrawer';
import {
  Menu,
  Settings,
  User,
  BookOpen,
  Calendar,
  Layers,
  Home,
  Compass,
  Quote
} from 'lucide-react';

type DashboardView = 'home' | 'tadabbur' | 'mushaf' | 'profile';

export const MainDashboard: React.FC = () => {
  const { selectedSurah, selectedSurahId, selectSurah } = useSurahDetails(1);
  const { isDrawerOpen, toggleDrawer, closeDrawer } = useNavigation();
  const [currentView, setCurrentView] = useState<DashboardView>('home');

  const handleSelectSurah = (id: number) => {
    selectSurah(id);
    setCurrentView('tadabbur');
    closeDrawer();
  };

  return (
    <div className="flex h-screen w-full bg-[#fde2c5] overflow-hidden font-graphik antialiased text-[#1D1B4B]" dir="rtl">
      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        onSelect={handleSelectSurah}
        selectedId={selectedSurahId}
      />

      {/* Persistent Sidebar (Desktop Only) */}
      <aside className="hidden lg:flex w-[320px] h-full flex-col z-40 bg-transparent border-l border-[#1D1B4B]/5">
        <SurahSidebar onSelect={handleSelectSurah} selectedId={selectedSurahId} />
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">

        {/* Modern Minimal Header */}
        <header className="h-[90px] flex items-center justify-between px-6 lg:px-12 z-30">
          <div className="flex items-center gap-4">
            <div className="h-10 animate-in fade-in duration-1000">
              <img
                src="/images/Sahib Al Quran.png"
                alt="صاحب القرآن"
                className="h-full object-contain"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="w-10 h-10 flex items-center justify-center nav-item lg:hidden shadow-none border-none bg-transparent" onClick={toggleDrawer}>
              <Menu size={20} className="text-[#1D1B4B]" />
            </button>
            <button className="w-10 h-10 items-center justify-center nav-item hidden lg:flex shadow-none border-none bg-transparent">
              <Settings size={20} className="text-[#1D1B4B]/30" />
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide pb-32">
          <div className="max-w-5xl mx-auto px-6 lg:px-12 py-8">

            {currentView === 'home' && (
              <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 space-y-10">
                {/* Greeting Hero */}
                <div>
                  <h1 className="text-5xl lg:text-7xl font-black text-[#1D1B4B] leading-tight tracking-tight">
                    قُرآنٌ <span className="text-[#FF6B4A]">لِبِناءِ</span> <span className="text-[#E91E63]">الإِنسان.</span>
                  </h1>
                </div>

                {/* Featured Quote Card - Minimalist */}
                <div className="bg-white/40 backdrop-blur-md border border-white/60 rounded-[40px] p-8 lg:p-12 flex flex-col md:flex-row items-center gap-10 group hover:bg-white/60 transition-all duration-500">
                  <div className="w-16 h-16 rounded-full bg-[#1D1B4B] flex items-center justify-center text-[#fde2c5] shrink-0">
                    <Quote size={24} />
                  </div>
                  <div className="flex-1 text-center md:text-right">
                    <p className="text-2xl lg:text-3xl font-black text-[#1D1B4B] leading-relaxed mb-4">
                      "أَفَلَا يَتَدَبَّرُونَ الْقُرْآنَ أَمْ عَلَى قلوبٍ أَقْفَالُهَا"
                    </p>
                    <p className="text-[10px] font-black text-[#1D1B4B]/30 uppercase tracking-[0.4em]">سورة محمد | آية ٢٤</p>
                  </div>
                  <button className="px-8 py-4 bg-[#FF6B4A] text-white rounded-full text-[12px] font-black uppercase tracking-widest cursor-pointer hover:bg-[#ff552e] hover:shadow-xl hover:shadow-[#FF6B4A]/20 transition-all duration-300">
                    ابدأ التدبر
                  </button>
                </div>

                {/* Creative Minimal Grid */}
                <div className="grid grid-cols-12 gap-8">

                  {/* Large Progress Card */}
                  <div className="col-span-12 lg:col-span-12 bg-white/40 border border-white/60 rounded-[40px] p-10 flex flex-col md:flex-row items-center justify-between gap-10">
                    <div className="md:w-1/2 text-right">
                      <h3 className="text-2xl font-black text-[#1D1B4B] mb-3">رحلتك الإيمانية</h3>
                      <p className="text-base text-[#1D1B4B]/60 font-medium leading-relaxed">أتممت قراءة ٢٤ صفحة من وردك اليومي بتركيز. استمر في هذا المسار النوراني.</p>
                    </div>
                    <div className="flex items-end gap-4 h-28 w-full md:w-auto">
                      {[35, 65, 40, 85, 55, 75, 50].map((h, i) => (
                        <div
                          key={i}
                          className={`w-12 rounded-2xl transition-all duration-500 cursor-pointer ${i === 3 ? 'bg-[#FF6B4A]' : 'bg-[#1D1B4B]/5 hover:bg-[#1D1B4B]/20'}`}
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Smaller Square Elements */}
                  <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-white/40 border border-white/60 rounded-[40px] p-10 min-h-[280px] flex flex-col justify-between cursor-pointer group hover:bg-[#DCD6FF]/40 active:scale-[0.98] transition-all duration-500" onClick={() => handleSelectSurah(selectedSurahId)}>
                    <div className="w-12 h-12 rounded-2xl bg-[#1D1B4B]/10 flex items-center justify-center text-[#1D1B4B]">
                      <Compass size={24} />
                    </div>
                    <div>
                      <p className="text-[#1D1B4B]/40 text-[11px] font-black uppercase tracking-widest mb-3">نقطة الوصول</p>
                      <h3 className="text-3xl font-black text-[#1D1B4B]">سورة {selectedSurah.name}</h3>
                      <p className="text-[10px] font-black text-[#1D1B4B]/60 mt-4 uppercase tracking-wider flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#FF6B4A] animate-pulse"></span>
                        استئناف القراءة الآن
                      </p>
                    </div>
                  </div>

                  <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-white/40 border border-white/60 rounded-[40px] p-10 min-h-[280px] flex flex-col justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-[#00695C]/10 flex items-center justify-center text-[#00695C]">
                      <Calendar size={24} />
                    </div>
                    <div>
                      <p className="text-[#00695C]/40 text-[11px] font-black uppercase tracking-widest mb-3">تحدي اليوم</p>
                      <h3 className="text-xl lg:text-2xl font-black text-[#1D1B4B] leading-snug">هل قرأت الورد الصباحي بتمعن وفكر؟</h3>
                      <div className="flex gap-4 mt-8">
                        <button className="px-8 py-3 bg-[#00695C] text-white rounded-full text-[11px] font-black uppercase tracking-widest cursor-pointer hover:shadow-lg hover:shadow-[#00695C]/20 transition-all">نعم</button>
                        <button className="px-8 py-3 bg-transparent border border-[#00695C]/20 text-[#00695C] rounded-full text-[11px] font-black uppercase tracking-widest cursor-pointer hover:bg-[#00695C]/5 transition-all">لاحقاً</button>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-12 lg:col-span-4 bg-white/40 border border-white/60 rounded-[40px] p-10 min-h-[280px] flex flex-col justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-[#E91E63]/10 flex items-center justify-center text-[#E91E63]">
                      <Layers size={24} />
                    </div>
                    <div>
                      <p className="text-[#E91E63]/40 text-[11px] font-black uppercase tracking-widest mb-3">إحصائياتك</p>
                      <div className="flex items-baseline gap-3">
                        <span className="text-5xl font-black text-[#1D1B4B]">{selectedSurah.versesCount}</span>
                        <span className="text-[11px] font-black text-[#1D1B4B]/40 uppercase tracking-widest">آية مدروسة</span>
                      </div>
                      <p className="text-[10px] font-black text-[#1D1B4B]/40 mt-3 uppercase tracking-[0.2em]">النزول: {selectedSurah.revelationType === 'MAKKI' ? 'مكة المكرمة' : 'المدينة المنورة'}</p>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {currentView === 'tadabbur' && (
              <div className="animate-in fade-in slide-in-from-left-6 duration-700">
                <div className="mb-12 text-right">
                  <h2 className="text-5xl lg:text-6xl font-black text-[#1D1B4B] tracking-tight leading-tight">تأملات <br /> {selectedSurah.name}</h2>
                </div>
                <SurahTabs surah={selectedSurah} />
              </div>
            )}

            {currentView === 'mushaf' && (
              <div className="flex flex-col items-center justify-center py-32 text-center animate-in fade-in duration-700 px-4">
                <div className="w-24 h-24 bg-white/40 border border-white/60 rounded-[40px] flex items-center justify-center text-[#1D1B4B]/10 mb-8">
                  <BookOpen size={48} />
                </div>
                <h2 className="text-4xl font-black text-[#1D1B4B]">المصحف التفاعلي</h2>
                <p className="text-[#1D1B4B]/40 text-lg mt-6 max-w-sm leading-relaxed font-medium">نعمل على بناء تجربة تصفح فريدة لكتاب الله، مريحة للعين ومعينة على التدبر والتعمق.</p>
              </div>
            )}

            {currentView === 'profile' && (
              <div className="flex flex-col items-center justify-center py-32 text-center animate-in fade-in duration-700 px-4">
                <div className="w-24 h-24 bg-white/40 border border-white/60 rounded-[32px] flex items-center justify-center text-[#1D1B4B]/10 mb-8">
                  <User size={48} />
                </div>
                <h2 className="text-4xl font-black text-[#1D1B4B]">الملف الشخصي</h2>
                <p className="text-[#1D1B4B]/40 text-lg mt-6 max-w-sm leading-relaxed font-medium">هنا ستجد إحصائياتك، أهدافك، وما أنجزته من تدبر وحفظ بمرور الوقت مع صاحب القرآن.</p>
              </div>
            )}

          </div>
        </div>

        {/* Minimal Static Bottom Nav */}
        <div className="fixed bottom-0 left-0 right-0 h-[100px] bg-[#fde2c5]/90 backdrop-blur-xl border-t border-white/20 flex items-center justify-around px-8 z-50 lg:hidden shadow-none">
          <button
            onClick={() => setCurrentView('home')}
            className={`flex flex-col items-center gap-2 transition-all duration-300 ${currentView === 'home' ? 'text-[#1D1B4B] scale-110' : 'text-[#1D1B4B]/20 hover:text-[#1D1B4B]/40'}`}
          >
            <Home size={24} strokeWidth={currentView === 'home' ? 2.5 : 2} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">البداية</span>
          </button>
          <button
            onClick={() => setCurrentView('tadabbur')}
            className={`flex flex-col items-center gap-2 transition-all duration-300 ${currentView === 'tadabbur' ? 'text-[#1D1B4B] scale-110' : 'text-[#1D1B4B]/20 hover:text-[#1D1B4B]/40'}`}
          >
            <Compass size={24} strokeWidth={currentView === 'tadabbur' ? 2.5 : 2} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">التدبر</span>
          </button>
          <button
            onClick={() => setCurrentView('mushaf')}
            className={`flex flex-col items-center gap-2 transition-all duration-300 ${currentView === 'mushaf' ? 'text-[#1D1B4B] scale-110' : 'text-[#1D1B4B]/20 hover:text-[#1D1B4B]/40'}`}
          >
            <BookOpen size={24} strokeWidth={currentView === 'mushaf' ? 2.5 : 2} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">المصحف</span>
          </button>
          <button
            onClick={() => setCurrentView('profile')}
            className={`flex flex-col items-center gap-2 transition-all duration-300 ${currentView === 'profile' ? 'text-[#1D1B4B] scale-110' : 'text-[#1D1B4B]/20 hover:text-[#1D1B4B]/40'}`}
          >
            <User size={24} strokeWidth={currentView === 'profile' ? 2.5 : 2} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">ملفي</span>
          </button>
        </div>
      </main>
    </div>
  );
};

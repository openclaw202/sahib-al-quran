import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useSurahDetails } from '../hooks/useSurahDetails';
import { useNavigation } from '../hooks/useNavigation';
import { SurahSidebar } from './SurahSidebar';
import { SurahTabs } from './SurahTabs';
import { MobileDrawer } from './MobileDrawer';
import {
  Menu,
  BookOpen,
  Home,
  Compass,
  MessageCircle,
  PenTool,
  Bookmark,
  Book,
  Search,
  Users,
  Mountain,
  ClipboardList,
  Lightbulb,
  Heart,
  Moon,
  Globe,
  Trophy,
  User
} from 'lucide-react';

type DashboardView = 'home' | 'tadabbur' | 'mushaf' | 'profile' | 'madani' | 'makki' | 'methodology';

// Helper component for the icon greed bubbles
const IconBubble: React.FC<{ icon: React.ReactNode, bgColor: string, iconColor: string, label: string, onClick?: () => void }> = ({ icon, bgColor, iconColor, label, onClick }) => (
  <div className="flex flex-col items-center gap-2" onClick={onClick}>
    <div className={`w-14 h-14 rounded-[22px] flex items-center justify-center transition-transform hover:scale-105 cursor-pointer`} style={{ backgroundColor: bgColor, color: iconColor }}>
      {icon}
    </div>
    <span className="text-[10px] font-bold text-[#1D1B4B]/20 text-center px-1 leading-tight">{label}</span>
  </div>
);

export const MainDashboard: React.FC = () => {
  const { selectedSurah, selectedSurahId, selectSurah } = useSurahDetails(1);
  const { isDrawerOpen, toggleDrawer, closeDrawer } = useNavigation();
  const [currentView, setCurrentView] = useState<DashboardView>('home');

  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    container: scrollContainerRef
  });

  // 1. Background container transforms (1:1 Movement)
  const bgY = useTransform(scrollY, [0, 500], [0, -500]);

  // 2. Large Logo transforms (Shrink and Fade)
  const logoScale = useTransform(scrollY, [0, 200], [1, 0.4]);
  const logoY = useTransform(scrollY, [0, 200], [0, -120]);
  const logoOpacity = useTransform(scrollY, [0, 150], [1, 0]);
  // 3. Header transforms (Radius on scroll)
  const headerRadius = useTransform(
    scrollY,
    [30, 80],
    ['0px', '32px']
  );

  // 4. Small Logo transforms (Inside Header)
  const smallLogoOpacity = useTransform(scrollY, [120, 160], [0, 1]);
  const smallLogoY = useTransform(scrollY, [120, 160], [10, 0]);

  const handleSelectSurah = (id: number) => {
    selectSurah(id);
    setCurrentView('tadabbur');
    closeDrawer();
  };

  return (
    <div className="flex h-screen w-full bg-white font-graphik antialiased text-[#1D1B4B]" dir="rtl">
      {/* Sidebar - Remains for Desktop */}
      <MobileDrawer isOpen={isDrawerOpen} onClose={closeDrawer} onSelect={handleSelectSurah} selectedId={selectedSurahId} />
      <aside className="hidden lg:flex w-[320px] h-full flex-col bg-white border-l border-gray-100">
        <SurahSidebar onSelect={handleSelectSurah} selectedId={selectedSurahId} />
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full relative overflow-hidden bg-white">

        {/* Dynamic Mobile Header */}
        <motion.header
          className="lg:h-[70px] h-[75px] flex items-center justify-between px-6 lg:px-10 shrink-0 z-50 sticky top-0"
          style={{
            backgroundColor: currentView === 'home' ? '#fde2c5' : '#FFFFFF',
            borderBottomLeftRadius: headerRadius,
            borderBottomRightRadius: headerRadius,
          }}
        >
          <button className="w-10 h-10 flex items-center justify-center lg:hidden relative z-[60]" onClick={toggleDrawer}>
            <Menu size={20} className="text-[#1D1B4B]" />
          </button>

          <div className="flex-1 lg:flex-none flex justify-center lg:justify-start relative z-[60]">
            <motion.img
              src={currentView === 'home' ? "/images/Sahib Al Quran.png" : "/images/Sahib Al Quran - white.png"}
              alt="صاحب القرآن"
              className="h-7 object-contain"
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

        {/* Scrollable Area */}
        <div
          className="flex-1 overflow-y-auto scrollbar-hide z-10 relative bg-white"
          ref={scrollContainerRef}
        >
          {/* Large Logo Section - Restricted to Home View for better UX */}
          {currentView === 'home' && (
            <div className="absolute top-0 left-0 right-0 z-0 pointer-events-none lg:hidden h-[400px]">
              {/* Background Container */}
              <motion.div
                className="sticky top-0 left-0 right-0 h-[260px] bg-[#fde2c5] rounded-b-[40px]"
                style={{
                  y: bgY,
                }}
              />

              {/* Large Logo */}
              <motion.div
                className="absolute top-0 left-0 right-0 flex justify-center pt-0" // Lifted even more
                style={{
                  scale: logoScale,
                  y: logoY,
                  opacity: logoOpacity,
                }}
              >
                <img
                  src="/images/Sahib Al Quran.png"
                  alt="صاحب القرآن"
                  className="h-32 object-contain"
                />
              </motion.div>
            </div>
          )}

          <div className="max-w-[500px] mx-auto px-6 py-4 space-y-8 pb-32 relative z-10">

            {currentView === 'home' && (
              <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">

                {/* 1. Hero Card - THEME REPLICATION */}
                <div className="relative mb-8 pt-[110px]">
                  {/* Background Decorative Element - Subtle Floating shapes */}
                  <div className="absolute top-0 left-0 right-0 h-40 -z-10 overflow-hidden opacity-40">
                    <div className="absolute top-10 right-10 w-12 h-12 rounded-2xl bg-white/30 rotate-12 blur-sm"></div>
                    <div className="absolute top-20 left-10 w-8 h-8 rounded-full bg-white/20 blur-sm"></div>
                  </div>

                  <div className="bg-white rounded-[32px] p-8 border border-white relative shadow-lg shadow-gray-100/70">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-orange-100 p-1">
                        <div className="w-full h-full rounded-full bg-gray-200 overflow-hidden">
                          <img src="/images/Sahib Al Quran.png" className="w-full h-full object-cover scale-150" alt="Avatar" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1 px-1">
                          <span className="text-[9px] font-bold text-[#FFB84C]">خِتْمَة القرآن الكريم</span>
                          <span className="text-[9px] font-bold text-[#FFB84C]">٦٥٪</span>
                        </div>
                        {/* Horizontal Progress Bar */}
                        <div className="h-5 w-full bg-[#FFF8E7] rounded-full relative overflow-hidden p-1">
                          <div className="h-full bg-gradient-to-r from-[#FFB84C] to-[#FFD89C] rounded-full" style={{ width: '65%' }}></div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center">
                          <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                        </div>
                        <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">المستوى الأول</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-black text-[#1D1B4B]">مرحباً، عبدالرحمن</h2>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Icon Grid Bubble Styling */}
                <div className="grid grid-cols-4 gap-y-6 mb-10">
                  <IconBubble
                    label="التدبر"
                    icon={<Bookmark size={22} strokeWidth={2.5} fill="currentColor" fillOpacity={0.15} />}
                    bgColor="#F0E6FF"
                    iconColor="#9B66FF"
                    onClick={() => setCurrentView('tadabbur')}
                  />
                  <IconBubble
                    label="بيئة مدنية"
                    icon={<Users size={22} strokeWidth={2.5} fill="currentColor" fillOpacity={0.15} />}
                    bgColor="#E3F9EC"
                    iconColor="#49C18B"
                    onClick={() => setCurrentView('madani')}
                  />
                  <IconBubble
                    label="بيئة مكية"
                    icon={<Mountain size={22} strokeWidth={2.5} fill="currentColor" fillOpacity={0.15} />}
                    bgColor="#FEF7E1"
                    iconColor="#F1C40F"
                    onClick={() => setCurrentView('makki')}
                  />
                  <IconBubble
                    label="المنهجية"
                    icon={<ClipboardList size={22} strokeWidth={2.5} fill="currentColor" fillOpacity={0.15} />}
                    bgColor="#FFF1F1"
                    iconColor="#FF6B6B"
                    onClick={() => setCurrentView('methodology')}
                  />

                  {/* Dynamic added categories */}
                  <IconBubble label="تأملاتي" icon={<PenTool size={22} strokeWidth={2.5} fill="currentColor" fillOpacity={0.15} />} bgColor="#FEFBEA" iconColor="#E67E22" />
                  <IconBubble label="المجتمع" icon={<MessageCircle size={22} strokeWidth={2.5} fill="currentColor" fillOpacity={0.15} />} bgColor="#F2F3FF" iconColor="#5F27CD" />
                  <IconBubble label="أدعية القرآن" icon={<Heart size={22} strokeWidth={2.5} fill="currentColor" fillOpacity={0.15} />} bgColor="#FFF3E0" iconColor="#FF6B6B" />
                  <IconBubble label="أذكار القرآن" icon={<Moon size={22} strokeWidth={2.5} fill="currentColor" fillOpacity={0.15} />} bgColor="#E3F9EC" iconColor="#49C18B" />

                  <IconBubble label="إضاءات" icon={<Lightbulb size={22} strokeWidth={2.5} fill="currentColor" fillOpacity={0.15} />} bgColor="#FFF1F1" iconColor="#FF4757" />
                  <IconBubble label="التفسير" icon={<BookOpen size={22} strokeWidth={2.5} fill="currentColor" fillOpacity={0.15} />} bgColor="#F0F8FF" iconColor="#1E90FF" />
                  <IconBubble label="قصص القرآن" icon={<Globe size={22} strokeWidth={2.5} fill="currentColor" fillOpacity={0.15} />} bgColor="#FEF7E1" iconColor="#F1C40F" />
                  <IconBubble label="مسابقات" icon={<Trophy size={22} strokeWidth={2.5} fill="currentColor" fillOpacity={0.15} />} bgColor="#F0E6FF" iconColor="#9B66FF" />
                </div>
              </div>
            )}

            {currentView === 'madani' && (
              <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 max-w-[450px] mx-auto">
                <div className="mb-8 text-right">
                  <span className="text-[10px] font-black text-green-500 uppercase tracking-widest mb-2 block">دراسات قرآنية</span>
                  <h2 className="text-3xl font-black text-[#1D1B4B] mb-2">🕌 خصائص البيئة المدنية</h2>
                  <p className="text-xs font-bold text-gray-400">مميزات السور والآيات التي نزلت بالمدينة</p>
                </div>

                <div className="space-y-4">
                  {[
                    "الجهاد والقتال",
                    "بيان الأحكام",
                    "فضح المنافقين والكلام عن حيلهم ومكرهم",
                    "الكلام عن أهل الجدال",
                    "التعليق عن شؤون الأحكام"
                  ].map((item, idx) => (
                    <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-100 flex items-start gap-4">
                      <div className="w-8 h-8 rounded-xl bg-green-50 flex items-center justify-center text-green-600 font-black text-sm shrink-0">
                        {idx + 1}
                      </div>
                      <p className="text-sm font-bold text-[#1D1B4B] leading-relaxed pt-1">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentView === 'makki' && (
              <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 max-w-[450px] mx-auto">
                <div className="mb-8 text-right">
                  <span className="text-[10px] font-black text-yellow-500 uppercase tracking-widest mb-2 block">دراسات قرآنية</span>
                  <h2 className="text-3xl font-black text-[#1D1B4B] mb-2">🕌 خصائص البيئة المكية</h2>
                  <p className="text-xs font-bold text-gray-400">فهم طبيعة التنزيل المكي وتحدياته</p>
                </div>

                <div className="space-y-4">
                  {[
                    { title: "الاستضعاف العام", desc: "المسلمون كانوا يشاهدون الأصنام بأعينهم، ويُؤذَوْن أذًى شديدًا جدًا — حتى النبي ﷺ كان يُؤذَى أذًى جسديًا!" },
                    { title: "وجود الأصنام وصناديد كفار قريش", desc: "إذا تفرّغ الناس بالنضر — انشغل أنت ببناء الوجوه النضرة! اصنع ابني. هل الأصنام كسرتهم؟ — بفضل الله لا." },
                    { title: "البيئة الأرقامية والمَحض التربوي", desc: "تخيّل ماشي والأصنام قدامك بتُعبد — خليك صنايعي — خلي عندك رُشد وإدراك." }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-3xl border border-gray-100 space-y-3">
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
              </div>
            )}

            {currentView === 'methodology' && (
              <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 max-w-[450px] mx-auto">
                <div className="mb-8 text-right">
                  <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-2 block">المنهجية العلمية</span>
                  <h2 className="text-3xl font-black text-[#1D1B4B] mb-2">📋 كيف تُصاحب سورة؟</h2>
                  <p className="text-xs font-bold text-gray-400">المنهجية العشرة لإتقان فهم السور</p>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {[
                    "تعرف الأول: مكية ولا مدنية",
                    "ما اسم السورة؟ وارتباطه بموضوعها؟ وهل لها أكثر من اسم؟",
                    "هل ذكر النبي ﷺ فضلًا لها؟ ومتى كان يقرأها؟",
                    "ما ترتيب نزولها؟ وترتيبها في المصحف؟",
                    "ما أسباب النزول؟",
                    "ما غريب الكلمات فيها؟",
                    "ما الآيات عن اليوم الآخر وتفاصيله؟",
                    "ما الآيات عن مفردات الإيمان والتقوى؟",
                    "ما الآيات ذات الأوامر المُبشِّرة وغير المُبشِّرة؟",
                    "ما الأفعال المباشرة وغير المباشرة؟"
                  ].map((step, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center gap-4 transition-all hover:border-blue-100 group">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 font-black text-sm shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        {idx + 1}
                      </div>
                      <p className="text-sm font-bold text-[#1D1B4B] leading-snug">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentView === 'tadabbur' && (
              <div className="animate-in fade-in duration-700 max-w-[450px] mx-auto">
                <div className="mb-6 text-right">
                  <h2 className="text-2xl font-black text-[#1D1B4B]">تأملات {selectedSurah.name}</h2>
                  <p className="text-[10px] font-bold text-gray-400 mt-1">تصفح أسرار وإعجاز الآيات</p>
                </div>
                <SurahTabs surah={selectedSurah} />
              </div>
            )}

          </div>
        </div>

        {/* Simple Footer Navigation Bar - Full Width stuck to bottom */}
        <div className="fixed bottom-0 left-0 right-0 h-[75px] bg-white border-t border-gray-100 flex items-center justify-around px-4 z-40 lg:hidden">
          <button onClick={() => setCurrentView('home')} className={`flex-1 flex flex-col items-center justify-center gap-1 transition-all ${currentView === 'home' ? 'text-[#FF6B4A]' : 'text-gray-300'}`}>
            <Home size={24} strokeWidth={currentView === 'home' ? 3 : 2} fill="currentColor" fillOpacity={currentView === 'home' ? 0.15 : 0} />
            <span className="text-[9px] font-black uppercase tracking-tighter">الرئيسية</span>
          </button>
          <button onClick={() => setCurrentView('tadabbur')} className={`flex-1 flex flex-col items-center justify-center gap-1 transition-all ${currentView === 'tadabbur' ? 'text-[#FF6B4A]' : 'text-gray-300'}`}>
            <Compass size={24} strokeWidth={currentView === 'tadabbur' ? 3 : 2} fill="currentColor" fillOpacity={currentView === 'tadabbur' ? 0.15 : 0} />
            <span className="text-[9px] font-black uppercase tracking-tighter">استكشاف</span>
          </button>
          <button onClick={() => setCurrentView('mushaf')} className={`flex-1 flex flex-col items-center justify-center gap-1 transition-all ${currentView === 'mushaf' ? 'text-[#FF6B4A]' : 'text-gray-300'}`}>
            <BookOpen size={24} strokeWidth={currentView === 'mushaf' ? 3 : 2} fill="currentColor" fillOpacity={currentView === 'mushaf' ? 0.15 : 0} />
            <span className="text-[9px] font-black uppercase tracking-tighter">المصحف</span>
          </button>
          <button onClick={() => setCurrentView('profile')} className={`flex-1 flex flex-col items-center justify-center gap-1 transition-all ${currentView === 'profile' ? 'text-[#FF6B4A]' : 'text-gray-300'}`}>
            <User size={24} strokeWidth={currentView === 'profile' ? 3 : 2} fill="currentColor" fillOpacity={currentView === 'profile' ? 0.15 : 0} />
            <span className="text-[9px] font-black uppercase tracking-tighter">ملفي</span>
          </button>
        </div>
      </main>
    </div>
  );
};

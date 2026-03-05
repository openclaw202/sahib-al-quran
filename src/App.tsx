import { MainDashboard } from './features/quran/components/MainDashboard'
import './index.css'

function App() {
  return (
    <>
      <div className="App md:hidden">
        <MainDashboard />
      </div>

      {/* Desktop/Tablet Blocker */}
      <div className="hidden md:flex fixed inset-0 bg-[#fde2c5] z-[9999] items-center justify-center p-8 text-center" dir="rtl">
        <div className="bg-white p-10 rounded-[40px] shadow-2xl max-w-md w-full border border-orange-100 flex flex-col items-center">
          <img src="/images/Sahib Al Quran - white.png" alt="صاحب القرآن" className="h-32 mb-6 object-contain" />
          <h1 className="text-2xl font-black text-[#1D1B4B] mb-3">عذراً، التطبيق للموبايل فقط</h1>
          <p className="text-gray-500 font-medium leading-relaxed mb-8">
            هذه النسخة من منصة صاحب القرآن مصممة ومهيئة خصيصاً لتعمل على شاشات الهواتف المحمولة لتقديم أفضل تجربة مستخدم ممكنة.
          </p>
          <div className="text-[10px] font-bold text-orange-400 bg-orange-50 px-4 py-2 rounded-full uppercase tracking-widest">
            يرجى فتح الموقع من هاتفك
          </div>
        </div>
      </div>
    </>
  )
}

export default App

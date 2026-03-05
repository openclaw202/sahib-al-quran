// صفحة المصحف الرئيسية - تجمع كل المكونات الفرعية مع بعض
// كل مكون فرعي موجود في مجلد mushaf/ ويمكن تعديله بشكل مستقل
import React from 'react';
import { Loader2 } from 'lucide-react';
import {
    useMushafState,
    MushafHeader,
    SurahListDropdown,
    QuranPageContent,
    TafsirPageContent,
    ReflectionsPageContent,
    LongPressActionMenu,
    ViewModeMenu,
    PageSlider,
} from './mushaf';

export const MushafView: React.FC = () => {
    // ===== استخدام هوك الحالة الرئيسي - كل اللوجيك والبيانات هنا =====
    const state = useMushafState();

    return (
        <div className="h-full flex flex-col bg-white" dir="rtl">
            {/* ===== رأس الصفحة: اسم السورة ونوع النزول ===== */}
            <MushafHeader
                surahName={state.currentSurahInfo?.name}
                revelationType={state.currentSurahInfo?.revelationType}
                onToggleSurahList={() => state.setIsSurahListOpen(!state.isSurahListOpen)}
            />

            {/* ===== قائمة السور المنسدلة ===== */}
            <SurahListDropdown
                isOpen={state.isSurahListOpen}
                searchQuery={state.searchQuery}
                onSearchChange={state.setSearchQuery}
                onClose={() => state.setIsSurahListOpen(false)}
                filteredSurahs={state.filteredSurahs}
                onSurahSelect={state.handleSurahSelect}
            />

            {/* ===== محتوى الصفحة الرئيسي ===== */}
            <div className="flex-1 overflow-y-auto scrollbar-hide relative bg-white">
                {/* حالة التحميل */}
                {state.loading ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
                        <Loader2 size={40} className="text-[#D4AF37] animate-spin" />
                    </div>
                ) : state.error ? (
                    /* حالة الخطأ */
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center font-graphik">
                            <p className="text-red-500 font-bold mb-3">{state.error}</p>
                            <button
                                onClick={() => state.loadPage(state.currentPage)}
                                className="px-4 py-2 bg-[#1D1B4B] text-white rounded-xl text-sm font-bold"
                            >
                                إعادة المحاولة
                            </button>
                        </div>
                    </div>
                ) : (
                    /* عرض المحتوى حسب وضع العرض المختار */
                    <div className="px-6 pt-[18px] pb-32">
                        {/* ===== وضع التفسير ===== */
                        state.viewMode === 'tafsir' ? (
                            <TafsirPageContent
                                pageAyahs={state.pageAyahs}
                                tafsirData={state.tafsirData}
                            />

                        ) : state.viewMode === 'reflections' ? (
                            /* ===== وضع التأملات ===== */
                            <ReflectionsPageContent
                                pageAyahs={state.pageAyahs}
                                reflections={state.reflections}
                                activeAyahForReflection={state.activeAyahForReflection}
                                setActiveAyahForReflection={state.setActiveAyahForReflection}
                                newReflection={state.newReflection}
                                setNewReflection={state.setNewReflection}
                                onSaveReflection={state.saveReflection}
                            />

                        ) : (
                            /* ===== وضع المصحف (الافتراضي) ===== */
                            <QuranPageContent
                                pageAyahs={state.pageAyahs}
                                ayahHighlights={state.ayahHighlights}
                                activeAyahNumber={state.longPressMenu?.ayah.number}
                                onTouchStart={state.handleAyahTouchStart}
                                onTouchEnd={state.handleAyahTouchEnd}
                            />
                        )}
                    </div>
                )}
            </div>

            {/* ===== قائمة الإجراءات عند الضغط المطول ===== */}
            <LongPressActionMenu
                longPressMenu={state.longPressMenu}
                onClose={() => {
                    state.setLongPressMenu(null);
                    state.setShowColorPicker(false);
                }}
                showColorPicker={state.showColorPicker}
                setShowColorPicker={state.setShowColorPicker}
                isFavorite={state.isFavorite}
                onToggleFavorite={state.toggleFavorite}
                onToggleHighlight={state.toggleHighlight}
                onRemoveHighlight={state.removeHighlight}
                onCopyAyah={state.copyAyah}
                onShareAyah={state.shareAyah}
                setViewMode={state.setViewMode}
                setActiveAyahForReflection={state.setActiveAyahForReflection}
            />

            {/* ===== قائمة أوضاع العرض ===== */}
            <ViewModeMenu
                isOpen={state.isMenuOpen}
                onClose={() => state.setIsMenuOpen(false)}
                viewMode={state.viewMode}
                setViewMode={state.setViewMode}
                onReloadPage={() => state.loadPage(state.currentPage)}
            />

            {/* ===== شريط التمرير السفلي ===== */}
            <PageSlider
                currentPage={state.currentPage}
                sliderSurahInfo={state.sliderSurahInfo}
                isMenuOpen={state.isMenuOpen}
                onToggleMenu={() => state.setIsMenuOpen(!state.isMenuOpen)}
                onSliderChange={state.handleSliderChange}
                onSliderRelease={state.handleSliderRelease}
            />
        </div>
    );
};

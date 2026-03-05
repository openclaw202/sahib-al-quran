import React from 'react';
import { OpenQuranView } from 'open-quran-view/view/react';
import { useMushafView } from '../../hooks/useMushafView';

export const MushafView: React.FC = () => {
    const { mushafPage, setMushafPage, goNextPage, goPrevPage } = useMushafView();

    return (
        <div className="animate-in fade-in duration-700 h-full flex flex-col">
            <div className="mb-6 text-right px-2">
                <h2 className="text-2xl font-black text-[#1D1B4B]">المصحف الشريف</h2>
                <p className="text-[10px] font-bold text-gray-400 mt-1">تصفح المصحف بالرسم العثماني</p>
            </div>

            <div className="flex-1 min-h-[500px] bg-white rounded-[32px] border border-gray-100 p-4 shadow-sm relative overflow-hidden">
                <OpenQuranView
                    page={mushafPage}
                    onPageChange={(page: number) => setMushafPage(page)}
                    mushafLayout="hafs-v2"
                />

                {/* Page Controls */}
                <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-4">
                    <button
                        onClick={goNextPage}
                        className="w-10 h-10 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-[#1D1B4B] hover:scale-105 transition-transform"
                    >
                        <span>←</span>
                    </button>
                    <div className="px-5 py-2.5 rounded-2xl bg-[#1D1B4B] text-white text-[12px] font-black shadow-lg">
                        صفحة {mushafPage}
                    </div>
                    <button
                        onClick={goPrevPage}
                        className="w-10 h-10 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-[#1D1B4B] hover:scale-105 transition-transform"
                    >
                        <span>→</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

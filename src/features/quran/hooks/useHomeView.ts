import { useState, useRef, useCallback } from 'react';

export const useHomeView = () => {
    const [activeSlide, setActiveSlide] = useState(0);
    const sliderRef = useRef<HTMLDivElement>(null);

    const handleSliderScroll = useCallback(() => {
        if (sliderRef.current) {
            const scrollLeft = Math.abs(sliderRef.current.scrollLeft);
            const width = sliderRef.current.offsetWidth;
            const index = Math.round(scrollLeft / width);
            setActiveSlide(index);
        }
    }, []);

    return {
        activeSlide,
        sliderRef,
        handleSliderScroll,
    };
};

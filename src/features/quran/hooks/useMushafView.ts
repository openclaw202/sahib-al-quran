import { useState, useCallback } from 'react';

export const useMushafView = () => {
    const [mushafPage, setMushafPage] = useState(1);

    const goNextPage = useCallback(() => {
        setMushafPage(p => Math.min(604, p + 1));
    }, []);

    const goPrevPage = useCallback(() => {
        setMushafPage(p => Math.max(1, p - 1));
    }, []);

    return {
        mushafPage,
        setMushafPage,
        goNextPage,
        goPrevPage,
    };
};

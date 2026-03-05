import { useState } from 'react';

export const useSupplicationsView = () => {
    const [suppType, setSuppType] = useState<'quranic' | 'prophetic'>('quranic');
    return { suppType, setSuppType };
};

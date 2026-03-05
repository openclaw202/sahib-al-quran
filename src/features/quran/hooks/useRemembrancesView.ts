import { useState } from 'react';

export const useRemembrancesView = () => {
    const [remType, setRemType] = useState<'morning' | 'evening'>('morning');
    return { remType, setRemType };
};

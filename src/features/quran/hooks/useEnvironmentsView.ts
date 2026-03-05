import { useState } from 'react';

export const useEnvironmentsView = () => {
    const [envType, setEnvType] = useState<'makki' | 'madani'>('makki');

    return { envType, setEnvType };
};

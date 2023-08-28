import {useEffect, useState} from 'react';

export const useDebounce = (value: string | undefined, delay: number = 500) => {
    const [debouncedValue, setDebouncedValue] = useState<string | undefined>(value);

    useEffect(() => {
        const id = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return() => {
            clearTimeout(id);
        }
    }, [value, delay]);

    return debouncedValue;
}


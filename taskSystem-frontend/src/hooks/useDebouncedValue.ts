import { useEffect, useState } from "react";

// Wait for a short time before updating the value
export function useDebouncedValue<T>(value: T, delayMs = 250): T {
    // Store the delayed/debounced value
    const [debounced, setDebounced] = useState(value);


    useEffect(() => {

        const timer = setTimeout(() => setDebounced(value), delayMs);
        // Cancel the previous timer if the value changes again
        return () => clearTimeout(timer);
    }, [value, delayMs]);

    return debounced;
}
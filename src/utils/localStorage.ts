import * as React from 'react';

export function getStorageValue<T>(key: string, defaultValue: T, deserializer?: (value: string) => T): T;
export function getStorageValue<T>(
    key: string,
    defaultValue?: T,
    deserializer: (value: string) => T = JSON.parse,
) {
    try {
        const localStorageValue = localStorage.getItem(key);
        if (localStorageValue === null) {
            return defaultValue;
        } else {
            return deserializer(localStorageValue);
        }
    } catch {
        // If user is in private mode or has storage restriction
        // localStorage can throw. JSON.parse and JSON.stringify
        // can throw, too.
        return defaultValue;
    }
}

export function setStorageValue<T>(key: string, value: T, serializer: (value: T) => string = JSON.stringify) {
    try {
        localStorage.setItem(key, serializer(value));
    } catch {
        // If user is in private mode or has storage restriction
        // localStorage can throw. Also JSON.stringify can throw.
    }
}

export function removeStorageValue(key: string) {
    try {
        localStorage.removeItem(key);
    } catch {}
}

export function useStorageState<T>(key: string, defaultValue: T) {
    const [state, setState] = React.useState<T>(() => {
        return getStorageValue(key, defaultValue);
    });

    React.useEffect(() => {
        setStorageValue(key, state);
    }, [key, state]);

    return [state, setState] as const;
}

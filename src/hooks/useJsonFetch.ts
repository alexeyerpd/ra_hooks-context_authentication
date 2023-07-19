import * as React from 'react';

export function useJsonFetch<T>(url: string, opt?: RequestInit) {
    const [data, setData] = React.useState<T>();
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');
    const [triggerUpdate, setTriggerUpdate] = React.useState(false);

    const getData = async () => {
        try {
            setLoading(true);
            const response = await fetch(url, opt);
            if (response.status >= 300 || response.status < 200) {
                throw new Error(response.statusText);
            }
            const responseData = await response.json();
            setData(responseData);
        } catch (e) {
            if (typeof e === 'object' && e && 'message' in e) {
                setError(e.message as string);
            }
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        if (error) {
            setError('');
        }
        getData();
    }, [triggerUpdate]);

    const update = () => setTriggerUpdate((prev) => !prev);

    return {data, loading, error, update} as const;
}

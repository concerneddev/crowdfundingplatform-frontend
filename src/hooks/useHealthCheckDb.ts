import { useState, useEffect } from 'react';
import { checkHealthDb } from "../API/useractions"; // Adjust the path as needed

const useHealthCheckDb = (maxRetries: number = 3, retryDelay: number = 1000) => {
    const [status, setStatus] = useState<string>('loading');
    const [error, setError] = useState<string | null>(null);

    const checkDbHealth = async () => {
        let attempts = 0;

        while (attempts < maxRetries) {
            try {
                const res = await checkHealthDb();
                if (res.data.status === 'ok') {
                    setStatus(res.data.status);
                    setError(null);
                    return;
                } else {
                    setStatus('unknown');
                }
            } catch (err: any) {
                console.error("useHealthCheckDb_error: ", err);
                setError(err.message || 'Unknown error occurred');
            }

            attempts += 1;
            if (attempts < maxRetries) {
                await new Promise(res => setTimeout(res, retryDelay));
            }
        }

        setStatus('no');
    };

    return { checkDbHealth, status, error };
};

export default useHealthCheckDb;
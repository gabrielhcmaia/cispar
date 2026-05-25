import { useCallback, useEffect, useState } from 'react';
import { checkHealth } from '../services/healthService';

type Status = 'checking' | 'online' | 'offline';

type ApiStatus = {
  status: Status;
  latency: number | null;
  lastChecked: Date | null;
  refresh: () => void;
};

const POLL_MS = 30_000;

export function useApiStatus(): ApiStatus {
  const [status, setStatus] = useState<Status>('checking');
  const [latency, setLatency] = useState<number | null>(null);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);

  const check = useCallback(() => {
    const start = Date.now();
    checkHealth()
      .then(() => {
        setStatus('online');
        setLatency(Date.now() - start);
        setLastChecked(new Date());
      })
      .catch(() => {
        setStatus('offline');
        setLatency(null);
        setLastChecked(new Date());
      });
  }, []);

  useEffect(() => {
    check();
    const id = setInterval(check, POLL_MS);
    return () => clearInterval(id);
  }, [check]);

  return { status, latency, lastChecked, refresh: check };
}

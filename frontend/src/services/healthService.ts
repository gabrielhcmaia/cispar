import axios from 'axios';
import type { HealthStatus } from '../types/api';

const TIMEOUT_MS = 5_000;

export const checkHealth = (): Promise<HealthStatus> =>
  axios
    .get<HealthStatus>(`${import.meta.env.VITE_API_URL}/actuator/health`, { timeout: TIMEOUT_MS })
    .then((res) => res.data);

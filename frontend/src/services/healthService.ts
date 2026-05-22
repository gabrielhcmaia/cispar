import api from './api';
import type { HealthStatus } from '../types/api';

export const checkHealth = (): Promise<HealthStatus> =>
  api.get<HealthStatus>('/actuator/health').then((res) => res.data);

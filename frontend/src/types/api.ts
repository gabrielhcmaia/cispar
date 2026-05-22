export interface ApiError {
  status: number;
  error: string;
  message: string;
  details: string[] | null;
  timestamp: string;
}

export interface HealthStatus {
  status: 'UP' | 'DOWN' | 'UNKNOWN';
  components?: Record<string, { status: string }>;
}

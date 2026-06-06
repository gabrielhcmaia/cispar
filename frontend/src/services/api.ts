import axios, { AxiosError } from 'axios';

console.log('VITE_API_URL =', import.meta.env.VITE_API_URL);

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

const AUTH_ENDPOINTS = ['/auth/login', '/auth/refresh'];

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status;
    const url = error.config?.url ?? '';

    const isAuthCall = AUTH_ENDPOINTS.some((endpoint) =>
      url.includes(endpoint)
    );

    const isAlreadyOnLogin = window.location.pathname === '/login';

    if (
      (status === 401 || status === 403) &&
      !isAlreadyOnLogin &&
      !isAuthCall
    ) {
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default api;
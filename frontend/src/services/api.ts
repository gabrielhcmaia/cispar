import axios, { Axios, AxiosError } from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

const AUTH_ENDPOINTS = ['/auth/login', 'auth/refresh'];

api.interceptors.response.use(
  (response) => response,

  (error: AxiosError) => {
    const status = error.response?.status;
    const url = error.config?.url ?? '';

    const isAuthCall = AUTH_ENDPOINTS.some((endpoint) => url.includes(endpoint));
    const isAlredyOnLogin = window.location.pathname === '/login';

    if ((status === 401 || status === 403) && !isAlredyOnLogin && !isAuthCall) {
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default api;

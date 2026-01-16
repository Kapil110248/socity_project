import axios from 'axios';
import { useAuthStore } from './stores/auth-store';

const api = axios.create({
  baseURL: 'http://localhost:9000/api',
});

// Add a request interceptor to include the JWT token
api.interceptors.request.use(
  (config) => {
    // We cannot use the store directly here if it's outside of a component
    // but we can access the state from the storage or the store's getState method
    const token = (useAuthStore.getState() as any).token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;

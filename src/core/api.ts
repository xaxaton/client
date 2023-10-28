import axios, { HttpStatusCode } from 'axios';
import { useUserStore } from '@/store/user';
import { storage } from '@/utils/storage';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((req) => {
  req.headers['Authorization'] = storage.get('token');
  return req;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response.status === HttpStatusCode.Unauthorized) {
      const userStore = useUserStore();
      userStore.logout();
    }
    return Promise.reject(error);
  },
);

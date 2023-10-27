import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axios.interceptors.request.use((config) => {
  config.headers['Authorization'] = localStorage.getItem('token');
  return config;
});

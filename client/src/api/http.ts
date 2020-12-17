import axios from 'axios';

export const http = axios.create({
  baseURL: '/',
});

http.interceptors.response.use((config) => {
  if (config.status === 401) {
    window.location.href = '/login';
  }
  return config;
}, (error) => Promise.reject(error.response));

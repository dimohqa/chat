import axios from 'axios';

export const http = axios.create({
  baseURL: '/',
});

http.interceptors.response.use((config) => {
  console.log(config);
  if (config.status === 401) {
    window.location.href = '/login';
  }
  return config;
}, (error) => {
  console.log(error.response);
  if (error.response.status === 401) {
    window.location.href = '/login';
  }
  return Promise.reject(error);
});

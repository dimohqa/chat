import io from 'socket.io-client';
import { authApi } from '@/api/auth';

export const socket = io('http://localhost:3000/', {
  autoConnect: false,
});

socket.on('errorAuth', () => {
  window.location.href = '/login';
  socket.disconnect();
});

socket.on('updateToken', async () => {
  await authApi.updateToken();
});

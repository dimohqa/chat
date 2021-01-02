import io from 'socket.io-client';
import { userApi } from '@/api/user';

export const socket = io('http://localhost:3000/', {
  autoConnect: false,
});

socket.on('errorAuth', () => {
  window.location.href = '/login';
  socket.disconnect();
});

socket.on('updateToken', async () => {
  await userApi.updateToken();
});

import io from 'socket.io-client';

export const socket = io('http://localhost:3000/', {
  autoConnect: false,
});

socket.on('errorAuth', () => {
  window.location.href = '/login';
  socket.disconnect();
});

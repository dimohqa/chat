import React, { useEffect } from 'react';
import { socket } from '../../helpers/socket';

export const DialogsList = () => {
  useEffect(() => {
    socket.emit('dialogs');
  }, []);

  return (
    <div>dialogs is coming...</div>
  );
};

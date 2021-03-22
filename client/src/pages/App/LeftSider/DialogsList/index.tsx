import React, { useEffect } from 'react';
import { socket } from '../../../../helpers/socket';

export const DialogsList = () => {
  useEffect(() => {
    socket.emit('dialogs', () => {});
  }, []);

  return (
    <div style={{ backgroundColor: '#f3f4f6', height: '100%' }}>
      dialogs is coming...
    </div>
  );
};

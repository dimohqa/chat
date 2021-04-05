import React, { useEffect } from 'react';
import { Layout } from 'antd';
import { Loader } from '@/components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { setConnectedStatus } from '@/store/socket';
import { RootState } from '@/store/rootReducer';
import { Chat } from './Chat';
import { LeftSider } from './LeftSider';
import { NavSider } from './NavSider';
import { socket } from '../../helpers/socket';

export const App = () => {
  const isConnectedSocket = useSelector(
    (state: RootState) => state.socket.connected,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    socket.connect();

    socket.on('connection', (response: boolean) => {
      dispatch(setConnectedStatus(response));
    });
  }, [dispatch]);

  if (!isConnectedSocket) {
    return <Loader size="large" />;
  }

  return (
    <Layout style={{ height: '100%' }}>
      <NavSider />
      <LeftSider />
      <Chat />
    </Layout>
  );
};

import React, { useCallback, useEffect } from 'react';
import { Layout } from 'antd';
import { Loader } from '@/components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { setConnectedStatus } from '@/store/socket';
import { RootState } from '@/store/rootReducer';
import { Chat } from '@/components/Chat';
import { setFriends, setFriendsFetchingStatus } from '@/store/friends';
import { friendsApi } from '@/api/friends';
import { LeftSider } from './LeftSider';
import { NavSider } from './NavSider';
import { socket } from '../../helpers/socket';

export const App = () => {
  const isConnectedSocket = useSelector(
    (state: RootState) => state.socket.connected,
  );
  const { friendsIsFetching } = useSelector(
    (state: RootState) => state.friends,
  );

  const dispatch = useDispatch();

  const getFriends = useCallback(async () => {
    dispatch(setFriendsFetchingStatus(true));
    const result = await friendsApi.searchByQuery('');

    if (result.err) {
      dispatch(setFriendsFetchingStatus(false));

      return;
    }

    dispatch(setFriends(result.val));
    dispatch(setFriendsFetchingStatus(false));
  }, []);

  useEffect(() => {
    getFriends();
  }, []);

  useEffect(() => {
    socket.connect();

    socket.on('connection', (response: boolean) => {
      dispatch(setConnectedStatus(response));
    });
  }, [dispatch]);

  if (!isConnectedSocket || friendsIsFetching) {
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

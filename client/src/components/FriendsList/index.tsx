import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { Search } from '@/components/Search';
import { Friend } from '@/types/Friend';
import { Loader } from '@/components/Loader';
import { FriendCard } from '@/components/FriendsList/FriendCard';
import { socket } from '../../helpers/socket';

export const FriendsList = () => {
  const [friendsIsFetching, setFriendsFetchingStatus] = useState<boolean>(true);
  const [friendsList, setFriendsList] = useState<Friend[]>();

  useEffect(() => {
    socket.emit('friends', (friends: Friend[]) => {
      setFriendsFetchingStatus(false);
      setFriendsList(friends);
    });
  }, []);

  return (
    <Layout>
      <Header style={{ backgroundColor: '#fff' }}>
        <Search placeholder="Поиск друзей" />
      </Header>
      <div>
        {friendsIsFetching ? (
          <Loader size="small" />
        ) : (
          friendsList?.map((friend: Friend) => (
            <FriendCard
              key={friend._id}
              lastName={friend.firstName}
              firstName={friend.lastName}
            />
          ))
        )}
      </div>
    </Layout>
  );
};

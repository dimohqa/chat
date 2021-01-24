import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { Search } from '@/components/Search';
import { Friend } from '@/types/Friend';
import { Loader } from '@/components/Loader';
import { FriendCard } from '@/components/FriendsList/FriendCard';
import { FriendsApi } from '@/api/friends';

export const FriendsList = () => {
  const [friendsIsFetching, setFriendsFetchingStatus] = useState<boolean>(true);
  const [friendsList, setFriendsList] = useState<Friend[]>();

  const getFriends = async (searchString: string) => {
    const result = await FriendsApi.searchByQuery(searchString);

    if (result.err) {
      setFriendsFetchingStatus(false);
      return;
    }

    setFriendsFetchingStatus(false);
    setFriendsList(result.val);
  };

  useEffect(() => {
    getFriends('');
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
              avatar={friend.avatar}
            />
          ))
        )}
      </div>
    </Layout>
  );
};

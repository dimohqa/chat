import React, { useCallback, useEffect, useState } from 'react';
import { Layout } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { SearchInput } from '@/components/SearchInput';
import { FriendsList } from '@/components/FriendsList';
import { friendsApi } from '@/api/friends';
import { Friend } from '@/types/Friend';
import styled from 'styled-components';
import { Loader } from '@/components/Loader';

const NotFound = styled.span`
  display: flex;
  justify-content: center;
`;

export const Friends = () => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [friendsIsFetching, setFriendsFetchingStatus] = useState<boolean>(true);

  const onSearchFriends = useCallback(async (searchValue: string) => {
    setFriendsFetchingStatus(true);

    const result = await friendsApi.searchByQuery(searchValue);

    if (result.err) {
      setFriendsFetchingStatus(false);

      return;
    }

    setFriends(result.val);
    setFriendsFetchingStatus(false);
  }, []);

  useEffect(() => {
    onSearchFriends('');
  }, []);

  return (
    <Layout>
      <Header style={{ backgroundColor: '#f3f4f6' }}>
        <SearchInput placeholder="Поиск друзей" callbackApi={onSearchFriends} />
      </Header>
      <div>
        {friendsIsFetching ? (
          <Loader size="small" />
        ) : (
          <FriendsList friends={friends} onChangeFriends={setFriends} />
        )}
        {friends.length === 0 && !friendsIsFetching && (
          <NotFound>К сожалению, ничего не найдено.</NotFound>
        )}
      </div>
    </Layout>
  );
};

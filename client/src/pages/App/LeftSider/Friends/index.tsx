import React, { useCallback, useEffect, useState } from 'react';
import { Layout, Spin } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { friendsApi } from '@/api/friends';
import { Friend } from '@/types/Friend';
import styled from 'styled-components';
import { FriendsList } from '../../FriendsList';
import { SearchInput } from '../../components/SearchInput';

import './Friends.css';

const NotFound = styled.span`
  display: flex;
  justify-content: center;
  margin: 20px 0 0;
`;

export const Friends = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [friends, setFriends] = useState<Friend[]>([]);
  const [friendsIsFetching, setFriendsFetchingStatus] = useState<boolean>(true);
  const [friendsIsNotYet, setFriendsNotStatus] = useState<boolean>(false);
  const [friendsIsNotFound, setFriendsNotFoundStatus] = useState<boolean>(
    false,
  );

  const onSearchFriends = useCallback(async () => {
    setFriendsFetchingStatus(true);

    const result = await friendsApi.searchByQuery(searchValue);

    if (result.err) {
      setFriendsFetchingStatus(false);

      return;
    }

    setFriendsNotFoundStatus(result.val.length === 0 && !friendsIsNotYet);

    setFriends(result.val);
    setFriendsFetchingStatus(false);
  }, [searchValue]);

  const getFriends = useCallback(async () => {
    setFriendsFetchingStatus(true);
    const result = await friendsApi.searchByQuery('');

    if (result.err) {
      setFriendsFetchingStatus(false);

      return;
    }

    if (result.val.length === 0) {
      setFriendsNotStatus(true);
    }

    setFriends(result.val);
    setFriendsFetchingStatus(false);
  }, []);

  useEffect(() => {
    getFriends();
  }, []);

  return (
    <Layout>
      <Header style={{ backgroundColor: '#f3f4f6' }}>
        <SearchInput
          searchValue={searchValue}
          placeholder="Поиск друзей"
          callbackApi={onSearchFriends}
          onChangeSearchValue={setSearchValue}
        />
      </Header>
      <Spin
        spinning={friendsIsFetching}
        wrapperClassName="friends__spin-wrapper"
      >
        <FriendsList friends={friends} onChangeFriends={setFriends} />
        {friendsIsNotFound && !friendsIsFetching && (
          <NotFound>К сожалению, ничего не найдено</NotFound>
        )}
        {friendsIsNotYet && !friendsIsFetching && (
          <NotFound>К сожалению, у вас пока нет друзей</NotFound>
        )}
      </Spin>
    </Layout>
  );
};

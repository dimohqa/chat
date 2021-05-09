import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Spin } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { friendsApi } from '@/api/friends';
import styled from 'styled-components';
import { Friend } from '@/types/Friend';
import { SearchInput } from '../../components/SearchInput';
import { FriendsList } from './FriendsList';
import { FullHeightLayout, ScrollContainer } from '../../components/Container';

import './Friends.css';

const NotFound = styled.span`
  display: flex;
  justify-content: center;
  margin: 20px 0 0;
`;

export const Friends = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [friends, setFriends] = useState<Friend[]>([]);
  const [
    searchFriendsIsFetching,
    setSearchFriendsFetchingStatus,
  ] = useState<boolean>(false);

  const friendsIsNotFound = useMemo(
    () => searchValue.length !== 0 && friends.length === 0,
    [friends.length, searchValue.length],
  );
  const friendsIsNotYet = useMemo(
    () => searchValue.length === 0 && friends.length === 0,
    [friends.length, searchValue.length],
  );

  const onSearchFriends = useCallback(async () => {
    setSearchFriendsFetchingStatus(true);

    const result = await friendsApi.searchByQuery(searchValue);

    if (result.err) {
      setSearchFriendsFetchingStatus(false);

      return;
    }

    setFriends(result.val);
    setSearchFriendsFetchingStatus(false);
  }, [searchValue]);

  useEffect(() => {
    onSearchFriends();
  }, []);

  return (
    <FullHeightLayout>
      <Header style={{ backgroundColor: '#f3f4f6' }}>
        <SearchInput
          searchValue={searchValue}
          placeholder="Поиск друзей"
          callbackApi={onSearchFriends}
          onChangeSearchValue={setSearchValue}
        />
      </Header>
      <ScrollContainer>
        <Spin
          spinning={searchFriendsIsFetching}
          wrapperClassName="friends__spin-wrapper"
        >
          <FriendsList friends={friends} onChangeFriends={setFriends} />
          {friendsIsNotFound && !searchFriendsIsFetching && (
            <NotFound>К сожалению, ничего не найдено</NotFound>
          )}
          {friendsIsNotYet && !searchFriendsIsFetching && (
            <NotFound>К сожалению, у вас пока нет друзей</NotFound>
          )}
        </Spin>
      </ScrollContainer>
    </FullHeightLayout>
  );
};

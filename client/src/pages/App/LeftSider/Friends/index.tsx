import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Layout, Spin } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { friendsApi } from '@/api/friends';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { setFriends } from '@/store/friends';
import { RootState } from '@/store/rootReducer';
import { SearchInput } from '../../components/SearchInput';
import { FriendsList } from '../../FriendsList';

import './Friends.css';

const NotFound = styled.span`
  display: flex;
  justify-content: center;
  margin: 20px 0 0;
`;

export const Friends = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [
    searchFriendsIsFetching,
    setSearchFriendsFetchingStatus,
  ] = useState<boolean>(false);

  const { friends, friendsIsFetching } = useSelector(
    (state: RootState) => state.friends,
  );
  const friendsIsNotFound = useMemo(
    () => searchValue.length !== 0 && friends.length === 0,
    [friends.length, searchValue.length],
  );
  const friendsIsNotYet = useMemo(
    () => searchValue.length === 0 && friends.length === 0,
    [friends.length, searchValue.length],
  );

  const dispatch = useDispatch();

  const onSearchFriends = useCallback(async () => {
    setSearchFriendsFetchingStatus(true);

    const result = await friendsApi.searchByQuery(searchValue);

    if (result.err) {
      setSearchFriendsFetchingStatus(false);

      return;
    }

    dispatch(setFriends(result.val));
    setSearchFriendsFetchingStatus(false);
  }, [searchValue]);

  useEffect(() => {
    onSearchFriends();
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
        spinning={friendsIsFetching || searchFriendsIsFetching}
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

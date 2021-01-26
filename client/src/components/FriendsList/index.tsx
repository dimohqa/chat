import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Layout } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { Search } from '@/components/Search';
import { Loader } from '@/components/Loader';
import { FriendCard } from '@/components/FriendsList/FriendCard';
import { friendsApi } from '@/api/friends';
import { User } from '@/types/User';
import { Friend } from '@/types/Friend';
import { userApi } from '@/api/user';
import { FoundUsersList } from '@/components/FriendsList/FoundUsersList';
import styled from 'styled-components';

const NotFound = styled.span`
  display: flex;
  justify-content: center;
`;

export const FriendsList = () => {
  const [friendsList, setFriendsList] = useState<Friend[]>([]);
  const [usersList, setUserList] = useState<User[]>([]);

  const [friendsIsFetching, setFriendsFetchingStatus] = useState<boolean>(true);
  const [usersIsFetching, setUsersFetchingStatus] = useState<boolean>(false);

  const searchedUsersIsVisible = useMemo(() => usersList.length === 0, [
    usersList,
  ]);
  const notFoundMessage = useMemo(() => {
    if (
      usersList.length === 0 &&
      friendsList.length === 0 &&
      !usersIsFetching &&
      !friendsIsFetching
    ) {
      return <NotFound>К сожалению, ничего не найдено. =(</NotFound>;
    }

    return null;
  }, [friendsIsFetching, friendsList, usersIsFetching, usersList]);

  const onFilterFriendById = useCallback(
    (friendId: string) =>
      setFriendsList(friendsList.filter(friend => friend._id !== friendId)),
    [friendsList],
  );

  const onSearchUsers = useCallback(async (searchValue: string) => {
    setUsersFetchingStatus(true);

    const result = await userApi.search(searchValue);

    if (result.err) {
      setUsersFetchingStatus(false);

      return;
    }

    setUserList(result.val);
    setUsersFetchingStatus(false);
  }, []);

  const onSearchFriends = useCallback(async (searchValue: string) => {
    setFriendsFetchingStatus(true);

    const result = await friendsApi.searchByQuery(searchValue);

    if (result.err) {
      setFriendsFetchingStatus(false);
      return;
    }

    setFriendsList(result.val);
    setFriendsFetchingStatus(false);
  }, []);

  const onSearch = useCallback(
    (searchValue: string) => {
      onSearchFriends(searchValue);
      onSearchUsers(searchValue);
    },
    [onSearchFriends, onSearchUsers],
  );

  useEffect(() => {
    onSearchFriends('');
  }, []);

  return (
    <Layout>
      <Header style={{ backgroundColor: '#fff' }}>
        <Search placeholder="Поиск друзей" callbackApi={onSearch} />
      </Header>
      <div style={{ backgroundColor: '#fff' }}>
        {friendsIsFetching || usersIsFetching ? (
          <Loader size="small" />
        ) : (
          <>
            {friendsList.map((friend: Friend) => (
              <FriendCard
                key={friend._id}
                id={friend._id}
                lastName={friend.firstName}
                firstName={friend.lastName}
                avatar={friend.avatar}
                onDeleteFriendById={onFilterFriendById}
              />
            ))}
            <FoundUsersList
              usersList={usersList}
              visible={searchedUsersIsVisible}
            />
          </>
        )}
        {notFoundMessage}
      </div>
    </Layout>
  );
};

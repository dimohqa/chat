import React, { useCallback, useState } from 'react';
import { Button, Layout, Menu, notification } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { SearchInput } from '@/components/SearchInput';
import { User } from '@/types/User';
import { userApi } from '@/api/user';
import { Card } from '@/components/Card';
import { friendsApi } from '@/api/friends';
import styled from 'styled-components';
import { Loader } from '@/components/Loader';

const NotFound = styled.span`
  display: flex;
  justify-content: center;
`;

const FriendsListContainer = styled.div`
  height: 100vh;
  overflow: auto;
`;

export const Search = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [usersList, setUserList] = useState<User[]>([]);
  const [usersIsFetching, setUsersFetchingStatus] = useState<boolean>(false);
  const [usersNotFound, setUsersNotFoundStatus] = useState<boolean>(false);
  const [usersIsStayed, setUsersStayedStatus] = useState<boolean>(false);

  const onSearchUsers = useCallback(
    async (skip?: number) => {
      setUsersFetchingStatus(true);

      const result = await userApi.search(searchValue, skip);

      if (result.err) {
        setUsersFetchingStatus(false);

        return;
      }

      if (result.val.foundItems.length === 0 && searchValue !== '') {
        setUsersNotFoundStatus(true);
      }

      if (result.val.foundItems.length < result.val.totalCount) {
        setUsersStayedStatus(true);
      }

      setUserList(result.val.foundItems);
      setUsersFetchingStatus(false);
    },
    [searchValue],
  );

  const addFriend = async (id: string) => {
    const result = await friendsApi.add(id);

    if (result.err) {
      notification.error({
        message: 'Ошибка',
        description: result.val,
        duration: 3,
      });

      return;
    }

    notification.success({
      message: 'Успешно выполнено',
      duration: 3,
    });
  };

  const dropdownMenu = (id: string) => (
    <Menu>
      <Menu.Item onClick={() => addFriend(id)}>Добавить в друзья</Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ height: '100vh' }}>
      <Header style={{ backgroundColor: '#f3f4f6' }}>
        <SearchInput
          searchValue={searchValue}
          onChangeSearchValue={setSearchValue}
          placeholder="Поиск пользователей"
          callbackApi={onSearchUsers}
        />
      </Header>
      <FriendsListContainer>
        {usersIsFetching ? (
          <Loader size="default" />
        ) : (
          usersList.map(user => (
            <Card
              lastName={user.lastName}
              firstName={user.firstName}
              avatar={user.avatar}
              menu={() => dropdownMenu(user._id)}
            />
          ))
        )}
        {usersIsStayed && (
          <Button onClick={() => onSearchUsers(usersList.length)} type="link">
            Загрузить еще
          </Button>
        )}
        {usersNotFound && (
          <NotFound>К сожалению, таких пользователей не найдено.</NotFound>
        )}
      </FriendsListContainer>
    </Layout>
  );
};

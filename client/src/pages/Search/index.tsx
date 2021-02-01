import React, { useCallback, useState } from 'react';
import { Layout, Menu, notification } from 'antd';
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

export const Search = () => {
  const [usersList, setUserList] = useState<User[]>([]);
  const [usersIsFetching, setUsersFetchingStatus] = useState<boolean>(false);
  const [usersNotFound, setUsersNotFoundStatus] = useState<boolean>(false);

  const onSearchUsers = useCallback(async (searchValue: string) => {
    setUsersFetchingStatus(true);

    const result = await userApi.search(searchValue);

    if (result.err) {
      setUsersFetchingStatus(false);

      return;
    }

    if (result.val.length === 0 && searchValue !== '') {
      setUsersNotFoundStatus(true);
    }

    setUserList(result.val);
    setUsersFetchingStatus(false);
  }, []);

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
    <Layout>
      <Header style={{ backgroundColor: '#f3f4f6' }}>
        <SearchInput
          placeholder="Поиск пользователей"
          callbackApi={onSearchUsers}
        />
      </Header>
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
      {usersNotFound && (
        <NotFound>К сожалению, таких пользователей не найдено.</NotFound>
      )}
    </Layout>
  );
};

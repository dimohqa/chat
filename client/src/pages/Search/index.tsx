import React, { useCallback, useState } from 'react';
import { Button, Layout, Menu, notification, Spin } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { SearchInput } from '@/components/SearchInput';
import { User } from '@/types/User';
import { userApi } from '@/api/user';
import { Card } from '@/components/Card';
import { friendsApi } from '@/api/friends';
import styled from 'styled-components';

const NotFound = styled.span`
  display: flex;
  justify-content: center;
`;

const FriendsListContainer = styled.div`
  height: 100vh;
  overflow: auto;
`;

const UploadMoreContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const UploadMoreButton = styled(Button)`
  margin: 20px 0;
`;

export const Search = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [usersList, setUserList] = useState<User[]>([]);
  const [usersIsFetching, setUsersFetchingStatus] = useState<boolean>(false);
  const [
    usersPaginationIsFetching,
    setUsersPaginationFetchingStatus,
  ] = useState<boolean>(false);
  const [usersNotFound, setUsersNotFoundStatus] = useState<boolean>(false);
  const [usersIsStayed, setUsersStayedStatus] = useState<boolean>(false);

  const onSearchUsers = useCallback(async () => {
    setUsersFetchingStatus(true);

    const result = await userApi.search(searchValue);

    if (result.err) {
      setUsersFetchingStatus(false);

      return;
    }

    setUsersNotFoundStatus(result.val.totalCount === 0 && searchValue !== '');
    setUsersStayedStatus(result.val.foundItems.length < result.val.totalCount);

    setUserList(result.val.foundItems);

    setUsersFetchingStatus(false);
  }, [searchValue]);

  const onUploadMoreUsers = useCallback(async () => {
    setUsersPaginationFetchingStatus(true);

    const result = await userApi.search(searchValue, usersList.length);

    if (result.err) {
      setUsersPaginationFetchingStatus(false);

      return;
    }

    setUsersStayedStatus(
      usersList.length + result.val.foundItems.length < result.val.totalCount,
    );

    setUserList([...usersList, ...result.val.foundItems]);

    setUsersPaginationFetchingStatus(false);
  }, [searchValue, usersList]);

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
        <Spin spinning={usersIsFetching}>
          {usersList.map(user => (
            <Card
              key={user._id}
              lastName={user.lastName}
              firstName={user.firstName}
              avatar={user.avatar}
              menu={() => dropdownMenu(user._id)}
            />
          ))}
          <UploadMoreContainer>
            {usersIsStayed && !usersPaginationIsFetching && (
              <UploadMoreButton onClick={onUploadMoreUsers} type="link">
                Загрузить еще
              </UploadMoreButton>
            )}
            <Spin spinning={usersPaginationIsFetching} />
          </UploadMoreContainer>
          {usersNotFound && !usersIsFetching && (
            <NotFound>К сожалению, таких пользователей не найдено.</NotFound>
          )}
        </Spin>
      </FriendsListContainer>
    </Layout>
  );
};

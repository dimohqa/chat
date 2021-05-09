import React, { useCallback, useState } from 'react';
import { Button, Spin } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { SearchUser } from '@/types/User';
import { userApi } from '@/api/user';
import styled from 'styled-components';
import { useHistory, useParams } from 'react-router';
import { UserCard } from '../../components/UserCard';
import { SearchInput } from '../../components/SearchInput';
import { FullHeightLayout, ScrollContainer } from '../../components/Container';

const NotFound = styled.span`
  display: flex;
  justify-content: center;
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
  const [usersList, setUserList] = useState<SearchUser[]>([]);
  const [usersIsFetching, setUsersFetchingStatus] = useState<boolean>(false);
  const [
    usersPaginationIsFetching,
    setUsersPaginationFetchingStatus,
  ] = useState<boolean>(false);
  const [usersNotFound, setUsersNotFoundStatus] = useState<boolean>(false);
  const [usersIsStayed, setUsersStayedStatus] = useState<boolean>(false);

  const history = useHistory();

  const currentUser = useParams<{ id: string }>();

  const isActive = (userId: string) => currentUser.id === userId;

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

  const changeFriendStatus = useCallback(
    (id: string, isFriend: boolean) => {
      setUserList(
        usersList.map(user => ({
          ...user,
          isFriend: user._id === id ? isFriend : user.isFriend,
        })),
      );
    },
    [usersList],
  );

  const openChatWindow = (userId: string) => {
    history.push(`/search/${userId}`);
  };

  return (
    <FullHeightLayout>
      <Header style={{ backgroundColor: '#f3f4f6' }}>
        <SearchInput
          searchValue={searchValue}
          onChangeSearchValue={setSearchValue}
          placeholder="Поиск пользователей"
          callbackApi={onSearchUsers}
        />
      </Header>
      <ScrollContainer>
        <Spin spinning={usersIsFetching}>
          {usersList.map(user => (
            <UserCard
              key={user._id}
              user={user}
              isFriend={user.isFriend}
              isActive={isActive(user._id)}
              changeFriendStatus={changeFriendStatus}
              onClick={openChatWindow}
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
      </ScrollContainer>
    </FullHeightLayout>
  );
};

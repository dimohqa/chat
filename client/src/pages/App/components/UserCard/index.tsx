import React, { useCallback, useMemo } from 'react';
import { Avatar, notification } from 'antd';
import styled from 'styled-components';
import {
  UserAddOutlined,
  UserDeleteOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { friendsApi } from '@/api/friends';
import { upperCaseFirstSymbol } from '../../../../helpers/upperCaseFirstSymbol';
import { StyledCard, Content, Title } from '../StyledCard';

const IconsWrapper = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  visibility: hidden;
`;

const UserDeleteIcon = styled(UserDeleteOutlined)`
  font-size: 16px;
  color: red;
`;

const UserAddIcon = styled(UserAddOutlined)`
  font-size: 16px;
  color: green;
`;

type Props = {
  lastName: string;
  firstName: string;
  avatar: string;
  id: string;
  isFriend: boolean;
  changeFriendStatus: (id: string, isFriend?: boolean) => void;
};

export const UserCard = (props: Props) => {
  const fullName = useMemo(
    () =>
      `${upperCaseFirstSymbol(props.firstName)} ${upperCaseFirstSymbol(
        props.lastName,
      )}`,
    [props.firstName, props.lastName],
  );

  const addFriend = useCallback(async () => {
    const result = await friendsApi.add(props.id);

    if (result.err) {
      notification.error({
        message: 'Ошибка',
        description: result.val,
        duration: 3,
      });

      return;
    }

    props.changeFriendStatus(props.id, true);

    notification.success({
      message: `${fullName} добавлен в друзья`,
      duration: 3,
    });
  }, [props.id, props.changeFriendStatus, fullName]);
  const deleteFriend = useCallback(async () => {
    const result = await friendsApi.delete(props.id);

    if (result.err) {
      notification.error({
        message: 'Ошибка',
        description: result.val,
        duration: 3,
      });

      return;
    }

    props.changeFriendStatus(props.id, false);

    notification.warning({
      message: `${fullName} удален из друзей`,
      duration: 3,
    });
  }, [props.id, props.changeFriendStatus, fullName]);

  return (
    <StyledCard>
      <Avatar
        size={56}
        src={props.avatar}
        icon={!props.avatar && <UserOutlined />}
      />
      <Content>
        <Title>{fullName}</Title>
        <span>Новосибирск, 21 год</span>
      </Content>
      <IconsWrapper className="icons-wrapper">
        {props.isFriend ? (
          <UserDeleteIcon onClick={deleteFriend} />
        ) : (
          <UserAddIcon onClick={addFriend} />
        )}
      </IconsWrapper>
    </StyledCard>
  );
};

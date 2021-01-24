import React, { useMemo } from 'react';
import { Avatar, Card } from 'antd';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { UserDeleteOutlined, UserOutlined } from '@ant-design/icons';
import { upperCaseFirstSymbol } from '../../../helpers/upperCaseFirstSymbol';

const StyledCard = styled(Card)`
  padding: 8px 12px 8px 8px;
  height: 74px;

  .ant-card-body {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0;
  }
  .ant-card-body::before {
    content: inherit;
  }
  .ant-card-body::after {
    content: inherit;
  }
`;

const Content = styled.div`
  padding: 8px 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.span`
  font-size: 15px;
  line-height: 15px;
`;

const StyledLink = styled(Link)`
  font-size: 14px;
  line-height: 14px;
  &:hover {
    text-decoration: underline;
  }
`;

const DeleteButton = styled.div`
  display: flex;
  align-items: center;
  margin-right: 12px;

  &:hover {
    cursor: pointer;
  }
`;

const StyledUserDeleteOutlined = styled(UserDeleteOutlined)`
  &:hover {
    color: #d9472b;
  }
`;

const Body = styled.div`
  display: flex;
`;

type Props = {
  lastName: string;
  firstName: string;
  avatar: string;
};

export const FriendCard = (props: Props) => {
  const fullName = useMemo(
    () =>
      `${upperCaseFirstSymbol(props.firstName)} ${upperCaseFirstSymbol(
        props.lastName,
      )}`,
    [props.firstName, props.lastName],
  );

  return (
    <StyledCard>
      <Body>
        <Avatar
          size={56}
          src={props.avatar}
          icon={!props.avatar && <UserOutlined />}
        />
        <Content>
          <Title>{fullName}</Title>
          <StyledLink to="/">Написать сообщение</StyledLink>
        </Content>
      </Body>
      <DeleteButton>
        <StyledUserDeleteOutlined />
      </DeleteButton>
    </StyledCard>
  );
};

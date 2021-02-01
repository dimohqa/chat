import React, { useMemo } from 'react';
import { Avatar, Dropdown, Card as AntdCard } from 'antd';
import styled from 'styled-components';
import { EllipsisOutlined, UserOutlined } from '@ant-design/icons';
import { upperCaseFirstSymbol } from '../../helpers/upperCaseFirstSymbol';

const StyledCard = styled(AntdCard)`
  padding: 8px 12px 8px 8px;
  height: 74px;
  background-color: #f3f4f6;

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
  &:hover {
    background-color: #f0f0f0;
    cursor: pointer;
  }
`;

const DropdownWrapper = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
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

const Body = styled.div`
  width: 100%;
  display: flex;
`;

type Props = {
  lastName: string;
  firstName: string;
  avatar: string;
  menu: () => React.ReactElement;
};

export const Card = (props: Props) => {
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
          <span>Новосибирск, 21 год</span>
        </Content>
        <DropdownWrapper>
          <Dropdown overlay={props.menu} placement="bottomCenter">
            <EllipsisOutlined style={{ fontSize: '20px' }} />
          </Dropdown>
        </DropdownWrapper>
      </Body>
    </StyledCard>
  );
};

import React, { useMemo } from 'react';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Friend } from '@/types/Friend';
import { StyledCard, Content, Title } from '../../../components/StyledCard';
import { upperCaseFirstSymbol } from '../../../../../helpers/upperCaseFirstSymbol';

type Props = {
  user: Friend;
  isActive: boolean;
};

export const DialogCard = (props: Props) => {
  const fullName = useMemo(
    () =>
      `${upperCaseFirstSymbol(
        props.user.firstName || 'unknown',
      )} ${upperCaseFirstSymbol(props.user.lastName || '')}`,
    [props.user],
  );

  return (
    <StyledCard isActive={props.isActive}>
      <Avatar
        size={56}
        src={props.user.avatar}
        icon={!props.user.avatar && <UserOutlined />}
      />
      <Content>
        <Title>{fullName}</Title>
        <span>...</span>
      </Content>
    </StyledCard>
  );
};

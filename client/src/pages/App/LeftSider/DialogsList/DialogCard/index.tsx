import React, { useMemo } from 'react';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { StyledCard, Content, Title } from '../../../components/StyledCard';
import { upperCaseFirstSymbol } from '../../../../../helpers/upperCaseFirstSymbol';

type Props = {
  avatar: string;
  firstName: string;
  lastName: string;
};

export const DialogCard = (props: Props) => {
  const fullName = useMemo(
    () =>
      `${upperCaseFirstSymbol(props.firstName)} ${upperCaseFirstSymbol(
        props.lastName,
      )}`,
    [props.firstName, props.lastName],
  );

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
    </StyledCard>
  );
};

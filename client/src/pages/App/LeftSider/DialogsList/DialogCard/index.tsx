import React, { useMemo } from 'react';
import { Avatar, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Friend } from '@/types/Friend';
import { Message } from '@/types/Message';
import { useHistory } from 'react-router';
import { StyledCard, Content, Title } from '../../../components/StyledCard';
import { upperCaseFirstSymbol } from '../../../../../helpers/upperCaseFirstSymbol';

type Props = {
  user: Friend;
  // dialogId: string;
  latestMessage: Message;
  isActive: boolean;
};

export const DialogCard = (props: Props) => {
  const history = useHistory();

  const fullName = useMemo(
    () =>
      `${upperCaseFirstSymbol(
        props.user.firstName || 'unknown',
      )} ${upperCaseFirstSymbol(props.user.lastName || '')}`,
    [props.user],
  );

  const openChatFrame = () => {
    if (props.isActive) {
      return;
    }
    history.push(`/chat/${props.user._id}`);
  };

  return (
    <StyledCard $isActive={props.isActive} onClick={openChatFrame}>
      <Avatar
        size={56}
        src={props.user.avatar}
        icon={!props.user.avatar && <UserOutlined />}
      />
      <Content>
        <Title>{fullName}</Title>
        {props.latestMessage && (
          <Space size={4}>
            <Avatar
              size={22}
              src={props.latestMessage.author.avatar}
              icon={!props.latestMessage.author.avatar && <UserOutlined />}
            />
            <span>{props.latestMessage.content}</span>
          </Space>
        )}
      </Content>
    </StyledCard>
  );
};

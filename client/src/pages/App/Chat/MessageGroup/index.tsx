import React from 'react';
import { Message as MessageType } from '@/types/Message';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Message } from '../Message';

type Props = {
  messages: MessageType[];
};

export const MessageGroup = (props: Props) => (
  <div>
    <Avatar
      size={32}
      src={props.messages[0].author.avatar}
      icon={!props.messages[0].author.avatar && <UserOutlined />}
    />
    {props.messages.map(message => (
      <Message key={message._id} message={message} />
    ))}
  </div>
);

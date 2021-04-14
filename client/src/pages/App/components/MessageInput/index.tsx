import React, { ChangeEvent, useState } from 'react';
import { Input } from 'antd';
import styled from 'styled-components';
import { SendOutlined } from '@ant-design/icons';
import { useParams } from 'react-router';
import { socket } from '../../../../helpers/socket';

const InputWrapper = styled.div`
  display: flex;
  height: 80px;
  align-items: center;
  padding: 0 20px;
  background-color: #f5f5f5;
`;

const SendIcon = styled(SendOutlined)`
  display: flex;
  align-items: center;
  margin: 0 20px;
  font-size: 20px;
  color: #1890ff;

  &:hover {
    cursor: pointer;
  }
`;

export const MessageInput = () => {
  const [message, setMessage] = useState<string>('');

  const user = useParams<{ path: string; id: string }>();

  const onChangeMessage = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const sendMessage = () => {
    socket.emit('sendMessage', {
      recipientId: user.id,
      content: message,
    });
    setMessage('');
  };

  return (
    <InputWrapper>
      <Input value={message} onChange={onChangeMessage} size="large" />
      <SendIcon onClick={sendMessage} />
    </InputWrapper>
  );
};

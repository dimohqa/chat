import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Message } from '@/types/Message';
import styled from 'styled-components';
import { socket } from '../../../../helpers/socket';

const MessagesWrapper = styled.div`
  flex-grow: 1;
`;

export const MessageList = () => {
  const [messageList, setMessageList] = useState<Message[]>([]);

  const dialog = useParams<{ id: string }>();

  useEffect(() => {
    socket.emit(
      'getMessagesByDialogId',
      { dialogId: dialog.id },
      (messages: Message[]) => {
        setMessageList(messages);
      },
    );
  }, [dialog.id]);

  return (
    <MessagesWrapper>
      {messageList.map(message => (
        <span key={message._id}>{message.content}</span>
      ))}
    </MessagesWrapper>
  );
};

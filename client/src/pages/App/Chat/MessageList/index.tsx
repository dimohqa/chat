import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';
import { Message } from '@/types/Message';
import styled from 'styled-components';
import { socket } from '../../../../helpers/socket';
import { chunkMessageListIntoGroups } from '../../../../helpers/chunkMessageListIntoGroups';
import { MessageGroup } from '../MessageGroup';

const MessagesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  flex-grow: 1;
`;

export const MessageList = () => {
  const [messageList, setMessageList] = useState<Message[]>([]);

  const recipient = useParams<{ id: string }>();

  const groupsMessage = useMemo(() => chunkMessageListIntoGroups(messageList), [
    messageList,
  ]);

  useEffect(() => {
    socket.emit(
      'getMessagesByDialogId',
      { recipientId: recipient.id },
      (messages: Message[]) => {
        setMessageList(messages);
      },
    );
  }, [recipient.id]);

  socket.on('newMessage', (message: Message) => {
    console.log(message);
    setMessageList([...messageList, message]);
    console.log(messageList);
  });

  return (
    <MessagesWrapper>
      {[...groupsMessage].map(([key, value]) => (
        <MessageGroup messages={value} key={key} />
      ))}
    </MessagesWrapper>
  );
};

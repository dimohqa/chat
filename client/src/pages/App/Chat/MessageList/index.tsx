import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { Message } from '@/types/Message';
import styled from 'styled-components';
import { socket } from '../../../../helpers/socket';
import { chunkMessageListIntoGroups } from '../../../../helpers/chunkMessageListIntoGroups';
import { MessageGroup } from '../MessageGroup';

const MessagesWrapper = styled.div`
  height: 100%;
  overflow: auto;
`;

export const MessageList = () => {
  const [messageList, setMessageList] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const recipient = useParams<{ id: string }>();

  const groupsMessage = useMemo(() => chunkMessageListIntoGroups(messageList), [
    messageList,
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    socket.emit(
      'getMessagesByDialogId',
      { recipientId: recipient.id },
      (messages: Message[]) => {
        setMessageList(messages);
      },
    );
  }, [recipient.id]);

  useEffect(() => {
    socket.on('newMessage', (message: Message) => {
      setMessageList([...messageList, message]);
    });

    return () => {
      socket.removeListener('newMessage');
    };
  });

  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  return (
    <MessagesWrapper>
      {groupsMessage.map(messages => (
        <MessageGroup messages={messages} key={messages[0]._id} />
      ))}
      <div ref={messagesEndRef} />
    </MessagesWrapper>
  );
};

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { Message } from '@/types/Message';
import styled from 'styled-components';
import { Dialog } from '@/types/Dialog';
import { socket } from '../../../../helpers/socket';
import { chunkMessageListIntoGroups } from '../../../../helpers/chunkMessageListIntoGroups';
import { MessageGroup } from '../MessageGroup';

const MessagesWrapper = styled.div`
  height: 100%;
  overflow: auto;
`;

const NotFoundWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MessageList = () => {
  const [messageList, setMessageList] = useState<Message[]>([]);
  const [dialogIsMultiple, setDialogMultipleStatus] = useState<boolean>(false);
  const [messageNotFound, setMessageFoundStatus] = useState<boolean>(false);

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
      'getDialog',
      { recipientId: recipient.id },
      (responseDialog: Dialog) => {
        if (!responseDialog) {
          setMessageFoundStatus(true);

          return;
        }

        setDialogMultipleStatus(responseDialog.participants.length > 2);

        setMessageList(responseDialog.messages);
        setMessageFoundStatus(false);
      },
    );
  }, [recipient.id]);

  useEffect(() => {
    socket.on('newMessage', (message: Message) => {
      setMessageList([...messageList, message]);
      setMessageFoundStatus(false);
    });

    return () => {
      socket.removeListener('newMessage');
    };
  });

  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  if (messageNotFound) {
    return (
      <NotFoundWrapper>
        <span>К сожалению, сообщений не найдено</span>
      </NotFoundWrapper>
    );
  }

  return (
    <MessagesWrapper>
      {groupsMessage.map(messages => (
        <MessageGroup
          messages={messages}
          key={messages[0]._id}
          dialogIsMultiple={dialogIsMultiple}
        />
      ))}
      <div ref={messagesEndRef} />
    </MessagesWrapper>
  );
};

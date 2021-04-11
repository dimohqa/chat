import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';
import { Message } from '@/types/Message';
import styled from 'styled-components';
import { socket } from '../../../../helpers/socket';
import { chunkMessageListIntoGroups } from '../../../../helpers/chunkMessageListIntoGroups';
import { MessageGroup } from '../MessageGroup';

const MessagesWrapper = styled.div`
  flex-grow: 1;
`;

export const MessageList = () => {
  const [messageList, setMessageList] = useState<Message[]>([]);

  const dialog = useParams<{ id: string }>();

  const groupsMessage = useMemo(() => chunkMessageListIntoGroups(messageList), [
    messageList,
  ]);

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
      {[...groupsMessage].map(([key, value]) => (
        <MessageGroup messages={value} key={key} />
      ))}
    </MessagesWrapper>
  );
};

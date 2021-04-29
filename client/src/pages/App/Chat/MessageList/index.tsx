import React, { useEffect, useMemo, useRef } from 'react';
import { Message } from '@/types/Message';
import styled from 'styled-components';
import { chunkMessageListIntoGroups } from '../../../../helpers/chunkMessageListIntoGroups';
import { MessageGroup } from '../MessageGroup';

const MessagesWrapper = styled.div`
  height: 100%;
  overflow: auto;
  padding: 0 10px;
`;

const NotFoundWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

type Props = {
  messages: Message[];
  dialogIsMultiple: boolean;
  messageNotFound: boolean;
};

export const MessageList = (props: Props) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const groupsMessage = useMemo(
    () => chunkMessageListIntoGroups(props.messages),
    [props.messages],
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [props.messages]);

  if (props.messageNotFound) {
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
          dialogIsMultiple={props.dialogIsMultiple}
        />
      ))}
      <div ref={messagesEndRef} />
    </MessagesWrapper>
  );
};

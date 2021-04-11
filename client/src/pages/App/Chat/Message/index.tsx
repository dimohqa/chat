import React from 'react';
import { Message as MessageType } from '@/types/Message';

type Props = {
  message: MessageType;
};

export const Message = (props: Props) => <div>{props.message.content}</div>;

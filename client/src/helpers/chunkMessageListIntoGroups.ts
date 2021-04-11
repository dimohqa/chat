import { Message } from '@/types/Message';

export const chunkMessageListIntoGroups = (messageList: Message[]) => {
  const mapMessage = new Map<string, Message[]>();

  messageList.forEach(message => {
    if (mapMessage.has(message._id)) {
      const existMessages = mapMessage.get(message._id) || [];
      mapMessage.set(message._id, [...existMessages, message]);

      return;
    }

    mapMessage.set(message._id, [message]);
  });

  return mapMessage;
};

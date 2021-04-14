import { Message } from '@/types/Message';

export const chunkMessageListIntoGroups = (messageList: Message[]) => {
  const mapMessage = new Map<string, Message[]>();

  messageList.forEach(message => {
    if (mapMessage.has(message.author._id)) {
      const existMessages = mapMessage.get(message.author._id) || [];
      mapMessage.set(message.author._id, [...existMessages, message]);

      return;
    }

    mapMessage.set(message.author._id, [message]);
  });

  return mapMessage;
};

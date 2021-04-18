import { Message } from '@/types/Message';

export const chunkMessageListIntoGroups = (messageList: Message[]) => {
  const mapMessage: Message[][] = [];
  let lastMessage: Message | null = null;

  messageList.forEach((message, index) => {
    if (index === 0) {
      mapMessage.push([message]);
      lastMessage = message;

      return;
    }

    if (lastMessage && lastMessage.author._id === message.author._id) {
      mapMessage[mapMessage.length - 1].push(message);
    } else {
      mapMessage.push([message]);
    }

    lastMessage = message;
  });

  return mapMessage;
};

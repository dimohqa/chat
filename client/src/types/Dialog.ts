import { User } from '@/types/User';
import { Message } from '@/types/Message';

export type Dialog = {
  _id: string;
  user: User;
  latestMessage: Message;
};

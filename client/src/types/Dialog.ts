import { Message } from '@/types/Message';
import { Friend } from '@/types/Friend';

export type Dialog = {
  _id: string;
  participants: Friend[];
  messages: Message[];
  name?: string;
};

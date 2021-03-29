import { Message } from '@/types/Message';
import { Friend } from '@/types/Friend';

export type Dialog = {
  _id?: string;
  author: Friend;
  participant: Friend;
  messages?: Message[];
  name?: string;
};

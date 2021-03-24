import { User } from '@/types/User';

export type Message = {
  content: string;
  author: User;
  date: Date;
  _id: string;
};

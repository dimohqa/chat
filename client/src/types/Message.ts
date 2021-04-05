import { User } from '@/types/User';

export type Message = {
  content: string;
  author: User;
  createdAt: Date;
  _id: string;
};

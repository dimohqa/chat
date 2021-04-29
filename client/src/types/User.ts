export type User = {
  firstName: string;
  lastName: string;
  avatar: string;
  email: string;
  age?: Date;
  city?: string;
  _id: string;
};

export type SearchUser = User & { isFriend: boolean };

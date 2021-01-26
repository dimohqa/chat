import React from 'react';
import { User } from '@/types/User';

type Props = {
  user: User;
};

export const FoundUserCard = (props: Props) => <>{props.user.firstName}</>;

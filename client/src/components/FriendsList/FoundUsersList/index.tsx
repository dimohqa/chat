import React from 'react';
import { User } from '@/types/User';
import { FoundUserCard } from '@/components/FriendsList/FoundUsersList/FoundUserCard';
import styled from 'styled-components';

const GlobalSearch = styled.div`
  background-color: #e6f7ff;
  line-height: 25px;
  padding-left: 8px;
`;

type Props = {
  usersList: User[];
  visible: boolean;
};

export const FoundUsersList = (props: Props) => {
  if (props.visible) {
    return null;
  }

  return (
    <div>
      <GlobalSearch>Результаты общего поиска</GlobalSearch>
      {props.usersList.map(user => (
        <FoundUserCard user={user} key={user._id} />
      ))}
    </div>
  );
};

import React from 'react';
import { Friend } from '@/types/Friend';
import { useHistory, useParams } from 'react-router';
import { UserCard } from '../../../components/UserCard';

type Props = {
  friends: Friend[];
  onChangeFriends: (friends: Friend[]) => void;
};

export const FriendsList = (props: Props) => {
  const history = useHistory();

  const currentUser = useParams<{ id: string }>();

  const isActive = (userId: string) => currentUser.id === userId;

  const changeFriendsList = (id: string) => {
    props.onChangeFriends(props.friends.filter(friend => friend._id !== id));
  };

  const openChatWindow = (userId: string) => {
    history.push(`/friends/${userId}`);
  };

  return (
    <div>
      {props.friends.map(friend => (
        <UserCard
          isFriend
          key={friend._id}
          user={friend}
          changeFriendStatus={changeFriendsList}
          onClick={openChatWindow}
          isActive={isActive(friend._id)}
        />
      ))}
    </div>
  );
};

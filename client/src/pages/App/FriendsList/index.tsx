import React from 'react';
import { Friend } from '@/types/Friend';
import { Card } from '../components/Card';

type Props = {
  friends: Friend[];
  onChangeFriends: (friends: Friend[]) => void;
};

export const FriendsList = (props: Props) => {
  const changeFriendsList = (id: string) => {
    props.onChangeFriends(props.friends.filter(friend => friend._id !== id));
  };

  return (
    <div>
      {props.friends.map(friend => (
        <Card
          key={friend._id}
          id={friend._id}
          lastName={friend.lastName}
          firstName={friend.firstName}
          avatar={friend.avatar}
          changeFriendStatus={changeFriendsList}
          isFriend
        />
      ))}
    </div>
  );
};

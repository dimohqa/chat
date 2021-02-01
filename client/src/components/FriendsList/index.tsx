import React, { useCallback, useState } from 'react';
import { friendsApi } from '@/api/friends';
import { Menu, notification, Spin } from 'antd';
import { Friend } from '@/types/Friend';
import { Card } from '@/components/Card';
import { LoadingOutlined } from '@ant-design/icons';

type Props = {
  friends: Friend[];
  onChangeFriends: (friends: Friend[]) => void;
};

export const FriendsList = (props: Props) => {
  const [
    deleteFriendIsLoading,
    setDeleteFriendLoadingStatus,
  ] = useState<boolean>(false);

  const onDelete = useCallback(
    async (id: string) => {
      setDeleteFriendLoadingStatus(true);

      const result = await friendsApi.delete(id);

      if (result.err) {
        setDeleteFriendLoadingStatus(false);
        notification.error({
          message: 'Ошибка',
          description: result.val,
          duration: 3,
        });

        return;
      }

      setDeleteFriendLoadingStatus(false);
      props.onChangeFriends(props.friends.filter(friend => friend._id !== id));
      notification.success({
        message: 'Успешно выполнено',
        duration: 3,
      });
    },
    [props.friends],
  );

  const menuPopover = (id: string) => (
    <Menu>
      <Menu.Item onClick={() => onDelete(id)} danger>
        Удалить из друзей
        {deleteFriendIsLoading && (
          <Spin
            style={{ marginLeft: '5px' }}
            indicator={<LoadingOutlined spin />}
          />
        )}
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      {props.friends.map(friend => (
        <Card
          key={friend._id}
          lastName={friend.lastName}
          firstName={friend.firstName}
          avatar={friend.avatar}
          menu={() => menuPopover(friend._id)}
        />
      ))}
    </div>
  );
};

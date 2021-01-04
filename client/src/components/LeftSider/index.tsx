import React, { useMemo } from 'react';
import Sider from 'antd/es/layout/Sider';
import { DialogsList } from '@/components/DialogsList';
import { FriendsList } from '@/components/FriendsList';

type Props = {
  menuItem: React.Key;
};

export const LeftSider = (props: Props) => {
  const renderComponent = useMemo(() => {
    if (props.menuItem === 'chat') {
      return <DialogsList />;
    }

    if (props.menuItem === 'friends') {
      return <FriendsList />;
    }

    return <DialogsList />;
  }, [props.menuItem]);

  return (
    <Sider width="30%" theme="light">
      {renderComponent}
    </Sider>
  );
};

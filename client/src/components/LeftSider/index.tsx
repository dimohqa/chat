import React, { useEffect, useState } from 'react';
import Sider from 'antd/es/layout/Sider';
import { Content, Header } from 'antd/es/layout/layout';
import { User } from '@/types/User';
import { Avatar } from 'antd';
import { DialogsList } from '@/components/DialogsList';
import { Search } from '@/components/Search';
import { socket } from '../../helpers/socket';

export const LeftSider = () => {
  const [user, setUser] = useState<User>({
    firstName: '',
    lastName: '',
  });

  useEffect(() => {
    socket.emit('profile', (userData: User) => {
      setUser(userData);
    });
  }, []);

  return (
    <Sider width="30%" theme="light">
      <Header style={{ backgroundColor: '#ffffff' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar />
          <span>
            {`${user.firstName} ${user.lastName}`}
          </span>
        </div>
      </Header>
      <Content>
        <Search />
        <DialogsList />
      </Content>
    </Sider>
  );
};

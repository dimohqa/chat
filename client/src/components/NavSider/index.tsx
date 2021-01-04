import React from 'react';
import Sider from 'antd/es/layout/Sider';
import { Menu } from 'antd';
import {
  TeamOutlined,
  CommentOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { MenuInfo } from 'rc-menu/es/interface';
import { socket } from '../../helpers/socket';

type Props = {
  onSelectMenuHandler: (item: MenuInfo) => void;
};

export const NavSider = (props: Props) => {
  const onLogoutHandler = async () => {
    socket.emit('logout', () => {
      socket.close();
      window.location.href = '/login';
    });
  };

  return (
    <Sider width={60}>
      <Menu
        theme="dark"
        defaultSelectedKeys={['chat']}
        onSelect={props.onSelectMenuHandler}
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Menu.Item key="chat">
          <CommentOutlined />
        </Menu.Item>
        <Menu.Item key="friends">
          <TeamOutlined />
        </Menu.Item>
        <Menu.Item style={{ marginTop: 'auto' }} onClick={onLogoutHandler}>
          <LogoutOutlined />
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

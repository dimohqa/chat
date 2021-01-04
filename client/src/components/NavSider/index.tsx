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

const menuItem = {
  margin: 0,
  height: '50px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const icon = {
  fontSize: '20px',
};

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
        <Menu.Item key="chat" style={menuItem}>
          <CommentOutlined style={icon} />
        </Menu.Item>
        <Menu.Item key="friends" style={menuItem}>
          <TeamOutlined style={icon} />
        </Menu.Item>
        <Menu.Item
          style={{ ...menuItem, marginTop: 'auto' }}
          onClick={onLogoutHandler}
        >
          <LogoutOutlined style={icon} />
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

import React, { useEffect, useState } from 'react';
import Sider from 'antd/es/layout/Sider';
import { Avatar, Menu } from 'antd';
import {
  TeamOutlined,
  CommentOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { MenuInfo } from 'rc-menu/es/interface';
import { ProfileModal } from '@/components/ProfileModal';
import { User } from '@/types/User';
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
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);

  const [
    profileModalIsVisible,
    setProfileModalVisibleStatus,
  ] = useState<boolean>(false);

  const onLogoutHandler = async () => {
    socket.emit('logout', () => {
      socket.close();
      window.location.href = '/login';
    });
  };

  const onOpenProfileModal = () => {
    setProfileModalVisibleStatus(true);
  };
  const onCloseProfileModal = () => {
    setProfileModalVisibleStatus(false);
  };

  console.log(userProfile);

  useEffect(() => {
    socket.emit('profile', (profile: User) => {
      // eslint-disable-next-line no-buffer-constructor
      setAvatar(new Buffer(profile.avatar, 'binary').toString('base64'));
      setUserProfile(profile);
    });
  }, []);

  console.log(avatar);

  return (
    <>
      <ProfileModal
        visible={profileModalIsVisible}
        onClose={onCloseProfileModal}
      />
      <Sider width={70}>
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
          <Menu.Item key="avatar" style={menuItem} onClick={onOpenProfileModal}>
            <Avatar />
          </Menu.Item>
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
    </>
  );
};

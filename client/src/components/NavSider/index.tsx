import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Sider from 'antd/es/layout/Sider';
import { Avatar, Menu, Skeleton } from 'antd';
import {
  TeamOutlined,
  CommentOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { MenuInfo } from 'rc-menu/es/interface';
import { ProfileModal } from '@/components/ProfileModal';
import { User } from '@/types/User';
import { socket } from '../../helpers/socket';

const StyledSkeleton = styled(Skeleton)`
  .ant-skeleton-header {
    padding-right: 0;
  }
`;

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

  useEffect(() => {
    socket.emit('profile', (profile: User) => {
      setUserProfile(profile);
    });
  }, []);

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
            <StyledSkeleton
              active
              loading={userProfile === null}
              avatar={{ size: 36, shape: 'circle' }}
              paragraph={false}
            >
              {userProfile && (
                <Avatar
                  src={
                    !userProfile.avatar ? <UserOutlined /> : userProfile.avatar
                  }
                  size={36}
                />
              )}
            </StyledSkeleton>
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

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Sider from 'antd/es/layout/Sider';
import { Avatar, Menu, Skeleton } from 'antd';
import {
  TeamOutlined,
  CommentOutlined,
  LogoutOutlined,
  UserOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { SelectInfo } from 'rc-menu/es/interface';
import { ProfileModal } from '@/components/ProfileModal';
import { User } from '@/types/User';
import { useHistory } from 'react-router';
import { socket } from '../../helpers/socket';

const StyledSkeleton = styled(Skeleton)`
  .ant-skeleton-header {
    padding-right: 0;
  }
`;

const StyledMenu = styled(Menu)`
  height: calc(100% - 70px);
  display: flex;
  flex-direction: column;
`;

const ItemTitle = styled.span`
  line-height: 24px;
  font-size: 12px;
`;

const ContentItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonAvatar = styled.div`
  padding: 0 16px;
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
`;

const menuItem = {
  margin: 0,
  height: '70px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const icon = {
  fontSize: '24px',
  marginRight: 0,
};

export const NavSider = () => {
  const [selectedItemMenu, setSelectedItemMenu] = useState<string>('');
  const [
    profileModalIsVisible,
    setProfileModalVisibleStatus,
  ] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<User>({
    firstName: '',
    lastName: '',
    email: '',
    avatar: '',
    _id: '',
  });

  const history = useHistory();

  const onOpenProfileModal = () => {
    setProfileModalVisibleStatus(true);
  };
  const onCloseProfileModal = () => {
    setProfileModalVisibleStatus(false);
  };

  const onSelectItemMenu = (info: SelectInfo) => {
    history.push(info.key.toString());
  };

  const onLogoutHandler = async () => {
    socket.emit('logout', () => {
      socket.close();
      window.location.href = '/login';
    });
  };

  useEffect(() => {
    socket.emit('profile', (profile: User) => {
      setUserProfile(profile);
    });
  }, []);

  useEffect(() => {
    setSelectedItemMenu(history.location.pathname.split('/')[1]);
  }, [history.location.pathname]);

  return (
    <>
      {profileModalIsVisible && (
        <ProfileModal
          profile={userProfile}
          visible={profileModalIsVisible}
          onClose={onCloseProfileModal}
          onChangeUserProfile={setUserProfile}
        />
      )}
      <Sider width={80} style={{ backgroundColor: '#f3f4f6' }}>
        <StyledSkeleton
          active
          loading={userProfile === null}
          avatar={{ size: 48, shape: 'circle' }}
          paragraph={false}
        >
          {userProfile && (
            <ButtonAvatar onClick={onOpenProfileModal}>
              <Avatar
                size={48}
                src={userProfile.avatar ? userProfile.avatar : undefined}
                icon={!userProfile.avatar && <UserOutlined />}
              />
            </ButtonAvatar>
          )}
        </StyledSkeleton>
        <StyledMenu
          style={{ backgroundColor: '#f3f4f6' }}
          selectedKeys={[selectedItemMenu]}
          onSelect={onSelectItemMenu}
        >
          <Menu.Item key="chat" style={menuItem}>
            <ContentItem>
              <CommentOutlined style={icon} />
              <ItemTitle>Чаты</ItemTitle>
            </ContentItem>
          </Menu.Item>
          <Menu.Item key="friends" style={menuItem}>
            <ContentItem>
              <TeamOutlined style={icon} />
              <ItemTitle>Друзья</ItemTitle>
            </ContentItem>
          </Menu.Item>
          <Menu.Item key="search" style={menuItem}>
            <ContentItem>
              <SearchOutlined style={icon} />
              <ItemTitle>Поиск</ItemTitle>
            </ContentItem>
          </Menu.Item>
          <Menu.Item
            style={{ ...menuItem, marginTop: 'auto' }}
            onClick={onLogoutHandler}
          >
            <ContentItem>
              <LogoutOutlined style={icon} />
            </ContentItem>
          </Menu.Item>
        </StyledMenu>
      </Sider>
    </>
  );
};

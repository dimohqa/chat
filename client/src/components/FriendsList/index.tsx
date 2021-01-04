import React from 'react';
import { Layout } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { Search } from '@/components/Search';

export const FriendsList = () => (
  <Layout>
    <Header style={{ backgroundColor: '#fff' }}>
      <Search placeholder="Начните вводить имена друзей" />
    </Header>
  </Layout>
);

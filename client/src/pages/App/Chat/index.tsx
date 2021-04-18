import React from 'react';
import { Layout } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { Route } from 'react-router';
import { MessageInput } from '../components/MessageInput';
import { MessageList } from './MessageList';

export const Chat = () => (
  <Route path="/(chat|search|friends)/:id">
    <Layout>
      <Header />
      <MessageList />
      <MessageInput />
    </Layout>
  </Route>
);

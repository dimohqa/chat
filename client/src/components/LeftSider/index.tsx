import React from 'react';
import Sider from 'antd/es/layout/Sider';
import { DialogsList } from '@/components/DialogsList';
import { FriendsList } from '@/components/FriendsList';
import { Redirect, Route, Switch } from 'react-router';

export const LeftSider = () => (
  <Sider width="30%" theme="light">
    <Switch>
      <Route exact path="/chat" component={DialogsList} />
      <Route exact path="/friends" component={FriendsList} />
      <Redirect to="/chat" />
    </Switch>
  </Sider>
);

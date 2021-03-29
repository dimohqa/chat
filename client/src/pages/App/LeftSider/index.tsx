import React from 'react';
import Sider from 'antd/es/layout/Sider';
import { Redirect, Route, Switch } from 'react-router';
import { DialogsList } from './DialogsList';
import { Friends } from './Friends';
import { Search } from './Search';

export const LeftSider = () => (
  <Sider width="30%" theme="light" style={{ backgroundColor: '#f3f4f6' }}>
    <Switch>
      <Route exact path="/chat/:id?">
        <DialogsList />
      </Route>
      <Route exact path="/friends/:id?">
        <Friends />
      </Route>
      <Route exact path="/search/:id?">
        <Search />
      </Route>
      <Redirect to="/chat" />
    </Switch>
  </Sider>
);

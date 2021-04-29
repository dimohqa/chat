import React from 'react';
import Sider from 'antd/es/layout/Sider';
import { Redirect, Route, Switch } from 'react-router';
import styled from 'styled-components';
import { DialogsList } from './DialogsList';
import { Friends } from './Friends';
import { Search } from './Search';

const StyledSider = styled(Sider)`
  background-color: #f3f4f6;
  border-right: 1px solid #d9d9d9;
`;

export const LeftSider = () => (
  <StyledSider width="30%" theme="light">
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
  </StyledSider>
);

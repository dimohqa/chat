import React from 'react';
import { Switch, Route } from 'react-router';
import { AppWithAuth } from './AppWithAuth';
import { LoginPage } from '../Pages/LoginPage';

export const Main = () => (
  <Switch>
    <Route path="/login" component={LoginPage} />
    <Route path="/registration" />
    <AppWithAuth />
  </Switch>
);

import React from 'react';
import { Switch, Route } from 'react-router';
import { AppWithAuth } from './AppWithAuth';
import { LoginWrapper } from '../pages/Login/LoginWrapper';
import { Registration } from '../pages/Registration';

export const Main = () => (
  <Switch>
    <Route path="/login" component={LoginWrapper} />
    <Route path="/registration" component={Registration} />
    <AppWithAuth />
  </Switch>
);

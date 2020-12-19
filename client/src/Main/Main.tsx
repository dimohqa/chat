import React from 'react';
import {
  Switch, Route, Redirect, RouteProps,
} from 'react-router';
import { Chat } from '../pages/Chat';
import { LoginPage } from '../pages/Login';
import { Registration } from '../pages/Registration';

interface PrivateRouteProps extends RouteProps {
  Component: any;
  auth: boolean;
}

const PrivateRoute = ({ Component, auth, ...rest }: PrivateRouteProps) => (
  <Route
    {...rest}
    render={(props) => (auth ? <Component {...props} /> : <Redirect to="/login" />)}
  />
);

export const Main = () => (
  <Switch>
    <Route path="/login" component={LoginPage} />
    <Route path="/registration" component={Registration} />
    <PrivateRoute Component={Chat} auth path="/" />
  </Switch>
);

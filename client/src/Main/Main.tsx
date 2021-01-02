import React from 'react';
import {
  Switch, Route, Redirect, RouteProps,
} from 'react-router';
import { LoginPage } from '../pages/Login';
import { Registration } from '../pages/Registration';
import { App } from '../pages/App';

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
    <PrivateRoute Component={App} auth path="/" />
  </Switch>
);

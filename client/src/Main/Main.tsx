import React from 'react';
import {
  Switch, Route, Redirect, RouteProps,
} from 'react-router';
import { AppWithAuth } from './AppWithAuth';
import { LoginWrapper } from '../pages/Login/LoginWrapper';
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
    <Route path="/login" component={LoginWrapper} />
    <Route path="/registration" component={Registration} />
    <PrivateRoute Component={AppWithAuth} auth path="/" />
  </Switch>
);

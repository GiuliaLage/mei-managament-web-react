import React from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import ContainerComponent from '../components/base-container/base-container.component';

export interface PrivateRouteInterface {
  children: JSX.Element;
}

const PrivateRoute = ({ children }: PrivateRouteInterface) => {
  const access_token = Cookies.get('access_token');
  return access_token ? (
    <ContainerComponent mainContent={children} />
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;

import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = ({ ...rest }) => {
  const userAuthData = useSelector((state) => state.userLogin);
  const { userInfo } = userAuthData;
  return !userInfo ? <Navigate to="../login" /> : <Outlet {...rest} />
  // return (<Route {...rest} render={(props) => (!userInfo ? <Navigate to="../login" /> : <Outlet {...props} />)} />);
};

export default PrivateRoutes;

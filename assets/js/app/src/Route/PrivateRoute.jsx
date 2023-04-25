import React, { useEffect, useState } from 'react';
import { X } from 'react-feather';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../Auth/AuthProvider';

const PrivateRoute = () => {

  const {isLogged} = useAuth();

  return isLogged ? <Outlet /> : <Navigate exact to={`/login`} />;
};

export default PrivateRoute;

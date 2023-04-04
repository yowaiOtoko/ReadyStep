import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../Auth/AuthProvider';
import { parseJwt } from '../_helper/utils';

const TeachRoute = () => {

  const auth = useAuth();

  return auth.isTeacher() ? <Outlet /> : <Navigate exact to={`/login`} />;
};

export default TeachRoute;

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../Auth/AuthProvider';
import { parseJwt } from '../_helper/utils';

const TeachRoute = () => {

  const {isTeacher} = useAuth();

  return isTeacher ? <Outlet /> : <Navigate exact to={`/login`} />;
};

export default TeachRoute;

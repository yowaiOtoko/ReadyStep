import React, { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../Auth/AuthProvider';
import { parseJwt } from '../_helper/utils';

const StudentRoute = () => {

  const auth = useAuth();

  return auth.isStudent() ? <Outlet /> : <Navigate exact to={`/login`} />;
};

export default StudentRoute;

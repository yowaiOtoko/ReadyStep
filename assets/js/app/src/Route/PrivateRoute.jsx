import React, { useEffect, useState } from 'react';
import { X } from 'react-feather';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../Auth/AuthProvider';
// import { authHeader, handleResponse } from '../Services/fack.backend';

const PrivateRoute = () => {

  const {isLogged} = useAuth();



  useEffect(() => {
    // const requestOptions = { method: 'GET', headers: authHeader() };
    // fetch('/users', requestOptions).then(handleResponse);
    // setAuthenticated(JSON.parse(localStorage.getItem('authenticated')));

    // localStorage.setItem('authenticated', authenticated);
    // localStorage.setItem('login', login);
  }, []);


  return isLogged ? <Outlet /> : <Navigate exact to={`/login`} />;
};

export default PrivateRoute;

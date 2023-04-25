import React from 'react';
import { Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
// import { configureFakeBackend, authHeader, handleResponse } from '../Services/fack.backend';
import Callback from '../Auth/Callback';
import Loader from '../Layout/Loader';
import LayoutRoutes from '../Route/LayoutRoutes';
import Signin from '../Auth/Signin';
import PrivateRoute from './PrivateRoute';
import { classes } from '../Data/Layouts';
import { authRoutes } from './AuthRoutes';
  // import { initializeApp } from "firebase/app";
// import { connectAuthEmulator, getAuth, onAuthStateChanged } from "firebase/auth";
import Login from '../Components/Pages/Auth/Login';
import LearnRoute from './StudentRoute';
import { teachRoutes } from './teachRoutes';
import TeachRoute from './TeachRoute';
import { studentRoutes } from './studentRoutes';
import { useAuth } from '../Auth/AuthProvider';
import Error401 from '../Components/Pages/ErrorPages/ErrorPage401';
import Error404 from '../Components/Pages/ErrorPages/ErrorPage404';
import ErrorCodePage from '../Components/Pages/ErrorPages/ErrorCodePage';

// setup fake backend
const Routers = () => {
  const currentUser = useState(false)[0];
  const [authenticated, setAuthenticated] = useState(false);
  const jwt_token = localStorage.getItem('token');
  const defaultLayoutObj = classes.find((item) => Object.values(item).pop(1) === 'compact-wrapper');
  const layout = localStorage.getItem('layout') || Object.keys(defaultLayoutObj).pop();
  const auth = useAuth();

console.log('router index')

  useEffect(() => {
    let abortController = new AbortController();
    // const requestOptions = { method: 'GET', headers: authHeader() };
    // fetch('/users', requestOptions).then(handleResponse);

    // setAuthenticated(JSON.parse(localStorage.getItem('authenticated')));
    console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
    console.disableYellowBox = true;

  }, []);


  return (
    <BrowserRouter basename={'/'}>

      <>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path={'/'} element={<PrivateRoute />}>

              {/* <Route exact path={`/`} element={<Navigate to={`/app/activity/list`} />} /> */}


              <Route path={'/teach'} element={<TeachRoute />}>
                <Route path={`*`} element={<LayoutRoutes routes={teachRoutes}/>} />
              </Route>
              <Route path={'/learn'} element={<LearnRoute />}>
                <Route path={`*`} element={<LayoutRoutes routes={studentRoutes}/>} />
              </Route>

              {/* <Route path={`/*`} element={<LayoutRoutes routes={routes} />} /> */}
            </Route>

            <Route path={'401'} element={<ErrorCodePage code={401} />}/>

            <Route path={`callback`} render={() => <Callback />} />
            <Route exact path={`login`} element={<Login />} />
            {authRoutes.map(({ path, Component }, i) => (
              <Route path={path} element={Component} key={i} />
            ))}

            <Route path={`*`} element={<ErrorCodePage code={404} />} />
          </Routes>
        </Suspense>
      </>
    </BrowserRouter>
  );
};

export default Routers;

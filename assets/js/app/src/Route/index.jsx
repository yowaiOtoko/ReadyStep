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
import { routes } from './Routes';
import { teachRoutes } from './teachRoutes';
import TeachRoute from './TeachRoute';
import { studentRoutes } from './studentRoutes';

// setup fake backend
const Routers = () => {
  const currentUser = useState(false)[0];
  const [authenticated, setAuthenticated] = useState(false);
  const jwt_token = localStorage.getItem('token');
  const defaultLayoutObj = classes.find((item) => Object.values(item).pop(1) === 'compact-wrapper');
  const layout = localStorage.getItem('layout') || Object.keys(defaultLayoutObj).pop();

console.log(process.env.REACT_APP_FIREBASE_API_KEY)

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY ,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
// };

// Initialize Firebase

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

            <Route path={`callback`} render={() => <Callback />} />
            <Route exact path={`login`} element={<Login />} />
            {authRoutes.map(({ path, Component }, i) => (
              <Route path={path} element={Component} key={i} />
            ))}
          </Routes>
        </Suspense>
      </>
    </BrowserRouter>
  );
};

export default Routers;

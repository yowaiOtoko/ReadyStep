import React, { Fragment } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
// import { routes } from './Routes';
import AppLayout from '../Layout/Layout';
import Activity from '../Components/Pages/Activity';

const LayoutRoutes = ({routes}) => {

  return (
    <>
      <Routes>
        {routes.map(({ path, Component }, i) => (
          <Fragment key={i}>
          <Route element={<AppLayout />} key={i}>
            <Route path={path} element={Component} />
          </Route>
          </Fragment>
        ))}
      </Routes>
    </>
  );
};

export default LayoutRoutes;
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import GlobalStyle from '../globalstyle';
import DetailTicketPage from '../pages/DetailTicketPage';
import EmployeePage from '../pages/EmployeePage';

import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import PriorityPage from '../pages/PriorityPage';
import ProductPage from '../pages/ProductPage';
import RolePage from '../pages/RolePage';
import StatusPage from '../pages/StatusPage';
import UserPage from '../pages/UserPage';
import PrivateRoute from './PrivateRoute';

const Router = () => {
  const style = useSelector((state) => state.style);

  return (
    <>
      <GlobalStyle style={style} />
      <Routes>
        <Route path='/login' element={<LoginPage />} />

        <Route
          path='/'
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />

        <Route
          path='users'
          element={
            <PrivateRoute>
              <UserPage />
            </PrivateRoute>
          }
        />

        <Route
          path='status'
          element={
            <PrivateRoute>
              <StatusPage />
            </PrivateRoute>
          }
        />

        <Route
          path='roles'
          element={
            <PrivateRoute>
              <RolePage />
            </PrivateRoute>
          }
        />

        <Route
          path='products'
          element={
            <PrivateRoute>
              <ProductPage />
            </PrivateRoute>
          }
        />

        <Route
          path='priorities'
          element={
            <PrivateRoute>
              <PriorityPage />
            </PrivateRoute>
          }
        />

        <Route
          path='employees'
          element={
            <PrivateRoute>
              <EmployeePage />
            </PrivateRoute>
          }
        />

        <Route
          path='/ticket/:id'
          element={
            <PrivateRoute>
              <DetailTicketPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

export default Router;

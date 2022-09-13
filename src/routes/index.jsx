import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DetailTicketPage from '../pages/DetailTicketPage';

import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RolePage from '../pages/RolePage';
import StatusPage from '../pages/StatusPage';
import UserPage from '../pages/UserPage';
import PrivateRoute from './PrivateRoute';

const Router = () => {
  return (
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
        path='/ticket/:id'
        element={
          <PrivateRoute>
            <DetailTicketPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default Router;

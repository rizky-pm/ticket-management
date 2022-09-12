import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DetailTicketPage from '../pages/DetailTicketPage';

import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
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

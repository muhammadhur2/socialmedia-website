import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from '../UserContext';
import  isTokenValid  from './CheckValidity';

const PrivateRoute = ({ children }) => {
  const { user } = useContext(UserContext);
  const isValidToken = user && user.token && isTokenValid(user.token);
  return isValidToken ? children : <Navigate to="/login" />;
};

export default PrivateRoute;

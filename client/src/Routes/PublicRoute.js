import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from '../UserContext';

const PublicRoute = ({ children, redirectTo = '/profile' }) => {
  const { user } = useContext(UserContext);
  return !user || !user.token ? children : <Navigate to={redirectTo} />;
};

export default PublicRoute;
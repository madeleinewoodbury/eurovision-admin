import React, { useContext } from 'react';
import AuthContext from '../../context/auth/authContext';
import { Redirect } from 'react-router-dom';

const Dashboard = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, user } = authContext;

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }
  return <div>Welcome {user && user.name}</div>;
};

export default Dashboard;

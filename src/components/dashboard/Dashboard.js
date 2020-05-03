import React, { useContext } from 'react';
import AuthContext from '../../context/auth/authContext';
import { Redirect } from 'react-router-dom';

const Dashboard = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated } = authContext;

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }
  return <div>You are logged in</div>;
};

export default Dashboard;

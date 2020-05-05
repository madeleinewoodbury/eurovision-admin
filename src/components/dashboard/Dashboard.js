import React, { useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import EscContext from '../../context/esc/escContext';
import { Redirect } from 'react-router-dom';

const Dashboard = () => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const escContext = useContext(EscContext);
  const { loadUser, isAuthenticated, user } = authContext;
  const { setAlert } = alertContext;
  const { message, clearMessage } = escContext;

  useEffect(() => {
    loadUser();
    if (message !== null) {
      setAlert(message, 'success');
      clearMessage();
    }
  }, [message]);

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }
  return <div>Welcome {user && user.name}</div>;
};

export default Dashboard;

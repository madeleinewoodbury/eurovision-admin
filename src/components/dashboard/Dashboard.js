import React, { useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import EscContext from '../../context/esc/escContext';
import { Redirect, Link } from 'react-router-dom';

const Dashboard = () => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const escContext = useContext(EscContext);
  const { loadUser, isAuthenticated, user, loading } = authContext;
  const { setAlert } = alertContext;
  const { message, clearMessage } = escContext;

  useEffect(() => {
    loadUser();
    if (message !== null) {
      setAlert(message, 'success');
      clearMessage();
    }
    // eslint-disable-next-line
  }, [message]);

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }
  return (
    !loading && (
      <div className="container">
        <div className="dashboard">
          <h1 className="large">Welcome {user && user.name}</h1>
          <div className="action-buttons">
            <Link to="/add-country" className="btn btn-light">
              Add Country
            </Link>
            <Link to="/add-event" className="btn btn-light">
              Add Event
            </Link>
          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;

import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loadUser, loading } = authContext;

  useEffect(() => {
    loadUser();
  }, []);

  return (
    !loading && (
      <Route
        {...rest}
        render={(props) =>
          !isAuthenticated ? <Redirect to="/login" /> : <Component {...props} />
        }
      />
    )
  );
};

export default PrivateRoute;

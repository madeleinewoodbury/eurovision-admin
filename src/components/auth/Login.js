import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import { Redirect } from 'react-router-dom';

const Login = (props) => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const { login, isAuthenticated, error, clearErrors } = authContext;
  const { setAlert } = alertContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }

    if (error === 'Invalid Credentials') {
      setAlert(error, 'danger');
      clearErrors();
    }

    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      setAlert('Fill in all fields', 'danger');
    } else {
      login({
        email,
        password,
      });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container">
      <div className="form-container">
        <h1 className="large">Log In</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Sign in with your admin credentials
        </p>
        <form className="form">
          <div className="form-group">
            <input
              type="email"
              placeholder="E-postadresse"
              name="email"
              value={email}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Passord"
              name="password"
              value={password}
              onChange={(e) => handleChange(e)}
              minLength={6}
              required
            />
          </div>
          <input
            type="submit"
            className="btn btn-secondary"
            value="Logg Inn"
            onClick={(e) => handleSubmit(e)}
          />
        </form>
      </div>
    </div>
  );
};

export default Login;

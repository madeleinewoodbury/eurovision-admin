import React, { useState, useContext } from 'react';
import AuthContext from '../../context/auth/authContext';

const Login = () => {
  const authContext = useContext(AuthContext);
  const { login } = authContext;

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
      alert('Fill in all fields');
    } else {
      login({
        email,
        password,
      });
    }
  };
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

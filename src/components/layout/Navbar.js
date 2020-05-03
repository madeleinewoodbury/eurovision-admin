import React, { useContext } from 'react';
import AuthContext from '../../context/auth/authContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, logout } = authContext;

  const onLogout = () => {
    logout();
  };

  const authLinks = (
    <ul>
      <a onClick={onLogout} href="#!">
        <i className="fas fa-sign-out-alt" />{' '}
        <span className="hide-md">Logout</span>
      </a>
    </ul>
  );

  return (
    <nav className="navbar">
      <Link to="/">ESC Admin</Link>
      {isAuthenticated ? (
        authLinks
      ) : (
        <ul>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;

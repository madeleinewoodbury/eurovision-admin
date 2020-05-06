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
      <li>
        <Link to="/countries">Countries</Link>
      </li>
      <li>
        <Link to="/events">Events</Link>
      </li>
      <li>
        <Link to="/participants">Participants</Link>
      </li>
      <li onClick={onLogout}>
        <i className="fas fa-sign-out-alt" />{' '}
        <span className="hide-md">Logout</span>
      </li>
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

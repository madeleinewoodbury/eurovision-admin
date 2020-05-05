import React from 'react';
import AuthState from './context/auth/AuthState';
import EscState from './context/esc/EscState';
import AlertState from './context/alert/AlertState';
import Routes from './components/routing/Routes';
import './App.css';

const App = () => {
  return (
    <AuthState>
      <EscState>
        <AlertState>
          <Routes />
        </AlertState>
      </EscState>
    </AuthState>
  );
};

export default App;

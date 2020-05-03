import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AuthState from './context/auth/AuthState';
import Navbar from './components/layout/Navbar';
import About from './components/pages/About';
import Login from './components/auth/Login';
import './App.css';

const App = () => {
  return (
    <AuthState>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/about" component={About} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </Router>
    </AuthState>
  );
};

export default App;

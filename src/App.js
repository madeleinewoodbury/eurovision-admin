import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AuthState from './context/auth/AuthState';
import EscState from './context/esc/EscState';
import AlertState from './context/alert/AlertState';
import Navbar from './components/layout/Navbar';
import Alerts from './components/layout/Alerts';
import Dashboard from './components/dashboard/Dashboard';
import About from './components/pages/About';
import Login from './components/auth/Login';
import Countries from './components/countries/Countries';
import './App.css';

const App = () => {
  return (
    <AuthState>
      <EscState>
        <AlertState>
          <Router>
            <Navbar />
            <Alerts />
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/about" component={About} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/countries" component={Countries} />
            </Switch>
          </Router>
        </AlertState>
      </EscState>
    </AuthState>
  );
};

export default App;

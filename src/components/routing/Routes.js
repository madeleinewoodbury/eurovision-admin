import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Navbar from '../layout/Navbar';
import Alerts from '../layout/Alerts';
import Dashboard from '../dashboard/Dashboard';
import About from '../pages/About';
import Login from '../auth/Login';
import Countries from '../countries/Countries';
import Country from '../countries/Country';
import Events from '../events/Events';
import Event from '../events/Event';
import AddCountry from '../countries/AddCountry';
import EditCountry from '../countries/EditCountry';

const Routes = () => {
  return (
    <Router>
      <Navbar />
      <Alerts />
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/about" component={About} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/countries" component={Countries} />
        <Route exact path="/countries/:id" component={Country} />
        <PrivateRoute exact path="/add-country" component={AddCountry} />
        <Route exact path="/edit-country/:id" component={EditCountry} />
        <Route exact path="/events" component={Events} />
        <Route exact path="/events/:id" component={Event} />
      </Switch>
    </Router>
  );
};

export default Routes;

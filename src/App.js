import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css';
import AuthRoute from './components/AuthRoute';
import Home from './components/Home';
import Parking from './components/Parking';
import Login from './components/Login';
import Register from './components/Register';
import CreateSpot from './components/CreateSpot';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <AuthRoute exact path='/' component={Home} />
        <AuthRoute exact path='/parking' component={Parking} />
        <AuthRoute exact path='/create-spot' component={CreateSpot} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

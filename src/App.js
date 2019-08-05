import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import './App.css';
import AuthRoute from './components/AuthRoute';
import Home from './components/Home';
import Parking from './components/Parking';
import Login from './components/Login';
import Register from './components/Register';
import { DISCONNECTED, AUTH_SUCCESS } from './reducers/userReducer';

function App() {
  const { useUser } = useAppHook()
  const [_, dispatch] = useUser

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (localStorage.token) {
      setAuth(token)
      const decoded = jwt_decode(localStorage.token)
      const currentTime = Date.now() / 1000
      if (decoded.exp < currentTime) {
        dispatch({ type: DISCONNECTED })
      }
      else {
        dispatch({ type: AUTH_SUCCESS, payload: decoded })
      }
    }
  }, [localStorage.token])

  return (
    <BrowserRouter>
      <Switch>
        <AuthRoute exact path='/' component={Home} />
        <AuthRoute exact path='/parking' component={Parking} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

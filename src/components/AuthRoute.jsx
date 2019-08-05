import React, { useEffect, useState } from 'react'
import { Route, Redirect } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { useAppHook } from '../contexts'
import Nav from '../components/Nav'
import { DISCONNECTED, AUTH_SUCCESS } from '../reducers/userReducer';
import setAuth from '../utils/setAuth';

const AuthRoute = ({ component: Component, ...rest }) => {
  const { useUser } = useAppHook()
  const [{ isConnected }, dispatch] = useUser

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log(isConnected)
    if (localStorage.token && !isConnected) {
      setAuth(localStorage.token)
      const decoded = jwt_decode(localStorage.token)
      const currentTime = Date.now() / 1000
      if (decoded.exp < currentTime) {
        dispatch({ type: DISCONNECTED })
      }
      else {
        dispatch({ type: AUTH_SUCCESS, payload: decoded })
      }
      setLoading(false)
    }
  }, [dispatch])

  return (
    <Route
      {...rest}
      render={props => (
        <React.Fragment>
        {loading && <h2>Loading...</h2>}
        {!loading &&!isConnected && <Redirect to='/login' />}
        {
          !loading && isConnected &&
          <div>
            <Nav />
            <Component {...props} />
          </div>
        }
        </React.Fragment>
      )}
    />
  )
}

export default AuthRoute

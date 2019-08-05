import React, { useEffect, useState } from 'react'
import { Route, Redirect } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import styled from 'styled-components'
import { useAppHook } from '../contexts'
import Nav from '../components/Nav'
import { DISCONNECTED, AUTH_SUCCESS } from '../reducers/userReducer';
import setAuth from '../utils/setAuth';
import devices from '../utils/devices';

const Container = styled.div`
  width: 60%;
  min-height: 400px;
  border-radius: 1.1em;
  border: 2px solid black;
  padding: 5px;
  margin: 0 auto;

  @media ${devices.tablet} {
    width: 90%;
  }

  @media ${devices.mobileL} {
    width: 100%;
  }
`

const AuthRoute = ({ component: Component, ...rest }) => {
  const { useUser } = useAppHook()
  const [{ isConnected }, dispatch] = useUser

  const [loading, setLoading] = useState(true)

  useEffect(() => {
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
    }
    setLoading(false)
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
          <Container>
            <Nav />
            <Component {...props} />
          </Container>
        }
        </React.Fragment>
      )}
    />
  )
}

export default AuthRoute

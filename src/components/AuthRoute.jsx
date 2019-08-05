import React, { useEffect, useState } from 'react'
import { AuthRoute, Redirect } from 'react-router-dom'
import { useAppHook } from '../contexts';

const AuthRoute = ({ component: Component, ...rest }) => {
  const { useUser } = useAppHook()
  const [{isConnected}, _] = useUser

  return (
    <Route
      {...rest}
      render={props => (
        <React.Fragment>{loading && <h2>Loading...</h2>}</React.Fragment>
        <React.Fragment>{!loading && !isConnected && <Redirect to='/login' />}</React.Fragment>
        <React.Fragment>
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

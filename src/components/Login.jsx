import React, { useState, useEffect } from 'react'
import { Redirect, Link } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import styled from 'styled-components'
import { useAppHook } from '../contexts'
import api from '../api'
import devices from '../utils/devices'
import { AUTH_FAILED, AUTH_SUCCESS } from '../reducers/userReducer';
import setAuth from '../utils/setAuth';

const LoginStyle = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-content: center;

  & .login-form {
    display: flex;
    flex-direction: column;
    width: 60%;
    height: auto;
    border: 2px solid black;
    border-radius: 1.2em;
    margin: auto;
    padding: 10px;

    & * {
      padding: 5px 0;
      margin: 20px 0;
    }
  }

  @media ${devices.mobileL} {
    width: 100%;
  }
`

const Login = () => {
  const { useUser } = useAppHook()
  const [{errors, isConnected}, dispatch] = useUser

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      let res = await api.user.login(email, password)
      const { token } = res.data
      setEmail('')
      setPassword('')
      localStorage.setItem('token', token)
      setAuth(token)
      const decoded = jwt_decode(token)
      dispatch({ type: AUTH_SUCCESS, payload: decoded })
    } catch (error) {
      const { email, password } = error.response.data
      setEmail('')
      setPassword('')
      if (email) dispatch({ type: AUTH_FAILED, payload: email})     
      if (password) dispatch({ type: AUTH_FAILED, payload: password})     
    }
  }

  useEffect(() => {
    if (errors) {
      if (errors.email) alert(errors.email)
      if (errors.password) alert(errors.password)
    }
  }, [errors])

  // useEffect(() => {
  //   if (localStorage.token) {
  //     history.replace('/')
  //   }
  // }, [localStorage.token])

  return !localStorage.token ?
    <LoginStyle>
      <form className='login-form' onSubmit={handleSubmit}>
        <input required type='email' placeholder='enter your email' onChange={e => setEmail(e.target.value)} />
        <input required type='password' placeholder='enter your password' onChange={e => setPassword(e.target.value)} />
        <input type='submit' value='Login' />
        <Link to='/register'>Create an account</Link>
      </form>
    </LoginStyle>
    :
    <Redirect to='/' />
}

export default Login

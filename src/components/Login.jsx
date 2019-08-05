import React, { useState, useEffect } from 'react'
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
    height: 200px;
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
    height: auto;
  }
`

const Login = () => {
  const { useUser } = useAppHook()
  const [{errors}, dispatch] = useUser

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
      const { email } = error.response.data
      setEmail('')
      setPassword('')
      dispatch({ type: AUTH_FAILED, payload: email})     
    }
  }

  useEffect(() => {
    if (errors) {
      alert(errors.email)
    }
  }, [errors])

  return (
    <LoginStyle>
      <form className='login-form' onSubmit={handleSubmit}>
        <input type='email' placeholder='enter your email' onChange={e => setEmail(e.target.value)} />
        <input type='password' placeholder='enter your password' onChange={e => setPassword(e.target.value)} />
        <input type='submit' value='Login' />
      </form>
    </LoginStyle>
  )
}

export default Login

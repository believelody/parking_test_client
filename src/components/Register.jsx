import React, { useState, useEffect } from 'react'
import { Redirect, Link, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { useAppHook } from '../contexts'
import api from '../api'
import devices from '../utils/devices'
import { AUTH_FAILED, AUTH_SUCCESS, DISCONNECTED } from '../reducers/userReducer';
import setAuth from '../utils/setAuth';

const RegisterStyle = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-content: center;

  & .register-form {
    width: 60%;
    height: auto;
    border: 2px solid black;
    border-radius: 1.2em;
    margin: auto;
    padding: 10px;

    & > form {
      display: flex;
      flex-direction: column;

      & * {
        padding: 5px 0;
        margin: 20px 0;
      }
    }
  }

  @media ${devices.mobileL} {
    width: 100%;
  }
`

const Register = ({ history }) => {
  const { useUser } = useAppHook()
  const [{ errors, isConnected }, dispatch] = useUser

  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [car, setCar] = useState()

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      let res = await api.user.register({name, email, password, car})
      const { msg } = res.data
      setEmail(null)
      setPassword(null)
      alert(msg)
      history.push('/login')
    } catch (error) {
      const { email } = error.response.data
      setEmail(null)
      setPassword(null)
      if (email) dispatch({ type: AUTH_FAILED, payload: email })
    }
  }

  useEffect(() => {
    console.log(errors)
    if (errors && errors.email) alert(errors.email)
    return () => dispatch({type: DISCONNECTED})
  }, [errors])

  // useEffect(() => {
  //   if (localStorage.token) {
  //     history.replace('/')
  //   }
  // }, [localStorage.token])

  return !localStorage.token ?
    <RegisterStyle>
      <div className='register-form' >
        <form onSubmit={handleSubmit}>
          <input required type='text' placeholder='enter your name' onChange={e => setName(e.target.value)} />
          <input required type='email' placeholder='enter your email' onChange={e => setEmail(e.target.value)} />
          <input required type='password' placeholder='enter your password' onChange={e => setPassword(e.target.value)} />
          <input required type='text' placeholder='enter your car' onChange={e => setCar(e.target.value)} />
          <input type='submit' value='Register' />
        </form>
        <Link to='/login'>Have an account? Log in!</Link>
      </div>
    </RegisterStyle>
    :
    <Redirect to='/' />
}

export default withRouter(Register)

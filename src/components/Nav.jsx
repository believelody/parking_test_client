import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useAppHook } from '../contexts';
import { DISCONNECTED } from '../reducers/userReducer';

const NavStyle = styled.nav `
  width: 100%;
  height: 50px;
  border-bottom: 2px solid #CCC;
  
   & > ul {
     list-style: none;
     display: flex;

     & > li {
       padding: 0 10px;
     }

     & > button {
       float: right;
       margin-left: auto;
       margin-right: 20px;
     }
   }

   
`

const Nav = () => {
  const { useUser } = useAppHook()
  const [_, dispatch] = useUser

  const handleClick = () => {
    dispatch({ type: DISCONNECTED })
    localStorage.removeItem('token')
  }
  return (
    <NavStyle>
      <ul>
        <li>
          <Link to='/'>Users</Link>
        </li>
        <li>
          <Link to='/parking'>Parking</Link>
        </li>
        <button onClick={handleClick}>Logout</button>
      </ul>
    </NavStyle>
  )
}

export default Nav

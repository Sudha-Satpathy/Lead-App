import React from 'react'
import {AppBar, styled, Toolbar, Typography} from '@mui/material';
import { Link } from 'react-router-dom';
const Header = () => {

  const Component = styled(AppBar)`
    background : white;
  `
  const MenuContainer = styled(Toolbar)`
    display:flex;
    justify-content:center;
    align-items: center;
    &>a{
      color:black;
      font-size:20px;
      padding:10px
    }
  `

  return (
    <>
        <Component>
            <MenuContainer>
                <Link to={'/home'}>Home</Link>
                <Link to={'/about'}>About</Link>
                <Link to={'/contact'}>Contact</Link>
                <Link to={'/'}>Logout</Link>
            </MenuContainer>
        </Component>
    </>
  )
}

export default Header
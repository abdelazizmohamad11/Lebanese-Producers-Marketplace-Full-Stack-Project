import React, { useContext, useEffect, useState } from 'react'
import Nav from './Nav'
import { AuthContext } from '../context/auth-context';

const Header = () => {
  const user_ctx=useContext(AuthContext)
  const logout=()=>{
    user_ctx.logout();
  }
  return (
    <Nav  onLogOut={logout}/>
  )
}

export default Header
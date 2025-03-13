import React from 'react'
import { Navigate } from 'react-router-dom'
import { isAuth } from '../service/auth'

function PrivateRoute({children}) {
  return isAuth() ? children : <Navigate to={'/login'} />
}

export default PrivateRoute
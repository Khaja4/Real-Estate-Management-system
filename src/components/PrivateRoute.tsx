import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

interface PrivateRouteProps {
  redirectPath?: string
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ redirectPath = '/login' }) => {
  const { user } = useAuth()

  return user ? <Outlet /> : <Navigate to={redirectPath} />
}

export default PrivateRoute

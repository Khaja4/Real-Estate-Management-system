import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Button } from './ui/button'
import { ModeToggle } from './ModeToggle'

const Header: React.FC = () => {
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <header className="bg-background">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to={user ? "/home" : "/"} className="text-2xl font-bold">
          Housing Hub
        </Link>
        <nav className="flex items-center space-x-4">
          <ModeToggle />
          {user ? (
            <>
              <Link to="/home">
                <Button variant="ghost">Home</Button>
              </Link>
              <Link to="/profile">
                <Button variant="ghost">Profile</Button>
              </Link>
              <Button onClick={handleLogout} variant="destructive">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/register">
                <Button>Register</Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header
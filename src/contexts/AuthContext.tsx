import React, { createContext, useState, useContext, useEffect } from 'react'
import { login as loginService, logout as logoutService, register as registerService, getCurrentUser, User } from '../services/authService'

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  register: (email: string, password: string, fullName: string, role: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const loadUser = async () => {
      const currentUser = await getCurrentUser()
      setUser(currentUser)
    }
    loadUser()
  }, [])

  const login = async (email: string, password: string) => {
    const loggedInUser = await loginService(email, password)
    setUser(loggedInUser)
  }

  const logout = async () => {
    await logoutService()
    setUser(null)
  }

  const register = async (email: string, password: string, fullName: string, role: string) => {
    const newUser = await registerService(email, password, fullName, role)
    setUser(newUser)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
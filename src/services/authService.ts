import api from './api'

export interface User {
  id: string
  email: string
  fullName: string
  role: 'BUYER' | 'SELLER' | 'AGENT' | 'ADMIN'
}

export const login = async (email: string, password: string): Promise<User> => {
  const response = await api.post('/auth/login', { email, password })
  localStorage.setItem('token', response.data.token)
  return response.data.user 
}

export const register = async (email: string, password: string, fullName: string, role: string): Promise<User> => {
  const response = await api.post('/auth/register', { email, password, fullName, role })
  localStorage.setItem('token', response.data.token)
  return response.data.user
}

export const getCurrentUser = async () => {
  const response = await api.get('/auth/me')
  return response.data
}

export const logout = (): void => {
  localStorage.removeItem('token')
}
import api from './api'

export const getAllUsers = async () => {
  const response = await api.get('/users')
  return response.data
}

export const getUserById = async (id: string) => {
  const response = await api.get(`/users/${id}`)
  return response.data
}

export const updateUser = async (id: string, userData: any) => {
  const response = await api.put(`/users/${id}`, userData)
  return response.data
}

export const deleteUser = async (id: string) => {
  await api.delete(`/users/${id}`)
}
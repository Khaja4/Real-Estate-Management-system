import api from './api'

export const getProperties = async () => {
  const response = await api.get('/properties')
  return response.data
}

export const getPropertyById = async (id: string) => {
  const response = await api.get(`/properties/${id}`)
  return response.data
}

export const addProperty = async (propertyData: FormData) => {
  const response = await api.post('/properties', propertyData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  return response.data
}

export const updateProperty = async (id: string, propertyData: FormData) => {
  const response = await api.put(`/properties/${id}`, propertyData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  return response.data
}

export const deleteProperty = async (id: string) => {
  await api.delete(`/properties/${id}`)
}

export const getPropertiesBySeller = async () => {
  const response = await api.get('/properties/seller')
  return response.data
}

export const getPropertiesByAgent = async () => {
  const response = await api.get('/properties/agent')
  return response.data
}

export const approveProperty = async (id: string) => {
  const response = await api.put(`/properties/${id}/approve`)
  return response.data
}

export const addToFavorites = async (propertyId: string) => {
  const response = await api.post(`/properties/${propertyId}/favorite`)
  return response.data
}

export const getFavoriteProperties = async () => {
  const response = await api.get('/properties/favorites'); // Adjust the endpoint as needed
  return response.data;
}

export const removeFromFavorites = async (propertyId: string) => {
  await api.delete(`/properties/${propertyId}/favorite`); // Adjust the endpoint as needed
}
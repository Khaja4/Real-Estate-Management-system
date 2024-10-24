import api from './api'

export const createInquiry = async (propertyId: string, message: string) => {
  const response = await api.post(`/inquiries`, { propertyId, message })
  return response.data
}

export const getInquiriesForProperty = async (propertyId: string) => {
  const response = await api.get(`/inquiries/property/${propertyId}`)
  return response.data
}

export const getInquiriesForAgent = async () => {
  const response = await api.get('/inquiries/agent')
  return response.data
}

export const respondToInquiry = async (inquiryId: string, response: string) => {
  const res = await api.post(`/inquiries/${inquiryId}/respond`, { response })
  return res.data
}
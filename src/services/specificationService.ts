import axios from 'axios'
import { SpecificationFormData, GeneratedSpecification } from '@/types'

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const generateSpecification = async (
  formData: SpecificationFormData
): Promise<GeneratedSpecification> => {
  const response = await api.post('/specifications/generate', formData)
  return response.data
}

export const getSpecification = async (id: string): Promise<GeneratedSpecification> => {
  const response = await api.get(`/specifications/${id}`)
  return response.data
}

export const listSpecifications = async (params?: {
  page?: number
  limit?: number
  category?: string
  search?: string
}) => {
  const response = await api.get('/specifications', { params })
  return response.data
}
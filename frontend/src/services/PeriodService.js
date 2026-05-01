import api from './api'

export const getPeriods = async () => {
  const res = await api.get('/periods/')
  return res.data
}

export const createPeriod = async (data) => {
  const res = await api.post('/periods/', data)
  return res.data
}

export const updatePeriod = async (id, data) => {
  const res = await api.put(`/periods/${id}`, data)
  return res.data
}

export const deletePeriod = async (id) => {
  const res = await api.delete(`/periods/${id}`)
  return res.data
}
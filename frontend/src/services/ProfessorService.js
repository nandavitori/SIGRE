import api from './api'

export const getProfessors = async () => {
  const res = await api.get('/professors/')
  return res.data
}

export const createProfessor = async (data) => {
  const res = await api.post('/professors/', data)
  return res.data
}

export const updateProfessor = async (id, data) => {
  const res = await api.put(`/professors/${id}`, data)
  return res.data
}

export const deleteProfessor = async (id) => {
  const res = await api.delete(`/professors/${id}`)
  return res.data
}

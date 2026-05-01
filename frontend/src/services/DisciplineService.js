import api from './api'

export const getDisciplines = async () => {
  const res = await api.get('/disciplines/')
  return res.data
}

export const createDiscipline = async (data) => {
  const res = await api.post('/disciplines/', data)
  return res.data
}

export const updateDiscipline = async (id, data) => {
  const res = await api.put(`/disciplines/${id}`, data)
  return res.data
}

export const deleteDiscipline = async (id) => {
  const res = await api.delete(`/disciplines/${id}`)
  return res.data
}

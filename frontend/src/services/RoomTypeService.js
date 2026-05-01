import api from './api'

export const getRoomTypes = async () => {
  const res = await api.get('/room-types/')
  return res.data
}

export const createRoomType = async (data) => {
  const res = await api.post('/room-types/', data)
  return res.data
}

export const updateRoomType = async (id, data) => {
  const res = await api.put(`/room-types/${id}`, data)
  return res.data
}

export const deleteRoomType = async (id) => {
  const res = await api.delete(`/room-types/${id}`)
  return res.data
}

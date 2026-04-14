import api from './api'

/** GET /room-types/ */
export const getRoomTypes = async () => {
  const res = await api.get('/room-types/')
  return res.data
}

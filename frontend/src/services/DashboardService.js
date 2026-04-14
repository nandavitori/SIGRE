import api from './api'

/**
 * Métricas do painel admin — GET /dashboard/metrics
 * Retorna: { total, status: {}, rooms: {}, types: {} }
 */
export const getDashboardMetrics = async () => {
  const res = await api.get('/dashboard/metrics')
  return res.data
}

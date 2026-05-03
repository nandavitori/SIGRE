import api from "./api"

/**
 * Inicia OAuth Google Calendar: GET autenticado → recebe { auth_url } → redireciona o navegador.
 * Não use <a href=".../google/connect"> (não envia Bearer).
 */
export const startGoogleCalendarConnect = async () => {
    const res = await api.get("/google/connect")
    const url = res.data?.auth_url
    if (!url) {
        const err = res.data?.detail || "Resposta sem auth_url"
        throw new Error(typeof err === "string" ? err : JSON.stringify(err))
    }
    window.location.href = url
}

/**
 * Lista eventos unificados (local + Google) — GET /calendar/events
 * Parâmetros: view (day|week|month|semester), anchor (datetime), room_id, user_id
 */

export const getCalendarEvents = async (params = {}) => {
    const res = await api.get('/calendar/events', {params})
    return res.data
}

/**
 * Compatibilidade retroativa: mantém assinatura antiga apontando para API de domínio.
 */
export const getGoogleEvents = async (start, end) => {
    const anchor = start || new Date().toISOString()
    return getCalendarEvents({ view: 'month', anchor })
}
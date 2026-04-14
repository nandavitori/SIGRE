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
 * Lista eventos do Google Calendar — GET /calendar/google/events
 * Parâmetros: start (datetime), end (datetime), calendar_id (opcional)
 */

export const getGoogleEvents = async (start, end, calendarId = null) => {
    const params = {start, end}
    if(calendarId) params.calendar_id = calendarId
    const res = await api.get('/calendar/google/events', {params})
    return res.data
}

/**
 * Lista eventos unificados (local + Google) — GET /calendar/events
 * Parâmetros: view (day|week|month|semester), anchor (datetime), room_id, user_id
 */

export const getCalendarEvents = async (params = {}) => {
    const res = await api.get('/calendar/events', {params})
    return res.data
}
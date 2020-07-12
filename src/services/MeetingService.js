import api from '@/services/api'

export default {
  getMeetings(id) {
    return api.get(`/projects/${id}/listar_reuniones`)
  },
  getMeetings2() {
    return api.get(`/reunion/`)
  },
  getMeeting(id) {
    return api.get(`/reunion/${id}/`)
  },
  updateMeeting(id, payload) {
    return api.patch(`/reunion/${id}/`, payload)
  },
  deleteMeeting(id) {
    return api.delete(`/reunion/${id}/`)
  },
  postMeeting(meeting, id) {
    return api.post(`/projects/${id}/crear_reunion/`, meeting)
  },
}

import api from '@/services/api'

export default {
  getDecanatos() {
    return api.get('/decanato')
  },
  getActiveDecanatos() {
    return api.get('/decanato/activos')
  },
  createDecanato(decanato) {
    return api.post('/decanato/', decanato)
  },
  getDecanato(codigo) {
    return api.get(`/decanato/${codigo}`)
  },
  updateDecanato(codigo, payload) {
    return api.put(`/decanato/${codigo}`, payload)
  },
  deleteDecanato(id) {
    return api.delete(`/decanato/${id}`)
  },
}

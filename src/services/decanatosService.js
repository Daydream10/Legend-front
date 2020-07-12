import api from '@/services/api'

export default {
  getDecanatos () {
    return api.get('/decanato')
  },
  getActiveDecanatos () {
    return api.get('/decanato/activos')
  },
  createDecanato (decanato) {
    return api.post('/decanato/', decanato)
  },
  getDecanato (id) {
    return api.get(`/decanato/${id}`)
  },
  updateDecanato (id, decanato) {
    return api.put(`/decanato/${id}`, decanato)
  },
  deleteDecanato (id) {
    return api.delete(`/decanato/${id}`)
  }
}

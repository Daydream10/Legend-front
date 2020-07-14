import api from '@/services/api'

export default {
  getEstados() {
    return api.get('/estado')
  },
  getActiveEstados() {
    return api.get('/estado/activos')
  },
  createEstado(estado) {
    return api.post('/estado/', estado)
  },
  getEstado(codigo) {
    return api.get(`/estado/${codigo}`)
  },
  updateEstado(codigo, payload) {
    return api.put(`/estado/${codigo}`, payload)
  },
  deleteEstado(id) {
    return api.delete(`/estado/${id}`)
  },
}

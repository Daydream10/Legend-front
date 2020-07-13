/* eslint-disable */
import api from '@/services/api'

export default {
  getActas() {
    return api.get('/acta/')
  },
  getActa(codigo) {
    return api.get(`/acta/${codigo}`)
  },
  getActiveActas() {
    return api.get('/acta/activos')
  },
  createActa(acta) {
    return api.post('/acta/', acta)
  },
  getActasDecanato(id) {
    return api.get(`/acta/decanato/${id}/`)
  },
  updateActa(id, acta) {
    return api.put(`/acta/${id}`, acta)
  },
  deleteActa(codigo) {
    return api.delete(`/acta/${codigo}`)
  },
  getContador() {
    return api.get('/dash/contadores')
  },
  getContadorActas(cod, mes) {
    return api.get(`/reporte/actasPorDecanato/${cod}/${mes}`)
  },
  getEstados() {
    return api.get('/estado/activos/')
  },
  updateEstado(codigo, estado) {
    return api.put(`/estado/${codigo}`, estado)
  },
  createEstado(estado) {
    return api.post('/estado/', estado)
  },
  deleteEstado(codigo) {
    return api.delete(`/estado/${codigo}`)
  },
  getActasReporte(cod, mes) {
    return api.get(`/reporte/listadeActas/${cod}/${mes}`)
  },
}

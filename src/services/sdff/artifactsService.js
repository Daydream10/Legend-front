import api from '@/services/api'

export default {
  postArtefacto(id, payload) {
    return api.post(`info_proyecto/${id}/crear_artefacto/`, payload)
  },
  getArtefactos(id) {
    return api.get(`info_proyecto/${id}/listar_artefacto_proyecto/`)
  },
  getArtefacto(id) {
    return api.get(`artefacto/${id}/`)
  },
  deleteArtefacto(id) {
    return api.delete(`artefacto/${id}/`)
  },
  updateArtefacto(id, payload) {
    return api.patch(`artefacto/${id}/`, payload)
  },
}

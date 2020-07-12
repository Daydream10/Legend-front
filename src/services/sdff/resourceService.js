import api from '@/services/api'

export default {
  /* postProject(project) {
      return api.post('/projects/', project)
    },*/
  postResource(id, payload) {
    return api.post(`info_proyecto/${id}/crear_recurso/`, payload)
  },
  getResources(id) {
    return api.get(`info_proyecto/${id}/listar_recursos_proyecto/`)
  },
  getCosto(id) {
    return api.get(`info_proyecto/${id}/costo_proyecto/`)
  },
  getResource(id){

    return api.get(`recurso/${id}/`)
  },
  deleteResource(id) {
    return api.delete(`recurso/${id}/`)
  },
  updateResource(id, payload) {
    return api.patch(`recurso/${id}/`, payload)
  },
}

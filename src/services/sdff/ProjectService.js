import api from '@/services/api'

export default {
  getProjects(params) {
    return api.get('/projects/', {
      params,
    })
  },
  getProject(id) {
    return api.get(`/projects/${id}/`)
  },
  postProject(project) {
    return api.post('/projects/', project)
  },
  postObjetivo(id, payload) {
    return api.post(`/info_proyecto/${id}/crear_objetivo/`, payload)
  },
  postRequisito(id, payload) {
    return api.post(`/info_proyecto/${id}/crear_requisito/`, payload)
  },
  postSeguridad(id, payload) {
    return api.post(`/info_proyecto/${id}/crear_seguridad/`, payload)
  },

  deleteObjetivo(id) {
    return api.delete(`/objetivo/${id}/`)
  },
  deleteRequisito(id) {
    return api.delete(`/requisito/${id}/`)
  },
  deleteSeguridad(id) {
    return api.delete(`/seguridad/${id}/`)
  },
  updateProject(id, payload) {
    return api.patch(`projects/${id}/`, payload)
  },
  deleteProject(id, payload) {
    return api.patch(`/projects/${id}/`, payload)
  },
  getInfoProject(id) {
    return api.get(`/info_proyecto/${id}/info_proyecto/`)
  },
  getObjetivos(id) {
    return api.get(`/info_proyecto/${id}/listar_objetivo_proyecto/`)
  },
  getRequisitos(id) {
    return api.get(`/info_proyecto/${id}/listar_requisitos_proyecto/`)
  },
  getSeguridades(id) {
    return api.get(`/info_proyecto/${id}/listar_seguridad_proyecto/`)
  },
  getObjetivo(id) {
    return api.get(`/objetivo/${id}/`)
  },
  getRequisito(id) {
    return api.get(`/requisito/${id}/`)
  },
  getSeguridad(id) {
    return api.get(`/seguridad/${id}/`)
  },
}

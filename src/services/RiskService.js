import api from '@/services/api'

export default {
  getRisks() {
    return api.get('/risk/')
  },
  getRisk(id) {
    return api.get('/risk/' + id)
  },
  /* postProject(project) {
    return api.post('/projects/', project)
  },*/
  updateRisk(id, payload) {
    return api.patch(`risks/${id}/`, payload)
  },
  deleteRisk(id, payload) {
    return api.patch(`/risk/${id}/`, payload)
  },
}

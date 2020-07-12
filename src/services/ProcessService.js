import api from '@/services/api'

export default {
  getProcesses(id) {
    return api.get(`/projects/${id}/listar_procesos`)
  },
  getProcesses2(id, categoria) {
    return api.get(
      `/projects/${id}/listar_procesos_categoria/?categoria=${categoria}`
    )
  },
  getProcess(id){
    return api.get(`/process/${id}`)
  },
  postProcess(payload,id) {
    return api.post(`/projects/${id}/crear_proceso/`, payload)
  },
  updateProcess(id,payload) {
    return api.patch(`/process/${id}/`, payload)
  },
  deleteProcess(id){
    return api.delete(`/process/${id}/`)
  }

}

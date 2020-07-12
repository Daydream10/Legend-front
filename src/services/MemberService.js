import api from '@/services/api'
export default {
  getMembers(id) {
    return api.get(`/projects/${id}/listar_miembros`)
  },
  createMember(id, member){
    return api.post(`/projects/${id}/agregar_miembro/`, member)
  },
  postUser(user) {
    return api.post('/auth/registration/', user)
  },
  deleteMember(id) {
    return api.delete(`miembro/${id}/delete/`)
  },
}

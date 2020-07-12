import api from '@/services/api'

export default {
  getUsers(params) {
    return api.get('/auth/list-users/', {
      params,
    })
  },
  getUserAuth() {
    return api.get('/auth/user/')
  },
  getUsersNotProject(id) {
    return api.get(`/projects/${id}/usuarios_no_pertenecen/`)
  },
  /* getUsers() {
    return api.get('/auth/list-users/')
  },*/
  getUser(id) {
    return api.get('/auth/update-user/' + id)
  },
  postUser(payload) {
    return api.post('/auth/registration/', payload)
  },
  updateUser(id, payload) {
    return api.patch(`/auth/update-user/${id}/`, payload)
  },
  deleteUser(id, payload) {
    return api.patch(`/auth/update-user/${id}/`, payload)
  },
}

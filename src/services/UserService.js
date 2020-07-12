import api from '@/services/api'

export default {
  getUsers (params) {
    return api.get('/auth/', {
      params
    })
  },
  getUserAuth () {
    return api.get('/auth/user/')
  },
  updateUser (id, payload) {
    return api.patch(`/auth/update-user/${id}/`, payload)
  },
  deleteUser (id, payload) {
    return api.patch(`/auth/update-user/${id}/`, payload)
  }
}

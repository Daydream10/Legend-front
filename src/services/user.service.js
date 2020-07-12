import axios from 'axios'
import authHeader from './auth-header'
import api from '@/services/api'

const API_URL = 'http://localhost:8080/api/test/'
const API_URL2 = 'http://localhost:8080/api/auth/'

class UserService {
  getPublicContent () {
    return axios.get(API_URL + 'all')
  }

  getUserBoard () {
    return axios.get(API_URL + 'user', { headers: authHeader() })
  }

  getModeratorBoard () {
    return axios.get(API_URL + 'mod', { headers: authHeader() })
  }

  getAdminBoard () {
    return axios.get(API_URL + 'admin', { headers: authHeader() })
  }

  getAllUsers () {
    return api.get(API_URL2)
  }

  editUser (id, payload) {
    return api.put(API_URL2 + id)
  }

  deleteUser (id, payload) {
    return api.put(API_URL2 + id)
  }
}

export default new UserService()

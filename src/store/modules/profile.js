import * as types from '@/store/mutation-types'
//import api from '@/services/profile'
import { buildSuccess, handleError } from '@/utils/utils.js'
import auth from '../../api/auth'

const getters = {
  user: (state) => state.user,
}

const actions = {
  changeMyPassword({ commit }, payload) {
    return new Promise((resolve, reject) => {
      commit(types.SHOW_LOADING, true)
      auth
        .changeAccountPassword(payload)
        .then((response) => {
          if (response.status === 200) {
            buildSuccess(
              {
                msg: 'common.myProfile.PASSWORD_CHANGED',
              },
              commit,
              resolve
            )
          }
        })
        .catch((error) => {
          handleError(error, commit, reject)
        })
    })
  },
  getProfile({ commit }) {
    return new Promise((resolve, reject) => {
      commit(types.SHOW_LOADING, true, { root: true })
      auth
        .getAccountDetails()
        .then((response) => {
          if (response.status === 200) {
            commit(types.FILL_USER, response.data)
            buildSuccess(null, commit, resolve)
          }
        })
        .catch((error) => {
          handleError(error, commit, reject)
        })
    })
  },
  saveUser({ commit }, payload) {
    return new Promise((resolve, reject) => {
      commit(types.SHOW_LOADING, true, { root: true })
      auth
        .updateAccountDetails(payload)
        .then((response) => {
          if (response.status === 200) {
            commit(types.FILL_USER, response.data)
            buildSuccess(
              {
                msg: 'common.myProfile.PROFILE_SAVED_SUCCESSFULLY',
              },
              commit,
              resolve
            )
            //alert('it works', commit, resolve)
          }
        })
        .catch((error) => {
          handleError(error, commit, reject)
          // alert('doesnt work', error, commit, reject)
        })
    })
  },
  addUserData({ commit }, data) {
    commit(types.ADD_USER_DATA, data)
  },
}

const mutations = {
  [types.FILL_USER](state, data) {
    state.user.email = data.email
    state.user.empleado.nombre = data.empleado.nombre
    state.user.empleado.apellido = data.empleado.apellido
    state.user.empleado.direccion = data.empleado.direccion
    state.user.empleado.telefono = data.empleado.telefono
    state.user.tipo_usuario = data.tipo_usuario
    state.user.empleado.foto = data.empleado.foto
  },
  [types.ADD_USER_DATA](state, data) {
    switch (data.key) {
      case 'email':
        state.user.email = data.value
        break
      case 'name':
        state.user.empleado.nombre = data.value
        break
      case 'lastName':
        state.user.empleado.apellido = data.value
        break
      case 'address':
        state.user.empleado.direccion = data.value
        break
      case 'phone':
        state.user.empleado.telefono = data.value
        break
      case 'type':
        state.user.tipo_usuario = data.value
        break
      case 'image':
        state.user.empleado.foto = data.value
        break
      default:
        break
    }
  },
}

const state = {
  user: {
    email: '',
    empleado: {
      nombre: '',
      apellido: '',
      direccion: '',
      telefono: '',
      foto: '',
    },
    tipo_usuario: '',
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}

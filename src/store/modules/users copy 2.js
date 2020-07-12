/* eslint-disable */
import UserService from '@/services/user.service.js'
//import * as types from '@/store/mutation-types'

const state = {
  users: [],
  user: {},

}

const mutations = {
  ADD_USER (state, user) {
    state.users.push(user)
  },
  SET_USERS (state, users) {
    state.users = users
  },
  SET_USER (state, user) {
    state.user = user
  },
  UPDATE_USER (state, payload) {
    state.users = state.users.map((user) => {
      if (user.codigo === payload.codigo) {
        return Object.assign({}, user, payload.data)
      }
      return user
    })
  },

}

const actions = {
  createuser ({ commit }, user) {
    return usersService
      .createuser(user)
      .then((response) => {
        commit('ADD_user', user)
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  fetchUsers ({ commit }) {
    UserService.getAllUsers()
      .then((response) => {
        console.log("usuarios:")
        console.log(response.data)
        commit('SET_USERS', response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  fetchActiveusers ({ commit }) {
    usersService.getActiveusers()
      .then((response) => {
        console.log(response.data)
        commit('SET_userS', response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  fetchusersDecanato ({ commit }, id) {
    console.log(id)
    usersService.getusersDecanato(id)
      .then((response) => {
        console.log(response.data)
        commit('SET_userS', response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  },

  saveuser ({ commit }, payload) {
    console.log(payload)
    console.log('hi')
    usersService
      .updateuser(payload.codigo, payload)
      .then((response) => {
        if (response.status === 200) {
          console.log('se guardo')
        }
      })
      .catch((error) => {
        console.log(error)
      })
  },

  deleteuser ({ commit }, codigo) {
    usersService
      .deleteuser(codigo)
      .then((response) => {
        if (response.status === 200) {
          console.log('se elimino')
        }
      })
      .catch((error) => {
        console.log(error)
      })
  },

}
const getters = {
  getuserByCodigo: (state) => (codigo) => {
    return state.users.find((user) => user.codigo === codigo)
  },
  users: (state) => {
    return state.users
  },
  user: (state) => state.user,
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

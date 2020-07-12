import auth from '../../../api/auth'

import {
  ACTIVATION_BEGIN,
  ACTIVATION_CLEAR,
  ACTIVATION_FAILURE,
  ACTIVATION_SUCCESS,
  REGISTRATION_BEGIN,
  REGISTRATION_CLEAR,
  REGISTRATION_FAILURE,
  REGISTRATION_SUCCESS,
} from './types'

export default {
  namespaced: true,
  state: {
    activationCompleted: false,
    activationError: false,
    activationLoading: false,
    registrationCompleted: false,
    registrationError: false,
    registrationLoading: false,
    users: [],
    usersTotal: 0,
    user: {},
  },
  getters: {
    test: (state) => {
      return state.registrationCompleted
    },
  },
  actions: {
    createAccount(
      { commit },
      {
        email,
        password1,
        password2,
        nombre,
        apellido,
        direccion,
        telefono,
        tipo_usuario,
      }
    ) {
      commit(REGISTRATION_BEGIN)
      return auth
        .createAccount(
          email,
          password1,
          password2,
          nombre,
          apellido,
          direccion,
          telefono,
          tipo_usuario
        )
        .then(() => commit(REGISTRATION_SUCCESS))
        .catch(() => commit(REGISTRATION_FAILURE))
    },
    activateAccount({ commit }, { key }) {
      commit(ACTIVATION_BEGIN)
      return auth
        .verifyAccountEmail(key)
        .then(() => commit(ACTIVATION_SUCCESS))
        .catch(() => commit(ACTIVATION_FAILURE))
    },
    clearRegistrationStatus({ commit }) {
      commit(REGISTRATION_CLEAR)
    },
    clearActivationStatus({ commit }) {
      commit(ACTIVATION_CLEAR)
    },
    fetchUsers({ commit, dispatch }) {
      auth
        .getAllAccounts()
        .then((response) => {
          commit('SET_USERS_TOTAL', parseInt(response.headers['x-total-count']))
          commit('SET_USERS', response.data)
        })
        .catch((error) => {
          const notification = {
            type: 'error',
            message: 'There was a problem fetching users: ' + error.message,
          }
          dispatch('notification/add', notification, { root: true })
        })
    },
  },
  mutations: {
    [ACTIVATION_BEGIN](state) {
      state.activationLoading = true
    },
    [ACTIVATION_CLEAR](state) {
      state.activationCompleted = false
      state.activationError = false
      state.activationLoading = false
    },
    [ACTIVATION_FAILURE](state) {
      state.activationError = true
      state.activationLoading = false
    },
    [ACTIVATION_SUCCESS](state) {
      state.activationCompleted = true
      state.activationError = false
      state.activationLoading = false
    },
    [REGISTRATION_BEGIN](state) {
      state.registrationLoading = true
    },
    [REGISTRATION_CLEAR](state) {
      state.registrationCompleted = false
      state.registrationError = false
      state.registrationLoading = false
    },
    [REGISTRATION_FAILURE](state) {
      state.registrationError = true
      state.registrationLoading = false
    },
    [REGISTRATION_SUCCESS](state) {
      state.registrationCompleted = true
      state.registrationError = false
      state.registrationLoading = false
    },
    ADD_USERS(state, user) {
      state.users.push(user)
    },
    SET_USERS(state, users) {
      state.users = users
    },
    SET_USERS_TOTAL(state, usersTotal) {
      state.usersTotal = usersTotal
    },
    SET_USER(state, user) {
      state.user = user
    },
  },
}

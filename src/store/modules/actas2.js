import ActaService from '@/services/ActaService.js'
import * as types from '@/store/mutation-types'
import { buildSuccess, handleError } from '@/utils/utils.js'

const state = {
  actas: [],
  acta: {
    id: null,
    nombre: '',
    categoria: '',
    tipo: '',
    estado: '',
    proyecto: null,
  },
}

const mutations = {
  ADD_ACTA(state, acta) {
    state.actas.push(acta)
  },
  SET_ACTAS(state, actas) {
    //state.actas.push(actas)
    state.actas = actas
  },
  SET_ACTA(state, acta) {
    //state.actas.push(actas)
    state.acta = acta
  },
  UPDATE_acta(state, payload) {
    state.actas = state.actas.map((acta) => {
      if (acta.id === payload.id) {
        return Object.assign({}, acta, payload.data)
      }
      return acta
    })
  },
  [types.FILL_acta](state, data) {
    state.acta.nombre = data.nombre
    state.acta.categoria = data.categoria
    state.acta.tipo = data.tipo
    state.acta.proyecto = data.proyecto
    state.acta.estado = data.estado
  },
  [types.CHANGE_STATE](state) {
    state.acta.is_active = false
  },
  [types.ADD_acta_DATA](state, data) {
    switch (data.key) {
      case 'name':
        state.acta.nombre = data.value
        break
      case 'category':
        state.acta.categoria = data.value
        break
      case 'type':
        state.acta.tipo = data.value
        break
      case 'project':
        state.acta.proyecto = data.value
        break
      case 'state':
        state.acta.estado = data.value
        break
      default:
        break
    }
  },
}

const actions = {
  createacta({ commit }, acta) {
    console.log(acta)

    return new Promise((resolve, reject) => {
      commit(types.SHOW_LOADING, true, { root: true })
      return actaService
        .postacta(acta, acta.proyecto)
        .then((response) => {
          commit('ADD_acta', acta)
          if (response.status === 201) {
            console.log('working')
            buildSuccess(
              {
                msg: 'Proceso se ha creado con exito',
              },
              commit,
              resolve
            )
          }
        })
        .catch((error) => {
          handleError(error, commit, reject)
          console.log(error)
        })
    })
  },
  fetchactas({ commit, dispatch }, id) {
    actaService
      .getactas(id)
      .then((response) => {
        commit('SET_actaS', response.data)
      })
      .catch((error) => {
        const notification = {
          type: 'error',
          message: 'There was a problem fetching actas: ' + error.message,
        }
        dispatch('notification/add', notification, { root: true })
      })
  },
  fetchactas2({ commit, dispatch }, payload) {
    actaService
      .getactas2(payload.id, payload.categoria)
      .then((response) => {
        commit('SET_actaS', response.data)
      })
      .catch((error) => {
        const notification = {
          type: 'error',
          message: 'There was a problem fetching actas: ' + error.message,
        }
        dispatch('notification/add', notification, { root: true })
      })
  },
  fetchacta({ commit, getters, dispatch }, id) {
    const acta = getters.getactaById(id)
    if (acta) {
      commit('SET_acta', acta)
    } else {
      actaService
        .getacta(id)
        .then((response) => {
          console.log(response.data)
          commit('SET_acta', response.data)
        })
        .catch((error) => {
          const notification = {
            type: 'error',
            message: 'There was a problem fetching acta: ' + error.message,
          }
          dispatch('notification/add', notification, { root: true })
        })
    }
  },

  saveacta({ commit }, payload) {
    return new Promise((resolve, reject) => {
      actaService
        .updateacta(payload.id, payload)
        .then((response) => {
          if (response.status === 200) {
            commit(types.FILL_acta, response.data)
            buildSuccess(
              {
                msg: 'Proceso se ha modificado con éxito',
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

  addactaData({ commit }, data) {
    commit(types.ADD_acta_DATA, data)
  },

  deleteacta({ commit }, id) {
    return new Promise((resolve, reject) => {
      actaService
        .deleteacta(id)
        .then((response) => {
          if (response.status === 204) {
            buildSuccess(
              {
                msg: 'Proceso se ha eliminado con éxito',
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
}
const getters = {
  getactaById: (state) => (id) => {
    return state.actas.find((acta) => acta.id === id)
  },
  actas: (state) => {
    return state.actas
  },
  acta: (state) => state.acta,
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}

import decanatosService from '@/services/decanatosService'
import * as types from '@/store/mutation-types'
import { buildSuccess, handleError } from '@/utils/utils.js'

const state = {
  decanatos: [],
  decanato: {
    codigo: '',
    nombre: '',
    direccion: '',
    telefono: '',
    estatus: '',
  },
}

const mutations = {
  ADD_DECANATO(state, decanato) {
    state.decanatos.push(decanato)
  },
  SET_DECANATOS(state, decanatos) {
    state.decanatos = decanatos
  },
  SET_DECANATO(state, decanato) {
    state.decanato = decanato
  },
  UPDATE_ACTA(state, payload) {
    state.decanatos = state.decanatos.map((decanato) => {
      if (decanato.codigo === payload.codigo) {
        return Object.assign({}, decanato, payload.data)
      }
      return decanato
    })
  },
  [types.CHANGE_STATE_DECANATO](state) {
    state.decanato.estatus = 'I'
  },
  [types.FILL_DECANATO](state, data) {
    state.decanato.nombre = data.nombre
    state.decanato.direccion = data.direccion
    state.decanato.telefono = data.telefono
    state.decanato.estatus = data.estatus
  },
  [types.ADD_DECANATO_DATA](state, data) {
    switch (data.key) {
      case 'nombre':
        state.decanato.nombre = data.value
        break
      case 'direccion':
        state.decanato.direccion = data.value
        break
      case 'telefono':
        state.decanato.telefono = data.value
        break
      default:
        break
    }
  },
}

const actions = {
  createDecanato({ commit }, decanato) {
    return new Promise((resolve, reject) => {
      return decanatosService
        .createDecanato(decanato)
        .then((response) => {
          commit('ADD_DECANATO', decanato)

          console.log(response.data)
          buildSuccess(
            {
              msg: 'common.decanato.CREATED_SUCCESSFULLY',
            },
            commit,
            resolve
          )
        })
        .catch((error) => {
          handleError(error, commit, reject)
        })
    })
  },
  fetchDecanatos({ commit }) {
    decanatosService
      .getDecanatos()
      .then((response) => {
        console.log(response.data)
        commit('SET_DECANATOS', response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  fetchActiveDecanatos({ commit }) {
    decanatosService
      .getActiveDecanatos()
      .then((response) => {
        console.log(response.data)
        commit('SET_DECANATOS', response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  fetchDecanato({ commit, getters, dispatch }, codigo) {
    console.log(codigo)
    const decanato = getters.getDecanatoByCodigo(codigo)
    if (decanato) {
      commit('SET_DECANATO', decanato)
    } else {
      decanatosService
        .getDecanato(codigo)
        .then((response) => {
          console.log(response.data)
          commit('SET_DECANATO', response.data)
        })
        .catch((error) => {
          const notification = {
            type: 'error',
            message: 'There was a problem fetching meeting: ' + error.message,
          }
          dispatch('notification/add', notification, { root: true })
        })
    }
  },

  saveDecanato({ commit }, payload) {
    console.log(payload)
    console.log('hi')
    return new Promise((resolve, reject) => {
      decanatosService
        .updateDecanato(payload.codigo, payload)
        .then((response) => {
          if (response.status === 200) {
            commit(types.FILL_DECANATO, response.data)

            console.log('se guardo')
            buildSuccess(
              {
                msg: 'common.decanato.EDITED_SUCCESSFULLY',
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
  addDecanatoData({ commit }, data) {
    commit(types.ADD_DECANATO_DATA, data)
  },
  deleteDecanato({ commit }, codigo) {
    return new Promise((resolve, reject) => {
      decanatosService
        .deleteDecanato(codigo)
        .then((response) => {
          if (response.status === 200) {
            commit(types.CHANGE_STATE_DECANATO, response.data)

            console.log('se elimino')
            buildSuccess(
              {
                msg: 'common.decanato.DELETED_SUCCESSFULLY',
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
  getDecanatoByCodigo: (state) => (codigo) => {
    return state.decanatos.find((decanato) => decanato.codigo === codigo)
  },
  decanatos: (state) => {
    return state.decanatos
  },
  decanato: (state) => state.decanato,
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}

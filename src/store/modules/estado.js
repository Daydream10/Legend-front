import estadosService from '@/services/estadosService'
import * as types from '@/store/mutation-types'
import { buildSuccess, handleError } from '@/utils/utils.js'

const state = {
  estados: [],
  estado: {
    codigo: '',
    nombre: '',
    estatus: '',
    acta: null,
  },
}

const mutations = {
  ADD_ESTADO(state, estado) {
    state.estados.push(estado)
  },
  SET_ESTADOS(state, estados) {
    state.estados = estados
  },
  SET_ESTADO(state, estado) {
    state.estado = estado
  },
  UPDATE_ACTA(state, payload) {
    state.estados = state.estados.map((estado) => {
      if (estado.codigo === payload.codigo) {
        return Object.assign({}, estado, payload.data)
      }
      return estado
    })
  },
  [types.CHANGE_STATE_ESTADO](state) {
    state.estado.estatus = 'I'
  },
  [types.FILL_ESTADO](state, data) {
    state.estado.nombre = data.nombre
    state.estado.estatus = data.estatus
  },
  [types.ADD_ESTADO_DATA](state, data) {
    switch (data.key) {
      case 'nombre':
        state.estado.nombre = data.value
        break
      case 'estatus':
        state.estado.estatus = data.value
        break
      case 'acta':
        state.estado.acta = data.value
        break
      default:
        break
    }
  },
}

const actions = {
  createEstado({ commit }, estado) {
    return new Promise((resolve, reject) => {
      return estadosService
        .createEstado(estado)
        .then((response) => {
          commit('ADD_ESTADO', estado)

          console.log(response.data)
          buildSuccess(
            {
              msg: 'common.estado.CREATED_SUCCESSFULLY',
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
  fetchEstados({ commit }) {
    estadosService
      .getEstados()
      .then((response) => {
        console.log(response.data)
        commit('SET_ESTADOS', response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  fetchActiveEstados({ commit }) {
    estadosService
      .getActiveEstados()
      .then((response) => {
        console.log(response.data)
        commit('SET_ESTADOS', response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  fetchEstado({ commit, getters, dispatch }, codigo) {
    console.log(codigo)
    const estado = getters.getEstadoByCodigo(codigo)
    if (estado) {
      commit('SET_ESTADO', estado)
    } else {
      estadosService
        .getEstado(codigo)
        .then((response) => {
          console.log(response.data)
          commit('SET_ESTADO', response.data)
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

  saveEstado({ commit }, payload) {
    console.log(payload)
    console.log('hi')
    return new Promise((resolve, reject) => {
      estadosService
        .updateEstado(payload.codigo, payload)
        .then((response) => {
          if (response.status === 200) {
            commit(types.FILL_ESTADO, response.data)

            console.log('se guardo')
            buildSuccess(
              {
                msg: 'common.estado.EDITED_SUCCESSFULLY',
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
  addEstadoData({ commit }, data) {
    commit(types.ADD_ESTADO_DATA, data)
  },
  deleteEstado({ commit }, codigo) {
    return new Promise((resolve, reject) => {
      estadosService
        .deleteEstado(codigo)
        .then((response) => {
          if (response.status === 200) {
            commit(types.CHANGE_STATE_ESTADO, response.data)

            console.log('se elimino')
            buildSuccess(
              {
                msg: 'common.estado.DELETED_SUCCESSFULLY',
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
  getEstadoByCodigo: (state) => (codigo) => {
    return state.estados.find((estado) => estado.codigo === codigo)
  },
  estados: (state) => {
    return state.estados
  },
  estado: (state) => state.estado,
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}

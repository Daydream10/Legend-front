/* eslint-disable */
import actasService from '@/services/actasService.js'
import * as types from '@/store/mutation-types'
import { buildSuccess, handleError } from '@/utils/utils.js'


const state = {
  actas: [],
  acta: {
    codigo: '',
    tipo: '',
    descripcion: '',
    estatus: '',
    fecha: '',
    ult_actializacion: '',
    decanato: null,
    pdf: {}
  },
  contadores: {
    actas: '',
    decanatos: '',
    usuarios: ''
  },
  ContadorActas: null,
  estado:{
      id:'',
      nombre:'',
  },
  estados: []
}

const mutations = {
  ADD_ACTA(state, acta) {
    state.actas.push(acta)
  },
  ADD_ESTADO(state, estado) {
    state.actas.push(estado)
  },
  SET_ACTAS(state, actas) {
    state.actas = actas
  },
  SET_ESTADOS(state, estados) {
    state.estados = estados
  },
  SET_ACTA(state, acta) {
    state.acta = acta
  },

  [types.CHANGE_STATE_ACTA](state) {
    state.acta.estatus = 'I'
  },
  SET_CONTADORES(state, contadores) {
    state.contadores = contadores
  },
  SET_CONTADORACTAS(state, ContadorActas) {
    state.ContadorActas = ContadorActas
  },
  UPDATE_ACTA(state, payload) {
    state.actas = state.actas.map((acta) => {
      if (acta.codigo === payload.codigo) {
        return Object.assign({}, acta, payload.data)
      }
      return acta
    })
  },

  [types.FILL_ACTA](state, data) {
    state.acta.descripcion = data.descripcion
    state.acta.tipo = data.tipo
    state.acta.fecha = data.fecha
    state.acta.ult_actializacion = data.ult_actializacion
  },
  [types.ADD_ACTA_DATA](state, data) {
    switch (data.key) {
      case 'descripcion':
        state.acta.descripcion = data.value
        break
      case 'tipo':
        state.acta.tipo = data.value
        break
      case 'fecha':
        state.acta.fecha = data.value
        break
      case 'ult_actializacion':
        state.acta.ult_actializacion = data.value
        break
      case 'decanato':
        state.acta.decanato = data.value
        break
      case 'estatus':
        state.acta.estatus = data.value
        break
      default:
        break
    }
  },
}

const actions = {
  createActa({ commit }, acta) {
    return new Promise((resolve, reject) => {
      return actasService
        .createActa(acta)
        .then((response) => {
          commit('ADD_ACTA', acta)
          console.log(response.data)
          buildSuccess(
            {
              msg: 'common.acta.CREATED_SUCCESSFULLY',
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
  fetchActa({ commit, getters, dispatch }, codigo) {
    console.log(codigo)
    const acta = getters.getActaByCodigo(codigo)
    if (acta) {
      commit('SET_ACTA', acta)
    } else {
      actasService
        .getActa(codigo)
        .then((response) => {
          console.log(response.data)
          commit('SET_ACTA', response.data)
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
  createEstado({ commit }, estado) {
    return actasService
      .createEstado(estado)
      .then((response) => {
        commit('ADD_ESTADO', estado)
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  fetchActas({ commit }) {
    actasService
      .getActas()
      .then((response) => {
        console.log(response.data)
        commit('SET_ACTAS', response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  fetchEstados({ commit }) {
    actasService
      .getEstados()
      .then((response) => {
        console.log(response.data)
        commit('SET_ESTADOS', response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  fetchActiveActas({ commit }) {
    actasService
      .getActiveActas()
      .then((response) => {
        console.log(response.data)
        commit('SET_ACTAS', response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  fetchActasDecanato({ commit }, id) {
    console.log(id)
    actasService
      .getActasDecanato(id)
      .then((response) => {
        console.log(response.data)
        commit('SET_ACTAS', response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  saveActa({ commit }, payload) {
    console.log(payload)
    console.log('hi')

    return new Promise((resolve, reject) => {
      actasService
        .updateActa(payload.codigo, payload)
        .then((response) => {
          if (response.status === 200) {
            console.log('se guardo')
            commit(types.FILL_ACTA, response.data)

            buildSuccess(
              {
                msg: 'common.acta.EDITED_SUCCESSFULLY',
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
  saveEstado({ commit }, payload) {
    console.log(payload)
    console.log('hi')
    actasService
      .updateEstado(payload.codigo, payload)
      .then((response) => {
        if (response.status === 200) {
          console.log('se guardo')
        }
      })
      .catch((error) => {
        console.log(error)
      })
  },

  addActaData({ commit }, data) {
    commit(types.ADD_ACTA_DATA, data)
  },
  deleteActa({ commit }, codigo) {
    return new Promise((resolve, reject) => {
      actasService
        .deleteActa(codigo)
        .then((response) => {
          commit(types.CHANGE_STATE_ACTA, response.data)
          if (response.status === 200) {
            buildSuccess(
              {
                msg: 'common.acta.DELETED_SUCCESSFULLY',
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
  deleteEstado({ commit }, codigo) {
    actasService
      .deleteEstado(codigo)
      .then((response) => {
        if (response.status === 200) {
          console.log('se elimino')
        }
      })
      .catch((error) => {
        console.log(error)
      })
  },
  fetchContadores({ commit }) {
    actasService
      .getContador()
      .then((response) => {
        console.log(response.data)
        commit('SET_CONTADORES', response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  fetchContadorActas({ commit }, payload) {
    actasService
      .getContadorActas(payload.codigo, payload.month)
      .then((response) => {
        console.log(response.data)
        commit('SET_CONTADORACTAS', response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  fetchActasReporte({ commit }, payload) {
    actasService
      .getActasReporte(payload.codigo, payload.month)
      .then((response) => {
        console.log('hola')
        console.log(response.data)
        commit('SET_ACTAS', response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  },
}
const getters = {
  getActaByCodigo: (state) => (codigo) => {
    return state.actas.find((acta) => acta.codigo === codigo)
  },
  actas: (state) => {
    return state.actas
  },
  acta: (state) => state.acta,
  contadores: (state) => state.contadores,
  ContadorActas: (state) => state.ContadorActas,
  estado: (estado)=> state.estado,
  estados:(state)=> state.estados
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

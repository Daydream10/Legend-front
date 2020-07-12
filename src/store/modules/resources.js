import resourceService from '@/services/resourceService.js'
import * as types from '@/store/mutation-types'
//import auth from '../../api/auth'
import { buildSuccess, handleError } from '@/utils/utils.js'

const state = {
  resources: [],
  resource: {
    id: '',
    nombre: '',
    tipo: '',
    tipo_costo: '',
    costo: null,
    vida_util: null,
    estado: '',
  },
  costos: {
    directo: null,
    indirectos: null,
    extraordinarios: null,
    total: null,
    optimista: null,
    probable: null,
    pesimista: null,
    estimado: null,
  },
}

const mutations = {
  ADD_RESOURCE(state, resource) {
    state.resources.push(resource)
  },
  SET_RESOURCES(state, resources) {
    //state.meetings.push(meetings)
    state.resources = resources
  },
  SET_RESOURCE(state, resource) {
    //state.meetings.push(meetings)
    state.resource = resource
  },
  SET_COSTOS(state, costos) {
    //state.meetings.push(meetings)
    state.costos = costos
  },
  UPDATE_MEETING(state, payload) {
    state.meetings = state.meetings.map((meeting) => {
      if (meeting.id === payload.id) {
        return Object.assign({}, meeting, payload.data)
      }
      return meeting
    })
  },
  [types.FILL_RESOURCE](state, data) {
    state.resource.nombre = data.nombre
    state.resource.costo = data.costo
    state.resource.fecha = data.tipo
    state.resource.hora = data.tipo_costo
  },
  /* [types.CHANGE_STATE_RESOURCE](state) {
    state.resource.es = false
  },*/
  [types.ADD_RESOURCE_DATA](state, data) {
    switch (data.key) {
      case 'name':
        state.resource.nombre = data.value
        break
      case 'tipo':
        state.resource.tipo = data.value
        break
      case 'tipo_costo':
        state.resource.tipo_costo = data.value
        break
      case 'costo':
        state.resource.costo = data.value
        break
      case 'vida_util':
        state.resource.vida_util = data.value
        break
      case 'estado':
        state.resource.estado = data.value
        break
      default:
        break
    }
  },
}

const actions = {
  createResource({ commit }, resource) {
    return new Promise((resolve, reject) => {
      commit(types.SHOW_LOADING, true, { root: true })
      resourceService
        .postResource(resource.projectId, resource)
        .then((response) => {
          commit('ADD_RESOURCE', resource)
          if (response.status === 201) {
            console.log('working')
            buildSuccess(
              {
                msg: 'Recurso se ha creado con exito',
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
  fetchResources({ commit }, id) {
    resourceService
      .getResources(id)
      .then((response) => {
        console.log(response.data)
        commit('SET_RESOURCES', response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  fetchResource({ commit, getters, dispatch }, id) {
    console.log(id)
    const resource = getters.getResourceById(id)
    if (resource) {
      commit('SET_RESOURCE', resource)
    } else {
      resourceService
        .getResource(id)
        .then((response) => {
          console.log(response.data)
          commit('SET_RESOURCE', response.data)
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
  fetchCosto({ commit }, id) {
    console.log(id)
    resourceService
      .getCosto(id)
      .then((response) => {
        console.log(response.data)
        commit('SET_COSTOS', response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  },

  saveResource({ commit }, payload) {
    console.log(payload.id)
    return new Promise((resolve, reject) => {
      resourceService
        .updateResource(payload.id, payload)
        .then((response) => {
          if (response.status === 200) {
            commit(types.FILL_RESOURCE, response.data)
            buildSuccess(
              {
                msg: 'Recurso se ha modificado con éxito',
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
  addResourceData({ commit }, data) {
    commit(types.ADD_RESOURCE_DATA, data)
  },

  deleteResource({ commit }, id) {
    return new Promise((resolve, reject) => {
      resourceService
        .deleteResource(id)
        .then((response) => {
          if (response.status === 204) {
            buildSuccess(
              {
                msg: 'Recurso se ha eliminado con éxito',
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
  getResourceById: (state) => (id) => {
    return state.resources.find((resource) => resource.id === id)
  },
  resources: (state) => {
    return state.resources
  },
  resource: (state) => state.resource,
  costos: (state) => state.costos,
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}

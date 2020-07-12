import ProcessService from '@/services/ProcessService.js'
import * as types from '@/store/mutation-types'
import { buildSuccess, handleError } from '@/utils/utils.js'

const state = {
  processes: [],
  process: {
    id: null,
    nombre: '',
    categoria: '',
    tipo: '',
    estado: '',
    proyecto: null,
  },
}

const mutations = {
  ADD_PROCESS(state, process) {
    state.processes.push(process)
  },
  SET_PROCESSS(state, processes) {
    //state.processes.push(processes)
    state.processes = processes
  },
  SET_PROCESS(state, process) {
    //state.processes.push(processes)
    state.process = process
  },
  UPDATE_PROCESS(state, payload) {
    state.processes = state.processes.map((process) => {
      if (process.id === payload.id) {
        return Object.assign({}, process, payload.data)
      }
      return process
    })
  },
  [types.FILL_PROCESS](state, data) {
    state.process.nombre = data.nombre
    state.process.categoria = data.categoria
    state.process.tipo = data.tipo
    state.process.proyecto = data.proyecto
    state.process.estado = data.estado
  },
  [types.CHANGE_STATE](state) {
    state.process.is_active = false
  },
  [types.ADD_PROCESS_DATA](state, data) {
    switch (data.key) {
      case 'name':
        state.process.nombre = data.value
        break
      case 'category':
        state.process.categoria = data.value
        break
      case 'type':
        state.process.tipo = data.value
        break
      case 'project':
        state.process.proyecto = data.value
        break
      case 'state':
        state.process.estado = data.value
        break
      default:
        break
    }
  },
}

const actions = {
  createProcess({ commit }, process) {
    console.log(process)

    return new Promise((resolve, reject) => {
      commit(types.SHOW_LOADING, true, { root: true })
      return ProcessService.postProcess(process, process.proyecto)
        .then((response) => {
          commit('ADD_PROCESS', process)
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
  fetchProcesses({ commit, dispatch }, id) {
    ProcessService.getProcesses(id)
      .then((response) => {
        commit('SET_PROCESSS', response.data)
      })
      .catch((error) => {
        const notification = {
          type: 'error',
          message: 'There was a problem fetching processes: ' + error.message,
        }
        dispatch('notification/add', notification, { root: true })
      })
  },
  fetchProcesses2({ commit, dispatch }, payload) {
    ProcessService.getProcesses2(payload.id, payload.categoria)
      .then((response) => {
        commit('SET_PROCESSS', response.data)
      })
      .catch((error) => {
        const notification = {
          type: 'error',
          message: 'There was a problem fetching processes: ' + error.message,
        }
        dispatch('notification/add', notification, { root: true })
      })
  },
  fetchProcess({ commit, getters, dispatch }, id) {
    const process = getters.getProcessById(id)
    if (process) {
      commit('SET_PROCESS', process)
    } else {
      ProcessService.getProcess(id)
        .then((response) => {
          console.log(response.data)
          commit('SET_PROCESS', response.data)
        })
        .catch((error) => {
          const notification = {
            type: 'error',
            message: 'There was a problem fetching process: ' + error.message,
          }
          dispatch('notification/add', notification, { root: true })
        })
    }
  },

  saveProcess({ commit }, payload) {
    return new Promise((resolve, reject) => {
      ProcessService.updateProcess(payload.id, payload)
        .then((response) => {
          if (response.status === 200) {
            commit(types.FILL_PROCESS, response.data)
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

  addProcessData({ commit }, data) {
    commit(types.ADD_PROCESS_DATA, data)
  },

  deleteProcess({ commit }, id) {
    return new Promise((resolve, reject) => {
      ProcessService.deleteProcess(id)
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
  getProcessById: (state) => (id) => {
    return state.processes.find((process) => process.id === id)
  },
  processes: (state) => {
    return state.processes
  },
  process: (state) => state.process,
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}

import ProjectService from '@/services/ProjectService.js'
import * as types from '@/store/mutation-types'
import { buildSuccess, handleError } from '@/utils/utils.js'

const state = {
  projects: [],
  project: {
    nombre: '',
    descripcion: '',
    fecha_inicio: '',
    fecha_finalizacion: '',
    tipo: '',
    metodologia: '',
    alcance: '',
    costo: null,
    presupuesto: null,
    estado: '',
    tiempo: null,
  },
  projectInfo: {
    nombre: '',
    presupuesto: null,
    costo: null,
    miembros: null,
    actividades_asignadas: null,
    actividades_completadas: null,
    procesos_totales: null,
    metodologia: '',
    fecha_inicio: '',
    fecha_finalizacion: '',
    lider: '',
  },
  objetivos: [],
  objetivo: {
    id: null,
    nombre: '',
  },
  seguridades: [],
  seguridad: {
    nombre: '',
    id: '',
  },
  requisitos: [],
  requisito: {
    nombre: '',
    id: '',
  },
}

const mutations = {
  ADD_PROJECT(state, project) {
    state.projects.push(project)
  },
  ADD_OBJETIVO(state, objetivo) {
    state.objetivos.push(objetivo)
  },

  ADD_REQUISITO(state, requisito) {
    state.requisitos.push(requisito)
  },
  ADD_SEGURIDAD(state, seguridad) {
    state.seguridades.push(seguridad)
  },
  SET_PROJECTS(state, projects) {
    state.projects = projects
  },
  SET_PROJECT(state, project) {
    state.project = project
  },
  SET_PROJECTINFO(state, projectInfo) {
    state.projectInfo = projectInfo
  },
  SET_OBJETIVO(state, objetivo) {
    state.objetivo = objetivo
  },
  SET_REQUISITO(state, requisito) {
    state.requisito = requisito
  },
  SET_SEGURIDAD(state, seguridad) {
    state.seguridad = seguridad
  },
  SET_OBJETIVOS(state, objetivos) {
    state.objetivos = objetivos
  },
  SET_SEGURIDADES(state, seguridades) {
    state.seguridades = seguridades
  },
  SET_REQUISITOS(state, requisitos) {
    state.requisitos = requisitos
  },
  [types.FILL_PROJECT](state, data) {
    state.project.nombre = data.nombre
    state.project.tipo = data.tipo
    state.project.descripcion = data.descripcion
    state.project.fecha_inicio = data.fecha_inicio
    state.project.fecha_finalizacion = data.fecha_finalizacion
    state.project.metodologia = data.metodologia
    state.project.costo = data.costo
    state.project.presupuesto = data.presupuesto
  },
  [types.CHANGE_STATE_PROJECT](state) {
    state.project.is_active = false
  },
  [types.ADD_PROJECT_DATA](state, data) {
    switch (data.key) {
      case 'name':
        state.project.nombre = data.value
        break
      case 'type':
        state.project.tipo = data.value
        break
      case 'description':
        state.project.descripcion = data.value
        break
      case 'dateCreated':
        state.project.fecha_inicio = data.value
        break
      case 'dateFinished':
        state.project.fecha_finalizacion = data.value
        break
      case 'methodology':
        state.project.metodologia = data.value
        break
      case 'presupuesto':
        state.project.presupuesto = data.value
        break
      case 'costo':
        state.project.costo = data.value
        break
      case 'alcance':
        state.project.alcance = data.value
        break
      case 'state':
        state.project.estado = data.value
        break
      case 'time':
        state.project.tiempo = data.value
        break
      default:
        break
    }
  },
}

const actions = {
  deleteObjetivo({ commit }, id) {
    return new Promise((resolve, reject) => {
      ProjectService.deleteObjetivo(id)
        .then((response) => {
          if (response.status === 204) {
            buildSuccess(
              {
                msg: 'El Objetivo se ha eliminado con éxito',
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
  deleteRequisito({ commit }, id) {
    return new Promise((resolve, reject) => {
      ProjectService.deleteRequisito(id)
        .then((response) => {
          if (response.status === 204) {
            buildSuccess(
              {
                msg: 'El Requisito se ha eliminado con éxito',
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
  deleteSeguridad({ commit }, id) {
    return new Promise((resolve, reject) => {
      ProjectService.deleteSeguridad(id)
        .then((response) => {
          if (response.status === 204) {
            buildSuccess(
              {
                msg: 'El Aspecto de Seguridad se ha eliminado con éxito',
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
  createObjetivo({ commit }, payload) {
    return new Promise((resolve, reject) => {
      commit(types.SHOW_LOADING, true, { root: true })
      ProjectService.postObjetivo(payload.id, payload)
        .then((response) => {
          commit('ADD_OBJETIVO', payload)
          if (response.status === 201) {
            console.log('working')
            buildSuccess(
              {
                msg: 'Objetivo creado con exito',
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
  createRequisito({ commit }, payload) {
    return new Promise((resolve, reject) => {
      commit(types.SHOW_LOADING, true, { root: true })
      ProjectService.postRequisito(payload.id, payload)
        .then((response) => {
          commit('ADD_REQUISITO', payload)
          if (response.status === 201) {
            console.log('working')
            buildSuccess(
              {
                msg: 'Requisito creado con exito',
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
  createSeguridad({ commit }, payload) {
    return new Promise((resolve, reject) => {
      commit(types.SHOW_LOADING, true, { root: true })
      ProjectService.postSeguridad(payload.id, payload)
        .then((response) => {
          commit('ADD_SEGURIDAD', payload)
          if (response.status === 201) {
            console.log('working')
            buildSuccess(
              {
                msg: 'Aspecto de Seguridad creado con exito',
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

  createProject({ commit, dispatch }, project) {
    return ProjectService.postProject(project)
      .then(() => {
        commit('ADD_PROJECT', project)
        const notification = {
          //type: 'success',
          //message: 'Your project has been created!',
          success() {
            /* Vue.swal({
              type: 'success',
              title: 'Hello',
              text: 'Hello brave new world!',
            })*/
            this.$swal('Oops...', 'Something went wrong!', 'success')
          },
        }
        dispatch('notification/add', notification, { root: true })
      })
      .catch((error) => {
        const notification = {
          //  type: 'error',
          //message: 'There was a problem creating your project: ' + error.message,
          success() {
            /* Vue.swal({
              type: 'success',
              title: 'Hello',
              text: 'Hello brave new world!',
            })*/
            this.$swal('Oops...', 'Something went wrong!!!!', 'error')
          },
        }
        dispatch('notification/add', notification, { root: true })
        throw error
      })
  },
  fetchProjects({ commit }, payload) {
    return new Promise((resolve, reject) => {
      ProjectService.getProjects(payload)
        .then((response) => {
          if (response.status === 200) {
            //commit(types.USERS, response.data.docs)
            // commit(types.TOTAL_USERS, response.data.totalDocs)
            commit('SET_PROJECTS', response.data)
            resolve()
          }
        })
        .catch((error) => {
          handleError(error, commit, reject)
        })
    })
  },
  fetchProject({ commit, getters, dispatch }, id) {
    var project = getters.getProjectById(id)
    if (project) {
      commit('SET_PROJECT', project)
    } else {
      ProjectService.getProject(id)
        .then((response) => {
          commit('SET_PROJECT', response.data)
        })
        .catch((error) => {
          const notification = {
            type: 'error',
            message: 'There was a problem fetching event: ' + error.message,
          }
          dispatch('notification/add', notification, { root: true })
        })
    }
  },
  fetchProjectInfo({ commit }, id) {
    ProjectService.getInfoProject(id)
      .then((response) => {
        commit('SET_PROJECTINFO', response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  fetchObjetivo({ commit }, id) {
    ProjectService.getObjetivo(id)
      .then((response) => {
        commit('SET_OBJETIVO', response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  fetchRequisito({ commit }, id) {
    ProjectService.getRequisito(id)
      .then((response) => {
        commit('SET_REQUISITO', response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  fetchSeguridad({ commit }, id) {
    ProjectService.getSeguridad(id)
      .then((response) => {
        commit('SET_SEGURIDAD', response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  fetchObjetivos({ commit }, payload) {
    return new Promise((resolve, reject) => {
      ProjectService.getObjetivos(payload)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_OBJETIVOS', response.data)
            resolve()
          }
        })
        .catch((error) => {
          handleError(error, commit, reject)
        })
    })
  },
  fetchRequisitos({ commit }, payload) {
    return new Promise((resolve, reject) => {
      ProjectService.getRequisitos(payload)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_REQUISITOS', response.data)
            resolve()
          }
        })
        .catch((error) => {
          handleError(error, commit, reject)
        })
    })
  },
  fetchSeguridades({ commit }, payload) {
    return new Promise((resolve, reject) => {
      ProjectService.getSeguridades(payload)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_SEGURIDADES', response.data)
            resolve()
          }
        })
        .catch((error) => {
          handleError(error, commit, reject)
        })
    })
  },
  saveProject({ commit }, payload) {
    return new Promise((resolve, reject) => {
      ProjectService.updateProject(payload.id, payload)
        .then((response) => {
          if (response.status === 200) {
            commit(types.FILL_PROJECT, response.data)
            //commit('projects/SHOW_LOADING')
            //  commit(types.SHOW_LOADING, true)
            buildSuccess(
              {
                msg: 'common.project.EDITED_SUCCESSFULLY',
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

  addProjectData({ commit }, data) {
    commit(types.ADD_PROJECT_DATA, data)
  },

  deleteProject({ commit }, payload) {
    return new Promise((resolve, reject) => {
      ProjectService.deleteProject(payload.id, payload)
        .then((response) => {
          if (response.status === 200) {
            commit(types.CHANGE_STATE_PROJECT, response.data)
            buildSuccess(
              {
                msg: 'common.project.DELETED_SUCCESSFULLY',
              },
              commit,
              resolve
            )
            // alert('it works', commit, resolve)
          }
        })
        .catch((error) => {
          handleError(error, commit, reject)
          //alert('doesnt work', error, commit, reject)
        })
    })
  },
}
const getters = {
  getProjectById: (state) => (id) => {
    return state.projects.find((project) => project.id === id)
  },
  projects: (state) => {
    return state.projects
  },
  project: (state) => state.project,
  projectInfo: (state) => state.projectInfo,
  objetivo: (state) => state.objetivo,
  requisito: (state) => state.requisito,
  seguridad: (state) => state.seguridad,

  objetivos: (state) => {
    return state.objetivos
  },
  seguridades: (state) => {
    return state.seguridades
  },
  requisitos: (state) => {
    return state.requisitos
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}

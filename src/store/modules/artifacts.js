import artifactsService from '@/services/artifactsService.js'
import * as types from '@/store/mutation-types'
//import auth from '../../api/auth'
import { buildSuccess, handleError } from '@/utils/utils.js'

const state = {
  artifacts: [],
  artifact: {
    id: '',
    nombre: '',
    descripcion: '',
    enlace: '',
    estado: '',
  },
}

const mutations = {
  ADD_ARTIFACT(state, artifact) {
    state.artifacts.push(artifact)
  },
  SET_ARTIFACTS(state, artifacts) {
    //state.meetings.push(meetings)
    state.artifacts = artifacts
  },
  SET_ARTIFACT(state, artifact) {
    //state.meetings.push(meetings)
    state.artifact = artifact
  },
  UPDATE_ARTIFACT(state, payload) {
    state.artifacts = state.artifacts.map((artifact) => {
      if (artifact.id === payload.id) {
        return Object.assign({}, artifact, payload.data)
      }
      return artifact
    })
  },
  [types.FILL_ARTIFACT](state, data) {
    state.artifact.nombre = data.nombre
    state.artifact.descripcion = data.descripcion
    state.artifact.enlace = data.enlace
    state.artifact.estado = data.estado
  },
  /* [types.CHANGE_STATE_RESOURCE](state) {
       state.resource.es = false
     },*/
  [types.ADD_ARTIFACT_DATA](state, data) {
    switch (data.key) {
      case 'name':
        state.artifact.nombre = data.value
        break
      case 'description':
        state.artifact.descripcion = data.value
        break
      case 'enlace':
        state.artifact.enlace = data.value
        break
      case 'estado':
        state.artifact.estado = data.value
        break
      default:
        break
    }
  },
}

const actions = {
  createArtifact({ commit }, artifact) {
    console.log(artifact.projectId)
    return artifactsService
      .postArtefacto(artifact.projectId, artifact)
      .then((response) => {
        commit('ADD_ARTIFACT', artifact)
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  fetchArtifacts({ commit }, id) {
    artifactsService
      .getArtefactos(id)
      .then((response) => {
        console.log(response.data)
        commit('SET_ARTIFACTS', response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  fetchArtifact({ commit, getters, dispatch }, id) {
    console.log(id)
    const artifact = getters.getArtifactById(id)
    if (artifact) {
      commit('SET_ARTIFACT', artifact)
    } else {
      artifactsService
        .getArtefacto(id)
        .then((response) => {
          console.log(response.data)
          commit('SET_ARTIFACT', response.data)
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

  saveArtifact({ commit }, payload) {
    console.log(payload.id)
    return new Promise((resolve, reject) => {
      artifactsService
        .updateArtefacto(payload.id, payload)
        .then((response) => {
          if (response.status === 200) {
            commit(types.FILL_RESOURCE, response.data)
            buildSuccess(
              {
                msg: 'The resource was updated',
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
  addArtifactData({ commit }, data) {
    commit(types.ADD_RESOURCE_DATA, data)
  },

  deleteArtifact({ commit }, id) {
    return new Promise((resolve, reject) => {
      artifactsService
        .deleteArtefacto(id)
        .then((response) => {
          if (response.status === 204) {
            buildSuccess(
              {
                msg: 'El Artefacto fue eliminado con éxito',
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
  getArtifactById: (state) => (id) => {
    return state.artifacts.find((artifact) => artifact.id === id)
  },
  artifacts: (state) => {
    return state.artifacts
  },
  artifact: (state) => state.artifact,
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}

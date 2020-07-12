import RiskService from '@/services/RiskService.js'
import * as types from '@/store/mutation-types'
import auth from '../../api/auth'
import { buildSuccess, handleError } from '@/utils/utils.js'

const state = {
  risks: [],
  risk: {
    nombre: '',
  },
}

const mutations = {
  ADD_RISK(state, risk) {
    state.risks.push(risk)
  },
  SET_RISKS(state, risks) {
    //state.meetings.push(meetings)
    state.risks = risks
  },
  SET_RISK(state, risk) {
    //state.meetings.push(meetings)
    state.risk = risk
  },
  UPDATE_RISK(state, payload) {
    state.risks = state.risks.map((risk) => {
      if (risk.id === payload.id) {
        return Object.assign({}, risk, payload.data)
      }
      return risk
    })
  },
  [types.FILL_RISK](state, data) {
    state.risk.nombre = data.nombre
  },
  [types.CHANGE_STATE](state) {
    state.risk.is_active = false
  },
  [types.ADD_RISK_DATA](state, data) {
    switch (data.key) {
      case 'name':
        state.risk.nombre = data.value
        break
    }
  },
}

const actions = {
  createRisk({ commit, dispatch }, risk) {
    console.log(risk.projectId)
    return RiskService.postRisk(risk, risk.projectId)
      .then(() => {
        commit('ADD_RISK', risk)
        const notification = {
          //type: 'success',
          //message: 'Your meeting has been created!',
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
          //message: 'There was a problem creating your meeting: ' + error.message,
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
  fetchRisks({ commit, dispatch }, id) {
    RiskService.getRisk(id)
      .then((response) => {
        commit('SET_RISKS', response.data)
      })
      .catch((error) => {
        console.log(this.risk)
        const notification = {
          type: 'error',
          message: 'There was a problem fetching risks: ' + error.message,
        }
        dispatch('notification/add', notification, { root: true })
      })
  },
  fetchRisk({ commit, getters, dispatch }, id) {
    const risk = getters.getRiskById(id)
    if (risk) {
      commit('SET_RISK', risk)
    } else {
      RiskService.getRisk(id)
        .then((response) => {
          console.log(response.data)
          commit('SET_RISK', response.data)
        })
        .catch((error) => {
          const notification = {
            type: 'error',
            message: 'There was a problem fetching risk: ' + error.message,
          }
          dispatch('notification/add', notification, { root: true })
        })
    }
  },
  saveRisk({ commit }, payload) {
    return new Promise((resolve, reject) => {
      RiskService.updateRisk(payload.id, payload)
        .then((response) => {
          if (response.status === 200) {
            commit(types.FILL_RISK, response.data)
            buildSuccess(
              {
                msg: 'The risk was updated',
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
  addRiskData({ commit }, data) {
    commit(types.ADD_RISK_DATA, data)
  },

  deleteRisk({ commit }, payload) {
    return new Promise((resolve, reject) => {
      auth
        .deleteRisk(payload.id, payload)
        .then((response) => {
          if (response.status === 200) {
            commit(types.CHANGE_STATE, response.data)
            buildSuccess(
              {
                msg: 'The risk was deleted',
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
  getRiskById: (state) => (id) => {
    return state.risks.find((risk) => risk.id === id)
  },
  risks: (state) => {
    return state.risks
  },
  risk: (state) => state.risk,
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}

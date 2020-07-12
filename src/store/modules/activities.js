import ActivityService from '@/services/ActivityService.js'
import * as types from '@/store/mutation-types'
import auth from '../../api/auth'
import { buildSuccess, handleError } from '@/utils/utils.js'

const state = {
  activities: [],
  activity: {
    id: '',
    nombre: '',
    descripcion: '',
    fecha_inicio: null,
    fecha_finalizacion: null,
    //estado: '',
    //proceso: '',
    //predecesor: null,
  },
}

const mutations = {
  ADD_ACTIVITY(state, activity) {
    state.activities.push(activity)
  },
  SET_ACTIVITIES(state, activities) {
    //state.activities.push(activities)
    state.activities = activities
  },
  SET_ACTIVITY(state, activity) {
    //state.activities.push(activities)
    state.activity = activity
  },
  UPDATE_ACTIVITY(state, payload) {
    state.activities = state.activities.map((activity) => {
      if (activity.id === payload.id) {
        return Object.assign({}, activity, payload.data)
      }
      return activity
    })
  },
  [types.FILL_ACTIVITY](state, data) {
    state.activity.nombre = data.nombre
    state.activity.descripcion = data.descripcion
    state.activity.fecha_inicio = data.fecha_inicio
    state.activity.fecha_finalizacion = data.fecha_finalizacion
  },
  [types.CHANGE_STATE](state) {
    state.activity.is_active = false
  },
  [types.ADD_ACTIVITY_DATA](state, data) {
    switch (data.key) {
      case 'name':
        state.activity.nombre = data.value
        break
      case 'description':
        state.activity.descripcion = data.value
        break
      case 'date_start':
        state.activity.fecha_inicio = data.value
        break
      case 'date_finish':
        state.activity.fecha_finalizacion = data.value
        break
      default:
        break
    }
  },
}

const actions = {
  createActivity({ commit, dispatch }, activity) {
    console.log(activity.projectId)
    return ActivityService.postActivity(activity, activity.projectId)
      .then(() => {
        commit('ADD_ACTIVITY', activity)
        const notification = {
          //type: 'success',
          //message: 'Your activity has been created!',
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
          //message: 'There was a problem creating your activity: ' + error.message,
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
  fetchActivities({ commit, dispatch }, payload) {
    //ActivityService.getActivities(id)

    ActivityService.getActivities(payload.id)
      .then((response) => {
        commit('SET_ACTIVITIES', response.data)
      })
      .catch((error) => {
        console.log(this.activity)
        const notification = {
          type: 'error',
          message: 'There was a problem fetching activities: ' + error.message,
        }
        dispatch('notification/add', notification, { root: true })
      })
  },
  fetchActivity({ commit, getters, dispatch }, id) {
    const activity = getters.getActivityById(id)
    if (activity) {
      commit('SET_ACTIVITY', activity)
    } else {
      ActivityService.getActivity(id)
        .then((response) => {
          console.log(response.data)
          commit('SET_ACTIVITY', response.data)
        })
        .catch((error) => {
          const notification = {
            type: 'error',
            message: 'There was a problem fetching activity: ' + error.message,
          }
          dispatch('notification/add', notification, { root: true })
        })
    }
  },

  saveActivity({ commit }, payload) {
    return new Promise((resolve, reject) => {
      ActivityService.updateActivity(payload.id, payload)
        .then((response) => {
          if (response.status === 200) {
            commit(types.FILL_ACTIVITY, response.data)
            buildSuccess(
              {
                msg: 'The activity was updated',
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

  addActivityData({ commit }, data) {
    commit(types.ADD_ACTIVITY_DATA, data)
  },

  deleteActivity({ commit }, payload) {
    return new Promise((resolve, reject) => {
      auth
        .deleteActivity(payload.id, payload)
        .then((response) => {
          if (response.status === 200) {
            commit(types.CHANGE_STATE, response.data)
            buildSuccess(
              {
                msg: 'The activity was deleted',
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
  getActivityById: (state) => (id) => {
    return state.activities.find((activity) => activity.id === id)
  },
  activities: (state) => {
    return state.activities
  },
  activity: (state) => state.activity,
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}

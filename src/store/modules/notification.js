export const namespaced = true
//import * as types from '@/store/mutation-types'
import NotificationService from '@/services/NotificationService.js'
//import { buildSuccess, handleError } from '@/utils/utils.js'
const state = {
  notifications: [],
}

const mutations = {
  ADD_NOTIFICATION(state, notification) {
    state.nonotifications.push(notification)
  },
  SET_NOTIFICATIONS(state, notifications) {
    state.notifications = notifications
  },
  SET_NOTIFICATION(state, notification) {
    state.user = notification
  },
}
const actions = {
  fetchNotifications({ commit, dispatch }) {
    NotificationService.getAllNotifications()
      .then((response) => {
        commit('SET_NOTIFICATIONS', response.data)
      })
      .catch((error) => {
        const notification = {
          type: 'error',
          message: 'There was a problem fetching meetings: ' + error.message,
        }
        dispatch('notification/add', notification, { root: true })
      })
  },
  markReadNotifications({ commit, dispatch }) {
    NotificationService.getAllNotifications()
      .then((response) => {
        commit('SET_NOTIFICATIONS', response.data)
      })
      .catch((error) => {
        const notification = {
          type: 'error',
          message: 'There was a problem fetching meetings: ' + error.message,
        }
        dispatch('notification/add', notification, { root: true })
      })
  },
}
const getters = {
  getNotificationById: (state) => (id) => {
    return state.notifications.find((notification) => notification.id === id)
  },
  notifications: (state) => {
    return state.notifications
  },
  notification: (state) => state.notification,
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}

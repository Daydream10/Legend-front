import MeetingService from '@/services/MeetingService.js'
import * as types from '@/store/mutation-types'
//import auth from '../../api/auth'
import { buildSuccess, handleError } from '@/utils/utils.js'

const state = {
  meetings: [],
  meeting: {
    nombre: '',
    descripcion: '',
    fecha: null,
    hora: null,
    lugar: '',
  },
}

const mutations = {
  ADD_MEETING(state, meeting) {
    state.meetings.push(meeting)
  },
  SET_MEETINGS(state, meetings) {
    //state.meetings.push(meetings)
    state.meetings = meetings
  },
  SET_MEETING(state, meeting) {
    //state.meetings.push(meetings)
    state.meeting = meeting
  },
  UPDATE_MEETING(state, payload) {
    state.meetings = state.meetings.map((meeting) => {
      if (meeting.id === payload.id) {
        return Object.assign({}, meeting, payload.data)
      }
      return meeting
    })
  },
  [types.FILL_MEETING](state, data) {
    state.meeting.nombre = data.nombre
    state.meeting.descripcion = data.descripcion
    state.meeting.fecha = data.fecha
    state.meeting.hora = data.hora
    state.meeting.lugar = data.lugar
  },
  [types.CHANGE_STATE](state) {
    state.meeting.is_active = false
  },
  [types.ADD_MEETING_DATA](state, data) {
    switch (data.key) {
      case 'name':
        state.meeting.nombre = data.value
        break
      case 'description':
        state.meeting.descripcion = data.value
        break
      case 'date':
        state.meeting.fecha = data.value
        break
      case 'time':
        state.meeting.hora = data.value
        break
      case 'place':
        state.meeting.lugar = data.value
        break
      default:
        break
    }
  },
}

const actions = {
  createUser({ commit }, payload) {
    return new Promise((resolve, reject) => {
      commit(types.SHOW_LOADING, true, { root: true })
      MeetingService.postMeeting(payload, payload.projectId)
        .then((response) => {
          //   commit('ADD_MEETING', meeting)
          if (response.status === 201) {
            buildSuccess(
              {
                msg: 'common.meeting.CREATED_SUCCESSFULLY',
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
  fetchMeetings({ commit, dispatch }, id) {
    MeetingService.getMeetings(id)
      .then((response) => {
        commit('SET_MEETINGS', response.data)
      })
      .catch((error) => {
        console.log(this.meeting)
        const notification = {
          type: 'error',
          message: 'There was a problem fetching meetings: ' + error.message,
        }
        dispatch('notification/add', notification, { root: true })
      })
  },
  fetchMeeting({ commit, getters, dispatch }, id) {
    const meeting = getters.getMeetingById(id)
    if (meeting) {
      commit('SET_MEETING', meeting)
    } else {
      MeetingService.getMeeting(id)
        .then((response) => {
          console.log(response.data)
          commit('SET_MEETING', response.data)
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

  saveMeeting({ commit }, payload) {
    return new Promise((resolve, reject) => {
      MeetingService.updateMeeting(payload.id, payload)
        .then((response) => {
          if (response.status === 200) {
            commit(types.FILL_MEETING, response.data)
            buildSuccess(
              {
                msg: 'common.meeting.EDITED_SUCCESSFULLY',
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

  addMeetingData({ commit }, data) {
    commit(types.ADD_MEETING_DATA, data)
  },

  deleteMeeting({ commit }, id) {
    return new Promise((resolve, reject) => {
      MeetingService.deleteMeeting(id)
        .then((response) => {
          if (response.status === 204) {
            buildSuccess(
              {
                msg: 'common.meeting.DELETED_SUCCESSFULLY',
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
  getMeetingById: (state) => (id) => {
    return state.meetings.find((meeting) => meeting.id === id)
  },
  meetings: (state) => {
    return state.meetings
  },
  meeting: (state) => state.meeting,
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}

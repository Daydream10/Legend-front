import MemberService from '@/services/MemberService.js'
//import { buildSuccess, handleError } from '@/utils/utils.js'
import * as types from '@/store/mutation-types'
import { buildSuccess, handleError } from '@/utils/utils.js'

const state = {
  members: [],
  membersTotal: 0,
  member: {
    rol: '',
    proyecto: {
      nombre: '',
    },
    usuario: {
      email: '',
      nombre: '',
    },
  },
  member2: {
    rol: '',
    proyecto: {
      nombre: '',
    },
    usuario: {
      email: '',
      nombre: '',
    },
  },
}

const mutations = {
  ADD_MEMBER(state, member) {
    state.members.push(member)
  },
  SET_MEMBERS(state, member) {
    //state.meetings.push(meetings)
    state.members = member
  },
  SET_MEETING(state, member) {
    //state.meetings.push(meetings)
    state.member = member
  },
  UPDATE_MEETING(state, payload) {
    state.members = state.members.map((member) => {
      if (member.id === payload.id) {
        return Object.assign({}, member, payload.data)
      }
      return member
    })
  },
  [types.FILL_MEMBER](state, data) {
    state.meeting.nombre = data.nombre
    state.meeting.descripcion = data.descripcion
    state.meeting.fecha = data.fecha
    state.meeting.hora = data.hora
    state.meeting.lugar = data.lugar
  },
  [types.CHANGE_STATE](state) {
    state.meeting.is_active = false
  },
  [types.ADD_MEMBER_DATA](state, data) {
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
  createMember({ commit }, payload) {
    return new Promise((resolve, reject) => {
      //commit(types.SHOW_LOADING, true, { root: true })
      MemberService.createMember(payload.proyecto, payload)
        .then((response) => {
          if (response.status === 201) {
            console.log('creado')
            buildSuccess(
              {
                msg: 'common.member.CREATED_SUCCESSFULLY',
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
  fetchMembers({ commit, dispatch }, id) {
    MemberService.getMembers(id)
      .then((response) => {
        commit('SET_MEMBERS', response.data)
      })
      .catch((error) => {
        console.log(this.member)
        const notification = {
          type: 'error',
          message: 'There was a problem fetching meetings: ' + error.message,
        }
        dispatch('notification/add', notification, { root: true })
      })
  },
  /*fetchMeeting({ commit, getters, dispatch }, id) {
    const meeting = getters.getMeetingById(id);
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
  },*/

  saveMember({ commit }, payload) {
    return new Promise((resolve, reject) => {
      MemberService.updateMeeting(payload.id, payload)
        .then((response) => {
          if (response.status === 200) {
            commit(types.FILL_MEMBER, response.data)
            buildSuccess(
              {
                msg: 'common.member.CREATED_SUCCESSFULLY',
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
    commit(types.ADD_MEMBER_DATA, data)
  },

  deleteMember({ commit }, id) {
    return new Promise((resolve, reject) => {
      MemberService.deleteMember(id)
        .then((response) => {
          if (response.status === 204) {
            buildSuccess(
              {
                msg: 'common.member.DELETED_SUCCESSFULLY',
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
  getMemberById: (state) => (id) => {
    return state.members.find((member) => member.id === id)
  },
  members: (state) => {
    return state.members
  },
  member: (state) => state.member,
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}

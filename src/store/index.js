import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

import auth from './modules/auth/auth'
import password from './modules/auth/password'
import signup from './modules/auth/signup'
//import * as users from './modules/users'
import users from './modules/users'
import meetings from './modules/meetings'
import * as notification from './modules/notification'
import profile from './modules/profile'
import loading from './modules/loading'
import error from './modules/error'
import success from './modules/success'
import members from './modules/members'
import projects from './modules/projects'
import notifications from './modules/notification'
import processes from './modules/processes'
import locale from './modules/locale'
import resources from './modules/resources'
import artifacts from './modules/artifacts'
import activities from './modules/activities'

//import * as user from '@/store/modules/user.js'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
//const debug = true

import persistedState from 'vuex-persistedstate'
import board from './modules/board'

export default new Vuex.Store({
  state: {
    barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
    barImage: 'https://www.eoi.es/blogs/imsd/files/2017/03/coworking-1.jpg',
    drawer: null,
    //otras imagenes:
    //https://www.eoi.es/blogs/imsd/files/2017/03/coworking-1.jpg
  },
  mutations: {
    SET_BAR_IMAGE(state, payload) {
      state.barImage = payload
    },
    SET_DRAWER(state, payload) {
      state.drawer = payload
    },
    SET_SCRIM(state, payload) {
      state.barColor = payload
    },
  },
  modules: {
    auth,
    password,
    signup,
    users,
    notification,
    profile,
    loading,
    error,
    success,
    projects,
    locale,
    meetings,
    members,
    notifications,
    processes,
    resources,
    artifacts,
    board,
    activities,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
  [persistedState()]: [],
})

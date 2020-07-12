import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

import loading from './modules/loading'
import error from './modules/error'
import success from './modules/success'
import locale from './modules/locale'
import actas from './modules/actas'
import decanatos from './modules/decanatos'
import users from './modules/users'
import { auth } from './modules/auth.module'
//import * as user from '@/store/modules/user.js'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
//const debug = true

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
    users,
    loading,
    error,
    success,
    locale,
    actas,
    decanatos,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
})

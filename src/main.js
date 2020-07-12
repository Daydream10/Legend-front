
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/base'
import './plugins/vee-validate'
import vuetify from './plugins/vuetify'
//import i18n from './locales'
import i18n from '@/plugins/i18n'

import '@/plugins/common'


import VueSweetalert2 from 'vue-sweetalert2'

// plugins
//Vue.use(VeeValidate)

// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css'
const options = {
  confirmButtonColor: '#41b882',
  cancelButtonColor: '#ff7674',
}

Vue.use(VueSweetalert2, options)
Vue.use(VuetifyConfirm, { vuetify })

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  el: '#app',
  i18n,
  render: (h) => h(App),
  created() {
    store.dispatch('setLocale', store.getters.locale)
    if (store.getters.isTokenSet) {
      store.dispatch('autoLogin')
    }
  },
}).$mount('#app')

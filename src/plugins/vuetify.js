import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import i18n from '@/locales'
import '@/sass/overrides.sass'
//import { TiptapVuetifyPlugin } from 'tiptap-vuetify'
Vue.use(Vuetify)

const theme = {
  primary: '#E91E63',
  secondary: '#9C27b0',
  accent: '#9C27b0',
  info: '#00CAE3',
  purple: '#4527A0',
}

export default new Vuetify({
  lang: {
    t: (key, ...params) => i18n.t(key, params),
  },
  theme: {
    themes: {
      dark: theme,
      light: theme,
    },
  },
})

/*import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        background: colors.grey.lighten3,
        list: colors.grey.lighten2,
      },
      dark: {
        background: colors.grey.darken3,
        list: "#393939",
        card: colors.grey.darken4,
        primary: colors.lightBlue.darken3,
        dialog: colors.grey.darken4,
      }
    }
  }
});
 */

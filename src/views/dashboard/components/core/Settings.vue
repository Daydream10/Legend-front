<template>
  <div id="settings-wrapper">
    <v-card
      id="settings"
      class="py-2 px-4"
      color="rgba(0, 0, 0, .3)"
      dark
      flat
      link
      min-width="100"
      style="position: fixed; top: 115px; right: -35px; border-radius: 8px;"
    >
      <v-icon>mdi mdi-emoticon-cool</v-icon>
    </v-card>

    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      activator="#settings"
      bottom
      content-class="v-settings"
      left
      nudge-left="8"
      offset-x
      origin="top right"
      transition="scale-transition"
    >
      <v-card class="text-center mb-0" width="300">
        <v-card-text>
          <strong class="mb-3 d-inline-block">COLOR PRINCIPAL</strong>

          <v-item-group v-model="color">
            <v-item v-for="color in colors" :key="color" :value="color">
              <template v-slot="{ active, toggle }">
                <v-avatar
                  :class="active && 'v-settings__item--active'"
                  :color="color"
                  class="v-settings__item"
                  size="25"
                  @click="toggle"
                />
              </template>
            </v-item>
          </v-item-group>

          <v-divider class="my-4 secondary" />

          <strong class="mb-3 d-inline-block">FONDO DE LA BARRA LATERAL</strong>

          <v-item-group v-model="scrim">
            <v-item
              v-for="scrim in scrims"
              :key="scrim"
              :value="scrim"
              class="mx-1"
            >
              <template v-slot="{ active, toggle }">
                <v-avatar
                  :class="active && 'v-settings__item--active'"
                  :color="scrim"
                  class="v-settings__item"
                  size="24"
                  @click="toggle"
                />
              </template>
            </v-item>
          </v-item-group>

          <v-divider class="my-4 secondary" />

          <v-row align="center" no-gutters>
            <v-col cols="auto">Modo Nocturno</v-col>

            <v-spacer />

            <v-col cols="auto">
              <v-switch
                v-model="$vuetify.theme.dark"
                class="ma-0 pa-0"
                color="secondary"
                hide-details
              />
            </v-col>
          </v-row>

          <v-divider class="my-4 secondary" />

          <v-row align="center" no-gutters>
            <v-col cols="auto">Mini Barra Lateral</v-col>

            <v-spacer />

            <v-col cols="auto">
              <v-switch
                v-model="internalValue"
                class="ma-0 pa-0"
                color="secondary"
                hide-details
              />
            </v-col>
          </v-row>

          <v-divider class="my-4 secondary" />

          <v-row align="center" no-gutters>
            <v-col cols="auto">Imagen de fondo</v-col>

            <v-spacer />

            <v-col cols="auto">
              <v-switch
                v-model="showImg"
                class="ma-0 pa-0"
                color="secondary"
                hide-details
              />
            </v-col>
          </v-row>

          <v-divider class="my-4 secondary" />

          <strong class="mb-3 d-inline-block"
            >FONDOS DE LA BARRA LATERAL</strong
          >

          <v-item-group
            v-model="image"
            class="d-flex justify-space-between mb-3"
          >
            <v-item
              v-for="image in images"
              :key="image"
              :value="image"
              class="mx-1"
            >
              <template v-slot="{ active, toggle }">
                <v-sheet
                  :class="active && 'v-settings__item--active'"
                  class="d-inline-block v-settings__item"
                  @click="toggle"
                >
                  <v-img :src="image" height="100" width="50" />
                </v-sheet>
              </template>
            </v-item>
          </v-item-group>

          <v-btn
            block
            class="mb-3"
            color="primary"
            href="/src/components/Settings2.vue"
            default
            rel="noopener"
            target="_blank"
            >IR A OPCIONES</v-btn
          >
        </v-card-text>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
// Mixins
import Proxyable from 'vuetify/lib/mixins/proxyable'
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'DashboardCoreSettings',

  mixins: [Proxyable],

  data: () => ({
    color: '#E91E63',
    colors: ['#9C27b0', '#FF9100', '#E64A19', '#6D4C41', '#E91E63', '#43A047'],
    image: 'https://www.eoi.es/blogs/imsd/files/2017/03/coworking-1.jpg',
    images: [
      'https://www.eoi.es/blogs/imsd/files/2017/03/coworking-1.jpg',
      'https://cdn.aarp.net/content/dam/aarp/work/career-change/2018/03/1140-fd-is-coding-boot-camp-for-you.imgcache.rev4c79daf5768ae52a73a46e372b5bc2b4.jpg',
      'https://i.pinimg.com/originals/6c/2a/57/6c2a57a59549a752bbef4c7bba817c6b.png',
      'https://c4.wallpaperflare.com/wallpaper/657/137/89/work-finance-documents-office-wallpaper-preview.jpg',
    ],
    menu: false,
    saveImage: '',
    scrim: 'rgba(0, 0, 0, .7), rgba(0, 0, 0, .7)',
    scrims: [
      'rgba(0, 0, 0, .7), rgba(0, 0, 0, .7)',
      'rgba(228, 226, 226, 1), rgba(255, 255, 255, 0.7)',
      'rgba(244, 67, 54, .8), rgba(244, 67, 54, .8)',
      'rgba(106, 27, 154, 0.78), rgba(123, 31, 162, 0.78)',
    ],
    showImg: true,
  }),

  computed: {
    ...mapState(['barImage']),
  },

  watch: {
    color(val) {
      this.$vuetify.theme.themes[this.isDark ? 'dark' : 'light'].primary = val
    },
    showImg(val) {
      if (!val) {
        this.saveImage = this.barImage
        this.setBarImage('')
      } else if (this.saveImage) {
        this.setBarImage(this.saveImage)
        this.saveImage = ''
      } else {
        this.setBarImage(val)
      }
    },
    image(val) {
      this.setBarImage(val)
    },
    scrim(val) {
      this.$store.commit('SET_SCRIM', val)
    },
  },

  methods: {
    ...mapMutations({
      setBarImage: 'SET_BAR_IMAGE',
    }),
  },
}
</script>

<style lang="sass">
.v-settings
  .v-item-group > *
    cursor: pointer

  &__item
    border-width: 3px
    border-style: solid
    border-color: transparent !important

    &--active
      border-color: #00cae3 !important
</style>

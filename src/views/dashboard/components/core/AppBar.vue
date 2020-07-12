<template>
  <v-app-bar id="app-bar" absolute app color="transparent" flat height="75">
    <v-btn
      class="mr-3"
      elevation="1"
      fab
      small
      @click="
        $vuetify.breakpoint.smAndDown
          ? setDrawer(!drawer)
          : $emit('input', !value)
      "
    >
      <v-icon v-if="value">mdi-view-quilt</v-icon>

      <v-icon v-else>mdi-dots-vertical</v-icon>
    </v-btn>

    <v-toolbar-title
      class="hidden-sm-and-down font-weight-light"
      v-text="$route.name"
    />

    <v-spacer />

    <div class="mx-3" />

    <v-btn class="ml-2" min-width="0" text>
      <v-icon>mdi-view-dashboard</v-icon>
    </v-btn>

    <v-menu
      bottom
      left
      offset-y
      origin="top right"
      transition="scale-transition"
    >
      <template v-slot:activator="{ attrs, on }">
        <v-btn class="ml-2" min-width="0" text v-bind="attrs" v-on="on">
          <v-badge color="red" overlap bordered>
            <template v-slot:badge>
              <span>{{ notifications.unread_count }}</span>
            </template>

            <v-icon>mdi-bell</v-icon>
          </v-badge>
        </v-btn>
      </template>

      <v-list :tile="false" nav>
        <div>
          <app-bar-item
            v-for="n in notifications.unread_list"
            :key="n.id"
            to="nnn"
          >
            <v-list-item-title v-text="n.verb" />
          </app-bar-item>
        </div>
      </v-list>
    </v-menu>

    <v-menu
      bottom
      left
      min-width="200"
      offset-y
      origin="top right"
      transition="scale-transition"
    >
      <template v-slot:activator="{ attrs, on }">
        <v-btn class="ml-2" min-width="0" text v-bind="attrs" v-on="on">
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </template>

      <v-list :tile="false" flat nav>
        <template v-for="(p, i) in profile">
          <v-divider v-if="p.divider" :key="`divider-${i}`" class="mb-2 mt-2" />

          <app-bar-item v-else :key="`item-${i}`">
            <div v-if="p.title === 'Perfil'">
              <v-list-item-title v-text="p.title" @click="edituser" />
            </div>
            <div v-if="p.title === 'Cerrar Sesión'">
              <v-list-item-title v-text="p.title" @click="dialog3 = true" />
            </div>
          </app-bar-item>
        </template>
      </v-list>
    </v-menu>
    <v-dialog v-model="dialog3" max-width="300">
      <v-card>
        <v-card-title>
          ¿Está seguro de que desea cerrar sesión?

          <v-spacer />

          <v-icon aria-label="Close" @click="dialog3 = false">
            mdi-close
          </v-icon>
        </v-card-title>

        <v-card-text class="pb-6 pt-12 text-center">
          <v-btn class="mr-3" text @click="dialog3 = false">
            No
          </v-btn>

          <v-btn color="success" text @click="logout">
            Si
          </v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-app-bar>
</template>

<script>
// Components
import { VHover, VListItem } from 'vuetify/lib'

// Utilities
import { mapState, mapMutations, mapGetters } from 'vuex'

export default {
  name: 'DashboardCoreAppBar',

  components: {
    AppBarItem: {
      render(h) {
        return h(VHover, {
          scopedSlots: {
            default: ({ hover }) => {
              return h(
                VListItem,
                {
                  attrs: this.$attrs,
                  class: {
                    'black--text': !hover,
                    'white--text secondary elevation-12': hover,
                  },
                  props: {
                    activeClass: '',
                    dark: hover,
                    link: true,
                    ...this.$attrs,
                  },
                },
                this.$slots.default
              )
            },
          },
        })
      },
    },
  },

  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    dialog3: false,
    profile: [
      { title: 'Perfil' },
      { divider: true },
      { title: 'Cerrar Sesión' },
    ],
  }),
  created() {
    this.$store.dispatch('notifications/fetchNotifications')
  },
  computed: {
    ...mapState(['drawer']),
    ...mapGetters('notifications', ['notifications']),
  },

  methods: {
    ...mapMutations({
      setDrawer: 'SET_DRAWER',
    }),
    /*...mapActions('notifications'['']),*/
    logout({ username, password }) {
      this.$store
        .dispatch('auth/logout', { username, password })
        .then(() => this.$router.push('/login/identifier'))
    },
    edituser() {
      this.$router.push('/userprofile/edit')
    },
    read(id) {
      console.log(id)
    },
  },
}
</script>

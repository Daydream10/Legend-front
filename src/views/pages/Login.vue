<template>
  <v-container id="login" class="fill-height justify-center" tag="section">
    <v-row justify="center">
      <v-slide-y-transition appear>
        <base-material-card
          color="success"
          light
          max-width="100%"
          width="400"
          class="px-5 py-3"
        >
          <template v-slot:heading>
            <div class="text-center">
              <h1 class="display-2 font-weight-bold mb-2">
                Login
              </h1>

              <v-btn
                v-for="(social, i) in socials"
                :key="i"
                :href="social.href"
                class="ma-1"
                icon
                rel="noopener"
                target="_blank"
              >
                <v-icon v-text="social.icon" />
              </v-btn>
            </div>
          </template>

          <v-card-text class="text-center">
            <div class="text-center grey--text body-1 font-weight-light">
              Secretaría de la UCLA
            </div>
            <form name="form" @submit.prevent="handleLogin">
              <v-text-field
                color="secondary"
                label="Usuario"
                v-model="user.username"
                prepend-icon="mdi-email"
              />

              <v-text-field
                class="mb-8"
                color="secondary"
                label="Contraseña"
                prepend-icon="mdi-lock-outline"
                v-model="user.password"
              />

              <pages-btn
                large
                color=""
                depressed
                class="v-btn--text success--text"
                @click="handleLogin()"
              >
                Let's Go
              </pages-btn>
            </form>
          </v-card-text>
        </base-material-card>
      </v-slide-y-transition>
    </v-row>
  </v-container>
</template>

<script>
import User from '@/models/user'

export default {
  name: 'PagesLogin',

  components: {
    PagesBtn: () => import('./components/Btn'),
  },

  /*data: () => ({
    socials: [
      {
        href: '#',
        icon: 'mdi-facebook-box',
      },
      {
        href: '#',
        icon: 'mdi-twitter',
      },
      {
        href: '#',
        icon: 'mdi-github-box',
      },
    ],
  }),*/
  data() {
    return {
      user: new User('', ''),
      username: '',
      password: '',
      socials: [
        {
          href: '#',
          icon: 'mdi-facebook-box',
        },
        {
          href: '#',
          icon: 'mdi-twitter',
        },
        {
          href: '#',
          icon: 'mdi-github-box',
        },
      ],
    }
  },

  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push('/')
    }
  },

  methods: {
    handleLogin() {
      this.loading = true
      /* this.$validator.validateAll()
      if (this.errors.any()) {
        this.loading = false
        return
      } */
      if (this.user.username && this.user.password) {
        this.$store.dispatch('auth/login', this.user).then(
          () => {
            this.$router.push('/')
          },
          (error) => {
            this.loading = false
            this.message = error.message
          }
        )
      }
    },
  },
}
</script>

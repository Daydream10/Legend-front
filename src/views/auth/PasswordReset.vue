<template>
  <ValidationObserver ref="obs">
    <div class="text-center">
      <span class="d-inline-block mb-8">Recuperar Contraseña</span>
      <template v-if="!emailCompleted">
        <div class="body-2 text--secondary mb-8">
          Ingresa tu correo electrónico y te enviaremos un enlace para que
          puedas cambiar tu contraseña.
        </div>
      </template>
    </div>
    <!--<template v-if="emailLoading">
      loading...
    </template>-->
    <template v-if="!emailCompleted">
      <v-form method="post">
        <VTextFieldWithValidation
          label="Correo Electrónico"
          outlined
          type="email"
          prepend-icon="mdi-account"
          v-model="inputs.email"
          rules="required|email"
        />
        <div class="d-flex justify-space-between mt-7">
          <div class="text-right mt-1">
            <v-btn outlined color="#003264" dark to="/login/identifier"
              >Atrás</v-btn
            >
          </div>
          <div class="text-right mt-1">
            <v-btn
              class="letter-spacing-0"
              style="min-width: 88px;"
              color="primary"
              type="submit"
              @click="sendPasswordResetEmail(inputs)"
              @click.stop.prevent="submit"
              >Enviar</v-btn
            >
          </div>
        </div>
      </v-form>
      <!--<span class="error" v-show="emailError">
          Ocurrió un error mientras procesábamos tu petición.
        </span>-->
    </template>
    <template v-else>
      <div>
        Acabamos de enviarte un correo electrónico con un enlace para que puedas
        cambiar tu contraseña Si el correo no aparece en unos minutos, verifica
        tu carpeta de spam.
      </div>
      <router-link to="/login/identifier">
        Regresar al login.
      </router-link>
    </template>
  </ValidationObserver>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import VTextFieldWithValidation from '@/components/inputs/VTextFieldWithValidation'

import { mapActions, mapState } from 'vuex'

export default {
  data() {
    return { inputs: { email: '' } }
  },
  components: {
    ValidationObserver,
    VTextFieldWithValidation,
  },
  computed: mapState('password', [
    'emailCompleted',
    'emailError',
    'emailLoading',
  ]),
  methods: {
    submit() {
      this.$refs.obs.validate()
    },
    ...mapActions('password', ['sendPasswordResetEmail', 'clearEmailStatus']),
    beforeRouteLeave(to, from, next) {
      this.clearEmailStatus()
      next()
    },
  },
}
</script>

<style scoped>
.theme--light.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
  background-image: linear-gradient(69.7deg, #651544 40%, #ba0340 100.1%);
}
</style>

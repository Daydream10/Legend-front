<template>
  <ValidationObserver ref="obs">
    <div class="text-center">
      <span class="d-inline-block mb-8">Recuperar Contraseña</span>
      <div class="body-1 text--secondary mb-7">
        Ingresa tu nueva contraseña
      </div>
    </div>
    <!--<template v-if="resetLoading">
      loading...
    </template>-->
    <template v-if="!resetCompleted">
      <v-form @submit.prevent="submit">
        <ValidationProvider
          rules="required|password2|minmax:8,16"
          name="Contraseña"
          v-slot="{ errors, valid }"
        >
          <v-text-field
            label="Contraseña"
            outlined
            counter
            prepend-icon="mdi-lock"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            @click:append="show1 = !show1"
            v-model="inputs.password1"
            :error-messages="errors"
            :success="valid"
          />
        </ValidationProvider>
        <ValidationProvider
          name="confirm"
          rules="required|password:@Contraseña"
          v-slot="{ errors, valid }"
        >
          <v-text-field
            label="Contraseña"
            outlined
            counter
            prepend-icon="mdi-lock"
            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show2 ? 'text' : 'password'"
            @click:append="show2 = !show2"
            v-model="inputs.password2"
            :error-messages="errors"
            :success="valid"
          />
        </ValidationProvider>
      </v-form>
      <div class="text-center mt-1">
        <v-btn
          class="mx-auto"
          color="primary"
          type="submit"
          @click="resetPassword(inputs)"
          @click.stop.prevent="submit"
          >Cambiar</v-btn
        >
      </div>
      <!--<span class="error" v-show="resetError">
        A error occured while processing your request.
      </span>-->
    </template>
    <template v-else>
      Tu contraseña ha sido cambiada
      <router-link to="/login/identifier">Regresar al login</router-link>
    </template>
  </ValidationObserver>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
//import VTextFieldWithValidation from '@/components/inputs/VTextFieldWithValidation'

export default {
  data() {
    return {
      show1: false,
      show2: false,

      inputs: {
        password1: '',
        password2: '',
        uid: this.$route.params.uid,
        token: this.$route.params.token,
      },
    }
  },
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  computed: mapState('password', [
    'resetCompleted',
    'resetError',
    'resetLoading',
  ]),
  methods: {
    submit() {
      this.$refs.obs.validate()
    },
    ...mapActions('password', ['resetPassword', 'clearResetStatus']),
    beforeRouteLeave(to, from, next) {
      this.clearResetStatus()
      next()
    },
  },
}
</script>

<style scoped>
.theme--light.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
  background-image: linear-gradient(69.1deg, #651544 3%, #ba0340 100.6%);
}
</style>

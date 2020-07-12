<template>
  <ValidationObserver ref="obs">
    <v-form method="post">
      <VTextFieldWithValidation
        label="Correo Electrónico"
        outlined
        type="email"
        prepend-icon="mdi-account"
        v-model="inputs.email"
        rules="required|email"
      />

      <VTextFieldWithValidation
        label="Contraseña"
        outlined
        counter
        prepend-icon="mdi-lock"
        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show ? 'text' : 'password'"
        @click:append="show = !show"
        v-model="inputs.password"
        rules="required"
      />
      <div class="d-flex align-baseline justify-center mt-0">
        <v-checkbox label="Recordar Usuario"></v-checkbox>
      </div>
      <div class="text-center mt-1">
        <v-btn
          class="mx-auto"
          color="primary"
          type="submit"
          :to="{ name: 'Dashboard' }"
          @click="login(inputs)"
          @click.stop.prevent="submit"
          :loading="loading"
          >Ingresar</v-btn
        >
      </div>
      <div class="text-center mt-1">
        <v-btn
          text
          class="text-none p-2"
          color="primary"
          :to="{ name: 'Password Reset' }"
          >¿Olvidó su contraseña?</v-btn
        >
      </div>
    </v-form>
    <ErrorMessage />
  </ValidationObserver>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import VTextFieldWithValidation from '@/components/inputs/VTextFieldWithValidation'

export default {
  data() {
    return {
      show: false,

      loading: false,
      inputs: {
        password1: '',
        password2: '',
      },
    }
  },
  components: {
    ValidationObserver,
    VTextFieldWithValidation,
  },
  methods: {
    login({ email, password }) {
      this.$store
        .dispatch('auth/login', { email, password })
        .then(() => this.$router.push('/'))
    },
    submit() {
      this.$refs.obs.validate()
    },
  },
}
</script>

<style scoped>
.theme--light.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
  background-image: linear-gradient(69.1deg, #651544 3%, #ba0340 100.6%);
}
</style>

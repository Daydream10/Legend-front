<template>
  <v-container id="user-profile" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <base-material-card icon="mdi-account-outline" color="primary">
          <template v-slot:after-heading>
            <div class="font-weight-light card-title mt-2">
              Decanato
              <span class="body-1">— Registro de Decanato</span>
            </div>
          </template>
          <ValidationObserver ref="observer" v-slot="{ invalid }">
            <v-form @submit.prevent="submit()">
              <v-container class="py-0">
                <v-row>
                  <v-col cols="12" md="4">
                    <VTextFieldWithValidation
                      label="Nombre"
                      color="secondary"
                      prepend-icon="mdi-account"
                      v-model="form.name"
                      rules="required"
                      class="purple-input"
                    />
                  </v-col>
                  <v-col cols="12">
                    <VTextFieldWithValidation
                      label="Direccion"
                      color="secondary"
                      prepend-icon="mdi-home"
                      v-model="form.direccion"
                      rules="required"
                      class="purple-input"
                    />
                  </v-col>
                  <v-col cols="12" md="6">
                    <VTextFieldWithValidation
                      label="Telefono"
                      color="secondary"
                      prepend-icon="mdi-phone"
                      v-model="form.telefono"
                      rules="required"
                      class="purple-input"
                    />
                  </v-col>
                  <v-col cols="12" class="text-right">
                    <v-btn
                      color="purple"
                      class="ml-0"
                      float="right"
                      margin-left="6px"
                      :to="{ name: 'DecanatosList' }"
                    >
                      Atrás
                    </v-btn>
                    <v-btn
                      color="primary"
                      float="right"
                      margin-left="6px"
                      class="mr-0"
                      @click="submit"
                      :disabled="invalid"
                    >
                      Registrar
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </ValidationObserver>
        </base-material-card>
      </v-col>
    </v-row>
    <ErrorMessage />
    <SuccessMessage />
  </v-container>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import VTextFieldWithValidation from '@/components/inputs/VTextFieldWithValidation'
//import VSelectWithValidation from '@/components/inputs/VSelectWithValidation'
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      form: {
        name: null,
        direccion: null,
        telefono: null,
      },
    }
  },
  components: {
    ValidationObserver,
    VTextFieldWithValidation,
    // VSelectWithValidation,
  },
  computed: {},
  methods: {
    ...mapActions('decanatos', ['createDecanato']),
    async submit() {
      // this.$refs.obs.validate()
      await this.createDecanato({
        nombre: this.form.name,
        direccion: this.form.direccion,
        telefono: this.form.telefono,
        estatus: 'A',
      })
    },
  },
}
</script>

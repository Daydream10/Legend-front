<template>
  <v-container id="user-profile" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <base-material-card icon="mdi-account-outline" color="primary">
          <template v-slot:after-heading>
            <div class="font-weight-light card-title mt-2">
              Decanato
              <span class="body-1">— Modificar Decanato</span>
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
                      v-model="nombre"
                      rules="required"
                      class="purple-input"
                    />
                  </v-col>
                  <v-col cols="12">
                    <VTextFieldWithValidation
                      label="Direccion"
                      color="secondary"
                      prepend-icon="mdi-home"
                      v-model="direccion"
                      rules="required"
                      class="purple-input"
                    />
                  </v-col>
                  <v-col cols="12" md="6">
                    <VTextFieldWithValidation
                      label="Telefono"
                      color="secondary"
                      prepend-icon="mdi-phone"
                      v-model="telefono"
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
                      Modificar
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
      status: '',
    }
  },
  components: {
    ValidationObserver,
    VTextFieldWithValidation,
    // VSelectWithValidation,
  },
  computed: {
    nombre: {
      get() {
        return this.$store.state.decanatos.decanato.nombre
      },
      set(value) {
        const data = {
          key: 'nombre',
          value,
        }
        this.addDecanatoData(data)
      },
    },
    direccion: {
      get() {
        return this.$store.state.decanatos.decanato.direccion
      },
      set(value) {
        const data = {
          key: 'direccion',
          value,
        }
        this.addDecanatoData(data)
      },
    },
    telefono: {
      get() {
        return this.$store.state.decanatos.decanato.telefono
      },
      set(value) {
        const data = {
          key: 'telefono',
          value,
        }
        this.addDecanatoData(data)
      },
    },
  },
  methods: {
    ...mapActions('decanatos', [
      'fetchDecanato',
      'addDecanatoData',
      'saveDecanato',
    ]),
    async submit() {
      // this.$refs.obs.validate()
      this.saveDecanato({
        codigo: this.id,
        nombre: this.nombre,
        direccion: this.direccion,
        telefono: this.telefono,
        estatus: 'A',
      })
    },
  },

  props: ['id'],
  async mounted() {
    console.log(this.id)
    await this.fetchDecanato(this.id)
  },
}
</script>

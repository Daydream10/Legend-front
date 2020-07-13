<template>
  <v-container id="user-profile" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <base-material-card icon="mdi-account-outline" color="primary">
          <template v-slot:after-heading>
            <div class="font-weight-light card-title mt-2">
              Actas
              <span class="body-1">— Modificar Actas</span>
            </div>
          </template>
          <ValidationObserver ref="observer" v-slot="{ invalid }">
            <v-form @submit.prevent="submit()">
              <v-container class="py-0">
                <v-row>
                  <v-col cols="12" md="6">
                    <VSelectWithValidation
                      v-model="tipo"
                      :items="items"
                      item-text="name"
                      item-value="id"
                      label="Type"
                      rules="required"
                      dense
                      prepend-icon="mdi-account-group"
                    />
                  </v-col>
                  <v-col cols="12" md="6">
                    <select v-model="decanato">
                      <option
                        v-for="decanato in decanatos"
                        :key="decanato.codigo"
                        :value="decanato"
                      >
                        {{ decanato.nombre }}
                      </option>
                    </select>
                  </v-col>
                  <v-col cols="12">
                    <VTextFieldWithValidation
                      label="Descripcion"
                      color="secondary"
                      prepend-icon="mdi-home"
                      v-model="descripcion"
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
                      :to="{ name: 'ActasList' }"
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
import VSelectWithValidation from '@/components/inputs/VSelectWithValidation'
import { mapActions, mapGetters } from 'vuex'
//import axios from 'axios'
//import Cookies from 'js-cookie'
//import authHeader from '@/services/auth-header.js'

export default {
  data() {
    const today = new Date()
    return {
      date: new Date(),
      minDate: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
      customElementsForm: {
        file: null,
      },
      // tipo: null,
      //descripcion: null,
      // decanato: 1,
      fecha: today,
      // estatus: 'A',
      ult_actializacion: today,
      pdf: [],
      status: '',
      items: [
        { name: 'Ordinario', id: '1' },
        { name: 'Extraordinario', id: '2' },
      ],
      // items2: [this.decanato.nombre],
    }
  },
  components: {
    ValidationObserver,
    VTextFieldWithValidation,
    VSelectWithValidation,
  },
  computed: {
    ...mapGetters('decanatos', ['decanatos']),

    tipo: {
      get() {
        return this.$store.state.actas.acta.tipo
      },
      set(value) {
        const data = {
          key: 'tipo',
          value,
        }
        this.addActaData(data)
      },
    },
    getTypeId(tipoSesion) {
      let typeId = null
      this.items.forEach((item) => {
        if (item.name === tipoSesion) typeId = item.id
      })

      if (typeId === null) {
        console.warn('Tipo usuario not found with tipoUsuario: ', tipoSesion)
      }

      return typeId
    },
    descripcion: {
      get() {
        return this.$store.state.actas.acta.descripcion
      },
      set(value) {
        const data = {
          key: 'descripcion',
          value,
        }
        this.addActaData(data)
      },
    },
    decanato: {
      get() {
        return this.$store.state.actas.acta.decanato
      },
      set(value) {
        const data = {
          key: 'decanato',
          value,
        }
        this.addActaData(data)
      },
    },
  },
  methods: {
    // ...mapActions('decanatos', ['fetchDecanato', 'addDecanatoData']),
    ...mapActions('actas', ['fetchActa', 'addActaData', 'saveActa']),

    async submit() {
      // this.$refs.obs.validate()
      this.saveActa({
        codigo: this.id,
        tipo: this.tipo,
        descripcion: this.descripcion,
        decanato: this.decanato,
        estatus: 'A',
      })
    },

    getNameById(tipo) {
      return this.items.find((i) => i.id === tipo)?.name
    },
  },

  props: ['id'],
  async mounted() {
    console.log(this.id)
    // await this.fetchDecanato(this.id)
    await this.fetchActa(this.id)
  },
}
</script>

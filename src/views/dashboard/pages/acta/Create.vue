<template>
  <v-container id="user-profile" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <base-material-card icon="mdi-account-outline" color="primary">
          <template v-slot:after-heading>
            <div class="font-weight-light card-title mt-2">
              Actas
              <span class="body-1">— Registro de Actas</span>
            </div>
          </template>
          <ValidationObserver ref="observer" v-slot="{ invalid }">
            <v-form @submit.prevent="submit()">
              <v-container class="py-0">
                <v-row>
                  <v-col cols="12" md="6">
                    <VSelectWithValidation
                      v-model="form.tipo"
                      :items="items"
                      item-text="name"
                      item-value="id"
                      label="Tipo de Sesion"
                      rules="required"
                      dense
                      prepend-icon="mdi-account-group"
                    />
                  </v-col>
                  <v-col cols="12" md="6">
                    <select v-model="form.decanato">
                      <option
                        v-for="decanato in decanatos"
                        :key="decanato.codigo"
                        :value="decanato"
                      >
                        {{ decanato.nombre }}
                      </option>
                    </select>
                  </v-col>
                  <v-col cols="12" md="6">
                    <select v-model="form.estado">
                      <option
                        v-for="estado in estados"
                        :key="estado.codigo"
                        :value="estado"
                      >
                        {{ estado.nombre }}
                      </option>
                    </select>
                  </v-col>
                  <v-col cols="12">
                    <VTextFieldWithValidation
                      label="Descripcion"
                      color="secondary"
                      prepend-icon="mdi-home"
                      v-model="form.descripcion"
                      rules="required"
                      class="purple-input"
                    />
                  </v-col>

                  <v-file-input
                    v-model="form.pdf"
                    label="Subir acta"
                    multiple
                    type="file"
                    id="file"
                    ref="file"
                  ></v-file-input>

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
import axios from 'axios'
import Cookies from 'js-cookie'
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
      form: {
        tipo: null,
        descripcion: null,
        decanato: 1,
        estado: 1,
        fecha: today,
        estatus: 'A',
        ult_actializacion: today,
        pdf: [],
      },
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
    ...mapGetters('estados', ['estados']),
  },
  mounted() {
    this.fetchActiveDecanatos()
    this.fetchActiveEstados()
  },
  methods: {
    ...mapActions('decanatos', ['fetchActiveDecanatos']),
    ...mapActions('estados', ['fetchActiveEstados']),
    ...mapActions('actas', ['createActa']),
    async submit() {
      const user = JSON.parse(localStorage.getItem('user'))
      const header = {
        Authorization: 'Bearer ' + user.accessToken,
        'Content-Type': 'multipart/form-data',
        'X-CSRFToken': Cookies.get('csrftoken'),
      }
      console.log(this.form)
      let formData = new FormData()
      formData.append('file', this.form.pdf[0])
      console.log(formData)
      axios
        .post('/api/pdf/uploadFile/', formData, {
          headers: header,
        })
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
      await this.createActa({
        tipo: this.form.tipo,
        descripcion: this.form.descripcion,
        decanato: this.form.decanato,
        estado: this.form.estado,
        fecha: this.form.fecha,
        estatus: this.form.estatus,
        ult_actializacion: this.form.ult_actializacion,
      })
    },
  },
}
</script>

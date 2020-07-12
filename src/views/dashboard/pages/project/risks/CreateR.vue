<template>
  <v-container id="user-profile" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <base-material-card icon="mdi-account-outline" color="primary">
          <template v-slot:after-heading>
            <div class="font-weight-light card-title mt-2">
              Riesgos
              <span class="body-1">— Registro de Riesgos</span>
            </div>
          </template>
          <ValidationObserver ref="obs">
            <v-form>
              <v-container class="py-0">
                <v-row>
                  <v-col cols="12" md="4">
                    <v-select
                      color="secondary"
                      item-color="secondary"
                      label="Prioridad del Riesgo"
                      :items="type"
                      item-text="name"
                      item-value="id"
                      v-model="inputs.prioridad"
                    >
                      <template v-slot:item="{ attrs, item, on }">
                        <v-list-item
                          v-bind="attrs"
                          active-class="secondary elevation-4 white--text"
                          class="mx-3 mb-3 v-sheet"
                          elevation="0"
                          v-on="on"
                        >
                          <v-list-item-content>
                            <v-list-item-title v-text="item.name" />
                          </v-list-item-content>
                        </v-list-item>
                      </template>
                    </v-select>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-select
                      color="secondary"
                      item-color="secondary"
                      label="Probabilidad de Ocurrencia"
                      :items="type2"
                      item-text="name"
                      item-value="id"
                      v-model="inputs.probabilidadOcurrencia"
                    >
                      <template v-slot:item="{ attrs, item, on }">
                        <v-list-item
                          v-bind="attrs"
                          active-class="secondary elevation-4 white--text"
                          class="mx-3 mb-3 v-sheet"
                          elevation="0"
                          v-on="on"
                        >
                          <v-list-item-content>
                            <v-list-item-title v-text="item.name" />
                          </v-list-item-content>
                        </v-list-item>
                      </template>
                    </v-select>
                  </v-col>
                  <v-col cols="12" md="4">
                    <VTextFieldWithValidation
                      label="Magnitudad del Riesgo"
                      color="secondary"
                      prepend-icon="mdi-account"
                      v-model="inputs.magnitudRiesgo"
                      rules="required"
                      class="purple-input"
                      type="number"
                    />
                  </v-col>
                  <v-col cols="12" class="text-right">
                    <v-row>
                      <v-textarea
                        outlined
                        autoGrow
                        filled
                        name="Descripcion"
                        label="Descripción del Riesgo"
                      ></v-textarea>
                    </v-row>
                  </v-col>
                  <v-col cols="12" class="text-right">
                    <v-row>
                      <v-textarea
                        outlined
                        autoGrow
                        filled
                        name="Description"
                        label="Plan de Mitigacion "
                      ></v-textarea>
                    </v-row>
                  </v-col>
                  <v-col cols="12" class="text-right">
                    <v-row>
                      <v-textarea
                        outlined
                        autoGrow
                        filled
                        name="Description"
                        label="Plan de Contigencia"
                      ></v-textarea>
                    </v-row>
                  </v-col>
                  <v-col cols="12" class="text-right">
                    <v-row>
                      <v-textarea
                        outlined
                        autoGrow
                        filled
                        name="Description"
                        label="Evolucion"
                      ></v-textarea>
                    </v-row>
                  </v-col>
                  <v-col cols="12">
                    <VTextFieldWithValidation
                      label="Estimacion del Riesgo"
                      color="secondary"
                      prepend-icon="mdi-phone"
                      v-model="inputs.estimacionRiesgo"
                      rules="required"
                      class="purple-input"
                    />
                  </v-col>

                  <v-col cols="12" class="text-right">
                    <v-btn
                      color="purple"
                      class="ml-0"
                      :to="{ name: 'RiskList' }"
                    >
                      {{ registrationCompleted }}
                    </v-btn>
                    <v-btn
                      color="purple"
                      class="mr-0"
                      @click.stop.prevent="submit"
                      @click="createUser(inputs)"
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
import { mapActions, mapState } from 'vuex'

export default {
  data() {
    return {
      show: false,
      show2: false,
      type: [
        { name: 'Alta', id: '1' },
        { name: 'Media', id: '2' },
        { name: 'Baja', id: '3' },
      ],
      inputs: {
        prioridad: '',
        probabilidadOcurrencia: '',
        magnitudRiesgo: '',
        descripcion: '',
        planMitigacion: '',
        planContigencia: '',
        evolucion: '',
        estimacionRiesgo: '',
      },
      type2: [
        { name: 'Muy probable', id: '1' },
        { name: 'Bastante Probable', id: '2' },
        { name: 'Probable', id: '4' },
        { name: 'Improbable', id: '5' },
        { name: 'Muy Improbable', id: '6' },
      ],
    }
  },
  components: {
    ValidationObserver,
    VTextFieldWithValidation,
  },
  computed: {
    /*test() {
      return this.$store.state.registrationCompleted
    },*/
    ...mapState('signup', [
      'registrationCompleted',
      'registrationError',
      'registrationLoading',
    ]),
  },
  methods: {
    submit() {
      this.$refs.obs.validate()
      /*    if (this.$store.commit('registrationCompleted')) {
        //this.$router.push({ name: 'UserList' })

        alert('test2')
      }*/
      //alert('test3')
      //this.goBack()
      /*this.$refs.obs.validate().then(function (response) {
        if (response.data.success == true) {
          alert('test5')
          //  next('/users')
          this.$router.push({ name: 'UserList' })
        }
      })*/
      // this.$swal('Hello Vue world!!!')
      // alert('test')
      /* this.$refs.obs.validate().then((result) => {
        if (result == true && this.$store.getters.test == true) {
          alert('test5')*/
      //  next('/users')
      // this.$swal('test')
      /*  this.$swal({
            title: 'Yey',
            text: 'Empleado registrado exitosamente',
          })
          this.$router.push({ name: 'UserList' })*/
      //  }
      ///  })
      /*if (this.$store.state.registrationCompleted == true) {
        alert('test')
      }*/
      /* this.$refs.obs.validate().then((result) => {
        if (result == true) {
          self.$store.commit('showLoader')
          axios
            .post('/admin/users', payload)
            .then(function (response) {
              self.$store.commit('showSnackbar', {
                message: response.data.msg,
                color: response.data.success,
              })

              self.$store.commit('hideLoader')

              if (response.data.success === true) {
                // reset
                self.$validator.reset()
                self.goBack()
              }
            })
            .catch(function (error) {
              self.$store.commit('hideLoader')

              if (error.response) {
                self.$store.commit('showSnackbar', {
                  message: error.response.data.message,
                  color: 'error',
                  duration: 3000,
                })
              } else if (error.request) {
                console.log(error.request)
              } else {
                console.log('Error', error.message)
              }
            })
        
      })*/
    },
    ...mapActions('users', ['createUser']),
    beforeRouteLeave(to, from, next) {
      //this.clearRegistrationStatus()
      // this.goBack()
      // this.$swal('Good job!', 'You clicked the button!', 'success')
      // this.$router.push({ name: 'UserList' })
      // alert('test')
      // next(this.goBack())

      /* this.$store.dispatch('auth/initialize').then(() => {
    if (this.$store.getters['auth/isAuthenticated']) {
      next('/')
    } else {
      next()
       
    }
  })*/

      alert('test2')
      if (this.$store.commit('registrationCompleted')) {
        next('/users')
        alert('test')
      } else {
        next()
      }
    },
    goBack(goBackByStep) {
      //(-ve  => go back/ +ve => go forward)
      var step = goBackByStep || -1
      setTimeout(() => {
        this.$router.go(step)
      }, 3000)
    },
  },
}
</script>

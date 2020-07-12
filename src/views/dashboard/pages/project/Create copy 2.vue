<template>
  <v-container id="user-profile" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="10">
        <base-material-card icon="mdi-account-outline">
          <template v-slot:after-heading>
            <div class="font-weight-light card-title mt-2">
              Reunión
              <span class="body-1">— Registro de Reunión</span>
            </div>
          </template>
          <ValidationObserver ref="obs">
            <v-form>
              <v-container class="py-0">
                <v-row>
                  <v-col cols="6" md="6">
                    <VTextFieldWithValidation
                      label="Nombre de la Reunión"
                      color="secondary"
                      prepend-icon="mdi-account"
                      v-model="inputs.nombre"
                      rules="required"
                      class="purple-input"
                    />
                  </v-col>
                  <v-col cols="6" md="6">
                    <VTextFieldWithValidation
                      label="Lugar"
                      color="secondary"
                      prepend-icon="mdi-map-marker-radius"
                      v-model="inputs.lugar"
                      rules="required"
                      class="purple-input"
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6" md="6">
                    <div
                      class="font-weight-light card-title mt-1"
                      text-align="center"
                    >
                      Fecha de la Reunión:
                    </div>
                    <v-row>
                      <v-date-picker
                        v-model="picker"
                        label="Fecha"
                        :landscape="landscape"
                        :allowed-dates="allowedDates"
                        class="mt-1"
                        :min="nowDate"
                      ></v-date-picker>
                    </v-row>
                  </v-col>
                  <v-col cols="6" md="6">
                    <div
                      class="font-weight-light card-title mt-1"
                      text-align="center"
                    >
                      Hora de la Reunión:
                    </div>
                    <v-row>
                      <v-time-picker
                        v-model="picker2"
                        class="mt-1"
                        color="purple darken-2"
                        :landscape="landscape"
                      ></v-time-picker>
                    </v-row>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <base-material-card
                      color="success"
                      icon="mdi-calendar-today"
                    >
                      <template v-slot:after-heading>
                        <div class="display-1 mt-2 font-weight-light">
                          Date Picker
                          <span class="body-1">— close on select</span>
                        </div>
                      </template>

                      <v-menu
                        ref="menu2"
                        v-model="menu3"
                        :close-on-content-click="false"
                        :return-value.sync="date"
                        transition="scale-transition"
                        min-width="290px"
                        offset-y
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="date3"
                            color="secondary"
                            prepend-icon="mdi-calendar-outline"
                            readonly
                            v-on="on"
                          />
                        </template>
                        <v-time-picker
                          v-model="picker2"
                          class="mt-1"
                          color="purple darken-2"
                          :landscape="landscape"
                        >
                          <!--   <v-date-picker
                        v-model="date3"
                          color="secondary"
                          landscape
                          scrollable
                          @input="menu3 = false"
                        >-->
                          <v-spacer />

                          <v-btn color="secondary" large @click="menu3 = false">
                            Cancel
                          </v-btn>
                        </v-time-picker>
                      </v-menu>
                    </base-material-card>
                  </v-col>
                  <v-col cols="12">
                    <v-menu
                      ref="menu2"
                      v-model="menu3"
                      :close-on-content-click="false"
                      :return-value.sync="date"
                      transition="scale-transition"
                      min-width="290px"
                      offset-y
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="date3"
                          color="secondary"
                          prepend-icon="mdi-calendar-outline"
                          readonly
                          v-on="on"
                          label="Fecha de Finalización"
                        />
                      </template>

                      <v-date-picker
                        v-model="date3"
                        color="secondary"
                        landscape
                        scrollable
                        @input="menu3 = false"
                      >
                        <v-spacer />

                        <v-btn color="secondary" large @click="menu3 = false">
                          Cancel
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="12" class="text-right">
                    <v-row>
                      <v-textarea
                        outlined
                        autoGrow
                        filled
                        rules="required"
                        name="Description"
                        label="Descripción de la Reunión"
                      ></v-textarea>
                    </v-row>
                    <v-btn
                      color="success"
                      class="ml-0"
                      :to="{ name: 'MeetingList' }"
                      >{{ registrationCompleted }}</v-btn
                    >
                    <v-btn
                      color="success"
                      class="mr-0"
                      @click.stop.prevent="submit"
                      @click="createMeeting(inputs)"
                      >Registrar</v-btn
                    >
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </ValidationObserver>
        </base-material-card>
      </v-col>
    </v-row>
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
      items: [
        { name: 'administrador', id: '1' },
        { name: 'director', id: '2' },
        { name: 'regular', id: '3' },
      ],
      inputs: {
        email: '',
        nombre: '',
        apellido: '',
        direccion: '',
        telefono: '',
        tipo_usuario: '',
      },
      nowDate: new Date().toISOString().slice(0, 10),
      date: new Date(),
      picker: new Date().toISOString().substr(0, 10),
      landscape: true,
      reactive: false,
      picker2: null,
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

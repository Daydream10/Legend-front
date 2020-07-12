<template>
  <v-container id="user-profile" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <base-material-card icon="mdi-account-outline" color="primary">
          <template v-slot:after-heading>
            <div class="font-weight-light card-title mt-2">
              Empleado
              <span class="body-1">— Registro de Empleado</span>
            </div>
          </template>
          <ValidationObserver ref="obs">
            <v-form>
              <v-container class="py-0">
                <v-row>
                  <v-col cols="12" md="4">
                    <VTextFieldWithValidation
                      label="Correo Electrónico"
                      color="secondary"
                      prepend-icon="mdi-at"
                      v-model="inputs.email"
                      rules="required|email"
                    />
                  </v-col>
                  <v-col cols="12" md="4">
                    <VTextFieldWithValidation
                      label="Nombre"
                      color="secondary"
                      prepend-icon="mdi-account"
                      v-model="inputs.nombre"
                      rules="required"
                      class="purple-input"
                    />
                  </v-col>
                  <v-col cols="12" md="4">
                    <VTextFieldWithValidation
                      label="Apellido"
                      color="secondary"
                      prepend-icon="mdi-account"
                      v-model="inputs.apellido"
                      rules="required"
                      class="purple-input"
                    />
                  </v-col>
                  <v-col cols="12">
                    <VTextFieldWithValidation
                      label="Direccion"
                      color="secondary"
                      prepend-icon="mdi-home"
                      v-model="inputs.direccion"
                      rules="required"
                      class="purple-input"
                    />
                  </v-col>
                  <v-col cols="12" md="6">
                    <VTextFieldWithValidation
                      label="Telefono"
                      color="secondary"
                      prepend-icon="mdi-phone"
                      v-model="inputs.telefono"
                      rules="required"
                      class="purple-input"
                    />
                  </v-col>
                  <v-col cols="12" md="6">
                    <VSelectWithValidation
                      v-model="inputs.tipo_usuario"
                      :items="items"
                      item-text="name"
                      item-value="id"
                      label="Tipo de Usuario"
                      rules="required"
                      dense
                      prepend-icon="mdi-account-group"
                    />
                  </v-col>
                  <!--<span>Selected: {{ inputs.tipo_usuario }}</span>-->

                  <v-col cols="12" class="text-right">
                    <v-btn
                      color="primary"
                      float="right"
                      margin-left="6px"
                      :to="{ name: 'UserList' }"
                    >Usuarios</v-btn>
                    <v-btn
                      color="primary"
                      float="right"
                      margin-left="6px"
                      @click.stop.prevent="submit"
                      @click="createUser(inputs)"
                    >Registrar</v-btn>
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
import VSelectWithValidation from '@/components/inputs/VSelectWithValidation'
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
    }
  },
  components: {
    ValidationObserver,
    VTextFieldWithValidation,
    VSelectWithValidation,
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

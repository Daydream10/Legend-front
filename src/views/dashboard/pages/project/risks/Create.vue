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
                  <v-col cols="12">
                    <v-row>
                      <v-textarea
                        outlined
                        autoGrow
                        filled
                        name="Nombre"
                        label="Nombre del Riesgo"
                      ></v-textarea>
                    </v-row>
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
                      @click="createRisk(inputs)"
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
//import VTextFieldWithValidation from '@/components/inputs/VTextFieldWithValidation'
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      show: false,
      show2: false,
      /* type: [
        { name: 'Alta', id: '1' },
        { name: 'Media', id: '2' },
        { name: 'Baja', id: '3' }, 
      ], */
      inputs: {
        nombre: '',
      },
      /* type2: [
        { name: 'Muy probable', id: '1' },
        { name: 'Bastante Probable', id: '2' },
        { name: 'Probable', id: '4' },
        { name: 'Improbable', id: '5' },
        { name: 'Muy Improbable', id: '6' },
      ], */
    }
  },
  components: {
    ValidationObserver,
  },
  computed: {
    /*test() {
      return this.$store.state.registrationCompleted
    },
    ...mapState('signup', [
      'registrationCompleted',
      'registrationError',
      'registrationLoading',
    ]),*/
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
    ...mapActions('risks', ['createRisk']),
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
        next('/risks')
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

<template>
  <v-container
    id="acta-profile"
    fluid
    tag="section"
  >
    <v-row justify="center">
      <v-col
        cols="12"
        md="8"
      >
        <base-material-card icon="mdi-account-outline">
          <template v-slot:after-heading>
            <div class="font-weight-light card-title mt-2">
              Acta
              <span class="body-1">— Registro de Acta</span>
            </div>
          </template>
          <validation-observer ref="obs">
            <v-form>
              <v-container class="py-0">
                <v-row>
                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-select-with-validation
                      v-model="inputs.tipo_servicio"
                      :items="items"
                      item-text="name"
                      item-value="id"
                      label="Tipo de Servicio"
                      rules="required"
                      dense
                      prepend-icon="mdi-account-group"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    md="4"
                  >
                    <v-text-field-with-validation
                      v-model="inputs.descripcion"
                      label="Descripcion"
                      color="secondary"
                      prepend-icon="mdi-account"
                      rules="required"
                      class="purple-input"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    md="4"
                  >
                    <v-col
                      cols="6"
                      md="6"
                    >
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
                        />
                      </v-row>
                    </v-col>

                    <v-col
                      cols="12"
                      class="text-right"
                    >
                      <v-btn
                        color="success"
                        class="ml-0"
                        :to="{ name: 'ActaList' }"
                      >
                        {{ registrationCompleted }}
                      </v-btn>
                      <v-btn
                        color="success"
                        class="mr-0"
                        @click.stop.prevent="submit"
                        @click="createActa(inputs)"
                      >
                        Registrar
                      </v-btn>
                    </v-col>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </validation-observer>
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
    components: {
      ValidationObserver,
      VTextFieldWithValidation,
      VSelectWithValidation,
    },
    data () {
      return {
        show: false,
        show2: false,
        items: [
          { name: 'Ordinario', id: '1' },
          { name: 'Extraordinario', id: '2' },
        ],
        inputs: {
          tipoServicio: '',
          descripcion: '',
          fecha: '',
        },
      }
    },
    computed: {
      ...mapState('signup', [
        'registrationCompleted',
        'registrationError',
        'registrationLoading',
      ]),
    },
    methods: {
      submit () {
        this.$refs.obs.validate()
      },
      ...mapActions('acta', ['createActa']),
      beforeRouteLeave (to, from, next) {
        alert('test2')
        if (this.$store.commit('registrationCompleted')) {
          next('/acta')
          alert('test')
        } else {
          next()
        }
      },
      goBack (goBackByStep) {
        // (-ve  => go back/ +ve => go forward)
        var step = goBackByStep || -1
        setTimeout(() => {
          this.$router.go(step)
        }, 3000)
      },
    },
  }
</script>

<template>
  <v-container id="user-profile" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="10">
        <base-material-card icon="mdi-account-multiple" color="primary">
          <template v-slot:after-heading>
            <div class="font-weight-light card-title mt-2">
              Reunión
              <span class="body-1">— Registro de Reunión</span>
            </div>
          </template>
          <ValidationObserver ref="odescbs">
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
                  <v-col cols="5" md="6">
                    <base-material-card
                      color="secondary"
                      icon="mdi-calendar-today"
                    >
                      <template v-slot:after-heading>
                        <div class="display-1 mt-2 font-weight-light">
                          Fecha de la Reunión
                        </div>
                      </template>

                      <v-menu
                        ref="menu3"
                        v-model="menu3"
                        :close-on-content-click="false"
                        :return-value.sync="date"
                        transition="scale-transition"
                        min-width="290px"
                        offset-y
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="inputs.fecha"
                            color="secondary"
                            prepend-icon="mdi-calendar-outline"
                            readonly
                            v-on="on"
                          />
                        </template>

                        <v-date-picker
                          v-model="inputs.fecha"
                          color="primary"
                          landscape
                          :min="nowDate"
                          scrollable
                          rules="required"
                          @input="menu3 = false"
                        >
                          <v-spacer />
                        </v-date-picker>
                      </v-menu>
                    </base-material-card>
                  </v-col>
                  <v-col cols="5" md="6">
                    <base-material-card color="secondary" icon="mdi-clock">
                      <template v-slot:after-heading>
                        <div class="display-1 mt-2 font-weight-light">
                          Hora de la Reunión
                        </div>
                      </template>

                      <v-menu
                        ref="menu4"
                        v-model="menu4"
                        :close-on-content-click="false"
                        :return-value.sync="time"
                        transition="scale-transition"
                        min-width="290px"
                        offset-y
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="inputs.hora"
                            color="secondary"
                            prepend-icon="mdi-clock"
                            readonly
                            v-on="on"
                          />
                        </template>
                        <v-time-picker
                          v-model="inputs.hora"
                          class="mt-1"
                          color="primary"
                          landscape
                          rules="required"
                          scrollable
                          @input="menu4 = false"
                        ></v-time-picker>
                      </v-menu>
                    </base-material-card>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" class="text-right">
                    <v-row>
                      <v-textarea
                        outlined
                        autoGrow
                        filled
                        name="Description"
                        label="Descripción de la Reunión"
                        v-model="inputs.descripcion"
                      ></v-textarea>
                    </v-row>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" class="text-right">
                    <v-btn
                      color="primary"
                      float="right"
                      margin-left="6px"
                      :to="{ name: 'MeetingList' }"
                      >Atrás</v-btn
                    >
                    <v-btn
                      color="primary"
                      float="right"
                      margin-left="6px"
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
    <ErrorMessage />
    <SuccessMessage />
  </v-container>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import VTextFieldWithValidation from '@/components/inputs/VTextFieldWithValidation'
import { mapActions } from 'vuex'

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
        nombre: '',
        lugar: '',
        fecha: null,
        hora: null,
        descripcion: '',
        estado: 'A',
        projectId: this.$route.params.id_project,
      },
      nowDate: new Date().toISOString().slice(0, 10),
      picker: new Date().toISOString().substr(0, 10),
      landscape: true,
      reactive: false,
      time: '',
      time2: '',
      menu2: false,
      menu3: false,
      menu4: false,
      date: '',
      date2: '',
      date3: '',
    }
  },
  components: {
    ValidationObserver,
    VTextFieldWithValidation,
  },
  created() {
    this.projectId = this.$route.params.id
  },
  computed: {},
  methods: {
    submit() {
      //  this.$refs.obs.validate()
    },
    ...mapActions('meetings', ['createMeeting']),
  },
}
</script>

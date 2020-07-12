<template>
  <v-container id="user-profile" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <base-material-card icon="mdi-rocket" color="pink darken-1">
          <template v-slot:after-heading>
            <div class="font-weight-light card-title mt-2">
              Proyecto
              <span class="body-1">— Modificar Proyecto</span>
            </div>
          </template>
          <ValidationObserver ref="obs">
            <v-form>
              <v-container class="py-0">
                <v-row>
                  <v-col cols="6" md="6">
                    <VTextFieldWithValidation
                      label="Nombre"
                      color="secondary"
                      prepend-icon="mdi-account"
                      v-model="name"
                      rules="required"
                      class="purple-input"
                    />
                  </v-col>
                  <v-col cols="12" md="6">
                    <VSelectWithValidation
                      v-model="type"
                      :items="types"
                      item-text="name"
                      item-value="id"
                      label="Tipo de proyecto"
                      rules="required"
                      dense
                      prepend-icon="mdi-account-group"
                    />
                  </v-col>
                  <v-col cols="6" md="6">
                    <VTextFieldWithValidation
                      label="Presupuesto"
                      color="secondary"
                      prepend-icon="mdi-map-marker-radius"
                      v-model="presupuesto"
                      class="purple-input"
                      type="number"
                    />
                  </v-col>
                  <v-col cols="6" md="6">
                    <VTextFieldWithValidation
                      label="Costo"
                      color="secondary"
                      prepend-icon="mdi-map-marker-radius"
                      v-model="costo"
                      class="purple-input"
                      type="number"
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="5" md="6">
                    <base-material-card
                      color="purple darken-1"
                      icon="mdi-calendar-today"
                    >
                      <template v-slot:after-heading>
                        <div class="display-1 mt-2 font-weight-light">
                          Fecha de Inico
                        </div>
                      </template>

                      <v-menu
                        ref="menu3"
                        v-model="menu3"
                        :close-on-content-click="false"
                        :return-value.sync="time3"
                        transition="scale-transition"
                        min-width="290px"
                        offset-y
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="dateCreated"
                            color="secondary"
                            prepend-icon="mdi-calendar-outline"
                            readonly
                            v-on="on"
                          />
                        </template>

                        <v-date-picker
                          v-model="dateCreated"
                          color="pink darken-1"
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
                    <base-material-card
                      color="purple darken-1"
                      icon="mdi-calendar-today"
                    >
                      <template v-slot:after-heading>
                        <div class="display-1 mt-2 font-weight-light">
                          Fecha de Finalización
                        </div>
                      </template>

                      <v-menu
                        ref="menu4"
                        v-model="menu4"
                        :close-on-content-click="false"
                        :return-value.sync="time2"
                        transition="scale-transition"
                        min-width="290px"
                        offset-y
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="dateFinished"
                            color="secondary"
                            prepend-icon="mdi-calendar-outline"
                            readonly
                            v-on="on"
                          />
                        </template>

                        <v-date-picker
                          v-model="dateFinished"
                          color="pink darken-1"
                          landscape
                          :min="nowDate"
                          scrollable
                          rules="required"
                          @input="menu4 = false"
                        >
                          <v-spacer />
                        </v-date-picker>
                      </v-menu>
                    </base-material-card>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" class="text-right">
                    <v-row>
                      <v-textarea
                        v-model="description"
                        outlined
                        autoGrow
                        filled
                        required
                        name="Description"
                        label="Descripción del proyecto"
                      ></v-textarea>
                    </v-row>
                    <v-row>
                      <v-textarea
                        v-model="alcance"
                        outlined
                        autoGrow
                        filled
                        name="Alcance"
                        label="Alcance proyecto"
                      ></v-textarea>
                    </v-row>
                    <v-col cols="12" class="text-right">
                      <v-btn
                        color="pink darken-1"
                        class="ml-0"
                        :to="{ name: 'ProjectList' }"
                        >Proyectos</v-btn
                      >
                      <v-btn
                        color="pink darken-1"
                        class="ml-0"
                        :to="{ name: 'ProjectDash' }"
                        >Proyectos</v-btn
                      >
                      <v-btn
                        color="pink darken-1"
                        class="mr-0"
                        type="submit"
                        @click.stop.prevent="submit"
                        >Modificar</v-btn
                      >
                    </v-col>
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
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      types: [
        { name: 'Producto', id: 'P' },
        { name: 'Servicio', id: 'S' },
      ],
      nowDate: new Date().toISOString().slice(0, 10),
      nowDate2: new Date().toISOString().slice(0, 10),
      picker: new Date().toISOString().substr(0, 10),
      landscape: true,
      reactive: false,
      time2: '',
      time3: '',
      menu2: false,
      menu3: false,
      menu4: false,
      date2: '',
      date3: '',
    }
  },
  components: {
    ValidationObserver,
    VTextFieldWithValidation,
    VSelectWithValidation,
  },
  computed: {
    name: {
      get() {
        return this.$store.state.projects.project.nombre
      },
      set(value) {
        const data = {
          key: 'name',
          value,
        }
        this.addProjectData(data)
      },
    },
    type: {
      get() {
        return this.$store.state.projects.project.tipo
      },
      set(value) {
        const data = {
          key: 'type',
          value,
        }
        this.addProjectData(data)
      },
    },
    presupuesto: {
      get() {
        return this.$store.state.projects.project.presupuesto
      },
      set(value) {
        const data = {
          key: 'presupuesto',
          value,
        }
        this.addProjectData(data)
      },
    },
    dateCreated: {
      get() {
        return this.$store.state.projects.project.fecha_inicio
      },
      set(value) {
        const data = {
          key: 'dateCreated',
          value,
        }
        this.addProjectData(data)
      },
    },
    dateFinished: {
      get() {
        return this.$store.state.projects.project.fecha_finalizacion
      },
      set(value) {
        const data = {
          key: 'dateFinished',
          value,
        }
        this.addProjectData(data)
      },
    },
    methodology: {
      get() {
        return this.$store.state.projects.project.metodologia
      },
      set(value) {
        const data = {
          key: 'methodology',
          value,
        }
        this.addProjectData(data)
      },
    },
    description: {
      get() {
        return this.$store.state.projects.project.descripcion
      },
      set(value) {
        const data = {
          key: 'description',
          value,
        }
        this.addProjectData(data)
      },
    },
    alcance: {
      get() {
        return this.$store.state.projects.project.alcance
      },
      set(value) {
        const data = {
          key: 'alcance',
          value,
        }
        this.addProjectData(data)
      },
    },
    costo: {
      get() {
        return this.$store.state.projects.project.costo
      },
      set(value) {
        const data = {
          key: 'costo',
          value,
        }
        this.addProjectData(data)
      },
    },
    state: {
      get() {
        return this.$store.state.projects.project.estado
      },
      set(value) {
        const data = {
          key: 'state',
          value,
        }
        this.addProjectData(data)
      },
    },
  },
  methods: {
    ...mapActions('projects', [
      'fetchProject',
      'addProjectData',
      'saveProject',
    ]),
    async submit() {
      let fechaInicio = new Date(this.dateCreated).getTime()
      let fechaFinal = new Date(this.dateFinished).getTime()
      let diff = fechaFinal - fechaInicio
      let dias = diff / (1000 * 60 * 60 * 24)
      console.log(dias)
      await this.saveProject({
        nombre: this.name,
        descripcion: this.description,
        fecha_inicio: this.dateCreated,
        fecha_finalizacion: this.dateFinished,
        tipo: this.type,
        metodologia: this.methodology,
        alcance: this.alcance,
        costo: this.costo,
        presupuesto: this.presupuesto,
        estado: this.state,
        tiempo: dias,
        id: this.id_project,
      })
    },
    //  ...mapMutations('users', ['SHOW_LOADING', 'ERROR']),
  },
  props: ['id_project'],
  async mounted() {
    await this.fetchProject(this.id_project)
  },
}
</script>

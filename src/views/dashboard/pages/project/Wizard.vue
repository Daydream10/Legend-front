<template>
  <v-container id="wizard" tag="section">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <ValidationObserver ref="obs">
          <base-material-wizard
            v-model="tab"
            :available-steps="availableSteps"
            :items="tabs"
            color="secondary"
            class="mx-auto"
            @click:next="next()"
            @click:prev="tab--"
          >
            <v-tab-item class="pb-12">
              <form>
                <v-row justify="center">
                  <div class="text-center display-1 font-weight-light mb-6">
                    ¡Empecemos con información básica!
                  </div>
                  <v-tooltip right>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon color="primary" dark v-bind="attrs" v-on="on"
                        >mdi mdi-information-outline</v-icon
                      >
                    </template>
                    <span>
                      Una vez creado el proyecto podrás estimar sus costos y
                      tiempos detalladamente desde su vista de Inicio.
                    </span>
                  </v-tooltip>
                </v-row>

                <v-container class="py-0">
                  <v-row>
                    <v-col cols="12" md="4">
                      <VTextFieldWithValidation
                        label="Nombre del Proyecto"
                        color="secondary"
                        prepend-icon="mdi-at"
                        v-model="inputs.nombre"
                        rules="required"
                        validate-on-blur
                      />
                    </v-col>

                    <v-col cols="12" md="4">
                      <v-select
                        color="secondary"
                        item-color="secondary"
                        label="Tipo de Proyecto"
                        :items="type"
                        item-text="name"
                        item-value="id"
                        v-model="inputs.tipo"
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
                        label="Presupuesto Asignado"
                        color="secondary"
                        prepend-icon="mdi mdi-chart-line"
                        v-model="inputs.presupuesto"
                        type="number"
                        validate-on-blur
                        min="0"
                      />
                    </v-col>
                    <v-col cols="12" md="4">
                      <VTextFieldWithValidation
                        label="Costo del Proyecto"
                        color="secondary"
                        prepend-icon="mdi mdi-currency-usd"
                        v-model="inputs.costo"
                        type="number"
                        validate-on-blur
                        min="0"
                      />
                    </v-col>
                    <v-row
                      class="mx-auto"
                      justify="space-around"
                      style="max-width: 500px;"
                    >
                      <v-col cols="12" md="4">
                        <v-menu
                          ref="menu"
                          v-model="menu"
                          :close-on-content-click="false"
                          :return-value.sync="date"
                          transition="scale-transition"
                          min-width="290px"
                          offset-y
                        >
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              v-model="inputs.fecha_inicio"
                              color="secondary"
                              label="Fecha de Inicio"
                              prepend-icon="mdi-calendar-outline"
                              readonly
                              v-on="on"
                            />
                          </template>

                          <v-date-picker
                            v-model="inputs.fecha_inicio"
                            color="secondary"
                            landscape
                            :min="nowDate"
                            scrollable
                            @input="menu = false"
                          >
                            <v-spacer />
                            <v-btn color="secondary" large @click="menu = false"
                              >Cancelar</v-btn
                            >
                          </v-date-picker>
                        </v-menu>
                      </v-col>

                      <v-col cols="12" md="4">
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
                              v-model="inputs.fecha_finalizacion"
                              color="secondary"
                              prepend-icon="mdi-calendar-outline"
                              readonly
                              v-on="on"
                              label="Fecha de Finalización"
                            />
                          </template>

                          <v-date-picker
                            v-model="inputs.fecha_finalizacion"
                            color="secondary"
                            landscape
                            scrollable
                            :min="inputs.fecha_inicio"
                            @input="menu3 = false"
                          >
                            <v-spacer />

                            <v-btn
                              color="secondary"
                              large
                              @click="menu3 = false"
                              >Cancelar</v-btn
                            >
                          </v-date-picker>
                        </v-menu>
                      </v-col>
                    </v-row>
                    <v-col cols="12">
                      <v-textarea
                        name="input-7-1"
                        label="Descripción"
                        hint="¿En qué consiste el proyecto?"
                        v-model="inputs.descripcion"
                      />
                    </v-col>
                  </v-row>
                </v-container>
              </form>
            </v-tab-item>

            <v-tab-item class="pb-12">
              <form>
                <v-responsive class="mx-auto" max-width="500">
                  <div class="text-center display-1 font-weight-light mb-6">
                    ¡Perfecto! Ahora solo necesitamos que respondas:
                  </div>

                  <validation-provider rules="required" name="type">
                    <input :value="stringAccount" type="hidden" />
                  </validation-provider>

                  <v-row
                    class="mx-auto"
                    justify="space-around"
                    style="max-width: 500px;"
                  >
                    <v-col cols="12">
                      <div class="text-left">
                        ¿Cuántas personas formarán parte del proyecto?
                      </div>
                      <v-select
                        color="secondary"
                        item-color="secondary"
                        label="Tamaño"
                        :items="tamano"
                        item-text="name"
                        item-value="id"
                        v-model="inputs2.tamano"
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
                      <div class="text-left">
                        ¿Cuál sería el impacto ante una falla o defecto en el
                        proyecto?
                      </div>
                      <v-select
                        color="secondary"
                        item-color="secondary"
                        label="Criticidad"
                        :items="criticidad"
                        item-text="name"
                        item-value="id"
                        v-model="inputs2.criticidad"
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
                      <div class="text-left">
                        ¿Cómo crees que serán los cambios en los requerimientos
                        del proyecto en su desarrollo?
                      </div>
                      <v-select
                        color="secondary"
                        item-color="secondary"
                        label="Dinamismo"
                        :items="dinamismo"
                        item-text="name"
                        item-value="id"
                        v-model="inputs2.dinamismo"
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
                      <div class="text-left">
                        ¿Cómo es la experiencia del personal ante los
                        requerimientos?
                      </div>
                      <v-select
                        color="secondary"
                        item-color="secondary"
                        label="Personal"
                        :items="personal"
                        item-text="name"
                        item-value="id"
                        v-model="inputs2.personal"
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
                      <div class="text-left">
                        ¿Cómo definirías la cultura de la organización
                        actualmente?
                      </div>
                      <v-select
                        color="secondary"
                        item-color="secondary"
                        label="Cultura"
                        :items="cultura"
                        item-text="name"
                        item-value="id"
                        v-model="inputs2.cultura"
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
                  </v-row>
                </v-responsive>
              </form>
            </v-tab-item>

            <v-tab-item class="pb-12">
              <form>
                <v-responsive class="mx-auto" max-width="500">
                  <div
                    class="text-center display-1 grey--text font-weight-light mb-6"
                  >
                    En base a los criterios de Tamaño, Criticidad, Dinamismo,
                    Personal y Cultura, te recomendamos elegir la :
                  </div>
                  <v-row class="mx-auto" justify="center" align="center">
                    <v-card dark color="primary">
                      <v-card-title
                        class="mx-auto"
                        v-text="' Metodología ' + resultado + ''"
                      ></v-card-title>
                    </v-card>
                  </v-row>
                  <ValidationObserver rules="required" name="type">
                    <input :value="stringAccount" type="hidden" />
                  </ValidationObserver>
                  <v-row
                    class="mx-auto"
                    justify="space-around"
                    style="max-width: 500px;"
                  >
                    <v-col cols="12">
                      <div
                        class="text-center display-1 grey--text font-weight-light mb-3"
                      >
                        (Puedes cambiar la metodología si no estás de acuerdo)
                      </div>
                      <div class="text-center">
                        Selecciona la Metodología del Proyecto:
                      </div>

                      <v-select
                        color="secondary"
                        item-color="secondary"
                        label="Metodologia"
                        :items="type2"
                        item-text="name"
                        item-value="id"
                        v-model="inputs.metodologia"
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
                  </v-row>
                  <v-dialog v-model="dialog2" max-width="500">
                    <v-card class="text-center">
                      <v-card-title>
                        Mensaje:
                        <v-spacer />

                        <v-icon aria-label="Close" @click="dialog2 = false"
                          >mdi-close</v-icon
                        >
                      </v-card-title>

                      <v-card-text>
                        EL Proyecto se ha creado con éxito, puedes añadir los
                        procesos que desees en la opción "Procesos" de tu
                        espacio de trabajo.
                      </v-card-text>

                      <v-card-actions>
                        <v-spacer />

                        <v-btn color="error" text @click="go">Cerrar</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-responsive>
              </form>
            </v-tab-item>
          </base-material-wizard>
        </ValidationObserver>
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
//import VSelectWithValidation from '@/components/inputs/VSelectWithValidation'

export default {
  name: 'DashboardFormsWizard',

  data() {
    return {
      resultado: '',
      show: false,
      show2: false,
      items: [
        { name: 'administrador', id: '1' },
        { name: 'director', id: '2' },
        { name: 'regular', id: '3' },
      ],
      inputs: {
        nombre: '',
        descripcion: '',
        fecha_inicio: '',
        fecha_finalizacion: '',
        tipo: '',
        metodologia: '',

        costo: null,
        presupuesto: null,
        estado: 'A',
      },
      inputs2: {
        tamano: '',
        criticidad: '',
        dinamismo: '',
        personal: '',
        cultura: '',
      },
      account: [],
      accounts: [
        {
          icon: 'mdi-pencil',
          type: 'design',
        },
        {
          icon: 'mdi-code-tags',
          type: 'code',
        },
        {
          icon: 'mdi-laptop',
          type: 'develop',
        },
      ],
      address: '',
      city: '',
      email: '',
      first: '',
      image: null,
      last: '',
      state: '',

      tamano: [
        { name: 'Entre 1 y 5', id: '1' },
        { name: 'Entre 6 y 10', id: '2' },
        { name: 'Entre 10 y 25', id: '3' },
        { name: 'Entre 25 y 45', id: '4' },
        { name: 'Más de 45', id: '5' },
      ],
      criticidad: [
        { name: 'Nulo', id: '1' },
        { name: 'Bajo', id: '2' },
        { name: 'Medio', id: '3' },
        { name: 'Alto', id: '4' },
        { name: 'Muy alto', id: '5' },
      ],
      dinamismo: [
        { name: 'Cambios demasiado constantes', id: '1' },
        { name: 'Muchos cambios', id: '2' },
        { name: 'Algunos cambios', id: '3' },
        { name: 'Pocos cambios', id: '4' },
        { name: 'Casi ningún cambio', id: '5' },
      ],
      personal: [
        {
          name: 'Todo el personal tiene altos niveles de experiencia',
          id: '1',
        },
        {
          name:
            'La mayor parte de empleados tiene altos niveles de experiencia',
          id: '2',
        },
        { name: 'Algunos tienen un alto nivel de experiencia', id: '3' },
        { name: 'Pocos tienen un alto nivel de experiencia', id: '4' },
        { name: 'Muy pocos tienen alto nivel de experiencia', id: '5' },
      ],
      cultura: [
        { name: 'Cultura autónoma', id: '1' },
        { name: 'Cultura parcialmente autónoma', id: '2' },
        {
          name:
            'Cultura parcialmente jerarquizada, pero con bastante autonomía en los niveles de jerarquización',
          id: '3',
        },
        { name: 'Cultura parcialmente jerarquizada', id: '4' },
        {
          name:
            'Cultura completamente jerarquizada y roles estrictamente delimitados',
          id: '5',
        },
      ],
      street: '',
      tab: 0,
      tabs: ['Info', 'Metodología', 'Resultado'],
      type: [
        { name: 'Producto', id: 'P' },
        { name: 'Servicio', id: 'S' },
      ],
      type2: [
        { name: 'Ágil', id: '1' },
        { name: 'Híbrida', id: '2' },
        { name: 'Tradicional', id: '3' },
      ],
      nowDate: new Date().toISOString().slice(0, 10),
      date: '',
      date2: '',
      date3: '',
      files: [],
      menu: false,
      menu2: false,
      menu3: false,
      min: -50,
      max: 90,
      slider: 40,
      slider2: [30, 70],
      range: [-20, 70],

      dialog2: false,
    }
  },
  components: {
    ValidationObserver,
    VTextFieldWithValidation,
  },
  computed: {
    stringAccount() {
      return this.account.join(',')
    },
    scope() {
      if (this.tab === 0) return 'about'
      else if (this.tab === 2) return 'address'
      return 'account'
    },
    availableSteps() {
      const steps = [0]

      if (
        this.inputs.nombre &&
        this.inputs.tipo &&
        this.inputs.fecha_inicio &&
        this.inputs.fecha_finalizacion &&
        this.inputs.descripcion
      )
        steps.push(1)

      if (
        this.inputs2.tamano &&
        this.inputs2.criticidad &&
        this.inputs2.cultura &&
        this.inputs2.dinamismo &&
        this.inputs2.personal &&
        steps.includes(1)
      )
        steps.push(2)

      if (
        this.address &&
        this.street &&
        this.city &&
        this.state &&
        steps.includes(2)
      )
        steps.push(3)
      return steps
    },
  },

  methods: {
    ...mapActions('projects', ['createProject']),
    go() {
      this.dialog2 = false
      this.$router.push({ name: 'Dashboard' })
    },
    next() {
      //if (!valid) return
      const step = this.availableSteps
      if (this.tab === this.tabs.length - 1) {
        if (this.inputs.metodologia) {
          this.createProject(this.inputs)
          this.dialog2 = true
        }
        /*alert(
          'Tu Proyecto fue creado y se instanciaron en el varios procesos de desarrollo, pulsa aceptar para ir a la ventana inicial del Proyecto para verificarlos'
        )*/
      } else {
        if (this.tab === this.tabs.length - 2) {
          //this.resultado = 'funciona'
          let tamano = this.inputs2.tamano
          let criticidad = this.inputs2.criticidad
          let dinamismo = this.inputs2.dinamismo
          let personal = this.inputs2.personal
          let cultura = this.inputs2.cultura
          let hibrido = 0
          let tradicional = 0
          let Ágil = 0
          console.log(tamano)
          console.log(criticidad)
          console.log(dinamismo)
          console.log(personal)
          console.log(cultura)
          switch (tamano) {
            case '1':
              Ágil++
              break
            case '2':
              Ágil++
              break
            case '3':
              hibrido++
              break
            case '4':
              tradicional++
              break
            case '5':
              tradicional++
              break
          }
          switch (criticidad) {
            case '1':
              Ágil++
              break
            case '2':
              Ágil++
              break
            case '3':
              hibrido++
              break
            case '4':
              tradicional++
              break
            case '5':
              tradicional++
              break
          }
          switch (dinamismo) {
            case '1':
              Ágil++
              break
            case '2':
              Ágil++
              break
            case '3':
              hibrido++
              break
            case '4':
              tradicional++
              break
            case '5':
              tradicional++
              break
          }
          switch (personal) {
            case '1':
              Ágil++
              break
            case '2':
              Ágil++
              break
            case '3':
              hibrido++
              break
            case '4':
              tradicional++
              break
            case '5':
              tradicional++
              break
          }
          switch (cultura) {
            case '1':
              Ágil++
              break
            case '2':
              Ágil++
              break
            case '3':
              hibrido++
              break
            case '4':
              tradicional++
              break
            case '5':
              tradicional++
              break
          }
          console.log(hibrido)
          console.log(tradicional)
          console.log(Ágil)
          if (tradicional >= 3) {
            if (criticidad === '1' && tamano === '1') {
              this.resultado = 'Híbrida'
            } else {
              this.resultado = 'Tradicional'
            }
          }
          if (Ágil >= 3) {
            if (
              (criticidad === '4' || criticidad === '5') &&
              (tamano === '3' || tamano === '4' || tamano === '5')
            ) {
              this.resultado = 'Híbrida'
            } else {
              this.resultado = 'Ágil'
            }
          }
          if (hibrido >= 3) {
            if (criticidad === '5' && tamano === '5') {
              this.resultado = 'Tradicional'
            } else {
              this.resultado = 'Híbrida'
            }
          }
          if (tradicional === 2 && Ágil === 2) {
            if (
              criticidad === '5' &&
              (tamano === '3' || tamano === '4' || tamano === '5')
            ) {
              this.resultado = 'Tradicional'
            } else {
              if (
                (criticidad === '1' || criticidad === '2') &&
                tamano === '1'
              ) {
                this.resultado = 'Ágil'
              } else {
                this.resultado = 'Híbrida'
              }
            }
          }
          if (tradicional === 2 && hibrido === 2) {
            if (
              (criticidad === '4' || criticidad === '5') &&
              (tamano === '3' || tamano === '4' || tamano === '5')
            ) {
              this.resultado = 'Tradicional'
            } else {
              this.resultado = 'Híbrida'
            }
          }
          if (hibrido === 2 && Ágil === 2) {
            if (
              (criticidad === '4' || criticidad === '5') &&
              (tamano === '3' || tamano === '4' || tamano === '5')
            ) {
              this.resultado = 'Híbrida'
            } else {
              if (
                (criticidad === '1' || criticidad === '2') &&
                (tamano === '1' || tamano === '2')
              ) {
                this.resultado = 'Ágil'
              } else {
                this.resultado = 'Híbrida'
              }
            }
          }

          this.tab = step.length - 1
        } else {
          this.tab = step.length - 1
        }
      }
    },
    onChange(val) {
      const value = val.target.files[0]

      if (!value) return (this.image = null)

      this.image = URL.createObjectURL(value)
    },
  },
}
</script>

<style lang="sass">
.v-card.v-card.v-card--account
  border-color: currentColor
  border-width: 4px

  .v-icon
    color: inherit

.v-card--account,
.v-card--account:before
  border-radius: 50%
</style>

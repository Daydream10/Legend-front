<template>
  <v-container id="wizard" tag="section">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <ValidationObserver ref="obs">
          <base-material-risk
            v-model="tab"
            :available-steps="availableSteps"
            :items="tabs"
            color="secondary"
            class="mx-auto"
            @click:next="next(valid)"
            @click:prev="tab--"
          >
            <v-tab-item class="pb-12">
              <form>
                <div class="text-center display-1 font-weight-light mb-6">
                  ¡Empecemos con información básica!
                </div>

                <template>
                  <v-row justify="center">
                    <v-dialog v-model="dialog" scrollable max-width="500px">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn color="primary" dark v-bind="attrs" v-on="on">
                          Lista de Riesgos
                        </v-btn>
                      </template>
                      <v-card>
                        <base-material-card class="px-5 py-3">
                          <template v-slot:heading>
                            <v-tabs
                              v-model="tabs2"
                              background-color="transparent"
                              slider-color="white"
                            >
                              <span
                                class="subheading font-weight-light mx-3"
                                style="align-self: center;"
                                >Categorias:</span
                              >
                              <v-tab class="mr-3">
                                <v-icon class="mr-2">
                                  mdi-bug
                                </v-icon>
                                Bugs
                              </v-tab>
                              <v-tab class="mr-3">
                                <v-icon class="mr-2">
                                  mdi-code-tags
                                </v-icon>
                                Website
                              </v-tab>
                              <v-tab>
                                <v-icon class="mr-2">
                                  mdi-cloud
                                </v-icon>
                                Server
                              </v-tab>
                            </v-tabs>
                          </template>

                          <v-tabs-items v-model="tabs2" class="transparent">
                            <v-tab-item v-for="n in 3" :key="n">
                              <v-card-text>
                                <template v-for="(task, i) in tasks[tabs2]">
                                  <v-row :key="i" align="center">
                                    <v-col cols="1">
                                      <v-list-item-action>
                                        <v-checkbox
                                          v-model="task.value"
                                          color="secondary"
                                        />
                                      </v-list-item-action>
                                    </v-col>

                                    <v-col cols="9">
                                      <div
                                        class="font-weight-light"
                                        v-text="task.text"
                                      />
                                    </v-col>
                                  </v-row>
                                </template>
                              </v-card-text>
                            </v-tab-item>
                          </v-tabs-items>
                        </base-material-card>
                        <v-divider></v-divider>
                        <v-card-actions>
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="dialog = false"
                            >Close</v-btn
                          >
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="dialog = false"
                            >Save</v-btn
                          >
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-row>
                </template>
              </form>
            </v-tab-item>

            <v-tab-item class="pb-12">
              <form>
                <v-responsive class="mx-auto" max-width="500">
                  <div
                    class="text-center display-1 grey--text font-weight-light mb-6"
                  >
                    Analizar Riesgo
                  </div>

                  <ValidationObserver rules="required" name="type">
                    <input :value="stringAccount" type="hidden" />
                  </ValidationObserver>
                  <template>
                    <div>
                      <v-row justify="space-around">
                        <v-icon @click="model--">mdi-minus</v-icon>
                        {{ model }}
                        <v-icon @click="model++">mdi-plus</v-icon>
                      </v-row>
                      <v-carousel :show-arrows="false" v-model="model">
                        <v-carousel-item
                          v-for="(color, i) in colors"
                          :key="color"
                        >
                          <v-sheet :color="color" height="100%" tile>
                            <v-row
                              class="fill-height"
                              align="center"
                              justify="center"
                            >
                              <div class="display-3">Slide {{ i + 1 }}</div>
                              <v-row
                                class="mx-auto"
                                justify="space-around"
                                style="max-width: 500px;"
                              >
                                <v-col cols="12">
                                  <v-select
                                    color="secondary"
                                    item-color="secondary"
                                    label="Probabilidad de Ocurrencia"
                                    :items="type3"
                                    item-text="name"
                                    item-value="id"
                                    v-model="inputs2.probabilidadOcurrencia"
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
                                          <v-list-item-title
                                            v-text="item.name"
                                          />
                                        </v-list-item-content>
                                      </v-list-item>
                                    </template>
                                  </v-select>
                                  <VTextFieldWithValidation
                                    label="Magnitud del Riesgo"
                                    color="secondary"
                                    prepend-icon=""
                                    v-model="inputs2.magnitudRiesgo"
                                    rules="required"
                                    class="purple-input"
                                    type="number"
                                  />
                                  <VTextFieldWithValidation
                                    label="Exposicion del Riesgo"
                                    color="secondary"
                                    prepend-icon=""
                                    v-model="inputs2.exposicionRiesgo"
                                    rules="required"
                                    class="purple-input"
                                    type="number"
                                  />
                                </v-col>
                                <v-btn
                                  color="purple"
                                  class="mr-0"
                                  @click.stop.prevent="submit"
                                  @click="createUser(inputs)"
                                >
                                  Calcular Exposicion Riesgo
                                </v-btn>
                              </v-row>
                            </v-row>
                          </v-sheet>
                        </v-carousel-item>
                      </v-carousel>
                    </div>
                  </template>
                </v-responsive>
              </form>
            </v-tab-item>

            <v-tab-item class="pb-12">
              <form>
                <v-responsive class="mx-auto" max-width="500">
                  <div
                    class="text-center display-1 grey--text font-weight-light mb-6"
                  >
                    Evaluar Riesgo
                  </div>
                  <template>
                    <div>
                      <v-row justify="space-around">
                        <v-icon @click="model--">mdi-minus</v-icon>
                        {{ model }}
                        <v-icon @click="model++">mdi-plus</v-icon>
                      </v-row>
                      <v-carousel :show-arrows="false" v-model="model">
                        <v-carousel-item
                          v-for="(color, i) in colors"
                          :key="color"
                        >
                          <v-sheet :color="color" height="100%" tile>
                            <v-row
                              class="fill-height"
                              align="center"
                              justify="center"
                            >
                              <v-col cols="12" align="center" justify="center">
                                <div class="display-3">Slide {{ i + 1 }}</div>
                              </v-col>
                              <v-row
                                class="mx-auto"
                                justify="space-around"
                                style="max-width: 500px;"
                              >
                                <v-col cols="12">
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
                                          <v-list-item-title
                                            v-text="item.name"
                                          />
                                        </v-list-item-content>
                                      </v-list-item>
                                    </template>
                                  </v-select>
                                </v-col>
                              </v-row>
                            </v-row>
                          </v-sheet>
                        </v-carousel-item>
                      </v-carousel>
                    </div>
                  </template>
                </v-responsive>
              </form>
            </v-tab-item>

            <v-tab-item class="pb-12">
              <form>
                <v-responsive class="mx-auto" max-width="500">
                  <div
                    class="text-center display-1 grey--text font-weight-light mb-6"
                  >
                    Planificar Riesgo
                  </div>
                  <template>
                    <div>
                      <v-row justify="space-around">
                        <v-icon @click="model--">mdi-minus</v-icon>
                        {{ model }}
                        <v-icon @click="model++">mdi-plus</v-icon>
                      </v-row>
                      <v-carousel :show-arrows="false" v-model="model">
                        <v-carousel-item
                          v-for="(color, i) in colors"
                          :key="color"
                        >
                          <v-sheet :color="color" height="100%" tile>
                            <v-row
                              class="fill-height"
                              align="center"
                              justify="center"
                            >
                              <v-col cols="12" align="center" justify="center">
                                <div class="display-3">Slide {{ i + 1 }}</div>

                                <v-row
                                  class="mx-auto"
                                  justify="space-around"
                                  style="max-width: 500px;"
                                >
                                  <v-textarea
                                    outlined
                                    autoGrow
                                    filled
                                    name="Description"
                                    label="Plan de Contigencia"
                                  ></v-textarea>
                                </v-row>
                                <v-row align="center">
                                  <v-textarea
                                    outlined
                                    autoGrow
                                    filled
                                    name="Description"
                                    label="Plan de Mitigacion "
                                  ></v-textarea>
                                </v-row>
                              </v-col>
                              <v-col cols="12" md="6"> </v-col>
                            </v-row>
                          </v-sheet>
                        </v-carousel-item>
                      </v-carousel>
                    </div>
                  </template>
                </v-responsive>
              </form>
            </v-tab-item>
            <v-tab-item class="pb-12">
              <div
                class="text-center display-1 grey--text font-weight-light mb-6"
              >
                Supervisar Riesgo
              </div>

              <template>
                <form>
                  <v-responsive class="mx-auto" max-width="500">
                    <div>
                      <v-row justify="space-around">
                        <v-icon @click="model--">mdi-minus</v-icon>
                        {{ model }}
                        <v-icon @click="model++">mdi-plus</v-icon>
                      </v-row>
                      <v-carousel :show-arrows="false" v-model="model">
                        <v-carousel-item
                          v-for="(color, i) in colors"
                          :key="color"
                        >
                          <v-sheet :color="color" height="100%" tile>
                            <v-row
                              class="fill-height"
                              align="center"
                              justify="center"
                            >
                              <v-col cols="12" align="center" justify="center">
                                <div class="display-3">Slide {{ i + 1 }}</div>
                              </v-col>
                              <v-row
                                class="mx-auto"
                                justify="space-around"
                                style="max-width: 500px;"
                              >
                                <v-col cols="12,">
                                  <v-select
                                    color="secondary"
                                    item-color="secondary"
                                    label="Estado del Riesgo"
                                    :items="type2"
                                    item-text="name"
                                    item-value="id"
                                    v-model="inputs.estado"
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
                                          <v-list-item-title
                                            v-text="item.name"
                                          />
                                        </v-list-item-content>
                                      </v-list-item>
                                    </template>
                                  </v-select>
                                </v-col>
                              </v-row>
                            </v-row>
                          </v-sheet>
                        </v-carousel-item>
                      </v-carousel>
                    </div>
                  </v-responsive>
                </form>
              </template>
            </v-tab-item>
          </base-material-risk>
        </ValidationObserver>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import VTextFieldWithValidation from '@/components/inputs/VTextFieldWithValidation'
//import VSelectWithValidation from '@/components/inputs/VSelectWithValidation'

export default {
  name: 'DashboardFormsRisk',

  data() {
    return {
      show: false,
      show2: false,
      dialogm1: '',
      dialog: false,
      colors: ['purple'],
      model: 0,
      items: [{ Riesgo: 1 }, { Riesgo: 2 }],
      inputs: {},
      inputs2: {
        probabilidadOcurrencia: '',
        magnitudRiesgo: '',
        exposicionRiesgo: '',
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
      street: '',
      tab: 0,
      tabs2: 0,
      tabs: ['Identificar', 'Analizar', 'Evaluar', 'Planificar', 'Supervisar'],
      type: [{ name: 'Alta' }, { name: 'Media' }, { name: 'Baja' }],
      type2: [
        { name: 'Aumento' },
        { name: 'Disminuyo' },
        { name: 'Nuevo Riesgo' },
        { name: 'Desaparacio' },
      ],
      type3: [
        { name: 'Muy Probable', id: '1' },
        { name: 'Bastante Probable', id: '2' },
        { name: 'Probable', id: '3' },
        { name: 'Improbable', id: '4' },
        { name: 'Muy Improbable', id: '5' },
      ],
      date: '',
      date2: '',
      date3: '',
      dropdown: [
        {
          id: 1,
          text: 'Action',
        },
        {
          id: 2,
          text: 'Another Action',
        },
        {
          id: 3,
          text: 'A Third Action',
        },
      ],
      files: [],
      items2: ['Amsterdam', 'Washington', 'Sydney', 'Beijing'],
      menu: false,
      menu2: false,
      menu3: false,
      min: -50,
      max: 90,
      slider: 40,
      slider2: [30, 70],
      range: [-20, 70],
      movies: [
        'Fight Club',
        'Godfather',
        'Godfather II',
        'Godfather III',
        'Goodfellas',
        'Pulp Fiction',
        'Scarface',
      ],
      tasks: {
        0: [
          {
            text:
              'Sign contract for "What are conference organizers afraid of?"',
            value: true,
          },
          {
            text:
              'Lines From Great Russian Literature? Or E-mails From My Boss?',
            value: false,
          },
          {
            text:
              'Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit',
            value: false,
          },
          {
            text: 'Create 4 Invisible User Experiences you Never Knew About',
            value: true,
          },
        ],
        1: [
          {
            text:
              'Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit',
            value: true,
          },
          {
            text:
              'Sign contract for "What are conference organizers afraid of?"',
            value: false,
          },
        ],
        2: [
          {
            text:
              'Lines From Great Russian Literature? Or E-mails From My Boss?',
            value: false,
          },
          {
            text:
              'Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit',
            value: true,
          },
          {
            text:
              'Sign contract for "What are conference organizers afraid of?"',
            value: true,
          },
        ],
      },
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

      steps.push(1)
      steps.push(2)
      steps.push(3)
      steps.push(4)

      return steps
    },
  },

  methods: {
    next(valid) {
      if (!valid) return
      if (this.tab === this.tabs.length - 1) {
        alert('Form finished')
      } else {
        this.tab++
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

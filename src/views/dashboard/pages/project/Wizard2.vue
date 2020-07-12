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
            @click:next="next(valid)"
            @click:prev="tab--"
          >
            <v-tab-item class="pb-12">
              <form>
                <div class="text-center display-1 font-weight-light mb-6">
                  ¡Empecemos con información básica!
                </div>

                <v-container class="py-0">
                  <v-row>
                    <v-col cols="12" md="4">
                      <VTextFieldWithValidation
                        label="Nombre del Proyecto"
                        color="secondary"
                        prepend-icon="mdi-at"
                        v-model="inputs.email"
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
                              <v-list-item-title v-text="item" />
                            </v-list-item-content>
                          </v-list-item>
                        </template>
                      </v-select>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-select
                        color="secondary"
                        item-color="secondary"
                        label="Metodología"
                        :items="type2"
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
                              <v-list-item-title v-text="item" />
                            </v-list-item-content>
                          </v-list-item>
                        </template>
                      </v-select>
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
                              v-model="date"
                              color="secondary"
                              label="Fecha de Inicio"
                              prepend-icon="mdi-calendar-outline"
                              readonly
                              v-on="on"
                            />
                          </template>

                          <v-date-picker
                            v-model="date"
                            color="secondary"
                            landscape
                            scrollable
                          >
                            <v-spacer />
                            <v-btn color="secondary" large @click="menu = false"
                              >Cancelar</v-btn
                            >

                            <v-btn
                              color="secondary"
                              large
                              @click="$refs.menu.save(date)"
                              >OK</v-btn
                            >
                          </v-date-picker>
                        </v-menu>
                      </v-col>

                      <v-col cols="12" md="4">
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
                      />
                    </v-col>
                  </v-row>
                </v-container>
              </form>
            </v-tab-item>

            <v-tab-item class="pb-12">
              <form>
                <v-responsive class="mx-auto" max-width="500">
                  <div
                    class="text-center display-1 grey--text font-weight-light mb-6"
                  >
                    Determinar Metodología
                  </div>

                  <ValidationObserver rules="required" name="type">
                    <input :value="stringAccount" type="hidden" />
                  </ValidationObserver>

                  <v-row
                    class="mx-auto"
                    justify="space-around"
                    style="max-width: 500px;"
                  >
                    <v-col cols="12">
                      <v-select
                        color="secondary"
                        item-color="secondary"
                        label="Tamaño"
                        :items="type"
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
                              <v-list-item-title v-text="item" />
                            </v-list-item-content>
                          </v-list-item>
                        </template>
                      </v-select>
                      <v-select
                        color="secondary"
                        item-color="secondary"
                        label="Criticidad"
                        :items="type"
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
                              <v-list-item-title v-text="item" />
                            </v-list-item-content>
                          </v-list-item>
                        </template>
                      </v-select>
                      <v-select
                        color="secondary"
                        item-color="secondary"
                        label="Dinamismo"
                        :items="type"
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
                              <v-list-item-title v-text="item" />
                            </v-list-item-content>
                          </v-list-item>
                        </template>
                      </v-select>
                      <v-select
                        color="secondary"
                        item-color="secondary"
                        label="Personal"
                        :items="type"
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
                              <v-list-item-title v-text="item" />
                            </v-list-item-content>
                          </v-list-item>
                        </template>
                      </v-select>
                      <v-select
                        color="secondary"
                        item-color="secondary"
                        label="Cultura"
                        :items="type"
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
                              <v-list-item-title v-text="item" />
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
              <div
                class="text-center display-1 grey--text font-weight-light mb-6"
              >
                Are you living in a nice area?
              </div>

              <form>
                <v-row
                  class="mx-auto"
                  justify="space-around"
                  style="max-width: 500px;"
                >
                  <v-col cols="12" md="8">
                    <ValidationObserver
                      v-slot="{ errors }"
                      rules="required"
                      name="address"
                    >
                      <v-text-field
                        v-model="address"
                        :error-messages="errors"
                        color="secondary"
                        label="Street Name*"
                        validate-on-blur
                      />
                    </ValidationObserver>
                  </v-col>

                  <v-col cols="12" md="4">
                    <ValidationObserver
                      v-slot="{ errors }"
                      rules="required"
                      name="street"
                    >
                      <v-text-field
                        v-model="street"
                        :error-messages="errors"
                        color="secondary"
                        label="Street Number*"
                        validate-on-blur
                      />
                    </ValidationObserver>
                  </v-col>

                  <v-col cols="12" md="6">
                    <ValidationObserver
                      v-slot="{ errors }"
                      rules="required"
                      name="city"
                    >
                      <v-text-field
                        v-model="city"
                        :error-messages="errors"
                        color="secondary"
                        label="City*"
                        validate-on-blur
                      />
                    </ValidationObserver>
                  </v-col>

                  <v-col cols="12" md="6">
                    <ValidationObserver
                      v-slot="{ errors }"
                      rules="required"
                      name="state"
                    >
                      <v-autocomplete
                        v-model="state"
                        :autocomplete="Date.now()"
                        :error-messages="errors"
                        :items="states"
                        color="secondary"
                        label="State*"
                        validate-on-blur
                      />
                    </ValidationObserver>
                  </v-col>
                </v-row>
              </form>
            </v-tab-item>
          </base-material-wizard>
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
  name: 'DashboardFormsWizard',

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
      states: [
        'Alabama',
        'Alaska',
        'American Samoa',
        'Arizona',
        'Arkansas',
        'California',
        'Colorado',
        'Connecticut',
        'Delaware',
        'District of Columbia',
        'Federated States of Micronesia',
        'Florida',
        'Georgia',
        'Guam',
        'Hawaii',
        'Idaho',
        'Illinois',
        'Indiana',
        'Iowa',
        'Kansas',
        'Kentucky',
        'Louisiana',
        'Maine',
        'Marshall Islands',
        'Maryland',
        'Massachusetts',
        'Michigan',
        'Minnesota',
        'Mississippi',
        'Missouri',
        'Montana',
        'Nebraska',
        'Nevada',
        'New Hampshire',
        'New Jersey',
        'New Mexico',
        'New York',
        'North Carolina',
        'North Dakota',
        'Northern Mariana Islands',
        'Ohio',
        'Oklahoma',
        'Oregon',
        'Palau',
        'Pennsylvania',
        'Puerto Rico',
        'Rhode Island',
        'South Carolina',
        'South Dakota',
        'Tennessee',
        'Texas',
        'Utah',
        'Vermont',
        'Virgin Island',
        'Virginia',
        'Washington',
        'West Virginia',
        'Wisconsin',
        'Wyoming',
      ],
      street: '',
      tab: 0,
      tabs: ['Info', 'Metodología', 'Otros'],
      type: ['Productos', 'Servicios'],
      type2: ['Ágil', 'Tradicional', 'Híbrida'],
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

      if (this.first && this.last && this.email) steps.push(1)

      if (this.stringAccount && steps.includes(1)) steps.push(2)

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

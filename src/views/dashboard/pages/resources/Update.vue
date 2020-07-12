<template>
  <v-container id="user-profile" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="10">
        <base-material-card icon="mdi mdi-currency-usd" color="primary">
          <template v-slot:after-heading>
            <div class="font-weight-light card-title mt-2">
              Recursos
              <span class="body-1">— Registro de Recursos</span>
            </div>
          </template>
          <ValidationObserver ref="obs">
            <v-form>
              <v-container class="py-0">
                <v-row>
                  <v-col cols="6" md="6">
                    <VTextFieldWithValidation
                      label="Nombre del Recurso"
                      color="secondary"
                      prepend-icon="mdi-account"
                      v-model="name"
                      rules="required"
                      class="purple-input"
                    />
                  </v-col>
                  <v-col cols="6" md="6">
                    <v-select
                      color="secondary"
                      item-color="secondary"
                      label="Tipo de Recurso"
                      :items="type"
                      item-text="name"
                      item-value="id"
                      v-model="tipo"
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
                <v-row>
                  <v-col cols="6" md="6">
                    <v-select
                      color="secondary"
                      item-color="secondary"
                      label="Tipo de Costo"
                      :items="type2"
                      item-text="name"
                      item-value="id"
                      v-model="tipo_costo"
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
                  <v-col cols="6" md="6">
                    <VTextFieldWithValidation
                      label="Costo"
                      color="secondary"
                      prepend-icon="mdi-account"
                      v-model="costo"
                      rules="required"
                      class="purple-input"
                      type="number"
                    />
                  </v-col>
                  <v-col cols="6" md="6">
                    <VTextFieldWithValidation
                      v-if="mostrar"
                      label="Vida Util"
                      color="secondary"
                      prepend-icon="mdi-account"
                      v-model="vida_util"
                      rules="required"
                      class="purple-input"
                      type="number"
                      min="0"
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" class="text-right">
                    <v-btn
                      color="primary"
                      float="right"
                      margin-left="6px"
                      :to="{ name: 'ResourcesList' }"
                      >Atrás</v-btn
                    >
                    <v-btn
                      color="primary"
                      float="right"
                      margin-left="6px"
                      @click="submit"
                      >Guardar</v-btn
                    >
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </ValidationObserver>
        </base-material-card>
        <ErrorMessage />
        <SuccessMessage />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import VTextFieldWithValidation from '@/components/inputs/VTextFieldWithValidation'
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      type: [
        { name: 'Recursos Humanos', id: '1' },
        { name: 'Recursos físicos no depreciables', id: '2' },
        { name: 'Recursos físicos depreciables', id: '3' },
        { name: 'Recursos intangibles', id: '4' },
      ],
      type2: [
        { name: 'Costo Directos', id: '1' },
        { name: 'Costos Indirectos', id: '2' },
        { name: 'Costo Extraordinarios', id: '3' },
      ],
      nowDate: new Date().toISOString().slice(0, 10),
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
  },
  computed: {
    name: {
      get() {
        return this.$store.state.resources.resource.nombre
      },
      set(value) {
        const data = {
          key: 'name',
          value,
        }
        this.addResourceData(data)
      },
    },
    tipo: {
      get() {
        return this.$store.state.resources.resource.tipo
      },
      set(value) {
        const data = {
          key: 'tipo',
          value,
        }
        this.addResourceData(data)
      },
    },
    tipo_costo: {
      get() {
        return this.$store.state.resources.resource.tipo_costo
      },
      set(value) {
        const data = {
          key: 'tipo_costo',
          value,
        }
        this.addResourceData(data)
      },
    },
    costo: {
      get() {
        return this.$store.state.resources.resource.costo
      },
      set(value) {
        const data = {
          key: 'costo',
          value,
        }
        this.addResourceData(data)
      },
    },
    vida_util: {
      get() {
        return this.$store.state.resources.resource.vida_util
      },
      set(value) {
        const data = {
          key: 'vida_util',
          value,
        }
        this.addResourceData(data)
      },
    },
    mostrar() {
      if (this.tipo) {
        return this.tipo === '3'
      } else {
        return false
      }
    },
  },
  methods: {
    ...mapActions('resources', [
      'fetchResource',
      'addResourceData',
      'saveResource',
    ]),
    async submit() {
      await this.saveResource({
        nombre: this.name,
        costo: this.costo,
        tipo_costo: this.tipo_costo,
        tipo: this.tipo,
        vida_util:this.vida_util,
        id: this.$route.params.id,
      })
    },
  },
  props: ['id'],
  async mounted() {
    await this.fetchResource(this.$route.params.id)
  },
}
</script>

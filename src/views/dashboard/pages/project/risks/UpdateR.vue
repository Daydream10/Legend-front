<template>
  <v-container id="user-profile" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <base-material-card icon="mdi-account-outline" color="primary">
          <template v-slot:after-heading>
            <div class="font-weight-light card-title mt-2">
              Riesgos
              <span class="body-1">— Modificar Riesgos</span>
            </div>
          </template>
          <ValidationObserver ref="obs">
            <v-form>
              <v-container class="py-0">
                <v-row>
                  <v-col cols="12" md="4">
                    <v-select
                      color="secondary"
                      item-color="secondary"
                      label="Prioridad del Riesgo"
                      :items="type"
                      item-text="name"
                      item-value="id"
                      v-model="type3"
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
                    <v-select
                      color="secondary"
                      item-color="secondary"
                      label="Probabilidad de Ocurrencia"
                      :items="type2"
                      item-text="name"
                      item-value="id"
                      v-model="type4"
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
                      label="Magnitudad del Riesgo"
                      color="secondary"
                      prepend-icon="mdi-account"
                      v-model="magnitudR"
                      rules="required"
                      class="purple-input"
                      type="number"
                    />
                  </v-col>
                  <v-col cols="12" class="text-right">
                    <v-row>
                      <v-textarea
                        v-model="description"
                        outlined
                        autoGrow
                        filled
                        name="Descripcion"
                        label="Descripción del Riesgo"
                      ></v-textarea>
                    </v-row>
                  </v-col>
                  <v-col cols="12" class="text-right">
                    <v-row>
                      <v-textarea
                        v-model="mitigation"
                        outlined
                        autoGrow
                        filled
                        name="Mitigacion"
                        label="Plan de Mitigacion "
                      ></v-textarea>
                    </v-row>
                  </v-col>
                  <v-col cols="12" class="text-right">
                    <v-row>
                      <v-textarea
                        v-model="contingency"
                        outlined
                        autoGrow
                        filled
                        name="Contigencia"
                        label="Plan de Contigencia"
                      ></v-textarea>
                    </v-row>
                  </v-col>
                  <v-col cols="12" class="text-right">
                    <v-row>
                      <v-textarea
                        v-model="evolution"
                        outlined
                        autoGrow
                        filled
                        name="Evolucion"
                        label="Evolucion"
                      ></v-textarea>
                    </v-row>
                  </v-col>
                  <v-col cols="12">
                    <VTextFieldWithValidation
                      label="Estimacion del Riesgo"
                      color="secondary"
                      prepend-icon="mdi-phone"
                      v-model="estimacionR"
                      rules="required"
                      class="purple-input"
                    />
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
                      @click="createUser(inputs)"
                    >
                      Modificar
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
import VTextFieldWithValidation from '@/components/inputs/VTextFieldWithValidation'
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      type: [
        { name: 'Alta', id: '1' },
        { name: 'Media', id: '2' },
        { name: 'Baja', id: '3' },
      ],
      type2: [
        { name: 'Muy probable', id: '1' },
        { name: 'Bastante Probable', id: '2' },
        { name: 'Probable', id: '4' },
        { name: 'Improbable', id: '5' },
        { name: 'Muy Improbable', id: '6' },
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
    type3: {
      get() {
        return this.$store.state.risks.risk.prioridad
      },
      set(value) {
        const data = {
          key: 'type3',
          value,
        }
        this.addRiskData(data)
      },
    },
    getTypeId(prioridad) {
      let typeId = null
      this.items.forEach((item) => {
        if (item.name === prioridad) typeId = item.id
      })

      if (typeId === null) {
        console.warn('Prioridad not found with prioridad: ', prioridad)
      }
      return typeId
    },
    type4: {
      get() {
        return this.$store.state.risks.risk.probabilidadOcurrencia
      },
      set(value) {
        const data = {
          key: 'type4',
          value,
        }
        this.addRiskData(data)
      },
    },
    getTypeId2(probabilidadOcurrencia) {
      let typeId = null
      this.items.forEach((item) => {
        if (item.name === probabilidadOcurrencia) typeId = item.id
      })

      if (typeId === null) {
        console.warn(
          'ProbabilidadOcurrencia not found with probabilidadOcurrencia: ',
          probabilidadOcurrencia
        )
      }
      return typeId
    },
    magnitudR: {
      get() {
        return this.$store.state.risks.risk.magnitudRiesgo
      },
      set(value) {
        const data = {
          key: 'magnitudR',
          value,
        }
        this.addRiskData(data)
      },
    },
    description: {
      get() {
        return this.$store.state.risks.risk.descripcion
      },
      set(value) {
        const data = {
          key: 'description',
          value,
        }
        this.addRiskData(data)
      },
    },
    mitigation: {
      get() {
        return this.$store.state.risks.risk.planMitigacion
      },
      set(value) {
        const data = {
          key: 'mitigation',
          value,
        }
        this.addRiskData(data)
      },
    },
    contingency: {
      get() {
        return this.$store.state.risks.risk.planContingencia
      },
      set(value) {
        const data = {
          key: 'contigency',
          value,
        }
        this.addRiskData(data)
      },
    },
    evolution: {
      get() {
        return this.$store.state.risks.risk.evolucion
      },
      set(value) {
        const data = {
          key: 'evolution',
          value,
        }
        this.addRiskData(data)
      },
    },
    estimacionR: {
      get() {
        return this.$store.state.risks.risk.estimacionRiesgo
      },
      set(value) {
        const data = {
          key: 'date',
          value,
        }
        this.addRiskData(data)
      },
    },
  },
  methods: {
    ...mapActions('risks', ['fetchRisk', 'addRiskData', 'saveRisk']),
    async submit() {
      await this.saveRisk({
        prioridad: this.type3,
        probabilidadOcurrencia: this.type4,
        descripcion: this.description,
        planMitigacion: this.mitigation,
        planContingencia: this.contingency,
        evolucion: this.evolution,
        id: this.id,
      })
    },
    //  ...mapMutations('users', ['SHOW_LOADING', 'ERROR']),
  },
  props: ['id'],
  async mounted() {
    await this.fetchRisk(this.id)
  },
}
</script>

<template>
  <v-container id="user-profile" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="10">
        <base-material-card icon="mdi mdi-cog" color="primary">
          <template v-slot:after-heading>
            <div class="font-weight-light card-title mt-2">
              Procesos
              <span class="body-1">— Modificar Procesos</span>
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
                  <v-col cols="6" md="6">
                    <v-select
                      color="secondary"
                      item-color="secondary"
                      label="Tipo"
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
                      label="Categoria"
                      :items="type2"
                      item-text="name"
                      item-value="id"
                      v-model="categoria"
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
                  <v-col cols="12" class="text-right">
                    <v-btn
                      color="primary"
                      float="right"
                      margin-left="6px"
                      :to="{ name: 'ProcessesList' }"
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
        { name: 'Gerencial', id: 'G' },
        { name: 'Tecnico', id: 'T' },
        { name: 'Apoyo', id: 'A' },
      ],
      type2: [
        { name: 'Inicio', id: '1' },
        { name: 'Diseño', id: '2' },
        { name: 'Elaboración', id: '3' },
        { name: 'ejecución', id: '4' },
        { name: 'Cierre', id: '5' },
      ],
    }
  },
  components: {
    ValidationObserver,
    VTextFieldWithValidation,
  },
  computed: {
    name: {
      get() {
        return this.$store.state.processes.process.nombre
      },
      set(value) {
        const data = {
          key: 'name',
          value,
        }
        this.addProcessData(data)
      },
    },
    tipo: {
      get() {
        return this.$store.state.processes.process.tipo
      },
      set(value) {
        const data = {
          key: 'type',
          value,
        }
        this.addProcessData(data)
      },
    },
    categoria: {
      get() {
        return this.$store.state.processes.process.categoria
      },
      set(value) {
        const data = {
          key: 'category',
          value,
        }
        this.addProcessData(data)
      },
    },
  },
  methods: {
    ...mapActions('processes', [
      'fetchProcess',
      'addProcessData',
      'saveProcess',
    ]),
    async submit() {
      await this.saveProcess({
        nombre: this.name,
        categoria: this.categoria,
        tipo: this.tipo,
        id: this.$route.params.id,
      })
    },
  },
  props: ['id'],
  async mounted() {
    await this.fetchProcess(this.$route.params.id)
  },
}
</script>

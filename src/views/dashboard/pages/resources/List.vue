<template>
  <v-container id="data-tables" tag="section">
    <div class="text-right">
      <v-btn
        color="purple"
        class="ml-0"
        float="right"
        margin-left="6px"
        :to="{ name: 'ProjectDash' }"
      >
        Atrás
      </v-btn>
      <v-btn
        class="mx-2"
        fab
        dark
        color="primary"
        :to="{ name: 'ResourcesCreate' }"
      >
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>
    </div>
    <template>
      <v-dialog v-model="dialog" persistent max-width="600px">
        <base-material-card
          color="primary"
          icon="mdi mdi-currency-usd"
          title="Costos del proyecto"
          class="py-2 px-5 pt-10"
        >
          <v-form>
            <v-col>
              <v-row>
                <v-col>
                  <v-text-field
                    disabled
                    dense
                    regular
                    outlined
                    filled
                    prepend-inner-icon="mdi mdi-currency-usd"
                    color="primary"
                    label="Costo Directos"
                    class="mt-2"
                    v-model="costos.directo"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    disabled
                    dense
                    regular
                    outlined
                    filled
                    prepend-inner-icon="mdi mdi-currency-usd"
                    color="primary"
                    label="Costos Indirectos"
                    class="mt-2"
                    v-model="costos.indirectos"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    disabled
                    dense
                    regular
                    outlined
                    filled
                    prepend-inner-icon="mdi mdi-currency-usd"
                    color="primary"
                    label="Costos Extraordinarios"
                    class="mt-2"
                    v-model="costos.extraordinarios"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    disabled
                    dense
                    regular
                    outlined
                    filled
                    prepend-inner-icon="mdi mdi-currency-usd"
                    color="primary"
                    label="Total de Costos"
                    class="mt-2"
                    v-model="costos.total"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    disabled
                    dense
                    regular
                    outlined
                    filled
                    prepend-inner-icon="mdi mdi-currency-usd"
                    color="primary"
                    label="Costos optimista"
                    class="mt-2"
                    v-model="costos.optimista"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    disabled
                    dense
                    regular
                    outlined
                    filled
                    prepend-inner-icon="mdi mdi-currency-usd"
                    color="primary"
                    label="Costo Probable"
                    class="mt-2"
                    v-model="costos.probable"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    disabled
                    dense
                    regular
                    outlined
                    filled
                    prepend-inner-icon="mdi mdi-currency-usd"
                    color="primary"
                    label="Costo Pesimista"
                    class="mt-2"
                    v-model="costos.pesimista"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    disabled
                    dense
                    regular
                    outlined
                    filled
                    prepend-inner-icon="mdi mdi-currency-usd"
                    color="primary"
                    label="Costo Estimado"
                    class="mt-2"
                    v-model="costos.estimado"
                  />
                </v-col>
              </v-row>
              <v-row class="align-content-end">
                <v-btn default color="secondary" @click="dialog = false"
                  >Cerrar</v-btn
                >
              </v-row>
            </v-col>
          </v-form>
        </base-material-card>
      </v-dialog>
    </template>
    <base-material-card
      color="secondary"
      icon="mdi-vuetify"
      inline
      class="px-5 py-3"
    >
      <template v-slot:after-heading>
        <div class="display-2 font-weight-light">
          Lista de Recursos
        </div>
        <v-btn
          @click="open"
          class="btn btn-outline-primary col s12 m3"
          type="button"
          color="primary"
        >
          Información de costos
        </v-btn>
      </template>

      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        class="ml-auto"
        label="Search"
        hide-details
        single-line
        style="max-width: 250px;"
      />

      <v-divider class="mt-3" />

      <v-data-table
        :loading="dataTableLoading"
        :no-data-text="$t('dataTable.NO_DATA')"
        :no-results-text="$t('dataTable.NO_RESULTS')"
        :headers="headers"
        :items="resources"
        :search.sync="search"
        :sort-by="['name', 'office']"
        :sort-desc="[false, true]"
        multi-sort
      >
        <template v-slot:item.actions="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
            :to="{ name: 'ResourcesUpdate' }"
          >
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)">
            mdi-delete
          </v-icon>
        </template>
        <template v-slot:no-data>{{ $t('dataTable.NO_DATA') }}</template>
        <template v-slot:no-results>{{ $t('dataTable.NO_RESULTS') }}</template>
      </v-data-table>
    </base-material-card>
    <ErrorMessage />
    <SuccessMessage />
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
//import { Vue } from 'vue-property-decorator'

export default {
  name: 'UsersTable',
  data() {
    return {
      dataTableLoading: false,
      dialog: false,
      show: true,
      headers: [
        {
          text: 'Nombre',
          value: 'nombre',
        },
        {
          text: 'Tipo de Recurso',
          value: 'tipo',
        },
        {
          text: 'Tipo de Costo',
          value: 'tipo_costo',
        },
        {
          text: 'Costo',
          value: 'costo',
        },
        {
          sortable: false,
          text: 'Actions',
          value: 'actions',
        },
      ],
      loader: true,

      search: undefined,
    }
  },

  created() {
    this.fetchResources(this.$route.params.id_project)
    this.fetchCosto(this.$route.params.id_project)
  },
  computed: {
    ...mapGetters('resources', ['resources', 'costos']),
  },

  methods: {
    async editItem(item) {
      // this.$store.dispatch('UserUpdate')
      this.$router.push(
        `/resources/edit/${item.id}/${this.$route.params.id_project}`
      )
    },
    ...mapActions('resources', [
      'deleteResource',
      'fetchResources',
      'fetchCosto',
    ]),
    open() {
      this.dialog = true
    },
    async deleteItem(item) {
      try {
        const response = await this.$confirm(
          this.$t('common.DO_YOU_REALLY_WANT_TO_DELETE_THIS_ITEM'),

          {
            title: this.$t('common.WARNING'),
            buttonTrueText: this.$t('common.DELETE'),
            buttonFalseText: this.$t('common.CANCEL'),
            buttonTrueColor: 'red lighten3',
            buttonFalseColor: 'yellow',
          }
        )
        if (response) {
          console.log(item.id)
          this.dataTableLoading = true
          await this.deleteResource(item.id)
          await this.fetchResources(this.$route.params.id_project)
          this.dataTableLoading = false
        }
      } catch (error) {
        this.dataTableLoading = false
        console.log(error)
      }
    },
  },
  mounted() {},
}
</script>

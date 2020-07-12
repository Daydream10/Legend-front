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
        :to="{ name: 'ProcessCreate' }"
      >
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>
    </div>

    <base-material-card
      color="secondary"
      icon="mdi-vuetify"
      inline
      class="px-5 py-3"
    >
      <template v-slot:after-heading>
        <div class="display-2 font-weight-light">
          Lista de Procesos
        </div>
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
        :headers="headers"
        :items="processes"
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
            :to="{ name: 'ProcessUpdate' }"
          >
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)">
            mdi-delete
          </v-icon>
        </template>
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
          text: 'Categoria',
          value: 'categoria',
        },
        {
          text: 'Tipo',
          value: 'tipo',
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
    this.fetchProcesses(this.$route.params.id_project)
  },
  computed: {
    ...mapGetters('processes', ['processes']),
  },

  methods: {
    async editItem(item) {
      this.$router.push(
        `/process/edit/${item.id}/${this.$route.params.id_project}`
      )
    },
    ...mapActions('processes', ['deleteProcess', 'fetchProcesses']),
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
          await this.deleteProcess(item.id)
          await this.fetchProcesses(this.$route.params.id_project)
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

<template>
  <v-container id="data-tables" tag="section">
    <div class="text-right">
      <v-btn
        class="mx-2"
        fab
        dark
        color="primary"
        :to="{ name: 'DecanatosCreate' }"
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
          Lista de Estados
        </div>
      </template>

      <v-text-field
        v-model="search"
        id="search"
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
        :no-data-text="$t('common.dataTable.NO_DATA')"
        :no-results-text="$t('common.dataTable.NO_RESULTS')"
        :headers="headers"
        :items="estados"
        :search.sync="search"
        :options.sync="pagination"
        :sort-by="['name']"
        :sort-desc="[false, true]"
        multi-sort
      >
        <template v-slot:item.actions="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
            :to="{ name: 'EstadosUpdate' }"
          >
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)">
            mdi-delete
          </v-icon>
        </template>
        <template v-slot:no-data>{{ $t('common.dataTable.NO_DATA') }}</template>
        <template v-slot:no-results>{{
          $t('common.dataTable.NO_RESULTS')
        }}</template>
      </v-data-table>
    </base-material-card>
    <ErrorMessage />
    <SuccessMessage />
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { buildPayloadPagination } from '@/utils/utils.js'

export default {
  name: 'EstadosTable',
  data() {
    return {
      dataTableLoading: true,
      pagination: {},

      headers: [
        {
          text: 'Estados',
          value: 'nombre',

          //sortable: true,
        },
        {
          sortable: false,
          text: 'Acciones',
          value: 'actions',
        },
      ],
      // loader: true,
      delayTimer: null,
      search: '',
      fieldsToSearch: ['nombre'],
    }
  },

  created() {
    this.$store.dispatch('estados/fetchActiveEstados')
  },
  watch: {
    pagination: {
      async handler() {
        try {
          this.dataTableLoading = true
          await this.fetchActiveEstados(
            buildPayloadPagination(this.pagination, this.buildSearch())
          )
          this.dataTableLoading = false
          // eslint-disable-next-line no-unused-vars
        } catch (error) {
          this.dataTableLoading = false
        }
      },
      deep: true,
    },
    search() {
      clearTimeout(this.delayTimer)
      this.delayTimer = setTimeout(() => {
        this.doSearch()
      }, 400)
    },
  },
  computed: {
    ...mapGetters('estados', ['estados']),
  },

  methods: {
    async doSearch() {
      try {
        this.dataTableLoading = true
        await this.fetchActiveEstados(
          buildPayloadPagination(this.pagination, this.buildSearch())
        )
        this.dataTableLoading = false
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        this.dataTableLoading = false
      }
    },
    buildSearch() {
      return this.search
        ? { query: this.search, fields: this.fieldsToSearch.join(',') }
        : {}
    },
    async editItem(item) {
      // this.$store.dispatch('UserUpdate')
      this.$router.push(`/estados/edit/${item.codigo}/`)
    },
    ...mapActions('estados', ['deleteEstado']),
    //props: ['id'],
    async deleteItem(item) {
      try {
        const response = await this.$confirm(this.$t('common.estado.DELETE'), {
          title: this.$t('common.WARNING'),
          buttonTrueText: this.$t('common.DELETE'),
          buttonFalseText: this.$t('common.CANCEL'),
          //  buttonTrueColor: 'red lighten3',
          // buttonFalseColor: 'yellow',
          buttonTrueColor: 'purple',
          buttonFalseColor: 'primary',
        })
        if (response) {
          console.log(item.id)
          this.dataTableLoading = true
          //await this.deleteUser(item.id, {})
          await this.deleteDecanato(item.codigo)
          this.dataTableLoading = false
          this.$store.dispatch('estado/fetchActiveEstados')
          this.dataTableLoading = false
        }
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        this.dataTableLoading = false
      }
    },
  },
  mounted() {},
}
</script>

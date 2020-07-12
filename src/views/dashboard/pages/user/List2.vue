<template>
  <v-container id="data-tables" tag="section">
    <div class="text-right">
      <v-btn class="mx-2" fab dark color="primary" :to="{ name: 'UserCreate' }">
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
          Lista de Empleados
        </div>

        <!--<v-btn
          @click="success"
          class="btn btn-outline-primary col s12 m3"
          type="button"
        >
          success
        </v-btn>-->
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
        :no-data-text="$t('dataTable.NO_DATA')"
        :no-results-text="$t('dataTable.NO_RESULTS')"
        :headers="headers"
        :items="users"
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
            @click="showItem(item)"
            :to="{ name: 'UserShow' }"
          >
            mdi-eye
          </v-icon>
          <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
            :to="{ name: 'UserUpdate' }"
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
import { buildPayloadPagination } from '@/utils/utils.js'

export default {
  name: 'UsersTable',
  data() {
    return {
      dataTableLoading: false,
      pagination: {},

      headers: [
        {
          text: 'Nombre',
          value: 'empleado.nombre',

          sortable: true,
        },
        {
          text: 'Apellido',
          value: 'empleado.apellido',
        },
        {
          text: 'Dirección',
          value: 'empleado.direccion',
        },
        {
          text: 'Correo Electrónico',
          value: 'email',
        },
        {
          text: 'Teléfono',
          value: 'empleado.telefono',
        },
        {
          sortable: false,
          text: 'Acciones',
          value: 'actions',
        },
      ],
      loader: true,
      delayTimer: null,
      search: '',
      fieldsToSearch: [
        'empleado.nombre',
        'empleado.apellido',
        'empleado.direccion',
        'email',
        'empleado.telefono',
      ],
    }
  },

  created() {
    this.$store.dispatch('users/fetchUsers')
  },
  watch: {
    pagination: {
      async handler() {
        try {
          this.dataTableLoading = true
          await this.fetchUsers(
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
    ...mapGetters('users', ['users']),
  },

  methods: {
    async doSearch() {
      try {
        this.dataTableLoading = true
        await this.getUsers(
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
      this.$router.push(`/users/edit/${item.id}/`)
    },
    ...mapActions('users', ['deleteUser']),
    props: ['id'],
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
          //await this.deleteUser(item.id, {})
          await this.deleteUser({
            id: item.id,
            is_active: false,
            email: this.email,
            empleado: {
              nombre: this.name,
              apellido: this.lastName,
              direccion: this.address,
              telefono: this.phone,
            },
            tipo_usuario: this.type,
          })
          this.dataTableLoading = false
          await this.fetchUsers(
            buildPayloadPagination(this.pagination, this.buildSearch())
          )
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

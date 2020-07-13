<template>
  <v-container id="data-tables" tag="section">
    <div class="text-right">
      <v-btn
        class="mx-2"
        fab
        dark
        color="primary"
        :to="{ name: 'ActasCreate' }"
      >
        <v-icon dark>
          mdi-plus
        </v-icon>
      </v-btn>
    </div>
    <base-material-card
      color="indigo"
      icon="mdi-vuetify"
      inline
      class="px-5 py-3"
    >
      <template v-slot:after-heading>
        <div class="display-2 font-weight-light">
          Lista de Actas
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
        :headers="headers"
        :items="actas"
        :search.sync="search"
        :sort-by="['name', 'office']"
        :sort-desc="[false, true]"
        multi-sort
      >
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="download(item.pdf.id)">
            mdi-download
          </v-icon>
          <v-icon
            small
            class="mr-2"
            :to="{ name: 'ActasUpdate' }"
            @click="editItem(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </base-material-card>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
// import { Vue } from 'vue-property-decorator'
//import FilePicker from '@/components/FilePicker'
import axios from 'axios'
import authHeader from '@/services/auth-header.js'
//import Cookies from 'js-cookie'
import { buildPayloadPagination } from '@/utils/utils.js'

export default {
  name: 'ActasTable',
  data() {
    return {
      // users: [],
      headers: [
        {
          text: 'Tipo Sesion',
          value: 'tipo',
        },
        {
          text: 'Descripcion',
          value: 'descripcion',
        },
        {
          text: 'Fecha',
          value: 'fecha',
        },
        {
          text: 'Decanato',
          value: 'decanato.nombre',
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
    const user = JSON.parse(localStorage.getItem('user'))
    console.log(user)
    this.rol = user.roles[0] === 'ROLE_ADMIN'
    if (user.roles[0] === 'ROLE_ADMIN') {
      this.fetchActiveActas()
    } else {
      console.log(user.decanato.codigo)
      this.fetchActasDecanato(user.decanato.codigo)
    }
    this.fetchActiveDecanatos()
  },
  watch: {
    pagination: {
      async handler() {
        try {
          this.dataTableLoading = true
          await this.fetchActiveActas(
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
    ...mapGetters('actas', ['actas']),

    ...mapGetters('decanatos', ['decanatos']),
  },
  mounted() {},

  methods: {
    async doSearch() {
      try {
        this.dataTableLoading = true
        await this.fetchActiveActas(
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
    download(id) {
      const header = authHeader()
      axios
        .get(`http://localhost:8080/api/pdf/downloadFile/${id}`, {
          headers: header,
          responseType: 'blob',
        })
        .then((response) => {
          var fileURL = window.URL.createObjectURL(new Blob([response.data]))
          var fileLink = document.createElement('a')
          fileLink.href = fileURL
          fileLink.setAttribute('download', 'file.pdf')
          document.body.appendChild(fileLink)
          fileLink.click()
        })
    },
    ...mapActions('actas', [
      'fetchActiveActas',
      'deleteActa',
      'fetchActas',
      'saveActa',
      'fetchActasDecanato',
    ]),
    ...mapActions('decanatos', ['fetchActiveDecanatos']),

    async editItem(item) {
      // this.$store.dispatch('UserUpdate')
      this.$router.push(`/actas/edit/${item.codigo}/`)
    },
    //props: ['id'],
    async deleteItem(item) {
      try {
        const response = await this.$confirm(this.$t('common.acta.DELETE'), {
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
          await this.deleteActa(item.codigo)
          this.dataTableLoading = false
          this.$store.dispatch('actas/fetchActiveActas')
          this.dataTableLoading = false
        }
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        this.dataTableLoading = false
      }
    },
  },
}
</script>

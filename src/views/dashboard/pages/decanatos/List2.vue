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
          Lista de Decanatos
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
        :items="(actas, decanatos)"
        :search.sync="search"
        :sort-by="['name', 'office']"
        :sort-desc="[false, true]"
        multi-sort
      >
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="showItem(item)">
            mdi-eye
          </v-icon>
          <v-icon
            small
            class="mr-2"
            :to="{ name: 'ActaUpdate' }"
            @click="editItem(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)">
            mdi-delete
          </v-icon>
          <v-icon small @click="download(item.pdf.id)">
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

export default {
  name: 'DecanatosTable',
  data() {
    return {
      // users: [],
      headers: [
        {
          text: 'Tipo Servicio',
          value: 'tipo'
        },
        {
          text: 'Descripcion',
          value: 'descripcion'
        },
        {
          text: 'Fecha',
          value: 'fecha'
        },
        {
          text: 'Decanato',
          value: 'decanato.nombre'
        },
        {
          sortable: false,
          text: 'Actions',
          value: 'actions'
        }
      ],
      loader: true,

      search: undefined
    }
  },

  created() {
    const user = JSON.parse(localStorage.getItem('user'))
    console.log(user)
    this.rol = user.roles[0] === 'ROLE_ADMIN'
    if (user.roles[0] === 'ROLE_ADMIN') {
      this.fetchActiveDecanatos()
    } else {
      console.log(user.decanato.codigo)
      this.fetchDecanatosDecanato(user.decanato.codigo)
    }
    this.fetchActiveDecanatos()
  },
  computed: {
    ...mapGetters('actas', ['actas']),

    ...mapGetters('decanatos', ['decanatos'])
  },
  mounted() {},

  methods: {
    download(id) {
      const header = authHeader()
      axios
        .get(`http://localhost:8080/api/pdf/downloadFile/${id}`, {
          headers: header,
          responseType: 'blob'
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
      'fetchActiveDecanatos',
      'deleteActa',
      'fetchDecanatos',
      'saveActa',
      'fetchDecanatosDecanato',
      'fetchEstados'
    ]),
    ...mapActions('decanatos', ['fetchActiveDecanatos']),

    edit() {
      const today = new Date()
      this.saveActa({
        codigo: this.form.codigo,
        tipo: this.form.tipo,
        descripcion: this.form.descripcion,
        estatus: 'A',
        estado: this.form.estado,
        fecha: this.form.fecha,
        ult_actializacion: today,
        decanato: this.form.decanato
      })
      this.$buefy.snackbar.open({
        message: '¡Se modificó el Acta exitosamente!',
        queue: false
      })
      this.modal = false
    },
    editar(acta) {
      this.modal = true
      this.form.tipo = acta.tipo
      this.form.descripcion = acta.descripcion
      this.form.fecha = new Date()
      this.form.codigo = acta.codigo
      this.form.decanato = acta.decanato
      this.form.estado = acta.estado
    },
    deleteA(acta) {
      this.$buefy.dialog.confirm({
        title: 'Eliminar Acta',
        message: '¿Estás de acuerdo en <b>eliminar</b> este Acta?',
        confirmText: 'Eliminar',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.deleteActa(acta.codigo)
          this.$buefy.toast.open('Acta Eliminada!')
        }
      })
      this.fetchActiveDecanatos()
    }
  }
}
</script>

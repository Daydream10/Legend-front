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
        </template>
      </v-data-table>
    </base-material-card>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
// import { Vue } from 'vue-property-decorator'

export default {
  name: 'ActasTable',
  data() {
    return {
      // users: [],
      headers: [
        {
          text: 'Id',
          value: 'acta.id',
        },
        {
          text: 'Tipo Servicio',
          value: 'acta.tipoServicio',
        },
        {
          text: 'Descripcion',
          value: 'acta.descripcion',
        },
        {
          text: 'Fecha',
          value: 'acta.fecha',
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
    this.$store.dispatch('actas/fetchActas')
  },
  computed: {
    ...mapGetters('actas', ['actas']),
  },
  mounted() {},

  methods: {
    ...mapActions('actas', [
      'fetchActiveActas',
      'deleteActa',
      'fetchActas',
      'saveActa',
      'fetchActasDecanato',
      'fetchEstados',
    ]),
  },
}
</script>

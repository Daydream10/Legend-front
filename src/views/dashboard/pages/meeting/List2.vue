<template>
  <v-container id="data-tables" tag="section">
    <base-material-card
      color="secondary"
      icon="mdi-vuetify"
      inline
      class="px-5 py-3"
    >
      <template v-slot:after-heading>
        <div class="display-2 font-weight-light">Lista de Reuniones</div>
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
        :items="meetings"
        :search.sync="search"
        :sort-by="['name']"
        :sort-desc="[false]"
        multi-sort
      >
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
  name: 'MeetingTable',
  data() {
    return {
      headers: [
        {
          text: 'Nombre',
          value: 'nombre',
        },
        {
          text: 'Descripción',
          value: 'descripcion',
        },
        {
          text: 'Fecha',
          value: 'fecha',
        },
        {
          text: 'Hora',
          value: 'hora',
        },
        {
          text: 'Lugar',
          value: 'lugar',
        },
        {
          text: 'Proyecto',
          value: 'proyecto',
        },
      ],
      loader: true,

      search: undefined,
      id_project: this.$route.params.id_project,
    }
  },

  created() {
    this.fetchMeetings2()
    //console.log(this.$route.params.id)
    //this.$store.dispatch('meetings/fetchMeetings')
  },
  computed: {
    ...mapGetters('meetings', ['meetings']),
  },

  methods: {
    ...mapActions('meetings', ['fetchMeetings2']),
  },
  mounted() {},
}
</script>

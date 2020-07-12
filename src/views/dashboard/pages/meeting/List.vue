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
        :to="{ name: 'MeetingCreate', params: { id_project } }"
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
        <template v-slot:item.actions="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
            :to="{ name: 'MeetingUpdate' }"
            >mdi-pencil</v-icon
          >
          <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
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
          sortable: false,
          text: 'Acciones',
          value: 'actions',
        },
      ],
      loader: true,

      search: undefined,
      id_project: this.$route.params.id_project,
    }
  },

  created() {
    this.fetchMeetings(this.$route.params.id_project)
    //console.log(this.$route.params.id)
    //this.$store.dispatch('meetings/fetchMeetings')
  },
  computed: {
    ...mapGetters('meetings', ['meetings']),
  },

  methods: {
    async editItem(item) {
      this.$router.push(
        `/meetings/edit/${item.id}/${this.$route.params.id_project}`
      )
    },
    ...mapActions('meetings', ['deleteMeeting', 'fetchMeetings']),
    success() {
      /* Vue.swal({
        type: 'success',
        title: 'Hello',
        text: 'Hello brave new world!',
      })*/
      this.$swal('Oops...', 'Something went wrong!', 'success')
    },
    //props: ['id'],
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
          await this.deleteMeeting(item.id)
          await this.fetchMeetings(this.$route.params.id_project)
          this.dataTableLoading = false
        }
      } catch (error) {
        this.dataTableLoading = false
      }
    },
  },
  mounted() {},
}
</script>

<template>
  <v-container id="data-tables" tag="section">
    <div class="text-right">
      <v-btn
        class="mx-2"
        fab
        dark
        color="primary"
        :to="{ name: 'RiskCreate', params: { id_project } }"
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
        <div class="display-2 font-weight-light">Lista de Riesgos</div>

        <!-- <v-btn
          @click="success"
          class="btn btn-outline-primary col s12 m3"
          type="button"
          >success</v-btn
        >-->
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
        :items="risks"
        :search.sync="search"
        :sort-by="['name']"
        :sort-desc="[false]"
        multi-sort
      >
        <template v-slot:item.actions="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="showItem(item)"
            :to="{ name: 'RiskShow' }"
            >mdi-eye</v-icon
          >
          <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
            :to="{ name: 'RiskUpdate' }"
            >mdi-pencil</v-icon
          >
          <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </base-material-card>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
//import { Vue } from 'vue-property-decorator'

export default {
  name: 'RiskTable',
  data() {
    return {
      headers: [
        {
          text: 'Nombre',
          value: 'name',
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
    this.fetchRisks(this.$route.params.id_project)
    //console.log(this.$route.params.id)
    //this.$store.dispatch('meetings/fetchMeetings')
  },
  computed: {
    ...mapGetters('risks', ['risks']),
  },

  methods: {
    async editItem(item) {
      this.$router.push(
        `/risk/edit/${item.id}/${this.$route.params.id_project}`
      )
    },
    ...mapActions('risk', ['deleteRisk', 'fetchRisks']),
    success() {
      /* Vue.swal({
        type: 'success',
        title: 'Hello',
        text: 'Hello brave new world!',
      })*/
      this.$swal('Oops...', 'Something went wrong!', 'success')
    },
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
          await this.deleteRisk({
            id: item.id,
            is_active: false,
            nombre: this.name,
          })
        }
      } catch (error) {
        this.dataTableLoading = false
      }
    },
  },
  mounted() {},
}
</script>

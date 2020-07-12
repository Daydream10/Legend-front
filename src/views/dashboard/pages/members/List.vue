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
        :to="{ name: 'MemberCreate' }"
      >
        <v-icon dark>mdi-plus</v-icon>
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
          Lista de Miembros
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
        :items="members"
        :search.sync="search"
        :sort-by="['name', 'office']"
        :sort-desc="[false, true]"
        multi-sort
        :loading="dataTableLoading"
      >
        <!-- <template v-slot:item.actions="{ item }">
          <v-btn icon slot="activator">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
          <v-list>
            <v-list-title
              small
              class="mr-2"
              @click="showItem()"
              :to="{ name: 'UserShow' }"
            >
              <v-list-tile-title>
                <v-icon small class="mr-2"> mdi-eye </v-icon>
              </v-list-tile-title>
            </v-list-title>
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
          </v-list>
        </template>-->
        <template v-slot:item.actions="{ item }">
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
  name: 'MembersTable',
  data() {
    return {
      //users: [],
      dataTableLoading: false,
      headers: [
        {
          text: 'Nombre',
          value: 'usuario.nombre',
        },
        {
          text: 'Correo Electrónico',
          value: 'usuario.correo',
        },
        {
          text: 'Rol',
          value: 'rol',
        },
        {
          text: 'Proyecto',
          value: 'proyecto.nombre',
        },
        {
          sortable: false,
          text: 'Actions',
          value: 'actions',
        },
      ],
      loader: true,

      search: undefined,
      idProject: null,
    }
  },

  created() {
    this.fetchMembers(this.$route.params.id_project)
    this.idProject = this.$route.params.id_project
    console.log(this.idProject)
  },
  computed: {
    ...mapGetters('members', ['members']),
  },

  methods: {
    async editItem(item) {
      // this.$store.dispatch('UserUpdate')
      this.$router.push(`/users/edit/${item.id}/`)
    },
    ...mapActions('members', ['deleteMember', 'fetchMembers']),
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
          this.dataTableLoading = true
          await this.deleteMember(item.id)
          console.log(this.idProject)
          await this.fetchMembers(this.idProject)
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

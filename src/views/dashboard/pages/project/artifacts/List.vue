<template>
  <v-container id="dashboard" fluid tag="section">
    <v-row>
      <v-col cols="12">
        <section class="mb-12 text-center">
          <h1 class="font-weight-light mb-2 headline">
            Lista de Artefactos del Proyecto
          </h1>
          <span class="font-weight-light subtitle-1"
            >Desde aquí podrás gestionar todos los artefactos de tu
            proyecto</span
          >
        </section>
        <div justify="right" align="right" class="ml-20">
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
            :to="{ name: 'ArtifactsCreate' }"
          >
            <v-icon dark>mdi-plus</v-icon>
          </v-btn>
        </div>
      </v-col>

      <v-col sm="12" md="4" v-for="artifact in artifacts" :key="artifact.id">
        <v-card color="secondary">
          <v-card-title
            class="justify-center font-weight-light headline white--text"
            >{{ artifact.nombre }}</v-card-title
          >
          <v-card-text
            class="body-1 text-center mb-3 font-weight-light white--text"
            >{{ artifact.descripcion }}</v-card-text
          >
          <v-card-actions class="ml-3" justify="center" align="center">
            <v-btn color="primary" @click="letsGo(artifact.enlace)"
              >Revisar</v-btn
            >
            <v-btn color="blue-grey darken-4" @click="deleteItem(artifact.id)"
              >Eliminar</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <ErrorMessage />
    <SuccessMessage />
  </v-container>
</template>

<script>
// Utilities
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'DashboardDashboard',

  data() {
    return {}
  },

  computed: {
    ...mapGetters('artifacts', ['artifacts']),
  },
  created() {
    console.log(this.$route.query.categoria)
    this.fetchArtifacts(this.$route.params.id_project)
    //this.fetchProcesses(this.$route.params.id_project)
  },
  methods: {
    ...mapActions('artifacts', ['fetchArtifacts', 'deleteArtifact']),

    async deleteItem(item) {
      const response = await this.$confirm(
        this.$t('common.DO_YOU_REALLY_WANT_TO_DELETE_THIS_ITEM'),

        {
          title: this.$t('common.WARNING'),
          buttonTrueText: this.$t('common.DELETE'),
          buttonFalseText: this.$t('common.CANCEL'),
          buttonTrueColor: 'secondary',
          buttonFalseColor: 'primary',
        }
      )
      if (response) {
        await this.deleteArtifact(item)
        await this.fetchArtifacts(this.$route.params.id_project)
      }
    },

    letsGo(value) {
      window.open(value, '_blank')
    },
  },
}
</script>

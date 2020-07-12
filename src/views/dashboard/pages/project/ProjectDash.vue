<template>
  <v-container id="dashboard" fluid tag="section">
    <v-row>
      <v-col cols="12" class="mb-3">
        <div class="font-weight-light mt-1" style="font-size: 25px;">
          Vista General del Proyecto -¿Qué harás hoy?
        </div>
      </v-col>
    </v-row>
    <div
      class="font-weight-light mt-1"
      align="center"
      justify="center"
      style="font-size: 18px;"
    >
      Selecciona una Etapa:
    </div>
    <v-row justify="center" align="center" dense cols="12">
      <base-material-card
        color="pink lighten-1"
        class="mx-4"
        image
        hover-reveal
      >
        <template v-slot:reveal-actions>
          <v-tooltip bottom>
            <template v-slot:activator="{ attrs, on }">
              <v-btn
                class="mx-1"
                v-bind="attrs"
                icon
                v-on="on"
                :to="{
                  name: 'Processes',
                  params: { id_project },
                  query: { categoria: '1' },
                }"
              >
                <v-icon>mdi-folder-multiple</v-icon>
              </v-btn>
            </template>
            <span>Ver Procesos</span>
          </v-tooltip>
        </template>

        <v-card-title class="justify-center font-weight-light"
          >Inicio</v-card-title
        >
      </base-material-card>

      <base-material-card color="lime darken-1" class="mx-4" image hover-reveal>
        <template v-slot:reveal-actions>
          <v-tooltip bottom>
            <template v-slot:activator="{ attrs, on }">
              <v-btn
                class="mx-1"
                v-bind="attrs"
                icon
                v-on="on"
                :to="{
                  name: 'Processes',
                  params: { id_project },
                  query: { categoria: 2 },
                }"
              >
                <v-icon>mdi-folder-multiple</v-icon>
              </v-btn>
            </template>

            <span>Ver Procesos</span>
          </v-tooltip>
        </template>

        <v-card-title class="justify-center font-weight-light"
          >Planificación</v-card-title
        >
      </base-material-card>

      <base-material-card
        color="indigo accent-2"
        class="mx-4"
        image
        hover-reveal
      >
        <template v-slot:reveal-actions>
          <v-tooltip bottom>
            <template v-slot:activator="{ attrs, on }">
              <v-btn
                class="mx-1"
                v-bind="attrs"
                icon
                v-on="on"
                :to="{
                  name: 'Processes',
                  params: { id_project },
                  query: { categoria: 3 },
                }"
              >
                <v-icon>mdi-folder-multiple</v-icon>
              </v-btn>
            </template>

            <span>Ver Procesos</span>
          </v-tooltip>
        </template>

        <v-card-title class="justify-center font-weight-light"
          >Desarrollo</v-card-title
        >
      </base-material-card>

      <base-material-card
        color="green darken-2"
        class="mx-4"
        image
        hover-reveal
      >
        <template v-slot:reveal-actions>
          <v-tooltip bottom>
            <template v-slot:activator="{ attrs, on }">
              <v-btn
                class="mx-1"
                v-bind="attrs"
                icon
                v-on="on"
                :to="{
                  name: 'Processes',
                  params: { id_project },
                  query: { categoria: 4 },
                }"
              >
                <v-icon>mdi-folder-multiple</v-icon>
              </v-btn>
            </template>

            <span>Ver Procesos</span>
          </v-tooltip>
        </template>

        <v-card-title class="justify-center font-weight-light"
          >Control</v-card-title
        >
      </base-material-card>
      <base-material-card
        color="purple lighten-2"
        class="mx-4"
        image
        hover-reveal
      >
        <template v-slot:reveal-actions>
          <v-tooltip bottom>
            <template v-slot:activator="{ attrs, on }">
              <v-btn
                class="mx-1"
                v-bind="attrs"
                icon
                v-on="on"
                :to="{
                  name: 'Processes',
                  params: { id_project },
                  query: { categoria: 5 },
                }"
              >
                <v-icon>mdi-folder-multiple</v-icon>
              </v-btn>
            </template>

            <span>Ver Procesos</span>
          </v-tooltip>
        </template>

        <v-card-title class="justify-center font-weight-light"
          >Cierre</v-card-title
        >
      </base-material-card>
    </v-row>
    <v-divider />
    <v-row class="mx-auto" justify="center" dense align="center">
      <v-btn
        color="secondary"
        :to="{ name: 'ArtifactsList', params: { id_project } }"
        >ARTEFACTOS</v-btn
      >
      <v-btn
        color="secondary"
        :to="{ name: 'MeetingList', params: { id_project } }"
        >REUNIONES</v-btn
      >
      <v-btn
        color="secondary"
        :to="{ name: 'ProcessesList', params: { id_project } }"
        >PROCESOS</v-btn
      >
      <v-btn
        color="secondary"
        :to="{ name: 'MembersList', params: { id_project } }"
        >MIEMBROS</v-btn
      >
      <v-btn
        class="mx-2 mt-3"
        fab
        dark
        color="primary"
        :to="{ name: 'ProjectUpdate', params: { id_project } }"
      >
        <v-icon dark>mdi-pencil</v-icon>
      </v-btn>
    </v-row>
    <v-row>
      <v-col>
        <v-row>
          <v-card class="mx-auto mt-12" max-width="500">
            <v-img height="250" src="@/assets/project.jpg"></v-img>
          </v-card>
        </v-row>
        <v-row>
          <v-row class="mx-auto mt-2" justify="center" dense align="center">
            <div
              class="card-title font-weight-light ml-4 mb-3"
              style="font-size: 15;"
            >
              ESTIMACIONES:
            </div>
          </v-row>
          <v-row class="mx-auto" justify="center" dense align="center">
            <v-btn
              color="primary"
              :to="{ name: 'Time', params: { id_project } }"
              >TIEMPOS</v-btn
            >
            <v-btn
              color="primary"
              :to="{ name: 'ResourcesList', params: { id_project } }"
              >RECURSOS</v-btn
            >
            <v-btn
              color="primary"
              :to="{ name: 'Scope', params: { id_project } }"
              >ALCANCES</v-btn
            >
          </v-row>
        </v-row>
      </v-col>
      <v-col>
        <base-material-card
          title="Estado del Proyecto: "
          icon="mdi-clipboard-text"
          color="primary"
        >
          <v-row>
            <div
              class="card-title font-weight-bold ml-4"
              style="font-size: 15px;"
            >
              Nombre: {{ projectInfo.nombre }}
            </div>
          </v-row>

          <v-row>
            <div
              class="card-title font-weight-bold ml-4"
              style="font-size: 15px;"
            >
              Presupuesto: {{ projectInfo.presupuesto }}
            </div>
          </v-row>

          <v-row>
            <div
              class="card-title font-weight-bold ml-4"
              style="font-size: 15px;"
            >
              Costo: {{ projectInfo.costo }}
            </div>
          </v-row>
          <v-row>
            <div
              class="card-title font-weight-bold ml-4"
              style="font-size: 15px;"
            >
              Miembros: {{ projectInfo.miembros }}
            </div>
          </v-row>
          <v-row>
            <div
              class="card-title font-weight-bold ml-4"
              style="font-size: 15px;"
            >
              Líder: {{ projectInfo.lider }}
            </div>
          </v-row>
          <v-row>
            <div
              class="card-title font-weight-bold ml-4"
              style="font-size: 15px;"
            >
              Metodología: {{ projectInfo.metodologia }}
            </div>
          </v-row>
          <v-row>
            <div
              class="card-title font-weight-bold ml-4"
              style="font-size: 15px;"
            >
              Actividades Asignadas: {{ projectInfo.actividades_asignadas }}
            </div>
          </v-row>
          <v-row>
            <div
              class="card-title font-weight-bold ml-4"
              style="font-size: 15px;"
            >
              Actividades Completadas: {{ projectInfo.actividades_completadas }}
            </div>
          </v-row>
          <v-row>
            <div
              class="card-title font-weight-bold ml-4"
              style="font-size: 15px;"
            >
              Procesos Instanciados: {{ projectInfo.procesos_totales }}
            </div>
          </v-row>
          <v-row>
            <div
              class="card-title font-weight-bold ml-4"
              style="font-size: 15px;"
            >
              Fecha de Inicio: {{ projectInfo.fecha_inicio }}
            </div>
          </v-row>
          <v-row>
            <div
              class="card-title font-weight-bold ml-4"
              style="font-size: 15px;"
            >
              Fecha de Finalización: {{ projectInfo.fecha_finalizacion }}
            </div>
          </v-row>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      categoria: this.$route.query.categoria,
      id_project: this.$route.params.id_project,
    }
  },

  computed: {
    ...mapGetters('projects', ['projectInfo']),
  },

  methods: {
    ...mapActions('projects', ['fetchProjectInfo']),
  },

  created() {
    this.fetchProjectInfo(this.$route.params.id_project)
  },
}
</script>

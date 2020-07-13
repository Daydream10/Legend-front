<template>
  <v-container id="dashboard" fluid tag="section">
    <v-row>
      <v-col cols="12">
        <div class="font-weight-light mt-1" style="font-size: 25px;">
          UCLA Secretaría
        </div>
      </v-col>

      <v-col cols="12" sm="6" lg="3">
        <base-material-stats-card
          color="info"
          icon="mdi-twitter"
          label="Actas Registradas"
          value="+245"
          sub-icon="mdi-clock"
          sub-text="Just Updated"
          :number="actas"
        />
      </v-col>
      <!-- <v-col sm="12" md="4">
        <base-material-card color="transparent" image hover-reveal>
          <template v-slot:image>
            <v-img
              src="https://cnet2.cbsistatic.com/img/jkQcrZOrdtg7l_o4dLStV_fsgJs=/940x0/2016/10/04/117d5afb-417f-4688-83a0-400ab7555371/dsc0028.jpg"
            />
          </template>

          <template v-slot:reveal-actions>
            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn class="mx-1" v-bind="attrs" icon v-on="on">
                  <v-icon>mdi-view-split-vertical</v-icon>
                </v-btn>
              </template>

              <span :to="{ name: 'Stages' }">Ver Actividades</span>
            </v-tooltip>
          </template>

          <v-card-title class="justify-center font-weight-light">E-Market</v-card-title>

          <v-card-text class="body-1 text-center mb-3 font-weight-light grey--text">
            Un marketplace virtual de bienes y servicios electrónicos para
            smartphones.
          </v-card-text>

          <template v-slot:actions>
            <div class="display-2 font-weight-light grey--text">Servicios</div>

            <v-spacer />

            <span class="caption grey--text font-weight-light">
              <v-icon small>mdi-map-marker</v-icon>Barquisimeto
            </span>
          </template>
        </base-material-card>
      </v-col>-->

      <!-- <v-col sm="12" md="4">
        <base-material-card color="transparent" hover-reveal image>
          <template v-slot:image>
            <v-img
              src="https://opportunitymarketing.co.uk/wp-content/uploads/2020/01/dominate-your-app.jpg"
            />
          </template>

          <template v-slot:reveal-actions>
            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn class="mx-1" v-bind="attrs" icon v-on="on">
                  <v-icon>mdi-view-split-vertical</v-icon>
                </v-btn>
              </template>

              <span>Ver Actividades</span>
            </v-tooltip>
          </template>

          <v-card-title class="justify-center font-weight-light">U-Social</v-card-title>

          <v-card-text class="body-1 text-center mb-3 font-weight-light grey--text">
            Una red social multiplataforma para todas las edades, basada en la
            Gamificación y en las interacciones entre comunidades.
          </v-card-text>

          <template v-slot:actions>
            <div class="display-2 font-weight-light grey--text">Servicios</div>

            <v-spacer />

            <span class="caption grey--text font-weight-light">
              <v-icon small>mdi-map-marker</v-icon>Barquisimeto
            </span>
          </template>
        </base-material-card>
      </v-col>

      <v-col sm="12" md="4">
        <base-material-card color="transparent" hover-reveal image>
          <template v-slot:image>
            <v-img
              src="https://e00-elmundo.uecdn.es/assets/multimedia/imagenes/2019/04/30/15566314118270.jpg"
            />
          </template>

          <template v-slot:reveal-actions>
            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn class="mx-1" v-bind="attrs" icon v-on="on">
                  <v-icon>mdi-view-split-vertical</v-icon>
                </v-btn>
              </template>

              <span>Ver Actividades</span>
            </v-tooltip>
          </template>

          <v-card-title class="justify-center font-weight-light">Coin-Z</v-card-title>

          <v-card-text class="body-1 text-center mb-3 font-weight-light grey--text">
            Una plataforma de Blockchain para plataformas móviles basada en
            microtransacciones.
          </v-card-text>

          <template v-slot:actions>
            <div class="display-2 font-weight-light grey--text">Servicios</div>

            <v-spacer />

            <span class="caption grey--text font-weight-light">
              <v-icon small>mdi-map-marker</v-icon>Barquisimeto
            </span>
          </template>
        </base-material-card>
      </v-col>-->
      <v-col sm="12" md="4" v-for="project in projects" :key="project.id">
        <base-material-card color="transparent" hover-reveal image>
          <template v-slot:image>
            <v-img
              src="https://e00-elmundo.uecdn.es/assets/multimedia/imagenes/2019/04/30/15566314118270.jpg"
            />
          </template>

          <template v-slot:reveal-actions>
            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn
                  class="mx-1"
                  v-bind="attrs"
                  icon
                  v-on="on"
                  :to="{
                    name: 'ProjectDash',
                    params: { id_project: project.id },
                  }"
                >
                  <v-icon>mdi-view-split-vertical</v-icon>
                </v-btn>
              </template>

              <span>Ver Proyecto</span>
            </v-tooltip>
          </template>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'DashboardDashboard',

  data() {
    return {
      actas: null,
      decanatos: null,
      usuarios: null,
      rolUser: '',
    }
  },
  created() {},
  computed: {
    ...mapGetters('actas', ['contadores']),
  },
  methods: {
    ...mapActions('actas', ['fetchContadores']),
  },
}
</script>

<template>
  <v-container id="dashboard" fluid tag="section">
    <v-row>
      <v-col cols="12">
        <div class="font-weight-light mt-1" style="font-size: 25px;">
          Kanban del Proyecto - ¿Qué harás hoy?
        </div>
      </v-col>

      <v-col sm="12" md="4">
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

          <v-card-title class="justify-center font-weight-light"
            >E-Market</v-card-title
          >

          <v-card-text
            class="body-1 text-center mb-3 font-weight-light grey--text"
          >
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
      </v-col>

      <v-col sm="12" md="4">
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

          <v-card-title class="justify-center font-weight-light"
            >U-Social</v-card-title
          >

          <v-card-text
            class="body-1 text-center mb-3 font-weight-light grey--text"
          >
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

          <v-card-title class="justify-center font-weight-light"
            >Coin-Z</v-card-title
          >

          <v-card-text
            class="body-1 text-center mb-3 font-weight-light grey--text"
          >
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'DashboardDashboard',

  data() {
    return {
      dataCompletedTasksChart: {
        data: {
          labels: ['12am', '3pm', '6pm', '9pm', '12pm', '3am', '6am', '9am'],
          series: [[230, 750, 450, 300, 280, 240, 200, 190]],
        },
        options: {
          lineSmooth: this.$chartist.Interpolation.cardinal({
            tension: 0,
          }),
          low: 0,
          high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          },
        },
      },
      headers: [
        {
          sortable: false,
          text: 'ID',
          value: 'id',
        },
        {
          sortable: false,
          text: 'Name',
          value: 'name',
        },
        {
          sortable: false,
          text: 'Salary',
          value: 'salary',
          align: 'right',
        },
        {
          sortable: false,
          text: 'Country',
          value: 'country',
          align: 'right',
        },
        {
          sortable: false,
          text: 'City',
          value: 'city',
          align: 'right',
        },
      ],
      items: [
        {
          id: 1,
          name: 'Dakota Rice',
          country: 'Niger',
          city: 'Oud-Tunrhout',
          salary: '$35,738',
        },
        {
          id: 2,
          name: 'Minerva Hooper',
          country: 'Curaçao',
          city: 'Sinaai-Waas',
          salary: '$23,738',
        },
        {
          id: 3,
          name: 'Sage Rodriguez',
          country: 'Netherlands',
          city: 'Overland Park',
          salary: '$56,142',
        },
        {
          id: 4,
          name: 'Philip Chanley',
          country: 'Korea, South',
          city: 'Gloucester',
          salary: '$38,735',
        },
        {
          id: 5,
          name: 'Doris Greene',
          country: 'Malawi',
          city: 'Feldkirchen in Kārnten',
          salary: '$63,542',
        },
      ],
      sales: [
        {
          country: 'USA',
          flag:
            'https://demos.creative-tim.com/vue-material-dashboard-pro/img/flags/US.png',
          salesInM: 2920,
        },
        {
          country: 'Germany',
          flag:
            'https://demos.creative-tim.com/vue-material-dashboard-pro/img/flags/DE.png',
          salesInM: 1300,
        },
        {
          country: 'Australia',
          flag:
            'https://demos.creative-tim.com/vue-material-dashboard-pro/img/flags/AU.png',
          salesInM: 760,
        },
        {
          country: 'United Kingdom',
          flag:
            'https://demos.creative-tim.com/vue-material-dashboard-pro/img/flags/GB.png',
          salesInM: 690,
        },
        {
          country: 'Romania',
          flag:
            'https://demos.creative-tim.com/vue-material-dashboard-pro/img/flags/RO.png',
          salesInM: 600,
        },
        {
          country: 'Brasil',
          flag:
            'https://demos.creative-tim.com/vue-material-dashboard-pro/img/flags/BR.png',
          salesInM: 550,
        },
      ],
      tabs: 0,
      list: {
        0: false,
        1: false,
        2: false,
      },
    }
  },

  computed: {
    totalSales() {
      return this.sales.reduce((acc, val) => acc + val.salesInM, 0)
    },
  },

  methods: {
    complete(index) {
      this.list[index] = !this.list[index]
    },
  },
}
</script>

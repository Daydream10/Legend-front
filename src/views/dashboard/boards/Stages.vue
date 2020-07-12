<template>
  <v-container id="dashboard" fluid tag="section">
    <v-row>
      <v-col cols="12">
        <div class="font-weight-light mt-1" style="font-size: 25px;">
          Etapas del proyecto
        </div>
      </v-col>

      <v-col cols="12" sm="6" lg="3">
        <base-material-stats-card
          color="info"
          icon="mdi-twitter"
          title="Inicio"
          value="+245"
          sub-icon="mdi-clock"
          sub-text="Just Updated"
        />
        <v-btn
          text
          :to="{
            name: 'Board',
            params: { id_process: process.id },
            query: { categoria: id_category },
          }"
          >Revisar</v-btn
        >
      </v-col>

      <v-col cols="12" sm="6" lg="3">
        <base-material-stats-card
          color="primary"
          icon="mdi-poll"
          title="Planificación"
          value="75.521"
          sub-icon="mdi-tag"
          sub-text="Tracked from Google Analytics"
        />
      </v-col>

      <v-col cols="12" sm="6" lg="3">
        <base-material-stats-card
          color="success"
          icon="mdi-store"
          title="Ejecución"
          value="$ 34,245"
          sub-icon="mdi-calendar"
          sub-text="Last 24 Hours"
        />
      </v-col>

      <v-col cols="12" sm="6" lg="3">
        <base-material-stats-card
          color="orange"
          icon="mdi-sofa"
          title="Control"
          value="184"
          sub-icon="mdi-alert"
          sub-icon-color="red"
          sub-text="Get More Space..."
        />
      </v-col>
      <v-col cols="12" sm="6" lg="3">
        <base-material-stats-card
          color="orange"
          icon="mdi-sofa"
          title="Cierre"
          value="184"
          sub-icon="mdi-alert"
          sub-icon-color="red"
          sub-text="Get More Space..."
        />
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

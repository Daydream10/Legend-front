<template>
  <v-container id="dashboard" fluid tag="section">
    <v-row>
      <v-btn
        color="purple"
        class="ml-0"
        float="right"
        margin-left="6px"
        :to="{ name: 'ProjectDash' }"
      >
        Atrás
      </v-btn>
      <v-col cols="12">
        <div class="font-weight-light mt-1" style="font-size: 25px;">
          Procesos del Proyecto - ¿Qué harás hoy?
        </div>
      </v-col>

      <v-col sm="12" md="4" v-for="process in processes" :key="process.id">
        <v-card color="secondary" dark>
          <v-card-title class="headline">{{ process.nombre }}</v-card-title>

          <v-card-actions>
            <!--<v-btn text @click="hello(process.id)">Revisar</v-btn>-->
            <v-btn
              text
              :to="{
                name: 'Board',
                params: { id_process: process.id },
                query: { categoria: id_category },
              }"
              >Revisar</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// Utilities
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'DashboardDashboard',

  data() {
    return {
      id_category: this.$route.query.categoria,

      items: [
        {
          color: '#1F7087',
          //src: require('../assets/foster.jpg'),
          title: 'Estimación de los criterios de éxito del proyecto.',
          artist: 'Foster the People',
        },
        {
          color: '#952175',
          //src: require('../assets/halcyon.png'),
          title: 'Halcyon Days',
          artist: 'Ellie Goulding',
        },
      ],
    }
  },
  computed: {
    totalSales() {
      return this.sales.reduce((acc, val) => acc + val.salesInM, 0)
    },

    ...mapGetters('processes', ['processes']),
  },
  created() {
    console.log(this.$route.query.categoria)
    this.fetchProcesses2({
      id: this.$route.params.id_project,
      categoria: this.$route.query.categoria,
    })
    //this.fetchProcesses(this.$route.params.id_project)
  },
  methods: {
    ...mapActions('processes', ['fetchProcesses', 'fetchProcesses2']),
    complete(index) {
      this.list[index] = !this.list[index]
    },
    hello(value) {
      alert(value)
    },
  },
}
</script>

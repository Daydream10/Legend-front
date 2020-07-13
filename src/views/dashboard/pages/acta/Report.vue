<template>
  <v-container id="acta-profile" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <base-material-card icon="mdi-account-outline">
          <template v-slot:after-heading>
            <div class="font-weight-light card-title mt-2">
              Reporte
              <span class="body-1">— Reporte de Acta</span>
            </div>
          </template>
          <v-col cols="12" md="6">
            <v-row align="center">
              <v-date-picker
                v-model="picker"
                :landscape="landscape"
                type="month"
              ></v-date-picker>
            </v-row>
          </v-col>
          <v-col cols="12" md="6">
            <select v-model="form.decanato">
              <option
                v-for="decanato in decanatos"
                :key="decanato.codigo"
                :value="decanato"
              >
                {{ decanato.nombre }}
              </option>
            </select>
          </v-col>
          <v-container id="input-usage" fluid>
            <v-row>
              <v-col cols="12">
                <v-input append-icon="close">
                  {{ form.resultado }}
                </v-input>
              </v-col>
            </v-row> </v-container
          ><v-btn
            color="primary"
            float="right"
            margin-left="6px"
            class="mr-0"
            @click="buscar"
            :disabled="invalid"
          >
            Buscar
          </v-btn>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
/* eslint-disable */
import CardComponent from '@/components/CardComponent'
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'Forms',
  components: {
    CardComponent
  },
  data () {
    const date = new Date()

    return {
      picker: new Date().toISOString().substr(0, 7),
      date: new Date(),
      active:true,
      form: {
        decanato: null,
        fecha: date,
        resultado:0
      }

    }
  },
  computed: {
    ...mapGetters('decanatos', ['decanatos']),
    ...mapGetters('actas', ['ContadorActas','actas'])
  },
  created() {
    this.fetchActiveDecanatos()
  },
  mounted () {
    this.$buefy.snackbar.open({
      message: '¡Consulta aquí detalladamente las Actas!',
      queue: false
    })
  },
  methods: {
    ...mapActions('decanatos', ['fetchActiveDecanatos']),
    ...mapActions('actas', ['fetchContadorActas','fetchActasReporte']),
    async buscar(){
      const month=new Date(this.picker).getMonth()+1
      await this.fetchContadorActas({
        codigo:this.form.decanato.codigo,
        month:month
      })
      await this.fetchActasReporte({
        codigo:this.form.decanato.codigo,
        month:month
      })
      this.form.resultado=this.ContadorActas
      console.log(this.form.resultado)
    }
  }
}
</script>

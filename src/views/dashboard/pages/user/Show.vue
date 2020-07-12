<template>
  <v-container id="user-profile" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <base-material-card icon="mdi-account-outline">
          <template v-slot:after-heading>
            <div class="font-weight-light card-title mt-2">
              Empleado
              <span class="body-1">— Consulta de Empleado</span>
            </div>
          </template>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm md12>
                <v-card elevation="4">
                  <v-card-title primary-title>
                    <v-icon>mdi-account</v-icon>
                    <h4 class="headline mb-0">
                      {{ user.empleado.nombre + ' ' + user.empleado.apellido }}
                    </h4>
                    <v-spacer></v-spacer>
                  </v-card-title>
                  <v-divider></v-divider>
                  <v-card-text>
                    <v-layout wrap>
                      <v-flex xs12 sm6 md6>
                        <v-tooltip top>
                          <template slot="activator">
                            <v-icon>mdi-phone</v-icon>
                            {{ user.empleado.telefono }}
                          </template>
                        </v-tooltip>
                      </v-flex>
                      <v-flex xs12 sm6 md6>
                        <v-tooltip top>
                          <template slot="activator">
                            <v-icon>mdi-at</v-icon>
                            {{ user.email }}
                          </template>
                        </v-tooltip>
                      </v-flex>
                    </v-layout>
                    <v-layout wrap>
                      <v-flex xs12 sm6 md6>
                        <v-tooltip top>
                          <template slot="activator">
                            <v-icon>mdi-crosshairs-gps</v-icon>
                            {{ user.empleado.direccion }}
                          </template>
                        </v-tooltip>
                      </v-flex>
                      <v-flex xs12 sm6 md6>
                        <v-tooltip top>
                          <template slot="activator">
                            {{ user.tipo_usuario.nombre }}
                          </template>
                        </v-tooltip>
                      </v-flex>
                    </v-layout>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  props: ['id'],
  created() {
    this.fetchUser()
    //this.fetchUser(this.id)
    //console.log(this.fetchUser2())
  },
  computed: {
    ...mapState('users', ['user']),
  },
  methods: mapActions('users', ['fetchUser']),
}
</script>

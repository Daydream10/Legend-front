<template>
  <v-container id="user-profile" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <base-material-card icon="mdi-account-outline" color="primary">
          <template v-slot:after-heading>
            <div class="font-weight-light card-title mt-2">
              Miembro
              <span class="body-1">— Registro de Miembro</span>
            </div>
          </template>
          <ValidationObserver ref="observer" v-slot="{ invalid }">
            <v-form @submit.prevent="submit()">
              <v-container class="py-0">
                <v-row>
                  <v-col cols="12" md="6">
                    <VSelectWithValidation
                      v-model="rol"
                      :items="items"
                      item-text="name"
                      item-value="id"
                      label="Rol"
                      rules="required"
                      dense
                      prepend-icon="mdi-account-group"
                    />
                  </v-col>
                  <v-col cols="12" md="6">
                    <VSelectWithValidation
                      v-model="user"
                      :items="users"
                      item-text="email"
                      item-value="id"
                      label="Usuario"
                      rules="required"
                      dense
                      prepend-icon="mdi-account-group"
                    />
                  </v-col>
                  <v-col cols="12" class="text-right">
                    <v-btn
                      color="purple"
                      class="ml-0"
                      float="right"
                      margin-left="6px"
                      :to="{ name: 'MembersList' }"
                    >
                      Atrás
                    </v-btn>
                    <v-btn
                      color="primary"
                      float="right"
                      margin-left="6px"
                      class="mr-0"
                      @click="submit"
                      :disabled="invalid"
                    >
                      Registrar
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </ValidationObserver>
        </base-material-card>
      </v-col>
    </v-row>
    <ErrorMessage />
    <SuccessMessage />
  </v-container>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import VSelectWithValidation from '@/components/inputs/VSelectWithValidation'
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      rol: '',
      items: [
        { name: 'Lider', id: 'L' },
        { name: 'Miembro', id: 'M' },
      ],
      user: '',
      proyecto_id: this.$route.params.id_project,
    }
  },
  components: {
    ValidationObserver,
    VSelectWithValidation,
  },
  created() {
    this.fetchUsersNotProject(this.proyecto_id)
  },
  computed: {
    ...mapGetters('users', ['users']),
  },
  methods: {
    ...mapActions('members', ['createMember']),
    ...mapActions('users', ['fetchUsersNotProject']),
    async submit() {
      // this.$refs.obs.validate()
      console.log(this.proyecto_id)
      await this.createMember({
        rol: this.rol,
        usuario: this.user,
        proyecto: this.proyecto_id,
      })
      this.fetchUsersNotProject(this.proyecto_id)
    },
  },
}
</script>

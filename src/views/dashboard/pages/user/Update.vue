<template>
  <v-container id="user-profile" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <base-material-card icon="mdi-account-outline" color="primary">
          <template v-slot:after-heading>
            <div class="font-weight-light card-title mt-2">
              Empleado
              <span class="body-1">— Modificar Empleado</span>
            </div>
          </template>
          <ValidationObserver ref="obs">
            <v-form>
              <v-container class="py-0">
                <v-row>
                  <v-col cols="12" md="4">
                    <VTextFieldWithValidation
                      label="Correo Electrónico"
                      color="secondary"
                      prepend-icon="mdi-at"
                      rules="required|email"
                      v-model="email"
                    />
                  </v-col>
                  <v-col cols="12" md="4">
                    <VTextFieldWithValidation
                      label="Nombre"
                      color="secondary"
                      prepend-icon="mdi-account"
                      rules="required"
                      class="purple-input"
                      v-model="name"
                    />
                  </v-col>
                  <v-col cols="12" md="4">
                    <VTextFieldWithValidation
                      label="Apellido"
                      color="secondary"
                      prepend-icon="mdi-account"
                      rules="required"
                      class="purple-input"
                      v-model="lastName"
                    />
                  </v-col>
                  <v-col cols="12">
                    <VTextFieldWithValidation
                      label="Direccion"
                      color="secondary"
                      prepend-icon="mdi-home"
                      rules="required"
                      class="purple-input"
                      v-model="address"
                    />
                  </v-col>
                  <v-col cols="12" md="6">
                    <VTextFieldWithValidation
                      label="Telefono"
                      color="secondary"
                      prepend-icon="mdi-phone"
                      rules="required"
                      class="purple-input"
                      v-model="phone"
                    />
                  </v-col>
                  <v-col cols="12" md="6">
                    <VSelectWithValidation
                      :items="items"
                      item-text="name"
                      item-value="id"
                      label="Tipo de Usuario"
                      rules="required"
                      dense
                      prepend-icon="mdi-account-group"
                      v-model="type"
                    />
                  </v-col>
                  <v-col cols="12" class="text-right">
                    <v-btn
                      color="purple"
                      class="ml-0"
                      :to="{ name: 'UserList' }"
                    >
                      Atrás
                    </v-btn>
                    <v-btn
                      color="primary"
                      class="mr-0"
                      @click.stop.prevent="submit"
                    >
                      Modificar
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
import VTextFieldWithValidation from '@/components/inputs/VTextFieldWithValidation'
import VSelectWithValidation from '@/components/inputs/VSelectWithValidation'
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      items: [
        { name: 'Administrador', id: '1' },
        { name: 'Director', id: '2' },
        { name: 'Regular', id: '3' },
      ],
    }
  },
  components: {
    ValidationObserver,
    VTextFieldWithValidation,
    VSelectWithValidation,
  },
  computed: {
    email: {
      get() {
        return this.$store.state.users.user.email
      },
      set(value) {
        const data = {
          key: 'email',
          value,
        }
        this.addUserData(data)
      },
    },
    name: {
      get() {
        return this.$store.state.users.user.empleado.nombre
      },
      set(value) {
        const data = {
          key: 'name',
          value,
        }
        this.addUserData(data)
      },
    },
    lastName: {
      get() {
        return this.$store.state.users.user.empleado.apellido
      },
      set(value) {
        const data = {
          key: 'lastName',
          value,
        }
        this.addUserData(data)
      },
    },
    address: {
      get() {
        return this.$store.state.users.user.empleado.direccion
      },
      set(value) {
        const data = {
          key: 'address',
          value,
        }
        this.addUserData(data)
      },
    },
    phone: {
      get() {
        return this.$store.state.users.user.empleado.telefono
      },
      set(value) {
        const data = {
          key: 'phone',
          value,
        }
        this.addUserData(data)
      },
    },
    type: {
      get() {
        return this.$store.state.users.user.tipo_usuario
      },
      set(value) {
        const data = {
          key: 'type',
          value,
        }
        this.addUserData(data)
      },
    },
    getTypeId(tipoUsuario) {
      let typeId = null
      this.items.forEach((item) => {
        if (item.name === tipoUsuario) typeId = item.id
      })

      if (typeId === null) {
        console.warn('Tipo usuario not found with tipoUsuario: ', tipoUsuario)
      }

      return typeId
    },
  },
  methods: {
    ...mapActions('users', ['fetchUser', 'addUserData', 'saveUser']),
    async submit() {
      await this.saveUser({
        id: this.id,
        email: this.email,
        empleado: {
          nombre: this.name,
          apellido: this.lastName,
          direccion: this.address,
          telefono: this.phone,
        },
        tipo_usuario: this.type,
      })
    },
  },
  props: ['id'],
  async mounted() {
    await this.fetchUser(this.id)
  },
}
</script>

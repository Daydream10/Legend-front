<template>
  <v-container id="user-profile" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="4">
        <base-material-card class="v-card-profile" :avatar="image">
          <v-card-text class="text-center">
            <h6 class="display-1 mb-1 grey--text">{{ getNameById(type) }}</h6>

            <h4 class="display-2 font-weight-light mb-3 black--text">
              {{ name + ' ' + lastName }}
            </h4>
          </v-card-text>
        </base-material-card>

        <base-material-card
          class="v-card-profile"
          color="primary"
          title="Cambiar la Contraseña"
        >
          <v-form @submit.prevent="submit">
            <ValidationProvider
              rules="required|password2|minmax:8,16"
              name="Contraseña"
              v-slot="{ errors, valid }"
            >
              <v-text-field
                label="Contraseña"
                outlined
                counter
                prepend-icon="mdi-lock"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                @click:append="show1 = !show1"
                v-model="inputs.new_password1"
                :error-messages="errors"
                :success="valid"
              />
            </ValidationProvider>
            <ValidationProvider
              name="confirm"
              rules="required|password:@Contraseña"
              v-slot="{ errors, valid }"
            >
              <v-text-field
                label="Contraseña"
                outlined
                counter
                prepend-icon="mdi-lock"
                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show2 ? 'text' : 'password'"
                @click:append="show2 = !show2"
                v-model="inputs.new_password2"
                :error-messages="errors"
                :success="valid"
              />
            </ValidationProvider>
          </v-form>
          <div class="text-center mt-1">
            <v-btn
              class="mx-auto"
              color="purple"
              type="submit"
              @click="changeMyPassword(inputs)"
              @click.stop.prevent="submit"
              >Cambiar</v-btn
            >
          </div>
        </base-material-card>
      </v-col>
      <v-col cols="12" md="8">
        <base-material-card icon="mdi-account-outline" color="primary">
          <template v-slot:after-heading>
            <div class="font-weight-light card-title mt-2">
              Perfil
              <span class="body-1">— Modificar perfil de usuario</span>
            </div>
          </template>
          <ValidationObserver ref="obs">
            <v-form>
              <v-container class="py-0">
                <v-row>
                  <v-col cols="12" md="4">
                    <VTextFieldWithValidation
                      label="Correo Electrónico"
                      color="purple"
                      prepend-icon="mdi-at"
                      rules="required|email"
                      v-model="email"
                    />
                  </v-col>
                  <v-col cols="12" md="4">
                    <VTextFieldWithValidation
                      label="Nombre"
                      color="purple"
                      prepend-icon="mdi-account"
                      rules="required"
                      class="purple-input"
                      v-model="name"
                    />
                  </v-col>
                  <v-col cols="12" md="4">
                    <VTextFieldWithValidation
                      label="Apellido"
                      color="purple"
                      prepend-icon="mdi-account"
                      rules="required"
                      class="purple-input"
                      v-model="lastName"
                    />
                  </v-col>
                  <v-col cols="12">
                    <VTextFieldWithValidation
                      label="Direccion"
                      color="purple"
                      prepend-icon="mdi-home"
                      rules="required"
                      class="purple-input"
                      v-model="address"
                    />
                  </v-col>
                  <v-col cols="12" md="6">
                    <VTextFieldWithValidation
                      label="Telefono"
                      color="purple"
                      prepend-icon="mdi-phone"
                      rules="required"
                      class="purple-input"
                      v-model="phone"
                    />
                  </v-col>
                  <v-col cols="12" class="text-right">
                    <v-btn
                      color="purple"
                      class="mr-0"
                      @click.stop.prevent="submit"
                      >Modificar</v-btn
                    >
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
import VTextFieldWithValidation from '@/components/inputs/VTextFieldWithValidation'
import { mapActions } from 'vuex'

import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
  data() {
    return {
      show1: false,
      show2: false,

      inputs: {
        new_password1: '',
        new_password2: '',

        //uid: this.$route.params.uid,
        //token: this.$route.params.token,
      },
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
    ValidationProvider,
  },
  computed: {
    email: {
      get() {
        return this.$store.state.profile.user.email
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
        return this.$store.state.profile.user.empleado.nombre
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
        return this.$store.state.profile.user.empleado.apellido
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
        return this.$store.state.profile.user.empleado.direccion
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
        return this.$store.state.profile.user.empleado.telefono
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
        return this.$store.state.profile.user.tipo_usuario
      },
      set(value) {
        const data = {
          key: 'type',
          value,
        }
        this.addUserData(data)
      },
    },
    image: {
      get() {
        return this.$store.state.profile.user.empleado.foto
      },
      set(value) {
        const data = {
          key: 'image',
          value,
        }
        this.addUserData(data)
      },
    },
  },
  methods: {
    ...mapActions('profile', [
      'getProfile',
      'addUserData',
      'saveUser',
      'changeMyPassword',
    ]),

    async submit() {
      await this.saveUser({
        email: this.email,
        empleado: {
          nombre: this.name,
          apellido: this.lastName,
          direccion: this.address,
          telefono: this.phone,
          // foto: this.image,
        },
        tipo_usuario: this.type,
      })
    },
    getNameById(type) {
      return this.items.find((i) => i.id === type)?.name
    },
  },
  async mounted() {
    await this.getProfile()
  },
}
</script>

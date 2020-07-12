<template>
  <div>
    <login-logo />
    <v-card
      class="pa-10"
      style="width: 450px; min-height: 455px; overflow: hidden;"
      outlined
    >
      <slot />
    </v-card>
    <login-footer />
  </div>
</template>

<script>
import LoginLogo from './LoginLogo'
import LoginFooter from './LoginFooter'

export default {
  components: {
    LoginLogo,
    LoginFooter,
  },
}
</script>

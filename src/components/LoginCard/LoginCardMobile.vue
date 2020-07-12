<template>
  <div>
    <login-logo />
    <div
      class="pa-10"
      style="width: 410px; min-height: 450px; overflow: hidden;"
      outlined
    >
      <slot />
    </div>

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

<template>
  <div>
    <div class="text-center mb-5">
      <!--<h1 class="title text--primary">Gestor de Proyectos</h1>-->
      <h1 class="headline text--primary">Gestor de Proyectos</h1>
    </div>
    <div class="transition-wrapper">
      <transition :name="transitionName">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    transitionName: 'slide-left',
    loading: false,
  }),

  watch: {
    $route(to) {
      this.transitionName =
        to.name === 'password' ? 'slide-left' : 'slide-right'
    },
    loading(val) {
      if (!val) return

      setTimeout(() => (this.loading = false), 3000)
    },
  },
}
</script>

<style lang="scss">
.transition-wrapper {
  position: relative;
}

/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: absolute;
  width: 100%;
}

.slide-left-enter,
.slide-right-leave-to {
  transform: translateX(500px);
}

.slide-left-leave-to,
.slide-right-enter {
  transform: translateX(-500px);
}
</style>

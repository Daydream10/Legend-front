<template>
  <v-app id="bg">
    <loading />
    <router-view></router-view>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'

import Loading from '@/components/core/Loading.vue'

export default {
  name: 'App',
  computed: mapGetters('auth', ['isAuthenticated']),

  components: {
    Loading,
  },
}
</script>

<style>
body {
  padding: 0;
  margin: 0;
}
#bg {
  width: 100%;
  height: 370px;
  background-image: linear-gradient(69.7deg, #651544 40%, #ba0340 100.1%);
  background-position: center center;
}
@media screen and (max-width: 600px) {
  #bg {
    height: 240px;
  }
}

/*.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}*/

/* Enter and leave animations can use different */
/* durations and timing functions.              */
/*.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8  {
  transform: translateX(10px);
  opacity: 0;
}*/

.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

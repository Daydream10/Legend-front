<template>
  <v-main>
    <dashboard-core-breadcrumbs />

    <router-view />

    <dashboard-core-footer />
  </v-main>
</template>

<script>
export default {
  name: 'DashboardCoreView',

  components: {
    DashboardCoreFooter: () => import('./Footer'),

    DashboardCoreBreadcrumbs: () => import('./Breadcrumbs'),
  },
}
</script>

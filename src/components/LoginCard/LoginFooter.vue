<template>
  <div class="flex justify-space-between mt-4">
    <div v-if="$vuetify.breakpoint.smAndUp">
      <v-img
        src="@/static/footer.png"
        aspect-ratio="3"
        width="260px"
        alt="From Systeem"
        class="mx-auto"
      />
    </div>
    <div v-else>
      <v-img
        src="@/static/footer.png"
        aspect-ratio="4"
        width="260px"
        alt="From Systeem"
        class="mx-auto"
      />
    </div>
  </div>
</template>

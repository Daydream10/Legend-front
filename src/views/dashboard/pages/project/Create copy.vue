<template>
  <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1"
        >Name of step 1</v-stepper-step
      >

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 2" step="2"
        >Name of step 2</v-stepper-step
      >

      <v-divider></v-divider>

      <v-stepper-step step="3">Name of step 3</v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card class="mb-12" color="grey lighten-1" height="200px">
          <base-material-card
            color="success"
            icon="mdi-email"
            title="Stacked Form"
            class="px-5 py-3"
          >
            <v-form class="mt-5">
              <v-text-field label="Email Address" />

              <v-text-field type="password" label="Password" class="pt-0" />

              <v-checkbox label="Subscribe to newsletter" class="mt-0" />
            </v-form>

            <v-card-actions class="pl-0">
              <v-btn color="success" min-width="100">
                Submit
              </v-btn>
            </v-card-actions>
          </base-material-card>
        </v-card>

        <v-btn color="primary" @click="e1 = 2">
          Continue
        </v-btn>

        <v-btn text>Cancel</v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>

        <v-btn color="primary" @click="e1 = 3">
          Continue
        </v-btn>

        <v-btn text>Cancel</v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>

        <v-btn color="primary" @click="e1 = 1">
          Continue
        </v-btn>

        <v-btn text>Cancel</v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
export default {
  name: 'DashboardFormsRegularForms',

  data: () => ({
    e1: 1,
    checkbox: true,
    items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
    radioGroup: 1,
    switch1: true,
    zoom: 0,
  }),

  methods: {
    zoomOut() {
      this.zoom = this.zoom - 10 || 0
    },
    zoomIn() {
      this.zoom = this.zoom + 10 || 100
    },
  },
}
</script>

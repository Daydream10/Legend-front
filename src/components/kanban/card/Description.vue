<template>
  <v-list dense class="transparent">
    <v-subheader class="ml-2">
      DESCRIPTION
      <v-row>
        <v-col cols="5" class="text-right">
          <v-row>
            <v-textarea
              outlined
              autoGrow
              filled
              name="Description"
              label="Descripción de la Reunión"
            ></v-textarea>
          </v-row>
        </v-col>
      </v-row>
    </v-subheader>
    <v-list-item v-if="card.description">
      <v-list-item-content>
        {{ card.description }}
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  props: {
    card: { required: true, type: Object },
  },
}
</script>

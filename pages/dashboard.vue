<template>
  <v-container fill-height>
    <v-container fluid class="mb-12">
      <v-row>
        <v-col class="text-center">
          <v-btn icon :width="128" :height="128">
            <v-icon size="128">play_circle_outline</v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="text-center">
          <v-btn text>
            View Previous Lessons
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
export default {
  middleware: 'auth',
};
</script>

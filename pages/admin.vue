<template>
  <v-row justify="center">
    <v-col cols="10">
      <lessons-window class="my-4" :lessons="lessons" />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue';
import LessonsWindow from '@/components/admin/lessons/LessonsWindow.vue';

export default Vue.extend({
  middleware: ['auth', 'admin'],

  components: {
    LessonsWindow,
  },

  data() {
    return {
      lessons: [
        { name: 'Animals' },
        { name: 'Shapes' },
        { name: 'Colors' },
        { name: 'Food' },
        { name: 'Reading' },
      ],
    };
  },
});
</script>

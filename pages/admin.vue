<template>
  <v-row justify="center">
    <v-col cols="10">
      <lessons-window class="my-4" :lessons="lessons" />
    </v-col>
  </v-row>
</template>

<script>
import LessonsWindow from '@/components/admin/lessons/LessonsWindow.vue';

export default {
  middleware: ['auth', 'admin'],

  components: {
    LessonsWindow,
  },

  async asyncData({ $axios }) {
    const lessons = await $axios.$get('/lesson');

    return { lessons };
  },
};
</script>

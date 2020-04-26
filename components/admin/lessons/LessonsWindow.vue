<template>
  <div>
    <scrollable-window
      heading="Lessons"
      :items="lessons"
      :add-item="() => (displayAddLesson = true)"
    />

    <add-lesson
      :display="displayAddLesson"
      :toggle-display="(value) => (displayAddLesson = value)"
    />
  </div>
</template>

<script>
import ScrollableWindow from '@/components/ScrollableWindow.vue';
import AddLesson from '@/components/admin/lessons/AddLesson.vue';

export default {
  components: {
    ScrollableWindow,
    AddLesson,
  },

  props: {
    lessons: {
      type: Array,
      default() {
        return [];
      },
    },
  },

  data() {
    return {
      displayAddLesson: false,
    };
  },
};
</script>

<template>
  <v-container fill-height>
    <v-col>
      <v-row class="mb-12">
        <RegisterCard />
      </v-row>
    </v-col>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import RegisterCard from '@/components/RegisterCard.vue';

export default Vue.extend({
  middleware: 'auth',

  auth: 'guest',

  components: {
    RegisterCard,
  },
});
</script>

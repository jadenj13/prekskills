<template>
  <v-container fill-height>
    <v-col>
      <v-row class="mb-12">
        <LoginCard />
      </v-row>
    </v-col>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import LoginCard from '@/components/LoginCard.vue';

export default Vue.extend({
  middleware: 'auth',

  auth: 'guest',

  components: {
    LoginCard,
  },
});
</script>

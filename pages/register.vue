<template>
  <v-container fill-height>
    <v-col>
      <v-row class="mb-12">
        <RegisterCard />
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
import RegisterCard from '@/components/RegisterCard.vue';

export default {
  middleware: 'auth',

  auth: 'guest',

  components: {
    RegisterCard,
  },
};
</script>

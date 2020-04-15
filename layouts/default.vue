<template>
  <v-app>
    <v-snackbar
      v-model="isSnackbarShown"
      :top="true"
      :timeout="$store.state.snackbar.timeout"
      :color="$store.state.snackbar.color"
      >{{ $store.state.snackbar.message }}</v-snackbar
    >
    <nuxt />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  computed: {
    isSnackbarShown: {
      get() {
        return this.$store.state.snackbar.isShown;
      },
      set(isShown: boolean) {
        return this.$store.commit('snackbar/SET_SNACKBAR', { isShown });
      },
    },
  },
});
</script>

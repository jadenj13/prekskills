<template>
  <v-app>
    <v-snackbar
      v-model="isSnackbarShown"
      :top="true"
      :timeout="$store.state.snackbar.timeout"
      :color="$store.state.snackbar.color"
      >{{ $store.state.snackbar.message }}</v-snackbar
    >

    <v-app-bar app flat color="#fff">
      <v-spacer />
      <v-btn v-if="$auth.user && $auth.user.role === 'admin'" text to="/admin">
        Admin
      </v-btn>
      <v-btn v-if="$auth.loggedIn" text @click="$auth.logout()">
        Log Out
      </v-btn>
    </v-app-bar>

    <v-content>
      <nuxt />
    </v-content>
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

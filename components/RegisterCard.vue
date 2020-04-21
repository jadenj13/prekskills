<template>
  <v-card max-width="560px" width="90vw" class="mx-auto">
    <v-card-title class="headline">Register</v-card-title>

    <v-divider />

    <v-form @submit.prevent="register()">
      <v-container>
        <v-row>
          <v-col class="mx-auto px-4">
            <v-text-field
              v-model="name"
              label="Student's Name"
              type="name"
              :rules="rules.name"
              required
              validate-on-blur
              :disabled="isFetching"
            ></v-text-field>

            <v-text-field
              v-model="email"
              label="Email"
              type="email"
              :rules="rules.email"
              required
              validate-on-blur
              :disabled="isFetching"
            ></v-text-field>

            <v-text-field
              v-model="password"
              label="Password"
              type="password"
              :rules="rules.password"
              required
              validate-on-blur
              :disabled="isFetching"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-card-actions>
          <v-btn to="/">Login</v-btn>
          <v-btn
            class="primary ml-auto"
            :disabled="!isFormValid || isFetching"
            type="submit"
            >Register</v-btn
          >
        </v-card-actions>
      </v-container>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import isEmail from 'validator/lib/isEmail';

export default Vue.extend<any, any, any, any>({
  data() {
    return {
      isFetching: false,
      email: '',
      password: '',
      name: '',
      rules: {
        email: [
          (value: string) => isEmail(value) || 'Please enter a valid email.',
        ],
        password: [
          (value: string) => !!value.length || 'Please enter a valid password.',
        ],
        name: [
          (value: string) => !!value.length || 'Please enter a valid name.',
        ],
      },
    };
  },

  computed: {
    isFormValid() {
      return isEmail(this.email) && !!this.password && !!this.name;
    },
  },

  methods: {
    async register() {
      this.isFetching = true;

      try {
        const { token } = await this.$axios.$post(
          `${process.env.API_BASE_URL}/user/register`,
          {
            email: this.email,
            password: this.password,
            name: this.name,
          },
        );

        this.$auth.setUserToken(token);
      } catch (error) {
        this.password = '';
        this.isFetching = '';

        this.$store.commit('snackbar/SET_SNACKBAR', {
          message: 'An error occurred while registering. Please try again.',
          color: 'error',
        });
      }
    },
  },
});
</script>

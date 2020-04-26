<template>
  <v-card max-width="560px" width="90vw" class="mx-auto">
    <v-card-title class="headline">Login</v-card-title>

    <v-divider />

    <v-form @submit.prevent="login()">
      <v-container>
        <v-row>
          <v-col class="mx-auto px-4">
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
          <v-btn to="/register">Sign Up</v-btn>
          <v-btn
            class="primary ml-auto"
            :disabled="!isFormValid || isFetching"
            type="submit"
            >Login</v-btn
          >
        </v-card-actions>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
import isEmail from 'validator/lib/isEmail';

export default {
  data() {
    return {
      isFetching: false,
      email: '',
      password: '',
      rules: {
        email: [(value) => isEmail(value) || 'Please enter a valid email.'],
        password: [
          (value) => !!value.length || 'Please enter a valid password.',
        ],
      },
    };
  },

  computed: {
    isFormValid() {
      return isEmail(this.email) && !!this.password.length;
    },
  },

  methods: {
    async login() {
      this.isFetching = true;

      try {
        await this.$auth.loginWith('local', {
          data: {
            email: this.email,
            password: this.password,
          },
        });
      } catch (error) {
        this.password = '';
        this.isFetching = false;

        this.$store.commit('snackbar/SET_SNACKBAR', {
          message: 'An error occurred while logging in. Please try again.',
          color: 'error',
        });
      }
    },
  },
};
</script>

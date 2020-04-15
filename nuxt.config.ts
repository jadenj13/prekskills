// import { Context, Configuration } from '@nuxt/types';
import colors from 'vuetify/es5/util/colors';

require('dotenv').config();

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: 'Pre-K Skills',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/axios'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxt/typescript-build', '@nuxtjs/vuetify'],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/auth',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      themes: {
        light: {
          primary: colors.blue.darken2,
          accent: colors.green.darken2,
          secondary: colors.purple.darken2,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: `${process.env.API_BASE_URL}/user/login`,
            method: 'post',
            propertyName: 'token',
          },
          logout: false,
          user: {
            url: `${process.env.API_BASE_URL}/user`,
            method: 'get',
            propertyName: 'user',
          },
        },
      },
    },
    redirect: {
      login: '/',
      logout: '/',
      callback: false,
      home: '/dashboard',
    },
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    // extend(config: Configuration, ctx: Context) {},
  },
};

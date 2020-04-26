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
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Material+Icons',
      },
    ],
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
  plugins: [
    '~/plugins/vuetify',
    '~/plugins/axios',
    { src: '~/plugins/vue-audio-recorder', mode: 'client' },
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxtjs/vuetify'],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/auth',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: process.env.API_BASE_URL,
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
  build: {},
};

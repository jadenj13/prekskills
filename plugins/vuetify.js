import Vue from 'vue';
import Vuetify from 'vuetify';
import colors from 'vuetify/es5/util/colors';
import 'vuetify/dist/vuetify.min.css';

const opts = {
  iconFonts: 'mdi',
  theme: {
    primary: colors.blue.darken2,
    accent: colors.green.darken2,
    secondary: colors.purple.darken2,
    info: colors.teal.lighten1,
    warning: colors.amber.base,
    error: colors.deepOrange.accent4,
    success: colors.green.accent3,
  },
  options: {
    customProperties: true,
  },
};

Vue.use(Vuetify, opts);

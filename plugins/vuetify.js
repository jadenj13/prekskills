import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

const opts = {
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
    options: {
      customProperties: true,
    },
  },
  icons: {
    iconFont: 'md',
  },
};

export default new Vuetify(opts);

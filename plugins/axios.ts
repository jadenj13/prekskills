import { Plugin } from '@nuxt/types';

const plugin: Plugin = ({ $axios, env, isClient }) => {
  $axios.setBaseURL(env.API_BASE_URL);

  if (isClient) {
    const token = localStorage.getItem('token');

    if (token) {
      $axios.setToken(token, 'Bearer');
    }
  }
};

export default plugin;

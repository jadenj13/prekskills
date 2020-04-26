export const state = () => ({
  message: '',
  timeout: 5000,
  color: 'success',
  isShown: false,
});

export const mutations = {
  SET_SNACKBAR: (rootState, options) => {
    const defaults = state();

    rootState.message = options.message || defaults.message;
    rootState.color = options.color || defaults.color;
    rootState.timeout = options.timeout || defaults.timeout;
    rootState.isShown =
      typeof options.isShown === 'undefined' ? true : options.isShown;
  },
};

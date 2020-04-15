import { MutationTree } from 'vuex';

export const state = () => ({
  message: '',
  timeout: 5000,
  color: 'success',
  isShown: false,
});

export type RootState = ReturnType<typeof state>;

export const mutations: MutationTree<RootState> = {
  SET_SNACKBAR: (
    rootState,
    options: {
      message: string;
      color: string;
      isShown: boolean;
      timeout?: number;
    },
  ) => {
    const defaults = state();

    rootState.message = options.message || defaults.message;
    rootState.color = options.color || defaults.color;
    rootState.timeout = options.timeout || defaults.timeout;
    rootState.isShown =
      typeof options.isShown === 'undefined' ? true : options.isShown;
  },
};

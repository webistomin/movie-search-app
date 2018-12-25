export default {
  state: {
    personalAPIKey: '52217232f795bbefbb1b7c951aae98ad',
    error: null,
    isLoading: false,
    genres: [],
  },
  mutations: {
    setErrorMessage(state, payload) {
      state.error = payload;
    },
    setLoadingState(state, payload) {
      state.isLoading = payload;
    },
  },
  actions: {
  },
  getters: {
    getLoadingState(state) {
      return state.isLoading;
    },
  },
};

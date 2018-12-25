import axios from 'axios';

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
    setGenresList(state, payload) {
      state.genres = payload;
    },
  },
  actions: {
    fetchGenresList({ state, commit }) {
      axios
        .get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${state.personalAPIKey}&language=en-US`)
        .then((response) => {
          commit('setGenresList', response.data);
        })
        .catch((error) => {
          commit('setErrorMessage', error.message);
        });
    },
  },
  getters: {
    getLoadingState(state) {
      return state.isLoading;
    },
    getGenresList(state) {
      return state.genres.genres;
    },
  },
};

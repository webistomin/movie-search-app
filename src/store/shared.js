import axios from 'axios';

export default {
  state: {
    personalAPIKey: '52217232f795bbefbb1b7c951aae98ad',
    error: null,
    isLoading: false,
    genres: [],
    isRowView: false,
    isGridView: true,
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
    setRowView(state, payload) {
      state.isRowView = payload;
    },
    setGridView(state, payload) {
      state.isGridView = payload;
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
    getRowViewState(state) {
      return state.isRowView;
    },
    getGridViewState(state) {
      return state.isGridView;
    },
  },
};
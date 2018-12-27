import axios from 'axios';

export default {
  state: {
    movieDetails: [],
    movieImages: [],
  },
  mutations: {
    setMovieDetails(state, payload) {
      state.movieDetails = payload;
    },
    setMovieImages(state, payload) {
      state.movieImages = payload;
    },
  },
  actions: {
    fetchMovieDetails({ commit, rootState }, payload) {
      axios
        .get(`https://api.themoviedb.org/3/movie/${payload}?api_key=${rootState.shared.personalAPIKey}&language=en-US`)
        .then((response) => {
          commit('setMovieDetails', response.data);
          // commit('setLoadingState', false);
        })
        .catch((error) => {
          commit('setErrorMessage', error.message);
        });
    },
    fetchMovieImages({ commit, rootState }, payload) {
      axios
        .get(`https://api.themoviedb.org/3/movie/${payload}/images?api_key=${rootState.shared.personalAPIKey}&language=en-US&include_image_language=en`)
        .then((response) => {
          commit('setMovieImages', response.data);
          // commit('setLoadingState', false);
        })
        .catch((error) => {
          commit('setErrorMessage', error.message);
        });
    },
  },
  getters: {
    getMovieDetails(state) {
      return state.movieDetails;
    },
    getMovieImages(state) {
      return state.movieImages;
    },
  },
};

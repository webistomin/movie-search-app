import axios from 'axios';

export default {
  state: {
    movieDetails: [],
    movieImages: [],
    similarMovies: [],
    recommendedMovies: [],
    movieCredits: [],
    movieReviews: [],
  },
  mutations: {
    setMovieDetails(state, payload) {
      state.movieDetails = payload;
    },
    setMovieImages(state, payload) {
      state.movieImages = payload;
    },
    setSimilarMovies(state, payload) {
      state.similarMovies = payload;
    },
    setRecommendedMovies(state, payload) {
      state.recommendedMovies = payload;
    },
    setMovieCredits(state, payload) {
      state.movieCredits = payload;
    },
    setMovieReviews(state, payload) {
      state.movieReviews = payload;
    },
  },
  actions: {
    async fetchMovieDetails({ commit, rootState }, payload) {
      await axios
        .get(`https://api.themoviedb.org/3/movie/${payload}?api_key=${rootState.shared.personalAPIKey}&language=en-US`)
        .then((response) => {
          commit('setMovieDetails', response.data);
        })
        .catch((error) => {
          commit('setErrorMessage', error.message);
        });
    },
    async fetchMovieImages({ commit, rootState }, payload) {
      await axios
        .get(`https://api.themoviedb.org/3/movie/${payload}/images?api_key=${rootState.shared.personalAPIKey}&language=en-US&include_image_language=en`)
        .then((response) => {
          commit('setMovieImages', response.data.posters);
        })
        .catch((error) => {
          commit('setErrorMessage', error.message);
        });
    },
    async fetchSimilarMovies({ commit, rootState }, payload) {
      await axios
        .get(`https://api.themoviedb.org/3/movie/${payload}/similar?api_key=${rootState.shared.personalAPIKey}&language=en-US&page=1
`)
        .then((response) => {
          commit('setSimilarMovies', response.data.results);
        })
        .catch((error) => {
          commit('setErrorMessage', error.message);
        });
    },
    async fetchRecommendedMovies({ commit, rootState }, payload) {
      await axios
        .get(`https://api.themoviedb.org/3/movie/${payload}/recommendations?api_key=${rootState.shared.personalAPIKey}&language=en-US&page=1
`)
        .then((response) => {
          commit('setRecommendedMovies', response.data.results);
        })
        .catch((error) => {
          commit('setErrorMessage', error.message);
        });
    },
    async fetchMovieCredits({ commit, rootState }, payload) {
      await axios
        .get(`https://api.themoviedb.org/3/movie/${payload}/credits?api_key=${rootState.shared.personalAPIKey}`)
        .then((response) => {
          commit('setMovieCredits', response.data);
        })
        .catch((error) => {
          commit('setErrorMessage', error.message);
        });
    },
    async fetchMovieReviews({ commit, rootState }, payload) {
      await axios
        .get(`https://api.themoviedb.org/3/movie/${payload}/reviews?api_key=${rootState.shared.personalAPIKey}`)
        .then((response) => {
          commit('setMovieReviews', response.data.results);
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
    getSimilarMovies(state) {
      return state.similarMovies;
    },
    getRecommendedMovies(state) {
      return state.recommendedMovies;
    },
    getMovieCredits(state) {
      return state.movieCredits;
    },
    getMovieReviews(state) {
      return state.movieReviews;
    },
  },
};

import axios from 'axios';

export default {
  state: {
    latestMovies: [],
  },
  mutations: {
    setLatestMovies(state, payload) {
      state.latestMovies = payload;
    },
  },
  actions: {
    fetchLatestMovies({ commit, rootState }) {
      axios
        .get(`https://api.themoviedb.org/3/movie/latest?api_key=${rootState.shared.personalAPIKey}&language=en-US`)
        .then((response) => {
          commit('setLatestMovies', response.data);
        })
        .catch((error) => {
          commit('setErrorMessage', error.message);
        });
    },
  },
  getters: {
    getLatestMovies(state) {
      return state.latestMovies;
    },
  },
};

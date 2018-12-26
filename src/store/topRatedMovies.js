import axios from 'axios';

export default {
  state: {
    topRatedMovies: [],
    currentPage: 1,
  },
  mutations: {
    setTopRatedMovies(state, payload) {
      state.topRatedMovies = state.topRatedMovies.concat(payload);
    },
    setTopRatedCurrentPage(state) {
      state.currentPage += 1;
    },
  },
  actions: {
    fetchTopRatedMovies({ commit, rootState, state }) {
      axios
        .get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${rootState.shared.personalAPIKey}&language=en-US&page=${state.currentPage}`)
        .then((response) => {
          commit('setTopRatedMovies', response.data.results);
          commit('setLoadingState', false);
        })
        .catch((error) => {
          commit('setErrorMessage', error.message);
        });
    },
  },
  getters: {
    getTopRatedMovies(state) {
      return state.topRatedMovies;
    },
  },
};

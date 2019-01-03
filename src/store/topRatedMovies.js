import axios from 'axios';

export default {
  state: {
    topRatedMovies: [],
    currentPage: 1,
    totalPages: null,
  },
  mutations: {
    setTopRatedMovies(state, payload) {
      state.topRatedMovies = state.topRatedMovies.concat(payload);
    },
    setTopRatedCurrentPage(state) {
      state.currentPage += 1;
    },
    setTopRatedTotalPages(state, payload) {
      state.totalPages = payload;
    },
  },
  actions: {
    fetchTopRatedMovies({ commit, rootState, state }) {
      axios
        .get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${rootState.shared.personalAPIKey}&language=en-US&page=${state.currentPage}`)
        .then((response) => {
          commit('setTopRatedMovies', response.data.results);
          commit('setTopRatedTotalPages', response.data.total_pages);
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
    getTopRatedTotalPages(state) {
      return state.totalPages;
    },
    getTopRatedCurrentPage(state) {
      return state.currentPage;
    },
  },
};

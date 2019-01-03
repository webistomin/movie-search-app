import axios from 'axios';

export default {
  state: {
    popularMovies: [],
    currentPage: 1,
    totalPages: null,
  },
  mutations: {
    setPopularMovies(state, payload) {
      state.popularMovies = state.popularMovies.concat(payload);
    },
    setPopularCurrentPage(state) {
      state.currentPage += 1;
    },
    setPopularTotalPages(state, payload) {
      state.totalPages = payload;
    },
  },
  actions: {
    fetchPopularMovies({ commit, rootState, state }) {
      axios
        .get(`https://api.themoviedb.org/3/movie/popular?api_key=${rootState.shared.personalAPIKey}&language=en-US&page=${state.currentPage}`)
        .then((response) => {
          commit('setPopularMovies', response.data.results);
          commit('setPopularTotalPages', response.data.total_pages);
        })
        .catch((error) => {
          commit('setErrorMessage', error.message);
        });
    },
  },
  getters: {
    getPopularMovies(state) {
      return state.popularMovies;
    },
    getPopularTotalPages(state) {
      return state.totalPages;
    },
    getPopularCurrentPage(state) {
      return state.currentPage;
    },
  },
};

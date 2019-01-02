import axios from 'axios';

export default {
  state: {
    upcomingMovies: [],
    currentPage: 1,
    totalPages: null,
  },
  mutations: {
    setUpcomingMovies(state, payload) {
      state.upcomingMovies = state.upcomingMovies.concat(payload);
    },
    setUpcomingCurrentPage(state) {
      state.currentPage += 1;
    },
    setUpcomingTotalPages(state, payload) {
      state.totalPages = payload;
    },
  },
  actions: {
    fetchUpcomingMovies({ commit, rootState, state }) {
      axios
        .get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${rootState.shared.personalAPIKey}&language=en-US&page=${state.currentPage}`)
        .then((response) => {
          commit('setUpcomingMovies', response.data.results);
          commit('setUpcomingTotalPages', response.data.total_pages);
          commit('setLoadingState', false);
        })
        .catch((error) => {
          commit('setErrorMessage', error.message);
        });
    },
  },
  getters: {
    getUpcomingMovies(state) {
      return state.upcomingMovies;
    },
    getUpcomingTotalPages(state) {
      return state.totalPages;
    },
    getUpcomingCurrentPage(state) {
      return state.currentPage;
    },
  },
};

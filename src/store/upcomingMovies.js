import axios from 'axios';

export default {
  state: {
    upcomingMovies: [],
    currentPage: 1,
  },
  mutations: {
    setUpcomingMovies(state, payload) {
      state.upcomingMovies = state.upcomingMovies.concat(payload);
    },
    setUpcomingCurrentPage(state) {
      state.currentPage += 1;
    },
  },
  actions: {
    fetchUpcomingMovies({ commit, rootState, state }) {
      axios
        .get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${rootState.shared.personalAPIKey}&language=en-US&page=${state.currentPage}`)
        .then((response) => {
          commit('setUpcomingMovies', response.data.results);
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
  },
};

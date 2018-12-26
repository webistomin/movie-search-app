import axios from 'axios';

export default {
  state: {
    nowPlayingMovies: [],
    currentPage: 1,
  },
  mutations: {
    setNowPlayingMovies(state, payload) {
      state.nowPlayingMovies = state.nowPlayingMovies.concat(payload);
    },
    setNowPlayingCurrentPage(state) {
      state.currentPage += 1;
    },
  },
  actions: {
    fetchNowPlayingMovies({ commit, rootState, state }) {
      axios
        .get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${rootState.shared.personalAPIKey}&language=en-US&page=${state.currentPage}`)
        .then((response) => {
          commit('setNowPlayingMovies', response.data.results);
          commit('setLoadingState', false);
        })
        .catch((error) => {
          commit('setErrorMessage', error.message);
        });
    },
  },
  getters: {
    getNowPlayingMovies(state) {
      return state.nowPlayingMovies;
    },
  },
};

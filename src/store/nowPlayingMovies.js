import axios from 'axios';

export default {
  state: {
    nowPlayingMovies: [],
  },
  mutations: {
    setNowPlayingMovies(state, payload) {
      state.nowPlayingMovies = state.nowPlayingMovies.concat(payload);
    },
  },
  actions: {
    fetchNowPlayingMovies({ commit, rootState }, payload = 1) {
      axios
        .get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${rootState.shared.personalAPIKey}&language=en-US&page=${payload}`)
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

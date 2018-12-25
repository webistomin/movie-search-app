import axios from 'axios';

export default {
  state: {
    nowPlayingMovies: [],
  },
  mutations: {
    setNowPlayingMovies(state, payload) {
      state.nowPlayingMovies = payload;
    },
  },
  actions: {
    fetchNowPlayingMovies({ commit, rootState }) {
      axios
        .get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${rootState.shared.personalAPIKey}&language=en-US&page=1`)
        .then((response) => {
          commit('setNowPlayingMovies', response.data);
          commit('setLoadingState', false);
        })
        .catch((error) => {
          commit('setErrorMessage', error.message);
        });
    },
  },
  getters: {
    getNowPlayingMovies(state) {
      return state.nowPlayingMovies.results;
    },
  },
};

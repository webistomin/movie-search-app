import axios from 'axios';

export default {
  state: {
    userDetails: [],
    favoriteMovies: [],
    currentPage: 1,
  },
  mutations: {
    setUserDetails(state, payload) {
      state.userDetails = payload;
    },
    setFavoriteMovies(state, payload) {
      state.favoriteMovies = state.favoriteMovies.concat(payload);
    },
    setFavoriteCurrentPage(state) {
      state.currentPage += 1;
    },
  },
  actions: {
    fetchUserDetails({ commit, rootState }) {
      axios
        .get(`https://api.themoviedb.org/3/account?api_key=${rootState.shared.personalAPIKey}&session_id=${rootState.shared.sessionId}`)
        .then((response) => {
          commit('setUserDetails', response.data);
        })
        .catch((error) => {
          commit('setErrorMessage', error.message);
        });
    },
    markMovieAsFavorite({ commit, rootState, state }, payload) {
      const userId = state.userDetails.id;
      const personalAPIKey = rootState.shared.personalAPIKey;
      const sessionID = rootState.shared.sessionId;
      axios
        .post(`https://api.themoviedb.org/3/account/${userId}/favorite?api_key=${personalAPIKey}&session_id=${sessionID}`,
          {
            media_type: 'movie',
            media_id: payload,
            favorite: true,
          })
        .then((response) => {
          commit('setMessage', response);
        })
        .catch((error) => {
          commit('setErrorMessage', error.message);
        });
    },
    fetchFavoriteMovies({ commit, rootState, state }) {
      axios
        .get(`https://api.themoviedb.org/3/account/ACC-ID/favorite/movies?api_key=${rootState.shared.personalAPIKey}&session_id=${rootState.shared.sessionId}&language=en-US&sort_by=created_at.asc&page=${state.currentPage}`)
        .then((response) => {
          commit('setFavoriteMovies', response.data.results);
          commit('setLoadingState', false);
        })
        .catch((error) => {
          commit('setErrorMessage', error.message);
        });
    },
  },
  getters: {
    getUserDetails(state) {
      return state.userDetails;
    },
    getFavoriteMovies(state) {
      return state.favoriteMovies;
    },
  },
};

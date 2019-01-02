import axios from 'axios';

export default {
  state: {
    userDetails: [],
  },
  mutations: {
    setUserDetails(state, payload) {
      state.userDetails = payload;
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
  },
};

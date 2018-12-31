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
          console.log(response);
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
